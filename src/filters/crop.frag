# define name="crop.frag"
in vec2 vTextureCoord;
in vec4 vColor;
in vec2 vFilterCoord;

uniform sampler2D uTexture;
uniform float uTime;

void main(void)
{
    if (
    vFilterCoord.x >= 0.0 && vFilterCoord.x <= 1.0 &&
    vFilterCoord.y >= 0.0 && vFilterCoord.y <= 1.0
    ) {
        gl_FragColor = texture2D(uTexture, vTextureCoord);
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
}