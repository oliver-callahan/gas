var json = {
    "code": "//i made a cringe pjs platformer\n\n// WARNING this game is very hard\n\n\n\nvar timeMultiplier=1;\nvar playerRadius=12;\nvar wallThickness=5;\nvar gravity=500;\nvar jumpPower=275;\nvar walkSpeed=950;\nvar friction=5;\nvar mirrorReach=18;\nvar mirrorWidth=25;\nvar healthDeplete=3;\nvar controlMirrorWithArrowKeys=false;\n\nvar level=0;\n\n\nvar s=599;\nvar levels=[\n    \n    {\n        spawn:[50,550],\n        end:[56,327],\n        walls:[\n            [0,0,s,0],\n            [0,s,s,s],\n            [0,0,0,s],\n            [s,0,s,s],\n            [129,530,212,530],\n            [277,481,334,481],\n            [533,383,404,454],\n            [0,355,417,355],\n        ],\n        pointers:[\n            [107,6,-9],\n            [415,6,18],\n        ],\n        texts:[\n            ['A basic platformer\\nbut with a twist.',114,430],\n            ['Use your mirror to\\nreflect the deadly lazers.',470,215],\n        ]\n    },\n    {\n        spawn:[50,170],\n        end:[565,569],\n        walls:[\n            [0,0,s,0],\n            [0,s,s,s],\n            [0,0,0,s],\n            [s,0,s,s],\n            [0,200,465,200],\n            [118,358,602,289],\n            [118,358,102,432],\n        ],\n        pointers:[\n            [587,359,53.0,9],\n        ],\n        texts:[\n            ['Lazers bounce off walls.',254,123],\n        ]\n    },\n    {\n        spawn:[209,100],\n        end:[276,575],\n        walls:[\n            [200,30,400,30],\n            [350,120,400,120],\n            [150,120,250,120],\n            [150,120,200,30],\n            [400,120,400,30],\n            [250,80,250,600],\n            [350,120,350,600],\n            [250,s,350,s],\n        ],\n        pointers:[\n            [398,71,function(t){return Math.sin(t)*13+64;},10],\n        ],\n        \n    },\n    {\n        spawn:[570,580],\n        end:[25,20],\n        walls:[\n            [0,0,s,0],\n            [0,s,s,s],\n            [0,0,0,s],\n            [s,0,s,s],\n            [379,534,450,534],\n            [270,484,350,484],\n            [270,414,350,414],\n            [270,344,350,344],\n            [290,274,330,274],\n            [330,274,497,159],\n            [380,132,438,146],\n            [357,132,291,146],\n            [190,132,291,146],\n            [44,85,142,106],\n        ],\n        pointers:[\n            [574,9,16,4],\n            [9,364,-75,4],\n            [209,9,68,3],\n            [13,591,218],\n        ],\n        \n    },\n    {\n        spawn:[300,583],\n        end:[149,70],\n        walls:(function(){\n            \n            var arr=[\n                [100,147,100,440],\n                [100,147,245,40],\n                [400,441,492,452],\n                [400,441,268,371],\n                [475,311,301,336],\n                [175,235,399,264],\n                [175,235,184,575],\n                [100,398,70,412],\n                [9,374,28,375],\n                [100,338,62,338],\n                [100,278,62,278],\n                [100,208,62,208],\n            ];\n            \n            for(var i=0;i<360;i+=5){\n                arr.push([cos(i)*300+300,sin(i)*300+300,cos(i+5)*300+300,sin(i+5)*300+300]);\n            }\n            \n            return arr;\n        })(),\n        pointers:[\n            [516,101,25,7],\n            [404,27,92,10],\n        ],\n        \n    },\n    {\n        spawn:[47,33],\n        end:[568,319],\n        walls:[\n            [0,0,s,0],\n            [0,0,0,s],\n            [s,0,s,s],\n            [0,70,514,70],\n            [100,68,100,39],\n            [597,153,500,159],\n            [385,217,499,159],\n            [368,217,282,211],\n            [53,217,185,246],\n            [425,349,475,200],\n            [277,349,475,408],\n            [277,300,111,314],\n            [276,349,18,369],\n        ],\n        pointers:[\n            [593,54,90],\n            [591,591,99,12],\n            [591,165,100,10],\n            [111,6,function(t){return Math.sin(t*2)*36-45;}],\n        ],\n        \n    },\n    {\n        spawn:[47,583],\n        end:[568,32],\n        walls:[\n            [0,0,s,0],\n            [0,s,s,s],\n            [0,0,0,s],\n            [s,0,s,s],\n            [100,600,100,531],\n            [163,531,100,531],\n            [488,531,375,531],\n            [488,531,604,425],\n            [488,421,425,421],\n            [473-100,421,425-100,421],\n            [473-200,421,425-200,421],\n            [473-300,421,425-300,421],\n            [473-400,421-50,425-400,421-50],\n            [473-100,321,425-100,321],\n            [473-200,321,425-200,321],\n            [473-300,321,425-300,321],\n            [473,321-50,425,321-50],\n            [473-100,221,425-100,221],\n            [473-200,221,425-200,221],\n            [473-300,221,425-300,221],\n            [473-400,221-50,425-400,221-50],\n            [473-100,121,425-100,121],\n            [473-200,121,425-200,121],\n            [473-300,121,425-300,121],\n            [609,121-50,425,121-50],\n        ],\n        pointers:[\n            [593,588,90,1],\n            [104,582,-90,1],\n            [593,588-14,90,1],\n            [104,582-14,-90,1],\n            [593,588-28,90,1],\n            [104,582-28,-90,1],\n            [300,6,function(t){return Math.sin(t*0.4)*80;},1],\n            [6,6,function(t){return Math.sin(t*0.3)*36-45;},1],\n            [594,300,function(t){return Math.sin(t*0.5)*30+90;},1],\n        ],\n        \n    },\n    {\n        spawn:[47,580],\n        end:[568,574],\n        walls:[\n            [0,0,s,0],\n            [0,0,0,s],\n            [s,0,s,s],\n            [0,s,s,s],\n            [500,540,600,540],\n        ],\n        pointers:[\n            [250,9,0],\n            [150,9,0],\n            [350,9,0],\n            [592,9,76,5],\n        ],\n        alarms:[\n            [467,540,348],\n        ],\n        texts:[\n            \n            ['Find a way to\\ndestroy the sensor.',465,427]\n        ]\n    },\n    {\n        spawn:[30,580],\n        end:[570,575],\n        walls:[\n            [0,0,s,0],\n            [0,s,s,s],\n            [0,0,0,s],\n            [s,0,s,s],\n            [243,534,329,544],\n        ],\n        pointers:[\n            [294,9,16],\n            [360,9,-10],\n            [444,9,51,6],\n            [593,12,81.4,6],\n            [7,12,function(t){return Math.sin(t*0.4)*20+330;}],\n        ],\n        alarms:[\n            [269,464,240],\n            [536,493,196],\n            [464,423,606],\n            [285,558,251],\n        ],\n        \n    },\n    {\n        spawn:[50,409],\n        end:[170,53],\n        walls:[\n            [0,0,s,0],\n            [0,s,s,s],\n            [0,0,0,s],\n            [s,0,s,s],\n            [0,430,68,430],\n            [130,392,130,193],\n            [180,193,130,193],\n            [496,70,130,104],\n            [130,103,130,3],\n            [496,70,521,407],\n            [550,462,550,545],\n            [605,462,550,462],\n        ],\n        pointers:[\n            [593,588,90,1],\n            [8,582,-90,1],\n            [593,588-14,90,1],\n            [8,582-14,-90,1],\n            [593,588-28,90,1],\n            [8,582-28,-90,1],\n            [310,7,0],\n        ],\n        alarms:[\n            [228,47,94],\n        ],\n        texts:[['Press F to use your\\nultimate bank robbing tool.',300,495]],\n        plunger:1\n    },\n    {\n        spawn:[40,580],\n        end:[571,527],\n        walls:[\n            [0,0,s,0],\n            [0,s,s,s],\n            [0,0,0,s],\n            [s,0,s,s],\n        ],\n        pointers:[\n            [573,594,180],\n            [573-10,594,180],\n            [573+10,594,180]\n        ],\n        alarms:[\n            [300,300,500],\n            [300,400,500],\n            [300,400,500],\n        ],\n        plunger:1\n    },\n    {\n        spawn:[25,495],\n        end:[578,319],\n        walls:[\n            [0,250,s,250],\n            [s,250,s,350],\n            [50,350,100,350],\n            [150,350,200,350],\n            [250,350,300,350],\n            [350,350,400,350],\n            [450,350,500,350],\n            [550,350,s,350],\n            [50,350,50,519],\n            [0,250,0,519],\n            [0,519,50,519],\n            [150,350,150,519],\n            [250,350,250,519],\n            [350,350,350,519],\n            [450,350,450,519],\n            [550,350,550,519],\n            [100,350,100,519],\n            [200,350,200,519],\n            [300,350,300,519],\n            [400,350,400,519],\n            [500,350,500,519],\n        ],\n        pointers:[\n            [3,300,function(t){return -90-(1-Math.abs(Math.sin(t*2)))*8;}],\n            [596,300,function(t){return 90+(1-Math.abs(Math.sin(t*2)))*8;}]\n        ],\n        alarms:[\n        ],\n        plunger:1\n    },\n    {\n        spawn:[25,30],\n        end:[300,324],\n        walls:[\n            [0,0,s,0],\n            [0,0,0,s],\n            [s,0,s,s],\n            [0,s,s,s],\n            [100,500,100,0],\n            [100,500,500,500],\n            [500,500,500,100],\n            [200,100,500,100],\n            [200,100,200,400],\n            [200,400,400,400],\n            [400,400,400,200],\n            [300,200,440,200],\n            \n            [0,50,50,50],\n            [600,550,547,550],\n            [500,550-70,547,550-70],\n            [600,550-140,547,550-140],\n        ],\n        pointers:[\n            [75,591,180],\n            [175,509,330,7],\n            [107,437,279,1],\n            [595,80,90],\n            [368,106,0],\n            [368-30,106,0],\n            [368-60,106,0],\n            [394,223,90],\n        ],\n        alarms:[\n            [32,540,210],\n            [577,503,237],\n            [244,150,150],\n        ],\n        plunger:1\n    },\n    {\n        spawn:[300,580],\n        end:[300,44],\n        walls:[\n            [0,0,s,0],\n            [0,0,0,s],\n            [s,0,s,s],\n            [0,s,s,s],\n            [275,550,325,550],\n            [60,80,540,80],\n        ],\n        pointers:[\n            [300,300,function(t){return t*80;}],\n            [300,300,function(t){return t*80+60;}],\n            [300,300,function(t){return t*80+60*2;}],\n            [300,300,function(t){return t*80+60*3;}],\n            [300,300,function(t){return t*80+60*4;}],\n            [300,300,function(t){return t*80+60*5;}],\n        ],\n        plunger:1\n    },\n    {\n        spawn:[300,580],\n        end:[0,999],\n        walls:[\n            [0,0,s,0],\n            [0,0,0,s],\n            [s,0,s,s],\n            [0,s,s,s],\n        ],\n        pointers:[],\n        texts:(function(){\n            var arr=[];\n            \n            for(var x=0;x<600;x+=150){\n                \n                for(var y=0;y<600;y+=50){\n                    \n                    arr.push(['YOU WIN!!!',x+sin(y*10)*40+77,y+24]);\n                }\n            }\n            \n            return arr;\n        })(),\n        plunger:1\n    },\n];\n\nfor(var l in levels){\n    \n    var lvl=levels[l];\n    \n    for(var i=lvl.pointers.length;i--;){\n        \n        var t=lvl.pointers[i];\n        \n        t[4]=[-sin(t[2]),cos(t[2])];\n        t[5]=t[2];\n    }\n    for(var i=lvl.walls.length;i--;){\n        \n        var t=lvl.walls[i];\n        \n        var nx=t[0]-t[2],ny=t[1]-t[3],\n            m=1/Math.sqrt(nx*nx+ny*ny);\n        \n        t[4]=[ny*m,-nx*m];\n    }\n}\n\n\nvar mirrorDrawWidth=mirrorWidth-3;\nvar mirrorShineDrawWidth=mirrorDrawWidth*0.9;\nvar mirrorShineOffset=mirrorReach+2;\n\nvar epsilon=0.01;\nvar collisionRad=wallThickness*0.5+playerRadius;\nvar sq_collisionRad=collisionRad*collisionRad;\nvar sq_playerRadius=playerRadius*playerRadius;\nfunction lineLine(x1,y1,x2,y2,x3,y3,x4,y4){\n    \n    var denom=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);\n    var t=((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/denom;\n    var u=((x2-x1)*(y1-y3)-(y2-y1)*(x1-x3))/denom;\n    \n    if(t>=0&&t<=1&&u>=0&&u<=1){\n        \n        return [x1+t*(x2-x1),y1+t*(y2-y1)];\n    }\n}\nfunction reflect(dx,dy,nx,ny){\n    \n    var neg2dotDN=(nx*dx+ny*dy)*-2;\n    return [dx+neg2dotDN*nx,dy+neg2dotDN*ny];\n}\nfunction closestPointOnLine(px,py,x1,y1,x2,y2){\n    \n    var delX=x2-x1,delY=y2-y1,\n        t=constrain(((px-x1)*delX+(py-y1)*delY)/(delX*delX+delY*delY),0,1);\n    \n    delX*=t;\n    delY*=t;\n    delX+=x1;\n    delY+=y1;\n    \n    return [delX,delY];\n}\n\n\n\nvar player={\n    \n    x:0,y:0,\n    vx:0,vy:0,\n    rad:playerRadius,drawDiam:playerRadius*2,\n    theta:0,\n    mirrorDir:[0,0],\n    health:1,\n    item:'mirror'\n},\n    keys={};\n    \nvar then=Date.now(),dt=0,time=0,theta=0;\nvar theLevel;\nvar sMouseX=0,sMouseY=0;\n\n\nfunction rotateItem(){\n    \n    if(!theLevel.plunger){return;}\n    \n    player.item={\n        mirror:'plunger',\n        plunger:'mirror'\n    }[player.item];\n}\nkeyPressed=function(){\n    \n    if(keyCode===70){\n        rotateItem();\n    }\n    keys[keyCode]=1;\n};\nkeyReleased=function(){\n    \n    keys[keyCode]=0;\n};\nmousePressed=function(){\n    if(mouseButton===39){\n        rotateItem();\n    }\n};\n\nfunction setLevel(lvl){\n    \n    level=lvl;\n    player.item='mirror';\n    theLevel=levels[lvl];\n    player.vx=0;\n    player.vy=0;\n    player.x=theLevel.spawn[0];\n    player.y=theLevel.spawn[1];\n    player.health=1;\n    \n    theLevel.texts=theLevel.texts||[];\n    theLevel.alarms=theLevel.alarms||[];\n    for(var i=theLevel.alarms.length;i--;){\n        \n        var t=theLevel.alarms[i];\n        \n        t[3]=1;\n        t[4]=t[2]*0.5+playerRadius;\n        t[4]*=t[4];\n    }\n}\n\nsetLevel(level);\n\nfunction updateLazer(l){\n    \n    //i did NOT prune with AABBs figHT ME\n    \n    var ox=l[0],oy=l[1],\n        fade=1/(l[3]||1),\n        dx=l[4][0],dy=l[4][1],\n        lim=1;\n    \n    while(lim>0.001){\n        \n        var cPoint,cWall=0,minSqD=Infinity;\n        \n        for(var i=theLevel.walls.length+(player.item==='mirror'?1:0);i--;){\n            \n            var t=theLevel.walls[i];\n            \n            if(!t){\n                \n                t=[player.mirrorAx,player.mirrorAy,player.mirrorBx,player.mirrorBy,player.mirrorDir,1];\n            }\n            \n            var ex=ox+dx*999,ey=oy+dy*999,\n                col=lineLine(ox,oy,ex,ey,t[0],t[1],t[2],t[3]);\n            \n            if(col){\n                \n                var sqD=(ox-col[0])*(ox-col[0])+(oy-col[1])*(oy-col[1]);\n                if(sqD<minSqD){\n                    \n                    minSqD=sqD;\n                    cPoint=col;\n                    cWall=t;\n                }\n            }\n        }\n        \n        for(var i=theLevel.alarms.length;i--;){\n            \n            var t=theLevel.alarms[i];\n            \n            var ex=ox+dx*999,ey=oy+dy*999,\n                col=lineLine(ox,oy,ex,ey,t[0],t[1],t[2],t[3]);\n                \n            var cp=closestPointOnLine(t[0],t[1],ox,oy,ex,ey),\n                delX=t[0]-cp[0],delY=t[1]-cp[1],\n                m=delX*delX+delY*delY;\n            \n            if(m<100){\n                \n                m=(cp[0]-ox)*(cp[0]-ox)+(cp[1]-oy)*(cp[1]-oy);\n                if(m<minSqD){\n                    \n                    minSqD=m;\n                    cPoint=cp;\n                    cWall='alarm';\n                    t[3]-=dt;\n                }\n            }\n            \n        }\n        \n        stroke(255,0,0,Math.sqrt(lim)*255*0.5);\n        \n        if(cWall){\n            \n            stroke(255, 0, 0,lim*255);\n            strokeWeight(3);\n            line(ox,oy,cPoint[0],cPoint[1]);\n            stroke(255,255,255,lim*255);\n            strokeWeight(1);\n            line(ox,oy,cPoint[0],cPoint[1]);\n            \n            if(cWall==='alarm'){\n                break;\n            }\n            \n            var cp=closestPointOnLine(player.x,player.y,ox,oy,cPoint[0],cPoint[1]),\n                delX=player.x-cp[0],delY=player.y-cp[1],\n                m=delX*delX+delY*delY;\n        \n            if(m<sq_playerRadius){\n                player.health-=dt*healthDeplete;\n            }\n            \n            var nx=cWall[4][0],ny=cWall[4][1];\n            \n            if(nx*dx+ny*dy>0){\n                nx=-nx;\n                ny=-ny;\n            }\n            \n            var ref=reflect(dx,dy,nx,ny);\n            \n            dx=ref[0];\n            dy=ref[1];\n            \n            ox=cPoint[0]+dx*epsilon;\n            oy=cPoint[1]+dy*epsilon;\n            \n            if(cWall[5]){\n                lim=fade;\n                if(dx*player.mirrorDir[0]+dy*player.mirrorDir[1]<0){\n                    break;\n                }\n            }else{\n                \n                lim-=fade;\n            }\n            \n        }else{\n            \n            stroke(255, 0, 0,lim*255);\n            strokeWeight(3);\n            line(ox,oy,ox+dx*999,oy+dy*999);\n            stroke(255);\n            strokeWeight(1);\n            line(ox,oy,ox+dx*999,oy+dy*999);\n            break;\n        }\n    }\n}\n\ntextFont(createFont('monospace'));\ntextAlign(CENTER,CENTER);\n\ndraw= function() {\n    \n    var now=Date.now();\n    dt=Math.min((now-then)*0.001,0.05)*timeMultiplier;\n    then=now;\n    time+=dt;\n    \n    background(200);\n    \n    \n    player.vy+=gravity*dt;\n    \n    //a bit of coyote time\n    if(keys[87]&&time-player.grounded<0.15){\n        \n        if(player.item==='plunger'&&player.plungerSticking){\n            \n            player.vx=player.plungerSticking[0]*300;\n            player.vy=player.plungerSticking[1]*300-200;\n            player.plungerSticking=0;\n        }else{\n            player.vy=-jumpPower;\n        }\n        player.grounded=0;\n    }\n    \n    if(keys[68]){\n        player.vx+=walkSpeed*dt;\n    }\n    if(keys[65]){\n        player.vx-=walkSpeed*dt;\n    }\n    \n    player.vx/=dt*friction+1;\n    \n    player.x+=player.vx*dt;\n    player.y+=player.vy*dt;\n    \n    \n    var dmx,dmy;\n    \n    //a very not delta-time accurate smoothen \n    // sMouseX+=(mouseX-sMouseX)*20*dt;\n    // sMouseY+=(mouseY-sMouseY)*20*dt;\n    \n    sMouseX=mouseX;\n    sMouseY=mouseY;\n    \n    dmx=sMouseX-player.x;\n    dmy=sMouseY-player.y;\n        m=1/Math.sqrt(dmx*dmx+dmy*dmy);\n    dmx*=m;\n    dmy*=m;\n    \n    if(controlMirrorWithArrowKeys){\n        dmx=Math.sin(player.theta);\n        dmy=Math.cos(player.theta);\n        \n        if(keys[37]){\n            player.theta+=dt*4;\n        }\n        if(keys[39]){\n            player.theta-=dt*4;\n        }\n    }\n    \n    \n    player.mirrorDir[0]=dmx;\n    player.mirrorDir[1]=dmy;\n    \n    //hardcoded radian conversion\n    if(player.item==='mirror'){\n        theta=Math.atan2(-dmx,dmy)*57.295779513;\n        var perpX=-dmy*mirrorWidth,perpY=dmx*mirrorWidth,\n            mirrorX=player.x+dmx*mirrorReach,\n            mirrorY=player.y+dmy*mirrorReach;\n            \n        player.mirrorAx=mirrorX+perpX;\n        player.mirrorAy=mirrorY+perpY;\n        player.mirrorBx=mirrorX-perpX;\n        player.mirrorBy=mirrorY-perpY;\n    }\n    \n    \n    textSize(15);\n    fill(0,0,0);\n    for(var i=theLevel.texts.length;i--;){\n        var t=theLevel.texts[i];\n        text(t[0],t[1],t[2]);\n    }\n    textSize(35);\n    text('💸',theLevel.end[0],theLevel.end[1]);\n    \n    stroke(90,90,90);\n    strokeWeight(wallThickness);\n    for(var i=theLevel.walls.length;i--;){\n        \n        var t=theLevel.walls[i];\n        \n        line(t[0],t[1],t[2],t[3]);\n        \n        var cp=closestPointOnLine(player.x,player.y,t[0],t[1],t[2],t[3]),\n            delX=player.x-cp[0],delY=player.y-cp[1],\n            m=delX*delX+delY*delY;\n        \n        if(m<sq_collisionRad){\n            \n            m=Math.sqrt(m);\n            \n            delX/=m;\n            delY/=m;\n            \n            var pen=(collisionRad-m);\n            \n            player.x+=delX*pen;\n            player.y+=delY*pen;\n            \n            var t=delX*player.vx+delY*player.vy;\n            \n            if(player.item==='plunger'){theta=Math.atan2(-delX,delY)*57.295779513;}\n            \n            if(player.item==='plunger'&&(delY>0.9||Math.abs(delX)>0.9)){\n                player.vx/=dt*friction*4+1;\n                player.vy=0;\n                player.x-=delX;\n                player.y-=delY;\n                player.grounded=time;\n                player.plungerSticking=[delX,delY];\n                \n            }else{\n                \n                player.vx-=t*delX;\n                player.vy-=t*delY;\n                \n                if(delY<-0.5){\n                    player.grounded=time;\n                }\n                player.plungerSticking=0;\n            }\n        }\n    }\n    \n    strokeCap(SQUARE);\n    for(var i=theLevel.pointers.length;i--;){\n        \n        var t=theLevel.pointers[i];\n        \n        if(typeof t[2]==='function'){\n            \n            var a=t[2](time);\n            t[4]=[-sin(a),cos(a)];\n            t[5]=a;\n        }\n        \n        stroke(255, 0, 0);\n        strokeWeight(2);\n        updateLazer(t);\n        \n        translate(t[0],t[1]);\n        rotate(t[5]);\n        fill(255,255,255);\n        stroke(0,0,0);\n        strokeWeight(2);\n        ellipse(0,0,25,10);\n        noStroke();\n        fill(150,0,0);\n        ellipse(0,3,15,5);\n        resetMatrix();\n    }\n    strokeCap(ROUND);\n    \n    var flash=Math.sin(time*5)*20;\n    noStroke();\n    for(var i=theLevel.alarms.length;i--;){\n        \n        var t=theLevel.alarms[i];\n        \n        var dx=player.x-t[0],dy=player.y-t[1];\n        if(dx*dx+dy*dy<t[4]&&t[3]>0){\n            player.health-=dt*healthDeplete*t[3];\n        }\n        \n        fill(100,100,255,t[3]*50+flash);\n        ellipse(t[0],t[1],t[2],t[2]);\n        fill(0);\n        ellipse(t[0],t[1],20,20);\n        fill(255-t[3]*t[3]*255,0,t[3]*255);\n        ellipse(t[0],t[1],10,10);\n    }\n    \n    var rh=Math.sqrt(player.health)*255;\n    \n    fill(255,rh,rh);\n    stroke(0);\n    strokeWeight(1);\n    ellipse(player.x,player.y,player.drawDiam,player.drawDiam);\n    \n    translate(player.x,player.y);\n    rotate(theta);\n    \n    switch(player.item){\n        \n        case 'mirror':\n            strokeWeight(3);\n            line(-mirrorDrawWidth,mirrorReach,mirrorDrawWidth,mirrorReach);\n            stroke(150,200,255);\n            line(-mirrorShineDrawWidth,mirrorShineOffset,mirrorShineDrawWidth,mirrorShineOffset);\n            break;\n            \n        case 'plunger':\n            rotate(135);\n            text('🪠',10,mirrorReach-10);\n            break;\n    }\n    \n    resetMatrix();\n    \n    if(player.health<=0||player.y>700){\n        setLevel(level);\n        return;\n    }\n    \n    if(Math.abs(player.x-theLevel.end[0])+Math.abs(player.y-theLevel.end[1])<50){\n        setLevel(level+1);\n    }\n    \n    if(keys[84]){\n        \n        pushStyle();\n        noStroke();\n        fill(0,0,0,60);\n        rect(0,0,600,600);\n        textFont(createFont('fantasy'));\n        textSize(122);\n        fill(255, 0, 0);\n        text('MIRROR\\nMISSION',300,300);\n        \n        for(var i=123;i<141;i++){\n            textSize(i);\n            text('MIRROR\\nMISSION',300,300);\n        }\n        fill(255);\n        textSize(141);\n        text('MIRROR\\nMISSION',300,300);\n        popStyle();\n    }\n};\n\nif(abs(width-600)>3||abs(height-600)>3){\n    println('your screen size is not 600x600 the game wont work');\n}\n\n\n// its spelled laser but idc lazer is cooler\n\n//kiaan wanted me to credit him but hes not cool or awesome",
    "title": "Mirror Mission",
    "votes": 64,
    "created": "2 days ago",
    "updated": "2 days ago",
    "type": "PJS",
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
            "title": "Projet dérivé de \"Mirror Mission\"",
            "id": "4584388638457856",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "Momo master",
                "id": "kaid_781856588822748745217720"
            }
        }
    ],
    "posts": {
        "tips": [
            {
                "replyCount": 0,
                "votes": 12,
                "date": "2 days ago",
                "author": {
                    "name": "Dat",
                    "id": "kaid_4164356982737975081215128",
                    "avatar": "/images/avatars/svg/marcimus-orange.svg"
                },
                "text": "sub to me (but i dont make platformers)<br><br>https://www.khanacademy.org/computer-programming/dats-epic-subpage/5796103944454144",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 4,
                "date": "a day ago",
                "author": {
                    "name": "Jake K.",
                    "id": "kaid_103000698141866290580261",
                    "avatar": "/images/avatars/svg/leaf-blue.svg"
                },
                "text": "Yeah lazer with a z is cooler I know it is wrong but I spell it that way anyway. Now I just have to say Ztimulated.<br><br>This is pretty awesome. Reminds me of the possibly apocryphal story of archemides using mirrors to set the enemies on fire during the siege of Syracuse.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 4,
                "date": "a day ago",
                "author": {
                    "name": "Ibraheem Ahmed (IA)",
                    "id": "kaid_42165633374795610935956",
                    "avatar": "/images/avatars/svg/spunky-sam.svg"
                },
                "text": "Very fun concept! Graphics leave a bit to be desired though :p<br>That aside, I like the fade of the lasers and the mechanics in generals. Maybe clean up your code a bit? Reminds me vaguely of Brian French's code (this is a positive comment in some aspects and a negative one in others, you decide which).",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 4,
                "date": "2 days ago",
                "author": {
                    "name": "𝕜𝕚𝕒𝕒𝕟𝕥𝕠𝕝𝕚𝕒",
                    "id": "kaid_706406430552760652245376",
                    "avatar": "/images/avatars/svg/cacteye-yellow.svg"
                },
                "text": "\"No words. Except maybe those 2. and those 4. those 3 are in there too. Whatever I have words I guess\" - cwalsh1223",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "2 days ago",
                        "author": {
                            "name": "sugar",
                            "id": "kaid_706936468208143963519267",
                            "avatar": "/images/avatars/svg/scuttlebug-green.svg"
                        },
                        "text": "ur late 💀"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 4,
                "date": "2 days ago",
                "author": {
                    "name": "cwalsh1223 BBB#",
                    "id": "kaid_792288208072906614241148",
                    "avatar": "/images/avatars/svg/spunky-sam-red.svg"
                },
                "text": "Nice game. it's very hard!<br><br>In case you were wondering, kiaan's quote from me was not regarding this game. 😤",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "16 hours ago",
                "author": {
                    "name": "Doctor137",
                    "id": "kaid_1166193792198469906754627",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "Wow... This is a really neat twist on a platformer. :D<br><br>I can vouch for it being possible, just very hard... :)",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "Chickenfarmer2009",
                    "id": "kaid_287879839213083022099587",
                    "avatar": "/images/avatars/svg/piceratops-ultimate.svg"
                },
                "text": "Dat made a PJS program. The Hot List really is gone.<br><br>Pretty cool, though!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Equilibrium",
                            "id": "kaid_1842852586096096865081151",
                            "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                        },
                        "text": "Hey, what can you say? Dat is a well rounded programmer."
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "2 days ago",
                "author": {
                    "name": "- k a t i t e -",
                    "id": "kaid_312040000225853665820004",
                    "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                },
                "text": "first on a dat program, no way!<br><br>this is awesome :D",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "Samurai Warrior™ ✝ (Online)",
                    "id": "kaid_333534297788735128142174",
                    "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                },
                "text": "Nice! <br>Didn't expect to see a PJS platformer from you lol but it's actually quite good. <br>19th",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "Duke",
                    "id": "kaid_351465532815782433620675",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "Epicly fun game dat.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "11 hours ago",
                "author": {
                    "name": "Clifford_Coder",
                    "id": "kaid_361770645178088560937108",
                    "avatar": "/images/avatars/svg/leafers-ultimate.svg"
                },
                "text": "Good job! this is my first comment ever",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "8 hours ago",
                "author": {
                    "name": "dalegomango skool acc",
                    "id": "kaid_371114188602608232313934",
                    "avatar": "/images/avatars/svg/leaf-red.svg"
                },
                "text": "I1!<br>fun game",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "21 hours ago",
                "author": {
                    "name": "Bearkirb314🐻‍❄️",
                    "id": "kaid_375460112550893828689953",
                    "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                },
                "text": "The vector knowledge coming in clutch.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "2 days ago",
                "author": {
                    "name": "honeyghost",
                    "id": "kaid_381818316234075133568777",
                    "avatar": "/images/avatars/svg/boggle-yellow.svg"
                },
                "text": "Cringe? I don't know about that...",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "9 hours ago",
                "author": {
                    "name": "Thorn Seaclaw",
                    "id": "kaid_388945265474133862728997",
                    "avatar": "/images/avatars/svg/leaf-grey.svg"
                },
                "text": "tHis sewms many VIOLEnT. HoPe they TaKe IT dOEWN jusT LIKE the Other One",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "9 hours ago",
                "author": {
                    "name": "Radar",
                    "id": "kaid_3902988618718040904060736",
                    "avatar": "/images/avatars/svg/leafers-seed.svg"
                },
                "text": "Nice Dat! Yay they did increase the vote limit!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "14 hours ago",
                "author": {
                    "name": "Wingfeather",
                    "id": "kaid_691541327914532427755189",
                    "avatar": "/images/avatars/svg/leafers-ultimate.svg"
                },
                "text": "Nice! Amazing game, just the right level of difficulty to be fun but not frustrating.<br>vote ++",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "17 hours ago",
                "author": {
                    "name": "ASBackup",
                    "id": "kaid_714780036830891967670231",
                    "avatar": "/images/avatars/svg/aqualine-tree.svg"
                },
                "text": "eyy a dat game<br>its been too long :(<br>amazing game :D",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "Vuong Vo",
                    "id": "kaid_79869111098624859119085",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "I can't get past four or three or something. The one where there are many platforms to jump up, I can't turn the mirror quick enough",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "an hour ago",
                "author": {
                    "name": "Vuong Vo",
                    "id": "kaid_79869111098624859119085",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "Ah, guys, this game is a throwback to the weapon simulator game Dat made a few years ago.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "11 hours ago",
                "author": {
                    "name": "JJP",
                    "id": "kaid_874785892689340729331212",
                    "avatar": "/images/avatars/svg/aqualine-seedling.svg"
                },
                "text": "Fun fact! Did you know that laser stands for Light Amplification by Stimulated Emission of Radiation",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "14 hours ago",
                "author": {
                    "name": "brighamshirley2024",
                    "id": "kaid_934995906866304096076656",
                    "avatar": "/images/avatars/svg/blobby-green.svg"
                },
                "text": "nice game, I just one you should make a second game.",
                "locked": false,
                "pinned": false,
                "replies": []
            }
        ],
        "questions": [
            {
                "replyCount": 0,
                "votes": 3,
                "date": "a day ago",
                "author": {
                    "name": "ezekiel.carter2009",
                    "id": "kaid_4345125146474084185234199",
                    "avatar": "/images/avatars/svg/blobby-green.svg"
                },
                "text": "Do it for arrow keys too.",
                "replies": [],
                "answers": []
            }
        ]
    }
}