# define name="outline.frag"
precision highp float;


uniform sampler2D uTexture;
varying vec2 vFilterCoord;


uniform vec4 uOutputFrame;
uniform float thickness;
uniform vec3 color;

const float DOUBLE_PI = 3.14159265358979323846264 * 2.;
const float MAX_SAMPLES = 100.0;
const float MIN_SAMPLES = 1.0;

const float quality = 0.5;
const float samples = max((quality * MAX_SAMPLES), MIN_SAMPLES);
const float angleStep = (DOUBLE_PI / samples);

void main() {
    vec4 outputColor = texture2D(uTexture, vFilterCoord);


    if (thickness > 0.0) {
        vec2 mag = vec2(thickness/uOutputFrame.x, thickness/uOutputFrame.y);
        vec4 curColor;
        float maxAlpha = outputColor.a;
        vec2 offset;
        for (float angle = 0.; angle < DOUBLE_PI; angle += angleStep) {
            offset = vec2(mag.x * cos(angle), mag.y * sin(angle));
            curColor = texture2D(uTexture, vFilterCoord + offset);
            maxAlpha = max(maxAlpha, curColor.a);
        }
        vec3 resultColor = outputColor.rgb + (color.rgb * (1. - outputColor.a)) * maxAlpha;
        gl_FragColor = vec4(resultColor, maxAlpha);
    } else {
        gl_FragColor = outputColor;
    }
}