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
logo.style.left = minLength/100 + "px";
logo.style.bottom = minLength/100 + "px";
var enteredVR = false;
var isLandscapeVRModeFirst = false;
}
function doOnOrientationChange() {
    switch(window.orientation) {  
      case -90 || 90:
        //alert('landscape');
        //logo.style.width = minLength/5 + "px";
        //document.querySelector('canvas').width = 500;//setAttribute('material',"opacity","0");
       
        if(enteredVR){
        setTimeout(function(){ 
          //alert("Hello");
          var ppi = getPPI();
          var widthScreen = document.documentElement.clientWidth;
          var widthcanvas = parseInt(document.querySelector('.a-canvas').style.width)/2;
          document.querySelector('.a-canvas').style.width = widthcanvas;
        }, 300);
      }
        //var widthcanvas = parseInt(document.querySelector('.a-canvas').style.width)/2;
        //document.querySelector('canvas').style.width = widthcanvas/2;
        break;
      // to automatically exit vr mode on portrait mode - for iOS
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
  
  if(Math.abs(xpos)<10 || Math.abs(xpos)>170){
      // keeps record the phone is brought to landscape mode after vr mode on - for android
      if(enteredVR){
        //document.querySelector('a-scene').enterVR();
        //stereoLogo.setAttribute('material',"opacity","1");
        //stereoLogo.setAttribute('position',"-"+width*5.5/10000+ " -"+height*5/10000+" -0.25");
        //logo.style.opacity =0;
        //vrbutton.click();
        //enteredVR = true;
        isLandscapeVRModeFirst = true;
      }
      if(enteredVR){
        setTimeout(function(){ 
          //alert("Hello");
          //var ppi = getPPI();
          //var widthScreen = document.documentElement.clientWidth;
          var widthcanvas = parseInt(document.querySelector('.a-canvas').style.width);

          document.querySelector('.a-canvas').style.width = widthcanvas * 1.07;
          document.querySelector('.a-canvas').style.right = widthcanvas * (-0.07/2);

        }, 300);
    }
  // to automatically exit vr mode on portrait mode - for android
  if(Math.abs(xpos)>60 && Math.abs(xpos)<120){
    if(enteredVR && isLandscapeVRModeFirst){
      stereoLogo.setAttribute('material',"opacity","0");
      logo.style.opacity = 1;
      document.querySelector('a-scene').exitVR();
      enteredVR = false;
      isLandscapeVRModeFirst = false;
    }
  }
}
if(getMobileOperatingSystem()=="iOS"){
window.addEventListener('orientationchange', doOnOrientationChange);}

document.querySelector('a-scene').addEventListener('enter-vr', function () {
   //document.querySelector('a-scene').enterVR();
        stereoLogo.setAttribute('material',"opacity","1");
        logo.style.opacity=0;
        //vrbutton.click();
        enteredVR = true;
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



function getPPI(){
 // create an empty element
 var div = document.createElement("div");
 // give it an absolute size of one inch
 div.style.width="1in";
 // append it to the body
 var body = document.getElementsByTagName("body")[0];
 body.appendChild(div);
 // read the computed width
 var ppi = document.defaultView.getComputedStyle(div, null).getPropertyValue('width');
 // remove it again
 body.removeChild(div);
 // and return the value
 return parseFloat(ppi);
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