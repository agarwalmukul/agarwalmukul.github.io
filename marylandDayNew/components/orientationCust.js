function orientationCust(){
var stereoLogo = document.querySelector('#stereoLogo');
var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;
stereoLogo.setAttribute('width'," "+width*0.3/10000);
stereoLogo.setAttribute('height'," "+width*0.3/10000);
stereoLogo.setAttribute('position',"-"+width*0.4/10000+ " -"+height*0.5/10000+" -0.05");
}