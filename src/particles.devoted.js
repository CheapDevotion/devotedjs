Devoted.Particles = Devoted.Particles || {};

Devoted.Particles.Particle = function(position, velocity){
	this.position = position;
	this.velocity = velocity;
	
	draw = function(){
		var td = 1.0/60;
		this.particle.position.iadd(this.particle.velocity.muls(td));
	}
}