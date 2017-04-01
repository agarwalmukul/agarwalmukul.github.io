function orientation(){

var ball= document.querySelector('#left-eye');


function handleOrientation(event) {
  var xpos = event.beta;  // In degree in the range [-180,180]
  var ypos = event.alpha; // In degree in the range [-90,90]

  xpos += 90;
  ypos += 90;

  ball.setAttribute('position', {x: 1.75+(xpos/90), y: 1.25+(ypos/90), z: -4});
}

window.addEventListener('deviceorientation', handleOrientation);
}