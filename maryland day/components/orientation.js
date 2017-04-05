
function orientation(){
var left= document.querySelector('#left-eye');
var right= document.querySelector('#right-eye');

 
function handleOrientation(event) {
  var xpos = event.beta;  // In degree in the range [-180,180]
  var zpos = event.alpha; // In degree in the range [0,360]

  xpos += 180;
  //changed the front view point in the scene from 0, 360 discontinuity to continuous
  zpos-=180;
  if(zpos<0){
    zpos = 360 + zpos;
  }

  var image_num = Math.floor((zpos/3)%7)+1;
  /*
   var image_num = Math.floor((zpos/3)%13)+1;
  if(image_num>7){
    image_num=14-image_num;
  }
*/
  left.setAttribute('material', 'src', "#tex" + image_num.toString() );
  //document.querySelector("#right-eye").setAttribute('material', 'src', 'tex'+eval(data.src.charAt(3)+'+ 1')  )
  right.setAttribute('material', 'src', "#tex" + (image_num+1).toString() );
}
window.addEventListener('deviceorientation', handleOrientation);
}

window.addEventListener("orientationchange", function(){
  applyOrientation();
}, false);

function applyOrientation() {
  if (window.innerHeight > window.innerWidth) {
   //alert("You are now in portrait");
  } else {
    //alert("You are now in landscape");
    setTimeout(function(){
       var orientationModal = document.querySelector(".a-orientation-modal");
        if(orientationModal!=null){
            //orientationModal.parentNode.removeChild(orientationModal);
            orientationModal.className += " a-hidden";
        } 
      }, 0);
  }
}