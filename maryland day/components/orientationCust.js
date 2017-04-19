
function orientationCust(){
var left = document.querySelector('#left-eye');
var right = document.querySelector('#right-eye');
var leftBack = document.querySelector('#left-eye-back');
var rightBack = document.querySelector('#right-eye-back');
var loading = document.querySelector('#loading');

loading.parentNode.removeChild(loading);

//var increase = false;

function handleOrientation(event) {
  var xpos = event.beta;  // In degree in the range [-180,180]
  var zpos = event.alpha; // In degree in the range [0,360]
  int numImages = 5;
  xpos += 180;
  //changed the front view point in the scene from 0, 360 discontinuity to continuous
  var width = 360/(4*numImages*numImages);
  var x=Math.floor((zpos/width)/numImages);
  var x = x % 2;
  if(x==0){
    pos = (Math.floor(zpos/width))%numImages;}
  else{
    pos = numImages-1 - (Math.floor(zpos/width))%numImages;}
  image_num = pos+1;
  //var image_num = Math.floor((zpos/3)%13)+1;//1-13
  //if(image_num>7){
   // image_num=14-image_num;
  //}

  if(x==0){
  var blendingRatio = (zpos/width)%1;}
  else{var blendingRatio = 1- (zpos/width)%1;}

  var blendingROne = 0.4+(1-blendingRatio)*0.5999;
  var blendingRTwo = 0.4+(blendingRatio)*0.5999;
  var blendingRThree = 0.4+(1-blendingRatio)*0.5999;
  var blendingRFour = 0.4+(blendingRatio)*0.5999;
  left.setAttribute('material',"opacity", ""+ blendingROne);
  leftBack.setAttribute('material',"opacity", ""+ blendingRTwo);
  right.setAttribute('material',"opacity", ""+ blendingRThree);
  rightBack.setAttribute('material',"opacity", ""+ blendingRFour);

  left.setAttribute('material', 'src', "#tex" + image_num.toString() );
  leftBack.setAttribute('material', 'src', "#tex" + (image_num+1).toString());
  //document.querySelector("#right-eye").setAttribute('material', 'src', 'tex'+eval(data.src.charAt(3)+'+ 1')  )
  right.setAttribute('material', 'src', "#tex" + (image_num+1).toString() );
  if(image_num==numImages){
  rightBack.setAttribute('material', 'src', "#tex" + (numImages-1).toString());}
  else{rightBack.setAttribute('material', 'src', "#tex" + (image_num+2).toString());}
}

window.addEventListener('deviceorientation', handleOrientation);
}

window.addEventListener("orientationchange", function(){
  applyOrientation();
}, false);

function applyOrientation() {
  if (window.innerHeight > window.innerWidth) {
   //alert("You are now in portrait");
    /*
    var watermarkId = document.querySelector("#watermarkId");
    var camera =  document.querySelector("#camera");
    watermarkId.setAttribute("position", "-0.25 0.7 -1.1");
    watermarkId.setAttribute("rotation", "0 0 0");
    */
    //camera.setAttribute("rotation", "0 0 0");

  } else {
    //alert("You are now in landscape");
    setTimeout(function(){
       var orientationModal = document.querySelector(".a-orientation-modal");
        if(orientationModal!=null){
            //orientationModal.parentNode.removeChild(orientationModal);
            //orientationModal.className += " a-hidden";
        } 
        /*
        var watermarkId = document.querySelector("#watermarkId");
        var camera =  document.querySelector("#camera");
        watermarkId.setAttribute("position", "0.25 0.5 -1.1");
        watermarkId.setAttribute("rotation", "0 0 -90");
        */
        //camera.setAttribute("rotation", "0 0 90");

      }, 0);
  }
}
