
//  Manage Propertie Forms
function hideNoneImgProperties(){
        $id('we-typo').style.display = 'none';
        $id('we-allignment').style.display = 'none';
}


function hideNoneTextProperties(){
        $id('we-img-content').style.display = 'none';
}
function hideNoneEmbedProperties(){
        hideNoneImgProperties();
        hideNoneTextProperties();
        $id('we-background').style.display = 'none';
}

function showTextProperties(){
        $id('we-typo').style.display = 'block';
        $id('we-allignment').style.display = 'flex';
        $id('we-background').style.display = 'block';
}



//  Restore Text alignment
function resetTextAlign(){
    $id('we-align-left').classList.remove('active');
    $id('we-align-right').classList.remove('active');
    $id('we-align-center').classList.remove('active');
    $id('we-align-justify').classList.remove('active');
    
}

const textAlign = (e)=> {
    resetTextAlign();
    e.target.classList.add('active');
    // target.style.textAlign = e.target.dataset.align;
    generateWeCss('textAlign', e.target.dataset.align);
}



// Color Changes
const fontColorChange = (e) => {
    // target.style.color = e.detail.color.rgba;
    if((e.timeStamp - timeStamp) >= 50){
        generateWeCss('color' , e.detail.color.rgba);
    }
}
// Border Color Changes
const borderColorChange = (e) => {
    // target.style.borderColor = e.detail.color.rgba;
    if((e.timeStamp - timeStamp) >= 50){
        generateWeCss('borderColor', e.detail.color.rgba);
     }
}
const borderTopColorChange = (e) => {
    // target.style.borderTopColor = e.detail.color.rgba;
     if((e.timeStamp - timeStamp) >= 50){
         generateWeCss('borderTopColor' , e.detail.color.rgba);
     }
}
const borderBottomColorChange = (e) => {
    // target.style.borderBottomColor = e.detail.color.rgba;
     if((e.timeStamp - timeStamp) >= 50){
         generateWeCss('borderBottomColor', e.detail.color.rgba);
     }
}
const borderLeftColorChange = (e) => {
    // target.style.borderLeftColor = e.detail.color.rgba;
     if((e.timeStamp - timeStamp) >= 50){
         generateWeCss('borderLeftColor', e.detail.color.rgba);
     }
}
const borderRightColorChange = (e) => {
    // target.style.borderRightColor = e.detail.color.rgba;
     if((e.timeStamp - timeStamp) >= 50){
         generateWeCss('borderRightColor', e.detail.color.rgba);
     }
}
// Background Color Changes
const bgColorChange = (e) => {
    // target.style.backgroundColor = e.detail.color.rgba;
     if((e.timeStamp - timeStamp) >= 50){
         generateWeCss('backgroundColor', e.detail.color.rgba);
     }
}


const toggleFontWeight = (e) => {
    const fontWeight = targetStyles.fontWeight > 400 ? 400 : 800;
    // target.style.fontWeight = targetStyles.fontWeight > 400 ? 400 : 800;
    e.target.classList.toggle('active');
    generateWeCss('fontWeight', fontWeight);
}
const toggleFontUnderline = (e) => {
    const textDecoration =  targetStyles.textDecorationLine === 'underline'? 'none' :  'underline';
    // target.style.textDecorationLine =  targetStyles.textDecorationLine === 'underline'? 'none' :  'underline';
    e.target.classList.toggle('active');
    generateWeCss('textDecorationLine' , textDecoration);
}

const toggleFontItalic = (e) => {
    const fontStyle =  targetStyles.fontStyle === 'italic'? 'normal' :  'italic';
    // target.style.fontStyle =  targetStyles.fontStyle === 'italic'? 'normal' :  'italic';
    e.target.classList.toggle('active');
    generateWeCss('fontStyle', fontStyle);
}




