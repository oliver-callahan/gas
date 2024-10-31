var json = {
    "code": "// KHANTOBER AAAAAAAAAAAAAAAAAAa\n\n// i was at an event and i was early (and a little bored) and luckily i had brought my drawing notebook and a pencil. so i started drawing. then i thought \"hey wait, this would make a great final khantober program!\" so here we are. (the event was on 10/23/24)\n\n// yay #1 on hotlist! my third 1000 kelvin :D (if they still existed)\n\n// also, should i start doing song recommendations for each graphic? the song recommendations for this are 'Nautilus Waltz' by Raw Lawson and '深海少女-初音ミク' by Yuuyu (yeah just because i'm a swiftie doesn't mean i don't listen to anything else)\n\nvar kuragekyatto = function(x, y, w, h, r, face) // translate it lol\n{\n\tpushMatrix();\n\ttranslate(x, y);\n\tscale(w, h);\n\trotate(r);\n\n\tbeginShape();\n\tvertex(105, -100);\n\tbezierVertex(175, 120, -122, 164, -110, 155);\n\tbezierVertex(-100, 155, 21, 90, -13, 63);\n\tbezierVertex(32, 85, -88, 139, -198, 138);\n\tbezierVertex(-111, 76, -82, 138, -53, 50);\n\tbezierVertex(-74, 105, -148, 112, -239, 114);\n\tbezierVertex(-94, 56, -108, 76, -63, 24);\n\tbezierVertex(-136, 94, -130, 76, -247, 52);\n\tbezierVertex(-79, 60, -124, 46, -78, 1);\n\tbezierVertex(-86, 34, -90, 46, -230, 49);\n\tbezierVertex(-114, -33, -116, 46, -75, -51);\n\tvertex(-27, -120);\n\tvertex(4, -147);\n\tvertex(9, -145);\n\tvertex(19, -120);\n\tbezierVertex(29, -125, 50, -93, 85, -137);\n\tvertex(105, -100);\n\tendShape();\n\n\tnoStroke();\n\tfill(211, 219, 224);\n\tbeginShape();\n\tvertex(-65, -61);\n\tvertex(-100, -2);\n\tvertex(-159, 11);\n\tvertex(-225, 45);\n\tvertex(-159, 22);\n\tvertex(-105, 13);\n\tvertex(-80, 0);\n\tvertex(-68, -18);\n\tvertex(-42, -43);\n\tvertex(-40, -95);\n\tendShape();\n\n\tbeginShape();\n\tvertex(-71, 20);\n\tvertex(-124, 56);\n\tvertex(-232, 58);\n\tvertex(-173, 61);\n\tvertex(-125, 65);\n\tvertex(-92, 47);\n\tendShape();\n\n\tbeginShape();\n\tvertex(-48, 24);\n\tvertex(-124, 78);\n\tvertex(-232, 116);\n\tvertex(-144, 93);\n\tvertex(-85, 67);\n\tendShape();\n\n\tbeginShape();\n\tvertex(-44, 52);\n\tvertex(-65, 92);\n\tvertex(-104, 109);\n\tvertex(-132, 107);\n\tvertex(-197, 137);\n\tvertex(-134, 119);\n\tvertex(-75, 107);\n\tvertex(-48, 79);\n\tendShape();\n\n\tbeginShape();\n\tvertex(8, 63);\n\tvertex(-6, 92);\n\tvertex(-42, 123);\n\tvertex(-95, 155);\n\tvertex(-30, 123);\n\tvertex(0, 102);\n\tendShape();\n\n\tstroke(255, 255, 255);\n\tnoFill();\n\tbezier(4, 74, -146, 123, -25, 155, -205, 166); // this is my first time using a bezier (not bezierVertex) without a tool :D\n\tbezier(-94, 25, -146, 96, -176, 60, -272, 78);\n\tbezier(-77, 93, -141, 105, -184, 71, -223, 150);\n\tbezier(21, 104, -25, 233, -175, 96, -186, 222);\n\tbezier(-113, 0, -147, -29, -175, 59, -227, 7);\n\n\n\tif (face === 'happy') {\n\t\tfill(0);\n\t\tnoStroke();\n\t\tellipse(0, -83, 10, 10);\n\t\tellipse(87, -81, 10, 10);\n\n\t\tstrokeWeight(0.6);\n\t\tstroke(0, 0, 0);\n\t\tnoFill();\n\t\tarc(43, -75, 15, 5, 0, 180);\n\n\t\tnoStroke();\n\t\tfill(255, 229, 229, 200);\n\t\tellipse(-10, -75, 25, 10);\n\t\tellipse(100, -73, 25, 10);\n\t}\n\tif (face === 'sleepy') {\n\n\t\tstrokeWeight(1);\n\t\tstroke(0, 0, 0);\n\t\tnoFill();\n\t\tarc(0, -85, 15, 10, 0, 180);\n\t\tarc(89, -83, 15, 10, 0, 180);\n\t\tstrokeWeight(0.6);\n\t\tarc(43, -75, 15, 5, 0, 180);\n\n\t\tnoStroke();\n\t\tfill(255, 229, 229, 200);\n\t\tellipse(-10, -75, 25, 10);\n\t\tellipse(100, -73, 25, 10);\n\t}\n\tif (face === 'goofy') {\n\t\tfill(0);\n\t\tnoStroke();\n\t\tellipse(0, -83, 17, 10);\n\t\tellipse(87, -81, 13, 15);\n\n\n\t\tstroke(0, 0, 0);\n\t\tnoFill();\n\t\tarc(43, -75, 15, 24, 0, 180);\n\n\t\tnoStroke();\n\t\tfill(255, 229, 229, 200);\n\t\tellipse(-10, -75, 26, 17);\n\t\tellipse(100, -73, 26, 17);\n\t}\n\n\tstrokeWeight(5);\n\tstroke(255, 255, 255);\n\tfill(235, 238, 245);\n\tpopMatrix();\n\n};\nvar bubbles = function(x, y, w, h, r) // wHy DoES iT HAvE bUbBLeS? because it's part mammal, so it partially breathes air :)\n{\n\tpushMatrix();\n\ttranslate(x, y);\n\tscale(w, h);\n\trotate(r);\n\tellipse(99, -98, 15, 15);\n\tellipse(110, -127, 20, 20);\n\tellipse(129, -160, 25, 25);\n\tellipse(100, -195, 30, 30);\n\tpopMatrix();\n};\nnoStroke();\nbackground(53, 74, 94);\n\nfor (var j = 0; j < 50; j++) { // this is better than ANY gradient\n\tfor (var i = 0; i < 40; i++) {\n\t\tfill(0 + i * 1.5, 4 + i * 2, 41 + i * 2.5);\n\t\tellipse(-108 - i * -20, 684 + i * -8, random(1, 300), random(1, 300));\n\t\tellipse(-49 - i * -7, 420 + i * -16, random(1, 300), random(1, 300));\n\t\tellipse(-404 - i * -24, 525 + i * -5, random(1, 300), random(1, 300));\n\t\tellipse(-398 - i * -19, 680 + i * -16, random(1, 300), random(1, 300));\n\t}\n}\nstrokeJoin(ROUND);\nstrokeWeight(5);\nstroke(255, 255, 255);\nfill(235, 238, 245);\nkuragekyatto(371, 285, 0.1, 0.1, 7, 'happy');\nkuragekyatto(325, 159, 0.1, 0.1, 7, 'goofy');\nkuragekyatto(70, 225, 0.1, 0.1, 7, 'happy');\nkuragekyatto(91, 78, 0.2, 0.2, -5, 'sleepy');\nkuragekyatto(359, 30, 0.2, 0.2, -5, 'happy');\nkuragekyatto(291, 399, 0.2, 0.2, -5, 'sleepy');\nkuragekyatto(91, 504, 0.2, 0.2, -5, 'goofy');\nkuragekyatto(325, 508, 0.4, 0.4, 7, 'sleepy');\nkuragekyatto(208, 102, 0.4, 0.4, 7, 'happy');\nkuragekyatto(200, 285, 0.8, 0.8, -2, 'happy');\n\nbubbles(324, 152, 0.1, 0.1, 0);\nbubbles(72, 219, 0.1, 0.1, 0);\nbubbles(372, 279, 0.1, 0.1, 0);\nbubbles(348, 21, 0.2, 0.2, 0);\nbubbles(83, 58, 0.2, 0.2, 0);\nbubbles(87, 489, 0.2, 0.2, 0);\nbubbles(284, 386, 0.2, 0.2, 0);\nbubbles(196, 81, 0.4, 0.4, 0);\nbubbles(321, 490, 0.4, 0.4, 0);\nbubbles(191, 235, 0.8, 0.8, 0);\nenableContextMenu(); // 200 lines :D\n\nvar bobacat = function(x, y, w, h) {\n\tpushMatrix();\n\ttranslate(x, y);\n\n\n\tscale(w, h);\n\n\n\t{\n\t\tfill(235, 193, 129, 150); // tan\n\t\tnoStroke();\n\t\tellipse(165, 335, 200, 45);\n\t\tellipse(220, 365, 200, 45);\n\t\tstroke(235, 193, 129, 150);\n\t\tstrokeWeight(5);\n\t\tline(110, 130, 130, 310);\n\t} // spill\n\n\t{\n\t\tfill(235, 193, 129);\n\t\tstrokeWeight(1);\n\t\tstroke(0, 0, 0);\n\t\tquad(260, 350, 140, 350, 110, 125, 290, 125); // cup\n\t\tarc(200, 345, 120, 50, 0, 180); // bottom part of cup (for 3d)\n\t} // cup\n\n\t{\n\t\tnoStroke(); // no outlines\n\t\tfill(239, 205, 154); // lighter tan\n\t\trect(135, 137, 130, 76); // cat body\n\t\tquad(240, 285, 265, 210, 135, 205, 160, 285); // cat body\n\t} // cat body\n\n\t{\n\t\tfill(0);\n\t\tstroke(201, 161, 114);\n\t\tstrokeWeight(5);\n\t\tellipse(155, 290, 20, 20);\n\t\tellipse(240, 275, 20, 20);\n\t\tellipse(185, 295, 20, 20);\n\t\tellipse(185, 335, 20, 20);\n\t\tellipse(230, 325, 20, 20);\n\t\tellipse(255, 290, 20, 20);\n\t\tellipse(155, 265, 20, 20);\n\t\tellipse(260, 255, 20, 20);\n\t\tellipse(145, 245, 20, 20);\n\t\tellipse(260, 235, 20, 20);\n\t} // boba dont look\n\n\t{\n\t\tnoFill();\n\t\tstrokeWeight(15);\n\t\tstroke(239, 205, 154);\n\t\tarc(230, 295, 50, 105, 240, 425);\n\t\tstrokeWeight(1);\n\t\tstroke(148, 148, 148); // gray\n\t\tfill(239, 205, 154);\n\t\tarc(255, 185, 30, 100, 315, 525);\n\t\tarc(145, 185, 30, 100, -710, -490);\n\n\t\tellipse(175, 300, 30, 70); // left foot\n\t\tellipse(225, 300, 30, 70); // right foot\n\t\tnoStroke();\n\n\t\tellipse(200, 255, 100, 80); // cat body\n\t} // feet\n\n\t{\n\t\tfill(255, 255, 255); // white\n\t\tarc(200, 125, 185, 170, -180, 0); // main part of cat\n\t\ttriangle(145, 0, 170, 45, 125, 75); // left ear\n\t\ttriangle(255, 0, 230, 45, 275, 75); // right ear\n\t\ttriangle(120, 80, 85, 95, 110, 120); // left fluff bottom\n\t\ttriangle(125, 75, 90, 80, 110, 105); // left fluff top\n\t\ttriangle(280, 80, 315, 95, 290, 120); // right fluff bottom\n\t\ttriangle(275, 75, 315, 80, 285, 105); // right fluff top\n\t\tnoStroke(); // no outlines\n\t\tellipse(200, 125, 185, 50); // uh\n\t\tellipse(155, 65, 50, 40); // uh\n\t\tellipse(243, 65, 50, 40); // uh\n\t\tellipse(115, 100, 30, 30); // uh\n\t\tellipse(285, 100, 30, 30); // uh\n\t} // cat's head\n\n\t{\n\t\tfill(0);\n\t\tstroke(201, 161, 114);\n\t\tstrokeWeight(5);\n\t\tellipse(200, 355, 20, 20);\n\t\tellipse(180, 350, 20, 20);\n\t\tellipse(240, 310, 20, 20);\n\t\tellipse(225, 290, 20, 20);\n\t\tellipse(160, 340, 20, 20);\n\t\tellipse(205, 320, 20, 20);\n\t\tellipse(240, 350, 20, 20);\n\t\tellipse(150, 310, 20, 20);\n\t\tellipse(175, 300, 20, 20);\n\t\tellipse(170, 320, 20, 20);\n\t\tellipse(220, 335, 20, 20);\n\t\tellipse(160, 250, 20, 20);\n\t\tellipse(225, 260, 20, 20);\n\t\tellipse(170, 270, 20, 20);\n\t\tellipse(145, 275, 20, 20);\n\t\tellipse(150, 330, 20, 20);\n\t\tellipse(250, 325, 20, 20);\n\t} // boba don't look\n\n\t{\n\t\tnoStroke(); // no outlines\n\t\tellipse(145, 110, 30, 30); // left eye\n\t\tellipse(255, 110, 30, 30); // right eye\n\t\tfill(255, 212, 212); // pink\n\t\tellipse(145, 135, 30, 15); // left blush\n\t\tellipse(255, 135, 30, 15); // right blush\n\t\tfill(255, 255, 255); // white\n\t\tstroke(0, 0, 0); // black\n\t\tstrokeWeight(1); // thinner stroke\n\t\tarc(195, 115, 10, 10, 0, 180); // left mouth arc\n\t\tarc(205, 115, 10, 10, 0, 180); // right mouth arc\n\t\tnoFill(); // no fill \n\t\tarc(200, 126, 180, 50, 0, 180); // cup rim outline\n\t} // face\n\n\tfill(255, 255, 255);\n\ttextSize(100);\n\ttext(\"katite\", 80, 460);\n\tpopMatrix();\n}; // this is the logo so it's not included in the line count :)\nbobacat(330, 530, 0.15, 0.15);",
    "title": "kuragekyatto (khantober)",
    "votes": 29,
    "created": "5 hours ago",
    "updated": "an hour ago",
    "type": "PJS",
    "author": {
        "name": "- k a t i t e -",
        "id": "kaid_312040000225853665820004",
        "avatar": "/images/avatars/svg/duskpin-sapling.svg"
    },
    "dimensions": {
        "width": 400,
        "height": 600
    },
    "forks": [],
    "posts": {
        "tips": [
            {
                "replyCount": 0,
                "votes": 11,
                "date": "5 hours ago",
                "author": {
                    "name": "- k a t i t e -",
                    "id": "kaid_312040000225853665820004",
                    "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                },
                "text": "subscribe for more graphics :D<br><br>https://www.khanacademy.org/computer-programming/katites-sub-page/6033337831440384<br><br>please keep this comment from sinking <3",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 3,
                "votes": 4,
                "date": "4 hours ago",
                "author": {
                    "name": "cactuses.always.win.",
                    "id": "kaid_488290387935041457443716",
                    "avatar": "/images/avatars/svg/cacteye-green.svg"
                },
                "text": "this is so wispy and whispery",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "4 hours ago",
                        "author": {
                            "name": "- k a t i t e -",
                            "id": "kaid_312040000225853665820004",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "thank you"
                    },
                    {
                        "date": "37 minutes ago",
                        "author": {
                            "name": "Kumpenump",
                            "id": "kaid_1065086901382358401624396",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "well you're so whispy and wispery"
                    },
                    {
                        "date": "36 minutes ago",
                        "author": {
                            "name": "cactuses.always.win.",
                            "id": "kaid_488290387935041457443716",
                            "avatar": "/images/avatars/svg/cacteye-green.svg"
                        },
                        "text": "projecting is real"
                    }
                ]
            },
            {
                "replyCount": 7,
                "votes": 3,
                "date": "5 hours ago",
                "author": {
                    "name": "Mathlete11",
                    "id": "kaid_4902531429433401500771997",
                    "avatar": "/images/avatars/svg/starky-sapling.svg"
                },
                "text": "noice :)  is it like a cat jellyfish? whatever it is, it's very cute ^-^<br><br>5th vote",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "4 hours ago",
                        "author": {
                            "name": "- k a t i t e -",
                            "id": "kaid_312040000225853665820004",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "thanks :D <br>yeah, 'kurage' means jellyfish and 'kyatto' is a way of saying cat"
                    },
                    {
                        "date": "an hour ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "its rly adorable :)  nice job"
                    },
                    {
                        "date": "an hour ago",
                        "author": {
                            "name": "- k a t i t e -",
                            "id": "kaid_312040000225853665820004",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "thank you again :D"
                    },
                    {
                        "date": "42 minutes ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "no problem :D<br><br>also, can you code a snake graphic next..."
                    },
                    {
                        "date": "40 minutes ago",
                        "author": {
                            "name": "- k a t i t e -",
                            "id": "kaid_312040000225853665820004",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "yes absolutely! i may have to make it themed as a certain taylor swift album though (for certain reasons)"
                    },
                    {
                        "date": "37 minutes ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "okie thanks :DD"
                    },
                    {
                        "date": "36 minutes ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "I'm not gonna inquire abt ur \"certain reasons\" tho"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 2,
                "date": "5 hours ago",
                "author": {
                    "name": "Luke Ellis",
                    "id": "kaid_8535468719137003545030723",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "This is disturbingly cute.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "5 hours ago",
                        "author": {
                            "name": "- k a t i t e -",
                            "id": "kaid_312040000225853665820004",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "lol thanks..?"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "5 hours ago",
                "author": {
                    "name": "Raven",
                    "id": "kaid_1094399428577851630415346",
                    "avatar": "/images/avatars/svg/cs-winston.svg"
                },
                "text": "a fellow hatsune miku lover wow<br>also kool graphic<br>happy halloween :3",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "4 hours ago",
                        "author": {
                            "name": "- k a t i t e -",
                            "id": "kaid_312040000225853665820004",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "yes lol<br>thanks :D<br>you too :3"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "3 hours ago",
                "author": {
                    "name": "windawine",
                    "id": "kaid_316582545582561029284805",
                    "avatar": "/images/avatars/svg/scuttlebug-green.svg"
                },
                "text": "one of those things I never knew I needed",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "3 hours ago",
                        "author": {
                            "name": "- k a t i t e -",
                            "id": "kaid_312040000225853665820004",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "lol thanks"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "an hour ago",
                "author": {
                    "name": "Samurai Warrior™ ✝ (Offline)",
                    "id": "kaid_333534297788735128142174",
                    "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                },
                "text": "Wow, cool! :D<br>and a little creepy...<br>You're programs are really getting better and better fast o.O",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "an hour ago",
                        "author": {
                            "name": "- k a t i t e -",
                            "id": "kaid_312040000225853665820004",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "thank you so much :D"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "an hour ago",
                "author": {
                    "name": "Dat",
                    "id": "kaid_4164356982737975081215128",
                    "avatar": "/images/avatars/svg/marcimus-orange.svg"
                },
                "text": "watashi no neko wa kawai sugiru 🗣️🗣️",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "an hour ago",
                        "author": {
                            "name": "- k a t i t e -",
                            "id": "kaid_312040000225853665820004",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "'My cat is too cute'?<br>lol thanks"
                    }
                ]
            },
            {
                "replyCount": 2,
                "votes": 1,
                "date": "2 hours ago",
                "author": {
                    "name": "sugarnlight",
                    "id": "kaid_516497598968512440616556",
                    "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                },
                "text": "wow cute! I love the shading and the stuff you did for the background!!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "an hour ago",
                        "author": {
                            "name": "- k a t i t e -",
                            "id": "kaid_312040000225853665820004",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "thank you :D"
                    },
                    {
                        "date": "an hour ago",
                        "author": {
                            "name": "sugarnlight",
                            "id": "kaid_516497598968512440616556",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": "np :D"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "5 hours ago",
                "author": {
                    "name": "Coder2098",
                    "id": "kaid_673573024191290348573492",
                    "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                },
                "text": "FIRST awww i love it :P the kitties are sooo cute!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "5 hours ago",
                        "author": {
                            "name": "- k a t i t e -",
                            "id": "kaid_312040000225853665820004",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "thank you so much :D"
                    }
                ]
            },
            {
                "replyCount": 2,
                "votes": 1,
                "date": "3 hours ago",
                "author": {
                    "name": "RedRaven9#makegamesthenmakegraphics",
                    "id": "kaid_768975196864016071606552",
                    "avatar": "/images/avatars/svg/starky-tree.svg"
                },
                "text": "This is great :D",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "3 hours ago",
                        "author": {
                            "name": "RedRaven9#makegamesthenmakegraphics",
                            "id": "kaid_768975196864016071606552",
                            "avatar": "/images/avatars/svg/starky-tree.svg"
                        },
                        "text": "Edit AMAZING! :D"
                    },
                    {
                        "date": "an hour ago",
                        "author": {
                            "name": "- k a t i t e -",
                            "id": "kaid_312040000225853665820004",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "thank you so much :D"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "5 hours ago",
                "author": {
                    "name": "Shifter -OFF-",
                    "id": "kaid_892112752920553577482062",
                    "avatar": "/images/avatars/svg/blobby-purple.svg"
                },
                "text": "Aww, These are so cute!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "4 hours ago",
                        "author": {
                            "name": "- k a t i t e -",
                            "id": "kaid_312040000225853665820004",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "thank you :D"
                    }
                ]
            }
        ],
        "questions": []
    }
}