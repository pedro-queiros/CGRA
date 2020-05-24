attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
varying vec2 vTextureCoord;
uniform sampler2D uSampler2;


void main() {
	vec3 offset=vec3(0.0,0.0,0.0);
	
	vTextureCoord = aTextureCoord;
	
	vec4 map = texture2D(uSampler2,vTextureCoord);
	offset = aVertexNormal*8.0*(map.r+map.b+map.g)/3.0;
	
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);

}

