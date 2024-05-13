mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';

// instantiate the map 
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-74.00220, 40.73367],
    zoom: 15
});

// when the map is finished it's initial load, add sources and layers.
map.on('load', function () {

    // add a geojson source for the parcels
    map.addSource('west_village', {
        type: 'geojson',
        data: 'data/west_village.geojson',
        generateId: true // this will add an id to each feature, this is necessary if we want to use featureState (see below)
    })

    
    
    // create layer, shaded by the penalty amt
    map.addLayer({
        id: 'west_village-fill-2024',
        type: 'fill',
        source: 'west_village',
        filter: ['to-boolean',['get','LL84_2024-2029 Penalty']],
        layout: {'visibility': 'none'},
        paint: {
            'fill-color': {
                property: 'LL84_2024-2029 Penalty',
                stops: [[1, '#fee5d9'],[10000, '#fcbba1'], [50000, '#fc9272'], [100000, '#fb6a4a'], [150000, '#de2d26'], [250000, '#a50f15']]
            },
            // use a case expression to set the opacity of a polygon based on featureState
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,  // opacity when hover is false
                0.5 // opacity when hover is true
            ]
        }
    })

    // create layer, shaded by the penalty amt
    map.addLayer({
        id: 'west_village-fill-2030',
        type: 'fill',
        source: 'west_village',
        filter: ['to-boolean',['get','LL84_2030-2034 Penalties']],
        layout: {'visibility': 'none'},
        paint: {
            'fill-color': {
                property: 'LL84_2030-2034 Penalties',
                stops: [[1, '#fee5d9'],[10000, '#fcbba1'], [50000, '#fc9272'], [100000, '#fb6a4a'], [150000, '#de2d26'], [250000, '#a50f15']]
            },
            // use a case expression to set the opacity of a polygon based on featureState
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,  // opacity when hover is false
                0.5 // opacity when hover is true
            ]
        }
    })

    // create layer, shaded by the penalty amt
    map.addLayer({
        id: 'west_village-fill-2035',
        type: 'fill',
        source: 'west_village',
        filter: ['to-boolean',['get','LL84_2035-2039 Penalties']],
        layout: {'visibility': 'none'},
        paint: {
            'fill-color': {
                property: 'LL84_2035-2039 Penalties',
                stops: [[1, '#fee5d9'],[10000, '#fcbba1'], [50000, '#fc9272'], [100000, '#fb6a4a'], [150000, '#de2d26'], [250000, '#a50f15']]
            },
            // use a case expression to set the opacity of a polygon based on featureState
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,  // opacity when hover is false
                0.5 // opacity when hover is true
            ]
        }
    })

    // create layer, shaded by the penalty amt
    map.addLayer({
        id: 'west_village-fill-2040',
        type: 'fill',
        source: 'west_village',
        filter: ['to-boolean',['get','LL84_2040-2049 Penalties']],
        layout: {'visibility': 'none'},
        paint: {
            'fill-color': {
                property: 'LL84_2040-2049 Penalties',
                stops: [[1, '#fee5d9'],[10000, '#fcbba1'], [50000, '#fc9272'], [100000, '#fb6a4a'], [150000, '#de2d26'], [250000, '#a50f15']]
            },
            // use a case expression to set the opacity of a polygon based on featureState
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,  // opacity when hover is false
                0.5 // opacity when hover is true
            ]
        }
    })

    // create layer, shaded by the penalty amt
    map.addLayer({
        id: 'west_village-fill-2050',
        type: 'fill',
        source: 'west_village',
        filter: ['to-boolean',['get','LL84_2050 Penalty']],
        layout: {'visibility': 'none'},
        paint: {
            'fill-color': {
                property: 'LL84_2050 Penalty',
                stops: [[1, '#fee5d9'],[10000, '#fcbba1'], [50000, '#fc9272'], [100000, '#fb6a4a'], [150000, '#de2d26'], [250000, '#a50f15']]
            },
            // use a case expression to set the opacity of a polygon based on featureState
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,  // opacity when hover is false
                0.5 // opacity when hover is true
            ]
        }
    })

    // add parcel outlines after the fill layer, so the outline is "on top" of the fill
    map.addLayer({
        id: 'west_village-line',
        type: 'line',
        source: 'west_village',
        paint: {
            'line-color': '#6b6b6b'
        },
        filter: ['to-boolean',['get','LL84_2050 Penalty']],
    })

    // this is a variable to store the id of the feature that is currently being hovered.
    let hoveredPolygonId = null

    // whenever the mouse moves on the fill layer, we check the id of the feature it is on top of, and set featureState for that feature.  The featureState we set is hover:true or hover:false
    map.on('mousemove', 'west_village-fill-2050', (e) => {
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
            map.on('mouseleave', 'west_village-fill-2050', () => {
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

    // if the user clicks the fill layer, create popup for different layers

    // 2024 layer
    map.on('click', 'west_village-fill-2024', (e) => {
        var penalty = e.features[0].properties['LL84_2024-2029 Penalty']
        var excess = e.features[0].properties['LL84_2024-2029 Excess Emissions']
        var address = e.features[0].properties.address
        var propertyType = e.features[0].properties['LL84_Largest Property Use Type']
            new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.address + '<p>Property Type: ' + propertyType + '<p>Penalties: $' + penalty.toLocaleString('en-US') + '<p>Excess Emissions (Tons): ' + excess.toLocaleString('en-US'))
            .addTo(map);
    });

    // 2030 layer
    map.on('click', 'west_village-fill-2030', (e) => {
        var penalty = e.features[0].properties['LL84_2030-2034 Penalties']
        var excess = e.features[0].properties['LL84_2030-2034 Emissions Excess']
        var address = e.features[0].properties.address
        var propertyType = e.features[0].properties['LL84_Largest Property Use Type']
            new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.address + '<p>Property Type: ' + propertyType + '<p>Penalties: $' + penalty.toLocaleString('en-US') + '<p>Excess Emissions (Tons): ' + excess.toLocaleString('en-US'))
            .addTo(map);
    });

    // 2035 layer
    map.on('click', 'west_village-fill-2035', (e) => {
        var penalty = e.features[0].properties['LL84_2035-2039 Penalties']
        var excess = e.features[0].properties['LL84_2035-2039 Emissions Excess']
        var address = e.features[0].properties.address
        var propertyType = e.features[0].properties['LL84_Largest Property Use Type']
            new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.address + '<p>Property Type: ' + propertyType + '<p>Penalties: $' + penalty.toLocaleString('en-US') + '<p>Excess Emissions (Tons): ' + excess.toLocaleString('en-US'))
            .addTo(map);
    });

    // 2040 layer
    map.on('click', 'west_village-fill-2040', (e) => {
        var penalty = e.features[0].properties['LL84_2040-2049 Penalties']
        var excess = e.features[0].properties['LL84_2040-2049 Emissions Excess']
        var address = e.features[0].properties.address
        var propertyType = e.features[0].properties['LL84_Largest Property Use Type']
            new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.address + '<p>Property Type: ' + propertyType + '<p>Penalties: $' + penalty.toLocaleString('en-US') + '<p>Excess Emissions (Tons): ' + excess.toLocaleString('en-US'))
            .addTo(map);
    });

    // 2050 layer
    map.on('click', 'west_village-fill-2050', (e) => {
        var penalty = e.features[0].properties['LL84_2050 Penalty']
        var address = e.features[0].properties.address
        var propertyType = e.features[0].properties['LL84_Largest Property Use Type']
            new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.address + '<p>Property Type: ' + propertyType + '<p>Penalties: $' + penalty.toLocaleString('en-US') + '<p>Expected 0 emissions')
            .addTo(map);
    });

    // CODE to toggle between layers
    // listen for a click on a specific button 
    $('#phase2024-button').on('click', function () {
        map.setLayoutProperty('west_village-fill-2024', 'visibility', 'visible');
        map.setLayoutProperty('west_village-fill-2030', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2035', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2040', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2050', 'visibility', 'none');
    });

    // listen for a click on a specific button 
    $('#phase2030-button').on('click', function () {
        map.setLayoutProperty('west_village-fill-2024', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2030', 'visibility', 'visible');
        map.setLayoutProperty('west_village-fill-2035', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2040', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2050', 'visibility', 'none');
        ;
    });

    // listen for a click on a specific button 
    $('#phase2035-button').on('click', function () {
        map.setLayoutProperty('west_village-fill-2024', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2030', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2035', 'visibility', 'visible');
        map.setLayoutProperty('west_village-fill-2040', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2050', 'visibility', 'none');
    });

    // listen for a click on a specific button 
    $('#phase2040-button').on('click', function () {
        map.setLayoutProperty('west_village-fill-2024', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2030', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2035', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2040', 'visibility', 'visible');
        map.setLayoutProperty('west_village-fill-2050', 'visibility', 'none');
        ;
    });

    // listen for a click on a specific button 
    $('#phase2050-button').on('click', function () {
        map.setLayoutProperty('west_village-fill-2024', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2030', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2035', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2040', 'visibility', 'none');
        map.setLayoutProperty('west_village-fill-2050', 'visibility', 'visible');
        ;
    });


    $(document).ready(function(){
        $('.question-button').on('click', function(){
            var questionId = $(this).attr('id').replace('question', '');
            $("#answer" + questionId).toggle();
        });
    });
    
})