class Snake {
  constructor(scene) {
    this.scene = scene;
    this.cuerpo = [];
    this.dir = "izquierda";
    this.timmer = 0;
    this.oldDir = "derecha";
    //Genera cuerpo
    for (let i = 0; i < 3; i++) {
      this.cuerpo.push(
        this.scene.physics.add.image(100 + i * 10, 100, "cuerpo").setOrigin(0)
      );
    }
    //Genera colisiones
    for (let i = 1; i < 10; i++) {
      this.scene.physics.add.collider(this.cuerpo[0], this.cuerpo[i], () =>
        this.choca()
      );
    }
  }
  crece() {
    const obj = this.cuerpo[this.cuerpo.length - 1];
    const newObj = this.scene.physics.add
      .image(obj.x, obj.y, "cuerpo")
      .setOrigin(0);
    this.cuerpo.push(newObj);
    this.scene.physics.add.collider(this.cuerpo[0], newObj, () => this.choca());
  }
  choca() {
    this.scene.scene.start("Gameover");
  }
  changeMov(dir) {
    if (this.oldDir != dir) {
      this.dir = dir;
    }
  }
  update(time) {
    if (time > this.timmer) {
      for (let i = this.cuerpo.length - 1; i > 0; i--) {
        this.cuerpo[i].x = this.cuerpo[i - 1].x;
        this.cuerpo[i].y = this.cuerpo[i - 1].y;

        this.cuerpo[this.cuerpo.length - 1 - i].x = Phaser.Math.Wrap(
          this.cuerpo[this.cuerpo.length - 1 - i].x,
          0,
          this.scene.sys.game.config.width
        );
        this.cuerpo[this.cuerpo.length - 1 - i].y = Phaser.Math.Wrap(
          this.cuerpo[this.cuerpo.length - 1 - i].y,
          20,
          this.scene.sys.game.config.height
        );
      }
      switch (this.dir) {
        case "derecha":
          this.cuerpo[0].x += 10;
          this.oldDir = "izquierda";
          break;
        case "izquierda":
          this.cuerpo[0].x -= 10;
          this.oldDir = "derecha";
          break;
        case "arriba":
          this.cuerpo[0].y -= 10;
          this.oldDir = "abajo";
          break;
        case "abajo":
          this.cuerpo[0].y += 10;
          this.oldDir = "arriba";
          break;
      }
      this.timmer = time + 150;
    }
  }
}

export default Snake;
