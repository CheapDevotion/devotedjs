function Vector2(x,y){
	this.x = x;
	this.y = y;
}

function Rect (x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

function Sprite (image, position){
	this.image = new Image();
	this.image.src = image;
	this.position = position;
}

var devotedJS = (function(){
	var container, canvas, context, width, height;
	
	// shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
	
	
	initEngine = function(container, width, height){
		this.container = container;
		this.width = width;
		this.height = height;
		canvas = document.getElementById(container)[0];
		canvas.width = width;
		canvas.height = height;
		context = canvas.getContext("2d");
	}
	
	
	return {
		init: function(el, width, height){
			initEngine(el,width,height);
		}
		
	}
});