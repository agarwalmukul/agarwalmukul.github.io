
function orientation(){
var left= document.querySelector('#left-eye');
var right= document.querySelector('#right-eye');
//var increase = false;
 
function handleOrientation(event) {
  var xpos = event.beta;  // In degree in the range [-180,180]
  var zpos = event.alpha; // In degree in the range [0,360]

  xpos += 180;
  //changed the front view point in the scene from 0, 360 discontinuity to continuous
  /*
  zpos-=180;
  if(zpos<0){
    zpos = 360 + zpos;
  }
  
  var temp = image_num;
  var image_num = Math.floor((zpos/3)%7)+1;
  if(image_num!=temp){
    if(temp<image_num){
      increase = true;
    }
    else{
      increase=false;
    }
    if(temp==7 && image_num==1){
      increase = false;
    }
    if(temp==1 && image_num==7){
      increase = true;
    }
    if(increase){
      image_num=temp++;
    }
    else{
      image_num=temp--;
    }
  }
  */
  var width = 360/(28*7);
  var x=(Math.floor(zpos/width)/7)% 2;
  if(x==0){
    pos = (Math.floor(zpos/width))%7;}
  else{
    pos = 6 - (Math.floor(zpos/width))%7;}
  image_num = pos+1;
  //var image_num = Math.floor((zpos/3)%13)+1;//1-13
  //if(image_num>7){
   // image_num=14-image_num;
  //}

  left.setAttribute('material', 'src', "#tex" + image_num.toString() );
  //document.querySelector("#right-eye").setAttribute('material', 'src', 'tex'+eval(data.src.charAt(3)+'+ 1')  )
  right.setAttribute('material', 'src', "#tex" + (image_num+1).toString() );
}
window.addEventListener('deviceorientation', handleOrientation);
}

window.addEventListener("orientationchange", function(){
  applyOrientation();
}, false);

function applyOrientation() {
  if (window.innerHeight > window.innerWidth) {
   //alert("You are now in portrait");
  } else {
    //alert("You are now in landscape");
    setTimeout(function(){
       var orientationModal = document.querySelector(".a-orientation-modal");
        if(orientationModal!=null){
            //orientationModal.parentNode.removeChild(orientationModal);
            orientationModal.className += " a-hidden";
        } 
      }, 0);
  }
}