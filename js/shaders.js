// Oscar Saharoy 2022


const fragmentShader = `

// ====================================================================================

// remix of http://www.pouet.net/prod.php?which=57245 by Danilo Guanabara

#define t uTime
#define r uResolution.xy

uniform float uTime;
uniform vec2 uResolution;


void mainImage( out vec4 fragColor, in vec2 fragCoord ) {

	vec3 c;
	float l, z = t;

    vec2 p=fragCoord.xy/r;
    vec2 uvs = p;
    p-=.5;
    p.x *= r.x/r.y;
    l=length(p);

	for(int i=0;i<3;i++) {
		z+=.05;
		vec2 uv = uvs + p/l*(sin(z-l*0.2)+1.3) * sin(sin(l*10.)+z*2.);
		c[i]=.02/length(mod(uv,1.)-.5)/l;
	}

	fragColor = vec4(c,1.);
}


void main() {

    float minDimension = min( uResolution.x, uResolution.y );
    float aspect = uResolution.x / uResolution.y;
    vec2 centredFragCoord = 2. * gl_FragCoord.xy - uResolution.xy;
    vec2 screenPos = centredFragCoord / minDimension;

    mainImage( gl_FragColor, gl_FragCoord.xy );
}

// ====================================================================================

`;

