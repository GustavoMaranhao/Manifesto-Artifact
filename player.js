var game;
var mapMinWidth = 0;
var mapMaxWidth = 0;
var mapMinHeight = 0;
var mapMaxHeight = 0;

var labyrinth;
var wallTile = 8;

var img_char;

function setPlayerGameVar(game, area){
    this.game = game;
    
    setWalkableArea(area);
    
    img_char = game.assets['imagens/player/chara0.png'];
}

function setLabyrinth(lab){
    this.labyrinth = lab;
}

function setWalkableArea(area){
    this.mapMinWidth = area._x;
    this.mapMaxWidth = this.mapMinWidth + area._width - 10;
    this.mapMinHeight = area._y + 10;
    this.mapMaxHeight = this.mapMinHeight + area._height - 20;  
}

function createPlayer(createX, createY){
    var player = new Sprite(32, 32);
    player.x = createX;
    player.y = createY;
	var image = new Surface(96, 128);
    image.draw(img_char, 0, 0, 96, 128, 0, 0, 96, 128);
    player.image = image;
	
	if(game.soundOn){
		if(labyrinth!=null){
			player_walking_sound = game.assets['sons/randomico/player-andando-labirinto.mp3']; // Chico
			player_walking_sound.play();
			player_walking_sound.volume = 0.4;                                             // Chico
		} else {
			player_walking_sound = game.assets['sons/randomico/passos-na-areia.mp3']; 	       // Chico
			player_walking_sound.play();
			player_walking_sound.volume = 0.8;                                                 // Chico
		} 
	}

    player.isMoving = false;
    player.direction = 0;
    player.walk = 1;
        
    player.addEventListener('enterframe', function() {  	
        this.frame = this.direction * 3 + this.walk;

        if (this.isMoving) {
			if(game.soundOn && player_walking_sound.currentTime >= player_walking_sound.duration)
				player_walking_sound.play();
			
            this.moveBy(this.vx, this.vy);

            if (!(game.frame % 3)) {
                this.walk++;
                this.walk %= 3;
            }
            if ((this.vx && (this.x-8) % 16 == 0) || (this.vy && this.y % 16 == 0)) {
                this.isMoving = false;
                this.walk = 1;
            }
        } else {            
            this.vx = this.vy = 0;
            if (game.input.left) {
                this.direction = 1;
                this.vx = -4;
            } else if (game.input.right) {
                this.direction = 2;
                this.vx = 4;
            } else if (game.input.up) {
                this.direction = 3;
                this.vy = -4;
            } else if (game.input.down) {
                this.direction = 0;
                this.vy = 4;
            }
            if (this.vx || this.vy) {
                var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 16 : 0) + 16;
                var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 16 : 0) + 16;
               if (x >= mapMinWidth && x < mapMaxWidth && y >= mapMinHeight && y < mapMaxHeight)
                    if(labyrinth==null){
                        this.isMoving = true;
                        arguments.callee.call(this);
                    } else {
                        if(!labyrinth.hitTest(x, y)){
                            this.isMoving = true;
                            arguments.callee.call(this);
                        }
                    }
            }
        }
     });
	 
	 game.currentScene.addEventListener(Event.A_BUTTON_UP, function(e) {	
		if (bPickedYarn){			
			if(yarnToggle < 2)
				yarnToggle++;
			else
				yarnToggle = 0;
		}
	 });
        
    return player;
}