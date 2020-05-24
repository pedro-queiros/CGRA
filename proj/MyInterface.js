/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayCubeMap').name('Display Cube Map');
        this.gui.add(this.scene, 'applyEarth').name('Apply Earth');
        this.gui.add(this.scene, 'selectedObject', this.scene.objectIDs).name('Selected Object').onChange(this.scene.updateObjectComplexity.bind(this.scene));
        this.gui.add(this.scene, 'selectedTexture', this.scene.textureIds).name('Selected Texture');//.onChange(this.scene.updateAppliedTexture.bind(this.scene));
        this.gui.add(this.scene,'speedFactor',0.1,3.0,0.1).name('Speed');
        this.gui.add(this.scene,'scaleFactor',0.5,3.0,0.1).name('Scale');

        this.initKeys();
        return true;
    }

    initKeys(){
        this.scene.gui = this;
        this.processKeyboard = function(){};
        this.activeKeys={};
    }

    processKeyDown(event){
        this.activeKeys[event.code] = true;
    };

    processKeyUp(event){
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode){
        return this.activeKeys[keyCode] || false;
    }
}