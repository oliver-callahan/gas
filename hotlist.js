var json = {
    "code": "<!DOCTYPE html><html><!--\n\na gpu pic/flip fluid sim complete with screen space fluid rendering\n\n(def one of the more potato killer projects ive done)\n\nthe water aint look the best but it gives moana thats enough for me\n\n-------------------------------------------\n\n(its a minecraft style free fly camera)\n\npress 'm' or hold right click and move ur mouse around to ~~violently shake~~ stir the liquid\n\nplay with the random variables on line ~70\n\npress 't' to run program in a full screen tab (might break things and lag more but who cares)\n\n-------------------------------------------\n\ngpgpu pic/flip pipeline and most the simulation logic from: https://github.com/dli/fluid tho i made major improvements with redundancies and webgl\n\n-------------------------------------------\n\nfor nerds:\n\ni used my own rendering process (the above uses circles and ambient occlusion)\n\n\nmy ssfr method: instead of the traditional method of filtering the depth buffer and central differencin' the normals from that, i directly generate the normals in world space from the billboard particles while storing the depth. then i 2 pass box blur the normals(using depth difference between the center and sampled pixel). also i generate a thickness texture by rendering points and accumulating them with additive blending and doing another, this time weak, 2 pass box blur. then i use the blured normals to render the texture with a dumb hacky method to produce the specular highlights, where i also use the original normal texture as a stencil buffer sorta. also added my own self invented post processing anti aliasing method\n\n\n\n-->\n<title>Water Simulation</title>\n\n<canvas id='ui-canvas'></canvas>\n\n<style>body{margin:0;overflow:hidden;}</style>\n\n<script src='https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js'></script>\n\n<script src='https://cdn.jsdelivr.net/gh/Dddatt/D.js@v2.3.0/index.js'></script>\n\n<script type='application/javascript'>\n\nfunction main(){\n\nlet width=window.innerWidth,height=window.innerHeight,aspect=width/height,halfWidth=width>>1,halfHeight=height>>1\n\nlet glCanvas=new OffscreenCanvas(width,height)\nlet uiCanvas=document.getElementById('ui-canvas')\n\nuiCanvas.width=width\nuiCanvas.height=height\n\nlet ctx=uiCanvas.getContext('2d')\nlet gl=D.getContext(glCanvas,{antialias:1})\nlet ext=D.getExtension('EXT_color_buffer_float')\n\nD.viewport(0,0,width,height)\nD.enable3D()\n\nD.floatify=(n)=>n+(Math.floor(n)===n?'.':'')\n\ndocument.oncontextmenu=(e)=>e.preventDefault()\n\n\n\n\n\n\nlet moveSpeed=450\nlet moveDamp=6\n\nlet renderRaw=false\nlet timeMultiplier=1\nlet gravity=1\n\nlet stirRadius=6\nlet stirStrength=5\n\nlet GRID_DENSITY=0.5\nlet GRID_WIDTH=40\nlet GRID_HEIGHT=20\nlet GRID_LENGTH=30\nlet PARTICLES_PER_CELL=10\nlet PARTICLE_SIZE=900\n\nlet TRANSLUCENCY=8\nlet LIQUID_COLOR=[0,0.5,1]\nlet PRESSURE_JACOBI_ITERATIONS=50\nlet PIC_FLIP_RATIO=0.95\n\nlet spawningBox=[0,0,0,15,GRID_HEIGHT,GRID_LENGTH]\n\n\n\n\n\n\n\n\nlet bX=GRID_WIDTH*0.5,bY=GRID_HEIGHT*0.5,bZ=GRID_LENGTH*0.5\n\nlet totalVolume=Math.abs(spawningBox[0]-spawningBox[3])*Math.abs(spawningBox[1]-spawningBox[4])*Math.abs(spawningBox[2]-spawningBox[5])\n\n\nlet gridCells=GRID_WIDTH*GRID_HEIGHT*GRID_LENGTH*GRID_DENSITY,\n    r=Math.ceil(Math.pow(gridCells*0.5,1/3))\nlet gridResolutionX=r\nlet gridResolutionY=r\nlet gridResolutionZ=r\nlet totalGridCells=gridResolutionX*gridResolutionY*gridResolutionZ\nlet fractionFilled=totalVolume/(GRID_WIDTH*GRID_HEIGHT*GRID_LENGTH)\nlet desiredParticleCount=fractionFilled*totalGridCells*PARTICLES_PER_CELL\n\nlet particlesWidth=512\nlet particlesHeight=Math.ceil(desiredParticleCount/particlesWidth)\n\nlet velocitiesWidth=(gridResolutionX+1)*(gridResolutionZ+1)\nlet velocitiesHeight=(gridResolutionY+1)\n\nlet scalarWidth=gridResolutionX*gridResolutionZ\nlet scalarHeight=gridResolutionY\n\n\nlet particlesCount=particlesWidth*particlesHeight\n\nlet particleUVs=new Float32Array(particlesCount*2)\n\nfor(let y=0;y<particlesHeight;++y)\n    for(let x=0;x<particlesWidth;++x){\n        \n        particleUVs[(y*particlesWidth+x)*2]=(x+0.5)/particlesWidth\n        particleUVs[(y*particlesWidth+x)*2+1]=(y+0.5)/particlesHeight\n    }\n\nlet particleVertBuffer=gl.createBuffer()\ngl.bindBuffer(gl.ARRAY_BUFFER,particleVertBuffer)\ngl.bufferData(gl.ARRAY_BUFFER,particleUVs,gl.STATIC_DRAW)\n\n\nlet particlePositionsData=new Float32Array(particlesCount*4)\nlet particleRandoms=new Float32Array(particlesCount*4)\nfor(let i=0;i<particlesCount;++i){\n    \n    let _i=i<<2\n    particlePositionsData[_i]=D.random(spawningBox[0],spawningBox[3])\n    particlePositionsData[_i+1]=D.random(spawningBox[1],spawningBox[4])\n    particlePositionsData[_i+2]=D.random(spawningBox[2],spawningBox[5])\n    particlePositionsData[_i+3]=0\n\n    let theta=Math.random()*2*D.PI,\n        u=Math.random()*2-1,\n        _m=Math.sqrt(1-u*u)\n    particleRandoms[_i]=_m*Math.cos(theta)\n    particleRandoms[_i+1]=_m*Math.sin(theta)\n    particleRandoms[_i+2]=u\n    particleRandoms[_i+3]=0\n}\n\n\nlet particlePosition_tex=D.createTexture(particlesWidth,particlesHeight,particlePositionsData,'NEAREST','CLAMP_TO_EDGE','RGBA16F','RGBA','FLOAT'),\n    _particlePosition_tex=D.createTexture(particlesWidth,particlesHeight,null,'NEAREST','CLAMP_TO_EDGE','RGBA16F','RGBA','FLOAT'),\n    particleVelocity_tex=D.createTexture(particlesWidth,particlesHeight,null,'NEAREST','CLAMP_TO_EDGE','RGBA16F','RGBA','FLOAT'),\n    _particleVelocity_tex=D.createTexture(particlesWidth,particlesHeight,null,'NEAREST','CLAMP_TO_EDGE','RGBA16F','RGBA','FLOAT'),\n    particleRandom_tex=D.createTexture(particlesWidth,particlesHeight,particleRandoms,'NEAREST','CLAMP_TO_EDGE','RGBA16F','RGBA','FLOAT'),\n    \n    velocity_tex=D.createTexture(velocitiesWidth,velocitiesHeight,null,'LINEAR','CLAMP_TO_EDGE','RGBA16F','RGBA','FLOAT'),\n    _velocity_tex=D.createTexture(velocitiesWidth,velocitiesHeight,null,'LINEAR','CLAMP_TO_EDGE','RGBA16F','RGBA','FLOAT'),\n    originalVelocity_tex=D.createTexture(velocitiesWidth,velocitiesHeight,null,'LINEAR','CLAMP_TO_EDGE','RGBA16F','RGBA','FLOAT'),\n    weight_tex=D.createTexture(velocitiesWidth,velocitiesHeight,null,'LINEAR','CLAMP_TO_EDGE','RGBA16F','RGBA','FLOAT'),\n\n    marker_tex=D.createTexture(scalarWidth,scalarHeight,null,'LINEAR','CLAMP_TO_EDGE','RGBA','RGBA','UNSIGNED_BYTE'),\n    divergence_tex=D.createTexture(scalarWidth,scalarHeight,null,'LINEAR','CLAMP_TO_EDGE','RGBA16F','RGBA','FLOAT'),\n    pressure_tex=D.createTexture(scalarWidth,scalarHeight,null,'LINEAR','CLAMP_TO_EDGE','RGBA16F','RGBA','FLOAT'),\n    _pressure_tex=D.createTexture(scalarWidth,scalarHeight,null,'LINEAR','CLAMP_TO_EDGE','RGBA16F','RGBA','FLOAT'),\n    \n    weight_fb=D.createFramebuffer(weight_tex),\n    _velocity_fb=D.createFramebuffer(_velocity_tex),\n    velocity_fb=D.createFramebuffer(velocity_tex),\n    marker_fb=D.createFramebuffer(marker_tex),\n    originalVelocity_fb=D.createFramebuffer(originalVelocity_tex),\n    divergence_fb=D.createFramebuffer(divergence_tex),\n    pressure_fb=D.createFramebuffer(pressure_tex),\n    _pressure_fb=D.createFramebuffer(_pressure_tex),\n    particleVelocity_fb=D.createFramebuffer(particleVelocity_tex),\n    _particleVelocity_fb=D.createFramebuffer(_particleVelocity_tex),\n    particlePosition_fb=D.createFramebuffer(particlePosition_tex),\n    _particlePosition_fb=D.createFramebuffer(_particlePosition_tex),\n    \n    \n    normals_tex=D.createTexture(width,height,null,'LINEAR','CLAMP_TO_EDGE','RGBA','RGBA','UNSIGNED_BYTE'),\n    horBlur_tex=D.createTexture(width,height,null,'LINEAR','CLAMP_TO_EDGE','RGBA','RGBA','UNSIGNED_BYTE'),\n    verBlur_tex=D.createTexture(width,height,null,'LINEAR','CLAMP_TO_EDGE','RGBA','RGBA','UNSIGNED_BYTE'),\n    thickness_tex=D.createTexture(halfWidth,halfHeight,null,'LINEAR','CLAMP_TO_EDGE','R16F','RED','FLOAT'),\n    thicknessHorBlur_tex=D.createTexture(halfWidth,halfHeight,null,'LINEAR','CLAMP_TO_EDGE','R16F','RED','FLOAT'),\n    thicknessVerBlur_tex=D.createTexture(halfWidth,halfHeight,null,'LINEAR','CLAMP_TO_EDGE','R16F','RED','FLOAT'),\n    finalRender_tex=D.createTexture(width,height,null,'LINEAR','CLAMP_TO_EDGE','RGBA','RGBA','UNSIGNED_BYTE'),\n    \n    normals_fb=D.createFramebuffer(normals_tex,true),\n    horBlur_fb=D.createFramebuffer(horBlur_tex),\n    verBlur_fb=D.createFramebuffer(verBlur_tex),\n    thickness_fb=D.createFramebuffer(thickness_tex),\n    thicknessHorBlur_fb=D.createFramebuffer(thicknessHorBlur_tex),\n    thicknessVerBlur_fb=D.createFramebuffer(thicknessVerBlur_tex),\n    finalRender_fb=D.createFramebuffer(finalRender_tex)\n\n\nD.bindFramebuffer(null)\n\n//{\nlet _gridSize=`\nvec3 gridSize=vec3(${GRID_WIDTH+','+GRID_HEIGHT+','+GRID_LENGTH});`,\n    _gridResolution=`\nvec3 gridResolution=vec3(${gridResolutionX+','+gridResolutionY+','+gridResolutionZ});`,\n\n    _get3DFragCoord=`\nvec3 get3DFragCoord(vec3 resolution){\n    return vec3(\n        mod(gl_FragCoord.x,resolution.x),\n        gl_FragCoord.y,\n        floor(gl_FragCoord.x/resolution.x)+0.5);\n}`,\n    _texture3D=`\nvec4 texture3D(sampler2D tex,vec3 coordinates,vec3 resolution){\n    vec3 fullCoordinates=coordinates*resolution;\n\n    fullCoordinates=clamp(fullCoordinates,vec3(0.5),vec3(resolution-0.5));\n\n    float belowZIndex=floor(fullCoordinates.z-0.5);\n    float aboveZIndex=belowZIndex+1.0; \n\n    float fraction=fract(fullCoordinates.z-0.5);\n\n    vec2 belowCoordinates=vec2(\n        belowZIndex*resolution.x+fullCoordinates.x,\n        fullCoordinates.y)/vec2(resolution.x*resolution.z,resolution.y);\n\n    vec2 aboveCoordinates=vec2(\n        aboveZIndex*resolution.x+fullCoordinates.x,\n        fullCoordinates.y)/vec2(resolution.x*resolution.z,resolution.y);\n\n    return mix(texture(tex,belowCoordinates),texture(tex,aboveCoordinates),fraction);\n}`,\n_texture3DNearest=`\nvec4 texture3DNearest(sampler2D tex,vec3 coordinates,vec3 resolution){\n    vec3 fullCoordinates=coordinates*resolution;\n\n    fullCoordinates=clamp(fullCoordinates,vec3(0.5),vec3(resolution-0.5));\n\n    float zIndex=floor(fullCoordinates.z);\n\n    vec2 textureCoordinates=vec2(\n        zIndex*resolution.x+fullCoordinates.x,\n        fullCoordinates.y)/vec2(resolution.x*resolution.z,resolution.y);\n\n    return texture(tex,textureCoordinates);\n}`\n\n//}\n\nlet convertToGrid_pro=D.createProgram(`#version 300 es\nprecision mediump float;\n    \n    in vec2 vertPos;\n    \n    out vec2 pixUV;\n    \n    uniform sampler2D positionTexture;\n    uniform sampler2D velocityTexture;\n    \n    uniform float zOffset;\n    \n    out vec3 pixPosition;\n    out vec3 pixVelocity;\n    out float pixZIndex;\n    \n    ${_gridSize}\n    ${_gridResolution}\n    \n    void main(){\n        \n        gl_PointSize=3.0;\n        vec3 position=texture(positionTexture,vertPos).rgb;\n        position=(position/gridSize)*gridResolution;\n        vec3 velocity=texture(velocityTexture,vertPos).rgb;\n        pixVelocity=velocity;\n        pixPosition=position;\n        \n        vec3 cellIndex=vec3(floor(position));\n        pixZIndex=cellIndex.z+zOffset;\n        \n        vec2 textureCoordinates=vec2(pixZIndex*(gridResolution.x+1.0)+cellIndex.x+0.5,cellIndex.y+0.5)/vec2((gridResolution.x+1.0)*(gridResolution.z+1.0),gridResolution.y+1.0);\n        \n        gl_Position=vec4(textureCoordinates*2.0-1.0,0,1);\n    }\n\n`,`#version 300 es\nprecision mediump float;\n\n    in vec3 pixPosition;\n    in vec3 pixVelocity;\n    in float pixZIndex;\n    \n    uniform int accumulate;\n    \n    float h(float r){\n        if(r>=0.0&&r<=1.0){\n            return 1.0-r;\n        }else if(r>=-1.0&&r<=0.0){\n            return 1.0+r;\n        }else{\n            return 0.0;\n        }\n    }\n    \n    float k(vec3 v){\n        return h(v.x)*h(v.y)*h(v.z);\n    }\n    \n    ${_gridResolution}\n    \n    ${_get3DFragCoord}\n    \n    out vec4 FragColor;\n    \n    void main(){\n        \n        vec3 cellIndex=floor(get3DFragCoord(gridResolution+1.0));\n    \n        if(cellIndex.z==pixZIndex){\n            \n            vec3 xPosition=vec3(cellIndex.x,cellIndex.y+0.5,cellIndex.z+0.5);\n            float xWeight=k(pixPosition-xPosition);\n            \n            vec3 yPosition=vec3(cellIndex.x+0.5,cellIndex.y,cellIndex.z+0.5);\n            float yWeight=k(pixPosition-yPosition);\n            \n            vec3 zPosition=vec3(cellIndex.x+0.5,cellIndex.y+0.5,cellIndex.z);\n            float zWeight=k(pixPosition-zPosition);\n            \n            vec3 scalarPosition=vec3(cellIndex.x+0.5,cellIndex.y+0.5,cellIndex.z+0.5);\n            float scalarWeight=k(pixPosition-scalarPosition);\n            \n            if(accumulate==0){\n                FragColor=vec4(xWeight,yWeight,zWeight,scalarWeight);\n            }else if(accumulate==1){\n                FragColor=vec4(xWeight*pixVelocity.x,yWeight*pixVelocity.y,zWeight*pixVelocity.z,0);\n            }\n            \n        }else{\n            FragColor=vec4(0,0,0,0);\n        }\n    }\n`,1),\n\n    normalizeGrid_pro=D.createProgram(D.DEFAULT_POST_PROCESSING_VSH,`#version 300 es\nprecision mediump float;\n\n    in vec2 pixUV;\n    \n    uniform sampler2D accumulatedVelocityTexture;\n    uniform sampler2D weightTexture;\n    \n    out vec4 FragColor;\n    \n    void main(){\n        \n        vec3 accumulatedVelocity=texture(accumulatedVelocityTexture,pixUV).rgb;\n        vec3 weight=texture(weightTexture,pixUV).rgb;\n    \n        float xVelocity=0.0;\n        if(weight.x>0.0)\n            xVelocity=accumulatedVelocity.x/weight.x;\n    \n        float yVelocity=0.0;\n        if(weight.y>0.0)\n            yVelocity=accumulatedVelocity.y/weight.y;\n    \n        float zVelocity=0.0;\n        if(weight.z>0.0)\n            zVelocity=accumulatedVelocity.z/weight.z;\n    \n        FragColor=vec4(xVelocity,yVelocity,zVelocity,0);\n    }\n`,1),\n\n    marker_pro=D.createProgram(`#version 300 es\nprecision mediump float;\n    \n    in vec2 vertPos;\n    \n    uniform sampler2D positionTexture;\n    \n    ${_gridSize}\n    ${_gridResolution}\n    \n    void main(){\n        \n        gl_PointSize=1.0;\n        \n        vec3 position=texture(positionTexture,vertPos).rgb;\n        position=(position/gridSize)*gridResolution;\n        vec3 cellIndex=floor(position);\n        \n        vec2 textureCoordinates=vec2(cellIndex.z*gridResolution.x+cellIndex.x+0.5,cellIndex.y+0.5)/vec2(gridResolution.x*gridResolution.z,gridResolution.y);\n        \n        gl_Position=vec4(textureCoordinates*2.0-1.0,0,1);\n    }\n`,`#version 300 es\nprecision mediump float;\n    \n    out vec4 FragColor;\n    \n    void main(){\n        \n        FragColor=vec4(1);\n    }\n`,1),\n    copy_pro=D.createProgram(D.DEFAULT_POST_PROCESSING_VSH,`#version 300 es\nprecision mediump float;\n\n    in vec2 pixUV;\n    \n    uniform sampler2D tex;\n    \n    out vec4 FragColor;\n    \n    void main(){\n        \n        FragColor=texture(tex,pixUV);\n    }\n`,1),\n    addForce_pro=D.createProgram(D.DEFAULT_POST_PROCESSING_VSH,`#version 300 es\nprecision mediump float;\n\n    in vec2 pixUV;\n    \n    uniform sampler2D velocityTexture;\n\n    uniform vec3 mouseVelocity;\n    uniform vec3 mouseRayOrigin;\n    uniform vec3 mouseRayDirection;\n    \n    uniform float dt;\n    \n    ${_gridSize}\n    ${_gridResolution}\n    ${_get3DFragCoord}\n    \n    float kernel(vec3 position,float radius){\n        vec3 worldPosition=(position/gridResolution)*gridSize;\n    \n        float distanceToMouseRay=length(cross(mouseRayDirection,worldPosition-mouseRayOrigin));\n    \n        float normalizedDistance=max(0.0,distanceToMouseRay/radius);\n        return smoothstep(1.0,0.9,normalizedDistance);\n    }\n    \n    out vec4 FragColor;\n    \n    void main(){\n        \n        vec3 velocity=texture(velocityTexture,pixUV).rgb+vec3(0,${D.floatify(-40.0*gravity)}*dt,0);\n    \n        vec3 cellIndex=floor(get3DFragCoord(gridResolution+1.0));\n        vec3 xPosition=vec3(cellIndex.x,cellIndex.y+0.5,cellIndex.z+0.5);\n        vec3 yPosition=vec3(cellIndex.x+0.5,cellIndex.y,cellIndex.z+0.5);\n        vec3 zPosition=vec3(cellIndex.x+0.5,cellIndex.y+0.5,cellIndex.z);\n        \n        float mouseRadius=${D.floatify(stirRadius)};\n        vec3 kernelValues=vec3(kernel(xPosition,mouseRadius),kernel(yPosition,mouseRadius),kernel(zPosition,mouseRadius));\n    \n        velocity+=mouseVelocity*kernelValues*${D.floatify(stirStrength)}*smoothstep(0.0,0.005,dt);\n        \n        if(cellIndex.x<0.5)\n            velocity.x=0.0;\n        \n        if(cellIndex.x>gridResolution.x-0.5)\n            velocity.x=0.0;\n        \n        if(cellIndex.y<0.5)\n            velocity.y=0.0;\n        \n        if(cellIndex.y>gridResolution.y-0.5)\n            velocity.y=min(velocity.y,0.0);\n        \n        if(cellIndex.z<0.5)\n            velocity.z=0.0;\n        \n        if(cellIndex.z>gridResolution.z-0.5)\n            velocity.z=0.0;\n        \n        FragColor=vec4(velocity,0);\n    }\n`,1),\n    divergence_pro=D.createProgram(D.DEFAULT_POST_PROCESSING_VSH,`#version 300 es\nprecision mediump float;\n\n    in vec2 pixUV;\n    \n    uniform sampler2D velocityTexture;\n    uniform sampler2D markerTexture;\n    uniform sampler2D weightTexture;\n    \n    ${_gridResolution}\n    ${_texture3DNearest}\n    ${_get3DFragCoord}\n    float maxDensity=${D.floatify(PARTICLES_PER_CELL)};\n    \n    out vec4 FragColor;\n    \n    void main(){\n        \n        vec3 cellIndex=floor(get3DFragCoord(gridResolution));\n    \n        float fluidCell=texture3DNearest(markerTexture,(cellIndex+0.5)/gridResolution,gridResolution).x;\n        \n        if(fluidCell==0.0)discard;\n        \n        float leftX=texture3DNearest(velocityTexture,(cellIndex+0.5)/(gridResolution+1.0),gridResolution+1.0).x;\n        float rightX=texture3DNearest(velocityTexture,(cellIndex+vec3(1.0,0.0,0.0)+0.5)/(gridResolution+1.0),gridResolution+1.0).x;\n    \n        float bottomY=texture3DNearest(velocityTexture,(cellIndex+0.5)/(gridResolution+1.0),gridResolution+1.0).y;\n        float topY=texture3DNearest(velocityTexture,(cellIndex+vec3(0.0,1.0,0.0)+0.5)/(gridResolution+1.0),gridResolution+1.0).y;\n    \n        float backZ=texture3DNearest(velocityTexture,(cellIndex+0.5)/(gridResolution+1.0),gridResolution+1.0).z;\n        float frontZ=texture3DNearest(velocityTexture,(cellIndex+vec3(0.0,0.0,1.0)+0.5)/(gridResolution+1.0),gridResolution+1.0).z;\n    \n        float divergence=((rightX-leftX)+(topY-bottomY)+(frontZ-backZ));\n    \n        float density=texture3DNearest(weightTexture,(cellIndex+0.5)/(gridResolution+1.0),gridResolution+1.0).a;\n        \n        divergence-=max((density-maxDensity),0.0);\n        \n        FragColor=vec4(divergence,1,0,0);\n    }\n`,1),\n    jacobi_pro=D.createProgram(D.DEFAULT_POST_PROCESSING_VSH,`#version 300 es\nprecision mediump float;\n\n    in vec2 pixUV;\n\n    uniform sampler2D divergenceTexture;\n    uniform sampler2D markerTexture;\n    uniform sampler2D pressureTexture;\n    \n    ${_gridResolution}\n    ${_get3DFragCoord}\n    ${_texture3DNearest}\n    \n    out vec4 FragColor;\n    \n    vec3 delta=1.0/vec3(${gridResolutionX},${gridResolutionY},${gridResolutionZ});\n    \n    void main(){\n        \n        vec3 centerCoords=get3DFragCoord(gridResolution)/gridResolution;\n        \n        float fluidCell=texture3DNearest(markerTexture,centerCoords,gridResolution).x;\n        if(fluidCell==0.0)discard;\n        \n        float divergenceCenter=texture3DNearest(divergenceTexture,centerCoords,gridResolution).r;\n        \n        float left=texture3DNearest(pressureTexture,centerCoords+vec3(-delta.x,0.0,0.0),gridResolution).r;\n        float right=texture3DNearest(pressureTexture,centerCoords+vec3(delta.x,0.0,0.0),gridResolution).r;\n        float bottom=texture3DNearest(pressureTexture,centerCoords+vec3(0.0,-delta.y,0.0),gridResolution).r;\n        float top=texture3DNearest(pressureTexture,centerCoords+vec3(0.0,delta.y,0.0),gridResolution).r;\n        float back=texture3DNearest(pressureTexture,centerCoords+vec3(0.0,0.0,-delta.z),gridResolution).r;\n        float front=texture3DNearest(pressureTexture,centerCoords+vec3(0.0,0.0,delta.z),gridResolution).r;\n        \n        float newPressure=(left+right+bottom+top+back+front-divergenceCenter)/6.0;\n        \n        FragColor=vec4(newPressure,0,0,0);\n    }\n`,1),\n    subtract_pro=D.createProgram(D.DEFAULT_POST_PROCESSING_VSH,`#version 300 es\nprecision mediump float;\n\n    in vec2 pixUV;\n    \n    uniform sampler2D pressureTexture;\n    uniform sampler2D velocityTexture;\n    \n    ${_gridResolution}\n    ${_get3DFragCoord}\n    ${_texture3DNearest}\n    \n    out vec4 FragColor;\n    \n    void main(){\n        \n        vec3 cellIndex=floor(get3DFragCoord(gridResolution+1.0));\n    \n        float left=texture3DNearest(pressureTexture,(cellIndex+vec3(-1.0,0.0,0.0)+0.5)/gridResolution,gridResolution).r;\n        float right=texture3DNearest(pressureTexture,(cellIndex+0.5)/gridResolution,gridResolution).r;\n    \n        float bottom=texture3DNearest(pressureTexture,(cellIndex+vec3(0.0,-1.0,0.0)+0.5)/gridResolution,gridResolution).r;\n        float top=texture3DNearest(pressureTexture,(cellIndex+0.5)/gridResolution,gridResolution).r;\n    \n        float back=texture3DNearest(pressureTexture,(cellIndex+vec3(0.0,0.0,-1.0)+0.5)/gridResolution,gridResolution).r;\n        float front=texture3DNearest(pressureTexture,(cellIndex+0.5)/gridResolution,gridResolution).r;\n        \n        vec3 gradient=vec3(right-left,top-bottom,front-back);\n        \n        vec3 currentVelocity=texture(velocityTexture,pixUV).rgb;\n        \n        vec3 newVelocity=currentVelocity-gradient;\n        \n        FragColor=vec4(newVelocity,0);\n    }\n`,1),\n    transferToParticles_pro=D.createProgram(D.DEFAULT_POST_PROCESSING_VSH,`#version 300 es\nprecision mediump float;\n\n    in vec2 pixUV;\n    \n    uniform sampler2D particlePositionTexture;\n    uniform sampler2D particleVelocityTexture;\n    uniform sampler2D gridVelocityTexture;\n    uniform sampler2D originalGridVelocityTexture;\n    \n    \n    ${_gridResolution}\n    ${_gridSize}\n    ${_texture3D}\n    \n    float sampleXVelocity(sampler2D tex,vec3 position){\n        vec3 cellIndex=vec3(position.x,position.y-0.5,position.z-0.5);\n        return texture3D(tex,(cellIndex+0.5)/(gridResolution+1.0),gridResolution+1.0).x;\n    }\n    \n    float sampleYVelocity(sampler2D tex,vec3 position){\n        vec3 cellIndex=vec3(position.x-0.5,position.y,position.z-0.5);\n        return texture3D(tex,(cellIndex+0.5)/(gridResolution+1.0),gridResolution+1.0).y;\n    }\n    \n    float sampleZVelocity(sampler2D tex,vec3 position){\n        vec3 cellIndex=vec3(position.x-0.5,position.y-0.5,position.z);\n        return texture3D(tex,(cellIndex+0.5)/(gridResolution+1.0),gridResolution+1.0).z;\n    }\n    \n    vec3 sampleVelocity(sampler2D tex,vec3 position){\n        return vec3(sampleXVelocity(tex,position),sampleYVelocity(tex,position),sampleZVelocity(tex,position));\n    }\n    \n    \n    float flipness=${D.floatify(PIC_FLIP_RATIO)};\n    \n    out vec4 FragColor;\n    \n    void main(){\n        \n        vec3 particlePosition=texture(particlePositionTexture,pixUV).rgb;\n        particlePosition=(particlePosition/gridSize)*gridResolution;\n    \n        vec3 particleVelocity=texture(particleVelocityTexture,pixUV).rgb;\n    \n        vec3 currentVelocity=sampleVelocity(gridVelocityTexture,particlePosition);\n        vec3 originalVelocity=sampleVelocity(originalGridVelocityTexture,particlePosition);\n    \n        vec3 velocityChange=currentVelocity-originalVelocity;\n    \n        vec3 flipVelocity=particleVelocity+velocityChange;\n        vec3 picVelocity=currentVelocity;\n    \n        FragColor=vec4(mix(picVelocity,flipVelocity,flipness),1);\n    }\n`,1),\n    advect_pro=D.createProgram(D.DEFAULT_POST_PROCESSING_VSH,`#version 300 es\nprecision mediump float;\n\n    in vec2 pixUV;\n    \n    uniform sampler2D positionsTexture;\n    uniform sampler2D randomsTexture;\n    uniform sampler2D velocityGrid;\n    \n    uniform float dt;\n    uniform float frameNumber;\n    \n    ${_gridResolution}\n    ${_gridSize}\n    ${_texture3D}\n    vec2 particlesResolution=vec2(${particlesWidth},${particlesHeight});\n    \n    float sampleXVelocity(vec3 position){\n        vec3 cellIndex=vec3(position.x,position.y-0.5,position.z-0.5);\n        return texture3D(velocityGrid,(cellIndex+0.5)/(gridResolution+1.0),gridResolution+1.0).x;\n    }\n    \n    float sampleYVelocity(vec3 position){\n        vec3 cellIndex=vec3(position.x-0.5,position.y,position.z-0.5);\n        return texture3D(velocityGrid,(cellIndex+0.5)/(gridResolution+1.0),gridResolution+1.0).y;\n    }\n    \n    float sampleZVelocity(vec3 position){\n        vec3 cellIndex=vec3(position.x-0.5,position.y-0.5,position.z);\n        return texture3D(velocityGrid,(cellIndex+0.5)/(gridResolution+1.0),gridResolution+1.0).z;\n    }\n    \n    vec3 sampleVelocity(vec3 position){\n        vec3 gridPosition=(position/gridSize)*gridResolution;\n        return vec3(sampleXVelocity(gridPosition),sampleYVelocity(gridPosition),sampleZVelocity(gridPosition));\n    }\n    \n    out vec4 FragColor;\n    \n    void main(){\n        \n        vec3 position=texture(positionsTexture,pixUV).rgb;\n        vec3 randomDirection=texture(randomsTexture,fract(pixUV+frameNumber/particlesResolution)).rgb;\n        \n        vec3 velocity=sampleVelocity(position);\n        \n        vec3 halfwayPosition=position+velocity*dt*0.5;\n        vec3 halfwayVelocity=sampleVelocity(halfwayPosition);\n        \n        vec3 step=halfwayVelocity*dt;\n        \n        step+=0.05*randomDirection*length(velocity)*dt;\n        \n        vec3 newPosition=position+step;\n        \n        newPosition=clamp(newPosition,vec3(0.01),gridSize-0.01);\n        \n        FragColor=vec4(newPosition,1);\n    }\n`,1),\n    surfaceRenderer_pro=D.createProgram(`#version 300 es\nprecision mediump float;\n\n    in vec2 vertPos;\n    \n    uniform sampler2D positionTexture;\n    uniform mat4 viewMatrix;\n    \n    out float particleSize;\n    out vec2 particlePos;\n    \n    void main(){\n        \n        vec3 position=texture(positionTexture,vertPos).rgb;\n        \n        vec4 pos=viewMatrix*vec4(position,1);\n        particlePos=pos.xy/pos.w;\n        gl_Position=pos;\n        float projSize=min(${D.floatify(PARTICLE_SIZE)}/pos.z,250.0);\n        gl_PointSize=projSize;\n        particleSize=projSize*0.5;\n    }\n`,`#version 300 es\nprecision mediump float;\n\n    in float particleSize;\n    in vec2 particlePos;\n    \n    uniform mat4 cameraMatrixTranspose;\n    \n    out vec4 FragColor;\n    \n    vec2 halfScreen=vec2(${width*0.5},${height*0.5});\n    vec2 invHalfScreen=1.0/vec2(${width*0.5},${height*0.5});\n    float invAvgHalfWidthHeight=${D.floatify(4/(width+height))};\n    \n    void main(){\n        \n        vec2 del=particlePos-(gl_FragCoord.xy-halfScreen)*invHalfScreen;\n        \n        float rad=particleSize*invAvgHalfWidthHeight;\n        float radSq=rad*rad;\n        float pixDistSq=del.x*del.x+del.y*del.y;\n        \n        if(pixDistSq>radSq)\n            discard;\n        \n        float c=smoothstep(1.0,0.0,pixDistSq/radSq);\n        \n        FragColor=vec4(0,c*0.4,c,1);\n        \n        del/=rad;\n        \n        float zVal=sqrt(1.1-del.x*del.x-del.y*del.y);\n        vec3 normal=normalize(mat3(cameraMatrixTranspose)*vec3(-del,zVal));\n        \n        gl_FragDepth=gl_FragCoord.z-(sqrt(1.0-dot(del,del))*rad)*${D.floatify(1/PARTICLE_SIZE)};\n        FragColor=vec4(normal*0.5+0.5,pow(gl_FragDepth,850.0));\n    }\n`,1),\n    thicknessRenderer_pro=D.createProgram(`#version 300 es\nprecision mediump float;\n\n    in vec2 vertPos;\n    \n    uniform sampler2D positionTexture;\n    uniform mat4 viewMatrix;\n    \n    out float particleSize;\n    out vec2 particlePos;\n    \n    void main(){\n        \n        vec3 position=texture(positionTexture,vertPos).rgb;\n        \n        vec4 pos=viewMatrix*vec4(position,1);\n        particlePos=pos.xy/pos.w;\n        gl_Position=pos;\n        float projSize=min(${D.floatify(PARTICLE_SIZE)}/pos.z,250.0);\n        gl_PointSize=projSize;\n        particleSize=projSize*0.5;\n    }\n`,`#version 300 es\nprecision mediump float;\n\n    in float particleSize;\n    in vec2 particlePos;\n    \n    out vec4 FragColor;\n    \n    vec2 halfScreen=vec2(${halfWidth*0.5},${halfHeight*0.5});\n    vec2 invHalfScreen=1.0/vec2(${halfWidth*0.5},${halfHeight*0.5});\n    float invAvgHalfWidthHeight=${D.floatify(4/(halfWidth+halfHeight))};\n    \n    void main(){\n        \n        vec2 del=particlePos-(gl_FragCoord.xy-halfScreen)*invHalfScreen;\n        \n        float rad=particleSize*invAvgHalfWidthHeight;\n        \n        if(del.x*del.x+del.y*del.y>rad*rad)\n            discard;\n        \n        FragColor=vec4(0.002,0,0,1);\n        \n    }\n`,1),\n    horBlur_pro=D.createProgram(D.DEFAULT_POST_PROCESSING_VSH,`#version 300 es\nprecision mediump float;\n\n    in vec2 pixUV;\n    \n    uniform sampler2D tex;\n    \n    out vec4 FragColor;\n    \n    void main(){\n        \n        vec3 accum=vec3(0);\n        float weight=0.0;\n        \n        vec4 center=texture(tex,pixUV);\n        float depth=center.a;\n        \n        for(int i=-15;i<=15;i++){\n            \n            vec4 sam=texture(tex,pixUV+vec2(i,0)*${D.floatify(1/width)});\n            vec3 col=sam.rgb;\n            \n            if(sam.w>=0.0){\n                float samWeight=exp(-30.0*abs(depth-sam.w));\n                weight+=samWeight;\n                accum+=col*samWeight;\n                \n            }else{\n                weight+=1.0;\n                accum+=center.rgb;\n            }\n        }\n        \n        FragColor=vec4(accum/weight,depth);\n        // FragColor=vec4(texture(tex,pixUV).rgb,1);\n    }\n`,1),\n    verBlur_pro=D.createProgram(D.DEFAULT_POST_PROCESSING_VSH,`#version 300 es\nprecision mediump float;\n\n    in vec2 pixUV;\n    \n    uniform sampler2D tex;\n    \n    out vec4 FragColor;\n    \n    void main(){\n        \n        vec3 accum=vec3(0);\n        float weight=0.0;\n        \n        vec4 center=texture(tex,pixUV);\n        float depth=center.a;\n        \n        for(int i=-15;i<=15;i++){\n            \n            vec4 sam=texture(tex,pixUV+vec2(0,i)*${D.floatify(1/height)});\n            vec3 col=sam.rgb;\n            \n            if(sam.w>=0.0){\n                \n                float samWeight=exp(-30.0*abs(depth-sam.w));\n                weight+=samWeight;\n                accum+=col*samWeight;\n                \n            }else{\n                weight+=1.0;\n                accum+=center.rgb;\n            }\n        }\n        \n        FragColor=vec4(accum/weight,1);\n        // FragColor=vec4(texture(tex,pixUV).rgb,1);\n    }\n`,1),\n    lightHorBlur_pro=D.createProgram(D.DEFAULT_POST_PROCESSING_VSH,`#version 300 es\nprecision mediump float;\n\n    in vec2 pixUV;\n    \n    uniform sampler2D tex;\n    \n    out vec4 FragColor;\n    \n    void main(){\n        \n        float accum=0.0;\n        \n        for(int i=-3;i<=3;i++)\n            accum+=texture(tex,pixUV+vec2(i,0)*${D.floatify(4/width)}).r;\n        \n        FragColor=vec4(accum*0.1,0,0,1);\n    }\n`,1),\n    lightVerBlur_pro=D.createProgram(D.DEFAULT_POST_PROCESSING_VSH,`#version 300 es\nprecision mediump float;\n\n    in vec2 pixUV;\n    \n    uniform sampler2D tex;\n    \n    out vec4 FragColor;\n    \n    void main(){\n        \n        float accum=0.0;\n        \n        for(int i=-5;i<=5;i++)\n            accum+=texture(tex,pixUV+vec2(0,i)*${D.floatify(4/height)}).r;\n        \n        FragColor=vec4(accum*0.1,0,0,1);\n    }\n`,1),\n    final_pro=D.createProgram(D.DEFAULT_POST_PROCESSING_VSH,`#version 300 es\nprecision mediump float;\n\n    in vec2 pixUV;\n    \n    uniform sampler2D stencilTex;\n    uniform sampler2D normalTex;\n    uniform sampler2D thicknessTex;\n    uniform vec3 camDir;\n    \n    out vec4 FragColor;\n    \n    void main(){\n        \n        vec3 sten=texture(stencilTex,pixUV).rgb;\n        if(dot(sten,sten)<=0.0)discard;\n        \n        vec3 normal=normalize(texture(normalTex,pixUV).rgb*2.0-1.0);\n        float thickness=texture(thicknessTex,pixUV).r;\n        \n        float alpha=exp(${D.floatify(TRANSLUCENCY/(particlesCount/totalVolume))}*-thickness);\n        \n        vec3 col=mix(vec3(${LIQUID_COLOR})*(normal.y*0.3+0.7),vec3(0),alpha);\n        \n        float viewShear=1.0/max(abs(camDir.y),0.01);\n        \n        vec3 d=reflect(vec3(0,1,0),normal);\n        \n        //no idea how i stumbled upon this but it looks realer than whatever other things there are. sadly has a few flaws but otherwise looks slay\n        float spec=pow(clamp(dot(-camDir,d)*0.5+pow(fract(sin(normal.x*10.0*viewShear)*sin(normal.z*10.0*viewShear)),100.0),0.0,1.0),200.0);\n        \n        alpha=1.0-alpha;\n        \n        FragColor=vec4(col+spec*0.75*alpha,1);\n    }\n`,1),\n    view_pro=D.createProgram(D.DEFAULT_POST_PROCESSING_VSH,`#version 300 es\nprecision mediump float;\n\n    in vec2 pixUV;\n    \n    uniform sampler2D tex;\n    \n    out vec4 FragColor;\n    \n    void main(){\n        \n        FragColor=vec4(texture(tex,pixUV).rgb,1);\n    }\n`,1),\n    DBAA_pro=D.createProgram(D.DEFAULT_POST_PROCESSING_VSH,`\n#version 300 es\nprecision mediump float;\n\nin vec2 pixUV;\n\nuniform sampler2D tex;\n\nout vec4 FragColor;\n\nvec4 getCol(vec2 uv){\n    vec3 c=texture(tex,uv).rgb;\n    return vec4(c,dot(c,vec3(0.299,0.587,0.114)));\n}\n\nconst float range=5.;\nconst vec2 pix=1.0/vec2(${width},${height});\nconst float bias=0.05;\n\nvec3 DirectionalBlendingAntiAliasing(vec2 pixUV){\n    vec4 thisCol=getCol(pixUV);\n    float thisABiased=thisCol.a+bias;\n    vec3 finalCol=thisCol.rgb;\n    vec4 leftCol=getCol(pixUV+vec2(-pix.x,0));\n    vec4 rightCol=getCol(pixUV+vec2(pix.x,0));\n    vec4 topCol=getCol(pixUV+vec2(0,pix.y));\n    vec4 bottomCol=getCol(pixUV+vec2(0,-pix.y));\n    \n    if(topCol.a>thisABiased){\n        vec2 ss=vec2(range,range);\n        for(float i=1.;i<=range;i++){\n            vec4 adjacent=getCol(pixUV+vec2(i*pix.x,pix.y));\n            if(adjacent.a>thisABiased){\n                vec4 forward=getCol(pixUV+vec2(pix.x*(i+1.),0));\n                if(abs(forward.a-adjacent.a)<bias&&forward.a>thisCol.a){\n                    ss.x=i;\n                    break;\n                }\n            }else{\n                ss.y=i;\n                break;\n            }\n        }\n        for(float i=1.;i<=range;i++){\n            vec4 adjacent=getCol(pixUV+vec2(-i*pix.x,pix.y));\n            if(adjacent.a>thisABiased){\n                vec4 forward=getCol(pixUV+vec2(pix.x*-(i+1.),0));\n                if(abs(forward.a-adjacent.a)<bias&&forward.a>thisCol.a){\n                    ss.x=i;\n                    break;\n                }\n            }else{\n                ss.y=i;\n                break;\n            }\n        }\n        finalCol=mix(finalCol,topCol.rgb,((ss.y-ss.x)/max(ss.x,ss.y))*0.5+0.5);\n    }else\n    if(bottomCol.a>thisABiased){\n        vec2 ss=vec2(range,range);\n        for(float i=1.;i<=range;i++){\n            vec4 adjacent=getCol(pixUV+vec2(i*pix.x,-pix.y));\n            if(adjacent.a>thisABiased){\n                vec4 forward=getCol(pixUV+vec2(pix.x*(i+1.),0));\n                if(abs(forward.a-adjacent.a)<bias&&forward.a>thisCol.a){\n                    ss.x=i;\n                    break;\n                }\n            }else{\n                ss.y=i;\n                break;\n            }\n        }\n        for(float i=1.;i<=range;i++){\n            vec4 adjacent=getCol(pixUV+vec2(-i*pix.x,-pix.y));\n            if(adjacent.a>thisABiased){\n                vec4 forward=getCol(pixUV+vec2(pix.x*-(i+1.),0));\n                if(abs(forward.a-adjacent.a)<bias&&forward.a>thisCol.a){\n                    ss.x=i;\n                    break;\n                }\n            }else{\n                ss.y=i;\n                break;\n            }\n        }\n        finalCol=mix(finalCol,bottomCol.rgb,((ss.y-ss.x)/max(ss.x,ss.y))*0.5+0.5);\n    }\n    if(leftCol.a>thisABiased){\n        vec2 ss=vec2(range,range);\n        for(float i=1.;i<=range;i++){\n            vec4 adjacent=getCol(pixUV+vec2(-pix.x,i*pix.y));\n            if(adjacent.a>thisABiased){\n                vec4 forward=getCol(pixUV+vec2(0,pix.y*(i+1.)));\n                if(abs(forward.a-adjacent.a)<bias&&forward.a>thisCol.a){\n                    ss.x=i;\n                    break;\n                }\n            }else{\n                ss.y=i;\n                break;\n            }\n        }\n        for(float i=1.;i<=range;i++){\n            vec4 adjacent=getCol(pixUV+vec2(-pix.x,-i*pix.y));\n            if(adjacent.a>thisABiased){\n                vec4 forward=getCol(pixUV+vec2(0,pix.y*-(i+1.)));\n                if(abs(forward.a-adjacent.a)<bias&&forward.a>thisCol.a){\n                    ss.x=i;\n                    break;\n                }\n            }else{\n                ss.y=i;\n                break;\n            }\n        }\n        finalCol=mix(finalCol,leftCol.rgb,((ss.y-ss.x)/max(ss.x,ss.y))*0.5+0.5);\n    }else\n    if(rightCol.a>thisABiased){\n        vec2 ss=vec2(range,range);\n        for(float i=1.;i<=range;i++){\n            vec4 adjacent=getCol(pixUV+vec2(pix.x,i*pix.y));\n            if(adjacent.a>thisABiased){\n                vec4 forward=getCol(pixUV+vec2(0,pix.y*(i+1.)));\n                if(abs(forward.a-adjacent.a)<bias&&forward.a>thisCol.a){\n                    ss.x=i;\n                    break;\n                }\n            }else{\n                ss.y=i;\n                break;\n            }\n        }\n        for(float i=1.;i<=range;i++){\n            vec4 adjacent=getCol(pixUV+vec2(pix.x,-i*pix.y));\n            if(adjacent.a>thisABiased){\n                vec4 forward=getCol(pixUV+vec2(0,pix.y*-(i+1.)));\n                if(abs(forward.a-adjacent.a)<bias&&forward.a>thisCol.a){\n                    ss.x=i;\n                    break;\n                }\n            }else{\n                ss.y=i;\n                break;\n            }\n        }\n        finalCol=mix(finalCol,rightCol.rgb,((ss.y-ss.x)/max(ss.x,ss.y))*0.5+0.5);\n    }\n    return finalCol;\n}\nvoid main(){\n    \n    FragColor=vec4(DirectionalBlendingAntiAliasing(pixUV),1);\n    \n}`,1)\n\n\nlet screenMesh=D.createMesh(D.createMeshData({meshes:[{type:'plane',x:0,y:0,z:0,size:2,r:0,g:0,b:0,rx:90,ry:0,rz:0}],order:['x','y'],vl:0}),[['vertPos',2,8,0]])\n\n\nlet proj=D.perspectiveMatrix(50,aspect,0.1,200),mat=D.createIdentityMatrix(),TIME=0,then=performance.now(),dt,x=bX,y=bY,z=Math.max(bX,bY)*4,yaw=0,pitch=0,sense=0.005,vx=0,vy=0,vz=0\n\nlet mouseDown,viewInfo,\n    mouseVelocity=[0,0,0],\n    mouseRayDirection=[0,0,0],\n    lastMousePlanePos=[0,0],\n    keys={}\n\ndocument.onkeydown=(e)=>{\n    keys[e.key.toLowerCase()]=1\n    \n    if(e.key=='p'){\n        if(!timeMultiplier)timeMultiplier=window._timeMultiplier||0\n        window._timeMultiplier=timeMultiplier+0\n        timeMultiplier=0\n    }\n    if(e.key!='t')return\n    let w=window.open()\n    w.document.open()\n    w.document.write('<!doctype html><html>'+document.querySelector('html').innerHTML)\n    w.document.close()\n}\ndocument.onkeyup=(e)=>keys[e.key.toLowerCase()]=0\n\nuiCanvas.onmousedown=(e)=>{\n    if(!(mouseDown=e.button))\n        uiCanvas.requestPointerLock()\n}\nuiCanvas.onmouseup=(e)=>{\n    mouseDown=null\n}\nuiCanvas.onkeydown=(e)=>{\n    keys[e.key.toLowerCase()]=1\n}\n\nuiCanvas.onmousemove=(e)=>{\n    \n    if(mouseDown==0||document.pointerLockElement===uiCanvas){\n        \n        yaw+=e.movementX*sense\n        pitch=D.constrain(pitch+e.movementY*sense,-D.HALF_PI,D.HALF_PI)\n    }\n    \n    let mx=e.x/width,my=1-(e.y/height)\n    mx=mx*2-1\n    my=my*2-1\n    \n    let distance=Math.sqrt((bX-x)*(bX-x)+(bY-y)*(bY-y)+(bZ-z)*(bZ-z)),\n        viewSpaceMouseRay=[mx*aspect/proj[5],my/proj[5],-1],\n        planeX=viewSpaceMouseRay[0]*distance,\n        planeY=viewSpaceMouseRay[1]*distance,\n        mouseVelX=planeX-lastMousePlanePos[0],\n        mouseVelY=planeY-lastMousePlanePos[1],\n        camMat=viewInfo.modelMatrix\n        \n    vec3.transformMat4(mouseRayDirection,viewSpaceMouseRay,camMat)\n    \n    vec3.normalize(mouseRayDirection,mouseRayDirection)\n    \n    lastMousePlanePos[0]=planeX\n    lastMousePlanePos[1]=planeY\n    \n    mat4.invert(camMat,camMat)\n    \n    let camRight=[camMat[0],camMat[4],camMat[8]],\n        camUp=[camMat[1],camMat[5],camMat[9]]\n    \n    if(mouseDown==2||keys.m){\n        document.exitPointerLock()\n        mouseVelocity[0]=mouseVelX*camRight[0]+mouseVelY*camUp[0]\n        mouseVelocity[1]=mouseVelX*camRight[1]+mouseVelY*camUp[1]\n        mouseVelocity[2]=mouseVelX*camRight[2]+mouseVelY*camUp[2]\n    }else\n        mouseVelocity=[0,0,0]\n    \n}\n\n\nD.useProgram(convertToGrid_pro)\nD.setUniform('positionTexture',1)\nD.setUniform('velocityTexture',0)\n\nD.useProgram(normalizeGrid_pro)\nD.setUniform('accumulatedVelocityTexture',1)\nD.setUniform('weightTexture',0)\n\nD.useProgram(divergence_pro)\nD.setUniform('velocityTexture',2)\nD.setUniform('markerTexture',1)\nD.setUniform('weightTexture',0)\n\nD.useProgram(jacobi_pro)\nD.setUniform('divergenceTexture',2)\nD.setUniform('markerTexture',1)\nD.setUniform('pressureTexture',0)\n\nD.useProgram(subtract_pro)\nD.setUniform('pressureTexture',1)\nD.setUniform('velocityTexture',0)\n\nD.useProgram(transferToParticles_pro)\nD.setUniform('particlePositionTexture',3)\nD.setUniform('particleVelocityTexture',2)\nD.setUniform('gridVelocityTexture',1)\nD.setUniform('originalGridVelocityTexture',0)\n\nD.useProgram(advect_pro)\nD.setUniform('positionsTexture',2)\nD.setUniform('randomsTexture',1)\nD.setUniform('velocityGrid',0)\n\nD.useProgram(final_pro)\nD.setUniform('stencilTex',2)\nD.setUniform('normalTex',1)\nD.setUniform('thicknessTex',0)\n\n    \ngl.clearColor(0,0,0,1)\n\ngl.blendEquation(gl.FUNC_ADD)\ngl.blendFuncSeparate(gl.ONE,gl.ONE,gl.ONE,gl.ONE)\n\n\nlet frameCount=0\nfunction loop(now){\n    \n    frameCount++\n    dt=D.constrain((now-then)*0.001,0,0.05)\n    let timeStep=dt*timeMultiplier\n    TIME+=dt\n    \n    let sinYaw=Math.sin(yaw),cosYaw=Math.cos(yaw),dx=0,dy=0,dz=0\n    \n    if(keys.w){\n        dx+=sinYaw\n        dz-=cosYaw\n    }\n    if(keys.s){\n        dx-=sinYaw\n        dz+=cosYaw\n    }\n    if(keys.a){\n        dx-=cosYaw\n        dz-=sinYaw\n    }\n    if(keys.d){\n        dx+=cosYaw\n        dz+=sinYaw\n    }\n    if(keys[' '])\n        dy+=1\n    if(keys.shift)\n        dy-=1\n    \n    let d=1/(dt*moveDamp+1),dm=dt*moveSpeed/(Math.sqrt(dx*dx+dy*dy+dz*dz)||1)\n    vx=(vx+dx*dm)*d\n    vy=(vy+dy*dm)*d\n    vz=(vz+dz*dm)*d\n    x+=vx*dt\n    y+=vy*dt\n    z+=vz*dt\n    \n    \n    viewInfo=D.setViewMatrix(mat,proj,x,y,z,yaw,pitch)\n    \n    D.useProgram(convertToGrid_pro)\n\n    gl.enable(gl.BLEND)\n    \n    gl.bindBuffer(gl.ARRAY_BUFFER,particleVertBuffer)\n    gl.vertexAttribPointer(0,2,gl.FLOAT,gl.FALSE,8,0)\n    \n    gl.activeTexture(gl.TEXTURE1)\n    D.bindTexture(particlePosition_tex)\n    gl.activeTexture(gl.TEXTURE0)\n    D.bindTexture(particleVelocity_tex)\n    \n    D.bindFramebuffer(weight_fb)\n    gl.clear(gl.COLOR_BUFFER_BIT)\n    gl.viewport(0,0,velocitiesWidth,velocitiesHeight)\n    \n    D.setUniform('accumulate',[0])\n    \n    let SPLAT_DEPTH=5;\n    for(let z=-(SPLAT_DEPTH-1)/2;z<=(SPLAT_DEPTH-1)/2;++z){\n        \n        D.setUniform('zOffset',[z])\n        gl.drawArrays(gl.POINTS,0,particlesCount)\n    }\n    \n    D.bindFramebuffer(_velocity_fb)\n    gl.clear(gl.COLOR_BUFFER_BIT)\n    \n    D.setUniform('accumulate',[1])\n\n    for(let z=-(SPLAT_DEPTH-1)/2;z<=(SPLAT_DEPTH-1)/2;++z){\n        \n        D.setUniform('zOffset',[z])\n        gl.drawArrays(gl.POINTS,0,particlesCount)\n    }\n    \n    //normalization step\n    \n    gl.disable(gl.BLEND)\n    \n    D.useProgram(normalizeGrid_pro)\n    D.bindFramebuffer(velocity_fb)\n    \n    gl.activeTexture(gl.TEXTURE1)\n    D.bindTexture(_velocity_tex)\n    gl.activeTexture(gl.TEXTURE0)\n    D.bindTexture(weight_tex)\n\n    D.renderMesh(screenMesh)\n    \n    \n    //mark step\n    \n    D.useProgram(marker_pro)\n    D.bindFramebuffer(marker_fb)\n    gl.viewport(0,0,scalarWidth,scalarHeight)\n    gl.clear(gl.COLOR_BUFFER_BIT)\n    D.bindTexture(particlePosition_tex)\n    gl.bindBuffer(gl.ARRAY_BUFFER,particleVertBuffer)\n    gl.vertexAttribPointer(0,2,gl.FLOAT,gl.FALSE,8,0)\n    gl.drawArrays(gl.POINTS,0,particlesCount)\n    \n    \n    //copy original velocity\n    \n    D.useProgram(copy_pro)\n    D.bindFramebuffer(originalVelocity_fb)\n    gl.viewport(0,0,velocitiesWidth,velocitiesHeight)\n    D.bindTexture(velocity_tex)\n    D.renderMesh(screenMesh)\n    \n    \n    //add forces\n    \n    D.useProgram(addForce_pro)\n    D.bindFramebuffer(_velocity_fb)\n    D.bindTexture(velocity_tex)\n    \n    D.setUniform('dt',[timeStep])\n    D.setUniform('mouseVelocity',mouseVelocity)\n    D.setUniform('mouseRayOrigin',[x,y,z])\n    D.setUniform('mouseRayDirection',mouseRayDirection)\n    \n    D.renderMesh(screenMesh)\n    \n    let t=velocity_fb\n    velocity_fb=_velocity_fb\n    _velocity_fb=t\n    \n    t=velocity_tex\n    velocity_tex=_velocity_tex\n    _velocity_tex=t\n    \n    \n    //compute divergence\n    \n    D.useProgram(divergence_pro)\n    D.bindFramebuffer(divergence_fb)\n    gl.viewport(0,0,scalarWidth,scalarHeight)\n    \n    gl.activeTexture(gl.TEXTURE2)\n    D.bindTexture(velocity_tex)\n    gl.activeTexture(gl.TEXTURE1)\n    D.bindTexture(marker_tex)\n    gl.activeTexture(gl.TEXTURE0)\n    D.bindTexture(weight_tex)\n    \n    D.renderMesh(screenMesh)\n    \n    \n    //compute pressure with jacobi iteration\n    \n    D.useProgram(jacobi_pro)\n    \n    D.bindFramebuffer(pressure_fb)\n    gl.clear(gl.COLOR_BUFFER_BIT)\n    \n    gl.activeTexture(gl.TEXTURE2)\n    D.bindTexture(divergence_tex)\n    gl.activeTexture(gl.TEXTURE1)\n    D.bindTexture(marker_tex)\n    \n    gl.activeTexture(gl.TEXTURE0)\n    \n    for(let i=0;i<PRESSURE_JACOBI_ITERATIONS;++i){\n        \n        D.bindFramebuffer(_pressure_fb)\n        D.bindTexture(pressure_tex)\n        D.renderMesh(screenMesh)\n        \n        t=pressure_fb\n        pressure_fb=_pressure_fb\n        _pressure_fb=t\n        \n        t=pressure_tex\n        pressure_tex=_pressure_tex\n        _pressure_tex=t\n    }\n    \n    \n    //subtract pressure gradient from velocity\n    \n    D.useProgram(subtract_pro)\n    D.bindFramebuffer(_velocity_fb)\n    gl.viewport(0,0,velocitiesWidth,velocitiesHeight)\n    \n    \n    gl.activeTexture(gl.TEXTURE1)\n    D.bindTexture(pressure_tex)\n    gl.activeTexture(gl.TEXTURE0)\n    D.bindTexture(velocity_tex)\n    \n    D.renderMesh(screenMesh)\n    \n    t=velocity_fb\n    velocity_fb=_velocity_fb\n    _velocity_fb=t\n    \n    t=velocity_tex\n    velocity_tex=_velocity_tex\n    _velocity_tex=t\n    \n    \n    //transfer velocity back to particles\n    \n    D.useProgram(transferToParticles_pro)\n    D.bindFramebuffer(_particleVelocity_fb)\n    gl.viewport(0,0,particlesWidth,particlesHeight)\n    \n    gl.activeTexture(gl.TEXTURE3)\n    D.bindTexture(particlePosition_tex)\n    gl.activeTexture(gl.TEXTURE2)\n    D.bindTexture(particleVelocity_tex)\n    gl.activeTexture(gl.TEXTURE1)\n    D.bindTexture(velocity_tex)\n    gl.activeTexture(gl.TEXTURE0)\n    D.bindTexture(originalVelocity_tex)\n    \n    D.renderMesh(screenMesh)\n    \n    t=particleVelocity_fb\n    particleVelocity_fb=_particleVelocity_fb\n    _particleVelocity_fb=t\n    \n    t=particleVelocity_tex\n    particleVelocity_tex=_particleVelocity_tex\n    _particleVelocity_tex=t\n    \n    \n    //advect particle positions\n    \n    D.useProgram(advect_pro)\n    D.bindFramebuffer(_particlePosition_fb)\n    gl.clear(gl.COLOR_BUFFER_BIT)\n    \n    gl.activeTexture(gl.TEXTURE2)\n    D.bindTexture(particlePosition_tex)\n    gl.activeTexture(gl.TEXTURE1)\n    D.bindTexture(particleRandom_tex)\n    gl.activeTexture(gl.TEXTURE0)\n    D.bindTexture(velocity_tex)\n    \n    D.setUniform('dt',[timeStep])\n    D.setUniform('frameNumber',[frameCount])\n    \n    D.renderMesh(screenMesh)\n    \n    t=particlePosition_fb\n    particlePosition_fb=_particlePosition_fb\n    _particlePosition_fb=t\n    \n    t=particlePosition_tex\n    particlePosition_tex=_particlePosition_tex\n    _particlePosition_tex=t\n    \n    \n    //now render particles in 3d cool\n    \n    D.useProgram(surfaceRenderer_pro)\n    D.bindFramebuffer(normals_fb)\n    gl.viewport(0,0,width,height)\n    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)\n    D.bindTexture(particlePosition_tex)\n    D.setUniform('viewMatrix',mat)\n    D.setUniform('cameraMatrixTranspose',mat4.transpose(viewInfo.modelMatrix,viewInfo.modelMatrix))\n    gl.bindBuffer(gl.ARRAY_BUFFER,particleVertBuffer)\n    gl.vertexAttribPointer(0,2,gl.FLOAT,gl.FALSE,8,0)\n    gl.drawArrays(gl.POINTS,0,particlesCount)\n    \n    if(!renderRaw){\n    \n    gl.enable(gl.BLEND)\n    D.useProgram(thicknessRenderer_pro)\n    D.bindFramebuffer(thickness_fb)\n    gl.clear(gl.COLOR_BUFFER_BIT)\n    gl.viewport(0,0,halfWidth,halfHeight)\n    D.setUniform('viewMatrix',mat)\n    gl.drawArrays(gl.POINTS,0,particlesCount)\n    gl.disable(gl.BLEND)\n    \n    D.useProgram(lightHorBlur_pro)\n    D.bindFramebuffer(thicknessHorBlur_fb)\n    D.bindTexture(thickness_tex)\n    D.renderMesh(screenMesh)\n    \n    D.useProgram(lightVerBlur_pro)\n    D.bindFramebuffer(thicknessVerBlur_fb)\n    D.bindTexture(thicknessHorBlur_tex)\n    D.renderMesh(screenMesh)\n    \n    \n    gl.viewport(0,0,width,height)\n    D.useProgram(horBlur_pro)\n    D.bindFramebuffer(horBlur_fb)\n    D.bindTexture(normals_tex)\n    D.renderMesh(screenMesh)\n    \n    D.useProgram(verBlur_pro)\n    D.bindFramebuffer(verBlur_fb)\n    D.bindTexture(horBlur_tex)\n    D.renderMesh(screenMesh)\n    \n    D.useProgram(final_pro)\n    D.bindFramebuffer(finalRender_fb)\n    gl.clear(gl.COLOR_BUFFER_BIT)\n    gl.viewport(0,0,width,height)\n    gl.activeTexture(gl.TEXTURE2)\n    D.bindTexture(normals_tex)\n    gl.activeTexture(gl.TEXTURE1)\n    D.bindTexture(verBlur_tex)\n    gl.activeTexture(gl.TEXTURE0)\n    D.bindTexture(thicknessVerBlur_tex)\n    D.setUniform('camDir',viewInfo.camDir)\n    D.renderMesh(screenMesh)\n    \n    D.useProgram(DBAA_pro)\n    D.bindFramebuffer(null)\n    D.bindTexture(finalRender_tex)\n    D.renderMesh(screenMesh)\n    \n    }else{\n    \n    D.useProgram(view_pro)\n    D.bindFramebuffer(null)\n    gl.clear(gl.COLOR_BUFFER_BIT)\n    gl.viewport(0,0,width,height)\n    D.bindTexture(normals_tex)\n    D.renderMesh(screenMesh)\n    \n    }\n    \n    ctx.drawImage(glCanvas,0,0)\n    then=now\n    window.parent.raf=window.requestAnimationFrame(loop)\n    \n}\n\nif(window.parent.raf){\n    \n    window.cancelAnimationFrame(window.parent.raf)\n}\n\nloop(performance.now())\n\n\n\n}\n\ninter=window.setInterval(function(){if(window.innerWidth){main(0);window.clearInterval(inter)}});\n\n</script>\n\n<!--For restart button-->\n<script></script>\n\n</html>",
    "title": "Water Simulation",
    "votes": 53,
    "created": "a day ago",
    "updated": "a day ago",
    "type": "HTML",
    "author": {
        "name": "Dat",
        "id": "kaid_4164356982737975081215128",
        "avatar": "/images/avatars/svg/marcimus-orange.svg"
    },
    "dimensions": {
        "width": 600,
        "height": 600
    },
    "forks": [
        {
            "title": "New webpage",
            "id": "4925656937709568",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "Jason",
                "id": "kaid_1131601404115542851307937"
            }
        },
        {
            "title": "Spin-off of \"Water Simulation\"",
            "id": "5287914610540544",
            "forks": 1,
            "votes": 1,
            "author": {
                "name": "Xavier :)",
                "id": "kaid_1142182236390953954173346"
            }
        },
        {
            "title": "Spin-off of \"Water Simulation\"",
            "id": "5510757849415680",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "Reed",
                "id": "kaid_674952886434754847249422"
            }
        },
        {
            "title": "Spin-off of \"Water Simulation\"",
            "id": "5881066909777920",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "oshadinethuka",
                "id": "kaid_844241764034889632866463"
            }
        },
        {
            "title": "Spin-off of \"Water Simulation\"",
            "id": "6603188149862400",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "DylanS",
                "id": "kaid_159317837639891309599896"
            }
        }
    ],
    "posts": {
        "tips": [
            {
                "replyCount": 0,
                "votes": 11,
                "date": "a day ago",
                "author": {
                    "name": "Dat",
                    "id": "kaid_4164356982737975081215128",
                    "avatar": "/images/avatars/svg/marcimus-orange.svg"
                },
                "text": "sub: https://www.khanacademy.org/computer-programming/dats-epic-subpage/5796103944454144",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 4,
                "date": "a day ago",
                "author": {
                    "name": "Electric Dolphin ⚡️🐬",
                    "id": "kaid_1188776231699286995947997",
                    "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                },
                "text": "Another great Dat program. Runs well too!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "Duke :P",
                    "id": "kaid_351465532815782433620675",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "This is sweet lol<br><br>Vote++;<br>And first :P",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "𝓧𝓛𝓟 [Off]",
                    "id": "kaid_387597695665654041806576",
                    "avatar": "/images/avatars/svg/piceratops-seed.svg"
                },
                "text": "Bravo Dat!<br><br>this sim aint half bad!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "HB_the_Pencil (semi-retired)",
                    "id": "kaid_412656070256786668848958",
                    "avatar": "/images/avatars/svg/mr-pants-green.svg"
                },
                "text": "I feel like a waterbender lol",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "cwalsh1223 BBB#",
                    "id": "kaid_792288208072906614241148",
                    "avatar": "/images/avatars/svg/spunky-sam-red.svg"
                },
                "text": "Nice water. It looks very wet. Well done! =D<br><br>i done voted",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "Raven",
                    "id": "kaid_1094399428577851630415346",
                    "avatar": "/images/avatars/svg/cs-winston.svg"
                },
                "text": "wow, very kool.  <br>Me potato computa wurks reely gud",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "3 hours ago",
                "author": {
                    "name": "JSCoder",
                    "id": "kaid_3032679493880386290676439",
                    "avatar": "/images/avatars/svg/leaf-orange.svg"
                },
                "text": "is this fresh spring water, or city water =p<br><br>Nice =]",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "3 hours ago",
                "author": {
                    "name": "NathanL",
                    "id": "kaid_329695054038719177004266",
                    "avatar": "/images/avatars/svg/cs-hopper-happy.svg"
                },
                "text": "Nothing's happening",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "It might be because medium precision is not supported on your computer. Press control+h, then replace \"mediump\" with \"highp\". Hope this helps!"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "19 hours ago",
                "author": {
                    "name": "angel",
                    "id": "kaid_3609829637526806958830337",
                    "avatar": "/images/avatars/svg/blobby-blue.svg"
                },
                "text": "eat king!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "𝕜𝕚𝕒𝕒𝕟𝕥𝕠𝕝𝕚𝕒",
                    "id": "kaid_706406430552760652245376",
                    "avatar": "/images/avatars/svg/cacteye-yellow.svg"
                },
                "text": "super cool! i didnt know clouds could act like water /j",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Dat",
                            "id": "kaid_4164356982737975081215128",
                            "avatar": "/images/avatars/svg/marcimus-orange.svg"
                        },
                        "text": "What can i say but your welcome<br><br>edit: kiaan made me say this but he cant even get the lyrics right what a disgrace"
                    }
                ]
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
                "text": "looks great :)",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "10 minutes ago",
                "author": {
                    "name": "AmethystSky",
                    "id": "kaid_784805823121542822870790",
                    "avatar": "/images/avatars/svg/duskpin-ultimate.svg"
                },
                "text": "Oh noes!<br>A < character appears to be the beginning of a tag, but is not followed by a valid tag name. If you want a < to appear on your Web page, try using < instead. Otherwise, check your spelling.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "Luke Ellis",
                    "id": "kaid_8535468719137003545030723",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "This is a really good reconstruction. It has a realistic animation texture and it performs smoothly. You did an amazing job.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "18 hours ago",
                "author": {
                    "name": "GroundedSquidy",
                    "id": "kaid_8597585382861928237037056",
                    "avatar": "/images/avatars/svg/marcimus-red.svg"
                },
                "text": "cool! vote++",
                "locked": false,
                "pinned": false,
                "replies": []
            }
        ],
        "questions": [
            {
                "replyCount": 0,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "- S p a r t a -",
                    "id": "kaid_546205135843777431062822",
                    "avatar": "/images/avatars/svg/piceratops-ultimate.svg"
                },
                "text": "@ dat, are you a professional programmer that works for a company? Does the code Khan teaches us code that other companies like Google, X, and meta use for their websites and/or apps? The reason why I ask is because I noticed that websites use JS programming does not look like this code at all. I know this is a webpage, but I was giving an example.<br><br>Thanks,<br>- S p a r t a -",
                "replies": [],
                "answers": []
            }
        ]
    }
}