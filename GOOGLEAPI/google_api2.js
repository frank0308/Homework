"use strict";

let map;
let myLat;
let myLng;

function initMap() {

    navigator.geolocation.getCurrentPosition((i) => {
        myLat = i.coords.latitude;
        myLng = i.coords.longitude;
        map = new google.maps.Map(document.getElementById("map"), {
            center: {
                lat: myLat,
                lng: myLng,
            },
            zoom: 16,
            mapTypeId: "roadmap"
        });
        let myPosition = new google.maps.Marker({
            position: {
                lat: myLat,
                lng: myLng
            },
            map: map
        });
        console.log(myPosition)
        myPosition.addListener('click', function () {
            map.setCenter({
                lat: myLat,
                lng: myLng
            });
            map.setZoom(15);
        })
    })



    let DataRequest = new XMLHttpRequest();
    DataRequest.open('get', 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR03QVRRMDHgQC_XBIR62wBKePkGVs5kRyTMdaCpP032CjtFdu6uiA3m-Gc');
    DataRequest.send();
    DataRequest.onload = function () {
        let text = this.response;
        let maskData = JSON.parse(text).features;
        let markers = [];
        for (let index = 0; index < maskData.length; index++) {
            markers.push(createMarker(maskData[index]));
        }
        var markerCluster = new MarkerClusterer(map, markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });

        let areaRequest = new XMLHttpRequest();
        areaRequest.open('get', 'https://raw.githubusercontent.com/donma/TaiwanAddressCityAreaRoadChineseEnglishJSON/master/CityCountyData.json')
        areaRequest.send();
        areaRequest.onload = function () {
            let text = this.responseText;
            let areaData = JSON.parse(text);
            let cityList = document.querySelector('#city');
            let distinctList = document.querySelector('#distinct')
            for (let index = 0; index < areaData.length; index++) {
                cityList.options.add(new Option(areaData[index].CityName, areaData[index].CityName));
            }

            cityList.addEventListener('change', function () {
                let selectedCity = areaData.filter((i) => i.CityName == cityList.value)
                let reset = Array.from(document.querySelectorAll('.display .row .col-12'))
                for (let i of reset) {
                    i.remove();
                }
                getDistinct(selectedCity);
                searchPharmacy(maskData);
            })
            distinctList.addEventListener('change', function () {
                let reset = Array.from(document.querySelectorAll('.display .row .col-12'))
                for (let i of reset) {
                    i.remove();
                }
                searchPharmacy(maskData);
            })
        }

    }
}

function getPosition(pharmacy) {
    let position = {
        lat: pharmacy.geometry.coordinates[1],
        lng: pharmacy.geometry.coordinates[0]
    };
    return position;
}

function checkOpenTime(data) {
    if (data == "N") {
        return '<img src="img/round.png">';
    } else {
        return '<img src="img/cross.png">';
    }
}

