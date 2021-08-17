let { init, Sprite, GameLoop, SpriteSheet, initKeys, keyPressed, angleToTarget  } = kontra
let { canvas } = init();

// Initialise Keyboard Events
initKeys();

// Scale Canvas
SCALE = 6;
kontra.getContext().scale(SCALE, SCALE);

// Load Image Path
kontra.setImagePath('assets');

//First Load Image, then run Game
kontra.load(
  "person_sheet-min.png",
).then(

  function(){
    let spriteSheet = SpriteSheet({
      image: kontra.imageAssets['person_sheet-min'],
      frameWidth: 7,
      frameHeight: 14,
      animations: {
        idle: {
          frames: 1,
          loop: false,
        },
        walk: {
          frames: [0, 1, 2, 1],
          frameRate: 6,
        }
      }
    });

    let sprite = Sprite({
      x: 10,
      y: 10,
      anchor: {x: 0.5, y: 0.5},
      animations: spriteSheet.animations
    })

    dir = 1;
    x_speed = 0.6;
    y_speed = 0.4;

    let loop = GameLoop({  // create the main game loop
      update: function() { // update the game state
        sprite.update();
        
        move = false;

        if (keyPressed('left')) {
          if(dir == 1){
            dir = -1;
          }
          
          sprite.x += dir * x_speed;
          move = true;
        }else if(keyPressed('right')){
          if(dir == -1){
            dir = 1;
          }

          sprite.x += dir * x_speed;
          move = true;
        }

        if (keyPressed('up')) {
          sprite.y -= y_speed;
          move = true;
        }else if(keyPressed('down')){
          sprite.y += y_speed;
          move = true;
        }

        if(!move){
          sprite.playAnimation("idle");
          sprite.animations["walk"].reset();
        }else{
          sprite.playAnimation("walk");
        }
      },
      render: function() { // render the game state
        sprite.render();
      }
    });
    
    loop.start();    // start the game
  }
)



