/**
* MyTerrain
* @constructor
*/
class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane = new MyPlane(this.scene,20);
        this.plane.initBuffers();
        
        this.shader=new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.texture=new CGFtexture(this.scene,'images/terrain1.jpg');
        this.texture2=new CGFtexture(this.scene,'images/newheightmap.jpg');
		this.shader.setUniformsValues({ uSampler2: 1 });
		
    }
	
	display() {
		
		this.scene.setActiveShader(this.shader);
		
		this.texture.bind(0);
		this.texture2.bind(1);
		
		this.scene.pushMatrix();
		
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(50,50,1);
		this.plane.display();
		
		this.scene.popMatrix();
		this.scene.setActiveShader(this.scene.defaultShader);
	}
	
}