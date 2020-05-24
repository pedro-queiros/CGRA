class MyUnitCubeQuad extends CGFobject {

	constructor(scene) {
		super(scene);
        this.quad = new MyQuad(this.scene);
        this.initMaterials(scene);
        this.state=SupplyStates.INACTIVE;
    }
    initMaterials(scene){
        //left material
        this.texture = new CGFappearance(scene);
        this.texture.setAmbient(0.9, 0.9, 0.9, 1);
        this.texture.setDiffuse(0.0, 0.0, 0.0, 1);
        this.texture.setSpecular(0.0, 0.0, 0.0, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/metalBox.jpg');
        this.texture.setTextureWrap('REPEAT', 'REPEAT');
    }
	display(state) {
        this.scene.pushMatrix();
        
        this.texture.apply();

        if(state == SupplyStates.LANDED){
            this.scene.pushMatrix();
            this.scene.translate(0,-0.5,1);
            this.scene.rotate(Math.PI/2,1,0,0);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0,-0.5,-1);
            this.scene.rotate(Math.PI/2,1,0,0);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-1,-0.5,0);
            this.scene.rotate(Math.PI/2,1,0,0);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(1,-0.5,0);
            this.scene.rotate(Math.PI/2,1,0,0);
            this.quad.display();
            this.scene.popMatrix();


            this.scene.pushMatrix();
            this.scene.translate(0, -0.5, 0);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.quad.display();
            this.scene.popMatrix();
        }
        else{         
            // Front
            this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.quad.display();
            this.scene.popMatrix();

            // Back
            this.scene.pushMatrix();
            this.scene.translate(0, 0, -0.5);
            this.quad.display();
            this.scene.popMatrix();

            // Right
            this.scene.pushMatrix();
            this.scene.translate(0.5, 0, 0);
            this.scene.rotate(-Math.PI / 2, 0, 1, 0);
            this.quad.display();
            this.scene.popMatrix();

            // Left
            this.scene.pushMatrix();
            this.scene.translate(-0.5, 0, 0);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.quad.display();
            this.scene.popMatrix();

            // Top
            this.scene.pushMatrix();
            this.scene.translate(0, 0.5, 0);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.quad.display();
            this.scene.popMatrix();

            // Bottom
            this.scene.pushMatrix();
            this.scene.translate(0, -0.5, 0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.quad.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
        
    }
}