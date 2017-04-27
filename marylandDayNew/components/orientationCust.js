function orientationCust(){
var stereoLogo = document.querySelector('#stereoLogo');
var logo = document.querySelector('#logo');
var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;
var stereoLogoScale = Math.min(width, height)/10000;
stereoLogo.setAttribute('width'," "+stereoLogoScale);
stereoLogo.setAttribute('height'," "+stereoLogoScale);
stereoLogo.setAttribute('position',"-"+Math.min(width, height)*2.5/10000+ " -"+Math.max(width, height)*1.5/10000+" -0.25");
var firstStretch = false;
var minLength = Math.min(width, height);
logo.style.width = minLength/5 + "px";
logo.style.left = minLength/100 + "px";
logo.style.bottom = minLength/100 + "px";
var enteredVR = false;
var isLandscapeVRModeFirst = false;
var landscapeModeReload = false;
if(Math.abs(window.orientation)==90){
      landscapeModeReload = true;
}
document.querySelector('#loading').style.opacity = 0;
document.querySelector('#loadingCircle').style.opacity = 0;

//code ending will look like this xyz.webgl
var url = window.location.href;
var code = url.slice(-9);
code = code.substring(0,3);
var stringCode = "images/webgl/" + code + "_output_webgl_";
//var stringCode = "data/VG1_output_webgl_"
var leftImage = document.querySelector('#left-eye');
var rightImage = document.querySelector('#right-eye');
leftImage.setAttribute("material","src", stringCode+"3.png");
rightImage.setAttribute("material","src", stringCode+"4.png");

function doOnOrientationChange() {    
    switch(window.orientation) {  
      case -90 || 90:
        break;
        // to automatically exit vr mode on portrait mode - for iOS
      default:
        if(getMobileOperatingSystem()=="iOS"){
          document.querySelector('a-scene').exitVR();
        }
    }
}
var count = 0;
function handleOrientation(event) {
  var xpos = event.beta;  // In degree in the range [-180,180]
  var ypos = event.gamma; // In degree in the range [0,360]
  var zpos = event.alpha; // In degree in the range [0,360]
  
  if(Math.abs(xpos)<10 || Math.abs(xpos)>170){
    // keeps record the phone is brought to landscape mode after vr mode on - for android
    if(enteredVR){
      isLandscapeVRModeFirst = true;   
      //------------ check - because this will make the top as 0 again in the landscape - landscape stereo mode
      if(getMobileOperatingSystem()=="iOS"){
        setTimeout(function(){ 
          document.querySelector('.a-canvas').style.top = 0;
        }, 300);
      }
    }
    if(isLandscapeVRModeFirst && !firstStretch){
      firstStretch = true;
      setTimeout(function(){ 
            //alert("Hello");
            var widthScreen = document.documentElement.clientWidth;
            var widthcanvas = parseInt(document.querySelector('.a-canvas').style.width);
            //document.querySelector('.a-canvas').style.width = widthcanvas;
            document.querySelector('.a-canvas').style.width = widthcanvas * 1.04;
            document.querySelector('.a-canvas').style.left = widthcanvas * (-0.04/2);
          }, 300);
    }
  }
  // to automatically exit vr mode on portrait mode - for android
  if(Math.abs(xpos)>60 && Math.abs(xpos)<120){
    if(enteredVR && isLandscapeVRModeFirst){
      stereoLogo.setAttribute('material',"opacity","0");
      logo.style.opacity = 1;
      if(getMobileOperatingSystem()!="iOS"){
      document.querySelector('a-scene').exitVR();
    }
      enteredVR = false;
      isLandscapeVRModeFirst = false;
      firstStretch = false;
    }
  }
}
if(getMobileOperatingSystem()=="iOS"){
  window.addEventListener('orientationchange', doOnOrientationChange);
}

document.querySelector('a-scene').addEventListener('enter-vr', function () {
   //document.querySelector('a-scene').enterVR();
        stereoLogo.setAttribute('material',"opacity","1");
        logo.style.opacity=0;
        //vrbutton.click();
        enteredVR = true;
        /*
        if(getMobileOperatingSystem()=="iOS" && Math.abs(window.orientation)==90){
          setTimeout(function(){ 
            document.querySelector('.a-canvas').style.top = minLength * (-0.15);
          }, 700);
        }
        */

});
// to handle exit vr events for - iOS
document.querySelector('a-scene').addEventListener('exit-vr', function () {
   //document.querySelector('a-scene').enterVR();
        stereoLogo.setAttribute('material',"opacity","0");
        logo.style.opacity =1;
        //vrbutton.click();
        enteredVR = false;
});
window.addEventListener('deviceorientation', handleOrientation);
}

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }
    if (/android/i.test(userAgent)) {
        return "Android";
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    return "unknown";
}