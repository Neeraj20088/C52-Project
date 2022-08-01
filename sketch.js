var player, playerImg;

var triangle, triangleImg;

var bullet, bulletImg;

var triangleG, bulletG;

var rectangle, rectangleImg;

var gameState = 1
var life = 3
var score = 0

function preload(){
    playerImg = loadImage("player.png");
    bulletImg = loadImage("bullet.png");
    triangleImg = loadImage("triangle.png");
    backgroundImg = loadImage("backgroundImg.webp");
    rectangleImg = loadImage("rectangle.png");
}

function setup() {
    createCanvas(windowWidth -25,windowHeight -25);

    player = createSprite(200,550,50,50)
    player.addImage(playerImg)
    player.scale = 0.5
   
    rectangle = createSprite(750,750,1700,200)
    rectangle.visible = 0


    triangleG = new Group();
    bulletG = new Group();

    heading= createElement("h1");
    scoreboard= createElement("h1");
    gameover = createElement("h1")
}

function draw() {

    createEdgeSprites();

  background(backgroundImg);
  

  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

    drawSprites();

    if(gameState === 1){

        player.x = World.mouseX;

        if(frameCount % 80 === 0){
            drawTriangle();

        }

        if(keyDown("space")){

            shootBullet();
        }

        if(triangleG.collide(rectangle)){

            handlegameOver();

        }

        if(triangleG.collide(bulletG)){

            handleBulletCollision();


        }



    }

    // if(gameState === 2){

       // life = life - 1

      //  Text("Game Over!")


    // }
   
}

function drawTriangle(){

    triangle = createSprite(random(20,1500),0,50,50)
    triangle.addImage(triangleImg)
    triangle.scale = 0.2
    triangle.velocityY = score*1.3 + 1
    triangle.lifetime = 600
    triangleG.add(triangle);
    triangle.setCollider("rectangle", -150, -110, 150, 150, 0);
    triangle.debug = false

}

function shootBullet(){

    bullet = createSprite(195,590,50,50)
    bullet.addImage(bulletImg)
    bullet.x = player.x 
    bullet.velocityY = -8
    bulletG.add(bullet)
    bullet.setCollider("rectangle", -70, -110, 30, 30, 0);
    bullet.debug = false
}


function handleBulletCollision(){

    if( life > 0){

        score = score + 1

        
    }

    

    bulletG.destroyEach();
    triangleG.destroyEach();

}


function handlegameOver(){

    life = life - 1;

    triangleG.destroyEach();

    if(life === 0){


        gameState =2;

        gameover.html("Game Over! You Earned: " + score + " Points");
        gameover.position(600,300);
        


    }

}

