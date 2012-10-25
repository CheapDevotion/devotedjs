Devoted.Render = Devoted.Render || {};

Devoted.Render.canvas, Devoted.Render.context;


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
	this.container = config.container || "container";
	this.width = config.width || 400;
	this.height = config.height || 400;
	
	this.canvas = document.getElementById(this.container);
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	
	this.context = this.canvas.getContext('2d');
	
};

Devoted.Render.Update = function(method){
	requestAnimationFrame(method);
}

Devoted.Render.Clear = function(){
	this.canvas.width = this.canvas.width;
	this.canvas.height = this.canvas.height;
};
