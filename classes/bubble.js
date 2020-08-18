// Creating the class Bubble
class Bubble {
    constructor(x, y) {

        // Creating the sprite
        this.sprite = createSprite(x, y, 50, 50);

        // Displaying a circle at the sprite position
        this.sprite.draw = () => {
            push();
            // Changing the color mode to HSB
            colorMode(HSB);
            fill(hue, 100, 100);
            ellipse(0, 0, this.sprite.width, this.sprite.height);
            pop();
        }

        // Setting the sped of the bubble
        this.sprite.setSpeed(random(2, 4), random(360));
    }

    // Creating a static function update
    static update() {

        // Bouncing the bubbles from the bubbles
        bubbles.bounce(bubbles);

        // removing the bullets and the bubbles if the bullet touches the bubble
        bullets.overlap(bubbles, (e, f) => {
            e.remove();
            f.remove();
            // Increasing the score by 1
            score++;
        });

        for (let i = bubbles.length; i > 0; i--) {
            let s = bubbles.get(i - 1);

            // Changing the position of the bubble if it is out of the play area
            if (s.x < -80)
                s.x = width + 80;
            if (s.x > width + 80)
                s.x = -80;
            if (s.y < -80)
                s.y = height + 80;
            if (s.y > height + 80)
                s.y = -80;
        }
    }
}