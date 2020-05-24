class MyFlat extends CGFobject {
	constructor(scene) {
		super(scene);
		this.square = new MyDiamond(this.scene);
		this.square.initBuffers();
		this.triangle = new MyTriangle(this.scene);
		this.triangle.initBuffers();
		this.initBuffers();
	}

	display(){
		this.scene.pushMatrix();
        this.scene.translate(-1.5,-0.5,0);
        this.square.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.triangle.display();
        this.scene.popMatrix();
	}

}