var game;
var scene2;

var drop_sound;

var hideLabyritnh;
var mask;
var button;
var bPickedYarn = false;
var yarnToggle = 0;

function setScene(scene){
    this.scene = scene;
}

function setLevelGameVar(game, scene){
    this.game = game;
    this.scene2 = scene; 
	this.changingScene = false;
	
	configScene2();
	
	//if(game.soundOn)
	//	drop_sound.play();
	
	transition_img = game.setTransition(scene, 'Out');
	transition_img.tl.fadeOut(game.fadeTime/2).then(function(){scene.removeChild(transition_img)});
}

/** Indices dos Tiles (Para a imagem original de largura 320 e largura 16 de tile)
 * 45 - Chão de Areia (Sem Bordas)
 * 58 - Bloco Escuro
 * 
 * 205 - Água (Sem Bordas)
 * 
 * 320 - Pedra Bruta (Parte Superior)
 * 321 ou 9 - Pedra Trabalhada (Parte Superior)
 * 322 - Grama
 * 323 - Tile escuro
 * 
 * 340 - Pedra Bruta (Parte Inferior)
 * 341 - Pedra Trabalhada (Parte Inferior)
 * 342 - Chão de Pedra
 */

function configScene2(){
    /********************************************************************************************/
    // Assets da fase

    var img_tileset = game.assets['imagens/level2/labyrinth.gif'];
	var img_mask = game.assets['imagens/Mascara.png'];
	var img_button = game.assets['imagens/player/apad.png'];
	var img_blackbox = game.assets['imagens/labyrinthMask.png']; 
	var img_lantern = game.assets['imagens/level2/lantern.png'];
	var img_yarnBall = game.assets['imagens/level2/YarnBall.png'];
	var img_lanternPickup = game.assets['imagens/level2/lanternPickup.png'];
	var img_lanternLiquid = game.assets['imagens/level2/lanternLiquid.png'];
	var img_yarnString = game.assets['imagens/level2/yarnString.png'];
	
	var fase2_sound = game.assets['sons/musicas/Fase2.mp3'];
	
	/********************************************************************************************/
	//Variáveis Globais
	var snBrd = 505;
	var sTx01 = 537;
	var sTx02 = 526;
	var sTx03 = 527;
	var sTx04 = 528;
	var sTx05 = 529;
	var sTx06 = 530;
	var sTx07 = 531;
	var sTx08 = 532;
	var sTx09 = 533;
	var sTx10 = 534;
	var sTx11 = 535;
	var sTx12 = 536;
	
	var opac0 = 49999;
	var opac1 = 50001;
	var opac2 = 50002;
	var opac3 = 50003;
	var opac4 = 50004;
	var opac5 = 50005;
	
	var lntrn = 504;
	var yarnB = 524;
	var yarnS = 525;
	var exitT = 351;
	var exitW = 354;
	
	var playerFeetX;
	var playerFeetY;
	
	var changingScene = false;
	
	var bShowLabyrinth = false;
	var bPickedLantern = false;
	
	var lanternPercent = 0;
	
	var hudOffset = 0;
    
   /********************************************************************************************/
   //Criação dos mapas
        
   //labirinto 24x59 tiles  
   var lab = new Map(16, 16);
        lab.image = img_tileset;
        lab.loadData([
			[ 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 ],
			[ 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 , 205 ],
			[ 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 , 225 ],
			[  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ],
			[  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ],
			[  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ],
			[  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ],
			[  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ],
			[  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ,  85 ],
			[ 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 025 , 025 , 025 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 ],
			[ 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 ,   9 ,   9 ,   9 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 ],
			[ 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 ,   9 ,   9 ,   9 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 ],
			[ 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 ,   9 ,   9 ,   9 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 ],
			[ 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 ,   9 ,   9 ,   9 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 195 ,   9 ,   9 ,   9 , 193 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 195 ,   9 ,   9 ,   9 , 193 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 331 , 331 , 331 ],
			[ 331 , 174 , 174 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 174 , 174 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 331 , 174 , 174 , 174 , 174 , 331 , 331 , 331 , 331 , 174 , 174 , 331 , 331 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 331 , 174 , 174 , 174 , 174 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 331 , 331 , 331 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 331 , 331 , 331 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 331 , 331 ],
			[ 331 , 331 , 331 , 331 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 331 , 331 ],
			[ 331 , 331 , 331 , 331 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 ],
			[ 331 , 331 , 331 , 331 , 174 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 331 , 331 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 331 , 331 , 331 , 331 , 174 , 331 , 331 , 331 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 ],
			[ 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 331 , 331 , 331 , 174 , 174 , 331 ],
			[ 331 , 174 , 331 , 331 , 174 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 331 , 331 , 331 , 174 , 174 , 331 ],
			[ 331 , 174 , 331 , 331 , 174 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 174 , 331 , 331 , 174 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 174 , 331 , 331 , 174 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 331 ],
			[ 331 , 174 , 331 , 331 , 174 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 331 ],
			[ 331 , 174 , 331 , 331 , 174 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 331 ],
			[ 331 , 174 , 331 , 331 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 331 , 331 , 174 , 174 , 331 ],
			[ 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 174 , 331 , 331 , 331 , 174 , 174 , 331 ],
			[ 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 174 , 331 , 331 , 331 , 174 , 174 , 331 ],
			[ 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 174 , 331 , 331 , 331 , 174 , 174 , 331 ],
			[ 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 331 ],
			[ 331 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 331 ],
			[ 331 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 331 , 331 , 331 , 174 , 174 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 174 , 331 , 174 , 331 , 331 , 331 , 174 , 331 , 174 , 174 , 331 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 331 , 331 , 331 , 174 , 331 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 331 , 331 , 331 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 174 , 331 , 174 , 331 , 331 , 331 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 ],
			[ 331 , 174 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 331 , 331 , 331 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 331 ],
			[ 331 , 174 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 331 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 174 , 331 , 174 , 331 ],
			[ 331 , 174 , 174 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 174 , 331 , 174 , 331 , 331 , 331 , 174 , 331 , 174 , 331 , 174 , 331 , 174 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 174 , 331 , 174 , 331 , 174 , 331 , 174 , 331 , 174 , 331 ],
			[ 331 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 174 , 331 , 174 , 174 , 174 , 331 , 174 , 174 , 174 , 331 , 174 , 174 , 174 , 331 ],
			[ 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 , 331 ]
        ]);
		
        lab.collisionData = [
			[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
			[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
			[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 ],
			[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
			[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
			[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
			[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
			[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
			[ 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 1 , 1 , 1 ],
			[ 1 , 0 , 0 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 1 ],
			[ 1 , 0 , 0 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 0 , 0 , 1 , 1 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 1 ],
			[ 1 , 1 , 1 , 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 1 ],
			[ 1 , 1 , 1 , 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 ],
			[ 1 , 1 , 1 , 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 ],
			[ 1 , 1 , 1 , 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 ],
			[ 1 , 1 , 1 , 1 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 1 , 1 , 1 , 1 , 0 , 1 , 1 , 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 ],
			[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 1 ],
			[ 1 , 0 , 1 , 1 , 0 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 1 ],
			[ 1 , 0 , 1 , 1 , 0 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
			[ 1 , 0 , 1 , 1 , 0 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
			[ 1 , 0 , 1 , 1 , 0 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 1 ],
			[ 1 , 0 , 1 , 1 , 0 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 1 ],
			[ 1 , 0 , 1 , 1 , 0 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 1 ],
			[ 1 , 0 , 1 , 1 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
			[ 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 1 ],
			[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 1 ],
			[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 1 ],
			[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 1 ],
			[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 1 ],
			[ 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 ],
			[ 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 1 , 1 , 1 , 0 , 0 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 1 ],
			[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 1 , 0 , 1 , 1 , 1 , 0 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 1 , 1 , 1 , 0 , 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 1 , 1 , 1 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
			[ 1 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 1 , 1 , 1 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
			[ 1 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 1 , 1 , 1 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 1 ],
			[ 1 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 1 , 0 , 1 ],
			[ 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 1 , 0 , 1 , 1 , 1 , 0 , 1 , 0 , 1 , 0 , 1 , 0 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 1 , 0 , 1 , 0 , 1 , 0 , 1 , 0 , 1 ],
			[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 1 ],
			[ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]
		];
        
    var foregroundMap = new Map(16, 16);
    foregroundMap.image = img_tileset;
        
	var newMap = function(lntrn,yarnB,exitT,exitW){
		return [
			[    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ],
			[ 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , exitW ],
			[ 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , exitW ],
			[ 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , exitT , exitT , exitT , exitT , exitT , exitT , exitT , exitT , exitT , exitT , exitT , exitW ],
			[ 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , exitT , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , exitW ],
			[ 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , sTx03 , sTx04 , 50000 , 50000 , exitT , 50000 , 50000 , sTx01 , 50000 , 50000 , sTx02 , 50000 , 50000 , 50000 , 50000 , exitW ],
			[ 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , snBrd , snBrd , 50000 , opac0 , opac0 , opac0 , 50000 , snBrd , lntrn , 50000 , snBrd , yarnB , 50000 , 50000 , 50000 , exitW ],
			[    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , opac1 , opac1 , opac1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , opac2 , opac2 , opac2 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , opac3 , opac3 , opac3 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , opac4 , opac4 , opac4 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , opac5 , opac5 , opac5 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ],
			[    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , sTx05 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , snBrd , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ],
			[    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ,    -1 , 50000 , 50000 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ],
			[    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ,    -1 , 50000 , 50000 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ],
			[    -1 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ],
			[    -1 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ],
			[    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 ,    -1 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 ,    -1 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , sTx06 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 ,    -1 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , snBrd , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 ,    -1 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 ,    -1 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 , sTx12 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 ,    -1 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 , snBrd , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 ,    -1 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 , sTx11 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 , snBrd , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , sTx08 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , snBrd , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 , 50000 , 50000 , sTx10 , 50000 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 , 50000 , 50000 , snBrd , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , sTx07 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 , 50000 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 , 50000 ,    -1 , 50000 , 50000 ,    -1 , snBrd , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 , 50000 ,    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ],
			[    -1 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 , 50000 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 , 50000 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 ,    -1 , 50000 , 50000 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 , 50000 ,    -1 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 , 50000 ,    -1 , 50000 ,    -1 ,    -1 ,    -1 , 50000 ,    -1 , 50000 ,    -1 , 50000 ,    -1 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , sTx09 , 50000 , 50000 ,    -1 , 50000 , 50000 , 50000 ,    -1 , 50000 ,    -1 , 50000 ,    -1 , 50000 ,    -1 , 50000 ,    -1 ],
			[    -1 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , 50000 , snBrd , 50000 , 50000 ,    -1 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 , 50000 ,    -1 , 50000 , 50000 , 50000 ,    -1 ],
			[    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ,    -1 ]
		]};             
	/********************************************************************************************/
    //Criação dos itens de cena			
	var contLanternFrames = 10;
	var bArrivedInCenter = false;
	var lanternPercent = 0;
	var bJustChanged = false;
	
	foregroundMap.loadData(newMap(lntrn,yarnB,50000,50000,50000));
	
	foregroundMap.addEventListener('enterframe', function(){			
		/************************************************************************************/
		//Tiles iniciais da lanterna, novelo e máscara para ocultar o labirinto
		if (bPickedLantern){
			if (contLanternFrames <= 0){
				lantern.frame++;
				contLanternFrames = 10;
			}
			else
				contLanternFrames--;
		}
		
		if (bPickedYarn)
			HUDyarn.frame = yarnToggle;
		
		if ((foregroundMap.checkTile(playerFeetX,playerFeetY) == lntrn) && lanternPercent == 0) {
			bPickedLantern = true;
			lantern.opacity = 1;
			lanternLiquid.opacity = 1;
			lanternLiquid.height = 32;
			lanternPercent = 100;
			if (bPickedYarn)
				foregroundMap.loadData(newMap(50000,50000,50000,50000));
			else
				foregroundMap.loadData(newMap(50000,yarnB,50000,50000));
		}
		
		if ((foregroundMap.checkTile(playerFeetX,playerFeetY) == yarnB) && !bPickedYarn) {
			bPickedYarn = true;
			HUDyarn.opacity = 1;
			if (bPickedLantern)
				foregroundMap.loadData(newMap(50000,50000,50000,50000));
			else
				foregroundMap.loadData(newMap(lntrn,50000,50000,50000));
		}		
		
		if(!personagem.isMoving){
			if (yarnToggle == 1){
				yarnSurface.draw(
					img_yarnString,
					0, 0,
					16, 16,
					playerFeetX-8, playerFeetY,
					16, 16,
				);
			};
			
			if (yarnToggle == 2){
				var currentTile = lab.checkTile(playerFeetX,playerFeetY);				
				var widthTileCount = Math.floor(img_tileset.width/16);				
				var tileX = currentTile % widthTileCount;						//Sobra da divisão
				var tileY = Math.floor(currentTile/widthTileCount);      		//Divisão de inteiros
				yarnSurface.draw(
					img_tileset,
					tileX*16, tileY*16,
					16, 16,
					playerFeetX-8, playerFeetY,
					16, 16,
				);
			};
		}
		
		/************************************************************************************/
		//Texto das placas
		if (!game.isTextOn){
			var sgnLtrnText = new String("");
			if((foregroundMap.checkTile(playerFeetX,playerFeetY) == sTx01) && (!bArrivedInCenter)){
				sgnLtrnText = sgnLtrnText + 'For the sake of authenticity, we   have provided you with ';
				sgnLtrnText = sgnLtrnText + 'the  same means of exploring as Theseus had available, an oil lantern!';				
			}
			
			if((foregroundMap.checkTile(playerFeetX,playerFeetY) == sTx02) && (!bArrivedInCenter)){
				sgnLtrnText = sgnLtrnText + 'And for you not to get lost and    find your way back, ';
				sgnLtrnText = sgnLtrnText + 'be sure to use this yarn ball!';
				sgnLtrnText = sgnLtrnText + ' And rememberto save some oil for the    return trip!';
			}
						
			if((foregroundMap.checkTile(playerFeetX,playerFeetY) == sTx03) && (!bArrivedInCenter)){
				sgnLtrnText = sgnLtrnText + "Welcome to the Messara's labyrinth!<br>";
				sgnLtrnText = sgnLtrnText + 'If legends are to be believed, the minotaur of Crete made its  home here.';
			}
			
			if((foregroundMap.checkTile(playerFeetX,playerFeetY) == sTx04) && (!bArrivedInCenter)){
				sgnLtrnText = sgnLtrnText + 'This so called labyrinth was       originally a limestone mine from where locals';
				sgnLtrnText = sgnLtrnText + ' excavated rocks  without much planning for   their homes.';
			}
			
			if((foregroundMap.checkTile(playerFeetX,playerFeetY) == sTx05) && (!bArrivedInCenter)){
				sgnLtrnText = sgnLtrnText + 'In the myth, the minotaur is a halfman and half bull monster   born from the '
				sgnLtrnText = sgnLtrnText + 'queen of Crete and a great white bull gifted by  Poseidon.';
			}
			
			if((foregroundMap.checkTile(playerFeetX,playerFeetY) == sTx06) && (!bArrivedInCenter)){
				sgnLtrnText = sgnLtrnText + 'Knowing of the monster, the king ofCrete, Minos, asks Daedalus to build a labyrinth for the       minotaur.';
			}
			
			if((foregroundMap.checkTile(playerFeetX,playerFeetY) == sTx07) && (!bArrivedInCenter)){
				sgnLtrnText = sgnLtrnText + 'After winning a war against Athens,Minos demands a blood       tribute from the defeated state    every few years.';				
			}
			
			if((foregroundMap.checkTile(playerFeetX,playerFeetY) == sTx08) && (!bArrivedInCenter)){
				sgnLtrnText = sgnLtrnText + 'The blood tribute consisted of     seven Athenian youths and   seven maidens to be devoured by    the minotaur.';
			}
			
			if((foregroundMap.checkTile(playerFeetX,playerFeetY) == sTx09) && (!bArrivedInCenter)){
				sgnLtrnText = sgnLtrnText + 'When it was the third time to pay  the tribute, Theseus, heir  to Athens and son of the king,     volunteered to go.';
			}
			
			if((foregroundMap.checkTile(playerFeetX,playerFeetY) == sTx10) && (!bArrivedInCenter)){
				sgnLtrnText = sgnLtrnText + 'In Crete, the daughter of King     Minos falls in love with    Theseus and gives him three gifts.';
			}
			
			if((foregroundMap.checkTile(playerFeetX,playerFeetY) == sTx11) && (!bArrivedInCenter)){
				sgnLtrnText = sgnLtrnText + 'The gifts were a sword with which  to kill the minotaur, ';
				sgnLtrnText = sgnLtrnText + "adviceon Daedalus' labyrinth and a ball  of yarn he was to use to    mark the way back out.";
			}
			
			if((foregroundMap.checkTile(playerFeetX,playerFeetY) == sTx12) && (!bArrivedInCenter)){
				sgnLtrnText = sgnLtrnText + 'After a fierce battle, Theseus     kills the beast and finds   his way out, back to Athens, now   freed from the blood tribute.';
				bArrivedInCenter = true;
			}
			
			if((foregroundMap.checkTile(playerFeetX,playerFeetY) == opac0) && (bArrivedInCenter)){
				sgnLtrnText = sgnLtrnText + 'Congratulations!<br>';
				sgnLtrnText = sgnLtrnText + "You completed our tour, now you    know a little more about    Crete's amazing history!<br>";
				foregroundMap.loadData(newMap(50000,50000,exitT,exitW));
			}
			
			if((foregroundMap.checkTile(playerFeetX,playerFeetY) == opac2) && (lanternPercent < 1) && (!bArrivedInCenter)){
				sgnLtrnText = sgnLtrnText + 'It sure is dark in there, better toget the equipment provided  for the tour before venturing in.';				
			}					
			
			if (sgnLtrnText != ""){
				var sgnLabel = game.showMessage(scene2, sgnLtrnText);	
				scene2.addChild(sgnLabel);	
				game.isTextOn = true;	
			}
		}
		
		/************************************************************************************/
		//Não deixa o player entrar caso não tenha a lanterna
		if((foregroundMap.checkTile(playerFeetX,playerFeetY) == opac3) && (lanternPercent < 1)){
			if (bPickedYarn)
				foregroundMap.loadData(newMap(lntrn,50000,50000,50000));
			else
				foregroundMap.loadData(newMap(lntrn,yarnB,50000,50000));
			personagem.y -= 16;
		}		
	});
	
	/************************************************************************************/
	//Adiciona o player e máscaras
	scene2.addChild(lab);
    scene2.addChild(foregroundMap);
       
	setLabyrinth(lab);
	   
    var personagem = createPlayer(11*16, 3*16);
	game.personagem = personagem;
		    
    var newArea = new Sprite(400,944);
    newArea.x = 0;
    newArea.y = 0;
    newArea._width = 400;
    newArea._height = 944;
    setWalkableArea(newArea);
    scene2.addChild(personagem);

	var maskScaleMax = 2.5;
	var maskScaleMin = 1.0;	
	mask = new Sprite(1200,1200);
	mask.image = img_mask;
	mask.scaleX = maskScaleMax;
	mask.scaleY = maskScaleMax;
	mask.x = personagem.x-585;
	mask.y = personagem.y-570;
	mask.opacity = 0;
	mask.addEventListener('enterframe', function(){
		if ((mask.scaleX <= maskScaleMax) && (mask.scaleY <= maskScaleMax) && (mask.scaleX >= maskScaleMin) && (mask.scaleY >= maskScaleMin) && (lanternPercent > 0) && (mask.opacity > 0.8) && !bJustChanged){
			mask.scaleX = maskScaleMin + (maskScaleMax - maskScaleMin) * lanternPercent/100;
			mask.scaleY = maskScaleMin + (maskScaleMax - maskScaleMin) * lanternPercent/100;
			bJustChanged = true;
		}		
	});
    scene2.addChild(mask);
	
	hideLabyritnh = new Sprite(1200,1200);
	hideLabyritnh.image = img_blackbox;
	hideLabyritnh.x = 0;
	hideLabyritnh.y = personagem.y+15;
    scene2.addChild(hideLabyritnh);
	
	/************************************************************************************/
	//Prepara o caminho deixado pelo novelo
    var yarnBg = new Sprite(lab.width, lab.height);
    var yarnSurface = new Surface(yarnBg.width, yarnBg.height);
    yarnBg.image = yarnSurface;
    scene2.insertBefore(yarnBg, personagem);
	
	/************************************************************************************/
	//Pickups da lanterna
	var lanternPickups = [];
	var collect = function(){
		for (lanternNumber in lanternPickups){
			//Checando colisão pixel a pixel
			if(
			   (personagem.x + personagem.width/2 > lanternPickups[lanternNumber].x) && (personagem.y + personagem.height/2 < lanternPickups[lanternNumber].y + lanternPickups[lanternNumber].height) &&
			   (personagem.x + personagem.width/2 < lanternPickups[lanternNumber].x + lanternPickups[lanternNumber].width) && (personagem.y + personagem.height > lanternPickups[lanternNumber].y)
			){				
				lanternPercent = 100;	
				lanternLiquid.height = 32;
				scene2.removeChild(lanternPickups[lanternNumber]);
				lanternPickups.splice(lanternNumber,1);				
			}
		}
	};
	
	for(var i=0; i<7; i++){
		var tempLantern = new Sprite(16,16);  
		tempLantern.image = img_lanternPickup;
		tempLantern.addEventListener('enterframe', collect);
		lanternPickups.push(tempLantern);		
		scene2.insertBefore(tempLantern,personagem);		
	}
	
	lanternPickups[0].x = 14 * 16;
	lanternPickups[0].y = 56 * 16;
	lanternPickups[1].x = 19 * 16;
	lanternPickups[1].y = 46 * 16;
	lanternPickups[2].x = 22 * 16;
	lanternPickups[2].y = 29 * 16;
	lanternPickups[3].x = 10 * 16;
	lanternPickups[3].y = 27 * 16;
	lanternPickups[4].x = 22 * 16;
	lanternPickups[4].y = 18 * 16;
	lanternPickups[5].x =  1 * 16;
	lanternPickups[5].y = 26 * 16;
	lanternPickups[6].x =  1 * 16;
	lanternPickups[6].y = 33 * 16;
		
	/********************************************************************************************/
	// Background music
	if(game.soundOn){
		scene2.bgm = fase2_sound;
		scene2.bgm.play();
		scene2.bgm.volume = 0.5;			
	}
		
	/********************************************************************************************/
	//Evento enterframe principal
	var steppedTrap = false;
	scene2.addEventListener('enterframe', function(e) {
		if (game.soundOn && scene2.bgm.currentTime >= this.bgm.duration){
			scene2.bgm.play();
		}                                                        
				
		/********************************************************************************************/
		//Transição entre o lado de dentro e de fora do labirinto
		if((foregroundMap.checkTile(playerFeetX,playerFeetY) == opac0) && ((hideLabyritnh.opacity != 1) || hideLabyritnh.opacity != 0)){
			hideLabyritnh.opacity = 1;
			mask.opacity = 0;
		}
		
		if((foregroundMap.checkTile(playerFeetX,playerFeetY) == opac1) && (hideLabyritnh.opacity != 0.8)){
			mask.opacity = 0.2;
		}
		
		if((foregroundMap.checkTile(playerFeetX,playerFeetY) == opac2) && (hideLabyritnh.opacity != 0.6)){
			mask.opacity = 0.4;
		}
		
		if((foregroundMap.checkTile(playerFeetX,playerFeetY) == opac3) && (hideLabyritnh.opacity != 0.4)){
			mask.opacity = 0.6;
		}
		
		if((foregroundMap.checkTile(playerFeetX,playerFeetY) == opac4) && (hideLabyritnh.opacity != 0.2)){
			hideLabyritnh.opacity = 1;
			mask.opacity = 0.8;
		}
		
		if((foregroundMap.checkTile(playerFeetX,playerFeetY) == opac5) && (hideLabyritnh.opacity != 0)){
			hideLabyritnh.opacity = 0;
			mask.opacity = 1;
		}
		
		/********************************************************************************************/
		//Movimentacao da mascara e da cena junto com o personagem
		if(personagem!=null){
			var x = Math.min((game.width  - 16) / 2 - personagem.x, 0);
			var y = Math.min((game.height - 16) / 2 - personagem.y, 0);
			x = Math.max(game.width,  x + lab.width)  - lab.width;
			y = Math.max(game.height, y + lab.height) - lab.height;
			scene2.x = x;
			scene2.y = y;
			mask.x = personagem.x-586;
			mask.y = personagem.y-577;
			
			/************************************************************************************/
			//Elementos fixos na HUD
			lantern.x =  lantern.width/2 - x + hudOffset;
			lantern.y =  lantern.height/2 - y;
			lanternLiquid.x = lantern.x;
			lanternLiquid.y = lantern.y;
						
			HUDyarn.x =  HUDyarn.width/2 + lantern.x + lantern.width + hudOffset;
			HUDyarn.y =  HUDyarn.height/2 - y;
			
			if(game.mobile){
				pad.x = 20 - x;
				pad.y = game.height - pad.height*1.25 - y;
			
				if(button){
					button.x = game.width - button.width - x - 20;
					button.y = game.height - button.height*1.25 - y;
				}
			}
			
			/************************************************************************************/
			//Relocalizando local de colisão do player
			playerFeetX = personagem.x + personagem.width/2;
			playerFeetY = personagem.y + personagem.height/2;
				
			/************************************************************************************/
			//Final da fase
			if((foregroundMap.checkTile(playerFeetX,playerFeetY) == exitW) && (bArrivedInCenter)){
				console.log(exitW);
				scene2.bgm.stop();
				transition_img = game.setTransition(scene2, 'In');
				transition_img.tl.fadeIn(game.fadeTime/2).then(function(){
					game.changeStages('final');	
				});
			}
			/************************************************************************************/
		}
	
    });
		
	/********************************************************************************************/
    //Configuração inicial da HUD		
	var lantern = new Sprite(32,32);  
	lantern.image = img_lantern;		
	lantern.opacity = 0;	
	lantern.x =  lantern.width/2 + hudOffset;
	lantern.y =  lantern.height/2;
	var lanternCount = 5;
	lantern.addEventListener('enterframe', function(){	
		if (lanternCount == 0) {
			if ((mask.opacity > 0.8) && (lanternPercent > 0)) {
				lanternPercent--;
				bJustChanged = false;
			}
			lanternCount = 5;
		}
		lanternCount--;
	});
	scene2.insertBefore(lantern,0);	

	var liquidMinHeight = 13;
	var liquidMaxHeight = 28;
	var lanternLiquid = new Sprite (32,32);
	lanternLiquid.image = img_lanternLiquid;
	lanternLiquid.opacity = 0;	
	lanternLiquid.y = lantern.y - 4;
	lanternLiquid.addEventListener('enterframe', function(){
		if (((lanternLiquid.height-4) <= liquidMaxHeight) && (lanternLiquid.height >= liquidMinHeight) && (lanternPercent > 0) && (mask.opacity > 0.8) && !bJustChanged){
			//var oldHeight = lanternLiquid.height;			
			lanternLiquid.height = liquidMinHeight + (liquidMaxHeight - liquidMinHeight) * lanternPercent/100;
			//lanternLiquid.y = lantern.y + lantern.height - oldHeight - 4;
		} 
		
		/*if ((lanternPercent <= 0) && (lanternLiquid.height > 0))
			lanternLiquid.height = 0;*/
			
	});
	scene2.insertBefore(lanternLiquid,lantern);		
	
	var HUDyarn = new Sprite(32,32);  
	HUDyarn.image = img_yarnBall;		
	HUDyarn.opacity = 0;	
	scene2.insertBefore(HUDyarn,0);	
	
	if(game.mobile){
		var pad = new Pad();
		pad.x = 30;
		pad.y = 470;
		pad.scale(1.5,1.5);
		scene2.addChild(pad);
	}
	
	/********************************************************************************************/
}
