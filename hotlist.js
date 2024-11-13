var json = {
    "code": "/*\n  i collabed with wealR. he did the graphics.\n  idk why i did this. blame wealR lol\n  \n  how to PLAY\n    - use WASD or ARROW keys to move\n    - avoid the evil venomous BREADS\n    - stay alive as long you can\n\n  spin-off proof for higher than 8000 lol\n  \n  sub to\n    - wealR https://www.khanacademy.org/computer-programming/lame-idk-fr/5681493063155712\n    - Radar https://www.khanacademy.org/computer-programming/subpage-30/6277838601895936\n    \n  wealR's comment {\n    lame is the title i did the graphics if you didn't know yah\n  }\n*/\n\n// Initialize\nnoStroke();\ntextAlign(CENTER, BASELINE);\n\n// Global Variables lol\nvar scene = 'menu';\nvar score = 0;\nvar highScore = 0 | highScore;\nvar speed = 40;\nvar leaders = [[\"wealR\", 5768], [\"Radar\", 4890], [\"Firebrand\", 7251], [\"EZezmath9\", 3997], [\"vipervenom\", 1336], [\"CassiaSight\", 2886], [\"That One Guy ME\", 2948], [\"HokeyCat\", 1861], [\"Spooderman Spooderman\", 2558], [\"Brennus\", 5045], [\"Pineapples\", 2034], [\"~The Wolf~\", 9030], [\"HACK\", 2507], [\"//I'M BOB ;).\", 7820], [\"AmethystSky\", 1127], [\"🐢🥓 TurtleBacon\", 2975], [\"YoshiDude\", 2649], [\"cg048\", 6521]];\nleaders.sort(function(a, b) {\n    return b[1] - a[1];\n});\n\n// Font\nvar mainFont = createFont(\"Avenir\");\nvar mainBold = createFont(\"Avenir Bold\");\nvar titleFont = createFont(\"Marker Felt\");\n\n// Keys\nvar keys = [];\nkeyPressed = function () {\n    keys[keyCode] = true;\n};\nkeyReleased = function() {\n    keys[keyCode] = false;\n};\n\n// Misc Functions\nfunction pixelArt(map, size, colors, x, y){\n    for(var i = 0; i < map.length; i++) {\n        for(var j = 0; j < map[i].length; j++) {\n            var char = map[i][j];\n            if(char !== \" \") {\n                noStroke();\n                if (typeof colors[char] === \"string\") {\n                    fill(random(parseInt(colors[char].split(\"-\")[0], 10), parseInt(colors[char].split(\"-\")[1], 10)));\n                } else {\n                    fill(colors[char]);\n                }\n                rect(x + j * size, y + i * size, size, size);\n            }\n        }\n    }\n}\nfunction rectRect(x1, y1, w1, h1, x2, y2, w2, h2) {\n    return x1 + w1 > x2 && y1 + h1 > y2 && x1 < x2 + w2 && y1 < y2 + h2;\n}\n\n// Images\nvar images = {\n    bread: function() {\n        background(0, 0);\n        pixelArt([\"                                          0000000000\",\"                                         0665555555600\",\"                                       00655535353555600\",\"                               00000000888555533333359560\",\"                            000655337777888855559333355560\",\"                           06555355333777798885553333355560\",\"                          088655533553337797888555333355550\",\"                     000008888885533355333777888559935955560\",\"                   00777777778889855333553337788553353555560\",\"                 00954447777777788955333555333888555353556660\",\"                065555544447777778885539355553395559555556660\",\"               0655339555559477777888533333555335555555566660\",\"              06553333395555444777788553353555935555555666670\",\"             065555533339355554447778853535355555555556666770\",\"             088885555533333555544478885353559555555566669780\",\"          00077788898855533333555933985555555555555666967780\",\"        0077777777888885553393355555335595555559556696677880\",\"       0653337777777888859553333355555555555555566666677880\",\"      0655550333977779888555533353555555555555566666677880\",\"     0655535000333377778885555353555555555555566696677880\",\"    0655533300059333377788555553595559555555566666677880\",\"   0666555530003955333379885555555555555555666666677880\",\"  0666666555000033555333378855555555555559666666777880\",\"  066669666950003333553333859555555555566666666777880\",\" 066666539999005553535555555555555555566666667778880\",\" 06665333990900555535355555555559555566666677778800\",\"0666533222999000005555595555555555566666667778880\",\"066530222222200090055665555555555566666677788800\",\"0663300022222000000005669555555969696677788800\",\"06532002222002290000000669666666666667778880\",\"0633220222000229999000066666666666677788800\",\"06932202222002290993555666666666677788800\",\"063322002222222999935556666666667778800\",\"0633222002222222222335566666677778880\",\" 06332220000022992239556669797788800\",\" 064332222220022222335566777788800\",\"  064332922220322233555667788800\",\"   064333222223223335556778000\",\"    06643333333333345567000\",\"     0066643333333455600\",\"       000666666666000\",\"          000000000\"], 2, {\"0\": color(0, 0, 0), \"1\": color(109, 72, 44), \"2\": color(235, 186, 115), \"3\": color(209, 146, 76), \"4\": color(199, 130, 67), \"5\": color(173, 115, 53), \"6\": color(160, 99, 48), \"7\": color(144, 83, 60), \"8\": color(112, 65, 45), \"9\": color(255, 0, 0), \"a\": color(238, 206, 162), }, 0, 0);\n        return get(0, 0, 400, 500);\n    },\n    p1: function() {\n        background(0, 0);\n        pixelArt([\"                     5555555555555555\",\n        \"                   55666666666666666655\",\n        \"                555666669996666666666665\",\n        \"             555666699999966666666666665\",\n        \"        44444666666999999666666666666665\",\n        \"     4449999666666999999966666666666665755555\",\n        \"    4999999999999999999966666666696665aa566665\",\n        \"    496669999999999999996666666669964aaa5566665\",\n        \"    496666999999999999999666666666964aaaa7966665\",\n        \"   4999669999999999999999966666666994aaa77399665\",\n        \"   49999999999999999999999666666669993aa77366994\",\n        \"   459999999999999999999999666666699663773446994\",\n        \"   4599999999599999999999996666966966553344449964\",\n        \"  45599999999559599999999996666996955555943344663\",\n        \"  45559999959959559599599996666699999555944394663\",\n        \"  35559999555999959559545996666669999555994494443\",\n        \" 433559999595959999959945596666669999555999996488\",\n        \" 333559995599955599999955499666669999454499999444\",\n        \" 34355959555399559999955544999666999944444999993\",\n        \"43 345555533333555555555554999966999444444449993\",\n        \"34 34445443 33333444555555559996994944433344433\",\n        \"5  3444443  333333444444444499999949443  34443\",\n        \"5  345443   33333 333344444399999944443   3343\",\n        \"    35543   33333     3333339999944333     33\",\n        \"    3453    33333         334999443\",\n        \"    3443   333333         33499943\",\n        \"    3443   333333         33444443\",\n        \"    343     33333         3334443\",\n        \"    343      3333         3333443\",\n        \"    343      33333       33333443\",\n        \"     343      3333      3443 34443\",\n        \"     343       3333     3443 334993\",\n        \"     343       3333     3443  34993\"\n    ], 1.5, {\"0\": color(255, 255, 255), \"2\": color(255, 255, 255), \"3\": color(43, 40, 41), \"4\": color(60, 41, 54), \"5\": color(80, 49, 61), \"6\": color(142, 87, 79), \"7\": color(223, 159, 96), \"8\": color(121, 108, 144), \"9\": color(106, 64, 68), \"a\": color(238, 206, 162)}, 0, 0);\n        return get(0, 0, 400, 500);\n    },\n    p2: function() {\n        background(0, 0);\n        pixelArt([\"                     5555555555555555\",\"                   55666666666666666655\",\"                555666669996666666666665\",\"             555666699999966666666666665\",\"        44444666666999999666666666666665\",\"     4449999666666999999966666666666665755555\",\"    4999999999999999999966666666696665aa566665\",\"    496669999999999999996666666669964aaa5566665\",\"    496666999999999999999666666666964aaaa7966665\",\"   4999669999999999999999966666666994aaa77399665\",\"   49999999999999999999999666666669993aa77366994\",\"   459999999999999999999999666666699663773446994\",\"   4599999999599999999999996666966966553344449964\",\"  45599999999559599999999996666996955555943344663\",\"  45559999959959559599599996666699999555944394663\",\"  35559999555999959559545996666669999555994494443\",\" 433559999595959999959945596666669999555999996488\",\" 333559995599955599999955499666669999454499999444\",\" 34355959555399559999955544999666999944444999993\",\"43 345555533333555555555554999966999444444449993\",\"34 34445443 33333444555555559996994944433344433\",\"5  3444443  333333444444444499999949443  34443\",\"5  345443   33333 333344444399999944443   3343\",\"    35543   33333     3333339999944333     33\",\"    3453   33333           34999443333\",\"    3443  333333           34999433333\",\"    3443  33333            3444443333\",\"   3443    3333            33444333333\",\"   3443    3333             33443 33333\",\"   3443     333             33443  33333\",\"   343      3333            33443  33333\",\"   343      3333             34553  3333\",\"   343       333             34553\"], 1.5, {\"0\": color(255, 255, 255), \"2\": color(255, 255, 255), \"3\": color(43, 40, 41), \"4\": color(60, 41, 54), \"5\": color(80, 49, 61), \"6\": color(142, 87, 79), \"7\": color(223, 159, 96), \"8\": color(121, 108, 144), \"9\": color(106, 64, 68), \"a\": color(238, 206, 162), }, 0, 0);\n        return get(0, 0, 400, 500);\n    },\n    p3: function() {\n        background(0, 0);\n        pixelArt([\"                     5555555555555555\",\"                   55666666666666666655\",\"                555666669996666666666665\",\"             555666699999966666666666665\",\"        44444666666999999666666666666665\",\"     4449999666666999999966666666666665755555\",\"    4999999999999999999966666666696665aa566665\",\"    496669999999999999996666666669964aaa5566665\",\"    496666999999999999999666666666964aaaa7966665\",\"   4999669999999999999999966666666994aaa77399665\",\"   49999999999999999999999666666669993aa77366994\",\"   459999999999999999999999666666699663773446994\",\"   4599999999599999999999996666966966553344449964\",\"  45599999999559599999999996666996955555943344663\",\"  45559999959959559599599996666699999555944394663\",\"  35559999555999959559545996666669999555994494443\",\" 433559999595959999959945596666669999555999996488\",\" 333559995599955599999955499666669999454499999444\",\" 34355959555399559999955544999666999944444999993\",\"43 345555533333555555555554999966999444444449993\",\"34 34445443 33333444555555559996994944433344433\",\"5  3444443  333333444444444499999949443  34443\",\"5  345443   33333 333344444399999944443   3343\",\"   345543   33333     3333339999944333     33\",\"  344453   33333           34999443333\",\"  344443  333333           349994333333\",\"  344443 333333            3444443333333\",\" 344333  333333            344443  333333\",\" 3443     3333             344443   33333\",\" 3443     3333             344443    33333\",\" 3443     3333             34443      33333\",\"           333             34553       3333\",\"           333             34553\"], 1.5, {\"0\": color(255, 255, 255), \"2\": color(255, 255, 255), \"3\": color(43, 40, 41), \"4\": color(60, 41, 54), \"5\": color(80, 49, 61), \"6\": color(142, 87, 79), \"7\": color(223, 159, 96), \"8\": color(121, 108, 144), \"9\": color(106, 64, 68), \"a\": color(238, 206, 162), }, 0, 0);\n        return get(0, 0, 400, 500);\n    },\n    p4: function() {\n        background(0, 0);\n        pixelArt([\"                     5555555555555555\",\"                   55666666666666666655\",\"                555666669996666666666665\",\"             555666699999966666666666665\",\"        44444666666999999666666666666665\",\"     4449999666666999999966666666666665755555\",\"    4999999999999999999966666666696665aa566665\",\"    496669999999999999996666666669964aaa5566665\",\"    496666999999999999999666666666964aaaa7966665\",\"   4999669999999999999999966666666994aaa77399665\",\"   49999999999999999999999666666669993aa77366994\",\"   459999999999999999999999666666699663773446994\",\"   4599999999599999999999996666966966553344449964\",\"  45599999999559599999999996666996955555943344663\",\"  45559999959959559599599996666699999555944394663\",\"  35559999555999959559545996666669999555994494443\",\" 433559999595959999959945596666669999555999996488\",\" 333559995599955599999955499666669999454499999444\",\" 34355959555399559999955544999666999944444999993\",\"43 345555533333555555555554999966999444444449993\",\"34 34445443 33333444555555559996994944433344433\",\"5  3444443  333333444444444499999949443  34443\",\"5  345443   3333  333344444399999944443   3343\",\"   345543   3333      3333339999944333     33\",\"    34543  3333            34999443333\",\"    34443 33333            349994333333\",\"    3444333333             344443  33333\",\"    3444333333             34443    33333\",\"     34443333              34443     33333\",\"     34443333             34443       33333\",\"      344433              34443        33333\",\"      344433              34453         33333\",\"      34443               34453         33333\"], 1.5, {\"0\": color(255, 255, 255), \"2\": color(255, 255, 255), \"3\": color(43, 40, 41), \"4\": color(60, 41, 54), \"5\": color(80, 49, 61), \"6\": color(142, 87, 79), \"7\": color(223, 159, 96), \"8\": color(121, 108, 144), \"9\": color(106, 64, 68), \"a\": color(238, 206, 162), }, 0, 0);\n        return get(0, 0, 400, 500);\n    },\n    p5: function() {\n        background(0, 0);\n        pixelArt([\"                     5555555555555555\",\"                   55666666666666666655\",\"                555666669996666666666665\",\"             555666699999966666666666665\",\"        44444666666999999666666666666665\",\"     4449999666666999999966666666666665755555\",\"    4999999999999999999966666666696665aa566665\",\"    496669999999999999996666666669964aaa5566665\",\"    496666999999999999999666666666964aaaa7966665\",\"   4999669999999999999999966666666994aaa77399665\",\"   49999999999999999999999666666669993aa77366994\",\"   459999999999999999999999666666699663773446994\",\"   4599999999599999999999996666966966553344449964\",\"  45599999999559599999999996666996955555943344663\",\"  45559999959959559599599996666699999555944394663\",\"  35559999555999959559545996666669999555994494443\",\" 433559999595959999959945596666669999555999996488\",\" 333559995599955599999955499666669999454499999444\",\" 34355959555399559999955544999666999944444999993\",\"43 345555533333555555555554999966999444444449993\",\"34 34445443 33333444555555559996994944433344433\",\"5  3444443  333333444444444499999949443  34443\",\"5  345443  33333  333344444399999944443   3343\",\"   345543 33333       3333339999944333     33\",\"    3454333333             3499944333\",\"    3444333333             34999433333\",\"     34443333              344443 33333\",\"     3444333               34443   33333\",\"     334443                34443    33333\",\"     3344433              34443      33333\",\"     3334443              34443       33333\",\"    33334443              34453        33333\",\"    33334443              34453        33333\"], 1.5, {\"0\": color(255, 255, 255), \"2\": color(255, 255, 255), \"3\": color(43, 40, 41), \"4\": color(60, 41, 54), \"5\": color(80, 49, 61), \"6\": color(142, 87, 79), \"7\": color(223, 159, 96), \"8\": color(121, 108, 144), \"9\": color(106, 64, 68), \"a\": color(238, 206, 162), }, 0, 0);\n        return get(0, 0, 400, 500);\n    },\n    p6: function() {\n        background(0, 0);\n        pixelArt([\"                     5555555555555555\",\"                   55666666666666666655\",\"                555666669996666666666665\",\"             555666699999966666666666665\",\"        44444666666999999666666666666665\",\"     4449999666666999999966666666666665755555\",\"    4999999999999999999966666666696665aa566665\",\"    496669999999999999996666666669964aaa5566665\",\"    496666999999999999999666666666964aaaa7966665\",\"   4999669999999999999999966666666994aaa77399665\",\"   49999999999999999999999666666669993aa77366994\",\"   459999999999999999999999666666699663773446994\",\"   4599999999599999999999996666966966553344449964\",\"  45599999999559599999999996666996955555943344663\",\"  45559999959959559599599996666699999555944394663\",\"  35559999555999959559545996666669999555994494443\",\" 433559999595959999959945596666669999555999996488\",\" 333559995599955599999955499666669999454499999444\",\" 34355959555399559999955544999666999944444999993\",\"43 345555533333555555555554999966999444444449993\",\"34 34445443 33333444555555559996994944433344433\",\"5  3444443  333333444444444499999949443  34443\",\"5  345443  33333  333344444399999944443   3343\",\"   345543 33333       3333339999944333     33\",\"    3454333333             34999443333\",\"    3444333333             34999433333\",\"     34443333               3444333333\",\"      344333                344433333\",\"       3443                 34444333\",\"       34433                 344433\",\"        34443                344443\",\"        34443                334443\",\"        34443                3333\"], 1.5, {\"0\": color(255, 255, 255), \"2\": color(255, 255, 255), \"3\": color(43, 40, 41), \"4\": color(60, 41, 54), \"5\": color(80, 49, 61), \"6\": color(142, 87, 79), \"7\": color(223, 159, 96), \"8\": color(121, 108, 144), \"9\": color(106, 64, 68), \"a\": color(238, 206, 162), }, 0, 0);\n        return get(0, 0, 400, 500);\n    },\n    p7: function() {\n        background(0, 0);\n        pixelArt([\"                     5555555555555555\",\"                   55666666666666666655\",\"                555666669996666666666665\",\"             555666699999966666666666665\",\"        44444666666999999666666666666665\",\"     4449999666666999999966666666666665755555\",\"    4999999999999999999966666666696665aa566665\",\"    496669999999999999996666666669964aaa5566665\",\"    496666999999999999999666666666964aaaa7966665\",\"   4999669999999999999999966666666994aaa77399665\",\"   49999999999999999999999666666669993aa77366994\",\"   459999999999999999999999666666699663773446994\",\"   4599999999599999999999996666966966553344449964\",\"  45599999999559599999999996666996955555943344663\",\"  45559999959959559599599996666699999555944394663\",\"  35559999555999959559545996666669999555994494443\",\" 433559999595959999959945596666669999555999996488\",\" 333559995599955599999955499666669999454499999444\",\" 34355959555399559999955544999666999944444999993\",\"43 345555533333555555555554999966999444444449993\",\"34 34445443 33333444555555559996994944433344433\",\"5  3444443  333333444444444499999949443  34443\",\"5  345443  3333333333344444399999944443   3343\",\"   345543  333333     3333339999944333     33\",\"    34543 333333           34999443333\",\"    34443 333333           34999433333\",\"    344443 33333           34444343333\",\"    344443 333333          34444333333\",\"     34443  333333         34444333333\",\"     344443  33333          3444333333\",\"      34443   3333          34443 33333\",\"      34443                 35443  33333\",\"      34443                 35443   3333\"], 1.5, {\"0\": color(255, 255, 255), \"2\": color(255, 255, 255), \"3\": color(43, 40, 41), \"4\": color(60, 41, 54), \"5\": color(80, 49, 61), \"6\": color(142, 87, 79), \"7\": color(223, 159, 96), \"8\": color(121, 108, 144), \"9\": color(106, 64, 68), \"a\": color(238, 206, 162), }, 0, 0);\n        return get(0, 0, 400, 500);\n    },\n    ground: function() {\n        background(0, 0);\n        for (var i = 0; i < 15; i++) {\n            pixelArt([\"121222221221221222222222222222\",\"313111332332221332332332222222\",\"111111113232711122272322133322\",\"121711133322711322732222122322\",\"227112223323722237322211172222\",\"227122233233712227211122172232\",\"227222372227713227122722172232\",\"227211372227732327132723317332\",\"227723372227577227223721117732\",\"275773757275567676727311117572\",\"755767555755766756777711177557\",\"577667777777675556755571767555\",\"766666666666675576755573766777\",\"664446666444667766755557766666\",\"445554644555466666677777664444\",\"555554645555466444466666667555\",\"555555675555764555546444466775\",\"755557667777667555576455546667\",\"677776666666666777776755554666\",\"666666444666444666666675555446\",\"466644555664555466444467555554\",\"546455557665555564555556755555\",\"576455576665555564555556675555\",\"766777766667777767555556667777\",\"666666666666666666777776666666\",\"444444666644444466666666644444\",\"555555466455555546664466675555\",\"555555466755555556645555675555\",\"555555766675555556655555567555\"], 1, {\"0\": color(200, 213, 176), \"1\": color(174, 194, 141), \"2\": color(142, 169, 97), \"3\": color(119, 143, 83), \"4\": color(224, 197, 162), \"5\": color(182, 153, 108), \"6\": color(129, 99, 61), \"7\": color(107, 76, 42), }, 0 + i * 30, 0);\n        }\n        return get(0, 0, 400, 500);\n    },\n    backing: function() {\n        background(0, 0);\n        for(var i = 0; i < 100; i++){\n            var c = lerpColor(color(113, 139, 173), color(126, 153, 191), i/30);\n            fill(c);\n            rect(0, 0 + i * 5, 600, 5);\n        }\n        return get(0, 0, 400, 500);\n    },\n    mountain1: function() {\n        background(0, 0);\n        pixelArt([\"                               00 00\",\"                              0030000\",\"                             0003330300\",\"                            0003333313000\",\"                           000311133133000\",\"                         000013133313113300 00000\",\"                      00033333103011301133000000000\",\"                   000003303310330113001113011100000\",\"                0000000330131100301133011113331100000\",\"             000000011331331100033110330111133331100000\",\"            0000000133313110000031110030011133133310000\",\"           0000011333113111000033111100300111331113300000\",\"           00001133111131111111311111113311111331113310000\",\"          0001113311223322211113111111113221111311113310000\",\"        0000113311222332222211113111111233222111311123310000\",\"       00001331122222332222222113111222223222221133322330000000\",\"      0001131222222233212222222331121222232212222223322333330000\",\"     00013322222223332211122223322222122331111122222322211113000\",\"    0011132222222233111111122233222111223211111112223222211133300\",\"  0011113222222223211111111222232111112233211111112233222211133000\",\" 001112322222223321111111122223221111122332211111122233222211130000\",\"0001233222222333211111111222223211111222232211111112223222221133000\",\"00112322222223221111111122222331111122222322211111112233222221131000\"], 6, {\"0\": color(156, 157, 155), \"1\": color(106, 106, 119), \"2\": color(50, 51, 81), \"3\": color(166, 0, 0), }, 0, 10);\n        filter(BLUR, 2);\n        return get(0, 0, 400, 500);\n    },\n    fog: function() {\n        background(0, 0);\n        for (var i = 0; i < 700; i++) {\n            fill(255, random(10, 20));\n            ellipse(random(0, 400), random(30, 65), 15, 15);\n        }\n        return get(0, 0, 600, 600);\n    },\n    rock: function() {\n        background(0, 0);\n        pixelArt([\"     0000\",\"    0111100\",\"   011112220\",\"  01112222220\",\" 011112222220\",\"0111122222330\",\"0333222223330\",\"0333333333330\",\"033333333330\",\" 0333333330\",\"  00000000\"], 1.5, {\"0\": color(43, 49, 53), \"1\": color(183, 193, 201), \"2\": color(124, 137, 153), \"3\": color(62, 74, 78), }, 0, 0);\n        return get(0, 0, 400, 500);\n    },\n    btnHover: function() {\n        background(0, 0);\n        for (var i = 0; i < 50; i++) {\n            fill(255, 20 - (i / 2.5));\n            rect(124 - i, 0, 1, 40);\n            rect(275 + i, 0, 1, 40);\n        }\n        fill(255, 20);\n        rect(125, 0, 150, 40);\n        return get(0, 0, 600, 600);\n    },\n};\nfunction cacheImages(obj) {\n    var keys = Object.keys(obj);\n    for (var i = 0; i < keys.length; i++) {\n        images[keys[i]] = images[keys[i]]();\n    }\n}\ncacheImages(images);\n\n// Arrays\nvar breads = [];\nvar smokeParticles = [];\nvar breadParticles = [];\n\n// Player Constructor\nfunction Player(x, y) {\n    this.x = x;\n    this.y = y;\n    this.costume = 1;\n    this.dir = 1;\n    this.moving = false;\n    this.dead = false;\n}\nPlayer.prototype.display = function() {\n    pushMatrix();\n    translate(this.x, this.y);\n    scale(this.dir, 1);\n    image(images[\"p\" + this.costume], -37.5, 0);\n    popMatrix();\n};\nPlayer.prototype.move = function() {\n    if (this.moving && frameCount % 6 === 0) {\n        this.costume++;\n        if (this.costume > 7) {\n            this.costume = 1;\n        }\n    }\n    if (!this.moving) {\n        this.costume = 1;\n    }\n    if ((keys[39] || keys[68]) && this.x < 355) {\n        this.x += 3;\n        this.dir = 1;\n        this.moving = true;\n    } else if ((keys[37] || keys[65]) && this.x > 50) {\n        this.x -= 3;\n        this.dir = -1;\n        this.moving = true;\n    } else {\n        this.moving = false;\n    }\n};\nPlayer.prototype.collideBreads = function() {\n    for (var i = breads.length - 1; i >= 0; i--) {\n        if(rectRect(breads[i].curX + 7, breads[i].y - 29, 9, 47, this.x - 32, this.y + 10, 65, 20)) {\n            this.dead = true;\n        }\n    }\n};\nvar player = new Player(200, 421);\n\n// Bread Constructor\nfunction Bread(x, y) {\n    this.curX = 205;\n    this.x = x;\n    this.y = y;\n    this.s = 0.1;\n    this.r = -60;\n    this.speedy = -19;\n}\nBread.prototype.display = function() {\n    pushMatrix();\n    translate(this.curX, this.y);\n    scale(this.s);\n    rotate(this.r);\n    image(images.bread, -31, -20);\n    popMatrix();\n};\nBread.prototype.eject = function() {\n    this.y += this.speedy;\n    if (this.speedy > 0) {\n        this.speedy += 0.15;\n    } else {\n        this.speedy += 0.5;\n    }\n    if (this.s < 0.4) {\n        this.s += 0.005;\n    } else {\n        this.s = 0.4;\n    }\n    this.curX += (this.x - this.curX) / 45;\n};\n\n// Smoke Constructor\nfunction Smoke(x, y) {\n    this.x = x;\n    this.y = y;\n    this.dirX = random(-1, 1);\n    this.dirY = random(-1, -3);\n    this.opacity = 150;\n    this.d = 10;\n}\nSmoke.prototype.display = function() {\n    fill(100, this.opacity);\n    ellipse(this.x, this.y, this.d, this.d);\n    this.d += 0.07;\n    this.opacity -= 1;\n    this.x += this.dirX;\n    this.y += this.dirY;\n};\n\n// Bread Particle Constructor\nfunction BreadParticle(x, y) {\n    this.x = x;\n    this.y = y;\n    this.speedx = random(-1, 1);\n    this.speedy = -8;\n    this.s = 12;\n    this.colors = [color(173, 115, 53), color(160, 99, 48), color(144, 83, 60), color(209, 146, 76)];\n    this.c = this.colors[Math.round(random() * 3)];\n}\nBreadParticle.prototype.display = function() {\n    fill(this.c);\n    rect(this.x, this.y, this.s, this.s, 10);\n    this.x += this.speedx;\n    this.y += this.speedy;\n    this.speedy += 1;\n    this.s -= 0.1;\n    if (this.y > 465) {\n        this.y = 465;\n        this.speedy *= -0.7;\n    }\n};\n\n// dImage Constructor\nfunction dImage(img) {\n    this.img = img;\n    this.x = 0;\n    this.y = 0;\n    this.s = 1;\n    this.done = false;\n}\ndImage.prototype.handle = function() {\n    pushMatrix();\n    translate(this.x, this.y);\n    scale(this.s);\n    image(this.img, 0, 0);\n    popMatrix();\n    if (!this.done) {\n        this.s += (5.4 - this.s) / 40;\n        this.x -= (this.x - (-player.x * 5.4 + 200)) / 40;\n        this.y -= (this.y + 2064) / 40;\n        if (this.s > 5.3) {\n            this.done = true;\n        }\n    }\n    if (this.done === true) {\n        this.img = get(0, 0, 400, 500);\n        this.x = 0;\n        this.y = 0;\n        this.s = 1;\n        this.done = 'next';\n    }\n    if (this.done === 'next') {\n        this.s -= (this.s - 0.25) / 20;\n        this.x += (150 - this.x) / 20;\n        this.y += (30 - this.y) / 20;\n        stroke(255);\n        noFill();\n        rect(this.x - 2, this.y - 2, 410 * this.s, 510 * this.s, 5);\n        noStroke();\n    }\n};\nvar dImg = null;\n\n// Transition\nvar transition = null;\nfunction Transitions (action) {\n    this.s = 0;\n    this.done = false;\n    this.action = action;\n    this.speed = 1;\n}\nTransitions.prototype.handle = function() {\n    fill(255);\n    ellipse(200, 250, this.s, this.s);\n    this.s += this.speed;\n    if (this.speed > 0) {\n        this.speed = (800 - this.s) / 20;\n    } else {\n        this.speed = -1 * (730 - this.s) / 20;\n    }\n    if (this.s > 670) {\n        this.speed *= -1;\n        this.action();\n    }\n    if (this.s < 0) {\n        this.done = true;\n    }\n};\n\n// Button Constructor\nfunction Button(x, y, txt) {\n    this.x = x;\n    this.y = y;\n    this.txt = txt;\n    this.opac = 150;\n    this.sz = 35;\n    this.anim = this.x - this.txt.length / 2 * 28;\n}\nButton.prototype.display = function(){\n        if (this.txt === \"START\") {\n            textFont(mainBold, this.sz);\n        } else {\n            textFont(mainFont, this.sz);\n        }\n        if (this.opac === 200) {\n            image(images.btnHover, 0, this.y - 33);\n        }\n        fill(255, this.opac);\n        text(this.txt, this.x, this.y);\n    };\nButton.prototype.mouseOver = function() {\n        var swidth = this.txt.length * 27;\n        return mouseX > this.x - swidth / 2 && mouseX < this.x + swidth / 2 && mouseY > this.y - 30 && mouseY < this.y;\n    };\nButton.prototype.handleMouseOver = function() {\n        if (this.mouseOver()) {\n            this.opac = 200;\n            this.sz = 36;\n        } else {\n            this.opac = 150;\n            this.sz = 35;\n        }\n    };\nButton.prototype.handleMouseClick = function(action) {\n        if (this.mouseOver()) {\n            transition = new Transitions(action);\n        }\n    };    \n\nvar startBtn = new Button(200, 270, \"START\");\nvar storyBtn = new Button(200, 320, \"STORY\");\nvar leadsBtn = new Button(200, 370, \"LEADS\");\nvar menuBtnsArray = [startBtn, storyBtn, leadsBtn];\nvar retryBtn = new Button(200, 400, \"RETRY\");\nvar menuBtn = new Button(200, 450, \"MENU\");\n\n// Thumbnail\nvar thumbImg;\nfunction thumbnail() {\n    if (keys[66] && keys[86]) {\n        thumbImg = get(0, 0, 400, 500);\n        background(255);\n        pushMatrix();\n        translate(50 * 4/5, 0);\n        scale(4/5, 1);\n        image(thumbImg, 0, 0);\n        popMatrix();\n    }\n}\n\ndraw = function() {\n    background(255);\n    \n    image(images.backing, 0, 0);\n    image(images.mountain1, 1 + random(), 326 + random());\n    image(images.ground, 0, 470);\n    image(images.fog, 0, 407);\n    image(images.rock, 5, 455);\n    image(images.rock, 379, 455);\n    \n    for (var i = smokeParticles.length - 1; i >= 0; i--) {\n        smokeParticles[i].display();\n        if (smokeParticles[i].opacity < 0) {\n            smokeParticles.splice(i, 1);\n        }\n    }\n    smokeParticles.push(new Smoke(200, 334));\n    \n    if (scene !== 'game' && scene !== 'lose') {\n        player.display();\n        player.move();\n        fill(0, 70);\n        rect(0, 0, 400, 500);\n    }\n    \n    switch (scene) {\n        case 'menu':\n            textFont(titleFont, 40);\n            fill(255, 94, 94);\n            text(\"BREAD\\nAPOCALYPSE\", 200, 100);\n            for (var i = 0; i < menuBtnsArray.length; i++) {\n                menuBtnsArray[i].display();\n                menuBtnsArray[i].handleMouseOver();\n            }\n            break;\n        case 'game':\n            player.display();\n            score++;\n            for (var i = breads.length - 1; i >= 0; i--) {\n                breads[i].eject();\n                breads[i].display();\n                if (breads[i].y > 450) {\n                    for (var j = 0; j < 15; j++) {\n                        breadParticles.push(new BreadParticle(breads[i].curX + random(7, 16), breads[i].y + random(-29, 18)));\n                    }\n                    breads.splice(i, 1);\n                }\n            }\n            player.collideBreads();\n            for (var i = breadParticles.length - 1; i >= 0; i--) {\n                breadParticles[i].display();\n                if (breadParticles[i].s < 0) {\n                    breadParticles.splice(i, 1);\n                }\n            }\n            if (frameCount % speed === 0) {\n                breads.push(new Bread(random(5, 370), 334));\n            }\n            if (speed > 20 && score % 500 === 498) {\n                speed -= 5;\n            }\n            \n            player.move();\n            \n            fill(0);\n            textFont(mainFont, 20);\n            text(score, 200, 30);\n            if (player.dead) {\n                dImg = new dImage(get(0, 0, 400, 500));\n                scene = 'lose';\n            }\n            break;\n        case 'lose':\n            fill(0, 70);\n            rect(0, 0, 400, 500);\n            fill(255);\n            textFont(mainFont, 100);\n            text(score, 200, 290);\n            retryBtn.display();\n            retryBtn.handleMouseOver();\n            menuBtn.display();\n            menuBtn.handleMouseOver();\n            dImg.handle();\n            break;\n        case 'story':\n            textFont(titleFont, 40);\n            fill(255, 94, 94);\n            text(\"STORY\", 200, 86);\n            textSize(20);\n            fill(255);\n            text(\"You are a poor bison who lives next to\\nVolcano Bread, the prison of the evil,\\nvenomous breads. The volcano randomly\\ndecided to erupt, blasting out the breads\\nonto the surrounding landscape.\\nUnfortunately, you are not very fit,\\nand cannot jump over those two rocks.\\nStuck in a 20 foot 2d enclosure, you aren't\\nable to run away.\", 200, 152);\n            menuBtn.display();\n            menuBtn.handleMouseOver();\n            break;\n        case 'leads':\n            textFont(titleFont, 40);\n            fill(255, 94, 94);\n            text(\"LEADERBOARD\", 200, 75);\n            fill(0, 70);\n            stroke(255);\n            rect(25, 100, 50, 40);\n            rect(100, 100, 150, 40);\n            rect(275, 100, 100, 40);\n            textFont(mainBold, 20);\n            fill(255);\n            text(\"#\", 50, 127.5);\n            text(\"NAME\", 175, 127.5);\n            text(\"SCORE\", 325, 127.5);\n            textSize(11);\n            for (var i = 0; i < 11; i++) {\n                fill(0, 50);\n                rect(25, 150 + i * 20, 50, 15);\n                rect(100, 150 + i * 20, 150, 15);\n                rect(275, 150 + i * 20, 100, 15);\n                fill(255);\n                text(i + 1, 50, 163 + i * 20);\n                text(leaders[i][0], 175, 163 + i * 20);\n                text(leaders[i][1], 325, 163 + i * 20);\n            }\n            textSize(15);\n            fill(0, 50);\n            rect(25, 150 + i * 21, 50, 30);\n            rect(100, 150 + i * 21, 150, 30);\n            rect(275, 150 + i * 21, 100, 30);\n            fill(255);\n            text(\"Your Highscore\", 175, 403);\n            text(highScore, 325, 403);\n            noStroke();\n            menuBtn.display();\n            menuBtn.handleMouseOver();\n            break;\n    }\n    \n    if (transition !== null && !transition.done) {\n        transition.handle();\n    } else {\n        transition = null;\n    }\n    \n    if (score > highScore) {\n        highScore = score;\n    }\n    \n    thumbnail();\n};\nmouseClicked = function() {\n    if (transition === null) {\n        if (scene === 'menu') {\n            startBtn.handleMouseClick(function() {\n                scene = 'game';\n                breads = [];\n                breadParticles = [];\n                dImg = null;\n                player = new Player(200, 421);\n                breads.push(new Bread(5, 334));\n                score = 0;\n                speed = 40;\n            });\n            storyBtn.handleMouseClick(function() {\n                scene = 'story';\n            });\n            leadsBtn.handleMouseClick(function() {\n                scene = 'leads';\n            });\n        } else if (scene === 'story' || scene === 'lose' || scene === 'leads') {\n            menuBtn.handleMouseClick(function() {\n                player = new Player(200, 421);\n                scene = 'menu';\n                score = 0;\n                speed = 40;\n            });\n        }\n        if (scene === 'lose') {\n            retryBtn.handleMouseClick(function() {\n                scene = 'game';\n                breads = [];\n                breadParticles = [];\n                dImg = null;\n                player = new Player(200, 421);\n                breads.push(new Bread(5, 334));\n                score = 0;\n                speed = 40;\n            });\n        }\n    }\n};\n\n// you found easter egg! yay i give you free subscription: https://www.khanacademy.org/computer-programming/subpage-30/6277838601895936\n",
    "title": "Bread Apocalypse - ft. wealR",
    "votes": 55,
    "created": "a day ago",
    "updated": "3 hours ago",
    "type": "PJS",
    "author": {
        "name": "Radar",
        "id": "kaid_3902988618718040904060736",
        "avatar": "/images/avatars/svg/leafers-seed.svg"
    },
    "dimensions": {
        "width": 400,
        "height": 500
    },
    "forks": [
        {
            "title": "Spin-off of \"Bread Apocalypse - ft. wealR\"",
            "id": "5128168978432000",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "FardisA",
                "id": "kaid_880294128446569030782089"
            }
        }
    ],
    "posts": {
        "tips": [
            {
                "replyCount": 0,
                "votes": 13,
                "date": "a day ago",
                "author": {
                    "name": "wealR",
                    "id": "kaid_831993479561352012904348",
                    "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                },
                "text": "<b>Sub to me pls</b><br>https://www.khanacademy.org/computer-programming/lame-idk-fr/5681493063155712<br><b>or if you professional like radar</b><br>https://www.khanacademy.org/computer-programming/subpage-30/6277838601895936<br><em>keep up</em>",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 6,
                "date": "a day ago",
                "author": {
                    "name": "wealR",
                    "id": "kaid_831993479561352012904348",
                    "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                },
                "text": "i luv the final product. hope we can do this again! it was fun!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 5,
                "date": "19 hours ago",
                "author": {
                    "name": "Xatnys",
                    "id": "kaid_3144599174897393521218325",
                    "avatar": "/images/avatars/svg/boggle-yellow.svg"
                },
                "text": "This is great lol.  I especially like the zoom-in at the end,",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "19 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "Thank you! I thought that would be cool. :)"
                    }
                ]
            },
            {
                "replyCount": 12,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "Duke",
                    "id": "kaid_351465532815782433620675",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "first!<br>Epic job Radar!<br>Lame Job wealR!<br>lol :P",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "wow you're quick!<br>Thanks!<br>lol"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "I waited like 3 minutes to post it lol<br>Your welcome!<br>Make sure wealR sees this ;P"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "dont you just love the graphics. i dink theyre masterpieces"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "of lameness i mean"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Yeah I think the graphics are really good!"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "thank you :)"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Ezra",
                            "id": "kaid_1112279572017452692208390",
                            "avatar": "/images/avatars/svg/leaf-red.svg"
                        },
                        "text": "yeah but mine are lamer"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": ">:) ezra guess what my bio stands for"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "wealR mind letting me in on what it stands for?"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Firebrand (offline)",
                            "id": "kaid_423049852746380987692804",
                            "avatar": "/images/avatars/svg/stelly-orange.svg"
                        },
                        "text": "yEaH wEaLr WhAt DoEs YoUr BiO sTaNd FoR?"
                    },
                    {
                        "date": "12 hours ago",
                        "author": {
                            "name": "kitty mascot",
                            "id": "kaid_1066778980955332043559618",
                            "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                        },
                        "text": "what does it mean!"
                    },
                    {
                        "date": "11 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "please delete your spam comments guys. It just stands for<br>I'm lamer then ezra or something"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 2,
                "date": "4 hours ago",
                "author": {
                    "name": "Ibraheem Ahmed (IA)",
                    "id": "kaid_42165633374795610935956",
                    "avatar": "/images/avatars/svg/spunky-sam.svg"
                },
                "text": "This is peak comedy",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "4 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "thanks, it was my idea lol"
                    }
                ]
            },
            {
                "replyCount": 3,
                "votes": 1,
                "date": "10 hours ago",
                "author": {
                    "name": "EZezmath9",
                    "id": "kaid_1144531708437896578699873",
                    "avatar": "/images/avatars/svg/leafers-sapling.svg"
                },
                "text": "I got 2254",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "EZezmath9",
                            "id": "kaid_1144531708437896578699873",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "Ha! I got 3382!"
                    },
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "EZezmath9",
                            "id": "kaid_1144531708437896578699873",
                            "avatar": "/images/avatars/svg/leafers-sapling.svg"
                        },
                        "text": "3997 :( I just wanted 4K, how much is that to ask? BTW, I love the bread."
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "Added your score. Thanks :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "13 hours ago",
                "author": {
                    "name": "vipervenom",
                    "id": "kaid_1171817670913346256866174",
                    "avatar": "/images/avatars/svg/piceratops-ultimate.svg"
                },
                "text": "can i be on the board?<br><br>1336",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "I added you :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "6 hours ago",
                "author": {
                    "name": "LemonTurtle",
                    "id": "kaid_26727758302107548837304",
                    "avatar": "/images/avatars/svg/primosaur-ultimate.svg"
                },
                "text": "My low-score: 114!<br><br>Beat that!!<br><br>XD High qwality game!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "5 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "lol nice you got the lowest possible score!<br>thanks :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "11 hours ago",
                "author": {
                    "name": "CassiaSight",
                    "id": "kaid_27486925028137101487234",
                    "avatar": "/images/avatars/svg/leaf-yellow.svg"
                },
                "text": "I have gotten 2886.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "I added you :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "13 hours ago",
                "author": {
                    "name": "That One Guy ME",
                    "id": "kaid_3823720261811268848400557",
                    "avatar": "/images/avatars/svg/duskpin-seed.svg"
                },
                "text": "2948<br>Better plot and gameplay than Elden Ring tbh",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "Added you.<br>Thanks :)"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "2 hours ago",
                "author": {
                    "name": "HAMBURGER RiDER",
                    "id": "kaid_410991944085535280495507",
                    "avatar": "/images/avatars/svg/starky-sapling.svg"
                },
                "text": "Never seen a better dodge game story in my entire life XD<br><br>Vote ++;",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "15 hours ago",
                "author": {
                    "name": "HB_the_Pencil (semi-retired)",
                    "id": "kaid_412656070256786668848958",
                    "avatar": "/images/avatars/svg/mr-pants-green.svg"
                },
                "text": "Wow! That's a really cool game! The graphics are awesome :D",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "Thank you! :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "10 hours ago",
                "author": {
                    "name": "Hokeycat",
                    "id": "kaid_438466413527508491816275",
                    "avatar": "/images/avatars/svg/blobby-green.svg"
                },
                "text": "I got 1861",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "Added your score :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "9 hours ago",
                "author": {
                    "name": "Spooderman Spooderman",
                    "id": "kaid_481502226850506771685891",
                    "avatar": "/images/avatars/svg/piceratops-sapling.svg"
                },
                "text": "I got 2558 first try!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "Wow nice added your score :)"
                    }
                ]
            },
            {
                "replyCount": 2,
                "votes": 1,
                "date": "14 hours ago",
                "author": {
                    "name": "Mathlete11",
                    "id": "kaid_4902531429433401500771997",
                    "avatar": "/images/avatars/svg/starky-sapling.svg"
                },
                "text": "@wealR this is ur first program without \"lame\" in its title XD<br><br>nice job :)",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "lol i wouldn't let him do that<br><br>thanks :)"
                    },
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "lol, this isn't lame at all XD"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "2 hours ago",
                "author": {
                    "name": "A+10333",
                    "id": "kaid_539345742584903189251569",
                    "avatar": "/images/avatars/svg/stelly-orange.svg"
                },
                "text": "lol this is funny<br><br>But also really well-made O.o<br>Amazing graphics and gameplay!<br><br>Vote++;",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "yes wealR has weird ideas lol<br><br>thanks!"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "9 hours ago",
                "author": {
                    "name": "Brennus",
                    "id": "kaid_59416422576375230984529",
                    "avatar": "/images/avatars/svg/starky-tree.svg"
                },
                "text": "i played a bit and got 5045",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "nice added your score :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "14 hours ago",
                "author": {
                    "name": "Pineapples",
                    "id": "kaid_6104902828627300552146889",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "I got 2034!<br>Nice game!<br>The particle effects are awesome, and the bread in the background adds to the engagement of the graphics. The bread movement is pretty smooth as well.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "Thanks Pineapples!"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "12 hours ago",
                "author": {
                    "name": "~The Wolf~",
                    "id": "kaid_6337778158362361978377342",
                    "avatar": "/images/avatars/svg/blobby-green.svg"
                },
                "text": "Highest score I managed to get was 9030! (3rd try)<br>I created a spin-off for proof. <br>Lmk when it is added so I can delete it",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "Wow nice! Added your score! :)"
                    }
                ]
            },
            {
                "replyCount": 3,
                "votes": 1,
                "date": "11 hours ago",
                "author": {
                    "name": "HACK",
                    "id": "kaid_6815067100354522609320825",
                    "avatar": "/images/avatars/svg/cs-ohnoes.svg"
                },
                "text": "I got 2507",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "Added your score :)"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "HACK",
                            "id": "kaid_6815067100354522609320825",
                            "avatar": "/images/avatars/svg/cs-ohnoes.svg"
                        },
                        "text": "i don't see it"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "sorry the leaderboard only shows the top 6"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "6 hours ago",
                "author": {
                    "name": "🐢🥓 TurtleBacon",
                    "id": "kaid_717955606160046848792382",
                    "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                },
                "text": "2975  <br>https://www.khanacademy.org/computer-programming/spin-off-of-bread-apocalypse-ft-wealr/6422656535412736<br>edit I got 4196 please add to lead <br>https://www.khanacademy.org/computer-programming/spin-off-of-bread-apocalypse-ft-wealr/5929418598825984",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 2,
                "votes": 1,
                "date": "6 hours ago",
                "author": {
                    "name": "🐢🥓 TurtleBacon",
                    "id": "kaid_717955606160046848792382",
                    "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                },
                "text": "amazing game that combines my favorite things murder cows and bread<br>fantastic",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "5 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "thanks just it isn't a cow. its a bison"
                    },
                    {
                        "date": "4 hours ago",
                        "author": {
                            "name": "🐢🥓 TurtleBacon",
                            "id": "kaid_717955606160046848792382",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": "I am from Idaho I think I know a murder cow"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "9 hours ago",
                "author": {
                    "name": "//I'M BOB ;)...(FYI I'm online)",
                    "id": "kaid_7500540694222150489044752",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "i got 7820 :D",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "Nice! :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "5 hours ago",
                "author": {
                    "name": "//I'M BOB ;)...(FYI I'm online)",
                    "id": "kaid_7500540694222150489044752",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "The cow is free he ate the rock lol",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "unfortunately the rock is as big as his head lol"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "9 hours ago",
                "author": {
                    "name": "AmethystSky",
                    "id": "kaid_784805823121542822870790",
                    "avatar": "/images/avatars/svg/duskpin-ultimate.svg"
                },
                "text": "Cool game! I got 1127.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "Thank you!"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "6 hours ago",
                "author": {
                    "name": "YoshiDude",
                    "id": "kaid_8691532869042265101128670",
                    "avatar": "/images/avatars/svg/leafers-seedling.svg"
                },
                "text": "Cool game! I got 2649",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "5 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "Thank you!"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "7 hours ago",
                "author": {
                    "name": "cg048",
                    "id": "kaid_956853891251979880724349",
                    "avatar": "/images/avatars/svg/starky-seedling.svg"
                },
                "text": "https://www.khanacademy.org/computer-programming/spin-off-of-bread-apocalypse-ft-wealr/6395021793083392<br>6521, it's another banger",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "5 hours ago",
                        "author": {
                            "name": "Radar",
                            "id": "kaid_3902988618718040904060736",
                            "avatar": "/images/avatars/svg/leafers-seed.svg"
                        },
                        "text": "Added your score :)"
                    }
                ]
            },
            {
                "replyCount": 2,
                "votes": 0,
                "date": "21 hours ago",
                "author": {
                    "name": "Firebrand (offline)",
                    "id": "kaid_423049852746380987692804",
                    "avatar": "/images/avatars/svg/stelly-orange.svg"
                },
                "text": "vewy stwange.. mee wikee.. fun gaym wif bisin and bwehd.. mee gett sevin dowzand too hunded fifdee wun.. pwetee deesent,, huh?? gwate job wadar.. meh job weelr.. huh huh huh i say meh.. dat funee.. wudeveer, dood.. vowt pwus pwus  :I",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "21 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "tank u vry weerd an laem. an also my bio stands for did you know i'm lamer than ezra"
                    },
                    {
                        "date": "10 hours ago",
                        "author": {
                            "name": "Firebrand (offline)",
                            "id": "kaid_423049852746380987692804",
                            "avatar": "/images/avatars/svg/stelly-orange.svg"
                        },
                        "text": "aaah,, i seee.. dat mayk sens too mi too bwaynsells.."
                    }
                ]
            }
        ],
        "questions": []
    }
}