function createMarker(data) {
    let iconImg = ""
    let openTime = data.properties.service_periods.split("");
    if (data.properties.mask_adult + data.properties.mask_child === 0) {
        iconImg = "img/emoji_sad.png"
    } else {
        iconImg = "img/emoji_happy.png"
    }
    let marker = new google.maps.Marker({
        position: getPosition(data),
        map: map,
        icon: iconImg,
    });

    let infoWindow = new google.maps.InfoWindow({
        content: `<div id="content">` +
            `<div id="siteNotice">` +
            `</div>` +
            `<h1 id="firstHeading" class="firstHeading text-left">${data.properties.name}</h1>` +
            `<div id="bodyContent">` +
            `<p class="my-1">電話:${data.properties.phone}</p>` +
            `<p class="my-1">地址:${data.properties.address}</p>` +
            `<div class="d-flex">` +
            `<p class="text-white mr-3 px-1 py-1 my-1 rounded bg-secondary">成人口罩:${data.properties.mask_adult}</p>` +
            `<p class="text-white px-1 py-1 my-1 rounded bg-secondary">兒童口罩:${data.properties.mask_child}</p>` +
            `</div>` +
            `<label class="btn btn-primary my-1" for="openTime">查看營業時間</label>` +
            `<input type="checkbox" name="openTime" id="openTime" class="d-none">` +
            `<div class="openTime">` +
            `<table>` +
            `<thead>` +
            `<tr>` +
            `<th></th>` + `<th>星期一</th>` + `<th>星期二</th>` + `<th>星期三</th>` + `<th>星期四</th>` + `<th>星期五</th>` + `<th>星期六</th>` + `<th>星期日</th>` +
            `</tr>` +
            `</thead>` +
            `<tbody>` +
            `<tr>` +
            `<td>上午</td>` + `<td>${checkOpenTime(openTime[0])}</td>` + `<td>${checkOpenTime(openTime[1])}</td>` + `<td>${checkOpenTime(openTime[2])}</td>` + `<td>${checkOpenTime(openTime[3])}</td>` + `<td>${checkOpenTime(openTime[4])}</td>` + `<td>${checkOpenTime(openTime[5])}</td>` + `<td>${checkOpenTime(openTime[6])}</td>` +
            `</tr>` +
            `<tr>` +
            `<td>下午</td>` + `<td>${checkOpenTime(openTime[7])}</td>` + `<td>${checkOpenTime(openTime[8])}</td>` + `<td>${checkOpenTime(openTime[9])}</td>` + `<td>${checkOpenTime(openTime[10])}</td>` + `<td>${checkOpenTime(openTime[11])}</td>` + `<td>${checkOpenTime(openTime[12])}</td>` + `<td>${checkOpenTime(openTime[13])}</td>` +
            `</tr>` +
            `<tr>` +
            `<td>晚上</td>` + `<td>${checkOpenTime(openTime[14])}</td>` + `<td>${checkOpenTime(openTime[15])}</td>` + `<td>${checkOpenTime(openTime[16])}</td>` + `<td>${checkOpenTime(openTime[17])}</td>` + `<td>${checkOpenTime(openTime[18])}</td>` + `<td>${checkOpenTime(openTime[19])}</td>` + `<td>${checkOpenTime(openTime[20])}</td>` +
            `</tr>` +
            `</tbody>` +
            `</table>` +
            `</div>` +
            `</div>` +
            `</div>`
    })
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });

    return marker

}

function getDistinct(selectedCity) {
    let distinctList = document.querySelector('#distinct');
    distinctList.options.length = 0;
    for (let i = 0; i < selectedCity[0].AreaList.length; i++) {
        distinctList.options.add(new Option(selectedCity[0].AreaList[i].AreaName, selectedCity[0].AreaList[i].AreaName));
    }
}

function searchPharmacy(data) {
    let searchedPharmacy = [];
    let selectedCity = document.querySelector('#city');
    let selectedDistinct = document.querySelector('#distinct')
    data.forEach((i) => {
        if (i.properties.county == selectedCity.value && i.properties.town == selectedDistinct.value) {
            searchedPharmacy.push(i);
        }
    })
    for (let i = 0; i < searchedPharmacy.length; i++) {
        createPharmacyCard(searchedPharmacy[i]);
    }

}

function createPharmacyCard(pharmacy) {
    let infoArea = document.querySelector('.display .row');
    let column = document.createElement('div')
    column.classList.add('col-12', 'p-2', 'pharmacyInfo', 'my-3');
    infoArea.append(column);
    column.addEventListener('click', function () {
        map.setCenter({
            lat: pharmacy.geometry.coordinates[1],
            lng: pharmacy.geometry.coordinates[0]
        });
        map.setZoom(18);
    })
    let pharmacyCard = document.querySelector('#pharmacyCard');
    let infoContent = pharmacyCard.content.cloneNode(true);
    infoContent.querySelector('h5').innerText = pharmacy.properties.name;
    infoContent.querySelector('.phone').innerText = `電話:${pharmacy.properties.phone}`;
    infoContent.querySelector('.address').innerText = `地址:${pharmacy.properties.address}`;
    infoContent.querySelector('.maskAdult').innerText = `成人口罩:${pharmacy.properties.mask_adult}`;
    infoContent.querySelector('.maskAdult').classList.add('text-white', 'mr-3', 'px-1', 'py-1', 'my-1', 'rounded', 'bg-secondary')
    infoContent.querySelector('.maskChild').innerText = `兒童口罩:${pharmacy.properties.mask_child}`;
    infoContent.querySelector('.maskChild').classList.add('text-white', 'mr-3', 'px-1', 'py-1', 'my-1', 'rounded', 'bg-secondary')


    column.append(infoContent);
}