Devoted.Math = Devoted.Math || {};

Devoted.Math.Vector2 = function(x, y){
	this.x = x;
	this.y = y;
}

Devoted.Math.Vector2.prototype = {
	muls: function(n) { return new Devoted.Math.Vector2(this.x*n, this.y*n); }, imuls: function(n) { this.x *= n; this.y *= n; return this; },
	mul: function(v) { return new Devoted.Math.Vector2(this.x*v.x, this.y*v.y); }, imul: function(v) { this.x *= v.x; this.y *= v.y; return this; },
	divs: function(n) { return new Devoted.Math.Vector2(this.x/n, this.y/n); }, div: function(v) { return new Devoted.Math.Vector2(this.x/v.x, this.y/v.y); },
	adds: function(n) { return new Devoted.Math.Vector2(this.x+n, this.y+n); }, iadds: function(s) { this.x+=s; this.y+=s; return this; },
	add: function(v) { return new Devoted.Math.Vector2(this.x+v.x, this.y+v.y); }, iadd: function(v) { this.x+=v.x; this.y+=v.y; return this;},
	subs: function(n) { return new Devoted.Math.Vector2(this.x-n, this.y-n); }, isubs: function(s) { this.x-=s; this.y-=s; return this;},
	sub: function(v) { return new Devoted.Math.Vector2(this.x-v.x, this.y-v.y); }, isub: function(v) { this.x-=v.x; this.y-=v.y; return this;},
	copy: function() {return new Devoted.Math.Vector2(this.x, this.y);},
	set: function(x, y) {this.x = x; this.y = y;} 
};

Devoted.Math.Fuzzy = function (range, base){
	return (base||0) + (Math.random()-0.5)*range*2;
};

Devoted.Math.RandomRange = function(min, max, intOnly){
	if (intOnly == null){
		intOnly = false;
	}
	
	if (!intOnly){
		return Math.random() * (max - min) + min;
	}
	else {
		return Math.Floor(Math.random() * (max - min) + min);
	}
};

Devoted.Math.RandomArray = function (array) {
	return array[Math.floor(Math.random()*array.length)];
};

