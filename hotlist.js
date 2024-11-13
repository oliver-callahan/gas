var json = {
    "code": "<!DOCTYPE html>\n<html>\n<title>Team Delphin Homepage</title>\n<canvas id = \"m\" width = '512' height = '512'></canvas>\n<canvas width = \"512\" height = \"512\" id = \"my_Canvas\"></canvas><canvas width = \"1200\" height = \"2800\" id = \"anvas\"></canvas>\n<canvas width = \"512\" height = \"512\" id = \"skybox\"></canvas>\n<canvas width = \"512\" height = \"512\" id = \"bloom\"></canvas>\n<script id=\"ob\" src='https://cdn.jsdelivr.net/gh/Bearkirb/sponzaModel@35b8854e0fffe0af336e717c68138defd812e6d7/shackModel.js'></script>\n<script src='https://cdn.jsdelivr.net/npm/obj-file-parser@0.6.2/dist/OBJFile.min.js'></script>\n<img id=\"texture1\" src=\"https://upload.wikimedia.org/wikipedia/commons/9/90/Logwood_bc_copy.jpg\" style=\"display:none;\">\n<img id=\"program1\" src=\"https://www.khanacademy.org/computer-programming/spin-off-of-uwqpiuwoqriopuweiowqoouqwr/5027325495132160/4961643952783360.png\" style=\"display:none;\">\n<img id=\"program2\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Placeholder_image.png/640px-Placeholder_image.png\" style=\"display:none;\">\n<img id=\"funny\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Twemoji2_1f913.svg/640px-Twemoji2_1f913.svg.png\" style=\"display:none;\">\n\n <a href=\"https://www.mozilla.org/en-US/\" id=\"asdf\">Link to selected program</a>\n<style>\n*{\nmargin:0px;  \n\n}\n#m{\n    display:none;\n    \n}\n#asdf{\n    position:absolute;\n    top:1600px;\n     left:224px;\n}\n#my_Canvas{\n      margin:0px;\n    padding:0px;\n    width:600px;\n    height:600px;\n  \n}\n#anvas{\n     position:absolute;\n     top: 600px;\n    margin:0px;\n    padding:0px;\n      width:600px; \n}\n#skybox{\n    display:none;\n}\n#bloom{\n    display:none;\n}\n\n</style>\n\n\n\n\n <script id = 'vertex-bloom' type = 'glsl'>#version 300 es\n   in vec2 aPosition;\nout vec2 pos;\nprecision highp float;\nvoid main() {\n    pos = aPosition;\n    gl_Position = vec4(aPosition, 0, 1);\n}\n\n    </script>\n    <script>\n\n    </script>\n    <script id = 'fragment-bloom' type = 'glsl'>#version 300 es\nprecision lowp sampler2D;\nuniform sampler2D iChannel0;\nprecision highp float;\nuniform vec2 u_resolution;\nuniform float drawx;\nuniform float drawy;\nuniform float clicked;\nuniform float iTime;\nuniform vec2 cameraAngle;\n\n\n\nout vec4 fragColor;\nvec2 Rotate(vec2 uv,float ang){\n    return vec2(uv.x*cos(ang)-uv.y*sin(ang),uv.x*sin(ang)+uv.y*cos(ang));\n}\n\nvoid Rotate( inout vec3 vector, vec2 angle )\n{\n\tvector.yz = cos(angle.y)*vector.yz\n\t\t\t\t+sin(angle.y)*vec2(-1,1)*vector.zy;\n\tvector.xz = cos(angle.x)*vector.xz\n\t\t\t\t+sin(angle.x)*vec2(-1,1)*vector.zx;\n}\nvec2 crt(vec2 coord, float bend){\n\t// put in symmetrical coords\n\tcoord = (coord - 0.5) * 2.0;\n\n\tcoord *= 1.1;\t\n\n\t// deform coords\ncoord=Rotate(coord,bend*pow(length(coord),2.0));\n\n\t// transform back to 0.0 - 1.0 space\n\tcoord  = (coord / 2.2) + 0.5;\n\n\treturn coord;\n}\n\n#define M1 1597334677U     //1719413*929\n#define M2 3812015801U     //140473*2467*11\n\nfloat hash( uvec2 q )\n{\n    q *= uvec2(M1, M2); \n    \n    uint n = (q.x ^ q.y) * M1;\n    \n    return float(n) * (1.0/float(0xffffffffU));\n}\nvec4 textur(vec2 uv){\n  vec2 ruv=uv;\n  \n    return texture(iChannel0,ruv);\n}\nfloat random (in vec2 _st) {\n    return fract(sin(dot(_st.xy,\n                         vec2(12.9898,78.233)))*\n        43758.5453123);\n}\nvec4 photoshop_desaturate(vec3 color, float factor)\n{\n\tvec3 lum = vec3(0.299, 0.587, 0.114);\n\tvec3 gray = vec3(dot(lum, color));\n\treturn vec4(mix(color, gray, factor), 1.0);\n}\nfloat sin2(float x){\n    return cos(x)<0.0?(sin(x)>0.0?-1.0:1.0):sin(x);\n}\nvec3 aces_tonemap(vec3 color){\t\n\tmat3 m1 = mat3(\n        0.59719, 0.07512, 0.02840,\n        0.35458, 0.90834, 0.13383,\n        0.04823, 0.01566, 0.83777\n\t);\n\tmat3 m2 = mat3(\n        1.60475, -0.10208, -0.00327,\n        -0.53108,  1.10813, -0.07276,\n        -0.07367, -0.00605,  1.07602\n\t);\n\tvec3 v = m1 * color;    \n\tvec3 a = v * (v + 0.0245786) - 0.000090537;\n\tvec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;\n\treturn pow(clamp(m2 * (a / b), 0.0, 1.0), vec3(1.0 / 2.2));\t\n}\n#define DITHER_STEPS 2.0\nint dither_matrix[64] = int[](\n    0,32,8,40,2,34,10,42,\n    48,16,56,24,50,18,58,26,\n    12,44,4,36,14,46,6,38,\n    60,28,52,20,62,30,54,22,\n    3,35,11,43,1,33,9,41,\n    51,19,59,27,49,17,57,25,\n    15,47,7,39,13,45,5,37,\n    63,31,55,23,61,29,53,21\n);\n\nvec4 posterize(vec4 col, float steps)\n{\n    return floor(col*steps)/steps;\n}\n\nvec4 nearest_palette(vec4 x)\n{\n    return posterize(x, DITHER_STEPS);\n}\n\nvec4 dither(vec4 col, vec2 uv)\n{\n    int x_m = int(uv.x) % 8;\n    int y_m = int(uv.y) % 8;\n    float M = float(dither_matrix[y_m*8+x_m])/64.;\n    \n    return nearest_palette(col+(M-.5f));\n}\nvec3 srgbToLinear(const vec3 x){\n    return 0.315206*x*((2.10545+x)*(0.0231872+x));\n}\n// curve matched using turingbot\nvec3 linearToSrgb(const vec3 x){\n    return 1.14374*(-0.126893*x+sqrt(x));\n}\n\nvec4 t(vec2 p,float m){\n    vec4 t=texture(iChannel0,p,m);\n    return vec4(srgbToLinear(t.rgb),t.a);\n}\n\nvec4 fastBloom (vec2 p,vec2 r,float mi){\n    float mip = mi;\n    float scale = exp2(mip);\n    vec4 c =\n        t((p+vec2(-1.5,-0.5)*scale)/r,mip)*.1+\n        t((p+vec2( 0.5,-1.5)*scale)/r,mip)*.1+\n        t((p+vec2( 1.5, 0.5)*scale)/r,mip)*.1+\n        t((p+vec2(-0.5, 1.5)*scale)/r,mip)*.1+\n        t((p)/r,mip)*.7+\n        t(p/r,0.)*.7;\n    return c;\n}\n\nvoid main() {\n\n    vec2 fragCoord = gl_FragCoord.xy;\n    vec2 iMouse = vec2(drawx,drawy);\n    vec2 iResolution = vec2(512.0,512.0);\n    vec2 res = iResolution.xy;\n    vec2 uv=(fragCoord/res);\n   uv.y=1.0-uv.y;\n        fragColor.rgba = textur(uv).rgba;\n\n\n\n   \n    \n     \n      // fragColor.rgb=mix(fragColor.rgb,((fragColor.rgb+1.0)/2.0)*vec3(0.05,0.06,0.3),pow(distance(uv*8.0,vec2(0.5*8.0,0.5*8.0)),2.0)/200.0+0.3);\n       vec3 som=vec3(0.0);\n       float aca=0.0;\n       float accum=0.0;\n  \n      \n         \n\nfor(float i=0.0;i<6.0;i++){\nvec4 bloo=fastBloom(uv*512.0,vec2(512.0),float(i)+1.0);\naca+=max(-(fragColor.a-bloo.a/1.9),-0.2)*2.1;\nfragColor.rgb+=bloo.rgb;\n}\n        fragColor.rgb/=2.0;\n\n\n//     fragColor.rgb*=1.0-clamp(vec3(aca),0.0,3.0);\n  //fragColor.rgb+=aca;\nvec3 light=vec3(0.0,200.0,1000.0);\nvec2 p=uv;\n vec2 m=1.0-vec2(-drawx,-drawy);\n  float siz=1.0;\n\n  vec3 c = vec3(0.0);\n float div=200.0;\n\n  for(int i=0;i<20;i++){\n  vec4 ad=texelFetch(iChannel0,ivec2(clamp((((1.0*p-(m))*siz)+(m))*512.0,1.0,599.0)),0).rgba;\n  siz*=0.95-(hash(uvec2((p+vec2(i))*vec2(512.0)))*0.08);\n \nc+=0.25*(siz*siz)*(length(ad.rgb)-0.2);\n\n\n}\n\n vec4 ad=texture(iChannel0,uv).rgba;\n\n\n\nfragColor.rgb=mix(fragColor.rgb,vec3(0.2),1.0-fragColor.a);\nfragColor.rgb=clamp(fragColor.rgb,0.0,1.0);\nfragColor.rgb+=c*vec3(0.5,0.8,1.0)*1.0;\nif(ad.a<0.01){\nfragColor.rgb+=0.01/distance(uv,m);\n}\n    fragColor.rgb*=1.0;\n    vec2 uv2=uv;\n    uv *=  1.0 - uv.yx;   \n    \n       float vig = uv.x*uv.y * 50.0; // multiply with sth for intensity\n    \n    vig = pow(vig, 0.35); // change pow for modifying the extend of the  vignette\n\n    fragColor.rgb=mix(fragColor.rgb,vec3(245.0/255.0,250.0/255.0,1.0),clamp(1.9-vig*1.5,0.0,1.0));\n  \n    float dis=clamp(fragColor.a*1.0,0.0,1.0);\n    fragColor.a=1.0;\n  \n//fragColor.rgb=dither(vec4(fragColor.rgb*2.0,1.0),gl_FragCoord.xy*1.0).rgb;\n}\n\n  \n\n    </script>\n\n    <script id = 'vertex-skybox' type = 'glsl'>#version 300 es\n   in vec2 aPosition;\nout vec2 pos;\nprecision highp float;\nvoid main() {\n    pos = aPosition;\n    gl_Position = vec4(aPosition, 0, 1);\n}\n\n    </script>\n    <script>\n\n    </script>\n    <script id = 'fragment-skybox' type = 'glsl'>#version 300 es\nprecision highp sampler2D;\nuniform sampler2D iChannel0;\nprecision highp float;\nuniform vec2 u_resolution;\nuniform float drawx;\nuniform float drawy;\n\nuniform float iTime;\n\nvoid Rotate( inout vec3 vector, vec2 angle )\n{\n\tvector.yz = cos(angle.y)*vector.yz\n\t\t\t\t+sin(angle.y)*vec2(-1,1)*vector.zy;\n\tvector.xz = cos(angle.x)*vector.xz\n\t\t\t\t+sin(angle.x)*vec2(-1,1)*vector.zx;\n}\n\nfloat smin( float a, float b, float k )\n{\n    k *= 2.0;\n    float x = b-a;\n    return 0.5*( a+b-sqrt(x*x+k*k) );\n}\n\nvec2 hash2(vec2 p ) {\n   return fract(sin(vec2(dot(p, vec2(123.4, 748.6)), dot(p, vec2(547.3, 659.3))))*5232.85324);   \n}\nfloat hash(vec2 p) {\n  return fract(sin(dot(p, vec2(43.232, 75.876)))*4526.3257);   \n}\n\n//Based off of iq's described here: https://iquilezles.org/articles/voronoilines\nfloat voronoi(vec2 p) {\n    vec2 n = floor(p);\n    vec2 f = fract(p);\n    float md = 5.0;\n    vec2 m = vec2(0.0);\n    for (int i = -1;i<=1;i++) {\n        for (int j = -1;j<=1;j++) {\n            vec2 g = vec2(i, j);\n            vec2 o = hash2(n+g);\n            o = 0.5+0.5*sin(iTime/300.0+5.038*o);\n            vec2 r = g + o - f;\n            float d = dot(r, r);\n            if (d<md) {\n              md = d;\n              m = n+g+o;\n            }\n        }\n    }\n    return md;\n}\n\nfloat ov(vec2 p) {\n    float v = 0.0;\n    float a = 0.4;\n \n    for (int i = 0;i<2;i++) {\n        v+= voronoi(p)*a;\n        p*=2.0;\n        a*=0.5;\n    }    \n    \n    return v;\n}\nfloat fbm(vec2 p){\nfloat ou=0.0;\nfloat mult=1.0;\n\n    for(int i=0;i<1;i++){\nou+=ov(p*mult)/mult;\nmult*=2.0;\n}\nreturn ou;\n}\n\n       \nout vec4 fragColor;\nvoid main() {\n\n    vec2 fragCoord = gl_FragCoord.xy;\n    vec2 iMouse = vec2(drawx,drawy);\n    vec2 iResolution = vec2(600.0,600.0);\nvec2 res = iResolution.xy;   //View resolution\n    \n  vec2 uv=fragCoord/res;\n  \n\tvec3 background = vec3(0.002);\t\n\t  vec3 a = vec3(0.05, 0.25, 0.3);\n    vec3 b = vec3(0.85, 0.9, 1.0);\n     float fb=fbm(uv*8.0);\nbackground=mix(a, b, smoothstep(0.0, 0.5, fb/4.0+clamp(clamp(-(uv.y-25.0)/100.0,0.0,1.0),0.0,1.0)))/2.0;\n       fragColor = vec4(background,1);\n  \n}\n\n    </script>\n\n\n\n\n\n\n\n\n\n\n\n\n<script id = 'vertex-shader' type = 'glsl'>#version 300 es\nin vec3 coordinates;\nin vec3 normal;\nin vec3 uvi;\nprecision highp float;\nprecision highp sampler2D;\nuniform sampler2D iChannel0;\nuniform float iTime;\nuniform float dopts;\nuniform vec2 cameraAngle;\nuniform vec3 playerPosition;\nout vec3 pos;\n\nvoid CamRotate(inout vec3 vector, vec2 angle) {\n    angle.y*=-1.0;\n    vector.xz =\n            cos(angle.x) * vector.xz + sin(angle.x) * vec2(-1, 1) * vector.zx;\n        vector.yz =\n            cos(angle.y) * vector.yz + sin(angle.y) * vec2(-1, 1) * vector.zy;\n        \n}\nvoid Rotate(inout vec3 vector, vec2 angle) {\n        vector.yz =\n            cos(angle.y) * vector.yz + sin(angle.y) * vec2(-1, 1) * vector.zy;\n        vector.xz =\n            cos(angle.x) * vector.xz + sin(angle.x) * vec2(-1, 1) * vector.zx;\n}\n\nvec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nvec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nvec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }\n\n//\n// Description : GLSL 2D simplex noise function\n//      Author : Ian McEwan, Ashima Arts\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License :\n//  Copyright (C) 2011 Ashima Arts. All rights reserved.\n//  Distributed under the MIT License. See LICENSE file.\n//  https://github.com/ashima/webgl-noise\n//\nfloat noise(vec2 v) {\nv/=4.0;\n    // Precompute values for skewed triangular grid\n    const vec4 C = vec4(0.211324865405187,\n                        // (3.0-sqrt(3.0))/6.0\n                        0.366025403784439,\n                        // 0.5*(sqrt(3.0)-1.0)\n                        -0.577350269189626,\n                        // -1.0 + 2.0 * C.x\n                        0.024390243902439);\n                        // 1.0 / 41.0\n\n    // First corner (x0)\n    vec2 i  = floor(v + dot(v, C.yy));\n    vec2 x0 = v - i + dot(i, C.xx);\n\n    // Other two corners (x1, x2)\n    vec2 i1 = vec2(0.0);\n    i1 = (x0.x > x0.y)? vec2(1.0, 0.0):vec2(0.0, 1.0);\n    vec2 x1 = x0.xy + C.xx - i1;\n    vec2 x2 = x0.xy + C.zz;\n\n    // Do some permutations to avoid\n    // truncation effects in permutation\n    i = mod289(i);\n    vec3 p = permute(\n            permute( i.y + vec3(0.0, i1.y, 1.0))\n                + i.x + vec3(0.0, i1.x, 1.0 ));\n\n    vec3 m = max(0.5 - vec3(\n                        dot(x0,x0),\n                        dot(x1,x1),\n                        dot(x2,x2)\n                        ), 0.0);\n\n    m = m*m ;\n    m = m*m ;\n\n    // Gradients:\n    //  41 pts uniformly over a line, mapped onto a diamond\n    //  The ring size 17*17 = 289 is close to a multiple\n    //      of 41 (41*7 = 287)\n\n    vec3 x = 2.0 * fract(p * C.www) - 1.0;\n    vec3 h = abs(x) - 0.5;\n    vec3 ox = floor(x + 0.5);\n    vec3 a0 = x - ox;\n\n    // Normalise gradients implicitly by scaling m\n    // Approximation of: m *= inversesqrt(a0*a0 + h*h);\n    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);\n\n    // Compute final noise value at P\n    vec3 g = vec3(0.0);\n    g.x  = a0.x  * x0.x  + h.x  * x0.y;\n    g.yz = a0.yz * vec2(x1.x,x2.x) + h.yz * vec2(x1.y,x2.y);\n    return 130.0 * dot(m, g);\n}\nfloat sabs(float x){\nreturn sqrt(x*x+0.2);\n}\nfloat n(vec2 uv){\nreturn pow(1.0-sabs(noise(uv)),2.0);\n}\n\nfloat fbm(vec2 uv){\nfloat o=0.0;\nfloat mult=1.0;\nfor(int i=0;i<4;i++){\nvec2 f=vec2(n(uv*mult+(vec2(0.0)*mult*mult))/mult-n(uv*mult+(vec2(0.0)*mult*mult+vec2(0.001,0.0)))/mult,n(uv*mult+(vec2(0.0)*mult*mult))/mult-n(uv*mult+(vec2(0.0)*mult*mult+vec2(0.0,0.001)))/mult);\nmult*=2.0;\nfloat g=n(uv*mult+(vec2(0.0)*mult*mult))/mult;\ng*=1.0-length(f*100.0);\no+=g;\n\n}\nreturn pow(o*3.0+0.5,5.0);\n}\nout vec3 surfaceCoords;\nout vec3 pp;\nout vec3 no;\nout float dp;\nout vec3 ouv;\nvoid main() {\n    float fov=1.3;\n\n    pos=coordinates;\n      if(dopts>0.5){\n      pos+=vec3(noise(vec2(mod(float(gl_VertexID),100.0)+iTime/20000.0))*4.0,noise(vec2(mod(float(gl_VertexID),101.0)+5.5+iTime/20000.0))*4.0,noise(vec2(mod(float(gl_VertexID),102.0)+10.5+iTime/20000.0))*4.0);\n  }\n  ouv=uvi;\n     pos+=playerPosition;\n  \n    CamRotate(pos,cameraAngle);\n pp=playerPosition;\n    float silly=-0.001+pos.z*fov;\n   pos.x*=-1.0;\n   pos.y*=-1.0;\n   silly=silly;\n   no=normal;\n    surfaceCoords = coordinates;\n    pos.z*=-1.0;\n    dp=pos.z;\n     gl_PointSize = 3.0/(-pos.z);\n    gl_Position = vec4(pos,silly);\n}\n    </script>\n    \n    \n<script id = 'fragment-shader' type = 'glsl'>#version 300 es\n      \nprecision highp float;\n\nin vec3 surfaceCoords;\nin vec3 pp;\nin vec3 no;\nin float dp;\nin vec3 ouv;\nprecision lowp sampler2D;\nuniform sampler2D iChannel0;\nuniform float iTime;\nuniform vec2 cameraAngle;\nuniform vec3 playerPosition;\nuniform float dopts;\nout vec4 FragColor;\nvec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nvec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nvec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }\n\n//\n// Description : GLSL 2D simplex noise function\n//      Author : Ian McEwan, Ashima Arts\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License :\n//  Copyright (C) 2011 Ashima Arts. All rights reserved.\n//  Distributed under the MIT License. See LICENSE file.\n//  https://github.com/ashima/webgl-noise\n//\nfloat noise(vec2 v) {\nv/=4.0;\n    // Precompute values for skewed triangular grid\n    const vec4 C = vec4(0.211324865405187,\n                        // (3.0-sqrt(3.0))/6.0\n                        0.366025403784439,\n                        // 0.5*(sqrt(3.0)-1.0)\n                        -0.577350269189626,\n                        // -1.0 + 2.0 * C.x\n                        0.024390243902439);\n                        // 1.0 / 41.0\n\n    // First corner (x0)\n    vec2 i  = floor(v + dot(v, C.yy));\n    vec2 x0 = v - i + dot(i, C.xx);\n\n    // Other two corners (x1, x2)\n    vec2 i1 = vec2(0.0);\n    i1 = (x0.x > x0.y)? vec2(1.0, 0.0):vec2(0.0, 1.0);\n    vec2 x1 = x0.xy + C.xx - i1;\n    vec2 x2 = x0.xy + C.zz;\n\n    // Do some permutations to avoid\n    // truncation effects in permutation\n    i = mod289(i);\n    vec3 p = permute(\n            permute( i.y + vec3(0.0, i1.y, 1.0))\n                + i.x + vec3(0.0, i1.x, 1.0 ));\n\n    vec3 m = max(0.5 - vec3(\n                        dot(x0,x0),\n                        dot(x1,x1),\n                        dot(x2,x2)\n                        ), 0.0);\n\n    m = m*m ;\n    m = m*m ;\n\n    // Gradients:\n    //  41 pts uniformly over a line, mapped onto a diamond\n    //  The ring size 17*17 = 289 is close to a multiple\n    //      of 41 (41*7 = 287)\n\n    vec3 x = 2.0 * fract(p * C.www) - 1.0;\n    vec3 h = abs(x) - 0.5;\n    vec3 ox = floor(x + 0.5);\n    vec3 a0 = x - ox;\n\n    // Normalise gradients implicitly by scaling m\n    // Approximation of: m *= inversesqrt(a0*a0 + h*h);\n    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);\n\n    // Compute final noise value at P\n    vec3 g = vec3(0.0);\n    g.x  = a0.x  * x0.x  + h.x  * x0.y;\n    g.yz = a0.yz * vec2(x1.x,x2.x) + h.yz * vec2(x1.y,x2.y);\n    return 130.0 * dot(m, g);\n}\nvoid Rotate(inout vec3 vector, vec2 angle) {\n        vector.yz =\n            cos(angle.y) * vector.yz + sin(angle.y) * vec2(-1, 1) * vector.zy;\n        vector.xz =\n            cos(angle.x) * vector.xz + sin(angle.x) * vec2(-1, 1) * vector.zx;\n}\nfloat sabs(float x){\nreturn sqrt(x*x+0.2);\n}\nfloat n(vec2 uv){\nreturn pow(1.0-sabs(noise(uv)),2.0);\n}\n\nfloat fbm(vec2 uv, int d){\nfloat o=0.0;\nfloat mult=1.0;\nfor(int i=0;i<2;i++){\nvec2 f=vec2(n(uv*mult+(vec2(0.0)*mult*mult))/mult-n(uv*mult+(vec2(0.0)*mult*mult+vec2(0.001,0.0)))/mult,n(uv*mult+(vec2(0.0)*mult*mult))/mult-n(uv*mult+(vec2(0.0)*mult*mult+vec2(0.0,0.001)))/mult);\nmult*=2.0;\nfloat g=n(uv*mult+(vec2(0.0)*mult*mult))/mult;\ng*=1.0-length(f*100.0);\no+=g;\n\n}\nreturn pow(o*3.0+0.5,5.0);\n}\nmat3 tbn( in vec3 ro, in vec3 ta, float cr ) {\n\tvec3 cw = normalize(ta-ro);\n\tvec3 cp = vec3(sin(cr), cos(cr),0.0);\n\tvec3 cu = normalize( cross(cw,cp) );\n\tvec3 cv =          ( cross(cu,cw) );\n    return mat3( cu, cv, cw );\n}\nvoid main() {\n    vec3 pp2=-pp.xyz;\n    vec3 triNormal=no;\n    vec2 po=surfaceCoords.xz;\n  \n   \n  if(dopts>0.5){\n        FragColor = vec4((vec3(1.0,0.8,0.5))*1.5,1.0-(-dp)*0.015\n);\nreturn;\n  }\n    triNormal=normalize(triNormal);\n // vec3 lightCoords=pp-vec3(0.0,0.0,-0.0);\n vec3 triangleColor=vec3(0.9)*1.0;\n\n triangleColor=clamp(triangleColor,0.0,1.0);\n vec3 hehe = -normalize(surfaceCoords-pp*vec3(-1.0,1.0,-1.0));\n vec3 lightPos=pp2;\n vec3 FragPos=surfaceCoords;\n vec3 viewPos=pp2;\n vec3 lightDir   = normalize(lightPos - FragPos);\nvec3 viewDir    = normalize(viewPos - FragPos);\nvec3 halfwayDir = normalize(lightDir + viewDir);\nvec3 basNorm=vec3(0.001,0.001,1.0);\n\nvec3 nmap=texture(iChannel0,mod(ouv.xy,vec2(0.99))*vec2(0.5,1.0)+vec2(0.5,0.0)).rgb*2.0-1.0;\nvec3 normal=triNormal;\nvec3 tangent=cross(triNormal,vec3(0.0,1.0,0.0));\nvec3 bitangent=cross(tangent,normal);\n mat3 tangentToWorld = mat3(\n        vec3(tangent.x, bitangent.x, normal.x), \n        vec3(tangent.y, bitangent.y, normal.y), \n        vec3(tangent.z, bitangent.z, normal.z)\n    );\nnmap*=tangentToWorld;\ntriNormal=nmap;\ntriNormal=(normalize(triNormal));\n \n   float spec = pow(max(dot(triNormal, halfwayDir), 0.0), 200.0*ouv.z+0.1);\n \n\n vec3 to=surfaceCoords-pp2;\n\nfloat mul=max(dot(triNormal,-normalize(to)),0.0)*0.8;\n\nvec3 colo=texture(iChannel0,mod(ouv.xy,vec2(0.99))*vec2(0.5,1.0)).rgb;\nif(surfaceCoords.y>3.6&&surfaceCoords.y<3.6+1.2){\n    colo.rgb*=mix(vec3(0.3,0.3,1.0),vec3(0.7,0.65,0.1),1.0-clamp((surfaceCoords.y-4.2)*100.0,0.0,1.0));\n}\ncolo.rgb*=0.8;\n//FragColor = vec4(triNormal,1.0-(-dp)*0.015);\n\n       FragColor = vec4((colo*mul+vec3(1.0,0.9,0.6)*spec*(0.9*ouv.z+0.001)),1.0-(-dp)*0.025);//vec4(vec3(1.0-log(-dp*1.5)*0.2),1.0);//vec4((colo*mul+vec3(1.0,0.8,0.5)*spec*0.1)/(-dp*0.1+1.0),1.0);\n       if(surfaceCoords.y>7.199){\n           FragColor.rgb*=(dot(normalize(mod(surfaceCoords*vec3(1.0,0.4,1.0),8.0)-vec3(4.0,0.0,4.0)),vec3(0.0,1.0,0.0))+dot(normalize(mod(surfaceCoords*vec3(1.0,0.4,1.0),8.0)-vec3(4.0+3.0,0.0,4.0)),vec3(0.0,1.0,0.0))+dot(normalize(mod(surfaceCoords*vec3(1.0,0.4,1.0),8.0)-vec3(4.0,0.0,4.0+3.0)),vec3(0.0,1.0,0.0))+dot(normalize(mod(surfaceCoords*vec3(1.0,0.4,1.0),8.0)-vec3(4.0-3.0,0.0,4.0)),vec3(0.0,1.0,0.0))+dot(normalize(mod(surfaceCoords*vec3(1.0,0.4,1.0),8.0)-vec3(4.0,0.0,4.0-3.0)),vec3(0.0,1.0,0.0)))/5.0*vec3(0.8,0.9,0.99);\n       }\nif(ouv.z<0.0){\n    FragColor.rgba=vec4(vec3(0.9,0.95,0.99),1.0-(-dp)*0.025);\n}\n\n\n\n}\n</script>\n        <script type=\"module\">\n       \n           var mouseX=300,pmouseX=0,mouseY=300,pmouseY=0,clicked=false,key={};\n           var click=false;\n           var clickToggle=false;\n         function getPointer() {\n\t\tif (canvas2.requestPointerLock) {\n\t\t    \twindow.addEventListener(\"mousemove\", function(ev) {\n\t\tmouseX = pmouseX + ev.movementX/1.5;\n\t\tmouseY = pmouseY + ev.movementY/1.5;\n\t});\n\t\t\t//canvas2.requestPointerLock()\n\t\t\t\n\t\t}\n\t\n\t}\n            window.addEventListener('mousedown', event => {\n            clicked = true;\n   \n         clickToggle=true;\n      \n            //clicking?\n        });\n        window.addEventListener('mouseup', event => {\n            clicked = false;\n            click=true;\n//not clicking so set clicked to false\n        });\n          window.addEventListener(\"keydown\", (event) => {\n                    if((event.shiftKey&&event.key === 'W')||(event.shiftKey&&event.key === 'A')||(event.shiftKey&&event.key === 'S')||(event.shiftKey&&event.key === 'D')) {\n                  e.preventDefault();\n          }\n          key[event.key] = true;\n  });\n  window.addEventListener(\"keyup\", (event) => {\n          delete key[event.key];\n  });\n               window.addEventListener(\"mouseover\", event => {\n                pmouseX = mouseX;\n    pmouseY= mouseY\n    mouseX = event.pageX;\n    mouseY = event.pageY;\n    cors=1;\n});\nwindow.addEventListener(\"mousemove\", event => {\n    pmouseX = mouseX;\n    pmouseY= mouseY\n    mouseX = event.pageX;\n    mouseY = event.pageY;\n \n});\n\n        for (let i = window.requestAnimationFrame(function() {}); i > 0; i--) {\n    window.cancelAnimationFrame(i);\n}\n var c = document.getElementById(\"m\")\n\n//var ctx = c.getContext(\"2d\");\n//var data = ctx.getImageData(0, 0, 512, 512);\n\nfunction dist(x1,y1,x2,y2){\n    var dx=x1-x2;\n    var dy=y1-y2\n   return Math.sqrt(dx*dx+dy*dy)\n}\nfunction dist2(x1,y1,x2,y2){\n    var dx=x1-x2;\n    var dy=y1-y2\n   return (dx*dx+dy*dy)\n}\nvar anim=0;\n\n\n\n\nvar x=0;\nvar frameCount=0;\n\n     \n     \n     \n       /*================Creating a canvas=================*/\n         var canvas = new OffscreenCanvas(512,512);\n        var gl = canvas.getContext('webgl2',{ premultipliedAlpha: false }); \n\n         /*==========Defining and storing the geometry=======*/\n\n         var vertices = [\n            -0.5,0.5,0.0,\n            0.0,0.5,0.0,\n            -0.25,0.25,0.0, \n            -0.25,0.5,0.0 \n         ];\n\n         // Create an empty buffer object to store the vertex buffer\n         var vertex_buffer = gl.createBuffer();\n var normal_buffer = gl.createBuffer();\nvar uv_buffer = gl.createBuffer();\n\n         //Bind appropriate array buffer to it\n        // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);\n\n         // Pass the vertex data to the buffer\n      //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);\n\n         // Unbind the buffer\n    //     gl.bindBuffer(gl.ARRAY_BUFFER, null);\n\n         /*=========================Shaders========================*/\n\n         // vertex shader source code\n         var vertCode =document.getElementById('vertex-shader').textContent;\n\n         // Create a vertex shader object\n         var vertShader = gl.createShader(gl.VERTEX_SHADER);\n         \n         // Attach vertex shader source code\n         gl.shaderSource(vertShader, vertCode);\n\n         // Compile the vertex shader\n         gl.compileShader(vertShader);\n   if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {\n        console.log(gl.getShaderInfoLog(vertShader));\n    }\n    \n         // fragment shader source code\n         var fragCode = document.getElementById('fragment-shader').textContent\n\n         // Create fragment shader object\n         var fragShader = gl.createShader(gl.FRAGMENT_SHADER);\n\n         // Attach fragment shader source code\n         gl.shaderSource(fragShader, fragCode);\n\n         // Compile the fragmentt shader\n         gl.compileShader(fragShader);\n            if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {\n        console.log(gl.getShaderInfoLog(fragShader));\n    }\n    \n         // Create a shader program object to store\n         // the combined shader program\n         var shaderProgram = gl.createProgram();\n\n         // Attach a vertex shader\n         gl.attachShader(shaderProgram, vertShader); \n\n         // Attach a fragment shader\n         gl.attachShader(shaderProgram, fragShader);\n\n         // Link both programs\n         gl.linkProgram(shaderProgram);\n\n         // Use the combined shader program object\n         gl.useProgram(shaderProgram);\n\n         /*======== Associating shaders to buffer objects ========*/\n\n         // Bind vertex buffer objec\n         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);\n\n         // Get the attribute location\n         var coord = gl.getAttribLocation(shaderProgram, \"coordinates\");\n    var norms = gl.getAttribLocation(shaderProgram, \"normal\");\n      var texuv = gl.getAttribLocation(shaderProgram, \"uvi\");\n         // Point an attribute to the currently bound VBO\n        \n\n         /*============= Drawing the primitive ===============*/\n    gl.clearColor(0.0, 0.0, 0.0,1.0);\n\n         // Enable the depth test\n    \n     \n      var distance=-2,thetax=-0.0,thetaz=0\n           var d=function(x,y,z) {\n             \n           var zdist=((x*Math.sin(-thetaz)+y*Math.cos(-thetaz))*Math.cos(thetax)-z*Math.sin(thetax)+distance)/160.0\n    return[((x*Math.cos(-thetaz)-y*Math.sin(-thetaz))/zdist*-distance+300),(-((x*Math.sin(-thetaz)+y*Math.cos(-thetaz))*Math.sin(thetax)+z*Math.cos(thetax))/zdist*-distance)+300,zdist];\n};\n     \n        var camera={x:(-Math.sin(thetax+(Math.PI/2))*Math.cos(thetaz+(Math.PI/2)))*distance,y:(-Math.sin(thetax+(Math.PI/2))*Math.sin(thetaz+(Math.PI/2)))*distance,z:-Math.cos(thetax+(Math.PI/2))*distance} \n function camdist(x,y,z){\n    \nreturn(Math.sqrt(((x-camera.x)**2)+((y-camera.y)**2)+((z-camera.z)**2)))\n}\n     \n     \n      class Vector {\n          constructor(x, y, z=0) {\n                  this.x = x;\n                  this.y = y;\n                  this.z=z;\n          }\n          subtract(v) {\n                  var ve = new Vector(this.x, this.y, this.z);\n                  ve.x -= v.x;\n                  ve.y -= v.y;\n                  ve.z -= v.z;\n                  return ve;\n          }\n          add(v) {\n                  var ve = new Vector(this.x, this.y, this.z);\n                  ve.x += v.x;\n                  ve.y += v.y;\n                  ve.z += v.z;\n                  return ve;\n          }\n          divide(n) {\n                  var ve = new Vector(this.x, this.y, this.z);\n                  ve.x /= n;\n                  ve.y /= n;\n                  ve.z /= n;\n                  return ve;\n          }\n          magnitude() {\n                  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);\n          }\n          dot(v) {\n                  return this.x * v.x + this.y * v.y + this.z * v.z;\n          }\n          scale(n) {\n                  var ve = new Vector(this.x, this.y, this.z);\n                  ve.x *= n;\n                  ve.y *= n;\n                  ve.z *= n;\n                  return ve;\n          }\n          normalize() {\n                  var ve = new Vector(this.x, this.y, this.z);\n                  ve = ve.divide(ve.magnitude());\n                  return ve;\n          }\n          rotateBy(ang) {\n                  ang = -ang;\n                  return new Vector(this.x * Math.cos(ang) - this.y * Math.sin(ang), this.x * Math.sin(ang) + this.y * Math.cos(ang));\n          }\n          rotate3d(anglex,angley)\n{\n    var ve = new Vector(this.x,this.y,this.z);\n    var ro1 = new Vector(this.y,this.z).rotateBy(-anglex);\n    var ro2 = new Vector(this.x,ro1.y).rotateBy(-angley);\n\tve.y = ro1.x\n\tve.z = ro1.y;\n\t\t\t\t\n\tve.x = ro2.x;\n\tve.z = ro2.y;\n\treturn ve;\n}\n          reflect(n) {\n                  var ve = new Vector(this.x, this.y);\n                  ve = ve.subtract(n.scale(2 * ve.dot(n)))\n                  return ve;\n          }\n          abs() {\n                  var ve = new Vector(this.x, this.y, this.z);\n                  ve.x = Math.abs(ve.x);\n                  ve.y = Math.abs(ve.y);\n                  ve.z = Math.abs(ve.z);\n                  return ve;\n          }\n          max(n) {\n                  var ve = new Vector(this.x, this.y, this.z);\n                  ve.x = Math.max(ve.x, n);\n                  ve.y = Math.max(ve.y, n);\n                  ve.z = Math.max(ve.z, n);\n                  return ve;\n          }\n  } \n     \n     \n     \n     function createShader(gl, type, source) {\n    const shader = gl.createShader(type);\n    gl.shaderSource(shader, source);\n    gl.compileShader(shader);\n   \n    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n        console.log(gl.getShaderInfoLog(shader));\n    }\n   \n    return shader;\n}\nfunction createProgram(gl, vs, fs) {\n    const program = gl.createProgram();\n    gl.attachShader(program, vs);\n    gl.attachShader(program, fs);\n    gl.linkProgram(program);\n   \n    return program;\n}\n\n\n\n     \n  \n  const skyboxCanvas = document.getElementById('skybox'),\n        gl2 = skyboxCanvas.getContext('webgl2');\n   \n    const vertexSource2 = document.getElementById('vertex-skybox').textContent,\n        fragmentSource2 = document.getElementById('fragment-skybox').textContent;\n   \n    const vertexShader2 = createShader(gl2, gl2.VERTEX_SHADER, vertexSource2),\n        fragmentShader2 = createShader(gl2, gl2.FRAGMENT_SHADER, fragmentSource2);\n   \n    const program2 = createProgram(gl2, vertexShader2, fragmentShader2);\n   \n    const aPosition2 = gl2.getAttribLocation(program2, 'aPosition')\n    const drawx2 = gl2.getUniformLocation(program2, \"drawx\");\n    const drawy2 = gl2.getUniformLocation(program2, \"drawy\");\n   const iTime2 = gl2.getUniformLocation(program2, \"iTime\");\n   const iChannel02 = gl2.getUniformLocation(program2,\"iChannel0\");\n   \n    const positions = new Float32Array([-1, -1, -1, 3, 3, -1]);\n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n\n\n    const glBloom = document.getElementById('bloom'),\n        gl3 = glBloom.getContext('webgl2');\n  \n    const vertexSource3 = document.getElementById('vertex-bloom').textContent,\n        fragmentSource3 = document.getElementById('fragment-bloom').textContent;\n   \n    const vertexShader3 = createShader(gl3, gl.VERTEX_SHADER, vertexSource3),\n        fragmentShader3 = createShader(gl3, gl.FRAGMENT_SHADER, fragmentSource3);\n   \n    const program3 = createProgram(gl3, vertexShader3, fragmentShader3);\n    const camAng2 = gl.getUniformLocation(program3, \"cameraAngle\");\n    const aPosition3 = gl3.getAttribLocation(program3, 'aPosition')\n    const drawx = gl3.getUniformLocation(program3, \"drawx\");\n    const drawy = gl3.getUniformLocation(program3, \"drawy\");\n   const iTime = gl3.getUniformLocation(program3, \"iTime\");\n   const cli = gl3.getUniformLocation(program3, \"clicked\");\n   const iChannel03 = gl3.getUniformLocation(program3,\"iChannel0\");\n   let texture03 = gl3.createTexture();\n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \nvar now;\n\nvar then = performance.now();\n\nvar fps = 40;\n\nvar delta;\nvar player=new Vector(-400,-400,500);\nvar playerVels=new Vector(0,0,0);\nvar frameCount=0;\nvar interval = 1000 / fps;\nvar pts=[];\n\n   var canvas2 = document.getElementById('my_Canvas'), ctx = canvas2.getContext('2d');\n      var canvas3 = document.getElementById('anvas'), ctx2 = canvas3.getContext('2d');\n   var texCanvas=new OffscreenCanvas(1024,1024);\n   var tx=texCanvas.getContext('2d');\n   \n\n//console.log(heightMap);\n     vertices = [  ]; \n    var rays=[];\n     \n    const iTimet = gl.getUniformLocation(shaderProgram, \"iTime\");\n     const dopts = gl.getUniformLocation(shaderProgram, \"dopts\");\n    const camAng = gl.getUniformLocation(shaderProgram, \"cameraAngle\");\n    const glPlayer = gl.getUniformLocation(shaderProgram, \"playerPosition\");\n\n        const posBuffer2 = gl2.createBuffer();\n        gl2.bindBuffer(gl.ARRAY_BUFFER, posBuffer2);\n        gl2.bufferData(gl.ARRAY_BUFFER, positions, gl2.STATIC_DRAW);\n       \n        gl.viewport(0, 0, 512, 512);\n            gl2.viewport(0, 0, 512, 512);\n gl2.vertexAttribPointer(aPosition2, 2, gl2.FLOAT, false, 0, 0);\n   gl2.useProgram(program2);\n    gl2.enableVertexAttribArray(aPosition2);\n       \n       \n       \n       \n          const posBuffer3 = gl3.createBuffer();\n        gl3.bindBuffer(gl3.ARRAY_BUFFER, posBuffer3);\n        gl3.bufferData(gl3.ARRAY_BUFFER, positions, gl3.STATIC_DRAW);\n       \n        gl3.viewport(0, 0, 512, 512);\n        gl3.clearColor(0, 0, 0, 1);\n      gl3.useProgram(program3);\n      \n        gl3.enableVertexAttribArray(aPosition3);\n       \n       \n      \n        gl3.vertexAttribPointer(aPosition3, 2, gl.FLOAT, false, 0, 0);\n        gl3.activeTexture(gl3.TEXTURE0);\n        gl3.bindTexture(gl3.TEXTURE_2D, texture03);\n    gl3.uniform1i(iChannel03, 0);\n    gl3.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\n    gl3.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\n    gl3.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);\n    gl3.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR_MIPMAP_LINEAR);\n\nvar bob=0;\n function text(t,x,y,th,s){\n\n    var texts=[];\n    for(var i=0;i<50;i++){\n    var g=Math.min(t.indexOf(\"#\"),t.indexOf(\" \",th));\n    if(g<0){\n        break;\n    }\n    texts.push(t.substring(0,g));\n    t=t.substring(g+1,t.length);\n    }\n    for(var i=0;i<texts.length;i++){\n    ctx2.fillText(texts[i],x,y+i*s);\n}\n}\n\n\nvar part=[{name: 'Yokiebob', kaid: 'kaid_681887786554114354822051',team: 'Echolite',level: 3,points: [0,0,0,0,0,0],},\n                {name: 'The Former Wizard of Oz', kaid: 'kaid_981854986090143486946241',team: 'Echolite',level: 2,points: [0,0,0,0,0,0],},\n                {name: 'Hokeycat', kaid: 'kaid_438466413527508491816275',team: 'Echolite',level: 3,points: [0,0,0,0,0,0],},\n                {name: 'cwalsh1223', kaid: 'kaid_792288208072906614241148',team: 'Foxin',level: 2,points: [0,0,0,0,0,0],},\n                {name: 'Snacker Davis', kaid: 'kaid_889584744100087037395082',team: 'Delfin',level: 2,points: [0,0,0,0,0,0],},\n                {name: 'Animator101', kaid: 'kaid_457601383838709034574070',team: 'Delfin',level: 3,points: [0,0,0,0,0,0],},\n                {name: 'Bearkirb🐻', kaid: 'kaid_375460112550893828689953',team: 'Delfin',level: 3,points: [0,0,0,0,0,0],},\n                {name: 'ThatWhiteGuy364', kaid: 'kaid_28223980167834269747078',team: 'Foxin',level: 1,points: [0,0,0,0,0,0],},\n                {name: 'awesomeorion', kaid: 'kaid_1141658061792924357651232',team: 'Echolite',level: 3,points: [0,0,0,0,0,0],},\n                {name: 'Xatnys', kaid: 'kaid_3144599174897393521218325',team: 'Echolite',level: 3,points: [0,0,0,0,0,0],},\n                {name: 'sugarnlight', kaid: 'kaid_516497598968512440616556',team: 'Foxin',level: 1,points: [0,0,0,0,0,0],},\n                {name: '~The Wolf~', kaid: 'kaid_6337778158362361978377342',team: 'Delfin',level: 2,points: [0,0,0,0,0,0],},\n                {name: 'Karthikeya K', kaid: 'kaid_6258990316746013677705461',team: 'Echolite',level: 0,points: [0,0,0,0,0,0],},\n                {name: 'Obi the khan', kaid: 'kaid_876032364742717594084879',team: 'Echolite',level: 1,points: [0,0,0,0,0,0],},\n                {name: 'LeaferStudios', kaid: 'kaid_553656479258879622339276',team: 'Foxin',level: 4,points: [0,0,0,0,0,0],},\n                {name: 'ASBackup', kaid: 'kaid_714780036830891967670231',team: 'Delfin',level: 3,points: [0,0,0,0,0,0],},\n                {name: 'Pineapples', kaid: 'kaid_6104902828627300552146889',team: 'Delfin',level: 3,points: [0,0,0,0,0,0],}];\n                var programs=[{image: document.getElementById('program1'),link:\"https://www.khanacademy.org/computer-programming/spin-off-of-uwqpiuwoqriopuweiowqoouqwr/5027325495132160\"},{image: document.getElementById('program2'),link:\"https://www.khanacademy.org/computer-programming/the-code-wars-2024/5451301379817472\"}];\n               var cors=0;\n                var cpos=0;\n                 var cvel=0;\n                 var batt=0;\n                 var charging=false;\nvar drawl=function() {\n           window.requestAnimationFrame(drawl);\nnow = performance.now();\n\n    delta = now - then;\n  \n    if (delta > interval) {\n        \n        then = now - (delta % interval);\n     \n     \n        frameCount+=10.\n        thetaz=-(mouseX-300)/220;\n    thetax=-(mouseY-300)/240;\n           if(thetax<-Math.PI/2){\n             thetax=-Math.PI/2;\n         }\n             if(thetax>Math.PI/2){\n             thetax=Math.PI/2;\n         }\n  \n        //   \n\n \n//gl.uniform2f(camAng, -frameCount/250+3.1415/2+thetaz/2,thetax/2-0.5); \ngl.uniform3f(glPlayer, player.x/100,-player.z/100,-player.y/100);\n//gl.uniform3f(glPlayer, Math.cos(frameCount/250)*29*(Math.sin(frameCount/1000)*0.35+0.65),59*(Math.sin(frameCount/1000)*0.1+0.9),Math.sin(frameCount/250)*29*(Math.sin(frameCount/1000)*0.35+0.65)+2);\nframeCount+=1;\n //   ctx.fillStyle=\"rgb(2,2,2,1)\"\n      ctx.fillStyle=\"rgb(2,10,20)\"\n   ctx.clearRect(0,0,512,512);\n  //        gl3.clear(gl.COLOR_BUFFER_BIT);\n     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);\n        gl3.uniform1f(drawx, mouseX/600-1.0);\n gl3.uniform1f(drawy, mouseY/600-1.0);\n gl2.uniform1f(drawx2, thetaz);\n gl2.uniform1f(drawy2, thetax);\n gl2.uniform1f(iTime2, frameCount);\n gl3.uniform2f(camAng2, thetaz,thetax); \n  gl2.uniform2f(camAng2, thetaz,thetax); \n    //gl.drawArrays(gl.TRIANGLES, 0, (vertices.length/3));\n    gl.uniform1f(dopts, 1);\n  //       gl.drawArrays(gl.POINTS, 0, (vertices.length/3));\n     playerVels=playerVels.scale(0.7);\n player=player.add(playerVels);\n\n//ctx.drawImage(canvas,0,0,512,512);\n     gl2.drawArrays(gl.TRIANGLES, 0, 3);\n       \n        ctx.drawImage(skyboxCanvas, 0, 0);\n        ctx.lineWidth=15.0;\nctx.fillStyle=\"rgb(20,40,70)\"\nctx.font=\"120px DynaPuff\"\nctx.strokeText(\"Delfin\",80+(8000/(frameCount)),350-(1000/(frameCount))+Math.sin(frameCount/300)*5)\nctx.fillText(\"Delfin\",80+(8000/(frameCount)),350-(1000/(frameCount))+Math.sin(frameCount/300)*5)\nctx.fillStyle=\"rgb(42,44,46)\"\nctx.font=\"80px Fira Code\"\nctx.strokeText(\"Team\",90-(8000/(frameCount)),230+(1000/(frameCount))+Math.cos(frameCount/300)*5)\nctx.fillText(\"Team\",90-(8000/(frameCount)),230+(1000/(frameCount))+Math.cos(frameCount/300)*5)\n    gl3.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas2);\n    gl3.generateMipmap(gl.TEXTURE_2D);\n      \n  gl3.drawArrays(gl.TRIANGLES, 0, 3);\n\n \n   ctx.drawImage(glBloom, 0,0,512,512);\n   ctx.fillStyle=\"rgb(35,65,95)\"\n   ctx.font=\"80px Source Code Pro\"\n   ctx.fillText(\"V\",235,500)\n   ctx2.fillStyle=\"rgb(245,250,255)\";\n   ctx2.fillRect(0,0,1200,2800);\n ctx2.fillStyle=\"rgb(30,40,50)\"\n ctx2.font=\"80px DynaPuff\"\n ctx2.fillText(\"About:\",60,100);\n ctx2.font=\"40px Fira Code\"\ntext(\"As our team mascot suggesets, we aim to be the most intelligent individuals in our environment: the Code Wars battlefield. By staying on the frontier of programming we aim to snatch that luscious prize of bragging rights from our competition.    asdfasdas asdf asdf #\",60,200,39,70)\n\n ctx2.font=\"80px DynaPuff\"\n ctx2.fillText(\"The Team:\",60,750);\n ctx2.font=\"40px Fira Code\"\n  ctx2.fillText(\"(In no particular order)\",480,750);\n var count=0;\n for(var i=0;i<part.length;i++){\n     if(part[i].team==\"Delfin\"){\n         ctx2.fillStyle=\"rgb(20,\"+(20+part[i].level*40)+\",\"+(40+part[i].level*80)+\",0.5)\"\n         ctx2.fillRect(50,850+count*70-50,1100,70);\n          ctx2.fillStyle=\"rgb(30,40,50)\"\n ctx2.fillText(part[i].name+\" - Level \"+part[i].level+\" - Points: \"+part[i].points.reduce((partialSum, a) => partialSum + a, 0),60,850+count*70);\n count++;\n     }\n    }\n     ctx2.font=\"80px DynaPuff\"\n ctx2.fillText(\"Programs:\",60,1400);\n ctx2.font=\"40px Fira Code\"\n  ctx2.fillStyle=\"rgb(30,40,50,0.2)\"\nctx2.fillRect(200,1480,800,440);\n for(var i=0;i<programs.length;i++){\n     if(cors>0){\n  ctx2.drawImage(programs[i].image,400+i*450+((i-cpos)),1500,400,400);\n     }\n    }\n      ctx2.fillStyle=\"rgb(245,250,255)\";\n    ctx2.fillRect(0,1480,100,440);\n    ctx2.fillRect(1100,1480,100,440);\n    ctx2.fillStyle=\"rgb(30,40,50)\"\n     ctx2.fillRect(100,1480,100,440);\n     ctx2.fillRect(1000,1480,100,440);\n       ctx2.fillStyle=\"rgb(245,250,255)\";\n     ctx2.fillText(\"<\",135,1720);\n     ctx2.fillText(\">\",1200-155,1720);\n     if(mouseX*2>1000&&mouseX*2<1100&&mouseY>1342&&mouseY<1560&&clickToggle){\n         cvel+=55;\n     }\n     if(mouseX*2>100&&mouseX*2<200&&mouseY>1342&&mouseY<1560&&clickToggle){\n         cvel-=55;\n     }\n    if(cpos<-50){\n        cvel+=-cpos/20;\n        cvel*=0.8;\n    }\n    if(cpos>(programs.length-1)*450+50){\n        cvel+=((programs.length-1)*450-cpos)/20;\n        cvel*=0.8;\n    }\n     cvel-=Math.sin((cpos*3.1415*2)/450)/1;\n         cvel*=0.9;\n     cpos+=cvel;\n    \n document.getElementById(\"asdf\").href=programs[~~((cpos+450/2)/450)].link;\n  ctx2.fillStyle=\"rgb(30,40,50)\"\n   ctx2.font=\"40px DynaPuff\"\n ctx2.fillText(\"Fake Doxxing Time:\",60,2200);\n ctx2.font=\"16px Fira Code\"\n ctx2.fillText(\"Device Info:\",60,2270);\n ctx2.fillText(navigator.appVersion,60,2300);\n ctx2.fillText(\"Internet type: \"+ navigator.connection.effectiveType,60,2370);\n ctx2.fillText(\"Suspected Primary Browser: \"+ navigator.userAgentData.brands[0].brand+\" version \"+navigator.userAgentData.brands[0].version,60,2440);\n  ctx2.fillText(\"Battery Info: Percentage - \"+(batt*100)+\"%, Charging? \"+charging,60,2510);\n navigator.getBattery().then(data => {batt=data.level;charging=data.charging});\n for(var i=0;i<Math.min(frameCount/1000,12);i++){\n     if(cors>0.0){\n         \n     \nctx2.drawImage(document.getElementById(\"funny\"),Math.abs(((frameCount+i*100)%2200)-1100),2700-50*Math.abs(Math.sin((frameCount+i*100)/100)),100,100)\n}\n}\n pmouseX = mouseX;\n    pmouseY= mouseY\n    clickToggle=false;\n    click=false;\n    \n    \n}\n}\ndrawl();\n\n\n//add chaos decagon in background later\n\n//<script>\n   \n\n</script> \n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Edu+AU+VIC+WA+NT+Hand:wght@400..700&family=Fira+Code:wght@300..700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap\" rel=\"stylesheet\">\n</html>\n",
    "title": "Team Delphin Homepage",
    "votes": 34,
    "created": "18 hours ago",
    "updated": "12 hours ago",
    "type": "HTML",
    "author": {
        "name": "Bearkirb314🐻‍❄️",
        "id": "kaid_375460112550893828689953",
        "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
    },
    "dimensions": {
        "width": 600,
        "height": 600
    },
    "forks": [
        {
            "title": "Spin-off of \"for code\"",
            "id": "5780728642977792",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "",
                "id": "kaid_6747699861882953241710551"
            }
        },
        {
            "title": "Spin-off of \"Team Delphin Homepage\"",
            "id": "5945887600590848",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "",
                "id": "kaid_6747699861882953241710551"
            }
        },
        {
            "title": "Spin-off of \"I am actually doing this just for the DOXXING THINGGG\"",
            "id": "5963642374635520",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "3DA Games",
                "id": "kaid_46113533788750322324717"
            }
        }
    ],
    "posts": {
        "tips": [
            {
                "replyCount": 0,
                "votes": 17,
                "date": "18 hours ago",
                "author": {
                    "name": "Bearkirb314🐻‍❄️",
                    "id": "kaid_375460112550893828689953",
                    "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                },
                "text": "<b>Potential future chat thread</b>, keep this at the top!  Also no peeking if you're not delfin lol.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 2,
                "date": "14 hours ago",
                "author": {
                    "name": "That One Guy ME",
                    "id": "kaid_3823720261811268848400557",
                    "avatar": "/images/avatars/svg/duskpin-seed.svg"
                },
                "text": "Somebody: I wish someone had a plaza<br>Team Delfin:",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 2,
                "date": "14 hours ago",
                "author": {
                    "name": "That One Guy ME",
                    "id": "kaid_3823720261811268848400557",
                    "avatar": "/images/avatars/svg/duskpin-seed.svg"
                },
                "text": "The title is spelled different than the logo.<br>Also you have 289 unnecessary blank lines, not counting comments",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 2,
                "date": "12 hours ago",
                "author": {
                    "name": "Cheesecake Programming",
                    "id": "kaid_4977756849462380705743011",
                    "avatar": "/images/avatars/svg/cs-winston.svg"
                },
                "text": "No PlEAsE STOp DOxxIng ME! I can't let anyone else know my computer battery percentage (3 lol, should prolly charge it)<br><br>I love the homepage though, the bouncing emojis are very... interesting. Also, I have no idea why my computer is not using 5g...",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "17 hours ago",
                "author": {
                    "name": "Duke",
                    "id": "kaid_351465532815782433620675",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "Sweet job man. And Already lol.<br><br>lets be honest though...<br>those emojis are the best part lol<br><br>I actually like the top part the best.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "17 hours ago",
                "author": {
                    "name": "bumblebee",
                    "id": "kaid_428042503354583289176484",
                    "avatar": "/images/avatars/svg/scuttlebug-blue.svg"
                },
                "text": "woahhh as a fellow delfin creating a possible homepage, i'm realizing i have no chance with yours as competition :p glad to have you on the team, this is amazing!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "14 hours ago",
                "author": {
                    "name": "sugarnlight",
                    "id": "kaid_516497598968512440616556",
                    "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                },
                "text": "nice job! I love the interactivity :)",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "11 hours ago",
                "author": {
                    "name": "fi-erhyd§ / TheSerpent3",
                    "id": "kaid_596027547310293525018296",
                    "avatar": "/images/avatars/svg/piceratops-ultimate.svg"
                },
                "text": "What's this for?",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "10 minutes ago",
                "author": {
                    "name": "𝕜𝕚𝕒𝕒𝕟𝕥𝕠𝕝𝕚𝕒",
                    "id": "kaid_706406430552760652245376",
                    "avatar": "/images/avatars/svg/cacteye-yellow.svg"
                },
                "text": "the computer thing scared me 😭😭<br><br>when i unplugged and replugged it for real changed. great calculations.<br><br>is using <code>navigator</code> allowed on ka? Never thought it was, but correct me if i am wrong",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "17 hours ago",
                "author": {
                    "name": "//I'M BOB ;)...(FYI I'm online)",
                    "id": "kaid_7500540694222150489044752",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "11th nice job",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "18 hours ago",
                "author": {
                    "name": "cwalsh1223 BBB#",
                    "id": "kaid_792288208072906614241148",
                    "avatar": "/images/avatars/svg/spunky-sam-red.svg"
                },
                "text": "Nice homepage. I like the bouncing emojis at the bottom.<br>votes++ (even though i'm a foxin member)",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 5,
                "votes": 1,
                "date": "18 hours ago",
                "author": {
                    "name": "SwankyMan™",
                    "id": "kaid_82898098000024228278987",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "Yes! first!<br><br>Nice page!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "18 hours ago",
                        "author": {
                            "name": "Bearkirb314🐻‍❄️",
                            "id": "kaid_375460112550893828689953",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "Bro that was like 5 seconds."
                    },
                    {
                        "date": "18 hours ago",
                        "author": {
                            "name": "SwankyMan™",
                            "id": "kaid_82898098000024228278987",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Hmmmmmm... New record?"
                    },
                    {
                        "date": "18 hours ago",
                        "author": {
                            "name": "SwankyMan™",
                            "id": "kaid_82898098000024228278987",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "6 votes already."
                    },
                    {
                        "date": "17 hours ago",
                        "author": {
                            "name": "//I'M BOB ;)...(FYI I'm online)",
                            "id": "kaid_7500540694222150489044752",
                            "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                        },
                        "text": "record for sure"
                    },
                    {
                        "date": "17 hours ago",
                        "author": {
                            "name": "//I'M BOB ;)...(FYI I'm online)",
                            "id": "kaid_7500540694222150489044752",
                            "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                        },
                        "text": "literally says updated 25 minutes ago and this says 26 minutes ago"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "13 hours ago",
                "author": {
                    "name": "Falling Dragon™️",
                    "id": "kaid_922990378162047462529587",
                    "avatar": "/images/avatars/svg/leaf-blue.svg"
                },
                "text": "good job, as expected!",
                "locked": false,
                "pinned": false,
                "replies": []
            }
        ],
        "questions": []
    }
}