var json = {
    "code": "<!DOCTYPE html>\n<html>\n<title>Godrays on a floating shack</title>\n<canvas id = \"m\" width = '600' height = '600'></canvas>\n<canvas width = \"600\" height = \"600\" id = \"my_Canvas\"></canvas>\n<canvas width = \"600\" height = \"600\" id = \"skybox\"></canvas>\n<canvas width = \"600\" height = \"600\" id = \"bloom\"></canvas>\n<script id=\"ob\" src='https://cdn.jsdelivr.net/gh/Bearkirb/sponzaModel@35b8854e0fffe0af336e717c68138defd812e6d7/shackModel.js'></script>\n<script src='https://cdn.jsdelivr.net/npm/obj-file-parser@0.6.2/dist/OBJFile.min.js'></script>\n\n\n<style>\n*{\nmargin:0px;  \noverflow:hidden;\n   width:600px;\n}\n#m{\n    display:none;\n}\n#skybox{\n    display:none;\n}\n#bloom{\n    display:none;\n}\ncanvas{\n    width:600px;\n}\n</style>\n\n\n\n\n <script id = 'vertex-bloom' type = 'glsl'>#version 300 es\n   in vec2 aPosition;\nout vec2 pos;\nprecision mediump float;\nvoid main() {\n    pos = aPosition;\n    gl_Position = vec4(aPosition, 0, 1);\n}\n\n    </script>\n    <script>\n\n    </script>\n    <script id = 'fragment-bloom' type = 'glsl'>#version 300 es\nprecision lowp sampler2D;\nuniform sampler2D iChannel0;\nprecision mediump float;\nuniform vec2 u_resolution;\nuniform float drawx;\nuniform float drawy;\nuniform float clicked;\nuniform float iTime;\nuniform vec2 cameraAngle;\n\n\n\nout vec4 fragColor;\nvec2 Rotate(vec2 uv,float ang){\n    return vec2(uv.x*cos(ang)-uv.y*sin(ang),uv.x*sin(ang)+uv.y*cos(ang));\n}\nvec2 crt(vec2 coord, float bend){\n\t// put in symmetrical coords\n\tcoord = (coord - 0.5) * 2.0;\n\n\tcoord *= 1.1;\t\n\n\t// deform coords\ncoord=Rotate(coord,bend*pow(length(coord),2.0));\n\n\t// transform back to 0.0 - 1.0 space\n\tcoord  = (coord / 2.2) + 0.5;\n\n\treturn coord;\n}\n\n#define M1 1597334677U     //1719413*929\n#define M2 3812015801U     //140473*2467*11\n\nfloat hash( uvec2 q )\n{\n    q *= uvec2(M1, M2); \n    \n    uint n = (q.x ^ q.y) * M1;\n    \n    return float(n) * (1.0/float(0xffffffffU));\n}\nvec4 textur(vec2 uv){\n  vec2 ruv=uv;\n  \n    return texture(iChannel0,ruv);\n}\nfloat random (in vec2 _st) {\n    return fract(sin(dot(_st.xy,\n                         vec2(12.9898,78.233)))*\n        43758.5453123);\n}\nvec4 photoshop_desaturate(vec3 color, float factor)\n{\n\tvec3 lum = vec3(0.299, 0.587, 0.114);\n\tvec3 gray = vec3(dot(lum, color));\n\treturn vec4(mix(color, gray, factor), 1.0);\n}\nfloat sin2(float x){\n    return cos(x)<0.0?(sin(x)>0.0?-1.0:1.0):sin(x);\n}\nvec3 aces_tonemap(vec3 color){\t\n\tmat3 m1 = mat3(\n        0.59719, 0.07600, 0.02840,\n        0.35458, 0.90834, 0.13383,\n        0.04823, 0.01566, 0.83777\n\t);\n\tmat3 m2 = mat3(\n        1.60475, -0.10208, -0.00327,\n        -0.53108,  1.10813, -0.07276,\n        -0.07367, -0.00605,  1.07602\n\t);\n\tvec3 v = m1 * color;    \n\tvec3 a = v * (v + 0.0245786) - 0.000090537;\n\tvec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;\n\treturn pow(clamp(m2 * (a / b), 0.0, 1.0), vec3(1.0 / 2.2));\t\n}\nvoid main() {\n\n    vec2 fragCoord = gl_FragCoord.xy;\n    vec2 iMouse = vec2(drawx,drawy);\n    vec2 iResolution = vec2(600.0,600.0);\n    vec2 res = iResolution.xy;\n    vec2 uv=(fragCoord/res);\n   uv.y=1.0-uv.y;\n        fragColor.rgba = textur(uv).rgba;\n\n\n\n   \n    \n     \n      // fragColor.rgb=mix(fragColor.rgb,((fragColor.rgb+1.0)/2.0)*vec3(0.05,0.06,0.3),pow(distance(uv*8.0,vec2(0.5*8.0,0.5*8.0)),2.0)/200.0+0.3);\n       vec3 som=vec3(0.0);\n       float aca=0.0;\n       float accum=0.0;\n  \n              for(float x=0.01;x<20.0;x+=1.0){\n                  float ang=random(uv+0.5*x)*3.1415*2.0;\n     vec2 off=vec2(sin(ang),cos(ang));\n     off*=pow(random(uv+x),5.0)*0.08;\n    \n           vec4 he = texelFetch(iChannel0,ivec2((uv-off)*600.0),0).rgba;\n           if(fragColor.a>0.01&&he.a>0.01){\n          aca+=pow(max(he.a-fragColor.a-random(uv)*0.002,-0.01),0.9)*1.15;\n           }\n          if(length(he.rgb)>0.5){\n     //  fragColor.rgb=mix(fragColor.rgb,he.rgb*0.01/(dot(off,off)+0.01),0.03*pow(length(he.rgb)/1.0,2.0));\n      \n          }\n         \n}\n\n        \n     fragColor.rgb*=1.0-clamp(vec3(aca),0.0,1.0);\n  \n\nvec2 p=uv;\n vec2 m=vec2(tan(drawx/2.0),tan((drawy-0.197)/2.0))*1.2+0.5;\n  float siz=1.0;\n  vec3 c = vec3(0.0);\n float div=200.0;\n  for(int i=0;i<20;i++){\n  siz*=0.89-(hash(uvec2((p+vec2(i))*vec2(600.0)))*0.08);\n  vec4 ad=texelFetch(iChannel0,ivec2((((1.0*p-(m))*siz)+(m))*600.0),0).rgba;\n  if(ad.a<0.01){\nc+=0.02;\n}\n}\n vec4 ad=texture(iChannel0,uv).rgba;\n\n\n\nfragColor.rgb=mix(fragColor.rgb,vec3(0.2),1.0-fragColor.a);\nfragColor.rgb+=c*vec3(1.0,0.8,0.5);\nif(ad.a<0.01){\nfragColor.rgb+=0.01/distance(uv,m);\n}\n    fragColor.rgb*=1.0;\n    uv *=  1.0 - uv.yx;   \n    \n       float vig = uv.x*uv.y * 100.0; // multiply with sth for intensity\n    \n    vig = pow(vig, 0.15); // change pow for modifying the extend of the  vignette\n\n    fragColor.rgb*=vig*0.5+0.5;\n    fragColor.rgb=aces_tonemap(fragColor.rgb);\n    fragColor.a=(ad.a<0.01)?0.0:1.0;\n}\n\n  \n\n    </script>\n\n    <script id = 'vertex-skybox' type = 'glsl'>#version 300 es\n   in vec2 aPosition;\nout vec2 pos;\nprecision mediump float;\nvoid main() {\n    pos = aPosition;\n    gl_Position = vec4(aPosition, 0, 1);\n}\n\n    </script>\n    <script>\n\n    </script>\n    <script id = 'fragment-skybox' type = 'glsl'>#version 300 es\nprecision mediump sampler2D;\nuniform sampler2D iChannel0;\nprecision mediump float;\nuniform vec2 u_resolution;\nuniform float drawx;\nuniform float drawy;\n\nuniform float iTime;\n\nvoid Rotate( inout vec3 vector, vec2 angle )\n{\n\tvector.yz = cos(angle.y)*vector.yz\n\t\t\t\t+sin(angle.y)*vec2(-1,1)*vector.zy;\n\tvector.xz = cos(angle.x)*vector.xz\n\t\t\t\t+sin(angle.x)*vec2(-1,1)*vector.zx;\n}\n    vec2 hash( vec2 p ) \n{\n\tp = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );\n\treturn -1.0 + 2.0*fract(sin(p)*43758.5453123);\n}\n\nfloat noise( in vec2 p )\n{\n    const float K1 = 0.366025404; // (sqrt(3)-1)/2;\n    const float K2 = 0.211324865; // (3-sqrt(3))/6;\n\n\tvec2  i = floor( p + (p.x+p.y)*K1 );\n    vec2  a = p - i + (i.x+i.y)*K2;\n    float m = step(a.y,a.x); \n    vec2  o = vec2(m,1.0-m);\n    vec2  b = a - o + K2;\n\tvec2  c = a - 1.0 + 2.0*K2;\n    vec3  h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );\n\tvec3  n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));\n    return dot( n, vec3(70.0) );\n}\nfloat fbm(vec2 v){\n    v/=6.0;\nfloat ou=0.0;\nfloat mult=1.0;\nfor(int i=0;i<3;i++){\nmult*=2.71;\nou+=noise(v*mult+1000.0*hash(vec2(float(i))).x)/mult;\n}\nreturn ou/1.2+0.6;\n}\n\n        vec3 sky(in vec3 ro, in vec3 rd){\n            \n            rd = -rd;\n            const float SC = 1e5;\n        \n         \t// Calculate sky plane\n            float dist = (SC) / rd.y; \n            vec2 p = (dist * rd).xz;\n            p *= 1.2 / SC;\n            \n            // from iq's shader, https://www.shadertoy.com/view/MdX3Rr\n            vec3 lightDir = normalize(vec3(0.0,200.0,-1000.0));\n            float sundot = clamp(dot(rd, lightDir), 0.0, 1.0);\n            \n            vec3 cloudCol = vec3(1.);\n            vec3 skyCol = vec3(.6, .71, .85) - rd.y * .2 * vec3(1., .5, 1.) + .15 * .5;\n            //vec3 skyCol = vec3(0.3,0.5,0.85) - rd.y*rd.y*0.5;\n            skyCol = mix( skyCol, 0.85 * vec3(0.7,0.75,0.85), pow( 1.0 - max(rd.y, 0.0), 4.0 ) );\n            \n            // sun\n            vec3 sun = 0.25 * vec3(1.0, 0.7, 0.4) * pow(sundot, 5.0);\n            sun += 0.25 * vec3(1.0, 0.8, 0.6) * pow(sundot, 64.0);\n            sun += 0.2 * vec3(1.0, 0.8, 0.6) * pow(sundot, 512.0);\n            skyCol += sun;\n            \n            // clouds\n            float t = iTime * 0.0005;\n            float den = fbm(vec2(p.x - t, p.y - t));\n            skyCol = mix( skyCol, cloudCol, smoothstep(.4, .8, den));\n            \n            // horizon\n            skyCol = mix( skyCol, 0.68 * vec3(.418, .394, .372), pow( 1.0 - max(rd.y, 0.0), 16.0 ) );\n            \n            return skyCol;\n        }\n        \nout vec4 fragColor;\nvoid main() {\n\n    vec2 fragCoord = gl_FragCoord.xy;\n    vec2 iMouse = vec2(drawx,drawy);\n    vec2 iResolution = vec2(600.0,600.0);\nvec2 res = iResolution.xy;   //View resolution\n    \n    vec3 cam = vec3(0.0,0.0,-3.0),         //Camera position\n    pos = cam,                                          //Pixel position\n    ray = normalize(vec3(fragCoord*2.0 - res, res.y/1.1)),  //Ray direction\n   \n    cell = vec3(0,0,0);  \n   \n       \nvec2 angle = (iMouse.xy)*vec2(1.0,-1.0);\n\tRotate(pos,angle);\n \n\tRotate(ray,angle);\n\tRotate(cam,angle*(iTime*0.0+1.0));\n\n  \n\tvec3 background = vec3(0.002);\t\nbackground=sky(vec3(0.0),ray*vec3(1.0,-1.0,1.0))*0.3;\n  \n       fragColor = vec4(background,1);\n  \n}\n\n    </script>\n\n\n\n\n\n\n\n\n\n\n\n\n<script id = 'vertex-shader' type = 'glsl'>#version 300 es\nin vec3 coordinates;\nin vec3 normal;\nprecision mediump float;\nprecision lowp sampler2D;\nuniform sampler2D iChannel0;\nuniform float iTime;\nuniform vec2 cameraAngle;\nuniform vec3 playerPosition;\nout vec3 pos;\n\nvoid CamRotate(inout vec3 vector, vec2 angle) {\n    angle.y*=-1.0;\n    vector.xz =\n            cos(angle.x) * vector.xz + sin(angle.x) * vec2(-1, 1) * vector.zx;\n        vector.yz =\n            cos(angle.y) * vector.yz + sin(angle.y) * vec2(-1, 1) * vector.zy;\n        \n}\nvoid Rotate(inout vec3 vector, vec2 angle) {\n        vector.yz =\n            cos(angle.y) * vector.yz + sin(angle.y) * vec2(-1, 1) * vector.zy;\n        vector.xz =\n            cos(angle.x) * vector.xz + sin(angle.x) * vec2(-1, 1) * vector.zx;\n}\n\nvec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nvec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nvec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }\n\n//\n// Description : GLSL 2D simplex noise function\n//      Author : Ian McEwan, Ashima Arts\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License :\n//  Copyright (C) 2011 Ashima Arts. All rights reserved.\n//  Distributed under the MIT License. See LICENSE file.\n//  https://github.com/ashima/webgl-noise\n//\nfloat noise(vec2 v) {\nv/=4.0;\n    // Precompute values for skewed triangular grid\n    const vec4 C = vec4(0.211324865405187,\n                        // (3.0-sqrt(3.0))/6.0\n                        0.366025403784439,\n                        // 0.5*(sqrt(3.0)-1.0)\n                        -0.577350269189626,\n                        // -1.0 + 2.0 * C.x\n                        0.024390243902439);\n                        // 1.0 / 41.0\n\n    // First corner (x0)\n    vec2 i  = floor(v + dot(v, C.yy));\n    vec2 x0 = v - i + dot(i, C.xx);\n\n    // Other two corners (x1, x2)\n    vec2 i1 = vec2(0.0);\n    i1 = (x0.x > x0.y)? vec2(1.0, 0.0):vec2(0.0, 1.0);\n    vec2 x1 = x0.xy + C.xx - i1;\n    vec2 x2 = x0.xy + C.zz;\n\n    // Do some permutations to avoid\n    // truncation effects in permutation\n    i = mod289(i);\n    vec3 p = permute(\n            permute( i.y + vec3(0.0, i1.y, 1.0))\n                + i.x + vec3(0.0, i1.x, 1.0 ));\n\n    vec3 m = max(0.5 - vec3(\n                        dot(x0,x0),\n                        dot(x1,x1),\n                        dot(x2,x2)\n                        ), 0.0);\n\n    m = m*m ;\n    m = m*m ;\n\n    // Gradients:\n    //  41 pts uniformly over a line, mapped onto a diamond\n    //  The ring size 17*17 = 289 is close to a multiple\n    //      of 41 (41*7 = 287)\n\n    vec3 x = 2.0 * fract(p * C.www) - 1.0;\n    vec3 h = abs(x) - 0.5;\n    vec3 ox = floor(x + 0.5);\n    vec3 a0 = x - ox;\n\n    // Normalise gradients implicitly by scaling m\n    // Approximation of: m *= inversesqrt(a0*a0 + h*h);\n    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);\n\n    // Compute final noise value at P\n    vec3 g = vec3(0.0);\n    g.x  = a0.x  * x0.x  + h.x  * x0.y;\n    g.yz = a0.yz * vec2(x1.x,x2.x) + h.yz * vec2(x1.y,x2.y);\n    return 130.0 * dot(m, g);\n}\nfloat sabs(float x){\nreturn sqrt(x*x+0.2);\n}\nfloat n(vec2 uv){\nreturn pow(1.0-sabs(noise(uv)),2.0);\n}\n\nfloat fbm(vec2 uv){\nfloat o=0.0;\nfloat mult=1.0;\nfor(int i=0;i<4;i++){\nvec2 f=vec2(n(uv*mult+(vec2(0.0)*mult*mult))/mult-n(uv*mult+(vec2(0.0)*mult*mult+vec2(0.001,0.0)))/mult,n(uv*mult+(vec2(0.0)*mult*mult))/mult-n(uv*mult+(vec2(0.0)*mult*mult+vec2(0.0,0.001)))/mult);\nmult*=2.0;\nfloat g=n(uv*mult+(vec2(0.0)*mult*mult))/mult;\ng*=1.0-length(f*100.0);\no+=g;\n\n}\nreturn pow(o*3.0+0.5,5.0);\n}\nout vec3 surfaceCoords;\nout vec3 pp;\nout vec3 no;\nout float dp;\nvoid main() {\n    float fov=0.7;\n  \n    pos=coordinates;\n  \n     pos+=playerPosition;\n    \n    CamRotate(pos,cameraAngle);\n pp=playerPosition;\n    float silly=-0.001+pos.z*fov;\n   pos.x*=-1.0;\n   pos.y*=-1.0;\n  \n   silly=silly*1.5;\n   no=normal;\n  \n    surfaceCoords = coordinates;\n\n    pos.z*=-1.0;\n    dp=pos.z;\n    gl_Position = vec4(pos,silly);\n}\n    </script>\n    \n    \n<script id = 'fragment-shader' type = 'glsl'>#version 300 es\n      \nprecision mediump float;\n\nin vec3 surfaceCoords;\nin vec3 pp;\nin vec3 no;\nin float dp;\nprecision lowp sampler2D;\nuniform sampler2D iChannel0;\nuniform float iTime;\nuniform vec2 cameraAngle;\nuniform vec3 playerPosition;\n\nout vec4 FragColor;\nvec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nvec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nvec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }\n\n//\n// Description : GLSL 2D simplex noise function\n//      Author : Ian McEwan, Ashima Arts\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License :\n//  Copyright (C) 2011 Ashima Arts. All rights reserved.\n//  Distributed under the MIT License. See LICENSE file.\n//  https://github.com/ashima/webgl-noise\n//\nfloat noise(vec2 v) {\nv/=4.0;\n    // Precompute values for skewed triangular grid\n    const vec4 C = vec4(0.211324865405187,\n                        // (3.0-sqrt(3.0))/6.0\n                        0.366025403784439,\n                        // 0.5*(sqrt(3.0)-1.0)\n                        -0.577350269189626,\n                        // -1.0 + 2.0 * C.x\n                        0.024390243902439);\n                        // 1.0 / 41.0\n\n    // First corner (x0)\n    vec2 i  = floor(v + dot(v, C.yy));\n    vec2 x0 = v - i + dot(i, C.xx);\n\n    // Other two corners (x1, x2)\n    vec2 i1 = vec2(0.0);\n    i1 = (x0.x > x0.y)? vec2(1.0, 0.0):vec2(0.0, 1.0);\n    vec2 x1 = x0.xy + C.xx - i1;\n    vec2 x2 = x0.xy + C.zz;\n\n    // Do some permutations to avoid\n    // truncation effects in permutation\n    i = mod289(i);\n    vec3 p = permute(\n            permute( i.y + vec3(0.0, i1.y, 1.0))\n                + i.x + vec3(0.0, i1.x, 1.0 ));\n\n    vec3 m = max(0.5 - vec3(\n                        dot(x0,x0),\n                        dot(x1,x1),\n                        dot(x2,x2)\n                        ), 0.0);\n\n    m = m*m ;\n    m = m*m ;\n\n    // Gradients:\n    //  41 pts uniformly over a line, mapped onto a diamond\n    //  The ring size 17*17 = 289 is close to a multiple\n    //      of 41 (41*7 = 287)\n\n    vec3 x = 2.0 * fract(p * C.www) - 1.0;\n    vec3 h = abs(x) - 0.5;\n    vec3 ox = floor(x + 0.5);\n    vec3 a0 = x - ox;\n\n    // Normalise gradients implicitly by scaling m\n    // Approximation of: m *= inversesqrt(a0*a0 + h*h);\n    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);\n\n    // Compute final noise value at P\n    vec3 g = vec3(0.0);\n    g.x  = a0.x  * x0.x  + h.x  * x0.y;\n    g.yz = a0.yz * vec2(x1.x,x2.x) + h.yz * vec2(x1.y,x2.y);\n    return 130.0 * dot(m, g);\n}\nfloat sabs(float x){\nreturn sqrt(x*x+0.2);\n}\nfloat n(vec2 uv){\nreturn pow(1.0-sabs(noise(uv)),2.0);\n}\n\nfloat fbm(vec2 uv, int d){\nfloat o=0.0;\nfloat mult=1.0;\nfor(int i=0;i<2;i++){\nvec2 f=vec2(n(uv*mult+(vec2(0.0)*mult*mult))/mult-n(uv*mult+(vec2(0.0)*mult*mult+vec2(0.001,0.0)))/mult,n(uv*mult+(vec2(0.0)*mult*mult))/mult-n(uv*mult+(vec2(0.0)*mult*mult+vec2(0.0,0.001)))/mult);\nmult*=2.0;\nfloat g=n(uv*mult+(vec2(0.0)*mult*mult))/mult;\ng*=1.0-length(f*100.0);\no+=g;\n\n}\nreturn pow(o*3.0+0.5,5.0);\n}\nvoid main() {\n    vec3 pp2=-pp.xyz;\n    vec3 triNormal=no;\n    vec2 po=surfaceCoords.xz;\n  \n   \n  \n    triNormal=normalize(triNormal);\n // vec3 lightCoords=pp-vec3(0.0,0.0,-0.0);\n vec3 triangleColor=vec3(0.9)*1.0;\n\n triangleColor=clamp(triangleColor,0.0,1.0);\n vec3 hehe = -normalize(surfaceCoords-pp*vec3(-1.0,1.0,-1.0));\n vec3 lightPos=vec3(0.0,-200.0,1000.0);\n vec3 FragPos=surfaceCoords;\n vec3 viewPos=pp2;\n vec3 lightDir   = normalize(lightPos - FragPos);\nvec3 viewDir    = normalize(viewPos - FragPos);\nvec3 halfwayDir = normalize(lightDir + viewDir);\n\n float li=max(dot(normalize(hehe),-normalize(triNormal)),0.0);\n  float li2=max(dot(normalize(hehe),-normalize(triNormal)),0.0);\n   float spec = pow(max(dot(triNormal, halfwayDir), 0.0), 2.5);\n \n\n vec3 to=surfaceCoords-pp2;\n\nfloat mul=abs(dot(triNormal,normalize(to)))*0.8+0.2;\n\nvec3 colo=abs(triNormal)*0.001+vec3(139.0/255.0,69.0/255.0,19.0/255.0)/2.5;\n        FragColor = vec4((colo*mul+vec3(1.0,0.9,0.6)*spec*0.6),1.0-(-dp)*0.015);//vec4(vec3(1.0-log(-dp*1.5)*0.2),1.0);//vec4((colo*mul+vec3(1.0,0.8,0.5)*spec*0.1)/(-dp*0.1+1.0),1.0);\n\n\n\n}\n</script>\n        <script type=\"module\">\n       \n           var mouseX=300,pmouseX=0,mouseY=300,pmouseY=0,clicked=false,key={};\n           var click=false;\n           var clickToggle=false;\n         function getPointer() {\n\t\tif (canvas2.requestPointerLock) {\n\t\t    \twindow.addEventListener(\"mousemove\", function(ev) {\n\t\tmouseX = pmouseX + ev.movementX/1.5;\n\t\tmouseY = pmouseY + ev.movementY/1.5;\n\t});\n\t\t\tcanvas2.requestPointerLock()\n\t\t\t\n\t\t}\n\t\n\t}\n            window.addEventListener('mousedown', event => {\n            clicked = true;\n        getPointer();\n         clickToggle=true;\n      \n            //clicking?\n        });\n        window.addEventListener('mouseup', event => {\n            clicked = false;\n            click=true;\n//not clicking so set clicked to false\n        });\n          window.addEventListener(\"keydown\", (event) => {\n                    if((event.shiftKey&&event.key === 'W')||(event.shiftKey&&event.key === 'A')||(event.shiftKey&&event.key === 'S')||(event.shiftKey&&event.key === 'D')) {\n                  e.preventDefault();\n          }\n          key[event.key] = true;\n  });\n  window.addEventListener(\"keyup\", (event) => {\n          delete key[event.key];\n  });\n               window.addEventListener(\"mouseover\", event => {\n                pmouseX = mouseX;\n    pmouseY= mouseY\n    mouseX = event.pageX;\n    mouseY = event.pageY;\n});\nwindow.addEventListener(\"mousemove\", event => {\n    pmouseX = mouseX;\n    pmouseY= mouseY\n    mouseX = event.pageX;\n    mouseY = event.pageY;\n \n});\n\n        for (let i = window.requestAnimationFrame(function() {}); i > 0; i--) {\n    window.cancelAnimationFrame(i);\n}\n var c = document.getElementById(\"m\")\n\n//var ctx = c.getContext(\"2d\");\n//var data = ctx.getImageData(0, 0, 600, 600);\n\nfunction dist(x1,y1,x2,y2){\n    var dx=x1-x2;\n    var dy=y1-y2\n   return Math.sqrt(dx*dx+dy*dy)\n}\nfunction dist2(x1,y1,x2,y2){\n    var dx=x1-x2;\n    var dy=y1-y2\n   return (dx*dx+dy*dy)\n}\nvar anim=0;\n\n\n\n\nvar x=0;\nvar frameCount=480;\n\n     \n     \n     \n       /*================Creating a canvas=================*/\n         var canvas = new OffscreenCanvas(600,600);\n        var gl = canvas.getContext('webgl2',{ premultipliedAlpha: false }); \n\n         /*==========Defining and storing the geometry=======*/\n\n         var vertices = [\n            -0.5,0.5,0.0,\n            0.0,0.5,0.0,\n            -0.25,0.25,0.0, \n            -0.25,0.5,0.0 \n         ];\n\n         // Create an empty buffer object to store the vertex buffer\n         var vertex_buffer = gl.createBuffer();\n var normal_buffer = gl.createBuffer();\n\n         //Bind appropriate array buffer to it\n        // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);\n\n         // Pass the vertex data to the buffer\n      //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);\n\n         // Unbind the buffer\n    //     gl.bindBuffer(gl.ARRAY_BUFFER, null);\n\n         /*=========================Shaders========================*/\n\n         // vertex shader source code\n         var vertCode =document.getElementById('vertex-shader').textContent;\n\n         // Create a vertex shader object\n         var vertShader = gl.createShader(gl.VERTEX_SHADER);\n         \n         // Attach vertex shader source code\n         gl.shaderSource(vertShader, vertCode);\n\n         // Compile the vertex shader\n         gl.compileShader(vertShader);\n   if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {\n        console.log(gl.getShaderInfoLog(vertShader));\n    }\n    \n         // fragment shader source code\n         var fragCode = document.getElementById('fragment-shader').textContent\n\n         // Create fragment shader object\n         var fragShader = gl.createShader(gl.FRAGMENT_SHADER);\n\n         // Attach fragment shader source code\n         gl.shaderSource(fragShader, fragCode);\n\n         // Compile the fragmentt shader\n         gl.compileShader(fragShader);\n            if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {\n        console.log(gl.getShaderInfoLog(fragShader));\n    }\n    \n         // Create a shader program object to store\n         // the combined shader program\n         var shaderProgram = gl.createProgram();\n\n         // Attach a vertex shader\n         gl.attachShader(shaderProgram, vertShader); \n\n         // Attach a fragment shader\n         gl.attachShader(shaderProgram, fragShader);\n\n         // Link both programs\n         gl.linkProgram(shaderProgram);\n\n         // Use the combined shader program object\n         gl.useProgram(shaderProgram);\n\n         /*======== Associating shaders to buffer objects ========*/\n\n         // Bind vertex buffer objec\n         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);\n\n         // Get the attribute location\n         var coord = gl.getAttribLocation(shaderProgram, \"coordinates\");\n    var norms = gl.getAttribLocation(shaderProgram, \"normal\");\n         // Point an attribute to the currently bound VBO\n        \n\n         /*============= Drawing the primitive ===============*/\n    gl.clearColor(0.0, 0.0, 0.0,0.0);\n\n         // Enable the depth test\n    \n     \n      var distance=-2,thetax=-0.0,thetaz=0\n           var d=function(x,y,z) {\n             \n           var zdist=((x*Math.sin(-thetaz)+y*Math.cos(-thetaz))*Math.cos(thetax)-z*Math.sin(thetax)+distance)/160.0\n    return[((x*Math.cos(-thetaz)-y*Math.sin(-thetaz))/zdist*-distance+300),(-((x*Math.sin(-thetaz)+y*Math.cos(-thetaz))*Math.sin(thetax)+z*Math.cos(thetax))/zdist*-distance)+300,zdist];\n};\n     \n        var camera={x:(-Math.sin(thetax+(Math.PI/2))*Math.cos(thetaz+(Math.PI/2)))*distance,y:(-Math.sin(thetax+(Math.PI/2))*Math.sin(thetaz+(Math.PI/2)))*distance,z:-Math.cos(thetax+(Math.PI/2))*distance} \n function camdist(x,y,z){\n    \nreturn(Math.sqrt(((x-camera.x)**2)+((y-camera.y)**2)+((z-camera.z)**2)))\n}\n     \n     \n      class Vector {\n          constructor(x, y, z=0) {\n                  this.x = x;\n                  this.y = y;\n                  this.z=z;\n          }\n          subtract(v) {\n                  var ve = new Vector(this.x, this.y, this.z);\n                  ve.x -= v.x;\n                  ve.y -= v.y;\n                  ve.z -= v.z;\n                  return ve;\n          }\n          add(v) {\n                  var ve = new Vector(this.x, this.y, this.z);\n                  ve.x += v.x;\n                  ve.y += v.y;\n                  ve.z += v.z;\n                  return ve;\n          }\n          divide(n) {\n                  var ve = new Vector(this.x, this.y, this.z);\n                  ve.x /= n;\n                  ve.y /= n;\n                  ve.z /= n;\n                  return ve;\n          }\n          magnitude() {\n                  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);\n          }\n          dot(v) {\n                  return this.x * v.x + this.y * v.y + this.z * v.z;\n          }\n          scale(n) {\n                  var ve = new Vector(this.x, this.y, this.z);\n                  ve.x *= n;\n                  ve.y *= n;\n                  ve.z *= n;\n                  return ve;\n          }\n          normalize() {\n                  var ve = new Vector(this.x, this.y, this.z);\n                  ve = ve.divide(ve.magnitude());\n                  return ve;\n          }\n          rotateBy(ang) {\n                  ang = -ang;\n                  return new Vector(this.x * Math.cos(ang) - this.y * Math.sin(ang), this.x * Math.sin(ang) + this.y * Math.cos(ang));\n          }\n          rotate3d(anglex,angley)\n{\n    var ve = new Vector(this.x,this.y,this.z);\n    var ro1 = new Vector(this.y,this.z).rotateBy(-anglex);\n    var ro2 = new Vector(this.x,ro1.y).rotateBy(-angley);\n\tve.y = ro1.x\n\tve.z = ro1.y;\n\t\t\t\t\n\tve.x = ro2.x;\n\tve.z = ro2.y;\n\treturn ve;\n}\n          reflect(n) {\n                  var ve = new Vector(this.x, this.y);\n                  ve = ve.subtract(n.scale(2 * ve.dot(n)))\n                  return ve;\n          }\n          abs() {\n                  var ve = new Vector(this.x, this.y, this.z);\n                  ve.x = Math.abs(ve.x);\n                  ve.y = Math.abs(ve.y);\n                  ve.z = Math.abs(ve.z);\n                  return ve;\n          }\n          max(n) {\n                  var ve = new Vector(this.x, this.y, this.z);\n                  ve.x = Math.max(ve.x, n);\n                  ve.y = Math.max(ve.y, n);\n                  ve.z = Math.max(ve.z, n);\n                  return ve;\n          }\n  } \n     \n     \n     \n     function createShader(gl, type, source) {\n    const shader = gl.createShader(type);\n    gl.shaderSource(shader, source);\n    gl.compileShader(shader);\n   \n    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n        console.log(gl.getShaderInfoLog(shader));\n    }\n   \n    return shader;\n}\nfunction createProgram(gl, vs, fs) {\n    const program = gl.createProgram();\n    gl.attachShader(program, vs);\n    gl.attachShader(program, fs);\n    gl.linkProgram(program);\n   \n    return program;\n}\n\n\n\n     \n  \n  const skyboxCanvas = document.getElementById('skybox'),\n        gl2 = skyboxCanvas.getContext('webgl2');\n   \n    const vertexSource2 = document.getElementById('vertex-skybox').textContent,\n        fragmentSource2 = document.getElementById('fragment-skybox').textContent;\n   \n    const vertexShader2 = createShader(gl2, gl2.VERTEX_SHADER, vertexSource2),\n        fragmentShader2 = createShader(gl2, gl2.FRAGMENT_SHADER, fragmentSource2);\n   \n    const program2 = createProgram(gl2, vertexShader2, fragmentShader2);\n   \n    const aPosition2 = gl2.getAttribLocation(program2, 'aPosition')\n    const drawx2 = gl2.getUniformLocation(program2, \"drawx\");\n    const drawy2 = gl2.getUniformLocation(program2, \"drawy\");\n   const iTime2 = gl2.getUniformLocation(program2, \"iTime\");\n   const iChannel02 = gl2.getUniformLocation(program2,\"iChannel0\");\n   \n    const positions = new Float32Array([-1, -1, -1, 3, 3, -1]);\n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n\n\n    const glBloom = document.getElementById('bloom'),\n        gl3 = glBloom.getContext('webgl2');\n  \n    const vertexSource3 = document.getElementById('vertex-bloom').textContent,\n        fragmentSource3 = document.getElementById('fragment-bloom').textContent;\n   \n    const vertexShader3 = createShader(gl3, gl.VERTEX_SHADER, vertexSource3),\n        fragmentShader3 = createShader(gl3, gl.FRAGMENT_SHADER, fragmentSource3);\n   \n    const program3 = createProgram(gl3, vertexShader3, fragmentShader3);\n    const camAng2 = gl.getUniformLocation(program3, \"cameraAngle\");\n    const aPosition3 = gl3.getAttribLocation(program3, 'aPosition')\n    const drawx = gl3.getUniformLocation(program3, \"drawx\");\n    const drawy = gl3.getUniformLocation(program3, \"drawy\");\n   const iTime = gl3.getUniformLocation(program3, \"iTime\");\n   const cli = gl3.getUniformLocation(program3, \"clicked\");\n   const iChannel03 = gl3.getUniformLocation(program3,\"iChannel0\");\n   let texture03 = gl3.createTexture();\n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     \n     var player\nvar now;\n\nvar then = performance.now();\n\nvar fps = 50;\n\nvar delta;\nvar player=new Vector(900,-4000,-600);\nvar frameCount=4900;\nvar interval = 1000 / fps;\nvar pts=[];\n  const iChannel0 = gl.getUniformLocation(shaderProgram,\"iChannel0\");\n   let texture0 = gl.createTexture();\n     \n   var canvas2 = document.getElementById('my_Canvas'), ctx = canvas2.getContext('2d');\n     \n  \ngl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);\n     gl.drawArrays(gl.TRIANGLES, 0, 3);\n//console.log(heightMap);\n     vertices = [  ]; \n    var rays=[];\n     \n    const iTimet = gl.getUniformLocation(shaderProgram, \"iTime\");\n    const camAng = gl.getUniformLocation(shaderProgram, \"cameraAngle\");\n    const glPlayer = gl.getUniformLocation(shaderProgram, \"playerPosition\");\nfunction roun(n){\n    return Math.sqrt(1.0-(n*n));\n}\n       vertices = []; \n       var norm=[];\n       \n const fileContents = shackModel;\n\nconst objFile = new OBJFile(fileContents);\nvar pm=objFile.parse();\nvar sp=0;\nvar sp2=0;\n//console.log(pm.models)\nfor(var inde=0;inde<3;inde++){\nvar ind=pm.models[inde].faces;\nvar coo=pm.models[inde].vertices;\nvar noor=pm.models[inde].vertexNormals;\n//console.log(coo)\n\n       var res=4;\n    for(var x=0;x<ind.length;x++){\n     \n      for(var g=2;g<ind[x].vertices.length;g++){\n         \n          var cer1=coo[ind[x].vertices[0].vertexIndex-1-sp]\n     var cer2=coo[ind[x].vertices[g-1].vertexIndex-1-sp]\n     var cer3=coo[ind[x].vertices[g].vertexIndex-1-sp]\n        vertices.push(cer1.x,-cer1.y,cer1.z,cer2.x,-cer2.y,cer2.z,cer3.x,-cer3.y,cer3.z);\n        \n      var ce1=noor[ind[x].vertices[0].vertexNormalIndex-1-sp2]\n     var ce2=noor[ind[x].vertices[g-1].vertexNormalIndex-1-sp2]\n     var ce3=noor[ind[x].vertices[g].vertexNormalIndex-1-sp2]\n        norm.push(ce1.x,-ce1.y,ce1.z,ce2.x,-ce2.y,ce2.z,ce3.x,-ce3.y,ce3.z);\n              \n    } \n       \n       }\n       sp+=pm.models[inde].vertices.length;\n       sp2+=pm.models[inde].vertexNormals.length;\n       }\n    // console.log(vertices)\n       for(var i=0;i<vertices.length;i+=9){\n          var U = new Vector(vertices[i+3],vertices[i+4],vertices[i+5])\n           var V = new Vector(vertices[i+6],vertices[i+7],vertices[i+8])\n           U=U.subtract(new Vector(vertices[i],vertices[i+1],vertices[i+2]))\n           V=V.subtract(new Vector(vertices[i],vertices[i+1],vertices[i+2]))\n           var normal = new Vector();\n           normal.x = ( U.y * V.z) - ( U.z * V.y)\n\tnormal.y = ( U.z * V.x) - ( U.x * V.z)\n\tnormal.z = ( U.x * V.y) - ( U.y * V.x)\n//\tnorm.push(normal.x,normal.y,normal.z,normal.x,normal.y,normal.z,normal.x,normal.y,normal.z);\n       }\n          \n          gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);\n         gl.enableVertexAttribArray(coord);\n         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);\n          gl.bindBuffer(gl.ARRAY_BUFFER, normal_buffer);\n\n         gl.vertexAttribPointer(norms, 3, gl.FLOAT, false, 0, 0);\n         gl.enableVertexAttribArray(norms);\n         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(norm), gl.STATIC_DRAW);\n         \n       \n    // turn on depth testing\n    gl.enable(gl.DEPTH_TEST);\n\n    // tell webgl to cull faces\n    gl.enable(gl.CULL_FACE);\n    gl.cullFace(gl.BACK); \n        const posBuffer2 = gl2.createBuffer();\n        gl2.bindBuffer(gl.ARRAY_BUFFER, posBuffer2);\n        gl2.bufferData(gl.ARRAY_BUFFER, positions, gl2.STATIC_DRAW);\n       \n        gl.viewport(0, 0, 600, 600);\n            gl2.viewport(0, 0, 600, 600);\n gl2.vertexAttribPointer(aPosition2, 2, gl2.FLOAT, false, 0, 0);\n   gl2.useProgram(program2);\n    gl2.enableVertexAttribArray(aPosition2);\n       \n       \n       \n       \n          const posBuffer3 = gl3.createBuffer();\n        gl3.bindBuffer(gl3.ARRAY_BUFFER, posBuffer3);\n        gl3.bufferData(gl3.ARRAY_BUFFER, positions, gl3.STATIC_DRAW);\n       \n        gl3.viewport(0, 0, 600, 600);\n        gl3.clearColor(0, 0, 0, 0);\n      gl3.useProgram(program3);\n      \n        gl3.enableVertexAttribArray(aPosition3);\n       \n       \n      \n        gl3.vertexAttribPointer(aPosition3, 2, gl.FLOAT, false, 0, 0);\n        gl3.activeTexture(gl3.TEXTURE0);\n        gl3.bindTexture(gl3.TEXTURE_2D, texture03);\n    gl3.uniform1i(iChannel03, 0);\n    gl3.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\n    gl3.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\n    gl3.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);\n  \n\nvar drawl=function() {\n           window.requestAnimationFrame(drawl);\nnow = performance.now();\n\n    delta = now - then;\n  \n    if (delta > interval) {\n        \n        then = now - (delta % interval);\n        \n        if(key.g){\n        document.getElementById(\"my_Canvas\").style=\"width:600px;\";    \n        }else{\n            document.getElementById(\"my_Canvas\").style=\"width:600px;\";    \n        }\n     \n        frameCount+=10.0;\n        thetaz=-(mouseX-300)/220;\n    thetax=-(mouseY-300)/240;\n           if(thetax<-Math.PI/2){\n             thetax=-Math.PI/2;\n         }\n             if(thetax>Math.PI/2){\n             thetax=Math.PI/2;\n         }\n  \n        //   \n\n      var cards=new Vector(30,0)\n     cards=cards.rotateBy(thetaz);\n     if(key.w){\n         player.y+=cards.x;\n          player.x+=cards.y;\n     }\n     if(key.s){\n         player.y-=cards.x;\n          player.x-=cards.y;\n     }\n     if(key.a){\n         player.y+=cards.y;\n          player.x-=cards.x;\n     }\n     if(key.d){\n          player.y-=cards.y;\n          player.x+=cards.x;\n     }\n      if(key.Shift){\n    player.z+=30.0;\n     }\n      if(key[\" \"]){\n    player.z-=30.0;\n     }\n     \ngl.uniform1f(iTimet, frameCount);\ngl.uniform2f(camAng, thetaz,thetax); \n\n//gl.uniform2f(camAng, -frameCount/250+3.1415/2+thetaz/2,thetax/2-0.5); \ngl.uniform3f(glPlayer, player.x/150,-player.z/150,-player.y/150);\n//gl.uniform3f(glPlayer, Math.cos(frameCount/250)*29*(Math.sin(frameCount/1000)*0.35+0.65),59*(Math.sin(frameCount/1000)*0.1+0.9),Math.sin(frameCount/250)*29*(Math.sin(frameCount/1000)*0.35+0.65)+2);\nframeCount+=1;\n //   ctx.fillStyle=\"rgb(2,2,2,1)\"\n   //   ctx.fillStyle=\"rgb(250,0,0)\"\n   ctx.clearRect(0,0,600,600);\n  //        gl3.clear(gl.COLOR_BUFFER_BIT);\n     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);\n        gl3.uniform1f(drawx, thetaz);\n gl3.uniform1f(drawy, thetax);\n gl2.uniform1f(drawx2, thetaz);\n gl2.uniform1f(drawy2, thetax);\n gl2.uniform1f(iTime2, frameCount);\n gl3.uniform2f(camAng2, thetaz,thetax); \n  gl2.uniform2f(camAng2, thetaz,thetax); \n         gl.drawArrays(gl.TRIANGLES, 0, (vertices.length/3));\n     \n \n\nctx.drawImage(canvas,0,0);\n ctx.fillStyle=\"rgb(255,40,40)\"\n   \n    gl3.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas2);\n           gl2.drawArrays(gl.TRIANGLES, 0, 3);\n       \n        ctx.drawImage(skyboxCanvas, 0, 0);\n  gl3.drawArrays(gl.TRIANGLES, 0, 3);\n   ctx.drawImage(glBloom, 0, 0);\n  \n \n\n pmouseX = mouseX;\n    pmouseY= mouseY\n    clickToggle=false;\n    click=false;\n    \n    \n}\n}\ndrawl();\n\n\n//<script>\n   \n\n</script> \n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Nosifer&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap\" rel=\"stylesheet\">\n</html>\n",
    "title": "Godrays on a floating shack",
    "votes": 56,
    "created": "a day ago",
    "updated": "a day ago",
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
            "title": "Spin-off of \"Godrays on a floating shack\"",
            "id": "4766750647173120",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "ihmandrew",
                "id": "kaid_1116498955829619146975594"
            }
        }
    ],
    "posts": {
        "tips": [
            {
                "replyCount": 13,
                "votes": 19,
                "date": "a day ago",
                "author": {
                    "name": "wealR",
                    "id": "kaid_831993479561352012904348",
                    "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                },
                "text": "I think I can prove Jake K. is Bearkirb314. In his bio Jake K. quotes Sergei Vasilyevich Rachmaninoff. Rachmaninoff was born in 1873. And you know what also happened in 1873? The Panic of 1873. During that economic panic 89 railroads in America were bankrupted. 89 is a number in the fibonacci sequence. Fibonacci was Italian. On the Kirb is a sports bar that serves Neapolitan Italian pizzas and organic meats. Bear is an organic meat. 314 is the first three digits in π. π is prounounced like pie. Pie is shaped like a pizza. We mentioned pizza eariler. Do you think all that is a coincidence? I don't think so. Therefore Jake K. is Bearkirb314.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Falling Dragon™️",
                            "id": "kaid_922990378162047462529587",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "that is how conspiracy theories start kids"
                    },
                    {
                        "date": "18 hours ago",
                        "author": {
                            "name": "Leo2009",
                            "id": "kaid_93723305121824615611989",
                            "avatar": "/images/avatars/svg/cs-ohnoes.svg"
                        },
                        "text": "Agreed how long did this take to connect?"
                    },
                    {
                        "date": "17 hours ago",
                        "author": {
                            "name": "Luke Ellis",
                            "id": "kaid_8535468719137003545030723",
                            "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                        },
                        "text": "This connection is a masterpiece by itself."
                    },
                    {
                        "date": "16 hours ago",
                        "author": {
                            "name": "kitty mascot",
                            "id": "kaid_1066778980955332043559618",
                            "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                        },
                        "text": "it totally makes sense! XD"
                    },
                    {
                        "date": "14 hours ago",
                        "author": {
                            "name": "Equilibrium",
                            "id": "kaid_1842852586096096865081151",
                            "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                        },
                        "text": "It all makes sense now... the pieces are coming together..."
                    },
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Wow, that is so true :O<br>but also when I said \"Super cool BK!\"<br>Jake K responded ;P"
                    },
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "Leo2009 - about 10 minutes.<br>Duke - yes i know right? i know jk=bk from mutiple sources<br>Everyone else - it makes a ton of sense, after all, this couldn't all be a coincidence, couldn't it?"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "kitty mascot",
                            "id": "kaid_1066778980955332043559618",
                            "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                        },
                        "text": "no it couldn't"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "LJ",
                            "id": "kaid_1144628223469068678737336",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "How long did you take?"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "LJ - you mean how long it took to write? about 10 minutes or less"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "LJ",
                            "id": "kaid_1144628223469068678737336",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Wow you came up all this in 10 minutes?<br>You must have the entire human knowledge installed in your brain"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "i have the internet"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "LJ",
                            "id": "kaid_1144628223469068678737336",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "i know but it's hard to connect all this information"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 14,
                "date": "a day ago",
                "author": {
                    "name": "Jake K.",
                    "id": "kaid_103000698141866290580261",
                    "avatar": "/images/avatars/svg/leaf-blue.svg"
                },
                "text": "How did you find my address?",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 9,
                "date": "a day ago",
                "author": {
                    "name": "Bearkirb314🐻‍❄️",
                    "id": "kaid_375460112550893828689953",
                    "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                },
                "text": "Sub to help me stop making your computer melt: https://www.khanacademy.org/computer-programming/bearkirb-subpage/6113592068325376",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 3,
                "date": "a day ago",
                "author": {
                    "name": "Duke",
                    "id": "kaid_351465532815782433620675",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "Super cool BK!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 6,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "wealR",
                    "id": "kaid_831993479561352012904348",
                    "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                },
                "text": "Impressive! :)",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Bearkirb314🐻‍❄️",
                            "id": "kaid_375460112550893828689953",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "Thank you :) <br><br>Almost as impressive as trying to convince people steak is healthy lol."
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "Your welcome :)<br><br>It's definitely healthier than candy ;)"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Bearkirb314🐻‍❄️",
                            "id": "kaid_375460112550893828689953",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "Wasnt mine, I dont know how.  If I did I would make everything clickbaity lol."
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "Ah, ok. I sort of remember my brother doing something like that a long time ago. Thanks :)"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Falling Dragon™️",
                            "id": "kaid_922990378162047462529587",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "@jake k<br>be careful sharing that info. I got a program on the hotlist get hidden because i told someone about that"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 2,
                "date": "17 hours ago",
                "author": {
                    "name": "Luke Ellis",
                    "id": "kaid_8535468719137003545030723",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "Wow. Looks really cool. I'm not sure why there is a floating shack in the middle of the desert, but still.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "17 hours ago",
                "author": {
                    "name": "Peter_B. #MysteryMettle",
                    "id": "kaid_1029232876836541365226967",
                    "avatar": "/images/avatars/svg/cs-hopper-jumping.svg"
                },
                "text": "Wow! that's cool!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "2 hours ago",
                "author": {
                    "name": "LJ",
                    "id": "kaid_1144628223469068678737336",
                    "avatar": "/images/avatars/svg/leafers-sapling.svg"
                },
                "text": "A Beakbirb that doesn't slow down, melt, and burn my PC into ashes? Incredible!11<br>/joke",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "3 hours ago",
                "author": {
                    "name": "CoraL",
                    "id": "kaid_363667774724785949031034",
                    "avatar": "/images/avatars/svg/sneak-peak-purple.svg"
                },
                "text": "very godly",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "13 hours ago",
                "author": {
                    "name": "Firebrand (offline)",
                    "id": "kaid_423049852746380987692804",
                    "avatar": "/images/avatars/svg/stelly-orange.svg"
                },
                "text": "Hold up... hooooooooooooollllllldd uuuuppp... hang on a second...<br><br>Is this <somehow> a Bearkirb program, ultimately amazing, that has NO LAG?!? 🤯🤯🤯<br><br>AWESOME!<br>Vote++",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "4 hours ago",
                        "author": {
                            "name": "Bearkirb314🐻‍❄️",
                            "id": "kaid_375460112550893828689953",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "The wild Bearkirb used rasterization: It's super effective!"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "WinstonWinner000 (Parlor Indie)♞⚂♠",
                    "id": "kaid_693763055742960827086832",
                    "avatar": "/images/avatars/svg/cs-winston.svg"
                },
                "text": "Well done! :)",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "ASBackup",
                    "id": "kaid_714780036830891967670231",
                    "avatar": "/images/avatars/svg/aqualine-tree.svg"
                },
                "text": ":O<br>looks amazing :)<br>reminds me of raft",
                "locked": false,
                "pinned": false,
                "replies": []
            }
        ],
        "questions": []
    }
}