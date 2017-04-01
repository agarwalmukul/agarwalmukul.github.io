function orientation(){

var left= document.querySelector('#left-eye');
var right= document.querySelector('#right-eye');


function handleOrientation(event) {
  var xpos = event.beta;  // In degree in the range [-180,180]
  var zpos = event.alpha; // In degree in the range [0,360]

  xpos += 180;
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