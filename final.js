var game;
var scene;

function setFinal(gameF, sceneF){

    this.game = gameF;
    this.scene = sceneF;
	
	setScene(sceneF);
	
	backGround_img = game.assets['imagens/final/Fundo.png'];
	var backGround = new Sprite(game.width, game.height);
	backGround.image = backGround_img;
	backGround.frame = 0;
    backGround.x = 0;
	backGround.y = 0;
	scene.addChild(backGround);
		
	scene.addEventListener('touchstart', function() {			
		final_sound.stop(); 
		window.history.back();	           
    });	
	
	transition_img = game.setTransition(sceneF, 'Out');
	transition_img.tl.fadeOut(game.fadeTime).then(function(){sceneF.removeChild(transition_img)});
}	
