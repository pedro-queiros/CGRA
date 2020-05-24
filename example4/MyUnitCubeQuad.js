class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.quad = new MyQuad(this.scene);
		this.quad.initBuffers();
		this.initBuffers();
		this.initMaterials(scene);
	}

	initMaterials(scene){

		this.top = new CGFappearance(scene);
        this.top.setAmbient(0.1, 0.1, 0.1, 1);
        this.top.setDiffuse(0.9, 0.9, 0.9, 1);
        this.top.setSpecular(0.1, 0.1, 0.1, 1);
        this.top.setShininess(10.0);
        this.top.loadTexture('images/mineTop.png');
        this.top.setTextureWrap('REPEAT', 'REPEAT');

        this.bot = new CGFappearance(scene);
        this.bot.setAmbient(0.1, 0.1, 0.1, 1);
        this.bot.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bot.setSpecular(0.1, 0.1, 0.1, 1);
        this.bot.setShininess(10.0);
        this.bot.loadTexture('images/mineBottom.png');
        this.bot.setTextureWrap('REPEAT', 'REPEAT');

        this.side = new CGFappearance(scene);
        this.side.setAmbient(0.1, 0.1, 0.1, 1);
        this.side.setDiffuse(0.9, 0.9, 0.9, 1);
        this.side.setSpecular(0.1, 0.1, 0.1, 1);
        this.side.setShininess(10.0);
        this.side.loadTexture('images/mineSide.png');
        this.side.setTextureWrap('REPEAT', 'REPEAT');
	}

	display(){

		this.scene.pushMatrix();
		this.scene.translate(0,0,-0.5);
		this.scene.rotate(Math.PI,0,1,0);
		this.side.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.5,0,0);
		this.scene.rotate(-(Math.PI)/2,0,1,0);
		this.side.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.scene.rotate(-(Math.PI)/2,1,0,0);
		this.top.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,-0.5,0);
		this.scene.rotate((Math.PI)/2,1,0,0);
		this.bot.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.5,0,0);
		this.scene.rotate((Math.PI)/2,0,1,0);
		this.side.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.side.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

	}
}