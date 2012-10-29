Devoted.Graphics = Devoted.Graphics || {}


Devoted.Graphics.Sprite = function (config){
	config = config || {};
	this.image = config.image;
	this.position = config.position || new Devoted.Math.Vector2(0,0);
	this.rotation = config.rotation || 0;
	this.scale = config.scale || new Devoted.Math.Vector2(1,1);
	this.pivot = config.pivot || new Devoted.Math.Vector2(this.position.x + (this.image.width / 2), this.position.y + (this.image.height / 2));
	this.boundingBox = config.boundingBox || new Devoted.Math.Rect(this.position.x, this.position.y, this.image.width, this.image.height );
	
	
	this.draw = function(){
		var context = Devoted.Render.context;
		var w = this.image.width, h = this.image.height;
		context.save();
		context.scale(this.scale.x, this.scale.y);
		context.translate(this.pivot.x, this.pivot.y);
		context.rotate(this.rotation);
		context.translate(-this.pivot.x, -this.pivot.y);
		
		context.drawImage(this.image, 0,0, w, h, this.position.x, this.position.y, w, h);
		context.restore();
	}
};

Devoted.Graphics.SpriteSheet = function (config){
	config = config || {};
	this.image = config.image;
	this.size = config.size;
	
	this.getImage = function(position){
		var cols = this.image.width / this.size.x;
		var rows = this.image.height / this.size.y;
		
		
		
	};
}

Devoted.Graphics.Shape = function(){
	this.drawRect = function(config){
		config = config || {};
		rect = config.rect;
		fillType = config.fillType || "fill";
		color = config.color || "black";
		alpha = config.alpha || 1;
		
		var context = Devoted.Render.context;
		context.save();
		context.globalAlpha = alpha;
		switch (fillType){
			case "stroke":
				context.strokeStyle=color;
				context.strokeRect(rect.x, rect.y, rect.width, rect.height);
				break;	
			case "fill":
				context.fillStyle=color;
				context.fillRect(rect.x, rect.y, rect.width, rect.height);
				break;
			case "clear":
				context.clearRect(rect.x, rect.y, rect.width, rect.height);
				break;
		}
		context.restore();
		
	};
	
	this.drawLine = function (config){
		config = config || {};
		from = config.from || new Devoted.Math.Vector2(0,0);
		to = config.to || new Devoted.Math.Vector2(0,0);
		lineWidth = config.lineWidth || 1;
		lineCap = config.lineCap || "butt";
		color = config.color || "black";
		alpha = config.alpha || 1;
		
		var context = Devoted.Render.context;
		context.save();
		context.globalAlpha = alpha;
		context.lineWidth = lineWidth;
		context.lineCap = lineCap;
		context.beginPath();
		context.moveTo(from.x,from.y);
		context.lineTo(to.x,to.y);
		context.stroke();
		context.restore();
		
	};
	
	this.drawShape = function (config){
		config = config || {};
		points = config.points;
		fillType = config.fillType || "fill";
		color = config.color || "black";
		alpha = config.alpha || 1;
		lineWidth = config.lineWidth || 1;
		lineJoin = config.lineJoin || "miter";
		lineCap = config.lineCap || "butt";
		closePath = config.closePath || false;
		
		var context = Devoted.Render.context;
		context.save();
		context.globalAlpha = alpha;
		context.lineWidth = lineWidth;
		context.lineJoin = lineJoin;
		context.lineCap = lineCap;
		context.beginPath();
		context.moveTo(points[0].x,points[0].y);
		for (var i = 1; i<points.length;i++){
			context.lineTo(points[i].x,points[i].y);
		}
		if (closePath){
			context.closePath();
		}
		
		switch (fillType){
			case "stroke":
				context.strokeStyle=color;
				context.stroke();
				break;	
			case "fill":
				context.fillStyle=color;
				context.fill();
				break;
		}
		
		context.restore();
	};
};