//  Element height
const heightChange = (e)=> {
    const h =  e.target.value  + 'px';
    // target.style.height = h;
    // target.style.maxHeight = h;
    generateWeCss('height' , h);
    generateWeCss('maxHeight' , h);
}

//  Element Width
const widthChange = (e)=> {
    const w =  e.target.value  + 'px';
    // target.style.width = w;
    // target.style.maxWidth = w;
    generateWeCss('width', w);
    generateWeCss('maxWidth', w);
}






/**
 * Input change based on traget attributte
 * change can be decteted on multiple controls
 * 
 * */ 
const propChange = (e) => {
    const inputEl = e.target; 
    const cssProp = inputEl.dataset.target;
    let propValue = ''; 
    if( cssProp === 'backgroundPositionX' || cssProp === 'backgroundPositionY' ){
        propValue = inputEl.value + '%';
    }
    else {
        propValue = isNaN(inputEl.value)? inputEl.value: inputEl.value + 'px';
    }
    // target.style[cssProp] = bgPos;
    generateWeCss(cssProp, propValue);
}

// Upload local image as img src
const uploadLocalImg = (e)=> {
    const ext = e.target.value.replace(/^.*\./, '').toLowerCase();
    if(!['gif','png','jpg','jpeg'].includes(ext)) {
        alert('Only Image can be Upload!');
        return
    }
    // Create image blob
    const imgUrl  =  URL.createObjectURL(event.target.files[0]);
    target.src  =  imgUrl;
    target.srcset  = imgUrl;
    $id('we-content-img-wrapper').style.backgroundImage = `url(${imgUrl})`;
}
// Enter Image Src 
const changeImgSrc = (e)=> {
    const imgUrl =  e.target.value;
    target.src     =  imgUrl;
    target.srcset  = imgUrl;
    $id('we-content-img-wrapper').style.backgroundImage = `url(${imgUrl})`;
}



// Upload local image as background image
const uploadLocalBg = (e)=> {
    const ext = e.target.value.replace(/^.*\./, '').toLowerCase();
    if(!['gif','png','jpg','jpeg'].includes(ext)) {
        alert('Only Image can be Upload!');
        return
    }
    // Create image blob
    const bgUrl  =  `url(${URL.createObjectURL(event.target.files[0])})`;;
    target.style.backgroundImage  =  bgUrl;
    showBgImg(bgUrl);
    // generateWeCss('backgroundImage', bgUrl);
}


// Enter background image URL
const changeBg = (e)=> {
    const bgUrl = `url(${e.target.value})`;
    // target.style.backgroundImage  =  bgUrl;
    showBgImg(bgUrl);
    generateWeCss('backgroundImage', bgUrl);
}

// Remove background Image
const removeBgImg = (e)=> {
    // target.style.backgroundImage  = '';
    showBgImg('none');
    $id('we-bg-url').value = '';
    $id('we-bg-control').value = '';
    generateWeCss('backgroundImage', '');
}



const bgSizeChange = (e)=> {
    const bgSize =  e.target.value;
    if(bgSize === 'custom') {
        $id('we-c-bg-grp').style.display = 'flex';
        if(!$id('we-bgszwc').value) {
           $id('we-bgszwc').value = 100;
        }
        if(!$id('we-bgszhc').value) {
            $id('we-bgszhc').value = 100;
        }
        const bgW =  $id('we-bgszwc').value;
        const bgH = $id('we-bgszhc').value;
        // target.style.backgroundSize = `${bgW}px ${bgH}px`;
        generateWeCss('backgroundSize', `${bgW}px ${bgH}px`);
        return;
    }

    $id('we-c-bg-grp').style.display = 'none';
    // target.style.backgroundSize =  bgSize;
    generateWeCss('backgroundSize', bgSize);
}


const bgHeightChange = (e)=> {
    const bgW = $id('we-bgszwc').value;
    let bgH = e.target.value;
    // target.style.backgroundSize = `${bgW}px  ${bgH}px`;
    generateWeCss('backgroundSize', `${bgW}px  ${bgH}px`);
}

