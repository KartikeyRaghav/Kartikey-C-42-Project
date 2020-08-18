// Creating the different variables
var bubbles, player, bullets;
var playerImg, playerAnim;
var score;
var hue, gamefont;



// Loading the images, font and animation
function preload() {
    gamefont = loadFont('font2.ttf');
    let link = 'https://raw.githubusercontent.com/molleindustria/p5.play/master/examples/assets/';
    playerImg = loadImage(link + 'asteroids_ship0001.png');
    playerAnim = loadAnimation(link + 'asteroids_ship0002.png', link + 'asteroids_ship0003.png', link + 'asteroids_ship0004.png', link + 'asteroids_ship0005.png', link + 'asteroids_ship0006.png', link + 'asteroids_ship0007.png');
}



// Calling the dunction setup
function setup() {

    // Creating the canvas
    createCanvas(700, 700);

    // Making bubbles and bullets a group
    bubbles = createGroup();
    bullets = createGroup();

    // Creating the player
    player = new Player(width / 2, height / 2);

    // Calling the function create bubbles
    createBubbles();

    // Making the score and the hue as 0
    score = 0;
    hue = 0;
}



// Main part of the code calles
function draw() {

    // Colouting the background black
    background(0);

    // Increasing the hue by 1
    hue++;

    // Updating the player
    player.update();

    // Boucing the player off the bubbles
    player.sprite.bounceOff(bubbles);

    // updating the bubbles
    Bubble.update();

    // Drawing the sprites
    drawSprites();

    // Displaying the controls
    textSize(15);
    textFont(gamefont);
    fill(255);
    text("Score: " + floor(score), 10, 22);
    text("Controls: w + a + d", width - 200, 22);
    text("Space to shoot", width - 160, 52);

    // Making the hue 0 if it is more than 360
    if (hue > 360){
        hue = 0;
    }

    // Creating the bubbles if the score is a multiple of 0 and is not 0
    if (score % 10 == 0 && score != 0) {
        createBubbles();

        // Increasing the score by 0.5
        score += .5;
    }
}



// Calling the function keyPressed
function keyPressed() {

    // Creating bullets if the space key is pressed
    if (keyCode == 32) {
        bullets.add(createBullet(player.sprite.position.x, player.sprite.position.y))
        return false;
    }
}



// Defining the function create bullets
function createBullet(x, y) {

    // Creating the sprite
    let s = createSprite(x, y, 10, 10);

    // Displaying a rectangle as a bullet
    s.draw = () => {
        push();
        colorMode(HSB);
        stroke(hue, 100, 100);
        noFill();
        rect(0, 0, s.width, s.height);
        pop();
    }

    // Making the rotation of the sprite as the player's rotation + 90
    s.rotation = player.sprite.rotation + 90;

    // Setting the speed of the sprite
    s.setSpeed(player.sprite.getSpeed() + 10, player.sprite.rotation);

    // Defining the lifetime
    s.life = 75;
    return s;
}



// Definig the function of creating bubbles
function createBubbles() {

    // Creating the bubbles as circles continuously
    for (let i = 0; i < 10; i++) {
        let bubble = new Bubble(random(width), random(height));
        bubble.sprite.setCollider("circle", 0, 0, 20);

        // Adding the bubble to the group of the bubbles
        bubbles.add(bubble.sprite);
    }
}