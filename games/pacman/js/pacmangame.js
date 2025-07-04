var game = new Phaser.Game(448, 496, Phaser.AUTO, "game");

var PacmanGame = function (game) {    
    this.map = null;
    this.layer = null;
    
    this.numDots = 0;
    this.TOTAL_DOTS = 0;
    this.score = 0;
    this.scoreText = null;
    
    this.pacman = null; 
    this.clyde = null;
    this.pinky = null;
    this.inky = null;
    this.blinky = null;
    this.isInkyOut = false;
    this.isClydeOut = false;
    this.ghosts = [];

    this.safetile = 14;
    this.gridsize = 16;       
    this.threshold = 3;
    
    this.SPECIAL_TILES = [
        { x: 12, y: 11 },
        { x: 15, y: 11 },
        { x: 12, y: 23 },
        { x: 15, y: 23 }
    ];
    
    this.TIME_MODES = [
        {
            mode: "scatter",
            time: 7000
        },
        {
            mode: "chase",
            time: 20000
        },
        {
            mode: "scatter",
            time: 7000
        },
        {
            mode: "chase",
            time: 20000
        },
        {
            mode: "scatter",
            time: 5000
        },
        {
            mode: "chase",
            time: 20000
        },
        {
            mode: "scatter",
            time: 5000
        },
        {
            mode: "chase",
            time: -1 // -1 = infinite
        }
    ];
    this.changeModeTimer = 0;
    this.remainingTime = 0;
    this.currentMode = 0;
    this.isPaused = false;
    this.FRIGHTENED_MODE_TIME = 7000;
    
    this.ORIGINAL_OVERFLOW_ERROR_ON = true;
    this.DEBUG_ON = true;
    
    this.KEY_COOLING_DOWN_TIME = 250;
    this.lastKeyPressed = 0;
    
    this.game = game;
};

