
function orientationCust(){
var left = document.querySelector('#left-eye');
var right = document.querySelector('#right-eye');
var leftBack = document.querySelector('#left-eye-back');
var rightBack = document.querySelector('#right-eye-back');
var enteredVR = false;
var skybox = document.querySelector('a-sky');
//var cameraParent = document.querySelector('#cameraParent');
var camera = document.querySelector('a-camera');
//var loading = document.querySelector('#loading');
//loading.parentNode.removeChild(loading);

//var vrbutton = document.querySelector('.a-enter-vr');
//vrbutton.parentNode.removeChild(loading);

var vrbutton = document.querySelector(".a-enter-vr");
//if(orientationModal!=null){
    //orientationModal.parentNode.removeChild(orientationModal);
    //orientationModal.className += " a-hidden";
//} 

//var increase = false;
var startingOrientation = [1000,1000,1000];//initialized with a value that cannot be returned by the device orientation events
function handleOrientation(event) {
  //this assigns the starting position at the start of the device orientation
  if(startingOrientation[0]==1000 && event.beta!=null){
    startingOrientation[0]= event.beta;
    startingOrientation[1]= event.gamma;
    startingOrientation[2]= event.alpha;
  }
  var xpos = event.beta;  // In degree in the range [-180,180]
  var ypos = event.gamma; // In degree in the range [0,360]
  var zpos = event.alpha; // In degree in the range [0,360]

  if(zpos!=null){
    var diffz = startingOrientation[2]-zpos;
    if(Math.abs(diffz)<20){
    //if(zpos<30 || zpos>330){
      camera.setAttribute("look-controls", "enabled", "false");
      //skybox.setAttribute("phi-start", "-" + zpos);
      //cameraParent.setAttribute('rotation', "0 " + -1*zpos + " 0");
      if(Math.abs(ypos)>15){
        camera.setAttribute("look-controls", "enabled", "true");
      }
    }
    else{
      camera.setAttribute("look-controls", "enabled", "true");
    }

    if(Math.abs(xpos)<10 && Math.abs(ypos)>80 && !enteredVR){
      document.querySelector('a-scene').enterVR();
      enteredVR = true;
    }
    else{
      document.querySelector('a-scene').exitVR();
      enteredVR = false;
    }
    

  }
 /*

  if(zpos<30 || zpos>330){
    var rot = zpos;
    if(zpos<30){
      rot = -90+zpos;
      if(document.querySelector("#staticSkybox")!=null){}
      else{
        var skyOne = document.createElement("a-sky");
        skyOne.setAttribute('src', "#skybox");
        skyOne.setAttribute('rotation', "0 -100 0");
        skyOne.setAttribute('id', "staticSkybox");
        document.querySelector('a-camera').appendChild(skyOne);
        skybox.parentNode.removeChild(skybox);
      }

    }
    else if (zpos >330){
      rot = 330-zpos -90;
    }
    //skybox.setAttribute('rotation', "0 "+ rot + " 0");
  }
  else{
    if(document.querySelector("#staticSkybox")!=null){
        var skyBoxView = document.createElement("a-sky");
        skyBoxView.setAttribute('src', "#skybox");
        skyBoxView.setAttribute('rotation', "0 -100 0");
        document.querySelector('a-scene').appendChild(skyBoxView);
        var skyOne = document.querySelector("#staticSkybox")
        skyOne.parentNode.removeChild(skyOne);
        
    }
  }
  */
  
  var numImages = 5;
  xpos += 180;
  //changed the front view point in the scene from 0, 360 discontinuity to continuous
  var width = 360/(4*numImages*numImages);
  var x=Math.floor((zpos/width)/numImages);
  var x = x % 2;
  if(x==0){
    pos = (Math.floor(zpos/width))%numImages;}
  else{
    pos = numImages-1 - (Math.floor(zpos/width))%numImages;}
  image_num = pos+1;
  //var image_num = Math.floor((zpos/3)%13)+1;//1-13
  //if(image_num>7){
   // image_num=14-image_num;
  //}

  if(x==0){
  var blendingRatio = (zpos/width)%1;}
  else{
    var blendingRatio = 1-(zpos/width)%1;
  }

  var blendingROne = 0.2+(1-blendingRatio)*0.7999;
  var blendingRTwo = 0.2+(blendingRatio)*0.7999;
  var blendingRThree = 0.2+(1-blendingRatio)*0.7999;
  var blendingRFour = 0.2+(blendingRatio)*0.7999;
  left.setAttribute('material',"opacity", ""+ blendingROne);
  leftBack.setAttribute('material',"opacity", ""+ blendingRTwo);
  right.setAttribute('material',"opacity", ""+ blendingRThree);
  rightBack.setAttribute('material',"opacity", ""+ blendingRFour);

  left.setAttribute('material', 'src', "#tex" + image_num.toString() );
  leftBack.setAttribute('material', 'src', "#tex" + (image_num+1).toString());
  //document.querySelector("#right-eye").setAttribute('material', 'src', 'tex'+eval(data.src.charAt(3)+'+ 1')  )
  right.setAttribute('material', 'src', "#tex" + (image_num+1).toString() );
  if(image_num==numImages){
  rightBack.setAttribute('material', 'src', "#tex" + (numImages-1).toString());}
  else{rightBack.setAttribute('material', 'src', "#tex" + (image_num+2).toString());}
}

window.addEventListener('deviceorientation', handleOrientation);
}

window.addEventListener("orientationchange", function(){
  applyOrientation();
}, false);

function applyOrientation() {
  if (window.innerHeight > window.innerWidth) {
   //alert("You are now in portrait");
    /*
    var watermarkId = document.querySelector("#watermarkId");
    var camera =  document.querySelector("#camera");
    watermarkId.setAttribute("position", "-0.25 0.7 -1.1");
    watermarkId.setAttribute("rotation", "0 0 0");
    */
    //camera.setAttribute("rotation", "0 0 0");

  } else {
    //alert("You are now in landscape");
    setTimeout(function(){
       var orientationModal = document.querySelector(".a-orientation-modal");
        if(orientationModal!=null){
            //orientationModal.parentNode.removeChild(orientationModal);
            //orientationModal.className += " a-hidden";
        } 
        /*
        var watermarkId = document.querySelector("#watermarkId");
        var camera =  document.querySelector("#camera");
        watermarkId.setAttribute("position", "0.25 0.5 -1.1");
        watermarkId.setAttribute("rotation", "0 0 -90");
        */
        //camera.setAttribute("rotation", "0 0 90");

      }, 0);
  }
}
