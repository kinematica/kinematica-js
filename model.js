// Make a model object with necessary methods. Instantiate via IIFE.
// Gross plagiarism of (inspiration from?) Konva/src/Animation.js.
(function(Kinematica){
    'use strict';
    
    /*
     * A function for getting the current time. Tries to be performant.
     */
    var now = (function() {
        if (performance && performance.now) {
            return function() {
                return performance.now();
            };
        }
        
        return function() {
            return new Date().getTime();
        };
    })();
    
    /*
     * Backup in case requestAnimationFrame doesn't exist.
     * By default, try to run the specified update callback 60 times per second.
     */
    function FRAF(callback) {
        setTimeout(callback, 1000 / 60);
    }
    
    var RAF = (function(){
        return requestAnimationFrame
            || webkitRequestAnimationFrame
            || mozRequestAnimationFrame
            || oRequestAnimationFrame
            || msRequestAnimationFrame
            || FRAF;
    })();
    
    // TODO: Flesh out the rest of this based on Konva's animation class.
    // https://github.com/konvajs/konva/blob/master/src/Animation.js
