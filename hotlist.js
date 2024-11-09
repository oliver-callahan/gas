var json = {
    "code": "/**\n * \n Stitch Girl💠 requested that I make this, so here it is!\n \n This is also my homework for Spark Tutoring. \n https://www.khanacademy.org/computer-programming/spark-tutoring-new/5223254299426816\n \n Top of the HL!!!!!!!!!!!!!!\n \n**/\n\n//background\nvar color1 = color(156, 176, 255);\nvar color2 = color(255, 255, 255);\n\nfor (var i = 0; i < height; i++) {\n    noStroke(); \n    fill(lerpColor(color2, color1, i / height)); \n    rect(0, i, width, -33); \n}\n\ntranslate(-147, -18);\nscale(1.6);\n\n//body outline, left side\nstrokeWeight(1.5);\nstroke(0, 0, 0);\nfill(73, 123, 180);\nbeginShape();\nvertex(194, 148);\nvertex(182, 191);\n\n//left leg outline\nbezierVertex(174, 187, 159, 191, 160, 194);\nbezierVertex(158, 206, 147, 199, 159, 210);\nbezierVertex(180, 215, 184, 211, 197, 208);\nvertex(232, 208);\n\n//right leg outline\nbezierVertex(250, 212, 264, 213, 266, 209);\nbezierVertex(270, 211, 284, 201, 273, 194);\nbezierVertex(267, 189, 258, 188, 249, 191);\n\n//body outline, right side\nvertex(239, 145);\nendShape();\n\n//left foot\nellipse(164, 202, 21, 21);\n\n//right foot\nellipse(266, 201, 21, 21);\n\n//left toes\nfill(0, 0, 0);\nellipse(171, 194, 3, 3);\nellipse(163, 191, 3, 3);\nellipse(156, 195, 3, 3);\nellipse(154, 202, 3, 3);\n\n//right toes\nellipse(257, 195, 3, 3);\nellipse(264, 191, 3, 3);\nellipse(272, 193, 3, 3);\nellipse(276, 199, 3, 3);\n\n//chest\nfill(82, 214, 255);\nbeginShape();\ncurveVertex(184,  291);\ncurveVertex(232,  147);\ncurveVertex(236,  198);\ncurveVertex(200,  200);\ncurveVertex(197, 148);\ncurveVertex(217, 200);\nendShape();\n\n//chest floof\nbeginShape();\nvertex(215, 155);\nbezierVertex(212, 154, 210, 161, 216, 159);\nbezierVertex(210, 161, 210, 166, 217, 164);\nbezierVertex(214, 168, 217, 176, 221, 168);\nendShape();\n\n//left foot pad\nnoStroke();\nfill(0, 66, 132);\nellipse(163, 201, 10, 10);\n\n//right foot pad\nnoStroke();\nfill(0, 66, 132);\nellipse(266, 201, 10, 10);\n\n//left ear\nstroke(0, 0, 0);\nfill(173, 132, 173);\nbeginShape();\nvertex(175, 113);\nbezierVertex(170, 109, 153, 91, 167, 54);\nbezierVertex(150, 47, 143, 81, 144, 80);\nvertex(149, 86);\nvertex(145, 89);\nbezierVertex(144, 86, 143, 125, 174, 134);\nendShape();\n\n//right ear\nbeginShape();\nvertex(259, 112);\nbezierVertex(284, 91, 274, 66, 275, 55);\nbezierVertex(291, 47, 301, 81, 287, 110);\nvertex(279, 112);\nvertex(284, 118);\nbezierVertex(283, 125, 267, 135, 261, 135);\nendShape();\n\n//head\nfill(73, 123, 180);\nbeginShape();\nvertex(203, 85);\nbezierVertex(173, 93, 162, 137, 180, 147);\nbezierVertex(210, 157, 247, 153, 259, 138);\nbezierVertex(264, 131, 268, 94, 228, 84);\nbezierVertex(218, 84, 220, 76, 220, 77);\nbezierVertex(214, 91, 217, 75, 211, 76);\nbezierVertex(211, 91, 212, 77, 204, 80);\nbezierVertex(207, 88, 206, 83, 203, 85);\nendShape();\n\n//left hand claws\nfill(0, 0, 0);\nbeginShape();\nvertex(196, 210);\nbezierVertex(190, 219, 212, 200, 198, 206);\nendShape();\nbeginShape();\nvertex(202, 210);\nbezierVertex(202, 222, 208, 200, 198, 206);\nendShape();\nbeginShape();\nvertex(205, 210);\nbezierVertex(217, 222, 200, 193, 198, 206);\nendShape();\n\n//right hand claws\nbeginShape();\nvertex(232, 207);\nbezierVertex(214, 219, 249, 203, 229, 206);\nendShape();\nbeginShape();\nvertex(233, 207);\nbezierVertex(233, 225, 242, 200, 229, 206);\nendShape();\nbeginShape();\nvertex(234, 207);\nbezierVertex(250, 222, 235, 198, 229, 206);\nendShape();\n\n//left arm\nfill(73, 123, 180);\nbeginShape();\nvertex(191, 164);\nbezierVertex(190, 151, 202, 149, 204, 159);\nbezierVertex(202, 151, 217, 213, 201, 210);\nbezierVertex(190, 212, 190, 181, 191, 164);\nendShape();\n\n//right arm\nbeginShape();\nvertex(229, 164);\nbezierVertex(228, 149, 242, 149, 241, 159);\nbezierVertex(245, 188, 242, 217, 231, 209);\nbezierVertex(223, 208, 228, 179, 229, 164);\nendShape();\n\n//left eye patch\nfill(82, 214, 255);\nbeginShape();\nvertex(190, 97);\nbezierVertex(171, 102, 164, 138, 186, 136);\nbezierVertex(206, 136, 193, 92, 188, 98);\nendShape();\n\n//right eye patch\nbeginShape();\nvertex(247, 98);\nbezierVertex(268, 111, 265, 142, 242, 134);\nbezierVertex(228, 126, 243, 94, 248, 99);\nendShape();\n\n//mouth\nbeginShape();\nvertex(183, 148);\nbezierVertex(209, 156, 246, 150, 250, 145);\nbezierVertex(248, 133, 241, 143, 226, 143);\nbezierVertex(204, 148, 179, 134, 181, 146);\nendShape();\n\n//left eye\nnoStroke();\nfill(0, 0, 0);\nbeginShape();\nvertex(178, 118);\nbezierVertex(177, 121, 174, 132, 188, 132);\nbezierVertex(200, 130, 193, 95, 180, 114);\nendShape();\n\n//right eye\nbeginShape();\nvertex(242, 110);\nbezierVertex(250, 95, 268, 135, 243, 130);\nbezierVertex(238, 128, 238, 115, 242, 110);\nendShape();\n\n//left eye shine\nfill(255, 255, 255);\nellipse(187, 118, 5, 5);\n\n//right eye shine\nellipse(248, 117, 5, 5);\n\n//nose\nstroke(0, 0, 0);\nfill(0, 66, 132);\nbeginShape();\nvertex(230, 126);\nbezierVertex(238, 109, 196, 118, 205, 118);\nbezierVertex(192, 116, 213, 160, 230, 126);\nendShape();\nline(216, 142, 216, 139);",
    "title": "Stitch",
    "votes": 38,
    "created": "a day ago",
    "updated": "5 minutes ago",
    "type": "PJS",
    "author": {
        "name": "Cookie",
        "id": "kaid_1826046083730180486895887",
        "avatar": "/images/avatars/svg/leafers-sapling.svg"
    },
    "dimensions": {
        "width": 400,
        "height": 400
    },
    "forks": [
        {
            "title": "Stich boy",
            "id": "6036822262988800",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "Shadow The Hedgehog",
                "id": "kaid_179480720235305693450224"
            }
        }
    ],
    "posts": {
        "tips": [
            {
                "replyCount": 7,
                "votes": 6,
                "date": "a day ago",
                "author": {
                    "name": "Cookie",
                    "id": "kaid_1826046083730180486895887",
                    "avatar": "/images/avatars/svg/leafers-sapling.svg"
                },
                "text": "Sub for a cookie:<br><br>https://www.khanacademy.org/computer-programming/cookies-subpage/6436205453819904",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Norwegian Pathways",
                            "id": "kaid_1082366231138740611717261",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "How will you send me a cookie? Via mail?"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Nope, It's a virtual cookie :)"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Norwegian Pathways",
                            "id": "kaid_1082366231138740611717261",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "One of these: 🍪"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Yup :)"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "i got ripped off =C<br><br>I subbed a long time ago and NO COOKIE!?!?"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Oh no! I'm so sorry!<br><br>Here, you get 12 cookies: 🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "SWEET!! thanks, all is forgiven XD"
                    }
                ]
            },
            {
                "replyCount": 6,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "Stitch Girl💠",
                    "id": "kaid_6490115305785159643926933",
                    "avatar": "/images/avatars/svg/marcimus-red.svg"
                },
                "text": "I LOVE IT!😍 Thank you so much!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Thank you! :D<br>No problem!"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Stitch Girl💠",
                            "id": "kaid_6490115305785159643926933",
                            "avatar": "/images/avatars/svg/marcimus-red.svg"
                        },
                        "text": "I just screenshotted it so I can show my mum"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Nice! :)"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Stitch Girl💠",
                            "id": "kaid_6490115305785159643926933",
                            "avatar": "/images/avatars/svg/marcimus-red.svg"
                        },
                        "text": "hru btw"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Good, How bout' you?"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Stitch Girl💠",
                            "id": "kaid_6490115305785159643926933",
                            "avatar": "/images/avatars/svg/marcimus-red.svg"
                        },
                        "text": "very very tired. other than that good"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "LJE",
                    "id": "kaid_1034761647362147362261181",
                    "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                },
                "text": "aww he's so cute!!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Thank you! :D"
                    }
                ]
            },
            {
                "replyCount": 6,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "Norwegian Pathways",
                    "id": "kaid_1082366231138740611717261",
                    "avatar": "/images/avatars/svg/leaf-blue.svg"
                },
                "text": "Nice.<br><br>He/she is so cute!<br><br>I forgot what gender stitch goes by.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Thank you :D<br><br>Idk, I haven't watched that movie in forever."
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Norwegian Pathways",
                            "id": "kaid_1082366231138740611717261",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Probably since I was like 7 (8 years ago)"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "For me I was probably 10 (5 years ago)"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Norwegian Pathways",
                            "id": "kaid_1082366231138740611717261",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "I forgot you were my age."
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Same here XD"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cataclysmic Code 🌩",
                            "id": "kaid_820167475461480890635740",
                            "avatar": "/images/avatars/svg/boggle-green.svg"
                        },
                        "text": "Stitch is a boy. I know mainly because there is a different, female stitch that is pink in some short film or something :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "18 hours ago",
                "author": {
                    "name": "LJ",
                    "id": "kaid_1144628223469068678737336",
                    "avatar": "/images/avatars/svg/leafers-sapling.svg"
                },
                "text": "This is just perfect.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "18 hours ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
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
                    "name": "★lavenstarr★",
                    "id": "kaid_194784400832238400103191",
                    "avatar": "/images/avatars/svg/blobby-green.svg"
                },
                "text": "luv it.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Thanks :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "16 hours ago",
                "author": {
                    "name": "Firebrand (offline)",
                    "id": "kaid_423049852746380987692804",
                    "avatar": "/images/avatars/svg/stelly-orange.svg"
                },
                "text": "OOOOOOOOOHHHH MY GOOOOOOOSHHH<br><br>I thought the budgie was too cute lol.<br>I was wrong XD<br><br>Vote++",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Glad you like it! XD<br>Thanks! :D"
                    }
                ]
            },
            {
                "replyCount": 4,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "Mathlete11",
                    "id": "kaid_4902531429433401500771997",
                    "avatar": "/images/avatars/svg/starky-sapling.svg"
                },
                "text": "if ur taking project requests, can u make a snake...?",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Okay, do you want it to be a cute snake, or a creepy snake?"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "something like orochimaru, from naruto<br><br>THANK YOU!!"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Okay, It might take a while because I'm a little busy right now, but I'll let you know!"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "thank you :D"
                    }
                ]
            },
            {
                "replyCount": 2,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "sugarnlight",
                    "id": "kaid_516497598968512440616556",
                    "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                },
                "text": "aaaa it's so cute!!<br>amazing job :)",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Thanks! :D"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "sugarnlight",
                            "id": "kaid_516497598968512440616556",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": "yw! :D"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "Coder2098",
                    "id": "kaid_673573024191290348573492",
                    "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                },
                "text": "aww nice job! its so cute!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Thank you! :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "ASBackup",
                    "id": "kaid_714780036830891967670231",
                    "avatar": "/images/avatars/svg/aqualine-tree.svg"
                },
                "text": "aww this is honestly so cute :>",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "21 hours ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Thank you! :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "an hour ago",
                "author": {
                    "name": "Sonic The Hedgehog",
                    "id": "kaid_851292644445276989632262",
                    "avatar": "/images/avatars/svg/leaf-blue.svg"
                },
                "text": "perfect as always!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "6 minutes ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Thank you :)<br>I'm glad you will be sticking around at least to finish your wips :)"
                    }
                ]
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
                "text": "Nice job. The eyes are perfect.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Cookie",
                            "id": "kaid_1826046083730180486895887",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Thank you! :D"
                    }
                ]
            }
        ],
        "questions": []
    }
}