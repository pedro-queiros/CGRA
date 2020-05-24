class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.diamond = new MyDiamond(this.scene);
		this.diamond.initBuffers();
		this.parallelogram = new MyParallelogram(this.scene);
		this.parallelogram.initBuffers();
		this.triangleBig = new MyTriangleBig(this.scene);
		this.triangleBig.initBuffers();
		this.triangleSmall = new MyTriangleSmall(this.scene);
		this.triangleSmall.initBuffers();
		this.triangle = new MyTriangle(this.scene);
		this.triangle.initBuffers();
	
	}
	display(){
		this.scene.pushMatrix();
		var rotate = [Math.cos((Math.PI)/4),Math.sin((Math.PI)/4),0.0,0.0,
                        -Math.sin((Math.PI)/4),Math.cos((Math.PI)/4),0.0,0.0,
                        0.0,0.0,1.0,0.0,
                        0.0,0.0,0.0,1.0];

        this.scene.translate(-0.99,2,0);
        this.scene.multMatrix(rotate);
        this.scene.setDiffuse(0.6,0.0,1.0,1.0);
        this.diamond.display();
        this.scene.popMatrix();
 

        this.scene.pushMatrix();
        this.scene.translate(-1,2.7,0);
        this.scene.rotate((Math.PI),1,0,0);
        this.scene.rotate(-(Math.PI)/4,0,0,1);
        this.parallelogram.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(1.125,0.7,0);
        this.scene.rotate((Math.PI),1,0,0);
        this.scene.rotate((Math.PI)/4,0,0,1);
        this.triangleBig.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(1.111,-2.1,0);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.rotate((Math.PI)/4,0,0,1);
        this.triangleBig.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(-0.289,0.3,0);
        this.scene.rotate((Math.PI)/2,0,0,1);
        this.triangleSmall.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(1.52,-2.5,0);
        this.triangle.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0.52,-2.5,0);
        this.scene.rotate((Math.PI)/2,0,0,1);
        this.triangleSmall.display();
        this.scene.popMatrix();

      
        
	}

}