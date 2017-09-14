// inicia enchant.js
enchant();

// o código abaixo será executado após o arquivo HTML ter sido completamente carregado
window.onload = function()
{
  // cria o objeto de jogo
  var game = new Core(352,500);
  //var game = new Core(460,400);
  //var game = new Core(1800,1120);		//Vista total do labirinto
  
  /********************************************************************************************/
  //Keybinds
  game.keybind(32, 'a');		//Barra de espaço
  game.keybind(81, 'b');		//Q
  game.keybind(87, 'up');		//W
  game.keybind(65, 'left');		//A
  game.keybind(83, 'down');		//S
  game.keybind(68, 'right');	//D
  
  /********************************************************************************************/
  //Preload de Assets
  
  // Fundos
  game.preload('imagens/bgs/bg_text.png');
  
  
  //Músicas
  game.preload('sons/musicas/Menu.mp3');
  game.preload('sons/musicas/Fase2.mp3');
  game.preload('sons/musicas/Final.mp3');
  
  //Sons
  game.preload('sons/randomico/Confirmar.wav');
  game.preload('sons/randomico/passos-na-areia.mp3');
  game.preload('sons/randomico/player-andando-labirinto.mp3');

  //Player
  game.preload('imagens/player/chara0.png');
 /* game.preload('imagens/player/exclamationMark.png');
  game.preload('imagens/player/font0.png');   
  game.preload('imagens/player/icon0.png');   
  game.preload('imagens/player/pad.png'); */  
  game.preload('imagens/player/apad.png');   
  
  //Menu
  game.preload('imagens/menu/Menu.png');
  game.preload('imagens/menu/Start.png');
  game.preload('imagens/menu/Quit.png');
  game.preload('imagens/menu/SomLigado.png');
  game.preload('imagens/menu/SomDesligado.png');
  game.preload('imagens/menu/VersaoMobile.png');
  game.preload('imagens/menu/VersaoDesktop.png');
  
  //Main Level
  game.preload('imagens/level2/labyrinth.gif');
  game.preload('imagens/level2/lantern.png');
  game.preload('imagens/level2/YarnBall.png');
  game.preload('imagens/level2/lanternPickup.png');
  game.preload('imagens/level2/lanternLiquid.png');
  game.preload('imagens/level2/yarnString.png');
  
  //final
  game.preload('imagens/final/Fundo.png');
  
  //Outros
  game.preload('imagens/Mascara.png');
  game.preload('imagens/MascaraMaior.png');
  game.preload('imagens/transition.png');
  game.preload('imagens/sight.png');  
  game.preload('imagens/labyrinthMask.png');

  // executará o código abaixo logo que a imagem tenha sido carregada
  game.onload = function ()
  {    
    /********************************************************************************************/
	//Configurar parâmetros para outras classes
	
	var stageSize = new Sprite(800, 600);
	stageSize._width = 800;
    stageSize._height = 250;
	stageSize.x = 0;
    stageSize.y = 350;

	setPlayerGameVar(game, stageSize);
	
	game.changeStages('menu');
	
	/********************************************************************************************/
   };   
  
  game.changeStages = function changeStages(changeTo){
	  /********************************************************************************************/
	  //Criação de Cenas
		var startMenu = new Scene();    //Menu de Início
		var mainLevel = new Scene();     //Primeiro labirinto
		var finalJogo = new Scene(); 	//Final
	  /********************************************************************************************/
		
		console.log('Changing Scenes!');
		game.popScene();
		switch(changeTo){
			case 'menu':
				game.currentScene = startMenu;
				setMenu(game, startMenu);
				game.pushScene(startMenu);
				break;   		
			case 'mainLevel':	
				game.currentScene = mainLevel;
				setLevelGameVar(game, mainLevel); 
				game.pushScene(mainLevel);
				break;  
			case 'final':
				game.currentScene = finalJogo;
				setFinal(game, finalJogo);
				game.pushScene(finalJogo);
				break;
		}		
   };
   
   /********************************************************************************************/
   //Configuração das telas de transição
   game.fadeTime = 600;  
   game.setTransition = function setTransition(scene, InOut){
		var transition_img = new enchant.Sprite(game.width, game.height);
		transition_img.tl.setTimeBased();
		transition_img.image = game.assets['imagens/transition.png'];
		
		if(InOut == 'In')
			transition_img.opacity = 0;	
			
		scene.addChild(transition_img);
		
		return transition_img;
	}
	
   /********************************************************************************************/
   //Objeto de mensagem ao jogador padronizado
   game.showMessage = function showMessage(inScene, textString){
		var completeLabel = new Group();

		var bgText = new Sprite(game.width,100);
		bgText.image = game.assets['imagens/bgs/bg_text.png'];
		bgText.x = -scene2.x;
		bgText.y = -scene2.y;
		bgText.tl.setTimeBased();
		bgText.opacity=0.8;
		
		bgText.addEventListener('enterframe', function() {
			bgText.x = -scene2.x;
			bgText.y = -scene2.y;
		});		
		completeLabel.addChild(bgText);
	
		var newLabel = new Label("");		
		newLabel.text = textString;
		newLabel.font  = "14px monospace";
		newLabel.color = "grey";
		newLabel.x = scene2.x + 35;
		newLabel.width = bgText.width - 100;
		newLabel.opacity = 0;
		newLabel.tl.setTimeBased();	
		completeLabel.addChild(newLabel);
		
		newLabel.addEventListener('enterframe', function() {	
			newLabel.x = -scene2.x + 35;
			newLabel.y = -scene2.y + 15;
			
			if(newLabel.age >=6*game.fps){
				newLabel.clearEventListener('enterframe');
				newLabel.tl.fadeOut(game.fadeTime).then(function(){inScene.removeChild(newLabel)});	
				bgText.tl.fadeOut(game.fadeTime).then(function(){inScene.removeChild(bgText);game.isTextOn = false;});
			}
		});
		newLabel.tl.delay(game.fadeTime).fadeIn(game.fadeTime);
		
		return completeLabel;
	}
	game.isTextOn = false;   
   /********************************************************************************************/
   
   game.soundOn = true;
   if(window.screen.width >= 500)
	game.mobile = false;
   else
	game.mobile = true;
   game.personagem = [];   
   
   game.start();     
};
