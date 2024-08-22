import Phaser from "phaser";
import constants from "../../constants";
import Actor from "../Actor";
import PlayerStateController from "../PlayerStateController";

export default class Player extends Actor {
    public stateController: PlayerStateController;
    public velocity: { x: number; y: number };
    public direction: "left" | "right" = "right";
    public frameName: string;

    //private particlesEmitter!: Phaser.GameObjects.Particles.ParticleEmitter
    private deathSprite?: Phaser.Physics.Matter.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number, frameName: string) {
        super(scene, x, y, "player");

        this.frameName = frameName;

        this.velocity = {
            x: 12,
            y: -18,
        };

        this.setScale(1);

        this.setRectangle(150, 100, {
            chamfer: { radius: 50 },
            label: "player",
        });

        this.setOrigin(0.5, 0.5);

        scene.matter.body.setInertia(
            <MatterJS.BodyType>this.body,
            Number.POSITIVE_INFINITY
        );

        this.setBounce(1);
        this.setFriction(0, 0, 0);

        this.addParticles();

        this.stateController = new PlayerStateController(this);
    }

    public jump() {
        this.stateController.setState("jump");
        this.scene.time.delayedCall(200, () => {
            this.stateController.setState("idle");
        });

        //this.particlesEmitter.start()
        this.scene.time.delayedCall(400, () => {
            //this.particlesEmitter.stop()
        });

        this.setVelocity(this.velocity.x, this.velocity.y);

        return this;
    }

    public flip() {
        this.direction = this.direction === "left" ? "right" : "left";

        this.velocity.x =
            Math.sign(this.velocity.x) === -1
                ? Math.abs(this.velocity.x)
                : Math.abs(this.velocity.x) * -1;

        this.setFlipX(!this.flipX);

        return this;
    }

    public addVelocity(x: number, y = 0) {
        this.velocity.x =
            Math.sign(this.velocity.x) === -1
                ? (Math.abs(this.velocity.x) + x) * -1
                : this.velocity.x + x;

        this.velocity.y =
            Math.sign(this.velocity.y) === -1
                ? (Math.abs(this.velocity.y) + y) * -1
                : this.velocity.y + y;

        return this;
    }

    public spawn() {
        this.setVisible(true);
        this.setCollisionCategory(Number(true));

        this.velocity.x = Math.abs(this.velocity.x);
        this.resetFlip();
        this.setVelocity(0, 0);

        this.setPosition(constants.WIDTH / 2, constants.HEIGHT / 2);

        this.data.values.score = 0;

        this.deathSprite?.destroy();
    }

    public death() {
        this.setVisible(false);
        this.setActive(false);
        this.setCollisionCategory(Number(false));
        //this.particlesEmitter.remove()

        this.addDeathSprite();
    }

    public changeSkin(newSkin: string) {
        this.frameName = "newSkin";
        //this.particlesEmitter.setFrame('particle_' + newSkin.slice(0, -1))
    }

    private addDeathSprite() {
        this.deathSprite = this.scene.matter.add.sprite(
            this.x,
            this.y,
            "fish_death"
        );

        this.deathSprite.setBounce(1);
        this.deathSprite.setFriction(0, 0, 0);
        this.deathSprite.setVelocity(-this.velocity.x / 2);

        this.scene.tweens.add({
            targets: this.deathSprite,
            duration: 1000,
            angle: 360,
            repeat: -1,
        });
    }

    private addParticles() {
        // const particles = this.scene.add.particles(
        //     "particle",
        //     "particle_" + this.frameName.slice(0, -1)
        // );
        // this.particlesEmitter = particles.createEmitter({
        //   x: this.x,
        //   y: this.y,
        //   lifespan: 400,
        //   scale: { start: 0.7, end: 0.2 },
        //   frequency: 90,
        //   follow: this,
        // })
    }
}

