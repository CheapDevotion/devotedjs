Devoted.Preload = Devoted.Preload || {};

var images = [], sounds = [], completed = 0;
Devoted.Preload.addCompleteListener = function(){};
Devoted.Preload.addProgressListener = function(){};


Devoted.Preload.Loader = function(){
	
	this.addImage = function(image){
		var img = new Image();
		img.src = image;
		img.onload = resourceComplete;
		images.push(img);
		return img;
	};
	
	this.addSound = function(sound){
		var snd = new Audio(sound);
		snd.oncanplaythrough = resourceComplete;
		sounds.push(snd);
		return snd;
	};
	
	function resourceComplete(){
		completed++;
		Devoted.Preload.addProgressListener({
			progress : ((completed / (images.length + sounds.length)) * 100).toFixed(0),
			completed : completed,
			total : images.length + sounds.length
		});
		if (completed == (images.length + sounds.length)){
			Devoted.Preload.addCompleteListener();
		}
	}
	
}