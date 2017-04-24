function orientationCust(){
var stereoLogo = document.querySelector('#stereoLogo');
var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;
stereoLogo.setAttribute('width'," "+width/10000);
stereoLogo.setAttribute('height'," "+width/10000);
stereoLogo.setAttribute('position',"-"+width*2.5/10000+ " -"+height*2.5/10000+" -0.25");

var enteredVR = false;

function handleOrientation(event) {
  var xpos = event.beta;  // In degree in the range [-180,180]
  var ypos = event.gamma; // In degree in the range [0,360]
  var zpos = event.alpha; // In degree in the range [0,360]
  if(Math.abs(xpos)<10 && Math.abs(ypos)>80){
      if(!enteredVR){
        //document.querySelector('a-scene').enterVR();
        stereoLogo.setAttribute('material',"opacity","1");
        //vrbutton.click();
        enteredVR = true;
      }
    }
  else{
    if(enteredVR==true){
      stereoLogo.setAttribute('material',"opacity","0");
      document.querySelector('a-scene').exitVR();
      enteredVR = false;
    }
  }
}

window.addEventListener('deviceorientation', handleOrientation);

}