Devoted.Render = Devoted.Render || {};

Devoted.Render.frameRate, Devoted.Render.canvas, Devoted.Render.context, Devoted.Render.deltaTime, Devoted.Render.dirtyRects = [];

var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;


(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelRequestAnimationFrame = window[vendors[x]+
          'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}())

Devoted.Render.Init = function(config){
    config = config || {};
	this.container = config.container || "container";
	this.width = config.width || 400;
	this.height = config.height || 400;
    this.frameRate = config.frameRate || 60;
	
	this.canvas = document.getElementById(this.container);
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	
	this.context = this.canvas.getContext('2d');
	
};

Devoted.Render.Update = function(method){
    setTimeout(function(){
	   requestAnimationFrame(method);
    }, 1000/this.frameRate);
}

Devoted.Render.Clear = function(){
    var canvas = Devoted.Render.canvas;
    var context = Devoted.Render.context;
    context.clearRect(0,0,canvas.width,canvas.height);
};

Devoted.Render.Draw = function(method){
    Devoted.Render.Update(function (){
		var thisFrameTime = (thisLoop = new Date()) - lastLoop;
		Devoted.Render.deltaTime = thisFrameTime / 1000;
		frameTime+= (thisFrameTime - frameTime) / filterStrength;
		lastLoop = thisLoop;
		Devoted.Render.Clear();
		method();
	});
}

Devoted.Render.Invalidate = function(rect){
	this.dirtyRects.push(rect);
}

Devoted.Render.ShowFPS = function(container){
	// Report the fps only every second, to only lightly affect measurements
	var fpsOut = document.getElementById(container);
	setInterval(function(){
	  fpsOut.innerHTML = "FPS: " + (1000/frameTime).toFixed(1);
	},1000);
}
