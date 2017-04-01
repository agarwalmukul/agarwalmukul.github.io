function orientation(){

var ball= document.querySelector('#left-eye');


function handleOrientation(event) {
  var xpos = event.beta;  // In degree in the range [-180,180]
  var zpos = event.alpha; // In degree in the range [0,360]

  xpos += 180;
  ypos-=180
  //ypos += 90;

  var image_num = Math.floor((zpos/20)%7);

  ball.setAttribute('position', {x: 1.75, y: 1.25+image_num, z: -4});
        document.querySelector("#left-eye").setAttribute('material', 'src', "#tex" + image_num.toString() );
        //document.querySelector("#right-eye").setAttribute('material', 'src', 'tex'+eval(data.src.charAt(3)+'+ 1')  )
        document.querySelector("#right-eye").setAttribute('material', 'src', "#tex" + (image_num+1).toString() );


}

window.addEventListener('deviceorientation', handleOrientation);
}