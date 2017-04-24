/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */


AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    this.setupFadeAnimation();
    var camera = document.querySelector('a-camera');
    var cursor = document.querySelector('#cursor');
    el.addEventListener("mouseenter", function () {
      camera.setAttribute("look-controls", "enabled", "false");
      cursor.setAttribute("look-controls", "enabled", "true");
    });

    el.addEventListener("mouseleave", function () {
      camera.setAttribute("look-controls", "enabled", "true");
      cursor.setAttribute("look-controls", "enabled", "false");
    });



  },

  /**
   * Setup fade-in + fade-out.
   */
   
  setupFadeAnimation: function () {
    /*
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) { return; }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#000'
    });
    */
  }
  
});