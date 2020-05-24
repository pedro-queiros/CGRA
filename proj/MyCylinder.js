class  MyCylinder extends CGFobject {

  constructor(scene, slices) {
    super(scene);
    this.slices = slices;

    this.initBuffers();
  }


  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords=[];

    var currentAng = 0;
    var addingAng = 2*Math.PI/this.slices;

    for (var i = 0; i <= this.slices; i++) {
        this.vertices.push(Math.cos(currentAng),0,-Math.sin(currentAng));
        this.vertices.push(Math.cos(currentAng),1,-Math.sin(currentAng));
        if(i != this.slices){
          this.indices.push(i*2, i*2+2, i*2+1);
          this.indices.push(i*2+2, i*2+3, i*2+1);
        }
        this.normals.push(Math.cos(currentAng), 0, -Math.sin(currentAng));
        this.normals.push(Math.cos(currentAng), 0, -Math.sin(currentAng));
        this.texCoords.push(i/this.slices,1);
        this.texCoords.push(i/this.slices,0);
        currentAng += addingAng;
      }




    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  updateBuffers(complexity){

    this.initBuffers();
    this.initNormalVizBuffers();
  }
}
