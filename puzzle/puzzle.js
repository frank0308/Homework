let sizeSelector = document.querySelector('.size')
let sizeScale = sizeSelector.value.slice(0, 1);
let img = '800by600_niptor_day_2005_cut.png';

sizeSelector.addEventListener('change', function(){
    sizeScale = sizeSelector.value.slice(0, 1)
    createPuzzle(sizeScale)
    messPuzzle();
})
let puzzleIMG = document.querySelector('.puzzle');
console.dir(puzzleIMG)
// puzzleIMG.style.backgroundImage = "url('800by600_niptor_day_2005_cut.png')"
createPuzzle()

let imgUpLoader = document.querySelector('#upLoadImage');
imgUpLoader.addEventListener('change', () => {
    console.log(imgUpLoader.files); // get file object
    changeIMG()
});

let puzzle = document.querySelector('.puzzle')
puzzle.addEventListener('click', function(e){
    let piece = e.target.closest('div')
    console.log(sizeScale)
    pieceMove(piece, sizeScale);
})

messPuzzle();

function changeIMG() {
    let resultFile = imgUpLoader.files[0]
    if (resultFile) {
        let reader = new FileReader();
        reader.readAsDataURL(resultFile);
        reader.onload = function () {
            img = this.result;
            createPuzzle(sizeScale,img);
            messPuzzle();
        }
    }
}

function createPuzzle(sizeScale = 3, IMG = img) {
    console.log("HI")
    puzzleIMG.innerHTML = '';
    // let piecesPositionSetting = [`0px 0px`, `${501/3}px 0px `, `${501/3 * 2}px 0px `, `0px ${501/3}px`, `${501/3}px ${501/3}px`, `${501/3*2}px ${501/3}px`, `0px ${501/3*2}px`, `${501/3}px ${501/3*2}px`, `${501/3*2}px ${501/3*2}px`]
    // let imgPositionSetting = [`0% 0%`, `${100/2}% 0%`, `${100}% 0%`, `0% ${100/2}%`, `${100/2}% ${100/2}%`, `${100}% ${100/2}%`, `0% ${100}%`, `${100/2}% ${100}%`, `${100}% ${100}%`]
    let size = 480 / sizeScale
    let imgPositionSetting = createImgPosition(sizeScale);
    let piecesPositionSetting = createPiecesPosition(sizeScale);
    for (let i = 0; i < Math.pow(sizeScale, 2); i++) {
        let div = document.createElement('div');
        div.classList.add('puzzle-pieces')
        div.style.width = size + 'px'
        div.style.height = size + 'px'
        div.style.left = piecesPositionSetting[i].split(' ')[0]
        div.style.top = piecesPositionSetting[i].split(' ')[1]
        div.style.backgroundPosition = imgPositionSetting[i]
        div.style.backgroundSize = `${sizeScale * 100}% ${sizeScale * 100}%`

        if (i == Math.pow(sizeScale, 2) - 1) {
            div.classList.add('blank')
            puzzleIMG.append(div);
            break
        } else {
            div.style.backgroundImage = `url('${IMG}')`
            puzzleIMG.append(div);
        }
    }
}

function pieceMove(piece, sizeScale = 3){
    let size = parseInt((480 / sizeScale).toFixed())
    console.log(size)
    let blank = document.querySelector('.blank')
    let blankLeft = blank.offsetLeft;
    let blankTop = blank.offsetTop
    let pieceLeft = piece.offsetLeft;
    let pieceTop = piece.offsetTop
    // console.log(pieceLeft, size, pieceLeft + size, blankLeft, pieceTop, blankTop)
    
    if( pieceLeft + size == blankLeft && pieceTop == blankTop){ //Check Right
        blank.style.left = parseInt(piece.style.left) +'px';
        piece.style.left = parseInt(piece.style.left) + size + 'px';
    } else if(pieceLeft - size == blankLeft && pieceTop == blankTop) { //Check Left
        blank.style.left = parseInt(piece.style.left) + 'px';
        piece.style.left = parseInt(piece.style.left) - size +'px';
    } else if(pieceTop - size == blankTop && pieceLeft == blankLeft){ //Check Top
        blank.style.top = parseInt(piece.style.top) + 'px'
        piece.style.top = parseInt(piece.style.top) - size + 'px'
    } else if(pieceTop + size == blankTop && pieceLeft == blankLeft){ //Check Bottom
        blank.style.top = parseInt(piece.style.top) + 'px'
        piece.style.top = parseInt(piece.style.top) + size + 'px';
    }
}

function messPuzzle(){
    let pieces = Array.from(document.querySelectorAll('.puzzle-pieces'));
    console.log(pieces)
    for (let i = 0; i < 480; i++) {
        let ranNum = getRandom(0, pieces.length - 1)
        console.log(ranNum)
        pieceMove(pieces[ranNum], sizeScale)
    }
    for(let i of pieces){
        i.style.transition = '0.2s'
    }
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function createImgPosition(num){
    let array = [];
    for (let i = 0; i < Math.pow(num, 2); i++) {
        let x = (i % num) * (100 / (num - 1))
        let y = Math.floor(i / num) * (100 / (num - 1));
        array.push(`${x}% ${y}%`)
    }
    return array;
}

function createPiecesPosition(num){
    let array = [];
    for (let i = 0; i < Math.pow(num, 2); i++) {
        let x = (i % num) * (480 / (num))
        let y = Math.floor(i / num) * (480 / (num));
        array.push(`${x}px ${y}px`)
    }
    return array;
}