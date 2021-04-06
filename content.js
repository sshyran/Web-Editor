'use strict';


chrome.runtime.onMessage.addListener(messageReciver);
syncCSS();

/**
 * Listen for messges sent by backaground.js
 * if user clicks on Web-Editor app icon this will trigger
 * */ 
function messageReciver(msg, sender, sendResponse) {
    // let isContext = msg === 'context';
    if(appToggle) {
        return
    }
    // Always show WE APP from context and extention nav
    showWEApp()
}


// Show WE APP
function showWEApp() {
    const WEAPP = document.getElementById('we-app-window');
    appToggle = true ;
    webInspector();
    if(WEAPP){
        WEAPP.style.display = 'block';
    } else {
        // WEAPP not exisit create WE APP 
        createWEApp();
        weAppEventRegister();
    }
}

// Hide WE APP
function removeWEApp() {
    const WEAPP = document.getElementById('we-app-window');
    appToggle = false;
    webInspector();
    if (WEAPP) {
        WEAPP.style.display = 'none';
    }
}



function webInspector() {
    document.querySelectorAll('body  *').forEach(element => {
        /**
         * Omit elements adding event listeners
         * @items_omited:  Web editor elements , svg childers , scripts , hidden elements , color picker elements
         * */ 
        if( element.id &&  element.id === 'we-app-window' ||  
            element.offsetParent &&  element.offsetParent.id && 
            element.offsetParent.id === 'we-app-window'   || 
            element.id &&  element.id === 'color_picker'  ||  
            $id('color_picker').contains(element) ||
            element.offsetParent &&  element.offsetParent.id && 
            element.offsetParent.id === 'color_picker'    ||
            element.clientWidth === 0 && element.clientHeight === 0 ||
            element.viewportElement && element.viewportElement.tagName.toLowerCase() === 'svg' ||
            element.tagName.toLowerCase() === 'script' ||
            element.tagName.toLowerCase() === 'style'  ||
            element.tagName.toLowerCase() === 'source'  ||
            element.tagName.toLowerCase() === 'path'  ||
            element.style.display === 'none' ) {
            return ; 
        } 
        
        if( element.tagName.toLowerCase() === 'svg'){
            findWebsiteSvgImages(element)
            return ;
        }

        
        if(appToggle) {
            // Add event listeners Web editor opened
            element.addEventListener('mouseover', addInspector);
            element.addEventListener('mouseout', removeInspector);
            element.addEventListener('click', selectElement);
            element.contentEditable = true;

            findWebsiteColors(element);
            findWebsiteImages(element);

        } else {
            // Remove WE element highlighter 
            element.classList.remove('web-editor-inspect');
            element.classList.remove('web-editor-inspect-active');

            // Remove event listeners Web editor closed
            element.removeEventListener('mouseover', addInspector);
            element.removeEventListener('mouseout', removeInspector);
            element.removeEventListener('click', selectElement);
            element.contentEditable = false;
        }
    })
}


// 
/**
 *Prevent Event bubbling
 *  */ 
function stopBubbling(e) {
    e.stopPropagation();
    e.preventDefault();
}

// Add inspector Class
function addInspector(event) {
    event.stopPropagation();
    event.target.classList.add('web-editor-inspect');
}


// Remove inspector Class
function removeInspector(event) {
    event.stopPropagation()
    event.target.classList.remove('web-editor-inspect')
}


/*
* Find website colors
* @pram el : element
*/ 
function findWebsiteColors(el) {
    const elStyle = getComputedStyle(el);
    const addColor = (color)=> { 
        if(color && !websiteColors.includes(color)) {
            websiteColors.push(color);
        }
    };

    addColor(elStyle.color);
    addColor(elStyle.backgroundColor);
    addColor(elStyle.borderTopColor);
    addColor(elStyle.borderBottomColor);
    addColor(elStyle.borderLeftColor);
    addColor(elStyle.borderRightColor);
}


/*
* Find website Images
* @pram el : element
*/ 
function findWebsiteImages(el) {
    const elStyle = getComputedStyle(el);
    const addImg = (img)=> { 
        if(img && !websiteImages.includes(img)) {
            websiteImages.push(img);
        }
    };
    // Background src
    if( elStyle.backgroundImage && 
        elStyle.backgroundImage !== 'none' &&  
        elStyle.backgroundImage.includes('url(') ){
            let imgUrl = elStyle.backgroundImage;
            addImg(imgUrl.slice(5, -2));
    }

    // Img src
    if(el.tagName.toLowerCase() === 'img' ){
        addImg(el.src);
    }
}

