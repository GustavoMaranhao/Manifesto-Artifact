var game;
var cena;

function setMenu(game1, scene){
    this.game = game1;
    this.cena = scene;       
    
	setScene(scene);
    CriarMenu();
}

function CriarMenu(){
	/********************************************************************************************/
	//Carregamento de assets	
	menu_img = game.assets['imagens/menu/Menu.png'];	
	start_img = game.assets['imagens/menu/Start.png'];
	quit_img = game.assets['imagens/menu/Quit.png'];
	
	somLigado_img = game.assets['imagens/menu/SomLigado.png'];
	somDesligado_img = game.assets['imagens/menu/SomDesligado.png'];
	
	VMobile_img = game.assets['imagens/menu/VersaoMobile.png'];
	VDesktop_img = game.assets['imagens/menu/VersaoDesktop.png'];
	
	menu_sound = game.assets['sons/musicas/Menu.mp3'];
	confirmar_sound = game.assets['sons/randomico/Confirmar.wav'];
	
	/********************************************************************************************/	
	//criação do sprite do céu
	var Menu = new Sprite(800, 600);
	Menu.image = menu_img;
	Menu.frame = 0;
	Menu.x = 0;
	Menu.y = 0;	
		
	var startGame = new Sprite(143, 52);
	startGame.image = start_img;
	startGame.frame = 0;
	startGame.x = game.width/2 - 0.9*startGame.width/2;
	startGame.y = 200;
	startGame.scale(0.85,0.85);
	
	var soundControl = new Sprite(213,29);
	soundControl.image = somLigado_img;
	soundControl.x = game.width - 1.1*soundControl.width/1.3;
	soundControl.y = game.height - soundControl.height;
	soundControl.scale(0.65,0.65);
	
	var versao = new Sprite(213,29);
	if(game.mobile)
		versao.image = VMobile_img;
	else
		versao.image = VDesktop_img;
	versao.x = game.width - 1.1*VDesktop_img.width/1.3;
	versao.y = game.height - soundControl.height - VDesktop_img.height;
	versao.scale(0.65,0.65);
		
	var quitGame = new Sprite(115, 60);		
	quitGame.image = quit_img;			
	quitGame.frame = 0;
	quitGame.x = game.width/2 - 0.9*quitGame.width/2;
	quitGame.y = 257;
	quitGame.scale(0.85,0.85);	
		 
	cena.addChild(Menu);
	cena.addChild(startGame);
	cena.addChild(quitGame);
	cena.addChild(soundControl);
	cena.addChild(versao);
	
	// Background music
	if(game.soundOn){
		cena.bgm = menu_sound;
		cena.bgm.play();
		cena.bgm.volume = 1;		 		
	} else {
		cena.bgm = menu_sound;
		cena.bgm.play(); 
		cena.bgm.volume = 0;		
		soundControl.image = somDesligado_img;
	}
		
	var continua = true;
	var movimento = 0;
	var esta = false;
		
	cena.addEventListener('enterframe', function() {
		if (game.soundOn && cena.bgm.currentTime >= this.bgm.duration){
			cena.bgm.play();
		}
	});
	
	startGame.addEventListener('touchstart', function() {	
		if(game.soundOn){
			cena.bgm = menu_sound;
			cena.bgm.stop();
			cena.bgmN = confirmar_sound;
			cena.bgmN.play();
		}
		transition_img = game.setTransition(scene, 'In');
		transition_img.tl.fadeIn(game.fadeTime/2).then(function(){
			game.changeStages('mainLevel');	
		});
    });
	
	quitGame.addEventListener('touchend', function(){
		window.history.back();
	});
	
	soundControl.addEventListener('touchend', function(){
		if(this.image == somDesligado_img){
			this.image = somLigado_img;
			game.soundOn = true;
			cena.bgm.volume = 1;
		} else {
			this.image = somDesligado_img;
			game.soundOn = false;
			cena.bgm.volume = 0;
		}
	});
	
	versao.addEventListener('touchend', function(){
		if(this.image == VDesktop_img){
			this.image = VMobile_img;
			game.mobile = true;
		} else {
			this.image = VDesktop_img;
			game.mobile = false;
		}
	});
	
}
   

    
    
    
    
    
 