const bgWidthChange = (e)=> {
    const bgH = $id('we-bgszhc').value;
    let bgW = e.target.value;
    // target.style.backgroundSize = `${bgW}px  ${bgH}px`;
    generateWeCss('backgroundSize', `${bgW}px  ${bgH}px`);

}



function borderRadiusChange(e) {
  let borderRadius = "";
  let brVal = e.target.value;

  document
    .querySelectorAll('#we-border-radius [data-link="borderRadius"]')
    .forEach((brInput) => {
      if (isRadiusLinked) {
        brInput.value = brVal;
        borderRadius = brVal + "px";
      } else {
        brInput.value = parseInt(brInput.value) ? brInput.value : 0;
        borderRadius += ` ${brInput.value}px`;
      }
    });

//   target.style.borderRadius = borderRadius;
  generateWeCss('borderRadius', borderRadius);
}



/**
 * Box shadow update
 * */ 

 const boxShadowUpdate = (e) => {
    // target.style.boxShadow = `${boxshadow.c} ${boxshadow.x}px ${boxshadow.y}px ${boxshadow.b}px ${boxshadow.a}`;
    generateWeCss('boxShadow', `${boxshadow.c} ${boxshadow.x}px ${boxshadow.y}px ${boxshadow.b}px ${boxshadow.a}`);
}


// Box shadow Color
const boxShadowColorChange = (e) => {
   boxshadow.c = e.detail.color.rgba;
   if((e.timeStamp - timeStamp) >= 50){
        boxShadowUpdate();
   }
}
const boxShadowX = (e) => {
   boxshadow.x = e.target.value;
   boxShadowUpdate();
}
const boxShadowY = (e) => {
   boxshadow.y = e.target.value;
   boxShadowUpdate();
}
const boxShadowB = (e) => {
   boxshadow.b = e.target.value;
   boxShadowUpdate();
}
const boxShadowA = (e) => {
   boxshadow.a = e.target.value;
   boxShadowUpdate();
}



// Generate selected elemnt css
function generateWeElCss(){
    if(!$id('weStylesheet') || !target){
        return
    }
    isFullCss = false;
    $id('we-full-css').style.display = 'block';
    $id('we-el-css').style.display = 'none';
    const weStylesheet = $id('weStylesheet').sheet;
    const selector  = generateElSelector(target);
    let CSS_CODE = `<li><span class="we-css-sel">${selector}</span> {</li>`;

    for(var i = 0; i < weStylesheet.cssRules.length; i++) {
        let rule = weStylesheet.cssRules[i];
        if(rule.selectorText.replace(/\s+/g, '') === selector){
            // assign css properties and values
            for(var s = 0; s < rule.style.length; s++) {
                const PROP = rule.style[s];
                const PROP_VAL = rule.style[PROP];
                CSS_CODE += `<li><span class="we-css-prop">${PROP}</span> : <span class="we-css-val">${PROP_VAL}</span>;</li>`;
            }
        }
    }

    // end of rule
    CSS_CODE += `<li>}</li>`;
    $id('we-css-title').innerText = 'Selected Element CSS';
    $id('we-css-note').innerHTML = CSS_CODE;
}


/**
 * Generate WE full Style sheet
 * */ 
function generateWeFullCss(){
    if(!$id('weStylesheet')){
        return
    }
    $id('we-full-css').style.display = 'none';
    $id('we-el-css').style.display = 'block';
    isFullCss = true;
    let CSS_CODE = '';
    const weStylesheet = $id('weStylesheet').sheet;
    for(var i = 0; i < weStylesheet.cssRules.length; i++) {
        let rule = weStylesheet.cssRules[i];
        //Start rule with set css selector
        CSS_CODE += `<li><span class="we-css-sel">${rule.selectorText}</span> {</li>`;
        // assign css properties and values
        for(var s = 0; s < rule.style.length; s++) {
            const PROP = rule.style[s];
            const PROP_VAL = rule.style[PROP];
            CSS_CODE += `<li><span class="we-css-prop">${PROP}</span> : <span class="we-css-val">${PROP_VAL}</span>;</li>`;
        }
        // end of rule
        CSS_CODE += `<li>}</li>`;
    }
    $id('we-css-title').innerText = 'WE Stylesheet';
    $id('we-css-note').innerHTML = CSS_CODE;
}



