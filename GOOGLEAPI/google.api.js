let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 25.041639,
            lng: 121.536256
        },
        zoom: 15,
    });
    map.data.loadGeoJson('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR03QVRRMDHgQC_XBIR62wBKePkGVs5kRyTMdaCpP032CjtFdu6uiA3m-Gc');
    map.data.setStyle(function (feature) {
        let maskAdult = feature.getProperty('mask_adult');
        let maskChild = feature.getProperty('mask_child');
        let name = feature.getProperty('name');
        if (maskAdult + maskChild == 0) {
            return {
                icon: "img/emoji_sad.png",
            }
        } else {
            return {
                icon: "img/emoji_happy.png",
            }
        }
    })
    // var position = {
    //     lat: map.data.feature.getProperty(`${coordinates[1]}`),
    //     lng: map.data.feature.getProperty(`${coordinates[0]}`)

    // };
    let infoWindow = new google.maps.InfoWindow({
        content:"YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaA",
        });
    map.data.addListener('click', function(e){
        infoWindow.open(map, e.feature);
    })
    
}