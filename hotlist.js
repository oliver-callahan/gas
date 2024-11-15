var json = {
    "code": "/** Ezra X Duke **/\n\n//  CONTROLS: Arrow Keys\n\n// idea. Just 5 levels, a challegne for you to beat.(it's gonna be a series)\n\n\n// Ezra did a ton 3/4's of the code\nnoStroke();\ntextAlign(CENTER, TOP);\n\n// Too much lag? change this to false!\nvar lag = true;\n\n// nice thingy made by dkareh \n(function() {return this;})().LoopProtector.prototype.leave = function() {};\n\n// vars\nvar click = 0;\nvar d = 0;\nvar scene = 1;\nvar cam = {\n    x: 0,\n    y: 0,\n    s: 100\n};\nvar lPars = [];\nvar lava = [];\nvar portals = [];\nvar blocks = [];\nvar players = [];\nvar createLevel;\n\nvar level = 0;\nvar levels = [\n    [\n        \"bbbbbbbbbbbbbbbbbbbb\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b                 @b\",\n        \"b                 bb\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b      bbbbb       b\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b                  b\",\n        \"bbbbbbb            b\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b    b             b\",\n        \"b    b             b\",\n        \"b    b             b\",\n        \"bbb  b             b\",\n        \"bp   blllllllllllllb\",\n        \"bbbbbbbbbbbbbbbbbbbb\",\n    ],\n    [\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b                 @bb  @             p b\",\n        \"b                 bbb                b b\",\n        \"b                  bb  b               b\",\n        \"b      bbbbb       bb                  b\",\n        \"b                  bbb             b   b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"bbbbbbb            bbb        b        b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b    b             bb     b            b\",\n        \"b    b             bbb                 b\",\n        \"b    b             bb                  b\",\n        \"bbb  b             bb                  b\",\n        \"bbb  b             bb   b              b\",\n        \"b    blllllllllllllbblllllllllllllllllbb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n    ],\n    [\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b                @ bb  @               b\",\n        \"b                b bb                b b\",\n        \"b  b               bb  b               b\",\n        \"b                  bb                  b\",\n        \"b             b    bbb             b   b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b         b        bbb        b        b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b     b            bb     b            b\",\n        \"b                  bbb                 b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b                  bb   b              b\",\n        \"bllllllllllllllllllbblllllllllllllllllbb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"bbbbbbbbbbbbbbbbbbbb\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b                 @b\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b               b  b\",\n        \"b                  b\",\n        \"b        b         b\",\n        \"b                  b\",\n        \"bb                 b\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b  b         b    bb\",\n        \"b                  b\",\n        \"b                  b\",\n        \"b                 bb\",\n        \"b                  b\",\n        \"bp                 b\",\n        \"bbbbbbbbbbbbbbbbbbbb\",\n    ],\n    [\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b                 @bb  @               b\",\n        \"b                 bbb                b b\",\n        \"b                  bb  b               b\",\n        \"b      bbbbb       bb                  b\",\n        \"b                  bbb             b   b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"bbbbbbb            bbb        b        b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b    b             bb     b            b\",\n        \"b    b             bbb                 b\",\n        \"b    b             bb                  b\",\n        \"bbb  b             bb                  b\",\n        \"bbb  b             bb   b              b\",\n        \"b    blllllllllllllbblllllllllllllllllbb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b                 @bb                  b\",\n        \"b                  bb                 @b\",\n        \"b                  bb                  b\",\n        \"b               b  bbb      b      b   b\",\n        \"b                  bb                  b\",\n        \"b        b         bb                  b\",\n        \"b                  bb                  b\",\n        \"bb                 bbb                 b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b  b         b    bbb                  b\",\n        \"b                  bbb                 b\",\n        \"b                  bb                  b\",\n        \"b                 bbb                  b\",\n        \"b                  bb   b    b     b   b\",\n        \"b                  bbllllllllllllllllbpb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n    ],\n    [\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b                 @bb  @             p b\",\n        \"b                 bbb                b b\",\n        \"b                  bb  b               b\",\n        \"b      bbbbb       bb                  b\",\n        \"b                  bbb             b   b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"bbbbbbb            bbb        b        b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b    b             bb     b            b\",\n        \"b    b             bbb                 b\",\n        \"b    b             bb                  b\",\n        \"bbb  b             bb                  b\",\n        \"bbb  b             bb   b              b\",\n        \"bp   blllllllllllllbblllllllllllllllllbb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b                 @bb                  b\",\n        \"b                  bb                 @b\",\n        \"b                  bb                  b\",\n        \"b               b  bbb      b      b   b\",\n        \"b                  bb                  b\",\n        \"b        b         bb                  b\",\n        \"b                  bb                  b\",\n        \"bb                 bbb                 b\",\n        \"b                  bb                  b\",\n        \"b                  bb                  b\",\n        \"b  b         b    bbb                  b\",\n        \"b                  bbb                 b\",\n        \"b                  bb                  b\",\n        \"b                 bbb                  b\",\n        \"b                  bb   b    b     b   b\",\n        \"bp                 bbllllllllllllllllbpb\",\n        \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n    ],\n];\n\n// what happens when keys are pressed and released\nvar keys = {};\nkeyPressed = function(){\n    keys[keyCode] = true;\n};\nkeyReleased = function(){\n    keys[keyCode] = false;\n};\n\n// Helper Functions\nvar rectCollide = function(obj1, obj2){\n    return(obj1.x + obj1.w > obj2.x && obj1.y + obj1.h > obj2.y && obj1.x < obj2.x + obj2.w && obj1.y < obj2.y + obj2.h);    \n};\n\n// Block class\nvar Block = (function() {\n    function Block(config) {\n        this.x = config.x;\n        this.y = config.y;\n        this.w = 20;\n        this.h = 20;\n    }\n    Block.prototype = {\n        display: function() {\n            fill(77, 77, 77);\n            rect(this.x, this.y, this.w, this.h);\n        },\n        collideX: function(object) {\n            if(rectCollide(this, object)) {\n                if (object.x > this.x) {\n                    object.x = this.x + this.w;\n                    object.xv = 0;\n                } else {\n                    object.x = this.x - object.w;\n                    object.xv = 0;\n                }\n            }\n        },\n        collideY: function(object) {\n            if(rectCollide(this, object)) {\n                if (object.y < this.y) {\n                    object.y = this.y - object.h;    \n                    object.canJump = true;\n                    object.yv = 0;\n                } else {\n                    object.y = this.y +this.h;\n                    object.yv = 0;\n                }\n            }\n        },\n    };\n    return Block;\n})();\n\n// lava particle class\nvar LPar = (function() {\n    function LPar(config) {\n        this.x = config.x;\n        this.y = config.y;\n        this.size = random(4, 10);\n        this.vis = 255;\n        this.dead = false;\n    }\n    LPar.prototype.run = function() {\n        fill(196, 53, 53, this.vis);\n        ellipseMode(CORNER);\n        ellipse(this.x, this.y, this.size, this.size);\n        \n        this.y-=0.2;\n        this.vis-=2;\n        if(this.vis < -20) {\n            this.dead = true;\n        }\n    };\n    return LPar;\n})();\n\n// lava class\nvar Lava = (function() {\n    function Lava(config) {\n        this.x = config.x;\n        this.y = config.y;\n        this.w = 20;\n        this.h = 20;\n        this.pushParTime = 0;\n    }\n    Lava.prototype = {\n        display: function() {\n            fill(219, 48, 48);\n            rect(this.x, this.y, this.w, this.h);\n            \n            if(this.pushParTime++ > 1 && lag) {\n                lPars.push(new LPar({x: random(this.x, this.x+this.w-5), y: this.y+10}));\n                this.pushParTime = 0;\n            }\n        },\n        collide: function(object) {\n            if(rectCollide(this, object)) {\n                createLevel();\n                d++;\n            }\n        },\n    };\n    return Lava;\n})();\n\n// portal class\nvar Portal = (function() {\n    function Portal(config) {\n        this.x = config.x;\n        this.y = config.y;\n        this.w = 20;\n        this.h = 20;\n    }\n    Portal.prototype = {\n        display: function() {\n            fill(181, 27, 189);\n            rect(this.x, this.y, this.w, this.h);\n        },\n        collide: function(object) {\n            if(rectCollide(this, object)) {\n                if(level !== 4) {\n                    level++;\n                    createLevel();\n                    scene++;\n                }\n                else {\n                    scene = 'win';\n                }\n            }\n        },\n    };\n    return Portal;\n})();\n\n// Player class\nvar Player = (function() {\n    function Player(config) {\n        this.x = config.x;\n        this.y = config.y;\n        this.w = 20;\n        this.h = 20;\n        \n        this.xv = 0;\n        this.yv = 0;\n        this.canJump = false;\n        this.grav = 0.32;\n        this.jumpPower = 7;\n    }\n    Player.prototype = {\n        display: function() {\n            fill(80, 80, 250);\n            rect(this.x, this.y, this.w, this.h);\n            fill(0, 0, 0);\n            rect(this.x+3, this.y+4, 4, 4);\n            rect(this.x+this.w-7, this.y+4, 4, 4);\n        },\n        moveX: function() {\n            this.x+=this.xv;\n            this.xv = 0;\n            \n            if(keys[LEFT]){\n                this.xv = -3;\n                this.state = 'left';\n            }\n            if(keys[RIGHT]){\n                this.xv = 3;\n                this.state = 'right';\n            }\n        },\n        moveY: function() {\n            // update player's position\n            this.y += this.yv;\n            this.yv += this.grav;\n            if(keys[UP] && this.canJump) {\n                this.yv = -this.jumpPower;\n                this.canJump = false;\n            }\n        },\n        update: function() {\n            this.display();\n            \n            this.moveX();\n            for(var i = 0; i < blocks.length; i++) {\n                blocks[i].collideX(this);\n            }\n            \n            this.moveY();\n            for(var i = 0; i < blocks.length; i++) {\n                blocks[i].collideY(this);\n            }\n            \n            for(var i = 0; i < lava.length; i++) {\n                lava[i].collide(this);\n            }\n            \n            for(var i = 0; i < portals.length; i++) {\n                portals[i].collide(this);\n            }\n        },\n    };\n    return Player;\n})();\n\nvar createLevel = function() {\n    blocks = [];\n    lava = [];\n    portals = [];\n    players = [];\n    \n    for(var i = 0; i < levels[level].length;i++){    \n        for(var j = 0; j < levels[level][i].length;j++){\n            switch(levels[level][i][j]) {\n                case 'p':\n                    players.push(new Player({\n                        x: j*20,\n                        y: i*20\n                    }));\n                break;\n                case 'b':\n                    blocks.push(new Block({x: j*20, y: i*20}));\n                break;\n                case 'l':\n                    lava.push(new Lava({x: j*20, y: i*20}));\n                break;\n                case '@':\n                    portals.push(new Portal({x: j*20, y: i*20}));\n                break;\n            }\n        }\n    }\n};\ncreateLevel();\n\n\nvar runGame = function() {\n    background(255);\n    \n    \n    for(var i = 0; i < lPars.length; i++) {\n        lPars[i].run();\n        if(lPars[i].dead) {\n            lPars.splice(i, 1);\n        }\n    }\n    \n    for(var i = 0; i < players.length; i++) {\n        players[i].update();\n    }\n    \n    \n    for(var i = 0; i < lava.length; i++) {\n        lava[i].display();\n    }\n    \n    for(var i = 0; i < blocks.length; i++) {\n        blocks[i].display();\n    }\n    \n    for(var i = 0; i < portals.length; i++) {\n        portals[i].display();\n    }\n};\n\n\nfunction scenes() {\n    pushMatrix();\n    background(255, 255, 255);\n    scale(cam.s/100);\n    translate(round(cam.x), round(cam.y));\n    \n    if(scene !== 'win') {\n        runGame();\n    }\n    popMatrix();\n    \n    \n    switch(scene) {\n        case 2:\n            cam.x-=(cam.x+400)/5;\n        break;\n        case 3:\n            cam.x-=(cam.x-0)/5;\n            cam.y-=(cam.y+400)/5;\n        break;\n        case 4:\n            cam.x-=(cam.x+400)/5;\n        break;\n        case 5:\n            cam.s-=(cam.s-50)/5;\n            cam.x-=(cam.x+0)/5;\n            cam.y-=(cam.y+0)/5;\n        break;\n        case 'win':\n            textAlign(CENTER, CENTER);\n            cam.x = 0;\n            cam.y = 0;\n            background(255);\n            noStroke();\n            fill(0);\n            textSize(83);\n            text(\"You win!\", 200, 150);\n            textSize(23);\n            text(\"With \" + d + \" deaths\", 200, 275);\n            stroke(143, 143, 143);\n            strokeWeight(10);\n            line(100, 200, 300, 200);\n    }\n    \n    \n}\n\n\ndraw = function() {\n    scenes();\n    if(click > 20) {\n        background(51, 44, 150);\n        pushMatrix();\n        fill(0);\n        rotate(-20);\n        textSize(50);\n        text(\"Just\", 127, 117);\n        popMatrix();\n        pushMatrix();\n        fill(0);\n        rotate(10);\n        textSize(50);\n        text(\"Five\", 248, 113);\n        popMatrix();\n        pushMatrix();\n        fill(0);\n        rotate(-5);\n        textSize(50);\n        text(\"Levels\", 179, 261);\n        popMatrix();\n    }\n};\n\nvar mouseClicked = function() {\n    click++;\n};\n\n\n// not half bad with that many lines.",
    "title": "Just 5 levels[GAME]",
    "votes": 84,
    "created": "2 days ago",
    "updated": "3 hours ago",
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
            "id": "5087761674452992",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "bdf1043",
                "id": "kaid_720244477854709756909290"
            }
        },
        {
            "title": "Spin-off of \"Just 5 levels[GAME]\"",
            "id": "5296094297636864",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "amyers",
                "id": "kaid_640463414302712927699876"
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
        },
        {
            "title": "Basic platformer",
            "id": "6374504046444544",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "Zpikemaster24",
                "id": "kaid_753888317123473340091614"
            }
        },
        {
            "title": "Just 5 levels[GAME]EASY(not mine)",
            "id": "6462571579097088",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "liamford.stu",
                "id": "kaid_179275454209023722256311"
            }
        }
    ],
    "posts": {
        "tips": [
            {
                "replyCount": 0,
                "votes": 16,
                "date": "2 days ago",
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
                "date": "2 days ago",
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
                        "date": "2 days ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "lol we totally didn't copy anything ;P"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "Yes, it looks better. No, it doesn't lag for me. Also its super easy to win with zero deaths now for me lol"
                    },
                    {
                        "date": "a day ago",
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
                "votes": 3,
                "date": "a day ago",
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
                        "date": "a day ago",
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
                "date": "2 days ago",
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
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thank you! Yep that's the biggest thing that sets this aside form other platformers.<br><br>Btw I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "theBTG15",
                            "id": "kaid_1184047636356324637542824",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I think it looks a lot better ngl. The previous one hurt my eyes. It does kind of lag but I think that's because I use a potato for a computer."
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "theBTG15",
                            "id": "kaid_1184047636356324637542824",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Yeah, it comes down to 25 fps on chromebook. I looked at the amount of lines on this and I was impressed! Nice job!"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "yeah it hurt my eye too haha<br><br>I added a button that allows you to remove lag(and particles but that is the only way)"
                    },
                    {
                        "date": "a day ago",
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
                "date": "a day ago",
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
                        "date": "a day ago",
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
                "date": "a day ago",
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
                        "date": "a day ago",
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
                "date": "2 days ago",
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
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thank you and nice!(I have too haha it's pretty easy)<br>Btw I fixed the color scheme and added lava particles, how does it look and does it lag?"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "You're welcome! :)<br>It looks great! :D<br>Um, let to check. Nope. No lag. Not even the the last level. :)"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thanks!<br>Great I was afraid that it might =D<br>I might add particles for when the player moves and jumps. I'll let you know if I add that."
                    },
                    {
                        "date": "a day ago",
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
                "replyCount": 1,
                "votes": 2,
                "date": "a day ago",
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
                        "date": "a day ago",
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
                "replyCount": 4,
                "votes": 2,
                "date": "2 days ago",
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
                        "date": "2 days ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thanks!<br>Have you played all of it?"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "SwankyMan™",
                            "id": "kaid_82898098000024228278987",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Yw!<br><br>Yes (...With 32 deaths)<br><br>It looks good! No lag that I notice.<br><br><b>EDIT</b> 3 deaths :)"
                    },
                    {
                        "date": "a day ago",
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
                "date": "2 days ago",
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
                        "date": "2 days ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "that's lame lol(inside joke y'all)"
                    },
                    {
                        "date": "2 days ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "haha i just won with 0 deaths!"
                    },
                    {
                        "date": "2 days ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "yeah it's not that hard"
                    },
                    {
                        "date": "2 days ago",
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
                "date": "2 days ago",
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
                        "date": "2 days ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "lol my best is 0 :P<br><br>thank you!"
                    },
                    {
                        "date": "2 days ago",
                        "author": {
                            "name": "Shifter -OFF-",
                            "id": "kaid_892112752920553577482062",
                            "avatar": "/images/avatars/svg/blobby-purple.svg"
                        },
                        "text": "I'm trying to get as little deaths as I can. EDIT: I just got a new record: 3 deaths!"
                    },
                    {
                        "date": "2 days ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "sweet job!"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "a day ago",
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
                "date": "2 days ago",
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
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Nicely done!<br><br>I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "a day ago",
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
                "date": "2 days ago",
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
                        "date": "2 days ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thank you!<br><br>Yeah the last level :P<br>It's possible just very hard ;P"
                    },
                    {
                        "date": "2 days ago",
                        "author": {
                            "name": "Cyan Spirit",
                            "id": "kaid_1418532449612597727143882",
                            "avatar": "/images/avatars/svg/cacteye-blue.svg"
                        },
                        "text": "You're welcome! :P<br>I've beaten the top two already in that last level. The bottom two seem like they might be possible, just very extremely hard."
                    },
                    {
                        "date": "2 days ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "the only one that I knew you could beat was the top right one lol(when they are all four at once)"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "a day ago",
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
                "replyCount": 6,
                "votes": 1,
                "date": "4 hours ago",
                "author": {
                    "name": "VVhiteTiger",
                    "id": "kaid_154605635905555420140323",
                    "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                },
                "text": "When you realize that people only vote because of who released it.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "3 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "heeyyyy what are you talking about...<br>but yes I have to agree it's over voted..."
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Jackson H",
                            "id": "kaid_5938807447267118718814449",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "This is rightfully voted. <br><br><br>But yes I always vote HACK'S stuff."
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "That's debatable.<br><br>but also why does this have anything to do with HACK's stuff...."
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Jackson H",
                            "id": "kaid_5938807447267118718814449",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Because she said that people only vote because of who released it. that's why I said I vote HACK'S stuff. Because when he  release's stuff I vote it, cause I like it."
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "VVhiteTiger isn't a she :P<br>But there are some people who vote just because they like me, which is not what I want."
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Jackson H",
                            "id": "kaid_5938807447267118718814449",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I am really really sorry, I did't know it was a he. I would never vote   for someone just because I like them, that's not me. I vote for HACK'S stuff because I really like it. I just released my first big project so I hope people don't vote because they just like me.<br><br>Thank you for the advice:)"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "a day ago",
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
                "replyCount": 5,
                "votes": 1,
                "date": "11 hours ago",
                "author": {
                    "name": "JSCoder",
                    "id": "kaid_3032679493880386290676439",
                    "avatar": "/images/avatars/svg/leaf-orange.svg"
                },
                "text": "this name seems suspicious =p",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "11 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Hey, wydm? it is just five levels :P"
                    },
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "JSCoder",
                            "id": "kaid_3032679493880386290676439",
                            "avatar": "/images/avatars/svg/leaf-orange.svg"
                        },
                        "text": "yeah, but that is suspicious in and of itself =]"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "lol but just how?<br>you know what, I think your just the suspicious one :P"
                    },
                    {
                        "date": "an hour ago",
                        "author": {
                            "name": "JSCoder",
                            "id": "kaid_3032679493880386290676439",
                            "avatar": "/images/avatars/svg/leaf-orange.svg"
                        },
                        "text": "Doing only 5 discriminated against 6.<br><br>Not me =p. I would never be suspicious =]"
                    },
                    {
                        "date": "21 minutes ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "yeah but 6 was too scared because 7 8 9.<br><br>by saying that it proves that you are :P"
                    }
                ]
            },
            {
                "replyCount": 3,
                "votes": 1,
                "date": "2 days ago",
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
                        "date": "2 days ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "try to air jump.<br><br>it really gets cool at the last level :P"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "a day ago",
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
                "replyCount": 3,
                "votes": 1,
                "date": "2 hours ago",
                "author": {
                    "name": "Samurai Warrior™ ✝ (Offline)",
                    "id": "kaid_333534297788735128142174",
                    "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                },
                "text": "Nice!<br><br>I'm still working on that game you forced me to make lol<br><br>Me on level 3:<br><b>wait it's impossible</b>...<br><b>oh you can air-jump</b>...<br>lol <br>80th<br><br>EDIT:<br>Is level 5 possible? :O",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thanks =D<br><br>lol and I'm still waiting :P<br>(you should join The Code Wars)<br><br>lol yeah it's a tough one.<br>80th O.o<br>that's too many man lol<br><br>NOT AN EDIT BUT I WANT TO DO ALL CAPS SO WHY NOT:<br>Yes it is. Get the two players on the right lined up then try."
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Samurai Warrior™ ✝ (Offline)",
                            "id": "kaid_333534297788735128142174",
                            "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                        },
                        "text": ":)<br><br>It'll be a few days yet.<br>well I probably won't because<br>1) procrastination<br>2) I'm a little busy irl<br>3) okay I probably should...<br>that last one isn't a good reason...<br>I'll look into it :)<br><br>naw you deserve it<br><br>OKAY I GUESS WE'RE DOING THIS... WHY NOT?<br>okay, I'll have to try that :P"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "oooh yay.<br>1) it will help you not procrastinate.<br>2) aren't we all<br>3) Hey that's a good point<br>I need you on this team :P<br><br>uhhhhh yeahhhh<br><br>IDK IT\"S COOOL IG...<br>gl"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "10 hours ago",
                "author": {
                    "name": "CHOViolin",
                    "id": "kaid_355666959582199141483622",
                    "avatar": "/images/avatars/svg/eggleston-blue.svg"
                },
                "text": "I won with 6 deaths.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 13,
                "votes": 1,
                "date": "2 hours ago",
                "author": {
                    "name": "Radar",
                    "id": "kaid_3902988618718040904060736",
                    "avatar": "/images/avatars/svg/leafers-seed.svg"
                },
                "text": "Duke i think everyone just loves you lol",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "hey, you know what? I'm fine with that lol<br>but yeah I was hoping for like 30-50 votes lol.<br>not it being my most voted project :P<br><br>But seriously, I am gonna try to make my next program much better."
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "yeah,lol<br>Yes that's around what it normally would get lol<br>It probably will get there lol<br><br>You joined Echolite? Well please pump out quality programs or me as a judge will be >:( lol jk"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "and I literally just made it in one day -_-<br>and your programs are just so much better and funnier and are getting less votes.<br><br>yeah if it gets there... <b>face palm</b><br><br>lol I'm scared now...<br>hey if I do make a good one how about giving it 20 points? ;P"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "well, this game is fun lol<br>my game isn't as fun even though the graphics are better lol<br><br>it will lol<br><br><b>evil laugh</b><br>uhh i don't even know the grading critieria and what the highest score possible is lol"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "bro super slime smash is my favorite ka game. O.O<br><br>nooooo lol<br><br><b>yikes</b><br>yeah the max is ten hehe"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "no there are a lot better games like dat's Bee Swarm Simulator<br><br>oh then if you make a good one you get 9.67 are you ok with that?"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I still like yours the best.<br><br>lol wow that's a high score."
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "thanks :)<br><br>but good = perfect"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "hey you deserve it. I have spent too much time playing that game lol<br><br>bad = 1<br>ok =  3 <br>decent = 5<br>good = 8<br>perfect = 10<br><br>there is a chance to get a ten but most likely not.<br>even 9.67 is really high. the highest I got was a 6.5"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "super duper bad = 1<br>super bad = 2<br>bad = 3<br>not bad = 4<br>ok = 5<br>decent = 6<br>mildly good = 7<br>good = 8<br>great = 9<br>perfect = 10<br><br>the highest score you've <em>ever</em> got is 6.5!?!?! how!?!"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "super duper bad = 0.2<br>super bad = 0.5<br>bad = 2<br>not bad = ok<br>ok = 4<br>decent = mildly good<br>mildly good =  6<br>good = 8<br>perfect = 10l<br><br>I was really bad in all the comps till this last primavera and the judges are strict lol<br>(I got 6.5 on gray world and 3-4 on FFC lol)<br><br>It just depends on some judges. I myself am a really strict judge."
                    },
                    {
                        "date": "an hour ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "It seems like all judges are strict judges lol. It looks like by peer pressure, i shall have to fit into that category lol."
                    },
                    {
                        "date": "35 minutes ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "lol yeaaahhh.<br>But yeah I just think of like the best game. and then judge down from there"
                    }
                ]
            },
            {
                "replyCount": 2,
                "votes": 1,
                "date": "2 days ago",
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
                        "date": "2 days ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "haha thank you!<br>yeah the graphics was definitely the lacking part. yeah I'm too lazy to change them idk why but it takes me wayyy to long lol<br><br>oooh that would be a great idea... I may add that tomorrow haha!<br><br>I already have a idea that I think will make your head spin :P<br>thanks again!"
                    },
                    {
                        "date": "a day ago",
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
                "date": "a day ago",
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
                "replyCount": 9,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "Green falcon",
                    "id": "kaid_455614962916004540799706",
                    "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                },
                "text": "awesome game!<br>vote++",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Oh thanks Green falcon! ;P"
                    },
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "Green falcon",
                            "id": "kaid_455614962916004540799706",
                            "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                        },
                        "text": "ur welcome the duke ;p"
                    },
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "You should make a game :P"
                    },
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "Green falcon",
                            "id": "kaid_455614962916004540799706",
                            "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                        },
                        "text": "yess I'm about to finish the intro to js and intro to Advanced JS: Games & Visualizations"
                    },
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "yay!<br>I made a small tutorial for someone else, I can show it to you too if you want me too.(a platformer tutorial)"
                    },
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Green falcon",
                            "id": "kaid_455614962916004540799706",
                            "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                        },
                        "text": "I would love to see it :)"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Well I just found out that the first part was deleted -_-<br>so you should probably just follow Liam K's.<br><br>sorry about that :/"
                    },
                    {
                        "date": "5 hours ago",
                        "author": {
                            "name": "Green falcon",
                            "id": "kaid_455614962916004540799706",
                            "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                        },
                        "text": "oh no :d<br><br>the thumbnail is legendary =0<br><br>its ok :)"
                    },
                    {
                        "date": "5 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "lol yes the thumbnail"
                    }
                ]
            },
            {
                "replyCount": 11,
                "votes": 1,
                "date": "2 days ago",
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
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thank you!<br>haha yeah that level I made for people who like to rage quit lol<br><br>I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "3DA Games",
                            "id": "kaid_46113533788750322324717",
                            "avatar": "/images/avatars/svg/boggle-blue.svg"
                        },
                        "text": "It does'nt lag at all and looks good! Maybe make those blocks black and not gray"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "3DA Games",
                            "id": "kaid_46113533788750322324717",
                            "avatar": "/images/avatars/svg/boggle-blue.svg"
                        },
                        "text": "I did never mind cuz i made it over."
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Great! I might add another thing and ask you if it lags.<br><br>yeah I saw that I was just agreeing that it is hard."
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "3DA Games",
                            "id": "kaid_46113533788750322324717",
                            "avatar": "/images/avatars/svg/boggle-blue.svg"
                        },
                        "text": "Its not hard, I was just doing the laws of physics then remembering this is a platformer lol. It wasnt hard after thinking that."
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "lol maybe your just better then me cause I only make it a fourth of the times lol"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "3DA Games",
                            "id": "kaid_46113533788750322324717",
                            "avatar": "/images/avatars/svg/boggle-blue.svg"
                        },
                        "text": "I do have one request, a double jump powerup. I accidentally got one and that it was cool. Reccomended ;)"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "3DA Games",
                            "id": "kaid_46113533788750322324717",
                            "avatar": "/images/avatars/svg/boggle-blue.svg"
                        },
                        "text": "I dont know if im better than you. I do Geometry Dash but still."
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Not in this game sir but in my future games I will :P<br>(A Gray World game that I made has one)"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "oh didn't see your second comment woops.<br>yeah idk."
                    },
                    {
                        "date": "a day ago",
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
                "date": "a day ago",
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
                "date": "8 hours ago",
                "author": {
                    "name": "Harmony",
                    "id": "kaid_5029554478572114895720391",
                    "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                },
                "text": "contorls are cool too, but what about the controls? XD",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "4 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "lol thanks for the catch"
                    }
                ]
            },
            {
                "replyCount": 5,
                "votes": 1,
                "date": "14 hours ago",
                "author": {
                    "name": "BΣYӨПD",
                    "id": "kaid_5370656553883782878121797",
                    "avatar": "/images/avatars/svg/leaf-blue.svg"
                },
                "text": "Very creative structure, and I love the translation between the levels as opposed to just erasing it and drawing a new one.<br><br>Keep in mind that the program crashes when you scroll to the T&T, which is annoying because I was on the last level but now I have to restart. UI is an important part of projects too 😔",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "11 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thank you, DR! Then your be disappointed to hear that I am actually drawing a new level every single time lol<br>I only had one day to make this and tried the other way but ran into a couple glitches...<br><br>Yeah I don't know how to fix this... how would you do it?"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "BΣYӨПD",
                            "id": "kaid_5370656553883782878121797",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "<pre><code>(function() {return this;})().LoopProtector.prototype.leave = function() {};</code></pre><br>is my favorite way to get the job done. I put it in the program, scrolled down to write this, and scrolled back up - no crashing."
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Alright I'll add that.<br>Whom should I give credit to?(you correct?)"
                    },
                    {
                        "date": "4 hours ago",
                        "author": {
                            "name": "BΣYӨПD",
                            "id": "kaid_5370656553883782878121797",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "It's from @dkareh on KA, so you could credit it to him."
                    },
                    {
                        "date": "3 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thank you sir!"
                    }
                ]
            },
            {
                "replyCount": 4,
                "votes": 1,
                "date": "3 hours ago",
                "author": {
                    "name": "Jackson H",
                    "id": "kaid_5938807447267118718814449",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "Nice game! :)<br><br>It was really fun. Thanks Duke.  :)<br><br>I had 0 deaths!<br><br>You have my vote+++++",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thank you!<br><br>Next game I'll make sure to make better =D<br><br>nice job!"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Jackson H",
                            "id": "kaid_5938807447267118718814449",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "This is one of the best game's I have played in a long time.<br><br>Keep up the good work! :)"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Have you seen Radars game?<br><br>I'll try!"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Jackson H",
                            "id": "kaid_5938807447267118718814449",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Yes I have. It's really fun, me and my brother play this one and that one and khanbattel none stop."
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "a day ago",
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
                        "date": "a day ago",
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
                "replyCount": 0,
                "votes": 1,
                "date": "3 hours ago",
                "author": {
                    "name": "WinstonWinner000 (Parlor Indie)♞⚂♠",
                    "id": "kaid_693763055742960827086832",
                    "avatar": "/images/avatars/svg/cs-winston.svg"
                },
                "text": "Nice game! :)<br><br>Though I would recommend making more original graphics.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 6,
                "votes": 1,
                "date": "2 days ago",
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
                        "date": "2 days ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thank you, yes I made it hard on purpose ;P<br><br>haha. Tip, win by the top right level. Get the right sides guys lined up. And remember to air jump ;P"
                    },
                    {
                        "date": "2 days ago",
                        "author": {
                            "name": "𝕜𝕚𝕒𝕒𝕟𝕥𝕠𝕝𝕚𝕒",
                            "id": "kaid_706406430552760652245376",
                            "avatar": "/images/avatars/svg/cacteye-yellow.svg"
                        },
                        "text": "I won, nice tip."
                    },
                    {
                        "date": "2 days ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "yay =D"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I fixed the color scheme and added particles, how does it look and does it lag?"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "𝕜𝕚𝕒𝕒𝕟𝕥𝕠𝕝𝕚𝕒",
                            "id": "kaid_706406430552760652245376",
                            "avatar": "/images/avatars/svg/cacteye-yellow.svg"
                        },
                        "text": "I won by the top left level :P<br><br>It looks pretty good, I would mess around with colors. Also its pretty laggy with lava 😢"
                    },
                    {
                        "date": "a day ago",
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
                "replyCount": 2,
                "votes": 1,
                "date": "9 hours ago",
                "author": {
                    "name": "ASBackup",
                    "id": "kaid_714780036830891967670231",
                    "avatar": "/images/avatars/svg/aqualine-tree.svg"
                },
                "text": "can't remember if i commented, but I saved my vote to make this officially ur 2nd highest :P",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "ASBackup",
                            "id": "kaid_714780036830891967670231",
                            "avatar": "/images/avatars/svg/aqualine-tree.svg"
                        },
                        "text": "this is awesome :D<br>i beat it >:)"
                    },
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "lol of course you did :P<br><br>thank you!"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "5 hours ago",
                "author": {
                    "name": "Zpikemaster24",
                    "id": "kaid_753888317123473340091614",
                    "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                },
                "text": "Here's my version so far, https://www.khanacademy.org/computer-programming/basic-platformer-credit-to-duke-for-letting-me-use-his-platformer-engine/6374504046444544",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "a day ago",
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
                "date": "a day ago",
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
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Thank you!"
                    }
                ]
            }
        ],
        "questions": [
            {
                "replyCount": 0,
                "votes": 0,
                "date": "a day ago",
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
                        "votes": 3,
                        "date": "a day ago",
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
                    "name": "Zpikemaster24",
                    "id": "kaid_753888317123473340091614",
                    "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                },
                "text": "Can I spin-off this to make my platformer game?",
                "replies": [],
                "answers": [
                    {
                        "replyCount": 1,
                        "votes": 1,
                        "date": "11 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Yes you may, though I would recommend trying to make it different and adding graphics.",
                        "replies": [
                            {
                                "date": "9 hours ago",
                                "author": {
                                    "name": "Zpikemaster24",
                                    "id": "kaid_753888317123473340091614",
                                    "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                                },
                                "text": "I will try to make it different. thx!"
                            }
                        ]
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 0,
                "date": "a day ago",
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
                        "votes": 2,
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "try to jump after you fall off the block. it's hard but possible.",
                        "replies": [
                            {
                                "date": "a day ago",
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
            }
        ]
    }
}