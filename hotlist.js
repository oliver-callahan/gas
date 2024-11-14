var json = {
    "code": "/** Ezra X Duke **/\n\n//  CONTORLS: Arrow Keys\n\n// idea. Just 5 levels, a challegne for you to beat.(it's gonna be a series)\n\n\n// Ezra did a ton 3/4's of the code\nnoStroke();\ntextAlign(CENTER, TOP);\n\n// Too much lag? change this to false!\nvar lag = true;\n\n// vars\nvar click = 0;\nvar d = 0;\nvar scene = 1;\nvar cam = {\n    x: 0,\n    y: 0,\n    s: 100\n};\nvar lPars = [];\nvar lava = [];\nvar portals = [];\nvar blocks = [];\nvar players = [];\nvar createLevel;\n\nvar level = 0;\nvar levels = [\n    [\n        \"bbbbbbbbbbbbbbbbbbbb\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b                 @b\",\n        \"b                 bb\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b      bbbbb       b\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b                  b\",\n        \"bbbbbbb            b\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b    b             b\",\n        \"b    b             b\",\n        \"b    b             b\",\n        \"bbb  b             b\",\n        \"bp   blllllllllllllb\",\n        \"bbbbbbbbbbbbbbbbbbbb\",\n    ],\n    [\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b                 @bb  @             p b\",\n        \"b                 bbb                b b\",\n        \"b                  bb  b               b\",\n        \"b      bbbbb       bb                  b\",\n        \"b                  bbb             b   b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"bbbbbbb            bbb        b        b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b    b             bb     b            b\",\n        \"b    b             bbb                 b\",\n        \"b    b             bb                  b\",\n        \"bbb  b             bb                  b\",\n        \"bbb  b             bb   b              b\",\n        \"b    blllllllllllllbblllllllllllllllllbb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n    ],\n    [\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b                @ bb  @               b\",\n        \"b                b bb                b b\",\n        \"b  b               bb  b               b\",\n        \"b                  bb                  b\",\n        \"b             b    bbb             b   b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b         b        bbb        b        b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b     b            bb     b            b\",\n        \"b                  bbb                 b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b                  bb   b              b\",\n        \"bllllllllllllllllllbblllllllllllllllllbb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"bbbbbbbbbbbbbbbbbbbb\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b                 @b\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b               b  b\",\n        \"b                  b\",\n        \"b        b         b\",\n        \"b                  b\",\n        \"bb                 b\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b  b         b    bb\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b                 bb\",\n        \"b                  b\",\n        \"bp                 b\",\n        \"bbbbbbbbbbbbbbbbbbbb\",\n    ],\n    [\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b                 @bb  @               b\",\n        \"b                 bbb                b b\",\n        \"b                  bb  b               b\",\n        \"b      bbbbb       bb                  b\",\n        \"b                  bbb             b   b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"bbbbbbb            bbb        b        b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b    b             bb     b            b\",\n        \"b    b             bbb                 b\",\n        \"b    b             bb                  b\",\n        \"bbb  b             bb                  b\",\n        \"bbb  b             bb   b              b\",\n        \"b    blllllllllllllbblllllllllllllllllbb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b                 @bb                  b\",\n        \"b                  bb                 @b\",\n        \"b                  bb                  b\",\n        \"b               b  bbb      b      b   b\",\n        \"b                  bb                  b\",\n        \"b        b         bb                  b\",\n        \"b                  bb                  b\",\n        \"bb                 bbb                 b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b  b         b    bbb                  b\",\n        \"b                  bbb                 b\",\n        \"b                  bb                  b\",\n        \"b                 bbb                  b\",\n        \"b                  bb   b    b     b   b\",\n        \"b                  bbllllllllllllllllbpb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n    ],\n    [\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b                 @bb  @             p b\",\n        \"b                 bbb                b b\",\n        \"b                  bb  b               b\",\n        \"b      bbbbb       bb                  b\",\n        \"b                  bbb             b   b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"bbbbbbb            bbb        b        b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b    b             bb     b            b\",\n        \"b    b             bbb                 b\",\n        \"b    b             bb                  b\",\n        \"bbb  b             bb                  b\",\n        \"bbb  b             bb   b              b\",\n        \"bp   blllllllllllllbblllllllllllllllllbb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b                 @bb                  b\",\n        \"b                  bb                 @b\",\n        \"b                  bb                  b\",\n        \"b               b  bbb      b      b   b\",\n        \"b                  bb                  b\",\n        \"b        b         bb                  b\",\n        \"b                  bb                  b\",\n        \"bb                 bbb                 b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b  b         b    bbb                  b\",\n        \"b                  bbb                 b\",\n        \"b                  bb                  b\",\n        \"b                 bbb                  b\",\n        \"b                  bb   b    b     b   b\",\n        \"bp                 bbllllllllllllllllbpb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n    ],\n];\n\n// what happens when keys are pressed and released\nvar keys = {};\nkeyPressed = function(){\n    keys[keyCode] = true;\n};\nkeyReleased = function(){\n    keys[keyCode] = false;\n};\n\n// Helper Functions\nvar rectCollide = function(obj1, obj2){\n    return(obj1.x + obj1.w > obj2.x && obj1.y + obj1.h > obj2.y && obj1.x < obj2.x + obj2.w && obj1.y < obj2.y + obj2.h);    \n};\n\n// Block class\nvar Block = (function() {\n    function Block(config) {\n        this.x = config.x;\n        this.y = config.y;\n        this.w = 20;\n        this.h = 20;\n    }\n    Block.prototype = {\n        display: function() {\n            fill(77, 77, 77);\n            rect(this.x, this.y, this.w, this.h);\n        },\n        collideX: function(object) {\n            if(rectCollide(this, object)) {\n                if (object.x > this.x) {\n                    object.x = this.x + this.w;\n                    object.xv = 0;\n                } else {\n                    object.x = this.x - object.w;\n                    object.xv = 0;\n                }\n            }\n        },\n        collideY: function(object) {\n            if(rectCollide(this, object)) {\n                if (object.y < this.y) {\n                    object.y = this.y - object.h;    \n                    object.canJump = true;\n                    object.yv = 0;\n                } else {\n                    object.y = this.y +this.h;\n                    object.yv = 0;\n                }\n            }\n        },\n    };\n    return Block;\n})();\n\n// lava particle class\nvar LPar = (function() {\n    function LPar(config) {\n        this.x = config.x;\n        this.y = config.y;\n        this.size = random(4, 10);\n        this.vis = 255;\n        this.dead = false;\n    }\n    LPar.prototype.run = function() {\n        fill(196, 53, 53, this.vis);\n        ellipseMode(CORNER);\n        ellipse(this.x, this.y, this.size, this.size);\n        \n        this.y-=0.2;\n        this.vis-=2;\n        if(this.vis < -20) {\n            this.dead = true;\n        }\n    };\n    return LPar;\n})();\n\n// lava class\nvar Lava = (function() {\n    function Lava(config) {\n        this.x = config.x;\n        this.y = config.y;\n        this.w = 20;\n        this.h = 20;\n        this.pushParTime = 0;\n    }\n    Lava.prototype = {\n        display: function() {\n            fill(219, 48, 48);\n            rect(this.x, this.y, this.w, this.h);\n            \n            if(this.pushParTime++ > 1 && lag) {\n                lPars.push(new LPar({x: random(this.x, this.x+this.w-5), y: this.y+10}));\n                this.pushParTime = 0;\n            }\n        },\n        collide: function(object) {\n            if(rectCollide(this, object)) {\n                createLevel();\n                d++;\n            }\n        },\n    };\n    return Lava;\n})();\n\n// portal class\nvar Portal = (function() {\n    function Portal(config) {\n        this.x = config.x;\n        this.y = config.y;\n        this.w = 20;\n        this.h = 20;\n    }\n    Portal.prototype = {\n        display: function() {\n            fill(181, 27, 189);\n            rect(this.x, this.y, this.w, this.h);\n        },\n        collide: function(object) {\n            if(rectCollide(this, object)) {\n                if(level !== 4) {\n                    level++;\n                    createLevel();\n                    scene++;\n                }\n                else {\n                    scene = 'win';\n                }\n            }\n        },\n    };\n    return Portal;\n})();\n\n// Player class\nvar Player = (function() {\n    function Player(config) {\n        this.x = config.x;\n        this.y = config.y;\n        this.w = 20;\n        this.h = 20;\n        \n        this.xv = 0;\n        this.yv = 0;\n        this.canJump = false;\n        this.grav = 0.32;\n        this.jumpPower = 7;\n    }\n    Player.prototype = {\n        display: function() {\n            fill(80, 80, 250);\n            rect(this.x, this.y, this.w, this.h);\n            fill(0, 0, 0);\n            rect(this.x+3, this.y+4, 4, 4);\n            rect(this.x+this.w-7, this.y+4, 4, 4);\n        },\n        moveX: function() {\n            this.x+=this.xv;\n            this.xv = 0;\n            \n            if(keys[LEFT]){\n                this.xv = -3;\n                this.state = 'left';\n            }\n            if(keys[RIGHT]){\n                this.xv = 3;\n                this.state = 'right';\n            }\n        },\n        moveY: function() {\n            // update player's position\n            this.y += this.yv;\n            this.yv += this.grav;\n            if(keys[UP] && this.canJump) {\n                this.yv = -this.jumpPower;\n                this.canJump = false;\n            }\n        },\n        update: function() {\n            this.display();\n            \n            this.moveX();\n            for(var i = 0; i < blocks.length; i++) {\n                blocks[i].collideX(this);\n            }\n            \n            this.moveY();\n            for(var i = 0; i < blocks.length; i++) {\n                blocks[i].collideY(this);\n            }\n            \n            for(var i = 0; i < lava.length; i++) {\n                lava[i].collide(this);\n            }\n            \n            for(var i = 0; i < portals.length; i++) {\n                portals[i].collide(this);\n            }\n        },\n    };\n    return Player;\n})();\n\nvar createLevel = function() {\n    blocks = [];\n    lava = [];\n    portals = [];\n    players = [];\n    \n    for(var i = 0; i < levels[level].length;i++){    \n        for(var j = 0; j < levels[level][i].length;j++){\n            switch(levels[level][i][j]) {\n                case 'p':\n                    players.push(new Player({\n                        x: j*20,\n                        y: i*20\n                    }));\n                break;\n                case 'b':\n                    blocks.push(new Block({x: j*20, y: i*20}));\n                break;\n                case 'l':\n                    lava.push(new Lava({x: j*20, y: i*20}));\n                break;\n                case '@':\n                    portals.push(new Portal({x: j*20, y: i*20}));\n                break;\n            }\n        }\n    }\n};\ncreateLevel();\n\n\nvar runGame = function() {\n    background(255);\n    \n    \n    for(var i = 0; i < lPars.length; i++) {\n        lPars[i].run();\n        if(lPars[i].dead) {\n            lPars.splice(i, 1);\n        }\n    }\n    \n    for(var i = 0; i < players.length; i++) {\n        players[i].update();\n    }\n    \n    \n    for(var i = 0; i < lava.length; i++) {\n        lava[i].display();\n    }\n    \n    for(var i = 0; i < blocks.length; i++) {\n        blocks[i].display();\n    }\n    \n    for(var i = 0; i < portals.length; i++) {\n        portals[i].display();\n    }\n};\n\n\nfunction scenes() {\n    pushMatrix();\n    background(255, 255, 255);\n    scale(cam.s/100);\n    translate(round(cam.x), round(cam.y));\n    \n    if(scene !== 'win') {\n        runGame();\n    }\n    popMatrix();\n    \n    \n    switch(scene) {\n        case 2:\n            cam.x-=(cam.x+400)/5;\n        break;\n        case 3:\n            cam.x-=(cam.x-0)/5;\n            cam.y-=(cam.y+400)/5;\n        break;\n        case 4:\n            cam.x-=(cam.x+400)/5;\n        break;\n        case 5:\n            cam.s-=(cam.s-50)/5;\n            cam.x-=(cam.x+0)/5;\n            cam.y-=(cam.y+0)/5;\n        break;\n        case 'win':\n            textAlign(CENTER, CENTER);\n            cam.x = 0;\n            cam.y = 0;\n            background(255);\n            noStroke();\n            fill(0);\n            textSize(83);\n            text(\"You win!\", 200, 150);\n            textSize(23);\n            text(\"With \" + d + \" deaths\", 200, 275);\n            stroke(143, 143, 143);\n            strokeWeight(10);\n            line(100, 200, 300, 200);\n    }\n    \n    \n}\n\n\ndraw = function() {\n    scenes();\n    if(click > 20) {\n        background(51, 44, 150);\n        pushMatrix();\n        fill(0);\n        rotate(-20);\n        textSize(50);\n        text(\"Just\", 127, 117);\n        popMatrix();\n        pushMatrix();\n        fill(0);\n        rotate(10);\n        textSize(50);\n        text(\"Five\", 248, 113);\n        popMatrix();\n        pushMatrix();\n        fill(0);\n        rotate(-5);\n        textSize(50);\n        text(\"Levels\", 179, 261);\n        popMatrix();\n    }\n};\n\nvar mouseClicked = function() {\n    click++;\n};\n\n\n// not half bad with that many lines.",
    "title": "Just 5 levels[GAME]",
    "votes": 60,
    "created": "a day ago",
    "updated": "15 hours ago",
    "type": "PJS",
    "author": {
        "name": "Duke",
        "id": "kaid_351465532815782433620675",
        "avatar": "/images/avatars/svg/starky-ultimate.svg"
    },
    "dimensions": {
        "width": 400,
        "height": 400
    },
    "forks": [
        {
            "title": "Spin-off of \"Just 5 levels[GAME]\"",
            "id": "4558367730089984",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "Ghya Valentina García Davila",
                "id": "kaid_529732435341413792264298"
            }
        },
        {
            "title": "Derivação de \"Just 5 levels[GAME]\"",
            "id": "5063537719164928",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "Ian Estrela",
                "id": "kaid_116774633893147340426657"
            }
        },
        {
            "title": "Spin-off of \"Just 5 levels[GAME]\"",
            "id": "5412831642959872",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "amyer32",
                "id": "kaid_7422139629257125255978"
            }
        },
        {
            "title": "Spin-off of \"Just 5 levels[GAME]\"",
            "id": "5699699823525888",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "karineburgess13",
                "id": "kaid_927472887123052260601858"
            }
        }
    ],
    "posts": {
        "tips": [
            {
                "replyCount": 0,
                "votes": 12,
                "date": "a day ago",
                "author": {
                    "name": "Ezra",
                    "id": "kaid_1112279572017452692208390",
                    "avatar": "/images/avatars/svg/leaf-red.svg"
                },
                "text": "sub to duke https://www.khanacademy.org/computer-programming/moi-subby-page/6690459761688576<br><br>sub to me for lameee programs Yay: <br> https://www.khanacademy.org/computer-programming/my-subscription-page/4980149521399808<br><br><em>please keep at top</em>",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 4,
                "votes": 4,
                "date": "a day ago",
                "author": {
                    "name": "Radar",
                    "id": "kaid_3902988618718040904060736",
                    "avatar": "/images/avatars/svg/leafers-seed.svg"
                },
                "text": "Nice just how this is a collab and how ezra posted the subpage links and how the better coder released it makes it sound familiar",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "lol we totally didn't copy anything ;P"
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "Yes, it looks better. No, it doesn't lag for me. Also its super easy to win with zero deaths now for me lol"
                    },
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Yeah hopefully the next one will be a bit harder"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 2,
                "date": "13 hours ago",
                "author": {
                    "name": "S 🇳 🇴 🇴 🇵 🇾",
                    "id": "kaid_117061054145957092515447",
                    "avatar": "/images/avatars/svg/mr-pants-orange.svg"
                },
                "text": "The last level is super cool.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thanks snoopy! Go jump on Charlie Brown for me will ya? ;P"
                    }
                ]
            },
            {
                "replyCount": 5,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "theBTG15",
                    "id": "kaid_1184047636356324637542824",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "This is nice! I like the final level.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thank you! Yep that's the biggest thing that sets this aside form other platformers.<br><br>Btw I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "17 hours ago",
                        "author": {
                            "name": "theBTG15",
                            "id": "kaid_1184047636356324637542824",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I think it looks a lot better ngl. The previous one hurt my eyes. It does kind of lag but I think that's because I use a potato for a computer."
                    },
                    {
                        "date": "17 hours ago",
                        "author": {
                            "name": "theBTG15",
                            "id": "kaid_1184047636356324637542824",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Yeah, it comes down to 25 fps on chromebook. I looked at the amount of lines on this and I was impressed! Nice job!"
                    },
                    {
                        "date": "15 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "yeah it hurt my eye too haha<br><br>I added a button that allows you to remove lag(and particles but that is the only way)"
                    },
                    {
                        "date": "11 hours ago",
                        "author": {
                            "name": "theBTG15",
                            "id": "kaid_1184047636356324637542824",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Nice! Very smooth."
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 2,
                "date": "18 hours ago",
                "author": {
                    "name": "Electric Dolphin ⚡️🐬",
                    "id": "kaid_1188776231699286995947997",
                    "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                },
                "text": "This is really creative!<br>You can do <code>translate(round(cam.x), round(cam.y));</code> to stop the seams in between blocks when the camera moves.<br>I eventually got 0 deaths.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "18 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thanks!<br>Oh yeah I meant to do that! thanks!"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 2,
                "date": "16 hours ago",
                "author": {
                    "name": "HB_the_Pencil (semi-retired)",
                    "id": "kaid_412656070256786668848958",
                    "avatar": "/images/avatars/svg/mr-pants-green.svg"
                },
                "text": "Dang, that last level... I couldn't beat it :P",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "15 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "yeah it's rough lol(try getting both things on the right lined up)"
                    }
                ]
            },
            {
                "replyCount": 4,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "Ace Rogers (Off)",
                    "id": "kaid_714276242204949021450419",
                    "avatar": "/images/avatars/svg/leaf-blue.svg"
                },
                "text": "Nice game! I won with 0 deaths. :)",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "20 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thank you and nice!(I have too haha it's pretty easy)<br>Btw I fixed the color scheme and added lava particles, how does it look and does it lag?"
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "You're welcome! :)<br>It looks great! :D<br>Um, let to check. Nope. No lag. Not even the the last level. :)"
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thanks!<br>Great I was afraid that it might =D<br>I might add particles for when the player moves and jumps. I'll let you know if I add that."
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "You're welcome! :)<br>That would be neat. Okay. :)"
                    }
                ]
            },
            {
                "replyCount": 4,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "SwankyMan™",
                    "id": "kaid_82898098000024228278987",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "Yay! First again!<br><br>Thats pretty cool!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thanks!<br>Have you played all of it?"
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "17 hours ago",
                        "author": {
                            "name": "SwankyMan™",
                            "id": "kaid_82898098000024228278987",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Yw!<br><br>Yes (...With 32 deaths)<br><br>It looks good! No lag that I notice.<br><br><b>EDIT</b> 3 deaths :)"
                    },
                    {
                        "date": "17 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "lol it's not <em>that</em> bad :P<br><br>great!"
                    }
                ]
            },
            {
                "replyCount": 4,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "wealR",
                    "id": "kaid_831993479561352012904348",
                    "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                },
                "text": "yay i won with 22 deaths!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "that's lame lol(inside joke y'all)"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "haha i just won with 0 deaths!"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "yeah it's not that hard"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "...I failed the 1st level like 50 times XC<br><br>I feel rly lame XD"
                    }
                ]
            },
            {
                "replyCount": 5,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "Shifter -OFF-",
                    "id": "kaid_892112752920553577482062",
                    "avatar": "/images/avatars/svg/blobby-purple.svg"
                },
                "text": "Yay I won with 198 deaths! XD. Great game, I would have never thought of this!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "lol my best is 0 :P<br><br>thank you!"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Shifter -OFF-",
                            "id": "kaid_892112752920553577482062",
                            "avatar": "/images/avatars/svg/blobby-purple.svg"
                        },
                        "text": "I'm trying to get as little deaths as I can. EDIT: I just got a new record: 3 deaths!"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "sweet job!"
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "17 hours ago",
                        "author": {
                            "name": "Shifter -OFF-",
                            "id": "kaid_892112752920553577482062",
                            "avatar": "/images/avatars/svg/blobby-purple.svg"
                        },
                        "text": "It looks great! there's no lag at all!"
                    }
                ]
            },
            {
                "replyCount": 2,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "WinWinKhan",
                    "id": "kaid_936941229910200376858712",
                    "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                },
                "text": "Done with 44 death.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Nicely done!<br><br>I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "WinWinKhan",
                            "id": "kaid_936941229910200376858712",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": "Not at all for me, maybe it would lag a lot in older devices though."
                    }
                ]
            },
            {
                "replyCount": 5,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "Cyan Spirit",
                    "id": "kaid_1418532449612597727143882",
                    "avatar": "/images/avatars/svg/cacteye-blue.svg"
                },
                "text": "Wow, really cool!! ! !<br><br>Right now I'm trying to beat each of the four different levels when they're together at the end.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thank you!<br><br>Yeah the last level :P<br>It's possible just very hard ;P"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cyan Spirit",
                            "id": "kaid_1418532449612597727143882",
                            "avatar": "/images/avatars/svg/cacteye-blue.svg"
                        },
                        "text": "You're welcome! :P<br>I've beaten the top two already in that last level. The bottom two seem like they might be possible, just very extremely hard."
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "the only one that I knew you could beat was the top right one lol(when they are all four at once)"
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "10 hours ago",
                        "author": {
                            "name": "Cyan Spirit",
                            "id": "kaid_1418532449612597727143882",
                            "avatar": "/images/avatars/svg/cacteye-blue.svg"
                        },
                        "text": "I do like it! And it doesn't seem to lag for me.<br>But now that the lava has particles it makes me want to see way more particles and detailed graphics! :P<br><br>Also, lol.<br>I still can't beat those bottom two..."
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "8 hours ago",
                "author": {
                    "name": "Yogurt",
                    "id": "kaid_23839232709913550984474",
                    "avatar": "/images/avatars/svg/cs-winston.svg"
                },
                "text": "Did it in 10 deaths, this is pretty good!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 3,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "- k a t i t e -",
                    "id": "kaid_312040000225853665820004",
                    "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                },
                "text": "this is super cool!<br><br>i can't beat the third level, none of the jumps seem to work :(",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "try to air jump.<br><br>it really gets cool at the last level :P"
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "16 hours ago",
                        "author": {
                            "name": "- k a t i t e -",
                            "id": "kaid_312040000225853665820004",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "it looks great! i'm not having any problems with lag :D"
                    }
                ]
            },
            {
                "replyCount": 2,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "HAMBURGER RiDER",
                    "id": "kaid_410991944085535280495507",
                    "avatar": "/images/avatars/svg/starky-sapling.svg"
                },
                "text": "Whoa, super unique idea!<br>Love the transitions to different levels, the only thing I could have asked for was better graphics, or even less harsh colors haha<br><br>I was a little disappointed, though, that only one of the players had to reach the end!<br>I thought they all had to - it would be much harder that way. (once they reached the goal they would disappear)<br><br>Looking forward to the next challenge :D<br>Vote ++;",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "haha thank you!<br>yeah the graphics was definitely the lacking part. yeah I'm too lazy to change them idk why but it takes me wayyy to long lol<br><br>oooh that would be a great idea... I may add that tomorrow haha!<br><br>I already have a idea that I think will make your head spin :P<br>thanks again!"
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I fixed the color scheme and added particles, how does it look and does it lag?"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "13 hours ago",
                "author": {
                    "name": "ezekiel.carter2009",
                    "id": "kaid_4345125146474084185234199",
                    "avatar": "/images/avatars/svg/blobby-green.svg"
                },
                "text": "15 deaths to beat game. Good Game!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "6 hours ago",
                "author": {
                    "name": "Green falcon",
                    "id": "kaid_455614962916004540799706",
                    "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                },
                "text": "awesome game!<br>vote++",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 11,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "3DA Games",
                    "id": "kaid_46113533788750322324717",
                    "avatar": "/images/avatars/svg/boggle-blue.svg"
                },
                "text": "Very good game! I do have a few things I need you to improve on:<br>    Its good but the creation of the first no death level sometimes isn't possible to jump on if you arent good, actually never minddd",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "20 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thank you!<br>haha yeah that level I made for people who like to rage quit lol<br><br>I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "3DA Games",
                            "id": "kaid_46113533788750322324717",
                            "avatar": "/images/avatars/svg/boggle-blue.svg"
                        },
                        "text": "It does'nt lag at all and looks good! Maybe make those blocks black and not gray"
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "3DA Games",
                            "id": "kaid_46113533788750322324717",
                            "avatar": "/images/avatars/svg/boggle-blue.svg"
                        },
                        "text": "I did never mind cuz i made it over."
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Great! I might add another thing and ask you if it lags.<br><br>yeah I saw that I was just agreeing that it is hard."
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "3DA Games",
                            "id": "kaid_46113533788750322324717",
                            "avatar": "/images/avatars/svg/boggle-blue.svg"
                        },
                        "text": "Its not hard, I was just doing the laws of physics then remembering this is a platformer lol. It wasnt hard after thinking that."
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "lol maybe your just better then me cause I only make it a fourth of the times lol"
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "3DA Games",
                            "id": "kaid_46113533788750322324717",
                            "avatar": "/images/avatars/svg/boggle-blue.svg"
                        },
                        "text": "I do have one request, a double jump powerup. I accidentally got one and that it was cool. Reccomended ;)"
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "3DA Games",
                            "id": "kaid_46113533788750322324717",
                            "avatar": "/images/avatars/svg/boggle-blue.svg"
                        },
                        "text": "I dont know if im better than you. I do Geometry Dash but still."
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Not in this game sir but in my future games I will :P<br>(A Gray World game that I made has one)"
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "oh didn't see your second comment woops.<br>yeah idk."
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "3DA Games",
                            "id": "kaid_46113533788750322324717",
                            "avatar": "/images/avatars/svg/boggle-blue.svg"
                        },
                        "text": "Yeah does sound good! Also weird reason if you go to TT and type something then back to the games it makes you restart and idk why. The graphics are gone after that :("
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "19 hours ago",
                "author": {
                    "name": "jedimaster09",
                    "id": "kaid_4940962515427875209226",
                    "avatar": "/images/avatars/svg/cs-ohnoes.svg"
                },
                "text": "Finished in 2 deaths. The best part of the platformer is the last level.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "16 hours ago",
                "author": {
                    "name": "HACK",
                    "id": "kaid_6815067100354522609320825",
                    "avatar": "/images/avatars/svg/cs-ohnoes.svg"
                },
                "text": "How do you beat level 1",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "15 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "try air jumping"
                    }
                ]
            },
            {
                "replyCount": 6,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "𝕜𝕚𝕒𝕒𝕟𝕥𝕠𝕝𝕚𝕒",
                    "id": "kaid_706406430552760652245376",
                    "avatar": "/images/avatars/svg/cacteye-yellow.svg"
                },
                "text": "Nice job, very rage-inducing  <br><br>Don't ask what happened to my best pair of headphones 🥵",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thank you, yes I made it hard on purpose ;P<br><br>haha. Tip, win by the top right level. Get the right sides guys lined up. And remember to air jump ;P"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "𝕜𝕚𝕒𝕒𝕟𝕥𝕠𝕝𝕚𝕒",
                            "id": "kaid_706406430552760652245376",
                            "avatar": "/images/avatars/svg/cacteye-yellow.svg"
                        },
                        "text": "I won, nice tip."
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "yay =D"
                    },
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "12 hours ago",
                        "author": {
                            "name": "𝕜𝕚𝕒𝕒𝕟𝕥𝕠𝕝𝕚𝕒",
                            "id": "kaid_706406430552760652245376",
                            "avatar": "/images/avatars/svg/cacteye-yellow.svg"
                        },
                        "text": "I won by the top left level :P<br><br>It looks pretty good, I would mess around with colors. Also its pretty laggy with lava 😢"
                    },
                    {
                        "date": "11 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "hmmm let me try that...(EDIT: yeah I beat it)<br><br>just change that one lag var to false;"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "15 hours ago",
                "author": {
                    "name": "AmethystSky",
                    "id": "kaid_784805823121542822870790",
                    "avatar": "/images/avatars/svg/duskpin-ultimate.svg"
                },
                "text": "Finally completed it, 21 deaths (mostly on the last level and the second one)",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "16 hours ago",
                "author": {
                    "name": "cwalsh1223 BBB#",
                    "id": "kaid_792288208072906614241148",
                    "avatar": "/images/avatars/svg/spunky-sam-red.svg"
                },
                "text": "Nice (but generic) platformer. I beat it with 0 deaths (yay)<br>I like the final level. :)",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "15 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "It is indeed a generic platformer. Made in one day :P<br>Yeah the last level is the biggest part."
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "11 hours ago",
                "author": {
                    "name": "Luke Ellis",
                    "id": "kaid_8535468719137003545030723",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "Man, I haven't seen a platformer with a level like that last one before. Nice job, Duke and [Ezra].",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "10 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thank you!"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "ReggieCool2013",
                    "id": "kaid_9144584103432744361214001",
                    "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                },
                "text": "wow sooooo gooooooooooooooooooodddddd",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "20 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I fixed the color scheme and added particles so hopefully it should be a little better."
                    }
                ]
            }
        ],
        "questions": [
            {
                "replyCount": 0,
                "votes": 1,
                "date": "18 hours ago",
                "author": {
                    "name": "math manual",
                    "id": "kaid_1132758746388014174224664",
                    "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                },
                "text": "Why? Of all the names?",
                "replies": [],
                "answers": [
                    {
                        "replyCount": 0,
                        "votes": 2,
                        "date": "18 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Why not?",
                        "replies": []
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "13 hours ago",
                "author": {
                    "name": "Oreo",
                    "id": "kaid_726551157454425501696621",
                    "avatar": "/images/avatars/svg/starky-seedling.svg"
                },
                "text": "i cant get past 3",
                "replies": [],
                "answers": [
                    {
                        "replyCount": 1,
                        "votes": 1,
                        "date": "12 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "try to jump after you fall off the block. it's hard but possible.",
                        "replies": [
                            {
                                "date": "12 hours ago",
                                "author": {
                                    "name": "Oreo",
                                    "id": "kaid_726551157454425501696621",
                                    "avatar": "/images/avatars/svg/starky-seedling.svg"
                                },
                                "text": "i got it"
                            }
                        ]
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "11 hours ago",
                "author": {
                    "name": "Mushy Avocado",
                    "id": "kaid_889538221957342292210697",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "How come you split up all the classes into individual IIFEs? There's zero gain from that, in fact it uses more code.",
                "replies": [],
                "answers": [
                    {
                        "replyCount": 2,
                        "votes": 1,
                        "date": "9 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "How would you do it?",
                        "replies": [
                            {
                                "date": "9 hours ago",
                                "author": {
                                    "name": "Mushy Avocado",
                                    "id": "kaid_889538221957342292210697",
                                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                                },
                                "text": "Maybe just make the classes global? I prefer to use IIFEs when I have a bunch of related classes that I don't want polluting the global scope, so I return an object from the IIFE containing those classes. Or when I have variables that I want to keep from being in the global scope, so I enclose it in an IIFE. Of course, it's just a preference though. How you write your code is up to you<br><br>Here's an example:<br><br><pre><code>var Platformer = (function() {<br><br>    var internalVariable = true;<br><br>    return {<br>        Block: Block,<br>        Level: Level,<br>        <br>    };<br>})();<br><br>// Example use:<br>var block = new Platformer.Block();</code></pre><br><br>Cool game btw. I like idea"
                            },
                            {
                                "date": "8 hours ago",
                                "author": {
                                    "name": "Duke",
                                    "id": "kaid_351465532815782433620675",
                                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                                },
                                "text": "You mean just put all the game code into a iife? I tried that but failed to get it to work so I switched to this.<br><br>I think I know how to do it now(I was trying something weird)<br><br>The reason I put them into there own iifes is because it helps me sort through it easier.(in a smaller case like this it wouldn't matter that much but when it gets to like 6k it's rough.)<br><br>I'll try something like that next time, and I'll make sure to ask you for help if I need to ;P<br><br>And thanks =D"
                            }
                        ]
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "10 minutes ago",
                "author": {
                    "name": "ReggieCool2013",
                    "id": "kaid_9144584103432744361214001",
                    "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                },
                "text": "pls vote me<br> i beg pls",
                "replies": [],
                "answers": []
            }
        ]
    }
}