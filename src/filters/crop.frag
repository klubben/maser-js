# crop.frag
in vec2 vTextureCoord;
in vec4 vColor;
in vec2 vFilterCoord;

uniform sampler2D uTexture;
uniform float uTime;

uniform float ux;
uniform float uy;
uniform float uw;
uniform float uh;

void main(void)
{
    if (
    vFilterCoord.x > ux && vFilterCoord.x < ux + uw &&
    vFilterCoord.y > uy && vFilterCoord.y < uy + uh
    ) {
        gl_FragColor = texture2D(uTexture, vTextureCoord);
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
}