// declaring the variables
var bg, bg_img, turtle,turtle_img;
var bag_img,bagGroup,bag;
var poster1_img;
var poster2_img;
var poster3_img;
var cocacola_img,cocacolaGroup,cocacola;
var score=0;
var play,play_img;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var die,die_img;
var gameState = "play"
var spawnMessage1Group,spawnMessage2Group;
var intro;
var diesound;

//loading all the images
function preload(){
  bg_img = loadImage("background.jpg");
  turtle_img = loadAnimation("t1.png","sprite_t50.png");
  bag_img = loadImage("plastic_bag.png");
  poster1_img = loadImage("poster1.jpeg");
  poster2_img = loadImage("poster2.jpeg");
  poster3_img = loadImage("Poster3.jpg");
  cocacola_img = loadImage("coca cola.png");
  play_img = loadImage("Play_button.jpg");
  die_img = loadImage("die1.jpg")
  diesound = loadSound("sound.mp3")
  
 
}

function setup(){
  var canvas = createCanvas(displayWidth,displayHeight)
  
  //creating the sprites and adding the images

  bg =  createSprite(600,500,1200,1000);
  bg.addImage("img",bg_img);
  bg.x = bg.width/2;

  turtle = createSprite(200,400,50,50);
  turtle.addAnimation("img",turtle_img);
  turtle.setCollider("circle",0,0,5)
  turtle.scale = 0.5;
  bg.scale = 1.0;
  bag_img.scale = 0.5;
  play = createSprite(1000,800,50,50);
  play.addImage("img",play_img);
  play.scale=0.5;
  play.visible = false;
  bagGroup =  new Group();
  cocacolaGroup = new Group();
  spawnMessage1Group = new Group();
  spawnMessage2Group = new Group();
  textSize(20);
  textFont("Georgia");
  textStyle(BOLD);
  fill("black");
  
  }

function draw(){

  background("white")

 
//Intro message of the game

  if(World.frameCount<200 ){
    bg.visible = false;
    turtle.visible = false;
    text("Welcome to Turtle Saver Game!", 200,200);
   text("control Turtle with your arrow keys",200,300);
    text("help the turtle from plastic trash ", 200,400);
    text("This game is to make the humanity aware that how plastic pollution in Ocean/SEA  is causing 1000 turtles to die each year !",50,500);
    
    
    
    } 
    
     // here the game starts

  if(gameState==="play" && World.frameCount>200 ){
  bg.visible = true;
  turtle.visible = true;
  bg.velocityX=-5;

if(keyDown(UP_ARROW)){
  move(0,-5);
 
}

if(keyDown(DOWN_ARROW)){
  move(0,5)

}

if(keyDown(LEFT_ARROW)){
  move(-5,0)
  
}

if(keyDown(RIGHT_ARROW)){
  move(7,0)
  
}
  if(bg.x<100){
    bg.x = bg.width/2;
  }
score=  Math.round(World.frameCount/80)

spawnbag();

spawncocacola();

if(turtle.x>displayWidth){
  turtle.x = 200;
}


if(turtle.isTouching(bagGroup)){ 

  diesound.play();
gameState = "end"
  
    console.log("working")
}
  } 

  else{
    
    if(gameState=== "end"){

      turtle.addImage("img", die_img)
      turtle.scale=1.75
      bagGroup.setVelocityYEach(0);
      bg.velocityX = 0;
      score=0;
      play.visible = true;
      spawnMessage1();
      //spawnMessage2();
      spawnMessage3();

    }

    }
  
    
  // activating the play button

  if(mousePressedOver(play)){
    play.visible = false;
    gameState = "play"
    bagGroup.destroyEach(0);
    turtle.addAnimation("img",turtle_img)
    turtle.scale = 0.5
    score = 0;
    spawnMessage1Group.destroyEach()
    spawnMessage2Group.destroyEach()

  }


  drawSprites();
  text("SCORE-"+score,50,50);
  }

//moving the turtle

function move(x,y){
  turtle.x = turtle.x+x;
  turtle.y = turtle.y+y;
}


// spawning the plastic trashes

function spawnbag(){
  if(World.frameCount%100===0){
    var rand =  Math.round(random(200,800))
  var bag = createSprite(rand,0,20,20);
  bag.addImage("img",bag_img);
  bag.velocityY = 5;
  bag.scale = 0.25;
  bagGroup.add(bag);
 
  }
  
}
  
//spawning the messages

function spawnMessage1(){
  if(World.frameCount%200===0){
  var message1 = createSprite(displayWidth,100,50,50);
  message1.addImage("img",poster1_img);
  message1.velocityX = -4;
  message1.scale = 0.75;
  message1.lifetime = 400;
  spawnMessage1Group.add(message1)
  
  }
}

function spawnMessage3(){
  if(World.frameCount%200===0){
  var message3 = createSprite(displayWidth,350,50,50);
  message3.addImage("img",poster3_img);
  message3.velocityX = -4;
  message3.scale = 0.75;
  message3.lifetime = 400;
  spawnMessage2Group.add(message3)
  
  }
}

function spawncocacola(){
  if(World.frameCount%200===0){
    var rand =  Math.round(random(600,1000))
  var cocacola = createSprite(0,rand,20,20);
  cocacola.addImage("img",cocacola_img);
  cocacola.velocityX= 5;
  cocacola.scale = 0.05;
  cocacolaGroup.add(cocacola);
  
  }
}

// creating the collision detection algorithm
function isTouching(){
  if(turtle.y-bag.y<turtle.height/2+bag.height/2
    && bag.y-turtle.y<turtle.height/2+bag.height/2
    && bag.x-turtle.x<turtle.width/2+ bag.width/2
    && turtle.x - bag.x<turtle.width/2 + bag.width/2){
   return true;
  }
  else {
    return false;
  }
  }

