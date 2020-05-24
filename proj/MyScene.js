/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this,16);
        this.cubeMap = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this);
		this.terrain = new MyTerrain(this);
        this.supplies = [];
        this.supplyNumber = 0;
		this.billboard = new MyBillboard(this);

        for (var i = 0; i < 5; i++) {
            this.supplies.push(new MySupply(this));
        }

        this.objects = [this.vehicle, this.incompleteSphere, this.cylinder];

        this.objectIDs = { 'Vehicle': 0, 'Sphere': 1 , 'Cylinder': 2};

        this.selectedObject = 0;
        this.selectedTexture = 0;
        this.speedFactor=1;
        this.scaleFactor=1;
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayCubeMap = true;
        this.applyEarth = true;


        this.defaultMaterial = new CGFappearance(this);
        this.defaultMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.defaultMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.defaultMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.defaultMaterial.setShininess(10.0);
        this.defaultMaterial.loadTexture('images/earth.jpg');
        this.defaultMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.textures = [this.cubemap, this.cubemap2];

        this.textureIds = {'Cube Map 1': 1, 'Cube Map 2': 0};

    }
    initLights() {
        this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(40, 40, 40), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    updateObjectComplexity(){
        this.objects[this.selectedObject].updateBuffers(this.objectComplexity);
    }

    resetSupplies(){
        for (var i = 0; i < this.supplyNumber; i++) {
            this.supplies[i].reset();
        }
        this.supplyNumber = 0;
		this.billboard.reset();
    }

    checkKeys(){
        var text = "Keys pressed: ";
        var keysPressed = false;
        if(this.selectedObject == 0 && !this.objects[this.selectedObject].autoPilotActive){
            this.objects[this.selectedObject].right = false;
            this.objects[this.selectedObject].left = false;
        }
        if(this.gui.isKeyPressed("KeyW")){
            text += " W ";
            keysPressed=true;
            if(this.selectedObject == 0 && !this.objects[this.selectedObject].autoPilotActive)
                this.objects[this.selectedObject].accelerate(0.3*this.speedFactor);
        }

        if(this.gui.isKeyPressed("KeyS")){
            text += " S ";
            keysPressed = true;
            if(this.selectedObject == 0 && !this.objects[this.selectedObject].autoPilotActive && this.objects[this.selectedObject].speed >= 0)
                this.objects[this.selectedObject].accelerate(-0.3*this.speedFactor);
        }

        if(this.gui.isKeyPressed("KeyA")){
            text += " A ";
            keysPressed = true;
            if(this.selectedObject == 0 && !this.objects[this.selectedObject].autoPilotActive){
                this.objects[this.selectedObject].turn(5);
            }
        }

        if(this.gui.isKeyPressed("KeyD")){
            text += " D ";
            keysPressed = true;
            if(this.selectedObject == 0 && !this.objects[this.selectedObject].autoPilotActive)
                this.objects[this.selectedObject].turn(-5);
        }

        if(this.gui.isKeyPressed("KeyR")){
            text += " R ";
            keysPressed = true;
            if(this.selectedObject == 0)
                this.objects[this.selectedObject].reset();
            this.resetSupplies();
        }

        if(this.gui.isKeyPressed("KeyP")){
            text += " P ";
            keysPressed = true;
            if(this.selectedObject == 0){
                this.objects[this.selectedObject].autoPilot();
            }
        }

        if(this.gui.isKeyPressed("KeyL")){
            text += " L ";
            keysPressed = true;
            if(this.supplyNumber < 5 && !this.objects[this.selectedObject].autoPilotActive){
                this.supplies[this.supplyNumber].drop(this.vehicle.xPos,this.vehicle.zPos);
                this.supplyNumber++;
            }
        }

        if(keysPressed)
            console.log(text);
    }


    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done...
        this.checkKeys();
        if(this.selectedObject == 0)
            this.objects[this.selectedObject].update(t);
        for (var i = 0; i < this.supplyNumber; i++) {
            this.supplies[i].update(t);
        }
		this.billboard.update(t);
    }


    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        this.pushMatrix();
        
		
        if(this.applyEarth && this.selectedObject == 1){
            this.defaultMaterial.apply();
        }

        this.objects[this.selectedObject].display();  
		
        if(this.displayCubeMap)
            this.cubeMap.display();	
		this.terrain.display();	
        this.popMatrix();
		
		this.pushMatrix();
		this.rotate(Math.PI/2,0,1,0);
		this.translate(1,2,-10);
		this.billboard.display();
		this.popMatrix();
		
        for (var i = 0; i < this.supplyNumber; i++) {
            this.supplies[i].display();
        }
		
		
		this.setActiveShader(this.defaultShader);
        
		//this.pushMatrix();
		
		//this.popMatrix();
		

        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        //this.earth.apply();
        //this.incompleteSphere.display();
        //this.cubemap.display();

        //this.cylinder.display();

        // ---- END Primitive drawing section
    }
}