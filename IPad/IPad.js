class IPadType {
    constructor(color, colorIMG, storage, nonMobileNetworkPrice, mobileNetworkPrice) {
        this.color = color;
        this.colorIMG = colorIMG;
        this.storage = storage;
        this.mobileNetwork = {
            false: nonMobileNetworkPrice,
            true: mobileNetworkPrice
        };
    }
}

let IPads = [
    "basicIMG" = "/Homework/IPad/img/ipad-hero-unselected-201909_GEO_TW.jpg",
    new IPadType("grey", "/Homework/IPad/img/grey.png", "32GB", 10900, 15400),
    new IPadType("grey", "/Homework/IPad/img/grey_mobole.png", "128GB", 13900, 18400),
    new IPadType("gold", "/Homework/IPad/img/gold.png", "32GB", 10900, 15400),
    new IPadType("gold", "/Homework/IPad/img/gole_mobile.png", "128GB", 13900, 18400),
    new IPadType("silk", "/Homework/IPad/img/silk.png", "32GB", 10900, 15400),
    new IPadType("silk", "/Homework/IPad/img/silk_mobile.png", "128GB", 13900, 18400),
]

// let IPad = {
//     "grey": {
//         "128G": {
//             "nonMobile": {
//                 "price": 13900,
//                 "img": "/Homework/IPad/img/grey.png"
//             },
//             "mobile": {
//                 "price": 18400,
//                 "img": "/Homework/IPad/img/grey_mobole.png"
//             }
//         },
//         "32G": {
//             "nonMobile": {
//                 "price": 10900,
//                 "img": "/Homework/IPad/img/grey.png"
//             },
//             "mobile": {
//                 "price": 15400,
//                 "img": "/Homework/IPad/img/grey_mobole.png"
//             }
//         }
//     },
//     "gold": {
//         "128G": {
//             "nonMobile": {
//                 "price": 13900,
//                 "img": "/Homework/IPad/img/gold.png"
//             },
//             "mobile": {
//                 "price": 18400,
//                 "img": "/Homework/IPad/img/gole_mobile.png"
//             }
//         },
//         "32G": {
//             "nonMobile": {
//                 "price": 10900,
//                 "img": "/Homework/IPad/img/gold.png"
//             },
//             "mobile": {
//                 "price": 15400,
//                 "img": "/Homework/IPad/img/gole_mobile.png"
//             }
//         }
//     },
//     "silk": {
//         "128G": {
//             "nonMobile": {
//                 "price": 13900,
//                 "img": "/Homework/IPad/img/silk.png"
//             },
//             "mobile": {
//                 "price": 18400,
//                 "img": "/Homework/IPad/img/silk.png"
//             }
//         },
//         "32G": {
//             "nonMobile": {
//                 "price": 10900,
//                 "img": "/Homework/IPad/img/silk.png"
//             },
//             "mobile": {
//                 "price": 15400,
//                 "img": "/Homework/IPad/img/silk.png"
//             }
//         }
//     }
// };

// let colorButtons = document.querySelectorAll(".container .color");
// colorButtons[0].addEventListener('click', function(){
//     let img = document.querySelector('.homepage');
//     img.src = IPad.grey["32G"].nonMobile.img;
// })
// colorButtons[1].addEventListener('click', function(){
//     let img = document.querySelector('.homepage');
//     img.src = IPad.gold["32G"].nonMobile.img;
// })
// colorButtons[2].addEventListener('click', function(){
//     let img = document.querySelector('.homepage');
//     img.src = IPad.silk["32G"].nonMobile.img;
// })