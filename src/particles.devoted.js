Devoted.Particles = Devoted.Particles || {};


Devoted.Particles.Particle = function(position, velocity){
	this.position = position;
	this.velocity = velocity;
	this.image = null;
	this.age = 0;
	this.mass = 1;
	
	update = function(td){
		this.age += td;
		this.position.iadd(this.velocity.muls(td));
		return this.age < this.maxAge;
	}
}

Devoted.Particles.ParticleSystem = function (){
	this.particles = [];
	this.images = [];
	this.gravity = 10;
	this.drag = 0.97;
	this.wind = 50;

	this.accelerationf = function(force){
		return function(particle, td){
			particle.velocity.iadd(force.muls(td));
		};
	};

	this.dampingf = function(damping){
		return function(particle, td){
			particle.velocity.imuls(damping);
		};
	};

	this.applyWind = function(particle, td){
		particle.velocity.x += td*Math.random()*this.wind;
	};

	this.applyGravity = accelerationf(new Devoted.Math.Vector2(0, gravity));
	this.applyDamping = dampingf(this.drag);


	this.update = function(td){
		var alive = [];
		for (var i = 0; i < this.particles.length; i++){
			var particle = this.particles[i];
			this.applyGravity(particle, td);
			this.applyDamping(particle, td);
			this.applyWind(particle, td);

			if (particle.update(td)){
				alive.push(particle);
			}
		}
		this.particles = alive;
	};

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
			particle.image = Devoted.Math.RandomArray(system.images);


		}
	}
}

