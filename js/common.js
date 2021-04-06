// Toggle Web Editor App 
let isStoreCss = false;
let hostname = window.location.hostname;
let windowWidth = 0;
let windowHeight = 0;
let appToggle = false;
let target;
let targetStyles = {};
let weTargetCss = '';
let websiteColors = [];
let websiteImages = [];
let isFullCss = false;
let weCss = '';
let fontColorPicker;
let borderColorPicker;
let borderTopColorPicker;
let borderBottomColorPicker;
let borderLeftColorPicker;
let borderRightColorPicker;
let bgColorPicker;
let boxShadowColorPicker;
let gradientColorPicker;
let isBgGradient = false;
let isRadiusLinked = true;
let isBorderLinked = true;
let timeStamp;
let boxshadow = { x:0, y: 0, b: 0, a: '' , c: '#000000' }
let border = { 
  top: { width: 0, style: 'none', color: '#000000' },
  bottom: { width: 0, style: 'none', color: '#000000' },
  left: { width: 0, style: 'none', color: '#000000' },
  right: { width: 0, style: 'none', color: '#000000' }
 }

let grCollection = [];
let grdCode;
let grdAngle = 90;
let grdType = "linear-gradient";

//  Create a message reciver from backaground.js

// Make querySelector simple
const $qs = (el)=> {
  return document.querySelector(el)
}

// Get elemnet by id 
const $id = (el) => {
  return document.getElementById(el)
}

const removeNumb = (strng)=> {
    return strng.replace(/[0-9.]/g, '');
}


const toNumb = (strng)=> {
    return isNaN(parseInt(strng)) ? null : parseInt(strng);
}

const getPx = (val) => {
  let pxValue;
  // %
  if( val.includes('%')) {
    pxValue = parseInt(targetStyles.width) * ( parseInt(val) / 100 );
  } else if( val.includes('rem')) {
    const root = document.querySelector(':root');
    const rootFontSize = window.getComputedStyle(roo).getPropertyValue('font-size');
    pxValue = parseInt(val) * parseInt(rootFontSize);
  } else {
    pxValue = parseInt(val);
  }
  return pxValue;
}

// Main Tab switch
function tabSwitch(e){
  const activeTab = e.target;
  const tabTarget = activeTab.dataset.tab;
  const tabNav = activeTab.parentElement;
  // Remove Active class from Tab button
  for( let i = 0; i <  tabNav.children.length; i++){
    tabNav.children[i].classList.remove('active')
  }
  // Remove Active class from Tab Pane
  for( let pi = 0; pi <  tabNav.nextElementSibling.children.length; pi++){
    tabNav.nextElementSibling.children[pi].classList.remove('active')
  }
  activeTab.classList.add('active');
  $id(tabTarget).classList.add('active');

}





function tabImage(e){
  $id('we-tab-btn-bg').classList.add('active');
  $id('we-tab-pan-bg').classList.add('active');

  $id('we-tab-btn-grd').classList.remove('active');
  $id('we-tab-pan-grd').classList.remove('active');

  showBgImg(targetStyles.backgroundImage);

  if(e  && isBgGradient){
    removeBgImg();
  }
}

function tabGradient(e){
  $id('we-tab-btn-bg').classList.remove('active');
  $id('we-tab-pan-bg').classList.remove('active');
  
  $id('we-tab-btn-grd').classList.add('active');
  $id('we-tab-pan-grd').classList.add('active');
  if(e && !isBgGradient){
    gradientReset(); // Reset Gradient Image 
  }
}



const  rgba2hex = (orig)=> {
      let a,
        rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        alpha = (rgb && rgb[4] || "").trim(),
        hex = rgb ? 
        (rgb[1] | 1 << 8).toString(16).slice(1) +
        (rgb[2] | 1 << 8).toString(16).slice(1) +
        (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
        a = alpha !== "" ? alpha : 01;
        let newA = Math.round(a * 100) / 100;
        let newAlpha = Math.round(newA * 255);
        let hexAlpha = (newAlpha + 0x10000).toString(16).substr(-2).toUpperCase();
        let hexResult = '#' + hex + hexAlpha;
      return hexResult;
}


const invertColor = (colorCode)=> {
  let rgb = colorCode.slice(4, -1).split(',')
  if(rgb[3] <= 0.5){
    return '#050505';
  }
  let contrast = ((rgb[0]*299)+(rgb[1]*587)+(rgb[2]*114))/1000;
  return (contrast >= 128) ? '#050505' : '#FFFFFF';
}
