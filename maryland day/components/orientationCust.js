
function orientationCust(){
var left = document.querySelector('#left-eye');
var right = document.querySelector('#right-eye');
var leftBack = document.querySelector('#left-eye-back');
var rightBack = document.querySelector('#right-eye-back');

//var increase = false;

function handleOrientation(event) {
  var xpos = event.beta;  // In degree in the range [-180,180]
  var zpos = event.alpha; // In degree in the range [0,360]

  xpos += 180;
  //changed the front view point in the scene from 0, 360 discontinuity to continuous
  var width = 360/(28*7);
  var x=Math.floor((zpos/width)/7);
  var x = x % 2;
  if(x==0){
    pos = (Math.floor(zpos/width))%7;}
  else{
    pos = 6 - (Math.floor(zpos/width))%7;}
  image_num = pos+1;
  //var image_num = Math.floor((zpos/3)%13)+1;//1-13
  //if(image_num>7){
   // image_num=14-image_num;
  //}

  var blendingRatio = (zpos/width)%1;
  left.setAttribute("opacity", ""+(1-blendingRatio)*0.75);
  leftBack.setAttribute("opacity", ""+(blendingRatio)*0.75);
  right.setAttribute("opacity", ""+(1-blendingRatio)*0.75);
  rightBack.setAttribute("opacity", ""+(blendingRatio)*0.75);

  left.setAttribute('material', 'src', "#tex" + image_num.toString() );
  leftBack.setAttribute('material', 'src', "#tex" + (image_num+1).toString());
  //document.querySelector("#right-eye").setAttribute('material', 'src', 'tex'+eval(data.src.charAt(3)+'+ 1')  )
  right.setAttribute('material', 'src', "#tex" + (image_num+1).toString() );
  if(image_num==7){
  rightBack.setAttribute('material', 'src', "#tex" + (6).toString());}
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
    var watermarkId = document.querySelector("#watermarkId");
    var camera =  document.querySelector("#camera");
    watermarkId.setAttribute("position", "-0.25 0.7 -1.1");
    watermarkId.setAttribute("rotation", "0 0 0");
    camera.setAttribute("rotation", "0 0 0");

  } else {
    //alert("You are now in landscape");
    setTimeout(function(){
       var orientationModal = document.querySelector(".a-orientation-modal");
        if(orientationModal!=null){
            //orientationModal.parentNode.removeChild(orientationModal);
            //orientationModal.className += " a-hidden";
        } 
        var watermarkId = document.querySelector("#watermarkId");
        var camera =  document.querySelector("#camera");
        watermarkId.setAttribute("position", "0.25 0.5 -1.1");
        watermarkId.setAttribute("rotation", "0 0 -90");
        camera.setAttribute("rotation", "0 0 90");

      }, 0);
  }
}