/*
* Find website svg Images
* @pram el : element
*/ 
function findWebsiteSvgImages(svg) {
    const addImg = (img)=> { 
        if(img && !websiteImages.includes(img)) {
            websiteImages.push(img);
        }
    };

    if(svg){
        let serializer = new XMLSerializer();
        let source = serializer.serializeToString(svg);
        //add name spaces.
        if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }
        //add xml declaration
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
        //convert svg source to URI data scheme.
        let imgUrl = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
        addImg(imgUrl);
    }
}


// Select element
function selectElement(e, el) {
    if(e){
        e.stopPropagation();
        e.preventDefault();
        timeStamp = e.timeStamp;
        target = e.target;
    } else{
        target = el;
    }

    if( $qs('.web-editor-inspect-active') ) {
        $qs('.web-editor-inspect-active').classList.remove('web-editor-inspect-active');
    }
    target.classList.add('web-editor-inspect-active');
    updateWEApp();
    $id('we-app-body').scrollTop = 0;
}


/**
 * Update Web editor modal with selected elements
 * @pram target : element selected by user
 * */ 
function updateWEApp(){
    targetStyles = getComputedStyle(target);
    /**
     * Check Element display Type and Manage Froms
     * For display inline elements height , width marign vertical will not work
     * **/ 

    if(targetStyles.display === 'inline') {
        $id('we-size').style.display = 'none';
        $id('we-mtc').disabled = true;
        $id('we-mbc').disabled = true;
    } else {
        $id('we-size').style.display = 'block';
        $id('we-mtc').disabled = false;
        $id('we-mbc').disabled = false;
    }

    /**
     * Check Element Type assign Properties
     * **/ 
    if( target.tagName.toLowerCase() === 'img' ) {
        // For Image Elements
        hideNoneImgProperties();
        $id('we-img-content').style.display = 'block';
        $id('we-content-img-wrapper').style.backgroundImage = `url(${target.src})`;
        $id('we-content-img-wrapper').style.backgroundColor = targetStyles.backgroundColor;
        populateBackground();

    } else if( target.tagName.toLowerCase() === 'svg' || 
        target.tagName.toLowerCase() === 'canvas' || 
        target.tagName.toLowerCase() === 'video'  ||
        target.tagName.toLowerCase() === 'audio'  ||
        target.tagName.toLowerCase() === 'iframe' ) {
        // For Embed Elements
        hideNoneEmbedProperties();
    } else {
        // For Text Elements
        $id('we-img-content').style.display = 'none';
        showTextProperties()
        populateTypography();
        populateBackground();
    }


    // Matching For All Elements
    populateMargin();
    populatePadding();
    populateSize();
    populateBorder();
    populateBorderRadius();
    populateBoxshadow();
}


// Modify Text content

