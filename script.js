
'use strict';

// ------------------------------------------------------------------
// input control

let wrapper = document.querySelectorAll('.wrapper');

// add or remove input
let addInput = function(e){
    let parentEl = e.target.parentElement;
    // add input
    if(e.target.classList.contains('addinput')){
        const input = 
        `<div class="list_item">
            <span class="notes">Drop file here or click to upload</span>
            <button class="btn circle_btn removeinput">-</button>
            <input type="file" class="drop disp-none">
        </div>`;
        let input_lastEl = parentEl.querySelector('.list').lastElementChild;
        input_lastEl.insertAdjacentHTML('afterend', input);
    }

    // remove input
    if(e.target.classList.contains('removeinput')){
        e.target.parentElement.remove();
    }

}

wrapper.forEach(function(e){
    e.addEventListener('click', addInput);
})


// ------------------------------------------------------------------
// drag and drop

const list = document.querySelectorAll('.list')
list.forEach(function(e){
    e.addEventListener('dragenter', dragger)
})

function dragger(e){
if(e.target.classList.contains('list_item')){

let drag = e.target.querySelectorAll('.drop')
drag.forEach(drag => {
    const drag_parentEl = drag.closest('.list_item');

    drag_parentEl.addEventListener('dragover', e => {
        e.preventDefault();
        drag_parentEl.classList.add('selected_item')
    })

    drag_parentEl.addEventListener('dragleave', e =>{
        drag_parentEl.classList.remove('selected_item')
    })
    drag_parentEl.addEventListener('dragend', e =>{
        drag_parentEl.classList.remove('selected_item')
    })

    drag_parentEl.addEventListener('drop', e => {
        e.preventDefault();
        if(e.dataTransfer.files.length){
            drag.files = e.dataTransfer.files;
            updateThumbnail(drag_parentEl, e.dataTransfer.files[0])
        }
        drag_parentEl.classList.remove('selected_item')
    })
})

}
}


function updateThumbnail(drag_parentEl, file){
    let thumbnailEl = drag_parentEl.querySelector('.thumbnail');

    if(drag_parentEl.querySelector('.notes')){
        drag_parentEl.querySelector('.notes').remove();
    }
    if(!thumbnailEl){
        thumbnailEl = document.createElement("img");
        thumbnailEl.classList.add('thumbnail')
        drag_parentEl.appendChild(thumbnailEl)
    }

    if(file.type.startsWith('image/')){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailEl.src = reader.result;
        } 
    }
}
 
// ------------------------------------------------------------------
// build canvas



let canvas = document.querySelector('canvas');

// element array
let headImgArr = []
let eyesImgArr = []
let eyebrownImgArr = []
let noseImgArr = []
let mouthImgArr = []



let generate = document.querySelector('.generate');

// Create Random Image
function randomImg(cls, arr){
    arr = [];
    let path = document.querySelectorAll(`.${cls} .thumbnail`);
    for(let i = 0; i< path.length; i++){
        arr.push(path[i].src);
    }
    let el = new Image();
    el.setAttribute("crossOrigin",'Anonymous');
    let elnum = Math.floor(Math.random()*(path.length));
    if(path.length){
    el.src = arr[elnum];
    }else{
        el.src = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`
    }
    return el
}

let generator = function(e){

    let imghead = randomImg('head_wrapper', headImgArr);
    imghead.onload = function(){
            buildImg();
        }

    let imgeyes = randomImg('eyes_wrapper', eyesImgArr);
    imgeyes.onload = function(){
            buildImg();
        }

    
    let imgeyeBrown = randomImg('eyebrown_wrapper', eyebrownImgArr);
    imgeyeBrown.onload = function(){
            buildImg();
        }

    let imgnose = randomImg('nose_wrapper', noseImgArr);
    imgnose.onload = function(){
            buildImg();
        }

    let imgmouth = randomImg('mouth_wrapper', mouthImgArr);
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
        canvas.width=400;
        canvas.height=400;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 400, 400);
        // You can change your image position here
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
