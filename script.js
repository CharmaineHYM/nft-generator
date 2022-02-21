// ------------------------------------------------------------------
// Header image suggestion

let headerBtn = document.querySelector('.header_option');
let headerOption = document.querySelectorAll('.header_list')

let showOption = function(e){
    let i = e.target.dataset.item;
    if(!(e.target.dataset.item)){
        return
    }
    headerOption.forEach(function(e){
        e.classList.add('disp-none');
        
    })
    showOption = document.querySelector(`.header_list[data-option="${i}"]`);
    showOption.classList.remove('disp-none')
}

headerBtn.addEventListener('click', showOption);

// ------------------------------------------------------------------
// input control

let list = document.querySelectorAll('.custom_list');
let value = document.querySelectorAll('.custom_path');
let canvas = document.querySelector('canvas');

// element array
let headImgArr = []
let eyesImgArr = []
let eyeBrownImgArr = []
let noseImgArr = []
let mouthImgArr = []

// add or remove input
let addInput = function(e){
    // add input
    if(e.target.classList.contains('addinput')){
        const input = 
        `<div class="custom_field custom_head">
            <input type="" class="custom_path" value="">
            <div class="cta_wrapper">
                <button class="btn custom_btn addinput">+</button>
                <button class="btn custom_btn removeinput">-</button>
            </div>
        </div>`
        e.target.parentElement.parentElement.insertAdjacentHTML('afterEnd', input);
        e.target.parentElement.remove();
    }

    // remove input
    if(e.target.classList.contains('removeinput')){
        let btnWrapper = 
        `<div class="cta_wrapper">
            <button class="btn custom_btn addinput">+</button>
            <button class="btn custom_btn removeinput">-</button>
        </div>`
        let prevEl = e.target.parentElement.parentElement.previousElementSibling
        prevEl.insertAdjacentHTML('beforeEnd', btnWrapper)
        e.target.parentElement.parentElement.remove();
    }

}

list.forEach(function(e){
    e.addEventListener('click', addInput);
})

// ------------------------------------------------------------------
// build canvas

let generate = document.querySelector('.generate');

// Create Random Image
function randomImg(cls, arr){
    let path = document.querySelectorAll(`.${cls} .custom_path`);
    for(let i = 0; i< path.length; i++){
        arr.push(path[i].value);
    }

    let el = new Image();
    el.setAttribute("crossOrigin",'Anonymous');
    let elnum = Math.floor(Math.random()*(path.length));
    el.src = arr[elnum];

    return el
}

let generator = function(e){

    let imghead = randomImg('custom_head_wrapper', headImgArr);
    imghead.onload = function(){
            buildImg();
        }

    let imgeyes = randomImg('custom_eyes_wrapper', eyesImgArr);
    imgeyes.onload = function(){
            buildImg();
        }

    
    let imgeyeBrown = randomImg('custom_eyebrown_wrapper', eyeBrownImgArr);
    imgeyeBrown.onload = function(){
            buildImg();
        }

    let imgnose = randomImg('custom_nose_wrapper', noseImgArr);
    imgnose.onload = function(){
            buildImg();
        }

    let imgmouth = randomImg('custom_mouth_wrapper', mouthImgArr);
    imgmouth.onload = function(){
            buildImg();
        }

    function buildImg(){
         // create random background color
        let r=Math.floor(Math.random() * (255 - 100 + 1) +100);
        let g=Math.floor(Math.random() * (255 - 100 + 1) +100);
        let b=Math.floor(Math.random() * (255 - 100 + 1) +100);
        let bgColor = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`

        // create canvas
        let ctx = canvas.getContext('2d');
        canvas.width=300;
        canvas.height=300;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 400, 400);
        ctx.drawImage(imghead, 0, 0);
        ctx.drawImage(imgeyes, 0, -30);
        ctx.drawImage(imgeyeBrown, 0, -60);
        ctx.drawImage(imgnose, 0, 10);
        ctx.drawImage(imgmouth, 0, 60);
    }
        
        download.classList.remove('disp-none');
}


generate.addEventListener('click', generator);

// ------------------------------------------------------------------
// download Canvas

let downloadImg = document.querySelector('.downloadImg');
let download = document.querySelector('.download');

let downloader = function(e){
    e.preventDefault();

    const dataURL = canvas.toDataURL("image/png");
   downloadImg.src = dataURL;
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = dataURL;
    a.download = 'canvas-image.png'
    a.click();
    document.body.removeChild(a);
}

download.addEventListener('click', downloader);
