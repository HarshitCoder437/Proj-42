var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey, monkey_running;
var banana, bananaImage;
var stone, obstacleImage;
var ground;
var foodGroup, obstacleGroup;
var survivalTime = 0;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {

  createCanvas(600, 450);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  foodGroup = createGroup();
  obstacleGroup = createGroup();

  score = 0;

}


function draw() {

  background("white");

  if (keyDown("space") && monkey.y > 100) {
    monkey.velocityY = -12;

  }

  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);

  if (ground.x > 0) {
    ground.x = 450;

  }

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);

  stroke("black");
  textSize(20);
  fill("black");

  if (gameState === PLAY) {
      survivalTime = Math.ceil(frameCount / frameRate());
      text("Survival Time: " + survivalTime, 100, 50);
    if (foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach()
    }
    if (obstacleGroup.isTouching(monkey)) {
      obstacleGroup.destroyEach();
      foodGroup.destroyEach();
      monkey.velocityX = 0;
      ground.velocityX = 0;
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
      survivalTime = 0;
      gameState = END;
    }
  }
  
  if (gameState === END) {
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: " + score, 500, 50);

    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount / frameRate());
    text("Survival Time: " + survivalTime, 100, 50);
    gameState = PLAY;
  }

  spawnObstacles();
  spawnBananas();
  drawSprites();
}

function spawnBananas() {
  if (frameCount % 150 === 0) {
    banana = createSprite(600, 150, 20, 20);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.velocityX = -2;
    banana.scale = 0.1;
    banana.lifetime = 600;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 370 === 0) {
    stone = createSprite(600, 320);
    stone.addImage(obstacleImage);
    stone.velocityX = -2;
    stone.scale = 0.15;
    stone.lifetime = 600;
    obstacleGroup.add(stone);
  }
}