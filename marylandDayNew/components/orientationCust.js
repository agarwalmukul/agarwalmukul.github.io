function orientationCust(){
var stereoLogo = document.querySelector('#stereoLogo');
var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;
stereoLogo.setAttribute('width'," "+width/10000);
stereoLogo.setAttribute('height'," "+width/10000);
stereoLogo.setAttribute('position',"-"+width*2/10000+ " -"+height*2.5/10000+" -0.25");
}