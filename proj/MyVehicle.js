class MyVehicle extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.balloon = new MySphere(this.scene,16,8);
        this.balloon.initBuffers();
        this.cockpit = new MyCylinder(this.scene,16,8);
        this.cockpit.initBuffers();
        this.frontOfCockpit = new MySphere(this.scene,16,8); 
        this.frontOfCockpit.initBuffers();
        this.backOfCockpit = new MySphere(this.scene,16,8);
        this.backOfCockpit.initBuffers();
        this.leftEngine = new MySphere(this.scene,16,8);
        this.leftEngine.initBuffers();
        this.rightEngine = new MySphere(this.scene,16,8);
        this.rightEngine.initBuffers();
        this.topFlat = new MyFlat(this.scene);
        this.topFlat.initBuffers();
        this.bottomFlat = new MyFlat(this.scene);
        this.bottomFlat.initBuffers();
        this.leftFlat = new MyFlat(this.scene);
        this.leftFlat.initBuffers();
        this.rightFlat = new MyFlat(this.scene);
        this.rightFlat.initBuffers();
        this.leftPropeller = new MySphere(this.scene,16,8);
        this.rightPropeller = new MySphere(this.scene,16,8);
        this.support = new MyCylinder(this.scene,16,8);
		this.flag = new MyPlane(this.scene, 80, true);

        this.blimpTexture = new CGFappearance(this.scene);
        this.blimpTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.blimpTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.blimpTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.blimpTexture.setShininess(10.0);
        this.blimpTexture.loadTexture('images/blimp.png');
        this.blimpTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(0.64,0.29,0.64,1.0);
        this.purple.setDiffuse(0.64*0.2,0.29*0.2,0.64*0.2,1.0);
        this.purple.setSpecular(0.64,0.29,0.64,1.0);
        this.purple.setShininess(10);

        this.gray = new CGFappearance(this.scene);
        this.gray.setAmbient(0.5,0.5,0.5,1.0);
        this.gray.setDiffuse(0.5*0.2,0.5*0.2,0.5*0.2,1.0);
        this.gray.setSpecular(0.5,0.5,0.5,1.0);
        this.gray.setShininess(10); 


		this.flagshader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
		this.flagtexture = new CGFtexture(this.scene, "images/flag.png");
		this.flagshader.setUniformsValues({ speed: 0 });
		this.flagshader.setUniformsValues({ timeFactor: 0 });
        this.initBuffers();

        this.angle=0;
        this.propellerAngle = Math.PI/2;
        this.speed=0;
        this.xPos=0;
        this.yPos=0;
        this.zPos=0;
        this.right = false;
        this.left = false;
        this.autoPilotActive = false;
        this.time = 0;
        this.elapsedTime = 0;
        this.xCenter = 0;
        this.zCenter = 0;
    }
    
    updateBuffers(complexity){
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    update(t){
        if(this.autoPilotActive){
            if(this.time == 0)
                this.time = t;
            this.elapsedTime = t-this.time;
            this.time = t;
            this.angle += this.elapsedTime*360/5000;
            if(this.angle > 360)
                this.angle %= 360;
            this.xPos = -5*Math.cos(this.angle*Math.PI/180) + this.xCenter;
            this.zPos = 5*Math.sin(this.angle*Math.PI/180) + this.zCenter;
        }
        else{
            this.xPos += this.speed * Math.sin(this.angle*Math.PI/180);
            this.zPos += this.speed * Math.cos(this.angle*Math.PI/180);
        }
        this.propellerAngle -= this.speed;
		this.flagshader.setUniformsValues({ speed: this.speed });
        this.flagshader.setUniformsValues({ timeFactor: t / 100 % 1000 });
    }

    turn(val) {
        this.angle += val;
        if(val > 0){
            this.left = true;
        }
        else if(val < 0){
            this.right = true;
        }
    }

    accelerate(val) {
        if(this.speed + val > 0)
            this.speed += val;
        else
            this.speed = 0;
    }

    reset() {
        this.xPos = 0;
        this.yPos = 0;
        this.zPos = 0;
        this.speed = 0;
        this.angle = 0;
        this.autoPilotAngle = 0;
        this.right = false;
        this.left = false;
        this.autoPilotActive = false;
        this.time = 0;
        this.elapsedTime = 0;
    }

    autoPilot(){
        if(this.autoPilotActive){
            this.autoPilotActive = false;
        }
        else{
            this.autoPilotActive = true;
            var radius = 5;
            this.time = 0;
            this.elapsedTime = 0;
            this.xCenter = this.xPos + radius*Math.sin((this.angle+90)*Math.PI/180);
            this.zCenter = this.zPos + radius*Math.cos((this.angle+90)*Math.PI/180);
            this.left = true;
        }
    }
    
    display(){

        this.scene.pushMatrix();
        this.scene.translate(0,10,0);
        this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
        
        this.scene.translate(this.xPos, this.yPos, this.zPos);
        this.scene.rotate(this.angle*Math.PI/180.0, 0, 1, 0);
        

        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,1);
        this.blimpTexture.apply();
        this.balloon.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.10,0.625,0.10);
        this.scene.translate(0,-0.5,5.5);
        this.purple.apply();
        this.cockpit.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.10,0.10,0.10);
        this.scene.translate(0,-5.5,3);
        this.frontOfCockpit.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.10,0.10,0.10);
        this.scene.translate(0,-5.5,-3);
        this.backOfCockpit.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.05,0.05,0.15);
        this.scene.translate(2,-11,-2);
        this.leftEngine.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.05,0.05,0.15);
        this.scene.translate(-2,-11,-2);
        this.rightEngine.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.5,-0.5);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.scale(0.5,0.5,0.5);
        if(this.right){
            this.scene.rotate(Math.PI/10,0,1,0);
        }
        else if(this.left){
            this.scene.rotate(-Math.PI/10,0,1,0)
        }
        this.topFlat.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,-0.5);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.scale(1,-1,1);
        this.scene.scale(0.5,0.5,0.5);
        if(this.right){
            this.scene.rotate(Math.PI/10,0,1,0);
        }
        else if(this.left){
            this.scene.rotate(-Math.PI/10,0,1,0)
        }
        this.bottomFlat.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,0,-0.5);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(0.5,0.5,0.5);
        this.leftFlat.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,-0.5);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.5,0.5,0.5);
        this.rightFlat.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.1,-0.55,-0.45);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(this.propellerAngle,1,0,0);
        this.scene.scale(0.02,0.01,0.04);
        this.gray.apply();
        this.leftPropeller.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.1,-0.55,-0.45);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(this.propellerAngle,1,0,0);
        this.scene.scale(0.02,0.01,0.04);
        this.gray.apply();
        this.rightPropeller.display();
        this.scene.popMatrix();
		
        this.scene.pushMatrix();
        this.scene.scale(0.005,0.005,1);
        this.scene.translate(0,0,-1.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.support.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1.4,0.7,1);
		this.scene.translate(0,0,-2);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.flagtexture.bind(0);
		this.scene.setActiveShader(this.flagshader);
		this.flag.display();
		this.scene.popMatrix();
		this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
    }

    

}

