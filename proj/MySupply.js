const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

class MySupply extends CGFobject {
	constructor(scene) {
		super(scene);
		this.quad = new MyQuad(this.scene);
		this.quad.initBuffers();
		this.initBuffers();
		this.initMaterials(this.scene);
		this.state=SupplyStates.INACTIVE;
		this.x = 0;
		this.y = 9;
		this.z = 0;
		this.time = 0;
		this.elapsedTime = 0;
	}

	initMaterials(scene){
        //left material
        this.texture = new CGFappearance(scene);
        this.texture.setAmbient(0.9, 0.9, 0.9, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
		this.texture.setShininess(10.0);
        this.texture.loadTexture('images/metalBox.jpg');
        this.texture.setTextureWrap('REPEAT', 'REPEAT');
    }

	drop(x,z){
		this.state = SupplyStates.FALLING;
		this.x = x;
		this.z = z;
	}

	land(){
		if(this.y <= 0.5){
			this.state = SupplyStates.LANDED;
			this.y = 0.55;
		}
	}

	update(t){
		if(this.state == SupplyStates.FALLING){
			if(this.time == 0)
                this.time = t;
            this.elapsedTime = t-this.time;
            this.time = t;
            this.y -= 9*this.elapsedTime/3000;
            this.land();
		}
	}

	reset(){
		this.x = 0;
		this.y = 9;
		this.z = 0;
		this.state = SupplyStates.INACTIVE;
		this.time = 0;
		this.elapsedTime = 0;
	}

	display(){
		if(this.state != SupplyStates.INACTIVE){
			this.scene.pushMatrix();
			this.texture.apply();
			this.scene.translate(this.x,this.y,this.z);
			if(this.state == SupplyStates.LANDED){
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
}