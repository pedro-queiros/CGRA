#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
uniform int suppliesDelivered;

void main() {
    if (coords.x >= (1.0 / 5.0 * float(suppliesDelivered)-0.501))
        gl_FragColor = vec4(0.5, 0.5, 0.5, 1);
    else {
        gl_FragColor =  vec4(1.0 - (0.5 + coords.x / 0.5), 0.5 + coords.x / 0.5, 0,1.0);
    }
}


