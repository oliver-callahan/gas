var json = {"code":"<!DOCTYPE html>\n<!--\n                Contest: Underground!\n                \n         I have completed 0% of Khan Academy's \n        'Intro to HTML/CSS' and have been programming \n                    for 75 months.\n    \n          I would prefer to be placed in the\n                      [Advanced]\n                       bracket\n                       \nThis is probably one of my most advanced projects I have done, to date.  I believe it is the first of it's kind on KA (not 100% sure but a few Willard fun searches yielded no results, none even similar). But what is it?\n\nThis is what a hydrogen atom looks like (or, as close as we can get to a visualization).  The one you see before you now (unless you played with the settings) is the GROUND state. And I would like to emphasize: this solution to the Schrodinger equation ONLY applies to hydrogen, a single proton and electron, no other elements (though I believe it is a good approximation for elements with a single electron in the outer shell, like lithium and other alkali metals).  Also, the hydrogen atom is AT REST.  It has NO energy from velocity.  It is prudent to keep in mind that the Schrodinger equation is non-relativistic, unlike the Klein-Gordon equation or the Dirac equation (too hard for me right now), so this equation breaks down especially as we approach the speed of light.\n\nHow to control it:\n    Look at the UI panel.  You have three quantum numbers:\n      n: the principal quantum number, or the shell, this is how much energy the atom has.  Higher number, more energy, like if it got hit by a photon or something.  You can go up to four in this program.\n      l: the azimuthal quantum number.  This is the orbital, you might remember learning in school spdf if you have taken a more advanced chemistry class.  l can go from 0 to n-1.  s = sharp, p=principal, d=diffuse, f=fundamental.  There is also g and more, but I didn't program those because literally no one talks about them and it would have taken like 10x the math for diminishing returns.  Plus n only goes to 4.\n      m: magnetic quantum number, from -l to l.  Controls the specific orbital thingy.\n    We also have render type, but that's kind of hard to explain without getting into the math.  Let's just say that there are some different orientation axes to choose from, and physicists and chemists do things differently.\n    Brightness and size sliders: pretty self explanatory, play with it and see what they do.\n    \n    Options:\n    \n    1s  (GROUND STATE)\n    2s   2p\n    3s   3p   3d\n    4s   4p   4d   4f\n\nFirst off, some dedications.  Richard Behiel's Hydrogen series on YouTube is AMAZING and I would highly recommend watching it, though it is in excess of an hour (pt. 1 and 2 combined).  It was in a way an inspiration for this project, and really helped me to understand Quantum Mechanics.  Also, thanks to Bearkirb for letting me tap into his WebGL raymarching knowledge (and he forced me to do the youtube clickbait thumbnail).  Though I would like to reiterate, no code was taken from these sources, only understanding.  I did play around with some of these ideas before the competition began, but I rewrote everything in WebGL so the code is essentially from scratch. And I apologize for any percieved 'messiness' but some of the mathematics that goes into this is quite simply complex and there is no way around it.  Look at line 224, for example.\n\nSo, how does this work? I'll give you a high level overview then try to walk you through it.\n\n1.  Thank physicists for solving the Schrodinger equation for a hydrogen atom and mathematicians for providing the tools to do so (spherical harmonics, associated legendre polynomials and generalized lagruerre polynomials).  You want to know more, or hope for a derivation, go watch that video I mentioned.\n\n2.  Use the equations to set up Ψ, the wavefunction.  Ψ*(Ψ) or |Ψ|^2 represents the probability of finding an electron at some small volume element dV.  Does that sound like a probability distribution function to you?  It sure does to me!\n\n3. This is really cool because now that we have this function in 3 dimensions all we need to do is render it, and it is literally exactly like a volumetric.  In a way, it feels like we are taking a line integral through the PDF to project it onto our 2d screen!  So, we simply march rays through the function, accumulate our probability density, and draw that to the screen!  I also created a slicing plane that cuts it in half so that you can see it better, instead of the camera being inside of the cloud.  Kind of looks like you are in a lighthouse or getting a flashlight shined at you that way.\n\nI also left comments throughout this program so you can understand the process that is involved in this and some more of the details.\n\nNOTE: I was able to avoid complex numbers in this program even though they are involved in the wave function by ignoring the complex phase factor.  In this specific case, it all gets washed out when we do our probability calculations. Normally, we would multiply Ψ by its conjugate, but here we can just take the magnitude squared.  I'll explain more in the program.\n\nI should also talk about spin.  It's the fourth quantum number, but not really captured by the schrodinger equation.  This is another benefit offered by the Dirac formula, and as an added bonus antimatter sort of just pops out and also all of the crazy math associated with spinors... as I said, if you want to learn more, look into that YouTube Channel.\n    \n-->\n<html>\n    <head>\n        <meta charset=\"utf-8\">\n        <title>I rendered a Volumetric Hydrogen Atom in WebGL using the Spherical Harmonic Solutions to the Schrödinger equation | Contest: Underground</title>\n        <style>\n        /* Annoying styling */\n            *{\n                margin:0;\n                padding:0;\n                overflow: hidden;\n                background: #000;\n            }\n            canvas{\n                /* Works on any screen size! */\n                position: absolute;\n                top: calc((100% - 600px)/2);\n                left:calc((100% - 600px)/2);\n            }\n            p, input, label{\n                position: fixed;\n                color: white;\n                z-index: 2;\n                top: 20px;\n                left: 10px;\n                font-family: verdana;\n            }\n            #d{\n                /* Cool in-fashion semi-transparent UI bar */\n                background: #0007;\n                width: 150px;\n            }\n        </style>\n    </head>\n    <body>\n    <!-- UI Bar -->\n    <p id = 'd'>Something Went Wrong!</p>\n    <input type=\"number\" id=\"inputn\" min=\"1\" max=\"4\" value = '1' style = \"top: 80px; left:60px;\">\n    <input type=\"number\" id=\"inputl\" min=\"0\" max=\"3\" value = '0' style = \"top: 115px; left: 60px;\">\n    <input type=\"number\" id=\"inputm\" min=\"-3\" max=\"3\" value = '0' style = \"top: 155px; left: 60px;\">\n    <input type=\"radio\" id=\"chem1\" name=\"rtype\" value=\"chem1\" checked = 'true' style = \"top: 245px; left: 30px;\">\n    <label for=\"chem1\" id = 'chem1l' style = \"top: 241px; left: 50px; background: #0007;\">Chemistry 1</label>\n    <input type=\"radio\" id=\"chem2\" name=\"rtype\" value=\"chem2\" style = \"top: 275px; left: 30px;\">\n    <label for=\"chem2\" id = 'chem2l' style = \"top: 271px; left: 50px; background: #0007;\">Chemistry 2</label>\n    <input type=\"radio\" id=\"physics\" name=\"rtype\" value=\"physics\" style = \"top: 305px; left: 30px;\">\n    <label for=\"physics\" id = 'physicsl' style = \"top: 301px; left: 50px; background: #0007;\">Physics</label>\n    <input type=\"range\" id=\"inputb\" min=\"0\" max=\"120\" value = '3' style = \"top: 400px; left: 25px;\">\n    <input type=\"range\" id=\"inputs\" min=\"0\" max=\"160\" value = '80' style = \"top: 475px; left: 25px;\">\n    \n    <script id = 'vertexShader' type = 'glsl'>                      #version 300 es\n    \n    //This is the vertex shader, if you know WebGL you will understand this otherwise it is hopeless to try to explain.\n    in vec2 coords;\n    out vec2 position;\n    \n    void main(){\n        position = coords;\n        gl_Position = vec4(coords,0.0,1.0);\n    }\n    </script>\n    \n    <script id = 'fragShader' type = 'glsl'>                        #version 300 es\n    \n    //This is the frag shader.  Yes chromebook people, I used highp!  Now, if it still isn't working, GET A REAL COMPUTER AND STOP USING A CALCULATOR WITH INTERNET ACCESS.\n    precision highp float;\n    out vec4 fragColor;\n    \n    //Now we define some uniformsso that we can port in our quantum numbers and a few other specifications from JS.  This allows you to make changes from the sidebar.\n    uniform float mousex;\n    uniform float mousey;\n    \n    uniform float qn;\n    uniform float ql;\n    uniform float qm;\n    \n    uniform float rtype;\n    uniform float b;\n    uniform float sz;\n    \n    //I have no idea if WebGL has a built-in PI but it does now, I use it a lot.\n    float PI = 3.141592653;\n    \n    \n    //This is hard to explain... It is involved in the spherical harmonic.  There is a certain e^i*phi term.  This has a magnitude of 1, so when you square the wavefunction it is  just one because of how complex numbers work.  This means (and is accurate in physics), that the Wave function is actually COMPLETELY INDEPENDENT OF PSI, our second angle.  But I guess chemists don't like this or something because they maybe just take the real or imaginary part? I don't know but they multiply it by some trig term to make it look like the orbitals you see in the textbooks.\n    float phiTerm(float phi, int m, float type){\n        return type==0.0?cos(float(m)*phi):type==1.0?sin(float(m)*phi):1.0;\n    }\n    \n    //Lots of factorials involved later.\n    float factorial(int n){\n        int product = 1;\n        for(int i = 1; i <= 10000; i++){\n            product*=i;\n            if(i>=n) break;\n        }\n        return float(product);\n    }\n    \n    //Here I make a function to convert cartesian coordinates into spherical coordinates.  It might look like a mess but it makes the schrodinger equation so much easier to solve.  It actually allows us to break the wave function into something like this: R(r)*Y(theta, phi).  Pretty cool right?  R only depends on the quantum numbers n and l, and Y the spherical harmonic is only affected by l and m.\n    vec3 cartesianToSpherical(vec3 coords){\n        float radius = sqrt(coords.x*coords.x+coords.y*coords.y+coords.z*coords.z);\n        //Thank goodness WebGL has atan built in, and it handles the negative sign problems caused by quadrants.\n        return vec3(radius,acos(coords.z/radius),atan(coords.y,coords.x));\n    }\n    \n    //Get ready for tons of math ahead!  Also for some reason I was having trouble with the uniforms attatching to global variables so I had to put them as arguments to this function.\n    //They get more and more complicated as l gets higher.\n    float sphericalHarmonics(float theta, float phi, int l, int m, float type){\n        //See this phi term? This is the one that looks like e^i*phi\n        float p = phiTerm(phi, m, type);\n        \n        if(l==0){\n            return 0.5*sqrt(1.0/PI);\n        }\n        \n        else if(l==1){\n            if(m==-1){\n                return 0.5*sqrt(3.0/(2.0*PI))*p*sin(theta);\n            }else if(m==0){\n                return 0.5*sqrt(3.0/PI)*cos(theta);\n            }else if(m==1){\n                return -0.5*sqrt(3.0/(2.0*PI))*p*sin(theta);\n            }\n        }\n        \n        else if(l==2){\n            if(m==-2){\n                return 0.25*sqrt(15.0/(2.0*PI))*p*sin(theta)*sin(theta);\n            }else if(m==-1){\n                return 0.5*sqrt(15.0/(2.0*PI))*p*sin(theta)*cos(theta);\n            }else if(m==0){\n                return 0.25*sqrt(5.0/PI)*(3.0*cos(theta)*cos(theta)-1.0);\n            }else if(m==1){\n                return -0.5*sqrt(15.0/(2.0*PI))*p*sin(theta)*cos(theta);\n            }else if(m==2){\n                return 0.25*sqrt(15.0/(2.0*PI))*p*sin(theta)*sin(theta);\n            }\n        }\n        \n        else if(l==3){\n            if(m==-3){\n                return 0.125*sqrt(35.0/PI)*p*sin(theta)*sin(theta)*sin(theta);\n            }else if(m==-2){\n                return 0.25*sqrt(105.0/(2.0*PI))*p*sin(theta)*sin(theta)*cos(theta);\n            }else if(m==-1){\n                return 0.125*sqrt(21.0/PI)*p*(5.0*cos(theta)*cos(theta)-1.0)*sin(theta);\n            }else if(m==0){\n                return 0.25*sqrt(7.0/PI)*(5.0*cos(theta)*cos(theta)*cos(theta)-3.0*cos(theta));\n            }else if(m==1){\n                return -0.125*sqrt(21.0/PI)*p*(5.0*cos(theta)*cos(theta)-1.0)*sin(theta);\n            }else if(m==2){\n                return 0.25*sqrt(105.0/(2.0*PI))*p*sin(theta)*sin(theta)*cos(theta);\n            }else if(m==3){\n                return -0.125*sqrt(35.0/PI)*p*sin(theta)*sin(theta)*sin(theta);\n            }\n        }\n    }\n    \n    //Associated Laguerre polynomials.  Anything after 3 is a nightmare!\n    float L(int degree, float x, float alpha){\n        if(degree == 0) return 1.0;\n        else if(degree == 1) return -x+alpha+1.0;\n        else if(degree == 2) {\n            return 0.5 * (x*x-2.0*(alpha+2.0)*x+(alpha+1.0)*(alpha+2.0));\n        }else if(degree == 3){\n            return (-x*x*x+3.0*(alpha+3.0)*x*x-3.0*(alpha+3.0)*(alpha+2.0)*x+(alpha+1.0)*(alpha+2.0)*(alpha+3.0))/6.0;\n        }\n    }\n            \n    //Radial function\n    float R(float r, int n, int l, int m){\n        float C = sqrt(8.0/float(n*n*n)*factorial(n-l-1)/(2.0*float(n)*factorial(n+l)));\n        float D = exp(-r/float(n)) * pow(2.0*r/float(n),float(l));\n        return C*D*L(n-l-1,2.0*r/float(n),2.0*float(l)+1.0);\n    }\n    \n    //This is the squared magnitude of the wave function.\n    float psiBarPsi(float psi){ \n        return psi*psi; \n    }\n\n    //Our complete wave function!  It looks simple, now that we got everything out of the way with the radial harmonics and the radial function.\n    float psi(vec3 coords, int n, int l, int m, float type){\n        //This little conditional here tells us if the function is getting sliced by our intersection plane.\n        if(coords.z<-PI/2.0||coords.z>PI/2.0){\n            return 0.0;\n        }\n        return sphericalHarmonics(coords.y,coords.z, l, m, type)*R(coords.r, n, l, m);\n    }\n    \n    //Let the volumetric raymarching begin!\n    void main(){\n        //Mouse movement\n        float thetax = PI+(300.0+mousey)/100.0;\n        float thetaz = PI+(300.0-mousex)/100.0;\n        //Quantum Numbers\n        int n = int(qn);\n        int l = int(ql);\n        int m = int(qm);\n        //Other specs\n        float type = rtype;\n        float brightness = b;\n        float size = sz;\n        \n        //Rotation matricies for 2 axes.\n        mat3 rotationMatrixY = mat3(\n            cos(thetax) , 0           , sin(thetax),\n            0           , 1           , 0          ,\n            -sin(thetax), 0           , cos(thetax)\n        );\n        mat3 rotationMatrixZ = mat3(\n            cos(thetaz) , -sin(thetaz), 0          ,\n            sin(thetaz) , cos(thetaz) , 0          ,\n            0           , 0           , 1\n        );\n        \n        //Define our initial ray, and the direction that it will head.\n        vec3 rayPos = vec3(-8.0*80.0/size,0.0,0.0);\n        vec2 screenPosition = gl_FragCoord.xy-vec2(300,300);\n        vec3 rayDir = normalize(vec3(1.0,screenPosition/size));\n        \n        //Rotate everything according to the rotation matricies and where the mouse position is so that you can move around.\n        rayPos*=rotationMatrixY*rotationMatrixZ;\n        rayDir*=rotationMatrixY*rotationMatrixZ;\n        \n        //This is how much 'cloud' we have 'collected'.\n        float accumulation = 0.0;\n        vec3 cameraPos = rayPos;\n        float add;\n        float t;\n        \n        vec3 norm = vec3(1.0,0.0,0.0);\n        //300 interations should be enough\n        for(int i = 0; i < 300; i++){\n            //Call our wave function!  We add the value to our accumulation as we march the ray through space to see how bright things are.\n            add=psiBarPsi(psi(cartesianToSpherical(rayPos),n, l, m, type));\n            \n            //If we are on one side of the slicing plane, we do a little vector math to jump straight to it so we do not need to waste time.  This extra optimization actually makes it significantly faster.\n            if(add==0.0){\n                if(i==0){\n                    t=-dot(norm,cameraPos)/dot(norm,rayDir);\n                    rayPos = rayDir*t+cameraPos;\n                }else{\n                    //If we hit the slicing plane after going through the cloud (looking from the other direction) we can just zoom off into infinity, so we are done.\n                    break;\n                }\n            }\n            \n            accumulation+=add;\n            \n            //We march the ray further if the function has a lower value, because we do not want to waste time going through mostly empty space when there are more exciting parts of the function to get to!\n            rayPos+=0.01*rayDir/(add+0.16);\n            //If we get really far, we are outside of the range (limit of radial function goes to zero as radius goes to infinity) so we can safely break out of our loop to save time.\n            if(distance(cameraPos,rayPos)>30.0){\n                break;\n            }\n        }\n        \n        float c = brightness*accumulation;\n        fragColor = vec4(0.4*c,0.7*c,c,1.0);\n    }\n    </script>\n    \n    <canvas width = '600' height = '600' id = 'c'></canvas>\n    <script type='module'>\n        //Set up canvas\n        let c = document.getElementById('c');\n        let ctx = c.getContext('2d');\n        \n        //I first make an offscreen webgl then paste that to another canvas using drawImage.  I don't know why but bearkirb said it would be faster, and he wouldn't stop annoying me until I did it so here we are.\n        let c2 = new OffscreenCanvas(600,600);\n        let gl = c2.getContext('webgl2');\n        \n        for (let i = window.requestAnimationFrame(function() {}); i > 0; i--) {window.cancelAnimationFrame(i);}\n        \n        //Fetch shadercode and make new shaders\n        const vertSource = document.getElementById('vertexShader').textContent, vertShader = gl.createShader(gl.VERTEX_SHADER);\n        const fragSource = document.getElementById('fragShader').textContent, fragShader = gl.createShader(gl.FRAGMENT_SHADER);\n        //Compile Stuff\n        gl.shaderSource(vertShader,vertSource);\n        gl.compileShader(vertShader);\n        gl.shaderSource(fragShader,fragSource);\n        gl.compileShader(fragShader);\n        \n        //Make new shader program\n        const shaderProgram = gl.createProgram();\n        gl.attachShader(shaderProgram, vertShader);\n        gl.attachShader(shaderProgram, fragShader);\n        gl.linkProgram(shaderProgram);\n        \n        //Wierd webgl buffer stuff\n        const positions = new Float32Array([-1, -1, -1, 3, 3, -1]), positionBuffer = gl.createBuffer(), coords = gl.getAttribLocation(shaderProgram, 'coords');\n        \n        //Some global Variables, most are pushed to WebGL through uniforms\n        let frames = 1, mouseX = 300, mouseY = 300;\n        let n = 1.0, l = 0.0, m= 1.0;\n        let brightness = 3.0, size = 80;\n        \n        //Because I have so many settings to push to uniforms (from the UI) I made this function to save space, because I access getUniformLocation so much.\n        let locate = (name) => {\n            return gl.getUniformLocation(shaderProgram, name);\n        } \n        const mousey = locate('mousey'), mousex = locate('mousex'), nloc = locate(\"qn\"), lloc = locate(\"ql\"), mloc = locate(\"qm\"), typeloc = locate(\"rtype\"), bloc = locate(\"b\"), sloc = locate(\"sz\");\n        \n        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);\n        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);\n        gl.viewport(0, 0, 600, 600);\n        gl.enableVertexAttribArray(coords);\n        \n        //Tells you what orbital you are on!\n        let types = 'spdf', rtype = 0;\n        let p = document.getElementById('d'), inputn =  document.getElementById('inputn'), inputl =  document.getElementById('inputl'), inputm = document.getElementById('inputm');\n        \n        gl.useProgram(shaderProgram);\n        gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, 0, 0);\n        gl.clearColor(0, 0, 0, 1);\n            \n        (function draw(){\n\n            //Fetch variable values from html stuff, then send it to webgl.\n            n = inputn.value;\n            l = inputl.value;\n            m = inputm.value;\n            inputl.max = n-1;\n            inputm.min = -l;\n            inputm.max = l;\n            brightness = document.getElementById('inputb').value;\n            size = document.getElementById('inputs').value;\n            \n            rtype = document.getElementById('chem2').checked?1:document.getElementById('physics').checked?-1:0;\n            \n            \n            \n            gl.clear(gl.COLOR_BUFFER_BIT);\n            gl.drawArrays(gl.TRIANGLES, 0, 3);\n            \n            p.innerHTML = `&emsp;Orbital: ${n}${types[l]}<br><br><br>&emsp;n:  <br><br>&emsp;l: <br><br>&emsp;m:<br><br><br>&emsp;Render Type: <br><br><br><br><br><br><br><br>&emsp;Brightness:<br><br><br><br>&emsp;Size<br><br><br><br>`;\n            \n            //draw everything\n            ctx.drawImage(c2,0,0);\n            //Animate\n            requestAnimationFrame(draw);\n        })();\n        \n        //Event listeners, and I shift them in case the screen is larger than 600\n        window.addEventListener(\"mousemove\",(event)=>{\n            mouseX = event.pageX - c.getBoundingClientRect().left;\n            mouseY = event.pageY - c.getBoundingClientRect().top;\n            //Update Uniforms, only necessary when mouse moves\n            gl.uniform1f(mousey, mouseY);\n            gl.uniform1f(mousex, mouseX);\n            gl.uniform1f(nloc, n);\n            gl.uniform1f(mloc, m);\n            gl.uniform1f(lloc, l);\n            gl.uniform1f(typeloc, rtype);\n            gl.uniform1f(bloc, brightness);\n            gl.uniform1f(sloc, size);\n        });\n         \n         //<script>\n    </script>\n    </body>\n    <!-- Without comments and whitespace, about 250 lines of code -->\n</html>\n","title":"I rendered a Volumetric Hydrogen Atom in WebGL using the Spherical Harmonic Solutions to the Schrödinger equation | Contest: Underground","votes":62,"type":"HTML","author":{"name":"Jake K.","id":"kaid_103000698141866290580261","avatar":"/images/avatars/svg/leaf-blue.svg"},"dimensions":{"width":600,"height":600},"forks":[{"title":"Spin-off of \"I rendered a Volumetric Hydrogen Atom in WebGL using the Spherical Harmonic Solutions to the Schrödinger equation | Contest: Underground\"","id":"5771418926497792","forks":0,"votes":1,"author":{"name":"ihmandrew","id":"kaid_1116498955829619146975594"}},{"title":"Spin-off of \"I rendered a Volumetric Hydrogen Atom in WebGL using the Spherical Harmonic Solutions to the Schrödinger equation | Contest: Underground\"","id":"5789863126679552","forks":0,"votes":1,"author":{"name":"Clark Kent (occasionally active)","id":"kaid_714855751210369848518614"}},{"title":"get winston","id":"5855665498537984","forks":0,"votes":1,"author":{"name":"Vincent","id":"kaid_405375927120637676196310"}},{"title":"Spin-off of \"I rendered a Volumetric Hydrogen Atom in WebGL using the Spherical Harmonic Solutions to the Schrödinger equation | Contest: Underground\"","id":"6340020637450240","forks":0,"votes":1,"author":{"name":"ihmandrew","id":"kaid_1116498955829619146975594"}}],"posts":{"tips":[{"replyCount":0,"votes":11,"date":"2024-10-22T18:23:11.544411Z","author":{"name":"Jake K.","id":"kaid_103000698141866290580261","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"I am about as busy as I am going to get in life, so I will probably not be that active for the next 6 months.  But if you want more stuff in a similar vein, here is my subpage:\nhttps://www.khanacademy.org/computer-programming/jake-ks-subpage/6106502812712960","locked":false,"pinned":false,"replies":[]},{"replyCount":1,"votes":10,"date":"2024-10-22T19:02:41.723551Z","author":{"name":"Dat","id":"kaid_4164356982737975081215128","avatar":"/images/avatars/svg/marcimus-orange.svg"},"text":"You rendered a Volumetric Hydrogen Atom in WebGL using the Spherical Harmonic Solutions to the Schrödinger equation yet ur webgl and glsl is inefficient so i help yay:\n\n(note: i blame ka's broken formatting just use your imagination)\n\n`uniform float mousex;\nuniform float mousey;\n`\ncan be combined into a vec2.\n\n`uniform float qn;\n    uniform float ql;\n    uniform float qm;`\n\ncan be combined into a vec3.\n\nwhat i said above ^ aims to maintain readabilty still. if you want pure performance mush them all into a single uniform, not 8\n\n`for(int i = 1; i <= 10000; i++){\n            product*=i;\n            if(i>=n) break;\n        }`\n\ni dont think that's a very good loop structure-\n\n\"Thank goodness WebGL has atan built in\" glsl* to be specific :nerd:\n\n`return 0.5*sqrt(1.0/PI);` i suggest hardcoding this :nerd: if the glsl compiler doesnt take care of it. same for like all the numbers below that line of code ^^^\n\n`sqrt(8.0/float(n*n*n)*factorial(n-l-1)/(2.0*float(n)*factorial(n+l)))` the 2.0* can be made redundant by using algebra to alter the numberator. (i explained it out like that cuz im too lazy to test how the division operator works when you chain it 3 times as in `a/b/c` and suggest a number)\n\n`float thetax = PI+(300.0+mousey)/100.0;\n        float thetaz = PI+(300.0-mousex)/100.0;` \n\ncompute this on the cpu\n\n`int n = int(qn);\n        int l = int(ql);\n        int m = int(qm);`\n\nif that's all you're using them for, uniform them as an ivec3 instead of converting each seperate one-\n\n`mat3 rotationMatrixY = mat3(\n            cos(thetax) , 0           , sin(thetax),\n            0           , 1           , 0          ,\n            -sin(thetax), 0           , cos(thetax)\n        );\n        mat3 rotationMatrixZ = mat3(\n            cos(thetaz) , -sin(thetaz), 0          ,\n            sin(thetaz) , cos(thetaz) , 0          ,\n            0           , 0           , 1\n        );`\nand later\n`rayPos*=rotationMatrixY*rotationMatrixZ;\n        rayDir*=rotationMatrixY*rotationMatrixZ;`\n\ncompute on cpu :pray::clap: they're the same every time. you're computing them 360000 times as opposed to the required 1 time.\n\n`//300 interations should be enough\n        for(int i = 0; i < 300; i++){`\n\nnot an inefficiency but :sideeye:\n\n`let gl = c2.getContext('webgl2');`\n\nturn of antialias, depth, and alpha for maximum performance as they aren't needed in this program :nerd:\n\n`gl.clearColor(0, 0, 0, 1);`\n\nonly needed once at init\n\n`gl.uniform1f(mousey, mouseY);\n            gl.uniform1f(mousex, mouseX);`\n\nupdate these once/when they change.\n\n`n = inputn.value;\n            l = inputl.value;\n            m = inputm.value;\n            inputl.max = n-1;\n            inputm.min = -l;\n            inputm.max = l;\n            brightness = document.getElementById('inputb').value;\n            size = document.getElementById('inputs').value;\n            \n            rtype = document.getElementById('chem2').checked?1:document.getElementById('physics').checked?-1:0;\n            \n            gl.uniform1f(nloc, n);\n            gl.uniform1f(mloc, m);\n            gl.uniform1f(lloc, l);\n            gl.uniform1f(typeloc, rtype);\n            gl.uniform1f(bloc, brightness);\n            gl.uniform1f(sloc, size);`\n\nsame as above- and also the whole getting the value and checking part every frame is concerning\n\n`gl.useProgram(shaderProgram);`\n\nneeded once at init\n\n`gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, 0, 0);`\n\nsame as above\n\n`gl.clear(gl.COLOR_BUFFER_BIT);`\n\nyou don't need to clear the color buffer bits. you're drawing to the whole screen. take this analogy: when u paint a wall using a thick paint but the wall's already painted an ugly color, do you remove the ugly color and put the new color on?? no u put the new color on anyways and theres no visual difference\n\n`mouseX = event.pageX - c.getBoundingClientRect().left;\n            mouseY = event.pageY - c.getBoundingClientRect().top;`\n\n(not webgl or glsl but) did you mean:\n\n`mouseX = event.x;\nmouseY = event.y;`","locked":false,"pinned":false,"replies":[{"date":"2024-10-22T22:26:44.917944Z","author":{"name":"Ibraheem Ahmed (IA)","id":"kaid_42165633374795610935956","avatar":"/images/avatars/svg/spunky-sam.svg"},"text":"\"(... just use your imagination)\"\n\ninstructions unclear; am now writing a book instead of code. please help."}]},{"replyCount":0,"votes":8,"date":"2024-10-22T22:30:06.683793Z","author":{"name":"Ibraheem Ahmed (IA)","id":"kaid_42165633374795610935956","avatar":"/images/avatars/svg/spunky-sam.svg"},"text":"The thumbnail is hilarious\n\nHonestly this all seems like super advanced Physics (or Chemistry idk) and that's really awesome, but I have to ask - how does this fit the theme of Contest: Underground?? This is really impressive, but I don't get how it fits the underground theme.\n\nReally great work. Now you should build a particle collider and take over the world.","locked":false,"pinned":false,"replies":[]},{"replyCount":1,"votes":3,"date":"2024-10-22T19:23:32.077675Z","author":{"name":"Timothy","id":"kaid_580436051254509721948310","avatar":"/images/avatars/svg/cs-hopper-jumping.svg"},"text":"Yeah bro this is definitely the only thing of its kind\nFantastic job man, good luck with your busy life, I 100% feel you, I oh so busy as well...","locked":false,"pinned":false,"replies":[{"date":"2024-10-22T19:29:05.666813Z","author":{"name":"Jake K.","id":"kaid_103000698141866290580261","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"Thanks!  It is great to still see you around.\n\nYeah, you are a college student and I a high schooler so you know about the stuff I'm doing right now if you know what I mean..."}]},{"replyCount":0,"votes":1,"date":"2024-10-22T21:59:36.869314Z","author":{"name":"LJ","id":"kaid_1144628223469068678737336","avatar":"/images/avatars/svg/leafers-sapling.svg"},"text":"This is cool! I suggest adding drop shadows or something to differentiate between orbits","locked":false,"pinned":false,"replies":[]},{"replyCount":1,"votes":1,"date":"2024-10-23T16:26:40.456323Z","author":{"name":"1AutumnLeaf","id":"kaid_168949204509570062116373","avatar":"/images/avatars/svg/leaf-red.svg"},"text":"it is so laggy and does weird things to my computer","locked":false,"pinned":false,"replies":[{"date":"2024-10-23T16:27:05.892703Z","author":{"name":"1AutumnLeaf","id":"kaid_168949204509570062116373","avatar":"/images/avatars/svg/leaf-red.svg"},"text":"I love it"}]},{"replyCount":0,"votes":1,"date":"2024-10-23T17:39:44.532202Z","author":{"name":"Equilibrium","id":"kaid_1842852586096096865081151","avatar":"/images/avatars/svg/sneak-peak-green.svg"},"text":"Finally, someone did it! Thank you my good sir.","locked":false,"pinned":false,"replies":[]},{"replyCount":0,"votes":1,"date":"2024-10-23T18:16:59.048524Z","author":{"name":"LemonTurtle","id":"kaid_26727758302107548837304","avatar":"/images/avatars/svg/primosaur-ultimate.svg"},"text":"Line 111 is insane.\n\nLove the program!","locked":false,"pinned":false,"replies":[]},{"replyCount":0,"votes":1,"date":"2024-10-22T21:01:45.885803Z","author":{"name":"Samurai Warrior™ ✝ (Offline)","id":"kaid_333534297788735128142174","avatar":"/images/avatars/svg/sneak-peak-green.svg"},"text":"Not sure if I really understand, but very cool nonetheless! :)\n\n22nd","locked":false,"pinned":false,"replies":[]},{"replyCount":3,"votes":1,"date":"2024-10-22T18:31:59.714141Z","author":{"name":"Duke :P","id":"kaid_351465532815782433620675","avatar":"/images/avatars/svg/starky-ultimate.svg"},"text":"Wow, that is crazy cool. This is the coolest thing of the year haha :P\n\nKeep this up!","locked":false,"pinned":false,"replies":[{"date":"2024-10-22T18:37:29.047476Z","author":{"name":"Jake K.","id":"kaid_103000698141866290580261","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"Thanks! That's a pretty big compliment."},{"date":"2024-10-22T19:05:44.587307Z","author":{"name":"Duke :P","id":"kaid_351465532815782433620675","avatar":"/images/avatars/svg/starky-ultimate.svg"},"text":"Your welcome!\nI haven't seen anything like this before :P\nSo I think it earned it's title."},{"date":"2024-10-22T20:32:35.090501Z","author":{"name":"Duke :P","id":"kaid_351465532815782433620675","avatar":"/images/avatars/svg/starky-ultimate.svg"},"text":"Bro the thumbnail 🤣\n\nEDIT: hope lifes goes smoothly for you :D"}]},{"replyCount":0,"votes":1,"date":"2024-10-24T04:23:02.187193Z","author":{"name":"CoraL","id":"kaid_363667774724785949031034","avatar":"/images/avatars/svg/sneak-peak-purple.svg"},"text":"love that clickbait style thumbnail lol\nthis is cool","locked":false,"pinned":false,"replies":[]},{"replyCount":0,"votes":1,"date":"2024-10-23T14:46:28.617938Z","author":{"name":"HB_the_Pencil (semi-retired)","id":"kaid_412656070256786668848958","avatar":"/images/avatars/svg/mr-pants-green.svg"},"text":"Wow!! That's awesome. I've gotta look at it on a faster computer sometime.","locked":false,"pinned":false,"replies":[]},{"replyCount":7,"votes":1,"date":"2024-10-22T21:03:14.092097Z","author":{"name":"Eyeinthesky","id":"kaid_6136710333637048514584747","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"Hi Bearkirb ;D\n\nThat's really cool :)","locked":false,"pinned":false,"replies":[{"date":"2024-10-23T16:33:32.362584Z","author":{"name":"Radar","id":"kaid_3902988618718040904060736","avatar":"/images/avatars/svg/leafers-seed.svg"},"text":"What do you mean!?!"},{"date":"2024-10-23T16:34:48.33147Z","author":{"name":"Eyeinthesky","id":"kaid_6136710333637048514584747","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"I mean what I say...\n\nwealR ;P"},{"date":"2024-10-23T16:43:53.374197Z","author":{"name":"Radar","id":"kaid_3902988618718040904060736","avatar":"/images/avatars/svg/leafers-seed.svg"},"text":"How do you know?\n\nlol"},{"date":"2024-10-23T19:43:30.891906Z","author":{"name":"Jake K.","id":"kaid_103000698141866290580261","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"Why would you think I am Jake K.!"},{"date":"2024-10-23T19:43:47.441664Z","author":{"name":"Jake K.","id":"kaid_103000698141866290580261","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"Wrong account woop\n\nnot this again"},{"date":"2024-10-23T22:14:41.377921Z","author":{"name":"Eyeinthesky","id":"kaid_6136710333637048514584747","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"Methinks that may be valid proof :P\n\nAlso @Radar I only saw it on weals bio :P"},{"date":"2024-10-23T22:23:51.988532Z","author":{"name":"Eyeinthesky","id":"kaid_6136710333637048514584747","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"Don't feel bad I have alts too :P"}]},{"replyCount":0,"votes":1,"date":"2024-10-23T18:31:06.944122Z","author":{"name":"agodwin01(online)","id":"kaid_8826452778567227618964185","avatar":"/images/avatars/svg/starky-tree.svg"},"text":"You good sir are a mathemetician.","locked":false,"pinned":false,"replies":[]},{"replyCount":1,"votes":1,"date":"2024-10-22T18:31:51.086606Z","author":{"name":"The Cat Coder.","id":"kaid_951255222732612946354620","avatar":"/images/avatars/svg/primosaur-tree.svg"},"text":"I understood nothing of the title...","locked":false,"pinned":false,"replies":[{"date":"2024-10-22T18:37:14.369811Z","author":{"name":"Jake K.","id":"kaid_103000698141866290580261","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"That's OK.  It still looks cool right?  And you can watch that video I told you to watch"}]},{"replyCount":0,"votes":1,"date":"2024-10-23T00:38:01.652802Z","author":{"name":"Isaiah Elliott","id":"kaid_95379962472814801363834","avatar":"/images/avatars/svg/aqualine-ultimate.svg"},"text":"The only thing I understand is the thumbnail! XD","locked":false,"pinned":false,"replies":[]}],"questions":[{"replyCount":0,"votes":2,"date":"2024-10-23T15:08:09.506748Z","author":{"name":"SirEarnest","id":"kaid_485585696408320174630793","avatar":"/images/avatars/svg/robot_male_2.svg"},"text":"How does this even work?","replies":[],"answers":[]},{"replyCount":0,"votes":1,"date":"2024-10-23T22:40:47.159666Z","author":{"name":"Matt","id":"kaid_948723387094853747196552","avatar":"/images/avatars/svg/cs-winston.svg"},"text":"Why did my computer say \"Owch\" when I loaded this?","replies":[],"answers":[]}]}}