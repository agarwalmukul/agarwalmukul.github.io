var ball= document.querySelector('#left-eye');

}
function handleOrientation(event) {
  var xpos = event.beta;  // In degree in the range [-180,180]
  var ypos = event.gamma; // In degree in the range [-90,90]

  xpos += 90;
  ypos += 90;

  ball.setAttribute('position', {x: xpos/9, y: ypos/9, z: -4});
}

window.addEventListener('deviceorientation', handleOrientation);