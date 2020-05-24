class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.quad = new MyQuad(this.scene);
		this.quad.initBuffers();
		this.initBuffers();
		this.initMaterials(scene);
	}

	initMaterials(scene){

		this.top = new CGFappearance(scene);
        this.top.setAmbient(0.9, 0.9, 0.9, 1);
        this.top.setDiffuse(0.0, 0.0, 0.0, 1);
        this.top.setSpecular(0.0, 0.0, 0.0, 1);
        this.top.setShininess(10.0);
        this.top.loadTexture('images/split_cubemap/top.png');
        this.top.setTextureWrap('REPEAT', 'REPEAT');

        this.bottom = new CGFappearance(scene);
        this.bottom.setAmbient(0.9, 0.9, 0.9, 1);
        this.bottom.setDiffuse(0.0, 0.0, 0.0, 1);
        this.bottom.setSpecular(0.0, 0.0, 0.0, 1);
        this.bottom.setShininess(10.0);
        this.bottom.loadTexture('images/split_cubemap/bottom.png');
        this.bottom.setTextureWrap('REPEAT', 'REPEAT');

        this.back = new CGFappearance(scene);
        this.back.setAmbient(0.9, 0.9, 0.9, 1);
        this.back.setDiffuse(0.0, 0.0, 0.0, 1);
        this.back.setSpecular(0.0, 0.0, 0.0, 1);
        this.back.setShininess(10.0);
        this.back.loadTexture('images/split_cubemap/back.png');
        this.back.setTextureWrap('REPEAT', 'REPEAT');

        this.front = new CGFappearance(scene);
        this.front.setAmbient(0.9, 0.9, 0.9, 1);
        this.front.setDiffuse(0.0, 0.0, 0.0, 1);
        this.front.setSpecular(0.0, 0.0, 0.0, 1);
        this.front.setShininess(10.0);
        this.front.loadTexture('images/split_cubemap/front.png');
        this.front.setTextureWrap('REPEAT', 'REPEAT');

        this.left = new CGFappearance(scene);
        this.left.setAmbient(0.9, 0.9, 0.9, 1);
        this.left.setDiffuse(0.0, 0.0, 0.0, 1);
        this.left.setSpecular(0.0, 0.0, 0.0, 1);
        this.left.setShininess(10.0);
        this.left.loadTexture('images/split_cubemap/left.png');
        this.left.setTextureWrap('REPEAT', 'REPEAT');

        this.right = new CGFappearance(scene);
        this.right.setAmbient(0.9, 0.9, 0.9, 1);
        this.right.setDiffuse(0.0, 0.0, 0.0, 1);
        this.right.setSpecular(0.0, 0.0, 0.0, 1);
        this.right.setShininess(10.0);
        this.right.loadTexture('images/split_cubemap/right.png');
        this.right.setTextureWrap('REPEAT', 'REPEAT');


        this.customTop = new CGFappearance(scene);
        this.customTop.setAmbient(0.9, 0.9, 0.9, 1);
        this.customTop.setDiffuse(0.0, 0.0, 0.0, 1);
        this.customTop.setSpecular(0.0, 0.0, 0.0, 1);
        this.customTop.setShininess(10.0);
        this.customTop.loadTexture('images/split_cubemap2/top.png');
        this.customTop.setTextureWrap('REPEAT', 'REPEAT');

        this.customBottom = new CGFappearance(scene);
        this.customBottom.setAmbient(0.9, 0.9, 0.9, 1);
        this.customBottom.setDiffuse(0.0, 0.0, 0.0, 1);
        this.customBottom.setSpecular(0.0, 0.0, 0.0, 1);
        this.customBottom.setShininess(10.0);
        this.customBottom.loadTexture('images/split_cubemap2/bottom.png');
        this.customBottom.setTextureWrap('REPEAT', 'REPEAT');

        this.customBack = new CGFappearance(scene);
        this.customBack.setAmbient(0.9, 0.9, 0.9, 1);
        this.customBack.setDiffuse(0.0, 0.0, 0.0, 1);
        this.customBack.setSpecular(0.0, 0.0, 0.0, 1);
        this.customBack.setShininess(10.0);
        this.customBack.loadTexture('images/split_cubemap2/back.png');
        this.customBack.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.customFront = new CGFappearance(scene);
        this.customFront.setAmbient(0.9, 0.9, 0.9, 1);
        this.customFront.setDiffuse(0.0, 0.0, 0.0, 1);
        this.customFront.setSpecular(0.0, 0.0, 0.0, 1);
        this.customFront.setShininess(10.0);
        this.customFront.loadTexture('images/split_cubemap2/front.png');
        this.customFront.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.customLeft = new CGFappearance(scene);
        this.customLeft.setAmbient(0.9, 0.9, 0.9, 1);
        this.customLeft.setDiffuse(0.0, 0.0, 0.0, 1);
        this.customLeft.setSpecular(0.0, 0.0, 0.0, 1);
        this.customLeft.setShininess(10.0);
        this.customLeft.loadTexture('images/split_cubemap2/left.png');
        this.customLeft.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.customRight = new CGFappearance(scene);
        this.customRight.setAmbient(0.9, 0.9, 0.9, 1);
        this.customRight.setDiffuse(0.0, 0.0, 0.0, 1);
        this.customRight.setSpecular(0.0, 0.0, 0.0, 1);
        this.customRight.setShininess(10.0);
        this.customRight.loadTexture('images/split_cubemap2/right.png');
        this.customRight.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	}

	display(){
		this.scene.pushMatrix();
		this.scene.scale(50,50,50);
		this.scene.translate(0,0.49,0);
		this.scene.pushMatrix();
		this.scene.translate(0,0,-0.5);
		this.scene.rotate(Math.PI,0,1,0);
		if(this.scene.selectedTexture == 0)
			this.customBack.apply();
		else
			this.back.apply();
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.5,0,0);
		this.scene.rotate(-(Math.PI)/2,0,1,0);
		if(this.scene.selectedTexture == 0)
			this.customLeft.apply();
		else
			this.left.apply();
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.scene.rotate(-(Math.PI)/2,1,0,0);
		if(this.scene.selectedTexture == 0)
			this.customTop.apply();
		else
			this.top.apply();
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,-0.5,0);
		this.scene.rotate((Math.PI)/2,1,0,0);
		if(this.scene.selectedTexture == 0)
			this.customBottom.apply();
		else
			this.bottom.apply();
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.5,0,0);
		this.scene.rotate((Math.PI)/2,0,1,0);
		if(this.scene.selectedTexture == 0)
			this.customRight.apply();
		else
			this.right.apply();
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		if(this.scene.selectedTexture == 0)
			this.customFront.apply();
		else
			this.front.apply();
		this.quad.display();
		this.scene.popMatrix();
		this.scene.popMatrix();

	}

  	updateBuffers(complexity){
		this.initBuffers();
		this.initNormalVizBuffers();
	}
}