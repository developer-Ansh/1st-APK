var PLAY = 1;
var END = 0;
var gameState = PLAY;

var green2,g,ig,gover;

var mushroom,mushroomImg,mGroup;

var marioImg,mario;

var bowserImg,bowser,bgr;

var birdImg,bird,bg,jumgI,leftI, rightI,attackI;

var score = 0;

var gameover,gs,jumpS,point,jump,left,right,attack;

function preload(){
   green2 = loadImage("Green.jpg");
  
   jumpI = loadImage("up.png");
   leftI = loadImage("left.png");
   rightI = loadImage("right.png");
   attackI = loadImage("attack.png");
  
   marioImg = loadImage("SuperMario.png");
  
   bowserImg = loadImage("Bowser.png");
  
   birdImg = loadImage("bird.png");
  
   gover = loadImage("gover.png");
  
   gs = loadSound("gameover.wav");
  
   jumpS = loadSound("jump01.wav");

   point = loadSound("point.wav")
  
   mushroomImg = loadImage("mushrooom.png");

}

function setup() {
  createCanvas(400,400);
  
  g = createSprite(200,150,20,20);
  g.addImage(green2);
  g.scale = 2;

  gameover = createSprite(200,200,600,600)
  gameover.addImage(gover);
  

  
  mario = createSprite(60,290,10,10);
  mario.addImage(marioImg);
  mario.scale = 0.08;
  
  ig = createSprite(200,320,600,10)
  ig.velocityX = -(12 + 3*score/100);
  
  bg = new Group();
  
  bgr = new Group();
  
  mGroup = new Group();
}

function draw() {
  background("black");
  
  if (g.x < 0) 
          {
            g.x = 100;
          }
  
  if (ig.x < 0) 
          {
            ig.x = 100;
          }
 
  ig.visible = false;
  
  if (gameState === PLAY)
  {

    var attack = createSprite(50,360,20,20);
    attack.addImage(attackI);
    attack.scale = 0.03;

    var left = createSprite(320,360,20,20);
    left.addImage(leftI);
    left.scale = 0.07;

    var right = createSprite(260,360,20,20);
    right.addImage(rightI);
    right.scale = 0.03;

    var mush = createSprite(370,360,20,20);
    mush.addImage(mushroomImg);
    mush.scale = 0.15;

  

    spawnBowser();
    spawnBird();
    mario.visible = true;
    gameover.visible = false;
    
    if(keyWentDown("m")) {
      createMushrooms();
    }

    if(mousePressedOver(mush)) {
      createMushrooms();
    }

    if(mousePressedOver(attack) && mario.y >= 270) {
      mario.velocityY = -20;
      jumpS.play();
    }
    
    if(mGroup.isTouching(bgr))
      {
        mGroup.destroyEach();
        bgr.destroyEach();
      }
    
    if(mGroup.isTouching(bg))
      {
        gameState = END;
        gs.play();
      }
    
    if(keyDown("space") && mario.y >= 270){
      mario.velocityY = -20; 
      jumpS.play();
    }
    mario.velocityY = mario.velocityY + 1.0;
    
    
    if (keyDown("RIGHT")) 
    {
      mario.x = mario.x + 2;
      g.velocityX = -2;
    }

    if (mousePressedOver(left)) 
    {
      mario.x = mario.x + 2;
      g.velocityX = -2;
    }
      
    if (keyDown("LEFT")) 
    {
      mario.x = mario.x - 2;
    }
    
    if (mousePressedOver(right)) 
    {
      mario.x = mario.x - 2;
    }
    
    if(bg.isTouching(mario))
    {
      bg.destroyEach();
      score = score + 1;
      point.play();
    }
    
    if(mario.x >= 400 || mario.x < 0)
      {
        gs.play();
        gameState = END;
      }
    
    if(bgr.isTouching(mario))
    {
      gs.play();
      bgr.setVelocityEach(0);
      bg.setVelocityEach(0); 
      mario.visible = false;
      gameState = END;
    }  
  }
  
  if(gameState === END) {
    gameover.visible = true;
    bgr.destroyEach();
    bg.destroyEach();
    mGroup.destroyEach();

    if(mousePressedOver(gameover)){
    reset();
  }
  }
  mario.collide(ig);
  drawSprites();
  text("Score: " + score,340,20);
}


function spawnBowser()
{
  if(frameCount % 80 === 0) {
    var bowser = createSprite(399,290,10,10);
    bowser.addImage(bowserImg);
    bowser.scale = 0.1;
    bowser.velocityX = -5;
    bowser.x = Math.round(random(200,350));
    bowser.lifetime = 200;
    
    bgr.add(bowser);
  }
}

function spawnBird()
{
     if(frameCount % 100 === 0) {
    var bird = createSprite(399,30,10,10);
    bird.addImage(birdImg);
    bird.scale = 0.1;
    bird.velocityX = -5;
    bird.y = Math.round(random(100,250));
    bird.lifetime = 100;   
    
    bg.add(bird);
     }
}

function createMushrooms(){
  var mushroom = createSprite(60,340,10,10);
  mushroom.addImage(mushroomImg);
  mushroom.scale = 0.1;  
  mushroom.x = mario.x;
  mushroom.y = mario.y;
  mushroom.velocityX = 3;
  mushroom.lifetime = 150;
  mGroup.add(mushroom)
  
}

function reset()
{
  gameState = PLAY;
  mario.x = 60;
  mario.y = 290;
  
  score = 0;
}