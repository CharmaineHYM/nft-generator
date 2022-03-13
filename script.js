'use strict';

// ------------------------------------------------------------------
// input control

let wrapper = document.querySelectorAll('.wrapper');

// add or remove input
let addInput = function (e) {
    // e.target means the element user clicked on
    // e.target.parentElement.parentElement = wrapper
    let parentEl = e.target.parentElement.parentElement;
    // add input
    if (e.target.classList.contains('addinput')) {
        const input =
            `<div class="list_item">
            <span class="notes">Drop file here or click to upload</span>
            <button class="btn circle_btn removeinput">x</button>
            <input type="file" class="drop disp-none">
        </div>`;
        // target the last element of list and add input after last element
        let input_lastEl = parentEl.querySelector('.list').lastElementChild;
        input_lastEl.insertAdjacentHTML('afterend', input);
    }

    // remove input
    if (e.target.classList.contains('removeinput')) {
        // if it is the last list item existed, dont let user remove it
        if (e.target.parentElement.parentElement.querySelectorAll('.list_item').length < 2) {
            return
        }

        e.target.parentElement.remove();
    }

}

wrapper.forEach(function (e) {
    e.addEventListener('click', addInput);
})


// ------------------------------------------------------------------
// drag and drop

const list = document.querySelectorAll('.list')
list.forEach(function (e) {
    e.addEventListener('dragenter', dragger)
})

function dragger(e) {
    if (e.target.classList.contains('list_item')) {

        let drop = e.target.querySelectorAll('.drop');

        drop.forEach(drop => {
            // find the list item user are dragging on
            const drop_parentEl = drop.closest('.list_item');

            drop_parentEl.addEventListener('dragover', e => {
                e.preventDefault();
                drop_parentEl.classList.add('selected_item')
            })

            drop_parentEl.addEventListener('dragleave', e => {
                drop_parentEl.classList.remove('selected_item')
            })
            drop_parentEl.addEventListener('dragend', e => {
                drop_parentEl.classList.remove('selected_item')
            })

            drop_parentEl.addEventListener('drop', e => {
                e.preventDefault();
                // updated the thumbnail with the image dropped
                if (e.dataTransfer.files.length) {
                    updateThumbnail(drop_parentEl, e.dataTransfer.files[0])
                }
                drop_parentEl.classList.remove('selected_item')
            })
        })

    }
}

// update thumbnail

function updateThumbnail(drop_parentEl, file) {
    let thumbnailEl = drop_parentEl.querySelector('.thumbnail');

    // remove the notes
    if (drop_parentEl.querySelector('.notes')) {
        drop_parentEl.querySelector('.notes').remove();
    }
    // if thumbnail not exist, create one for it
    if (!thumbnailEl) {
        thumbnailEl = document.createElement("img");
        thumbnailEl.classList.add('thumbnail')
        drop_parentEl.appendChild(thumbnailEl)
    }

    // if user dropped file is image type, render a data url for it
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // when data url is generated, change the thumbnail src to data url
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
let eyebrowImgArr = []
let noseImgArr = []
let mouthImgArr = []



let generate = document.querySelector('.generate');

// Create Random Image
function randomImg(cls, arr) {
    arr = [];
    let path = document.querySelectorAll(`.${cls} .thumbnail`);
    // gather all image src into array
    for (let i = 0; i < path.length; i++) {
        arr.push(path[i].src);
    }
    // create a new image to store the random selected image src
    let el = new Image();
    el.setAttribute("crossOrigin", 'Anonymous');
    let elnum = Math.floor(Math.random() * (path.length));
    if (path.length) {
        el.src = arr[elnum];
    } else {
        // if there is no image src from array, src = a transparent png, u can generate it from the link i put in description
        el.src = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`
    }
    return el
}

// let get generator work!!
let generator = function (e) {
    // for every part of element, run the randomImg function to generate a random image from array
    let imghead = randomImg('head_wrapper', headImgArr);
    imghead.onload = function () {
        buildImg();
    }

    let imgeyes = randomImg('eyes_wrapper', eyesImgArr);
    imgeyes.onload = function () {
        buildImg();
    }


    let imgeyeBrown = randomImg('eyebrow_wrapper', eyebrowImgArr);
    imgeyeBrown.onload = function () {
        buildImg();
    }

    let imgnose = randomImg('nose_wrapper', noseImgArr);
    imgnose.onload = function () {
        buildImg();
    }

    let imgmouth = randomImg('mouth_wrapper', mouthImgArr);
    imgmouth.onload = function () {
        buildImg();
    }

    // let's gather every pieces into one canvas image
    function buildImg() {
        // create random background color
        let r = Math.floor(Math.random() * (255 - 100 + 1) + 100);
        let g = Math.floor(Math.random() * (255 - 100 + 1) + 100);
        let b = Math.floor(Math.random() * (255 - 100 + 1) + 100);
        let bgColor = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`

        // create canvas
        let ctx = canvas.getContext('2d');
        // you can change the canvas width and height as you want, just to make sure your dropped image share the same width and height with canvas
        canvas.width = 400;
        canvas.height = 400;
        // background color
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 400, 400);
        // You can change your image position here (x,y)
        ctx.drawImage(imghead, 0, 0);
        ctx.drawImage(imgeyes, 0, -30);
        ctx.drawImage(imgeyeBrown, 0, -60);
        ctx.drawImage(imgnose, 0, 10);
        ctx.drawImage(imgmouth, 0, 60);
    }

    // active the download button
    download.classList.remove('disp-none');
}


generate.addEventListener('click', generator);

// ------------------------------------------------------------------
// download Canvas

let downloadImg = document.querySelector('.downloadImg');
let download = document.querySelector('.download');

let downloader = function (e) {
    e.preventDefault();

    const dataURL = canvas.toDataURL("image/png");
    downloadImg.src = dataURL;
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = dataURL;
    // you can customise your image download name
    a.download = 'canvas-image.png'
    a.click();
    document.body.removeChild(a);
}

download.addEventListener('click', downloader);
