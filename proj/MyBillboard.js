/**
 * MyBillBoard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject {
	constructor(scene) {
		super(scene);
        this.board= new MyPlane(this.scene,60);
		this.supportR = new MyPlane(this.scene,60);
		this.supportL = new MyPlane(this.scene,60);
		this.bar = new MyPlane(this.scene,60);
        this.shader=new CGFshader(this.scene.gl, "shaders/billboard.vert", "shaders/billboard.frag");
        this.texture=new CGFappearance(this.scene);
		this.texture.setAmbient(0.9, 0.9, 0.9, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
		this.texture.setShininess(10.0);
        this.texture.loadTexture('images/billboard.png');
        this.texture.setTextureWrap('REPEAT', 'REPEAT');
		this.defaultTexture=new CGFappearance(this.scene);
		this.defaultTexture.setAmbient(0.9, 0.9, 0.9, 1);
        this.defaultTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.defaultTexture.setSpecular(0.1, 0.1, 0.1, 1);
		this.defaultTexture.setShininess(10.0);
        this.shader.setUniformsValues({ suppliesDelivered: 0 });
    }
    update(){
        this.shader.setUniformsValues({ suppliesDelivered: this.scene.supplyNumber });
    }
    reset(){
        this.shader.setUniformsValues({ suppliesDelivered: 0 });
    }
    display(){
		//this.scene.initLights();
		this.defaultTexture.apply();
		//right support
		this.scene.pushMatrix();
		this.scene.translate(1.9,1.5,0);
		this.scene.scale(0.2,1,0);
		this.supportR.display();
		this.scene.popMatrix();
		
		//left support
		this.scene.pushMatrix();
		this.scene.translate(0.1,1.5,0);
		this.scene.scale(0.2,1,0);
		this.supportL.display();
		this.scene.popMatrix();
		
		//board
        this.scene.pushMatrix();
		this.scene.translate(1,2.5,0);
		this.scene.scale(2,1,0);
		this.texture.apply();
        this.board.display();
        this.scene.popMatrix();
		
		//progress bar
		this.scene.pushMatrix();
		this.scene.translate(1,2.3,0.01);
		this.scene.scale(1.5,0.2,0);
		this.scene.setActiveShader(this.shader);
		this.bar.display();
		this.scene.popMatrix();
		this.scene.setActiveShader(this.scene.defaultShader);
		this.scene.setDefaultAppearance();
                
    }
}