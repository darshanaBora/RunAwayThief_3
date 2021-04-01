const Engine = matter.Engine
const World = matter.world;
const Bodies = matter.Bodies;

var engine, world;
var thief,coin,policeman,invisibleGround,gameOver,restart,cityBackground;
var thiefImg,coinImg,policemanImg,gameOverImg,restartImg,backgroundImg;
var policemanGroup,coinsGroup;
var score,Coins;

function preload(){
  thiefImg = loadImage("thief.png");
  coinImg = loadImage("coin.png");
  policemanImg = loadImage("policeman.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  backgroundImg = loadImage("background.png");
}
function setup(){
  createCanvas(1000,600);

  engine = Engine.create();
  

  cityBackground = createSprite(0,90,10,10);
  cityBackground.addImage("background", backgroundImg);
  cityBackground.scale = 0.5;
  cityBackground.velocityX = -2;

  thief = createSprite(200, 500, 50, 50);
  thief.addImage("thief", thiefImg);
  thief.scale = 0.5;

  invisibleGround = createSprite(600,580,1200,20);
  invisibleGround.visible = false;
  
  restart = createSprite(500,400,20,20);
  restart.addImage("restart", restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  gameOver = createSprite(500,250,20,20);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale = 2;
  gameOver.visible = false;

  score = 0;
  Coins = 0;

  policemanGroup = new Group();
  coinsGroup = new Group();
}

function draw() {
  background("white");

  spawnPoliceman();
  spawnCoins();
  
  if(cityBackground.x < 0){
    cityBackground.x = width/2;
  }

  if(keyDown("SPACE")&& thief.y >= 100){
    thief.velocityY = -13;
  }

  /*if(thief.isTouching(coin)){
    coin.destroyEach();
    Coins = Coins+1;
  }*/

  if(thief.isTouching(policemanGroup)){
    cityBackground.velocityX = 0;
    policeman.velocityX = 0;
    coinsGroup.destroyEach();
    restart.visible = true;
    gameOver.visible = true;
  }

  thief.velocityY = thief.velocityY + 0.8

  thief.collide(invisibleGround);

  score = score + Math.round(frameCount/60);

  drawSprites();
  fill("Black"); 
  textSize(30);
  text("Score: "+ score, 700,100);
  fill("black");
  textSize(30);
  text("Coin: "+ Coins, 500,100)
}

function spawnPoliceman(){
  if(frameCount % 200 === 0) {
    policeman = createSprite(1000,470,40,10);
    policeman.X = Math.round(random(10,60));
    policeman.addImage(policemanImg);
    policeman.scale = 0.30;
    policeman.velocityX = -3;
  
    policeman.lifetime = 350;
   
    policeman.depth = thief.depth;
    thief.depth = thief.depth + 1;
    
    policemanGroup.add(policeman);
  }
}

function spawnCoins(){
  
}

