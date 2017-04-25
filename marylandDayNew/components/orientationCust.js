function orientationCust(){
var stereoLogo = document.querySelector('#stereoLogo');
var logo = document.querySelector('#logo');
var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;
var stereoLogoScale = Math.min(width, height)/10000;
stereoLogo.setAttribute('width'," "+stereoLogoScale);
stereoLogo.setAttribute('height'," "+stereoLogoScale);
stereoLogo.setAttribute('position',"-"+Math.min(width, height)*2.5/10000+ " -"+Math.max(width, height)*2.5/10000+" -0.25");

var minLength = Math.min(width, height);
logo.style.width = minLength/5 + "px";
var enteredVR = false;

function doOnOrientationChange() {
    switch(window.orientation) {  
      case -90 || 90:
        //alert('landscape');
        //logo.style.width = minLength/5 + "px";
        break;
      default:
        //alert('portrait');
        stereoLogo.setAttribute('material',"opacity","0");
        logo.style.opacity = 1;
        document.querySelector('a-scene').exitVR();
        enteredVR = false;
        //logo.style.width = minLength/5 + "px";
        break; 
    }
}

function handleOrientation(event) {
  var xpos = event.beta;  // In degree in the range [-180,180]
  var ypos = event.gamma; // In degree in the range [0,360]
  var zpos = event.alpha; // In degree in the range [0,360]
  
  //if(Math.abs(xpos)<10 || Math.abs(xpos)>170){
      //if(!enteredVR){
        //document.querySelector('a-scene').enterVR();
        //stereoLogo.setAttribute('material',"opacity","1");
        //stereoLogo.setAttribute('position',"-"+width*5.5/10000+ " -"+height*5/10000+" -0.25");
        //logo.style.opacity =0;
        //vrbutton.click();
        //enteredVR = true;
      //}
    //}
  
  if(Math.abs(xpos)>60 && Math.abs(xpos)<120){
    if(enteredVR){
      stereoLogo.setAttribute('material',"opacity","0");
      logo.style.opacity = 1;
      document.querySelector('a-scene').exitVR();
      enteredVR = false;
    }
  }
}

window.addEventListener('orientationchange', doOnOrientationChange);

document.querySelector('a-scene').addEventListener('enter-vr', function () {
   //document.querySelector('a-scene').enterVR();
        stereoLogo.setAttribute('material',"opacity","1");
        logo.style.opacity =0;
        //vrbutton.click();
        enteredVR = true;
});
window.addEventListener('deviceorientation', handleOrientation);

}