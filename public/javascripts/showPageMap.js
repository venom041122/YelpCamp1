// mapboxgl.accessToken=mapToken;

// const map=new mapboxgl.Map({
//     container:'map',
//     style:'mapbox://styles/mapbox/light-v10',
//     center:campground.geometry.coordinates,
//     zoom:8
// })

// new mapboxgl.Marker()
//     .setLngLat(campground.geometry.coordinates)
//     .setPopup(
//         new mapboxgl.Popup({ offset: 25 })
//             .setHTML(
//                 `<h3>${campground.title}</h3><p>${campground.location}</p>`
//             )
//     )
//     .addTo(map)

maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.BRIGHT,
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

new maptilersdk.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new maptilersdk.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)