/**
 * Edit CSS 
 * @param e : event 
 * @returns 
 */ 
function editCSS(e){
    const weStylesheet = $id('weStylesheet');
    let  weCssNew = e.target.innerText
    if(!isFullCss){
        const selector  = generateElSelector(target);

        if(weCss.includes(selector)){
            const si = weCss.indexOf(`${selector} {`);
            const li = weCss.indexOf('}' , si);
            let currentElRule = weCss.substr(si , (li - (si - 3)));
            weCss = weCss.replace(currentElRule , weCssNew);
        } else {
            weCss += weCssNew;
        } 
    } else {
        weCss = weCssNew;
    }

    // Update Stylesheet with changes
    weStylesheet.innerHTML = weCss;
    // update WE app UI
    if(target){
        selectElement(false, target);
    }
    // Store changes if save active
    if(isStoreCss){ saveCSS() }
}



/**
 * Create Style sheet based user changes
 * @prop : modified CSS property 
 * */ 

function generateWeCss(property , value) {
    if(!target || !target.tagName || !$id('weStylesheet') ){
        return 
    }
    const selector  = generateElSelector(target);
    const weStylesheet = $id('weStylesheet');
    weCss = weStylesheet.innerHTML;
    property = property.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`); // Make css prop from js
    // check inline style 
    value =  target.style[property]? `${value} !important`: value;
    const cssRule = `${property} : ${value};`;
    
    // Change it if it exists
    if(weCss.replace(/\s+/g, '').includes(selector +'{')){
        const si = weCss.indexOf(`${selector} {`);
        const li = weCss.indexOf('}' , si);
        let currentElRule = weCss.substr(si , (li - (si - 3)));
        // Check property exists
        if(currentElRule.includes(property)){
            const pi = currentElRule.indexOf(property);
            const pli = currentElRule.indexOf(';', pi);
            let xCssRule = currentElRule.substr(pi, (pli - (pi - 1)));
            weTargetCss = currentElRule.replace(xCssRule, cssRule);
        } else{ 
            weTargetCss = currentElRule.replace(`}`, `${cssRule} \n}`);
        }
        // update rules
        weCss = weCss.replace(currentElRule , weTargetCss);
    } else {
        weTargetCss = `${selector} { ${cssRule} } \n`;
        weCss += weTargetCss;
    }    
    weStylesheet.innerHTML = weCss;
    // Store changes if save active
    if(isStoreCss){ saveCSS() }
}


/**
 * generate css selector
 * @param {*} element 
 * @returns CSS selector with parents 
 */

function generateElSelector(element){
    const idx = (sib, name) => sib 
        ? idx(sib.previousElementSibling, name||sib.localName) + (sib.localName == name)
        : 1;
    const segs = elm => !elm || elm.nodeType !== 1 
        ? ['']
        : elm.id && document.getElementById(elm.id) === elm
            ? [`#${elm.id}`]
            : [...segs(elm.parentNode),  `${elm.localName.toLowerCase()}:nth-of-type(${idx(elm)})`];
    return segs(element).join('>');
}

/**
 * Create we Stylesheet
 * **/ 

function createWEStylesheet(cssCode) {
    // Check css exists
    if($id('weStylesheet')){
        return
    } else {
        const weStylesheet = document.createElement('style');
        weStylesheet.type = 'text/css';
        weStylesheet.setAttribute('id', 'weStylesheet')
        weStylesheet.innerHTML = cssCode;
        document.body.appendChild(weStylesheet);
    }
}