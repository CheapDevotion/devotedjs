
Devoted.Render.Init({container: "game"});

var context = Devoted.Render.context;
animate();

function animate() {
    Devoted.Render.Update( animate );
    draw();

}

function draw() {
	
    var time = new Date().getTime() * 0.002;
    var x = Math.sin( time ) * 96 + 128;
    var y = Math.cos( time * 0.9 ) * 96 + 128;

    context.fillStyle = 'rgb(245,245,245)';
    context.fillRect( 0, 0, 255, 255 );

    context.fillStyle = 'rgb(255,0,0)';
    context.beginPath();
    context.arc( x, y, 10, 0, Math.PI * 2, true );
    context.closePath();
    context.fill();

}
