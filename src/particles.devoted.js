Devoted.Particles = Devoted.Particles || {};


Devoted.Particles.Particle = function(position){
	this.position = position;
	this.velocity =  new Devoted.Math.Vector2(0,0);
	this.image = null;
	this.age = 0;
	this.mass = 1;
	this.maxAge = Infinity;
	
	this.update = function(td){
		this.age += td;
		console.log(this.position.x, this.position.y);
		this.position.iadd(this.velocity.muls(td));

		return this.age < this.maxAge;
	}
}

Devoted.Particles.ParticleSystem = function (config){
	config = config || {};
	this.gravity = config.gravity || 10;
	this.drag = config.gravity || 0.97;
	this.wind = config.gravity || 50;

	this.particles = [];
	this.images = [];

	var applyGravity = accelerationf(new Devoted.Math.Vector2(0, this.gravity));
	var applyDamping = dampingf(this.drag);

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

	this.tick = function(td){
		var alive = [];
		for (var i = 0; i < this.particles.length; i++){
			var particle = this.particles[i];
			applyGravity(particle, td);
			applyDamping(particle, td);
			applyWind(particle, td);

			if (particle.update(td)){
				alive.push(particle);
			}
		}
		this.particles = alive;
	};

	this.update = function(td){
		this.tick(td);
		this.draw();
	}


	function accelerationf (force){
		return function(particle, td){
			particle.velocity.iadd(force.muls(td));
		};
	};

	function dampingf (damping){
		return function(particle, td){
			particle.velocity.imuls(damping);
		};
	};
	function applyWind(particle, td){
		particle.velocity.x += td*Math.random()*this.wind;
	};




	

}

Devoted.Particles.ParticleEmitter = function(config){
	config = config || {};
	this.system = config.system || new this.ParticleSystem();
	this.oneShot = config.oneShot || true;
	this.size = config.size || new Devoted.Math.Vector2(400,400);
	this.velocity = config.velocity || 100;
	this.randomScale = config.randomScale || false;
	this.minEnergy = config.minEnergy || 0.5;
	this.maxEnergy = config.maxEnergy || 2.0;




	this.emit = function(total){
		var position = new Devoted.Math.Vector2(Math.random()*this.size.x, Math.random()*this.size.y);
		for (var i = 0; i < total; i++){
			var particle = new Devoted.Particles.Particle(position.copy());
			var alpha = Devoted.Math.Fuzzy(Math.PI);
			var radius = Math.random() * this.velocity;
			particle.velocity.x = Math.cos(alpha)*radius;
			particle.velocity.y = Math.sin(alpha)*radius;
			particle.image = Devoted.Math.RandomArray(this.system.images);
			particle.maxAge = Devoted.Math.Fuzzy(this.minEnergy, this.maxEnergy);
			this.system.particles.push(particle);

		}
	}
}