function weAppEventRegister( ){
    // Assign color picker
    fontColorPicker = new ColorPicker($id('we-fc'));
    borderColorPicker = new ColorPicker($id('we-bcc'));
    borderTopColorPicker = new ColorPicker($id('we-bt-cc'));
    borderBottomColorPicker = new ColorPicker($id('we-bb-cc'));
    borderLeftColorPicker = new ColorPicker($id('we-bl-cc'));
    borderRightColorPicker = new ColorPicker($id('we-br-cc'));
    boxShadowColorPicker = new ColorPicker($id('we-bxsdc'));
    bgColorPicker = new ColorPicker($id('we-bgcc'));


    // Prevent event bubbling 
    $id('color_picker').addEventListener('click', stopBubbling);

    // Color Pickers
    $id('we-fc').addEventListener("colorChange", fontColorChange);
    $id('we-bgcc').addEventListener("colorChange", bgColorChange);

    $id('we-bcc').addEventListener("colorChange", borderColorChange);
    $id('we-bt-cc').addEventListener("colorChange", borderTopColorChange);
    $id('we-bb-cc').addEventListener("colorChange", borderBottomColorChange);
    $id('we-bl-cc').addEventListener("colorChange", borderLeftColorChange);
    $id('we-br-cc').addEventListener("colorChange", borderRightColorChange);
    
    //  Close WE App
    $id('we-app-btn-close').addEventListener('click', removeWEApp);
    $id('we-store-css').addEventListener('change', toggleStoreCSS);

    // Text Alignment
    $id('we-align-left').addEventListener('click', textAlign);
    $id('we-align-right').addEventListener('click', textAlign);
    $id('we-align-center').addEventListener('click', textAlign);
    $id('we-align-justify').addEventListener('click', textAlign);


    //  Font Styles
    $id('we-fb').addEventListener('click', toggleFontWeight);
    $id('we-fu').addEventListener('click', toggleFontUnderline);
    $id('we-fi').addEventListener('click', toggleFontItalic);

    // Element Size
    $id('we-swc').addEventListener('input', widthChange);
    $id('we-shc').addEventListener('input', heightChange);
    
    
    // Border
    $id('toggleBorderLink').addEventListener('click', toggleBorderLink);
    // BorderRadius
    $id('toggleBorderRadius').addEventListener('click', toggleBorderRadius);
    
    document.querySelectorAll('#we-border-radius-form input[data-link="borderRadius"]').forEach(el => {
        el.addEventListener('input', borderRadiusChange);
    })

    // Boxshadow
    $id('we-bxsdc').addEventListener("colorChange", boxShadowColorChange);
    $id('we-bxsh-x').addEventListener("input", boxShadowX);
    $id('we-bxsh-y').addEventListener("input", boxShadowY);
    $id('we-bxsh-blr').addEventListener("input", boxShadowB);
    $id('we-bxsh-pos').addEventListener("input", boxShadowA);

    // Image src changes
    $id('we-img-control').addEventListener('change', uploadLocalImg);
    $id('we-img-url').addEventListener('input', changeImgSrc)
    
    // Image Tab
    document.getElementById('we-tab-btn-bg').addEventListener('click', tabImage);
    document.getElementById('we-tab-btn-grd').addEventListener('click', tabGradient);
    
    // Background Image changes
    $id('we-bg-control').addEventListener('change', uploadLocalBg);
    $id('we-bg-url').addEventListener('input', changeBg);
    // Remove BG image
    $id('we-bg-remove').addEventListener('click', removeBgImg);

    // Background Size
    $id('we-bgszsc').addEventListener('change', bgSizeChange);
    $id('we-bgszhc').addEventListener('input', bgHeightChange);
    $id('we-bgszwc').addEventListener('input', bgWidthChange);

    // Gradient
    $id('add-grd-btn').addEventListener('click', grdAddClr);
    $id('grd-type').addEventListener('change', grdTypeChange);
    $id('we-angle-range').addEventListener('input', grdAngleChange);
    $id('we-angle-numb').addEventListener('input', grdAngleChange);


    // Assign Input change to All common Css Props 
    document.querySelectorAll('#we-app-window [data-target]').forEach(el => {
        el.addEventListener('input', propChange);
    })

    // Main tab Switch 
    document.querySelectorAll('.we-foot-nav-btn').forEach(tabBtn => {
        tabBtn.addEventListener('click', mainTabSwitch);
    });
    //tab Switch 
    document.querySelectorAll('.we-btn-tab').forEach(tabBtn => {
        tabBtn.addEventListener('click', tabSwitch);
    });

    // CSS
    
    $id('we-css-note').addEventListener('input', editCSS);
    $id('we-full-css').addEventListener('click', generateWeFullCss);
    $id('we-el-css').addEventListener('click', generateWeElCss);
    
}


// Toggle store btn
function toggleStoreCSS(e) { 
  isStoreCss = e.target.checked;
  if(isStoreCss){
    saveCSS();
  } else {
    removeCSS();
  }
}

// Sync CSS
function syncCSS() {
  chrome.storage.sync.get([hostname], function(weCssFromStore) {
      if(weCssFromStore[hostname]) {
        weCss = weCssFromStore[hostname]; 
        isStoreCss = true;
      }
    createWEStylesheet(weCss);
  }); 
}

// Save CSS
function saveCSS() {
  chrome.storage.sync.set({[hostname] : weCss}, function() {
    // Notify Styles saved.
    console.log('Style changes saved');
  });
}
// Delete CSS
function removeCSS() {
  chrome.storage.sync.remove([hostname], function() {
    console.log('Removed Styles from Store');
  });
}