let { init, Sprite, GameLoop, SpriteSheet, initKeys, keyPressed, angleToTarget  } = kontra

let { canvas } = init();

initKeys();
kontra.getContext().scale(5, 5);

let sprite = Sprite({
  x: 100,        // starting x,y position of the sprite
  y: 80,
  color: 'red',  // fill color of the sprite rectangle
  width: 20,     // width and height of the sprite rectangle
  height: 40,
  dx: 2          // move the sprite 2px to the right every frame
});

kontra.setImagePath('assets');
kontra.load(
  "person_sheet.png",
).then(
  function(){
    let spriteSheet = SpriteSheet({
      image: kontra.imageAssets['person_sheet'],
      frameWidth: 7,
      frameHeight: 14,
      animations: {
        idle: {
          frames: 1,
          loop: false,
        },
        walk: {
          frames: '0..3',  // frames 0 through 9
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



