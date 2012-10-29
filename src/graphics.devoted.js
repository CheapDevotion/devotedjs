Devoted.Graphics = Devoted.Graphics || {}


Devoted.Sprite.Sprite = function (image, position){
	this.image = image;
	this.position = position;
	this.rotation = 0;
	this.scale = new Devoted.Math.Vector2(1,1);
	this.pivot = new Devoted.Math.Vector2(this.position.x + (this.image.width / 2), this.position.y + (this.image.height / 2));
	this.boundingBox = new Devoted.Math.Rect(this.position.x, this.position.y, this.image.width, this.image.height );
	
	
	this.draw = function(){
		var context = Devoted.Render.context;
		var w = this.image.width, h = this.image.height;
		context.save();
		context.scale(this.scale.x, this.scale.y);
		context.translate(this.pivot.x, this.pivot.y);
		context.rotate(this.rotation);
		context.translate(-this.pivot.x, -this.pivot.y);
		context.strokeStyle="green";
		context.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
		context.drawImage(this.image, 0,0, w, h, this.position.x, this.position.y, w, h);
		context.restore();
	}
};