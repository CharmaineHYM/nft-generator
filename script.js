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

headerBtn.addEventListener('click', showOption)

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

let generator = function(e){
    // Create Head Image
    let headPath = document.querySelectorAll('.custom_head_wrapper .custom_path');
    for(let i = 0; i< headPath.length; i++){
        headImgArr.push(headPath[i].value);
    }

    let imghead = new Image();
    imghead.setAttribute("crossOrigin",'Anonymous');
    let imgheadnum = Math.floor(Math.random()*(headPath.length));
    imghead.src = headImgArr[imgheadnum];

    imghead.onload =  function(){
        buildImg();
    }

    // Create Eyes Image
    let eyesPath = document.querySelectorAll('.custom_eyes_wrapper .custom_path');
    for(let i = 0; i< eyesPath.length; i++){
        eyesImgArr.push(eyesPath[i].value);
    }

    let imgeyes = new Image();
    imgeyes.setAttribute("crossOrigin",'Anonymous');
    let imgeyesnum = Math.floor(Math.random()*(eyesPath.length));
    imgeyes.src = eyesImgArr[imgeyesnum];

    imgeyes.onload =  function(){
        buildImg();
    }

    // Create Eyebrown Image
    let eyeBrownPath = document.querySelectorAll('.custom_eyebrown_wrapper .custom_path');
    for(let i = 0; i< eyeBrownPath.length; i++){
        eyeBrownImgArr.push(eyeBrownPath[i].value);
    }

    let imgeyeBrown = new Image();
    imgeyeBrown.setAttribute("crossOrigin",'Anonymous');
    let imgeyeBrownnum = Math.floor(Math.random()*(eyeBrownPath.length));
    imgeyeBrown.src = eyeBrownImgArr[imgeyeBrownnum];

    imgeyeBrown.onload =  function(){
        buildImg();
    }

    // Create Nose Image
     let nosePath = document.querySelectorAll('.custom_nose_wrapper .custom_path');
     for(let i = 0; i< nosePath.length; i++){
         noseImgArr.push(nosePath[i].value);
     }
 
     let imgnose = new Image();
     imgnose.setAttribute("crossOrigin",'Anonymous');
     let imgnosenum = Math.floor(Math.random()*(nosePath.length));
     imgnose.src = noseImgArr[imgnosenum];

     imgnose.onload =  function(){
        buildImg();
    }

      // Create Mouth Image
      let mouthPath = document.querySelectorAll('.custom_mouth_wrapper .custom_path');
      for(let i = 0; i< mouthPath.length; i++){
          mouthImgArr.push(mouthPath[i].value);
      }
  
      let imgmouth = new Image();
      imgmouth.setAttribute("crossOrigin",'Anonymous');
      let imgmouthnum = Math.floor(Math.random()*(mouthPath.length));
      imgmouth.src = mouthImgArr[imgmouthnum];

      imgmouth.onload =  function(){
        buildImg();
      }

    // create random background color

    let r=Math.floor(Math.random() * (255 - 100 + 1) +100);
    let g=Math.floor(Math.random() * (255 - 100 + 1) +100);
    let b=Math.floor(Math.random() * (255 - 100 + 1) +100);
    let bgColor = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`

    function buildImg(){
        let ctx = canvas.getContext('2d');
        canvas.width=400;
        canvas.height=400;
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
