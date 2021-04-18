// Data Population
function populateMargin(){
   $id('we-mtc').value = toNumb(targetStyles.marginTop);
   $id('we-mrc').value = toNumb(targetStyles.marginRight);
   $id('we-mbc').value = toNumb(targetStyles.marginBottom);
   $id('we-mlc').value = toNumb(targetStyles.marginLeft);
}


function populatePadding(){
   $id('we-ptc').value = parseInt(targetStyles.paddingTop);
   $id('we-prc').value = parseInt(targetStyles.paddingRight);
   $id('we-pbc').value = parseInt(targetStyles.paddingBottom);
   $id('we-plc').value = parseInt(targetStyles.paddingLeft);
}

function populateSize(){
   $id('we-swc').value = toNumb(targetStyles.width);
   $id('we-shc').value = toNumb(targetStyles.height);
}

function populateTypography(){

    // Remove Active classess
    $id('we-fb').classList.remove('active');
    $id('we-fu').classList.remove('active');
    $id('we-fi').classList.remove('active');
    $id('we-align-left').classList.remove('active');
    $id('we-align-right').classList.remove('active');
    $id('we-align-center').classList.remove('active');
    $id('we-align-justify').classList.remove('active');


    // Font size
    $id('we-fzc').value = toNumb(targetStyles.fontSize);
    // Font line Height
    $id('we-flhc').value = toNumb(targetStyles.lineHeight);
    // Font letter Spacing 
    $id('we-flsc').value = toNumb(targetStyles.letterSpacing);

    // Check fw bold or not
    if( parseInt(targetStyles.fontWeight) > 400 ) {
        $id('we-fb').classList.add('active');
    }

    // Check underline or not
    if( targetStyles.textDecoration.includes('underline') ) {
        $id('we-fu').classList.add('active');
    } 

    // Check underline or not
    if( targetStyles.fontStyle === 'italic' ) {
        $id('we-fi').classList.add('active');
    } 



    // Text Aligment
    switch ( targetStyles.textAlign ) {
        case 'left':
            $id('we-align-left').classList.add('active');
            break;
        case 'right':
            $id('we-align-right').classList.add('active');
            break;
        case 'center':
            $id('we-align-center').classList.add('active');
            break;
        case 'justify':
            $id('we-align-justify').classList.add('active');
        }
    


    // Color assign to font color  Picker
    colorPickerComp.colorChange( rgba2hex(targetStyles.color)  , $id('we-fc'));
}





function populateBorder(e){
    if (!e) {
        const brdArry = targetStyles.borderWidth.split(' ');
        toggleBorderLink(false, brdArry.length === 1);
    }

    // width
    $id('we-bt-sc').value = parseInt(targetStyles.borderTopWidth);
    $id('we-bb-sc').value = parseInt(targetStyles.borderBottomWidth);
    $id('we-bl-sc').value = parseInt(targetStyles.borderLeftWidth);
    $id('we-br-sc').value = parseInt(targetStyles.borderRightWidth);
    $id('we-bsc').value = parseInt(targetStyles.borderWidth);
    
    // Style
    $id('we-bt-ct').value =  targetStyles.borderTopStyle;
    $id('we-bb-ct').value =  targetStyles.borderBottomStyle;
    $id('we-bl-ct').value =  targetStyles.borderLeftStyle;
    $id('we-br-ct').value =  targetStyles.borderRightStyle;
    $id('we-bct').value =  targetStyles.borderStyle;



    // color Picker
    colorPickerComp.colorChange( rgba2hex(targetStyles.borderTopColor)  , $id('we-bt-cc'));
    colorPickerComp.colorChange( rgba2hex(targetStyles.borderBottomColor)  , $id('we-bb-cc'));
    colorPickerComp.colorChange( rgba2hex(targetStyles.borderLeftColor)  , $id('we-bl-cc'));
    colorPickerComp.colorChange( rgba2hex(targetStyles.borderRightColor)  , $id('we-br-cc'));
    colorPickerComp.colorChange( rgba2hex(targetStyles.borderColor)  , $id('we-bcc'));
}


/***
 * Toggle Border
 * 
 * */ 

function toggleBorderLink(e , toggle) {

  isBorderLinked = e? !isBorderLinked: toggle;

  const brAll = $id("we-border-form-all");
  const brSplit = $id("we-border-split");
  const ico = $id('toggleBorderLink').firstElementChild.classList;
  if (isBorderLinked) {
    brAll.style.display = "flex";
    brSplit.style.display = "none";
    ico.remove("we-ico-unlink");
    if(e){
        target.style.borderStyle = $id('we-bct').value;
        target.style.borderColor = $id('we-bcc').dataset.color;
        target.style.borderWidth = $id('we-bsc').value + 'px';
    }

  } else {
    if(e) { populateBorder(e) }
    brAll.style.display = "none";
    brSplit.style.display = "block";
    ico.add("we-ico-unlink");
  }
}


/**
 * Border Radius
 * Populate
 * **/ 

