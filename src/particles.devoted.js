Devoted.Particles = Devoted.Particles || {};


Devoted.Particles.Particle = function(position, velocity){
	this.position = position;
	this.velocity = velocity;
	
	draw = function(){
		var td = 1.0/60;
		this.particle.position.iadd(this.particle.velocity.muls(td));
	}
}

Devoted.Particles.ParticleSystem = function (){
	this.particles = [];
	this.gravity = 10;
	this.drag = 0.97;
	this.wind = 50;

	this.draw = function(ctx){
		if (ctx == null) { var ctx = Devoted.Render.context; }
		for(var i = 0; i < this.particles.length; i++) {
			var particle = this.particles[i];
			ctx.save();
			ctx.translate(particle.position.x, particle.position.y);
			ctx.drawImage(particle.image, -particle.image.width/2, -particle.image.height/2);
			ctx.restore();
		}
	}

}

Devoted.Particles.ParticleEmitter = function(config){
	
	this.system = config.system || new this.ParticleSystem();
	this.oneShot = config.oneShot || true;
	this.size = config.size || new Devoted.Math.Vector2(100,100);
	this.velocity = config.velocity || 100;
	this.randomScale = config.randomScale || false;




	this.emit = function(total){
		var position = Devoted.Math.Vector2(Math.random()*size.x, Math.random()*size.y);
		for (var i = 0; i < total; i++){
			var particle = new this.Particle(position.copy());
			var alpha = Devoted.Math.Fuzzy(Math.PI);
			var radius = Math.random() * this.velocity;
			particle.velocity.x = Math.cos(alpha)*radius;
			particle.velocity.y = Math.sin(alpha)*radius;


		}
	}
}