PacmanGame.prototype = {

    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas); // full retro mode, i guess ;)

        this.physics.startSystem(Phaser.Physics.ARCADE);
    },

    preload: function () {
        // Assets are loaded locally

        this.load.image('dot', 'assets/dot.png');
        this.load.image("pill", "assets/pill16.png");
        this.load.image('tiles', 'assets/pacman-tiles.png');
        this.load.spritesheet('pacman', 'assets/pacman.png', 32, 32);
        this.load.spritesheet("ghosts", "assets/ghosts32.png", 32, 32);
        this.load.tilemap('map', 'assets/pacman-map.json', null, Phaser.Tilemap.TILED_JSON);

        //  Needless to say, the beast was stoned... and the graphics are Namco (C)opyrighted
    },

    create: function () {
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('pacman-tiles', 'tiles');

        this.layer = this.map.createLayer('Pacman');

        this.dots = this.add.physicsGroup();
        this.numDots = this.map.createFromTiles(7, this.safetile, 'dot', this.layer, this.dots);
        this.TOTAL_DOTS = this.numDots;
        
        this.pills = this.add.physicsGroup();
        this.numPills = this.map.createFromTiles(40, this.safetile, "pill", this.layer, this.pills);

        //  The dots will need to be offset by 6px to put them back in the middle of the grid
        this.dots.setAll('x', 6, false, false, 1);
        this.dots.setAll('y', 6, false, false, 1);

        //  Pacman should collide with everything except the safe tile
        this.map.setCollisionByExclusion([this.safetile], true, this.layer);

		// Our hero
        this.pacman = new Pacman(this, "pacman");

        // Score and debug texts
        this.scoreText = game.add.text(8, 272, "Score: " + this.score, { fontSize: "16px", fill: "#fff" });
        this.debugText = game.add.text(375, 260, "", { fontSize: "12px", fill: "#fff" });
        this.overflowText = game.add.text(375, 280, "", { fontSize: "12px", fill: "#fff" });
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors["d"] = this.input.keyboard.addKey(Phaser.Keyboard.D);
        this.cursors["b"] = this.input.keyboard.addKey(Phaser.Keyboard.B);
        
        //this.game.time.events.add(1250, this.sendExitOrder, this);
        //this.game.time.events.add(7000, this.sendAttackOrder, this);
        
        this.changeModeTimer = this.time.time + this.TIME_MODES[this.currentMode].time;
        
        // Ghosts
        this.blinky = new Ghost(this, "ghosts", "blinky", {x:13, y:11}, Phaser.RIGHT);
        this.pinky = new Ghost(this, "ghosts", "pinky", {x:15, y:14}, Phaser.LEFT);
        this.inky = new Ghost(this, "ghosts", "inky", {x:14, y:14}, Phaser.RIGHT);
        this.clyde = new Ghost(this, "ghosts", "clyde", {x:17, y:14}, Phaser.LEFT);
        this.ghosts.push(this.clyde, this.pinky, this.inky, this.blinky);
        
        this.sendExitOrder(this.pinky);
    },

    checkKeys: function () {
        this.pacman.checkKeys(this.cursors);
        
        if (this.lastKeyPressed < this.time.time) {
            if (this.cursors.d.isDown) {
                this.DEBUG_ON = (this.DEBUG_ON) ? false : true;
                this.lastKeyPressed = this.time.time + this.KEY_COOLING_DOWN_TIME;
            }
            if (this.cursors.b.isDown) {
                this.ORIGINAL_OVERFLOW_ERROR_ON = this.ORIGINAL_OVERFLOW_ERROR_ON ? false : true;
                this.pinky.ORIGINAL_OVERFLOW_ERROR_ON = this.ORIGINAL_OVERFLOW_ERROR_ON;
            }
        }
    },
    
    checkMouse: function() {
        if (this.input.mousePointer.isDown) {            
            var x = this.game.math.snapToFloor(Math.floor(this.input.x), this.gridsize) / this.gridsize;
            var y = this.game.math.snapToFloor(Math.floor(this.input.y), this.gridsize) / this.gridsize;
            this.debugPosition = new Phaser.Point(x * this.gridsize, y * this.gridsize);
            // Debug position: x, y
        }
    },
    
    dogEatsDog: function(pacman, ghost) {
        if (this.isPaused) {
            this[ghost.name].mode = this[ghost.name].RETURNING_HOME;
            this[ghost.name].ghostDestination = new Phaser.Point(14 * this.gridsize, 14 * this.gridsize);
            this[ghost.name].resetSafeTiles();
            this.score += 10;
        } else {
            this.killPacman();
        }
    },
    
    getCurrentMode: function() {
        if (!this.isPaused) {
            if (this.TIME_MODES[this.currentMode].mode === "scatter") {
                return "scatter";
            } else {
                return "chase";
            }
        } else {
            return "random";
        }
    },
    
    gimeMeExitOrder: function(ghost) {
        this.game.game.time.events.add(Math.random() * 3000, this.sendExitOrder, this, ghost);
    },
        
    killPacman: function() {
        this.pacman.isDead = true;
        this.stopGhosts();
        this.showGameOverMessage();
    },
    
    stopGhosts: function() {
        for (var i=0; i<this.ghosts.length; i++) {
            this.ghosts[i].mode = this.ghosts[i].STOP;
        }
    },
    
    showGameOverMessage: function() {
        // 创建游戏结束遮罩
        this.gameOverOverlay = this.add.graphics(0, 0);
        this.gameOverOverlay.beginFill(0x000000, 0.7);
        this.gameOverOverlay.drawRect(0, 0, 448, 496);
        this.gameOverOverlay.endFill();
        
        // 游戏结束文本
        this.gameOverText = this.add.text(224, 200, "GAME OVER", { 
            fontSize: "32px", 
            fill: "#ff0000", 
            fontWeight: "bold" 
        });
        this.gameOverText.anchor.setTo(0.5);
        
        // 最终分数
        this.finalScoreText = this.add.text(224, 250, "Final Score: " + this.score, { 
            fontSize: "20px", 
            fill: "#ffffff" 
        });
        this.finalScoreText.anchor.setTo(0.5);
        
        // 重新开始提示
        this.restartText = this.add.text(224, 300, "Press SPACE to restart", { 
            fontSize: "16px", 
            fill: "#ffff00" 
        });
        this.restartText.anchor.setTo(0.5);
        
        // 添加重新开始键
        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(this.restartGame, this);
    },
    
    showVictoryMessage: function() {
        // 停止所有鬼魂
        this.stopGhosts();
        
        // 创建胜利遮罩
        this.victoryOverlay = this.add.graphics(0, 0);
        this.victoryOverlay.beginFill(0x000000, 0.7);
        this.victoryOverlay.drawRect(0, 0, 448, 496);
        this.victoryOverlay.endFill();
        
        // 胜利文本
        this.victoryText = this.add.text(224, 200, "YOU WIN!", { 
            fontSize: "32px", 
            fill: "#00ff00", 
            fontWeight: "bold" 
        });
        this.victoryText.anchor.setTo(0.5);
        
        // 最终分数
        this.finalScoreText = this.add.text(224, 250, "Final Score: " + this.score, { 
            fontSize: "20px", 
            fill: "#ffffff" 
        });
        this.finalScoreText.anchor.setTo(0.5);
        
        // 下一关提示
        this.nextLevelText = this.add.text(224, 300, "Press SPACE for next level", { 
            fontSize: "16px", 
            fill: "#ffff00" 
        });
        this.nextLevelText.anchor.setTo(0.5);
        
        // 添加下一关键
        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(this.nextLevel, this);
    },
    
    restartGame: function() {
        this.game.state.restart();
    },
    
    nextLevel: function() {
        // 重新生成所有豆子，增加难度
        this.dots.callAll('revive');
        this.pills.callAll('revive');
        this.numDots = this.TOTAL_DOTS;
        this.numPills = 4; // 重置药丸数量
        
        // 清除胜利界面
        if (this.victoryOverlay) {
            this.victoryOverlay.destroy();
            this.victoryText.destroy();
            this.finalScoreText.destroy();
            this.nextLevelText.destroy();
        }
        
        // 重置Pacman
        this.pacman.sprite.x = (14 * 16) + 8;
        this.pacman.sprite.y = (17 * 16) + 8;
        this.pacman.sprite.body.reset(this.pacman.sprite.x, this.pacman.sprite.y);
        this.pacman.current = Phaser.NONE;
        this.pacman.isDead = false;
        this.pacman.isAnimatingDeath = false;
        this.pacman.sprite.play('munch');
        this.pacman.move(Phaser.LEFT);
        
        // 重置鬼魂
        this.blinky.resetGhost();
        this.pinky.resetGhost();
        this.inky.resetGhost();
        this.clyde.resetGhost();
        
        // 重置游戏状态
        this.isInkyOut = false;
        this.isClydeOut = false;
        this.currentMode = 0;
        this.changeModeTimer = this.time.time + this.TIME_MODES[this.currentMode].time;
        this.isPaused = false;
        
        // 移除空格键监听
        if (this.spaceKey) {
            this.spaceKey.onDown.removeAll();
        }
        
        // 重新发送Pinky出来的命令
        this.sendExitOrder(this.pinky);
    },

    update: function () {
        this.scoreText.text = "Score: " + this.score;
        if (this.DEBUG_ON) {
            this.debugText.text = "Debug ON";
        } else {
            this.debugText.text = "";
        }
        if (this.ORIGINAL_OVERFLOW_ERROR_ON) {
            this.overflowText.text = "Overflow ON";
        } else {
            this.overflowText.text = "";
        }
        
        // 如果游戏结束或胜利，只更新显示，不更新游戏逻辑
        if (this.gameOverOverlay || this.victoryOverlay) {
            return;
        }
        
        if (!this.pacman.isDead) {
            for (var i=0; i<this.ghosts.length; i++) {
                if (this.ghosts[i].mode !== this.ghosts[i].RETURNING_HOME) {
                    this.physics.arcade.overlap(this.pacman.sprite, this.ghosts[i].ghost, this.dogEatsDog, null, this);
                }
            }
            
            if (this.TOTAL_DOTS - this.numDots > 30 && !this.isInkyOut) {
                this.isInkyOut = true;
                this.sendExitOrder(this.inky);
            }
            
            if (this.numDots < this.TOTAL_DOTS/3 && !this.isClydeOut) {
                this.isClydeOut = true;
                this.sendExitOrder(this.clyde);
            }
            
            if (this.changeModeTimer !== -1 && !this.isPaused && this.changeModeTimer < this.time.time) {
                this.currentMode++;
                this.changeModeTimer = this.time.time + this.TIME_MODES[this.currentMode].time;
                if (this.TIME_MODES[this.currentMode].mode === "chase") {
                    this.sendAttackOrder();
                } else {
                    this.sendScatterOrder();
                }
                // New mode: this.TIME_MODES[this.currentMode].mode, this.TIME_MODES[this.currentMode].time
            }
            if (this.isPaused && this.changeModeTimer < this.time.time) {
                this.changeModeTimer = this.time.time + this.remainingTime;
                this.isPaused = false;
                if (this.TIME_MODES[this.currentMode].mode === "chase") {
                    this.sendAttackOrder();
                } else {
                    this.sendScatterOrder();
                }
                // New mode: this.TIME_MODES[this.currentMode].mode, this.TIME_MODES[this.currentMode].time
            }
        }
        
        this.pacman.update();
		this.updateGhosts();
        
        this.checkKeys();
        this.checkMouse();
    },
    
    enterFrightenedMode: function() {
        for (var i=0; i<this.ghosts.length; i++) {
            this.ghosts[i].enterFrightenedMode();
        }
        if (!this.isPaused) {
            this.remainingTime = this.changeModeTimer - this.time.time;
        }
        this.changeModeTimer = this.time.time + this.FRIGHTENED_MODE_TIME;
        this.isPaused = true;
        // Remaining time: this.remainingTime
    },
    
    isSpecialTile: function(tile) {
        for (var q=0; q<this.SPECIAL_TILES.length; q++) {
            if (tile.x === this.SPECIAL_TILES[q].x && tile.y === this.SPECIAL_TILES[q].y) {
                return true;
            } 
        }
        return false;
    },
    
    updateGhosts: function() {
        for (var i=0; i<this.ghosts.length; i++) {
            this.ghosts[i].update();
        }
    },
    
    render: function() {
        if (this.DEBUG_ON) {
            for (var i=0; i<this.ghosts.length; i++) {
                var color = "rgba(0, 255, 255, 0.6)";
                switch (this.ghosts[i].name) {
                    case "blinky":
                        color = "rgba(255, 0, 0, 0.6";
                        break;
                    case "pinky":
                        color = "rgba(255, 105, 180, 0.6";
                        break;
                    case "clyde":
                        color = "rgba(255, 165, 0, 0.6";
                        break;
                }
                if (this.ghosts[i].ghostDestination) {
                    var x = this.game.math.snapToFloor(Math.floor(this.ghosts[i].ghostDestination.x), this.gridsize);
                    var y = this.game.math.snapToFloor(Math.floor(this.ghosts[i].ghostDestination.y), this.gridsize);
                    this.game.debug.geom(new Phaser.Rectangle(x, y, 16, 16), color);
                }
            }
            if (this.debugPosition) {
                this.game.debug.geom(new Phaser.Rectangle(this.debugPosition.x, this.debugPosition.y, 16, 16), "#00ff00");
            }
        } else {
            this.game.debug.reset();
        }
    },
    
    sendAttackOrder: function() {
        for (var i=0; i<this.ghosts.length; i++) {
            this.ghosts[i].attack();
        }
    },
    
    sendExitOrder: function(ghost) {
        ghost.mode = this.clyde.EXIT_HOME;
    },
    
    sendScatterOrder: function() {
        for (var i=0; i<this.ghosts.length; i++) {
            this.ghosts[i].scatter();
        }
    }
};

game.state.add('Game', PacmanGame, true);
