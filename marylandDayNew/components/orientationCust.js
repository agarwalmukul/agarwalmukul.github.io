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
var stringCode = "data/output_webgl_"
var leftImage = document.querySelector('#tex1');
var rightImage = document.querySelector('#tex2');
leftImage.setAttribute("src", stringCode+"1.png");
rightImage.setAttribute("src", stringCode+"3.png");
if(Math.abs(window.orientation)==90){
      landscapeModeReload = true;
}
document.querySelector('#loading').style.opacity = 0;
document.querySelector('#loadingCircle').style.opacity = 0;
/*
var leftDiv = document.createElement("a-entity");
leftDiv.id = "left-eye";
leftDiv.setAttribute("geometry","primitive","plane");
leftDiv.setAttribute("material","src: #tex1; side: double; shader: flat; transparent: true; opacity: 1");
leftDiv.setAttribute("position","0.63 1.85 -1.2");
leftDiv.setAttribute("rotation","0 -25 0");
leftDiv.setAttribute("stereo","eye:left");
document.querySelector('a-scene').appendChild(leftDiv);

var rightDiv = document.createElement("a-entity");
rightDiv.id = "right-eye";
rightDiv.setAttribute("geometry","primitive","plane");
rightDiv.setAttribute("material","src: #tex1; side: double; shader: flat; transparent: true; opacity: 1");
rightDiv.setAttribute("position","0.63 1.85 -1.2");
rightDiv.setAttribute("rotation","0 -25 0");
rightDiv.setAttribute("stereo","eye:right");

document.querySelector('a-scene').appendChild(rightDiv);
*/
/*
var left = document.querySelector('#left-eye');
var right = document.querySelector('#right-eye');

left.object3D.scale.x = 2;
left.object3D.scale.y = 2;
left.object3D.scale.z = 2;
right.object3D.scale = [2];
*/

function doOnOrientationChange() {
    
    switch(window.orientation) {  
      case -90 || 90:
        if(getMobileOperatingSystem()=="iOS"){
          document.querySelector('a-scene').exitVR();
        }
        //alert('landscape');
        //logo.style.width = minLength/5 + "px";
        //if the phone goes from portrait to landscape, but what if the phone already is in the landscape mode
        /*
        if(enteredVR){
          setTimeout(function(){ 
            document.querySelector('.a-canvas').style.top = minLength * (-0.05);
          }, 300);
        }
        */
        
        break;
        /*
      // to automatically exit vr mode on portrait mode - for iOS
      default:
        //alert('portrait');
        stereoLogo.setAttribute('material',"opacity","0");
        logo.style.opacity = 1;
        document.querySelector('a-scene').exitVR();
        enteredVR = false;
        //logo.style.width = minLength/5 + "px";
        break; 
        */
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
      //document.querySelector('a-scene').enterVR();
      //stereoLogo.setAttribute('material',"opacity","1");
      //stereoLogo.setAttribute('position',"-"+width*5.5/10000+ " -"+height*5/10000+" -0.25");
      //logo.style.opacity =0;
      //vrbutton.click();
      //enteredVR = true;
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
    /*
    if(count==10){
      var widthScreen = parseInt(document.documentElement.clientWidth);
      var widthcanvas = parseInt(document.querySelector('.a-canvas').style.width);
      //document.querySelector('.a-canvas').style.width = widthcanvas;
      if(widthScreen==widthcanvas && enteredVR){
        setTimeout(function(){ 
          document.querySelector('.a-canvas').style.width = widthcanvas * 1.04;
          document.querySelector('.a-canvas').style.left = widthcanvas * (-0.04/2);
          if(getMobileOperatingSystem()=="iOS"){
          document.querySelector('.a-canvas').style.top = minLength * (-0.15);}
        }, 300);
      }
      count=0;
    }
    else{
      count++;
    }
    */
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



      /*

      if(getMobileOperatingSystem()=="iOS"){
          setTimeout(function(){ 
            if(!enteredVR && !landscapeModeReload){
              document.querySelector('.a-canvas').style.width = width;
              document.querySelector('.a-canvas').style.height = height;
              document.querySelector('.a-canvas').width = 3*width;
              document.querySelector('.a-canvas').height = 3*height;
              document.querySelector('.a-canvas').style.left = 0;
            }
            if(landscapeModeReload){
              //var widthLandscape = document.querySelector('.a-canvas').style.width;
              //var widthLandscapeCanvas = document.querySelector('.a-canvas').width
              document.querySelector('.a-canvas').style.width = window.screen.availWidth;
              document.querySelector('.a-canvas').style.height = window.screen.availWidth;
              //document.querySelector('.a-canvas').style.width = document.querySelector('.a-canvas').width/3;
              //document.querySelector('.a-canvas').style.height = document.querySelector('.a-canvas').height/3;
              //document.querySelector('.a-canvas').width = document.querySelector('.a-canvas').height;
              //document.querySelector('.a-canvas').height = widthLandscapeCanvas;
              document.querySelector('.a-canvas').style.left = 0;
            }
          }, 300);
        }

*/



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
        if(getMobileOperatingSystem()=="iOS" && Math.abs(window.orientation)==90){
          setTimeout(function(){ 
            document.querySelector('.a-canvas').style.top = minLength * (-0.15);
          }, 700);
        }

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