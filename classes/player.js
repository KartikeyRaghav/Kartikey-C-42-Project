// Creating a player class
class Player {
    constructor(x, y) {

        // Creating the sprite
        this.sprite = createSprite(x, y, 50, 50);

        // Setting the sprite's friction
        this.sprite.friction = 0.1;

        // Adding the image and the animation
        this.sprite.addImage('normal', playerImg);
        this.sprite.addAnimation('thrust', playerAnim);

        // Setting the collider
        this.sprite.setCollider("circle");
    }

    // Defining the update function
    update() {

        // Rotaing the sprite when different keys are pressed
        if (keyDown('a'))
            this.sprite.rotation -= 4;
        else if (keyDown('d'))
            this.sprite.rotation += 4;
        if (keyDown('w')) {
            this.sprite.addSpeed(.9, this.sprite.rotation);
            this.sprite.changeAnimation('thrust');
        } else this.sprite.changeAnimation('normal');

        // Limiting the speed of the sprite
        this.sprite.limitSpeed(10);

        // Chaanging the sprite position if it is out of the play area
        if (this.sprite.position.x < -80)
            this.sprite.position.x = width + 80;
        if (this.sprite.position.x > width + 80)
            this.sprite.position.x = -80;
        if (this.sprite.position.y < -80)
            this.sprite.position.y = height + 80;
        if (this.sprite.position.y > height + 80)
            this.sprite.position.y = -80;
    }
}