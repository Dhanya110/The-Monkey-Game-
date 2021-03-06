var PLAY = 0;
var END = 1;
var gameState=0;
var monkey,banana,obstacle;
var monkeyImage,bananaImage,obstacleImage;
var bananasGroup,obstaclesGroup;
var background, backgroundImage,ground;
var score=0;
var gamer=0;

function preload(){
backgroundImage=loadImage("jungle.jpg");
monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImage=loadImage("banana.png"); 
obstacleImage=loadImage("stone.png"); 

}

function setup() {

  createCanvas(800,400);
 
  
  //creating background 
  background=createSprite(0,0,800,400);
  background.addImage("abc",backgroundImage);
  background.scale=1.5
  background.velocityX=-2;
  
  //creating ground
  ground = createSprite(0,360,800,2);
  ground.velocityX=-2;
  ground.visible=true;
  
  //creating monkey/player
  monkey=createSprite(100,360,10,10);
  monkey.addAnimation("abc",monkey_running);
  monkey.setCollider("rectangle",0,0,180,560);
  monkey.scale=0.15;
  monkey.collide(ground);
  
  //Group names
 obstaclesGroup = new Group();
 bananaGroup = new Group();
  
}

function draw() {

    if (gameState===PLAY){
        bananas();
        obstacles();
     
      
         // ground movement
        if (ground.x < 0){
            ground.x = ground.width/2;
       }
     
         // background movement
       if (background.x < 200){
           background.x=background.width/2;
       }
     
        // monkey touch banana
       if (bananaGroup.isTouching(monkey)){
           bananaGroup.destroyEach();
           score= score+2;
           switch(score){
             case 10: monkey.scale=0.12;
               break;
             case 20: monkey.scale=0.14;
               break;
             case 30: monkey.scale=0.16;
               break;
             case 40: monkey.scale=0.18;
               break;
               default: break; 
             }
       }
      
       // monkey touch obstacle 
       if (obstaclesGroup.isTouching(monkey)){
           monkey.scale=0.1;
           obstaclesGroup.destroyEach();
           gamer=gamer+1;
       }
     
        // monkey jump
        if (keyDown("space") && monkey.y>=262){
            monkey.velocityY = -17;
       }
         monkey.velocityY = monkey.velocityY + 0.8
         monkey.collide(ground);
       
    
      //Transfer to end state
      if ( gamer===2){
        gameState=1;
        gameState=END;
     }
      drawSprites();
      
      // display of score
      fill ("white");
      textSize(20);
      text("Score:"+score,600,50);
        
}
 else if (gameState === END) {
   textSize(30)
   fill("White")
   text("GAME OVER",250,230); 
  monkey.visible=false;
  monkey.velocityX=0;
   monkey.velocityY=0;
   background.velocityX=0;
   ground.velocityX=0;
  obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
     
  
}
    
   
}

function bananas() {
  //write code here to spawn the bananas
   if (frameCount % 80 === 0) {
     banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
   bananaGroup.add(banana);
   }
        
   }

function obstacles() {
  if (frameCount % 100 === 0){
   var obstacle = createSprite(400,330,10,40);
    obstacle.addImage("abc",obstacleImage);
    obstacle.scale=0.12
   obstacle.velocityX = -6;
   
  //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 200;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
 //adjust the depth
  obstacle.depth = ground.depth;
  ground.depth =ground.depth + 1;
    
 }
}






