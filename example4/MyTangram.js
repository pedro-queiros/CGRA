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
                this.initMaterials(scene);
	
	}

        initMaterials(scene){

                //Amarelo
                this.material1 = new CGFappearance(scene);
                //this.material1.setAmbient(0, 0, 0, 1.0);
                //this.material1.setDiffuse(0, 0, 0, 1.0);
                this.material1.setAmbient(1*0.5,1*0.5,0,1.0);
                this.material1.setDiffuse(1*0.7,1*0.7,0,1.0);
                this.material1.setSpecular(1, 1, 0, 1.0);
                this.material1.setShininess(10.0);

                //Verde
                this.material2 = new CGFappearance(scene);
                //this.material2.setAmbient(0, 0, 0, 1.0);
                //this.material2.setDiffuse(0, 0, 0, 1.0);
                this.material2.setAmbient(0,1*0.5,0,1.0);
                this.material2.setDiffuse(0,1*0.7,0,1.0);
                this.material2.setSpecular(0, 1, 0, 1.0);
                this.material2.setShininess(10.0);

                //Laranja
                this.material3 = new CGFappearance(scene);
                //this.material3.setAmbient(0, 0, 0, 1.0);
                //this.material3.setDiffuse(0, 0, 0, 1.0);
                this.material3.setAmbient(1*0.5,0.647*0.5,0,1.0);
                this.material3.setDiffuse(1*0.7,0.647*0.7,0,1.0);
                this.material3.setSpecular(1, 0.647, 0, 1.0);
                this.material3.setShininess(10.0);

                //Roxo
                this.material4 = new CGFappearance(scene);
                //this.material4.setAmbient(0, 0, 0, 1.0);
                //this.material4.setDiffuse(0, 0, 0, 1.0);
                this.material4.setAmbient(0.58*0.5,0,0.827*0.5,1.0);
                this.material4.setDiffuse(0.58*0.7,0,0.827*0.7,1.0);
                this.material4.setSpecular(0.58, 0, 0.827, 1.0);
                this.material4.setShininess(10.0);

                //Azul
                this.material5 = new CGFappearance(scene);
                //this.material5.setAmbient(0, 0, 0, 1.0);
                //this.material5.setDiffuse(0, 0, 0, 1.0);
                this.material5.setAmbient(0,0.749*0.5,1*0.5,1.0);
                this.material5.setDiffuse(0,0.749*0.7,1*0.7,1.0);
                this.material5.setSpecular(0, 0.749, 1, 1.0);
                this.material5.setShininess(10.0);

                //Rosa
                this.material6 = new CGFappearance(scene);
                //this.material6.setAmbient(0, 0, 0, 1.0);
                //this.material6.setDiffuse(0, 0, 0, 1.0);
                this.material6.setAmbient(1*0.5,0.714*0.5,0.757*0.5,1.0);
                this.material6.setDiffuse(1*0.7,0.714*0.7,0.757*0.7,1.0);
                this.material6.setSpecular(1, 0.714, 0.757, 1.0);
                this.material6.setShininess(10.0);

                //Vermelho
                this.material7 = new CGFappearance(scene);
                //this.material7.setAmbient(0, 0, 0, 1.0);
                //this.material7.setDiffuse(0, 0, 0, 1.0);
                this.material7.setAmbient(1*0.5,0,0,1.0);
                this.material7.setDiffuse(1*0.7,0,0,1.0);
                this.material7.setSpecular(1, 0, 0, 1.0);
                this.material7.setShininess(10.0);

                this.newmaterial = new CGFappearance(scene);
                this.newmaterial.setAmbient(0.1, 0.1, 0.1, 1);
                this.newmaterial.setDiffuse(0.9, 0.9, 0.9, 1);
                this.newmaterial.setSpecular(0.1, 0.1, 0.1, 1);
                this.newmaterial.setShininess(10.0);
                this.newmaterial.loadTexture('images/tangram.png');
                this.newmaterial.setTextureWrap('REPEAT', 'REPEAT');
                //scene.updateCustomMaterial();

        }


	display(){
		
        this.scene.pushMatrix();
	var rotate = [Math.cos((Math.PI)/4),Math.sin((Math.PI)/4),0.0,0.0,
                        -Math.sin((Math.PI)/4),Math.cos((Math.PI)/4),0.0,0.0,
                        0.0,0.0,1.0,0.0,
                        0.0,0.0,0.0,1.0];

        this.scene.translate(-0.99,2,0);
        this.scene.multMatrix(rotate);
        //this.scene.setDiffuse(0.6,0.0,1.0,1.0);
        this.newmaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();
 
        this.scene.pushMatrix();
        this.scene.translate(-1,2.7,0);
        this.scene.rotate((Math.PI),1,0,0);
        this.scene.rotate(-(Math.PI)/4,0,0,1);
        //this.material1.apply();
        this.newmaterial.apply();
        this.parallelogram.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(1.125,0.7,0);
        this.scene.rotate((Math.PI),1,0,0);
        this.scene.rotate((Math.PI)/4,0,0,1);
        this.newmaterial.apply();
        //this.material3.apply();
        this.triangleBig.updateTexCoords([0,0,0.5,0.5,1,0]);
        this.triangleBig.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(1.111,-2.1,0);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.rotate((Math.PI)/4,0,0,1);
        this.newmaterial.apply();
        //this.material5.apply();
        this.triangleBig.updateTexCoords([0.5,0.5,1,1,1,0]);
        this.triangleBig.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(-0.289,0.3,0);
        this.scene.rotate((Math.PI)/2,0,0,1);
        this.newmaterial.apply();
        //this.material4.apply();
        this.triangleSmall.updateTexCoords([0,0,0,0.5,0.25,0.25]);
        this.triangleSmall.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(1.52,-2.5,0);
        this.newmaterial.apply();
        //this.material6.apply();
        this.triangle.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0.52,-2.5,0);
        this.scene.rotate((Math.PI)/2,0,0,1);
        this.newmaterial.apply();
        //this.material7.apply();
        this.triangleSmall.updateTexCoords([0.25,0.75,0.5,0.5,0.75,0.75]);
        this.triangleSmall.display();
        this.scene.popMatrix();

      
        
	}
        updateBuffers(complexity){
        }

        enableNormalViz(){
                this.diamond.enableNormalViz();
                this.parallelogram.enableNormalViz();
                this.triangle.enableNormalViz();
                this.triangleBig.enableNormalViz();
                this.triangleSmall.enableNormalViz();
        }

        disableNormalViz(){
                this.diamond.disableNormalViz();
                this.parallelogram.disableNormalViz();
                this.triangle.disableNormalViz();
                this.triangleBig.disableNormalViz();
                this.triangleSmall.disableNormalViz();
        }

}