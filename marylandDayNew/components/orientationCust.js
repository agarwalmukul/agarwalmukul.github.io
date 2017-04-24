function orientationCust(){
var stereoLogo = document.querySelector('#stereoLogo');
var logo = document.querySelector('#logo');
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
  if(Math.abs(xpos)<10 || Math.abs(xpos)>170){
      if(!enteredVR){
        //document.querySelector('a-scene').enterVR();
        stereoLogo.setAttribute('material',"opacity","1");
        logo.style.opacity =0;
        //vrbutton.click();
        enteredVR = true;
      }
    }
  else if(Math.abs(xpos)>60 && Math.abs(xpos)<120){
    if(enteredVR==true){
      stereoLogo.setAttribute('material',"opacity","0");
      logo.style.opacity = 1;
      document.querySelector('a-scene').exitVR();
      enteredVR = false;
    }
  }
}

window.addEventListener('deviceorientation', handleOrientation);

}