import Snake from "../gameobjects/Snake.js";
import Comida from "../gameobjects/Comida.js";

class Play extends Phaser.Scene {
  constructor() {
    super("Play");
  }

  preload() {
    console.log("Escena play");
    this.snake = new Snake(this);
    this.comida = new Comida(this);
  }
  create() {
    // this.add.dynamicBitmapText(10, 10, "pixel", "PUNTOS", 8);
    this.scene.launch("UI");
    const sceneUI = this.scene.get("UI");

    // this.cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on("keydown-RIGHT", () => {
      this.snake.changeMov("derecha");
    });
    this.input.keyboard.on("keydown-LEFT", () => {
      this.snake.changeMov("izquierda");
    });
    this.input.keyboard.on("keydown-UP", () => {
      this.snake.changeMov("arriba");
    });
    this.input.keyboard.on("keydown-DOWN", () => {
      this.snake.changeMov("abajo");
    });

    //Colision de cabeza con comida

    this.physics.add.collider(this.snake.cuerpo[0], this.comida.comida, () => {
      this.comida.crearComida();
      this.snake.crece();
      sceneUI.addPoint();
    });
  }
  update(time) {
    this.snake.update(time);

    // if (this.cursors.right.isDown) {
    //   this.snake.changeMov("derecha");
    // }
    // if (this.cursors.left.isDown) {
    //   this.snake.changeMov("izquierda");
    // }
    // if (this.cursors.up.isDown) {
    //   this.snake.changeMov("arriba");
    // }
    // if (this.cursors.down.isDown) {
    //   this.snake.changeMov("abajo");
    // }
  }
}

export default Play;
