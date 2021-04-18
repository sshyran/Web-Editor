
/**
 * Assign Gradent to target element and showcase Div
 * */ 

function updateGradient() { 
  const grdImg = grdCodeGenrator();
  $id("we-grd-bg-showcase").style.backgroundImage = grdImg;
  // target.style.backgroundImage = grdImg;
  generateWeCss('backgroundImage', grdImg);
}


/*
*  Gradient Area/Range Change
*/ 
function grdRangeClr(e) {
  const el = e.target.parentElement;
  const i = [...el.parentElement.children].indexOf(el);
  grCollection[i].range = e.target.value;
  updateGradient();
}


/*
*  Gradient Color Picker
*/ 
function grdPickClr(e) {
  const el = e.target.parentElement;
  const i = [...el.parentElement.children].indexOf(el);
  // grCollection[i].color =  e.target.value;
  grCollection[i].color =  e.detail.color.rgba;
  updateGradient();
}


/*
*  Gradient Type Change
*/ 
function grdTypeChange(e, val) {
  grdType = val? val : e.target.value ;
  const angEl = $id("grd-angle");
  $id("grd-type").value = grdType; 
  if (grdType === "linear-gradient") {
    angEl.style.display = "inline-block";
  } else {
    angEl.style.display = "none";
  }
  if(e){
    updateGradient();
  }
}


/*
*  Gradient Angle Change
*/ 
function grdAngleChange(e , val) {
  grdAngle = val? angleToDeg(val) : e.target.value + 'deg';
  $id('we-angle-range').value = parseInt(grdAngle);
  $id('we-angle-numb').value = parseInt(grdAngle);
  if(e){
    updateGradient();
  }
}


/**
 * Convert string Angle to deg 
 * */ 
function angleToDeg(angle){
  if(angle.includes('deg')){
    return angle;
  }

  switch (angle) {
      case ('to top'):
          angle = '360deg';
          break;
      case ('to bottom'):
          angle = '180deg';
          break;
      case ('to left'):
          angle = '270deg';
          break;
      case ('to right'):
          angle = '90deg';
          break;
      case ('to left bottom'):
          angle = '225deg';
          break;
      case ('to left top'):
          angle = '315deg';
          break;
      case ('to right top'):
          angle = '45deg';
          break;
      case ('to right bottom'):
          angle = '135deg';
          break;
      default:
          angle = '0deg';
  }
  return angle;
}




/*
* Gradient Image Genorator
*/ 
function grdCodeGenrator() {
  if(!grCollection.length){
    return 
  }
  let angle = grdType === "linear-gradient" ? grdAngle : "circle";
  grdCode = `${grdType}(${angle},`;

  grCollection.forEach((item, i) => {
    const range = item.range ? item.range + '%': ''; // Check null
    if (grCollection.length - 1 === i) {
      grdCode += ` ${item.color} ${range})`;
      return;
    }
    grdCode += ` ${item.color} ${range},`;
  });
  return grdCode;
}


/*
* Add Gradient Color Layer 
*/ 

function createGrdSlide(collection){
  let color, range;
  const id = Math.random().toString(36).substr(2, 9);
  if (collection) {
    color = collection.color;
    range = collection.range;
  } else if (grCollection.length) {
    const lastItem = grCollection.length - 1;
    const lastR = parseInt(grCollection[lastItem].range);
    color = grCollection[0].color;
    range = lastR < 75 ? lastR + 25 : 100;
    grCollection.push({ color, range });
  } else {
    color = "rgb(81 45 168)";
    range = 0;
    grCollection.push({ color, range });
  }

  // gradientColorPicker[id] = new ColorPicker($id(`color-${id}`), rgba2hex(color));

  const colorItem = document.createElement("div");
  colorItem.setAttribute("class", "grd-clr-item");
  colorItem.setAttribute("id", id);
  colorItem.innerHTML = `<input  id="range-${id}" class="grd-clr-range" type="range" min="0" max="100" value="${range}" >
      <button  id="color-${id}" class="grd-clr-color we-clr-btn"></button>
      <button id="btn-${id}" data-parent="#${id}" class="grd-clr-remove"> &times; </button>`;

  // Populate color slides
  $id("grd-clr-box").appendChild(colorItem);

  const grdClrPick = $id(`color-${id}`);
  const pick = new ColorPicker(grdClrPick, rgba2hex(color));

  // Range
  $id(`range-${id}`).addEventListener('input', grdRangeClr);
  // color
  grdClrPick.addEventListener('colorChange', grdPickClr);
  // Remove Button
  $id(`btn-${id}`).addEventListener('click', grdRemoveClr); 
}


