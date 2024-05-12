
mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';

// instantiate the map using a bounding box instead of center point and zoom level
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-74.00220, 40.73367],
    zoom: 15
});

// when the map is finished it's initial load, add sources and layers.
map.on('load', function () {

    // add a geojson source for the borough boundaries
    map.addSource('west_village', {
        type: 'geojson',
        data: 'data/west_village.geojson',
        generateId: true // this will add an id to each feature, this is necessary if we want to use featureState (see below)
    })

    // first add the fill layer, using a match expression to give each a unique color based on its boro_code property
    map.addLayer({
        id: 'west_village-fill',
        type: 'fill',
        source: 'west_village',
        paint: {
            'fill-color': ['blue'
            ],
            // use a case expression to set the opacity of a polygon based on featureState
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,  // opacity when hover is false
                0.5 // opacity when hover is true
            ]
        }
    })

    // add borough outlines after the fill layer, so the outline is "on top" of the fill
    map.addLayer({
        id: 'west_village-line',
        type: 'line',
        source: 'west_village',
        paint: {
            'line-color': '#6b6b6b'
        }
    })

    // this is a variable to store the id of the feature that is currently being hovered.
    let hoveredPolygonId = null

    // whenever the mouse moves on the 'borough-boundaries-fill' layer, we check the id of the feature it is on top of, and set featureState for that feature.  The featureState we set is hover:true or hover:false
    map.on('mousemove', 'west_village-fill', (e) => {
        // don't do anything if there are no features from this layer under the mouse pointer
        if (e.features.length > 0) {
            // if hoveredPolygonId already has an id in it, set the featureState for that id to hover: false
            if (hoveredPolygonId !== null) {
                map.setFeatureState(
                    { source: 'west_village', id: hoveredPolygonId },
                    { hover: false }
                );
            }

            // set hoveredPolygonId to the id of the feature currently being hovered
            hoveredPolygonId = e.features[0].id;

            // set the featureState of this feature to hover:true
            map.setFeatureState(
                { source: 'west_village', id: hoveredPolygonId },
                { hover: true }
            );

            // make the cursor a pointer to let the user know it is clickable
            map.getCanvas().style.cursor = 'pointer'

            // resets the feature state to the default (nothing is hovered) when the mouse leaves the 'borough-boundaries-fill' layer
            map.on('mouseleave', 'west_village-fill', () => {
                // set the featureState of the previous hovered feature to hover:false
                if (hoveredPolygonId !== null) {
                    map.setFeatureState(
                        { source: 'west_village', id: hoveredPolygonId },
                        { hover: false }
                    );
                }

                // clear hoveredPolygonId
                hoveredPolygonId = null;
                
                // set the cursor back to default
                map.getCanvas().style.cursor = ''
            });

        }
    });

    // if the user clicks the 'borough-boundaries-fill' layer, extract properties from the clicked feature, using jQuery to write them to another part of the page.
    map.on('click', 'west_village-fill', (e) => {
        // get the boro_name from the first item in the array e.features
        var boro_name = e.features[0].properties.boro_name

        // insert the borough name into the sidebar using jQuery
        $('#borough').text(`You clicked ${boro_name}!`)
    });


    // listen for a click on a specific button and use flyTo to change the map's camera view.
    $('#staten-island-button').on('click', function () {
        map.flyTo({
            center: [-74.15234, 40.57932],
            zoom: 9,
            duration: 1500
        })
    })

    // listen for a click on a specific button and use fitBounds to change the map's camera view.
    $('#manhattan-button').on('click', function () {
        map.fitBounds([[-74.05050, 40.69046], [-73.90017, 40.87610]])
    })

    // add a variable to keep track of the visible state of the borough layers
    let boroughsVisible = true

    // when the toggle button is clicked, check boroughsVisible to get the current visibility state, update the layer visibility to reflect the opposite of the current state.
    $('#borough-toggle').on('click', function () {

        // by default we will set the layers to visible
        let value = 'visible'

        // if the layers are already visible, set their visibility to 'none'
        if (boroughsVisible === true) {
            value = 'none'
        }

        // use setLayoutProperty to apply the visibility (either 'visible' or 'none' depending on the logic above)
        map.setLayoutProperty('borough-boundaries-fill', 'visibility', value)
        map.setLayoutProperty('borough-boundaries-line', 'visibility', value)

        // flip the value in boroughsVisible to reflect the new state. (if true, it becomes false, if false it becomes true)
        boroughsVisible = !boroughsVisible
    })

})