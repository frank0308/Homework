class IPadType {
    constructor(color, picture, storage, hasMobileNetwork, price) {
        this.color = color;
        this.picture = picture;
        this.storage = storage;
        this.mobileNetwork = hasMobileNetwork;
        this.price = price
    }
}

let products = {
    IPads: [
        "basicIMG" = "/Homework/IPad/img/ipad-hero-unselected-201909_GEO_TW.jpg",
        new IPadType("grey", "/Homework/IPad/img/grey.png", "32GB", false, 10900),
        new IPadType("grey", "/Homework/IPad/img/grey_mobole.png", "32GB", true, 15400),
        new IPadType("grey", "/Homework/IPad/img/grey.png", "128GB", false, 13900),
        new IPadType("grey", "/Homework/IPad/img/grey_mobole.png", "128GB", true, 18400),
        new IPadType("gold", "/Homework/IPad/img/gold.png", "32GB", false, 10900),
        new IPadType("gold", "/Homework/IPad/img/gole_mobile.png", "32GB", true, 15400),
        new IPadType("gold", "/Homework/IPad/img/gold.png", "128GB", false, 13900),
        new IPadType("gold", "/Homework/IPad/img/gole_mobile.png", "128GB", true, 18400),
        new IPadType("silk", "/Homework/IPad/img/silk.png", "32GB", false, 10900),
        new IPadType("silk", "/Homework/IPad/img/silk_mobile.png", "32GB", true, 15400),
        new IPadType("silk", "/Homework/IPad/img/silk.png", "128GB", false, 15400),
        new IPadType("silk", "/Homework/IPad/img/silk_mobile.png", "128GB", true, 18400),
    ],
}

function createPage() {
    let mainContainer = document.createElement('div');
    mainContainer.classList.add('container');
    let mainRow = document.createElement('div');
    mainRow.classList.add('row');
    container.append(mainRow);
    createColumn(mainRow, 6);
    createColumn(mainRow, 6);
    let imgContainer = Array.from(document.querySelectorAll('.row > .col-6'))[0];
    let img = document.createElement('img');
    img.classList.add('w-75')
    // img.src = ;
    imgContainer.append(img);
    let buttonContainer = Array.from(document.querySelectorAll('.row > .col-6'))[1];
    let colorTitle = document.createElement('p');
    buttonContainer.append(colorTitle);
    let colorContainer = document.createElement('div');
    colorContainer.classList.add('container');
    buttonContainer.append(colorContainer);
    let colorRow = document.createElement('div');
    colorRow.classList.add('row');
    colorContainer.append(colorRow);
    for (let i = 0; i < ; i++) {
        const element = array[i];
        
    }

}

function createColumn(father, columnSpan) {
    let column = document.createElement('div');
    column.classList.add(`col-${columnSpan}`);
    father.append(column);
}