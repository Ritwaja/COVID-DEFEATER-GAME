var bg,bgimg;
var harry,harryimg;
var covid,covidimg,covidgroup;
var ground;
var masks,masksimg,masksgroup;
var sanitizer,sanitizerimg,sanitizergroup;
var score=0;
var lifeCount=3;
var gameState="intro";
var introimage, gameover,home;
var harryjumpsound;
var touchcovidsound,touchmaskssound;
var gamewonsound,gamelostsound;
var gamesound;


function preload(){
bgimg=loadImage("bg.jpg");
harryimg=loadAnimation("Harry.gif");
covidimg=loadAnimation("covid.gif");
masksimg=loadAnimation("Masks.gif");
sanitizerimg=loadAnimation("sanitizer.gif");
introimage=loadImage("intro.png");
gameover=loadImage("gameover.webp");
home=loadImage("home.jpg");
harryjumpsound=loadSound("harryjump.wav");
touchcovidsound=loadSound("touchcovid.wav");
touchmaskssound=loadSound("touchmasks.mp3");
gamewonsound=loadSound("gamewon.wav");
gamelostsound=loadSound("gamelost.mp3");
gamesound=loadSound("gamesound.mp3");
}

function setup(){
  gamesound.loop()
  createCanvas(windowWidth,windowHeight);
  

  bg=createSprite(650,400);
  bg.addImage(bgimg);
  bg.scale=5;
  bg.velocityX=-4;

  harry=createSprite(200,windowHeight-200,40,50);
  harry.addAnimation("running",harryimg);
  harry.scale=0.6;
  harry.setCollider("circle",0,0,40);

  ground=createSprite(200,windowHeight-100,windowWidth,10);
  ground.visible=false;

  covidgroup=new Group();
  masksgroup=new Group();
  sanitizergroup=new Group();
}

function draw(){

  if(gameState==="intro"){
    background(introimage);
    textSize(60);
    fill("red");
    text("COVID DEFEATER",400,200);
    textSize(40);
    text("Press Enter To Start The Game",370,350);
    text("Press Space To Jump",450,400);
    text("You Will Lose Lifecount If You Touch Covid-19",300,450);
    text("You Will Gain Points If You Collect Masks And Sanitizers",250,500);
    text("You Will Win The Game After Gaining 100 Points",300,550);
    


  }

  if(keyDown("enter")&& gameState==="intro"){
    gameState="play"
    background(0);
  }


  if(gameState==="play"){
    

  
  if(bg.x<530){
    bg.x=windowWidth/2+100;
  }

  if(keyDown("space")){
    harry.velocityY=-13;
    harryjumpsound.play();
  }

  harry.velocityY=harry.velocityY+0.8;

  harry.collide(ground)

  spawncovid();
  spawnmasks();
  spawnsanitizer();

  if(covidgroup.isTouching(harry)){
    touchcovidsound.play();
    lifeCount=lifeCount-1;
    covidgroup.destroyEach();
    if(lifeCount===0){
      gameState="end"
    }
  }

  if(masksgroup.isTouching(harry)){
    touchmaskssound.play();
    score=score+1;
    masksgroup.destroyEach();
    if(score===100){
      gameState="win"
    }
  }

  if(sanitizergroup.isTouching(harry)){
    touchmaskssound.play();
    score=score+5;
    sanitizergroup.destroyEach();
    if(score===100){
      gameState="win"
    }
  }
  drawSprites();

  textSize(30);
  fill("black");
  text("Score: "+score,50,50);
  text("LifeCount: "+lifeCount,50,100);
}

if(gameState==="win"){
  gamewonsound.play();
  background(home);
  textSize(50);
  fill("black");
  text("YOU HAVE REACHED HOME SAFELY",300,500);

}

if(gameState==="end"){
  gamelostsound.play();
  background(gameover);
}

}

function spawncovid(){
  if(frameCount%300===0){
    covid=createSprite(windowWidth+30,Math.round(random(windowHeight-200,windowHeight-100)));
    covid.addAnimation("moving",covidimg);
    covid.scale=0.3;
    covid.velocityX=-5;
    covid.lifetime=600;
    covidgroup.add(covid);
  }

  
}
function spawnmasks(){
  if(frameCount%400===0){
    masks=createSprite(windowWidth+10,Math.round(random(windowHeight-450,windowHeight-600)));
    masks.addAnimation("wear",masksimg);
    masks.scale=0.3;
    masks.velocityX=-6;
    masks.lifetime=600;
    masksgroup.add(masks);

  }
}
function spawnsanitizer(){
  if(frameCount%1500===0){
    sanitizer=createSprite(windowWidth+60,Math.round(random(windowHeight-300,windowHeight-600)));
    sanitizer.addAnimation("use",sanitizerimg);
    sanitizer.scale=0.3;
    sanitizer.velocityX=-6;
    sanitizer.lifetime=600;
    sanitizergroup.add(sanitizer);
}

}