const populateBorderRadius = ()=> {
    const brArry = targetStyles.borderRadius.split(' ');
    const tl = $id('we-radius-tl');
    const tr = $id('we-radius-tr');
    const br = $id('we-radius-br');
    const bl = $id('we-radius-bl');
    toggleBorderRadius(false, brArry.length === 1);

    switch ( brArry.length ) {
        case 2:
            tl.value = br.value =  getPx(brArry[0]);
            tr.value = bl.value = getPx(brArry[1]);
            break;
        case 3:
            tl.value = getPx(brArry[0]);
            br.value = getPx(brArry[1]);
            tr.value = bl.value = getPx(brArry[2]);
            break;
        case 4:
            tl.value = getPx(brArry[0]);
            tr.value = getPx(brArry[1]);
            br.value = getPx(brArry[2]);
            bl.value = getPx(brArry[3]);
            break;
        default:
            tl.value = tr.value = br.value = bl.value = getPx(brArry[0]);
    }


}


/**
 * Border Radius
 * Toggle Border radius
 * **/ 

function toggleBorderRadius(e, toggle) {

    isRadiusLinked = e? !isRadiusLinked: toggle;

    const ico = $id('toggleBorderRadius').firstElementChild.classList;
    const frmGrp = $qs("#we-border-radius-form").classList;
    if(isRadiusLinked){
         ico.remove("we-ico-unlink");
         frmGrp.add("we-space-less-form");
        } else{
            ico.add("we-ico-unlink");
            frmGrp.remove("we-space-less-form");
    }
}


/**
 * Box Shadow 
 * **/ 

function populateBoxshadow(){
    const shadow = targetStyles.boxShadow;
    boxshadow = { x:0, y: 0, b: 0, a: '' , c: '#000000' }

    if(shadow && shadow !== 'none'){
        const colorCode = /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig;
        const colors = shadow.match(colorCode);
        const shadowArray = shadow.replaceAll(colors[0], '').trim().split(' ');
        boxshadow.x = getPx(shadowArray[0]);
        boxshadow.y = getPx(shadowArray[1]);
        boxshadow.b = getPx(shadowArray[2]);
        boxshadow.a = shadowArray[4] === 'inset'? 'inset': '';
        boxshadow.c = rgba2hex(colors[0]);
    } 

    colorPickerComp.colorChange( boxshadow.c , $id('we-bxsdc'));
    $id('we-bxsh-x').value = boxshadow.x;
    $id('we-bxsh-y').value = boxshadow.y;
    $id('we-bxsh-blr').value = boxshadow.b;
    $id('we-bxsh-pos').value = boxshadow.a;
}



/**
 * Background Image is valid 
 * show bg image realted elements
 * */ 
const showBgImg = (bg )=> {

    const prop = $id('we-bg-prop');
    const btnRemove =  $id('we-bg-remove');
    const bgImgWrapper = $id('we-background-img-wrapper');
    // Assign demo bg
    bgImgWrapper.style.backgroundImage = bg;

    if(!bg || bg === 'none'){
        prop.style.display = 'none';
        btnRemove.style.display = 'none';
        bgImgWrapper.classList.remove('valid')
    } else {
        prop.style.display = 'block';
        btnRemove.style.display = 'block';
        bgImgWrapper.classList.add('valid')
    }
}


function populateBackground(){
    // background color Picker
    colorPickerComp.colorChange( rgba2hex(targetStyles.backgroundColor)  , $id('we-bgcc'));
    let bgImg = targetStyles.backgroundImage;
    isBgGradient = bgImg.match(/linear-gradient|radial-gradient/g)? true: false;
    let getFirstProp = (item)=> {
        if(item.includes(',')){
            return item.split(',')[0];
        } else {
            return item
        }
    }

    if(isBgGradient && !bgImg.includes('url(')){    
        gradientTojson(bgImg) // Generate gradient json
        tabGradient(false) // Show Gradient Tab 
        return 
    } 
    if(bgImg.includes('url(')){
        bgImg = bgImg.match(/url\((?!['"]?(?:data|http):)['"]?([^'"\)]*)['"]?\)/)[1];
    }

    showBgImg(bgImg); // Populate image data
    tabImage(false); // Show Image Tab 
    
    // Bg Repeat
     $id('we-bgrc').value =  getFirstProp(targetStyles.backgroundRepeat)
    //  BG Attachment
     $id('we-bgac').value =  getFirstProp(targetStyles.backgroundAttachment)

    //  BG position
    $id('we-bgxc').value =  toNumb(targetStyles.backgroundPositionX)
    $id('we-bgyc').value =  toNumb(targetStyles.backgroundPositionY);


    // Bg Size 
    if(isNaN(parseInt(targetStyles.backgroundSize)) && !targetStyles.backgroundSize.includes('auto') ) {
        $id('we-bgszsc').value = targetStyles.backgroundSize;
        $id('we-c-bg-grp').style.display = 'none';
    } else {
        $id('we-bgszsc').value = 'custom';
        $id('we-c-bg-grp').style.display = 'flex';

        const bgSizeArray =  targetStyles.backgroundSize.split(/, | /);
        $id('we-bgszwc').value = bgSizeArray[0] === 'auto'? 0 : parseInt(bgSizeArray[0]);
        if(bgSizeArray.length > 1){
            $id('we-bgszhc').value = bgSizeArray[1] === 'auto'? 0 : parseInt(bgSizeArray[1]);
        }
    }

}