/*
* Add Gradient Color Layer and controls
*/ 
function grdAddClr(e, collection) { ``
  createGrdSlide(collection);
  if(e){
    updateGradient();
  }
}


/*
* Remove Gradient Color Layer and controls
*/ 

function grdRemoveClr(e) {
  if (grCollection.length === 2) {
    return;
  }
  const el = e.target.parentElement;
  const i = [...el.parentElement.children].indexOf(el);
  grCollection.splice(i, 1);
  el.remove();
  updateGradient();
}


//  Remove elemets and events
function cleanGradient(){
  // Range
  document.querySelectorAll('#grd-clr-box .grd-clr-range').forEach(range => {
      range.removeEventListener('input', grdRangeClr);
  });

  // color
  document.querySelectorAll('#grd-clr-box .grd-clr-color').forEach(color => {
      color.removeEventListener('colorChange', grdPickClr);
  });

  // Remove button
  document.querySelectorAll('#grd-clr-box .grd-clr-remove').forEach(btn => {
      btn.removeEventListener('click', grdRemoveClr);
  });

  //  remove Color slides
  $id("grd-clr-box").replaceChildren();
}



/**
 * Gradient init or reset
 * **/ 

function gradientReset() {
  grdAngle = '90deg';
  grdType = "linear-gradient";
  grdTypeChange(false, grdType); 
  grdAngleChange(false, grdAngle); 
  grCollection = [
    {
      color: "rgb(26, 115, 232)",
      range: 0
    },
    {
      color: "rgb(81, 45, 168)",
      range: 50
    }
  ];

  cleanGradient();
  // Loop through grCollection
  grCollection.forEach((item) => {
    createGrdSlide(item);
  });

  updateGradient();
}





/**
 * Covert CSS gradient image int JSON object
 * Currently this function will create only image object from this CSS gradient image
 * if input is multiple background images then function will take first image and retun to object 
 * @pram grdCode : CSS Gradient background image
 * **/ 

function gradientTojson(grdCode) {
  grCollection = [];
  const linear = "linear-gradient";
  const radial = "radial-gradient";
  const colorCode = /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/gi;
  const grdTypeArray = grdCode.match(/linear-gradient|radial-gradient/g);
  let grdImg = grdCode;
  // get sub string index
  const getPosition = (string, subString, index) => { 
    return string.split(subString, index).join(subString).length;
  };
  
  // this is not a CSS gradient image
  if(grdTypeArray.length === 0){
    return 
  }

  // IF input having multiple images 
  if (grdTypeArray.length > 1) {
    // Find second gradient image start index
    const nextGrdIndex = grdTypeArray[0] === grdTypeArray[1] ? getPosition(grdCode, grdTypeArray[1], 2) : grdCode.indexOf(grdTypeArray[1]);
    grdImg = grdCode = grdCode.substr(0, nextGrdIndex).trim().slice(0, -1); // Keep first image only and remove all other image codes 
  }

  cleanGradient();
  grdType = grdCode.includes(linear)? linear : radial; // Find Type
  grdTypeChange(false, grdType) // Update control
  grdCode = grdCode.replace(grdType + "(", ""); // Remove  type string and '(' from code
  let angleStartIndex = grdCode.indexOf(","); 
  grdAngle = grdCode.substr(0, angleStartIndex); // Find Angle
  grdAngleChange(false, grdAngle); // Update Angle controls
  grdCode = grdCode.slice(angleStartIndex + 1).trim().slice(0, -1); // Remove Angle string and comma from code
  const colorArray = grdCode.match(colorCode); // Create Color Array
  grdCode = grdCode.replaceAll(colorCode, ""); // Remove colors frome code
  const rangeArray = grdCode.includes("%") ? grdCode.split("%") : []; // Create Range Array

  // Create Collection
  colorArray.forEach((color, i) => {
    let range = rangeArray.length ? parseInt(rangeArray[i].replace(/,/g, "")) : null; // if range value is there pass value
    grCollection.push({ color, range }); // Update Gradient collection
    createGrdSlide({ color, range }); // Create Slides 
  });

  //upadte gradient demo slide
  $id("we-grd-bg-showcase").style.backgroundImage = grdImg;
}

