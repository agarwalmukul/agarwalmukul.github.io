function orientation(){

var left= document.querySelector('#left-eye');
var right= document.querySelector('#right-eye');
setTimeout(function(){
 var orientationModal = document.querySelector(".a-orientation-modal");
  if(orientationModal!=null){
      orientationModal.parentNode.removeChild(orientationModal);
      //orientationModal.className += " a-hidden";
  } 
}, 5000);
 
function handleOrientation(event) {
  var xpos = event.beta;  // In degree in the range [-180,180]
  var zpos = event.alpha; // In degree in the range [0,360]

  xpos += 180;
  //changed the front view point in the scene from 0, 360 discontinuity to continuous
  zpos-=180;
  if(zpos<0){
    zpos = 360 + zpos;
  }
  //zpos+=180;
  //ypos-=180
  //ypos += 90;

  var image_num = Math.floor((zpos/3)%7)+1;

  //ball.setAttribute('position', {x: 1.75, y: 1.25+image_num, z: -4});
        left.setAttribute('material', 'src', "#tex" + image_num.toString() );
        //document.querySelector("#right-eye").setAttribute('material', 'src', 'tex'+eval(data.src.charAt(3)+'+ 1')  )
        right.setAttribute('material', 'src', "#tex" + (image_num+1).toString() );


}

window.addEventListener('deviceorientation', handleOrientation);
}