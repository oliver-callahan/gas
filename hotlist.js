var json = {
    "code": "/**\n ~~~~ WILDFORM ~~~~~~\n\nA collab between Cyan Spirit and Quantum Cat\n\nQuantum Cat's Profile: https://www.khanacademy.org/profile/JadePanther\nQuantum Cat's Subpage: To be made soon\n\nCyan Spirit's Profile: https://www.khanacademy.org/profile/CyanSpirit\nCyan Spirit's Subpage: https://www.khanacademy.org/computer-programming/my-super-condensed-subpage/6388763035615232\n\nThanks to Duke for helping with filter and the rocks\n\nHow to Play:\nArrow keys to move\nR to restart\nM to go to menu\n\nAll levels can be done\n\nIf you see any bugs, please put it in the Tips and Thanks\nThere's also an Easter Egg if anyone can find it. (CZS was the first one)\n\nEnjoy!\n**/\n\n{\n// Setup\nnoStroke();\nframeRate(40);\ntextFont(createFont('Arial Bold'));\n\n// Variables\nvar keyDown = [];\nvar blocks = [];\nvar enemies = [];\nvar fc = [];\nvar signText = ['Welcome to the Jungle!\\nThis is your player, control it using\\nthe arrow keys\\nPress r to restart', 'Avoid falling off the platforms', 'Use the vines to climb up', 'You can push the rock\\nto help you get places', 'Watch out for the snakes and mosquitos!\\nPress space to shoot arrows', 'More enemies to kill', 'Your player can shift into other forms\\nTouch the blue dot to switch forms',  'Make sure not to drown\\n(unless you\\'re a fish that is)', 'Another form changer!\\nI wonder what I\\'ll turn into.', ];\nvar changingLevel = false;\nvar restarting = false;\n\nvar unlockedLevels = 0;\nvar currLevel = 0;\n/*\n  KEY:\n  - land\n  w water\n  p player\n  r rock\n  v vine\n  s snake\n  m mosquito\n  a alligator\n  b bird form changer\n  f fish form changer\n  l ladybug form changer\n  h hint sign\n  d door to next level\n\n  \n  * Must be land beneath water\n  * Must be something above land\n  * Must be something above water\n  (Gives an error otherwise)\n*/\nvar levels = [\n    [\n        '                   d',\n        '                  --',\n        '            -   -   ',\n        '         -  - -     ',\n        '   p h   -  -       ',\n        '-------------------',\n    ],\n    [\n        '                        ',\n        '                     - d',\n        '                     ---',\n        '                  -    ',\n        '  p  h  -- --  -       ',\n        '-------                ',\n    ],\n    [\n        '                 ',\n        '           -    ',\n        '           v -- ',\n        ' d         v v   ',\n        '------       v   ',\n        '   v    ---  v   ',\n        '   v     v       ',\n        '         v        ',\n        '         v---    ',\n        '         v     ',\n        '         v     ',\n        '         v     ',\n        '       h       ',\n        ' p     ---     ',\n        '---------      ',\n    ],\n    [\n        '                ',\n        '                ',\n        '                ',\n        '          ---   ',\n        '          ---   ',\n        ' r  p h   ---  d',\n        '-----------------'\n    ],\n    [\n        '                                     ',\n        '                             --      ',\n        '                   m      m  v--   ',\n        '                             v       ',\n        '              ---      s     v     ',\n        '  p h        --   s    ----  v   sd  ',\n        '-----    s       --          v  --- ',\n        '-----------         ---          ',\n        '-------------- --- ---           ',\n        \n    ],\n    [\n    '  p h    s    s  ms      mm',\n    '-----    -    -   -        ',\n    '                      d',\n    '                     --'\n    ],\n    [\n    '',\n    '                                         ---',\n    '                                   ------- -',\n    '                                   -      d-',\n    '                   -               - -------',\n    '               ------        - -   -  -',\n    '  p                -         - -   -  -', \n    '----     h b                 - -   -- -',\n    '        ----                 - -   -  -',\n    '                             - ----- --',\n    '                             -        -',\n    '                             ----------',\n    ],\n    [\n    '',\n    '                        ----',\n    '                        ----                d',\n    '                   f    ----            f  --',\n    '  p h      s      --wwww-----wwwwwawwww------',\n    '------ww-ww-ww------wwww-----wwwwwwwww----',\n    '------wwwwwwww------wwwww----www---------',\n    '------wwwwwwww--------wwwwwwwww----',\n    '------------------------wwwwww--',\n    '                       --------',\n    ],\n    [\n    '',\n    '--- -----------------------------------------',\n    '--v ---            s----------------------- -',\n    '--vp-v   ------- --------  -----f--        d-',\n    '--v--s   ---  --  -------f -----w---wwww-----',\n    '--v----      -------  s   ------w---w---------',\n    '--v--   --- ----  ------ -------w---w---    s-',\n    '--v----  --                 ----wwwww---wwaw--',\n    '--v--   --------ss-------www----w------www----',\n    '--    hl     ------ -----ww-----w------ww-----',\n    '--    ------     s  -----wwwwwwwwwwwwwww------',\n    '----------------------------------------------'\n        \n    ],\n    [\n        '',\n        '-------------',\n        '-   vv  v  m',\n        '-b      v   ',\n        '-----       ',\n        '           ',\n        '        - ',\n        '    -     ',\n        ' -          ',\n        '           -',\n        '  ----   s -',\n        '  vv     ---',\n        '  v      ---',\n        '  v  -------',\n        '  v        -',\n        '  v     s d-',\n        '       -----',\n        '       -----',\n        '   p   -----',\n        '------------'\n    ],\n    [\n        '',\n        '--------------------',\n        '-               mm--',\n        '-p      s   sf    --', \n        '-----------a--waww--',\n        '-----------wwwwwwwww',\n        '-m       ---------ww',\n        '-            -----ww',\n        's   s      f      ww',\n        '- --------------wwww',\n        '- -------------------',\n        '-l   -     --       -',\n        '----    s      s   d-',\n        '---------------------'\n    ],\n    [\n        '',\n        '    ---------------',\n        '    -v            -',\n        '    -vl---------- -',\n        '     v-         - -',\n        '     v          - -',\n        '     v          - -',\n        '     v    m     - -',\n        '                - -',\n        '  p              b',\n        '----',\n        '                                       ',\n        '                          -     mmm      ',\n        '                       -----    mmm      d',\n        '                       mmm-     mmm     --',\n        '                       mmm             ',\n        '                       mmm              ',\n    ],\n    [\n    '',\n    '                       --',\n    '                        v                d',   \n    '                        v              ---',  \n    '  p             -       v              vvv ',  \n    '-----     -             v   b          vv  ',  \n    '-----                                   v   ',  \n    '-----ssssssssssssss             ',  \n    '-------------------             ',  \n    ],\n    [\n        '',\n        '',\n        '                     ',\n        '               ------ ',\n        '              -------   ----',\n        '             --------   ---s',\n        '            ---------   -----',\n        '           ----------   -------s',\n        '         ------------   ---------',\n        '        -------------   ----------',\n        '       --------------   ------       ',\n        '   p  ---------------m  ----         s',\n        '---------------------mm ------   -----',\n        '---------------------mm         ------',\n        '---------------------           ------',\n        '--------------------- ------------------',\n        '--------------------- ------------------',\n        '--------------------- ----wwww----------',\n        '--------------------- wwwwwwwwww      --',\n        '---------------------wwwwww-wwwww    d--',\n        '----------------------------------------',\n    ],\n    [\n        '   p f      ',\n        '------ww-     ',\n        '------ww-         ',\n        '------ww-        -------------',\n        '------ww-        -     mmmmmmm----',\n        '------w--        -            -----   --',\n        '------ww-        -            --------  -',\n        '------ww-        -         l           d-',\n        '-------w----------wwwawaww---------------',\n        '------wwwwwww-wwwwwwwwwwww-',\n        '------wwwwwwwwwwwwwwwwwwww-',\n        '---------------------------',\n    ],\n    [\n        '',\n    'dsss      -', \n    '----      v',\n    '        s v',\n    '    s   --v',\n    '   --     v',\n    '    v     v',\n    '    v     v',\n    '    v     v',\n    '    v     ',\n    '    v      ',\n    '           ',\n    '  s      --', \n    '  ----    v',\n    '          v',\n    '        --v',\n    '   --     v',\n    '    v     v',\n    '    v     v',\n    '    v     v',\n    '    v     ',\n    '    v      ',\n    '    v    -',\n    '             ',\n    '  p          ',\n    '----        ',\n    '             ',\n    '             ',\n    '             ',\n    ],\n    [\n    '',\n    '- p f      -------                   ',\n    '-----wwwwww-------                   d',\n    '----wwwwwww-------                 -----',\n    '----wwwwaww-------                -------',\n    '----wwwwwww-------www              -----',\n    '----wwwwwwwww-waw-waww              ---',\n    '----wwwwwwawwwwwwwwwww               - m',\n    '----wwwwwwwwww-ww-wwwwww               m',\n    '----------------------ww-              m' ,\n    '----------------------ww-',\n    '----------------------ww-',\n    '----------------------ww-',\n    '----------------------ww-     b',\n    '----------------------wwwww-----',\n    '---------------------------------'\n    ],\n    [\n    '',\n    '-----------',\n    '-  -   -  -',\n    '-  -  p-  -',\n    '-  -- --  -',\n    '-         -',\n    '-         -',\n    '-         -',\n    '-         -',\n    '-         -',\n    '-    ss   -',\n    '-    --   -',\n    '-         -',\n    '-s       s-',\n    '--       --',\n    '-         -',\n    '-         -',\n    '-         -',\n    '-         -',\n    '-   ss    -',\n    '-   --    -',\n    '-         -',\n    '-         -',\n    '-         -',\n    '-ssss  sss-',\n    '-----  ----',\n    '-----  ----',\n    '-         -',\n    '-         -',\n    '-   d      -',\n    '-   -      -'\n    \n    ],\n    [\n        '                         r',\n        '                    -   ------',\n        '              -     v   -    --------',\n        '                    v       b-  r   -',\n        '                --  v     ---- --- --',\n        '                    v     ---- ---  -',\n        ' f                        ---- ---- -',\n        '---       p        ---  l           -',\n        '         --     l  ------------------',\n        '               ----------------------',\n        '               -    -',\n        '               -   d-',\n        '       ----ww---ww---',\n        '       ----www-www---',\n        '       ----wwwww-w---',\n        '       --------------',\n    ],\n    [\n    '',\n    '- - -         - - -             d',\n    '-----         -----            ----',\n    '-----         -----                                          --b',\n    '----- p       -----                                     -    v--',\n    '------------- -----                                      -   v',\n    '---------     -----                                          v',\n    '--------- s   ------                       ----------------  v      ',\n    '--------- ----------                       -l             -  v',\n    '--------- ----------      m                -  ---s-s-s-s- -  v',\n    '-                         m   m m             ----------- -   ',\n    '-                         m   m m             ------  --  -   ',\n    '-      s  s               m            - r    ------f --  -----',\n    '-------------------------------wawwaww--------------ww--wwwwww---',\n    '-------------------------------wwwwwww---------------wwwwwwwwww----f  ',\n    '-------------------------------wwwwwww--------------wwww-wwwwww-----ww-',\n    '------------------------------------------------------------wwww-wwwww-',\n    '    - -                                                   -wwwwwwwwww-',\n    '                                                           --wwww------',\n    '                                                           ------------',\n    ], // Boss Level\n];\nvar rKeyPressed = false;\nvar clicked = false;\nvar pDeaths = 0;\nvar scene = 'menu';\nvar grav = 0.35;\n\nvar fadeSpeed = 0;\nvar fadeAlpha = 0;\n\n} // --- Vars and Setup\n\n{\nvar palette = {\n    // Transparent\n    ' ': color(179, 179, 179, 0),\n    \n    // Reds\n    '6':color(237, 28, 38),\n    'i': color(181, 0, 30),\n    \n    // Greens\n    'g': color(32, 168, 75),\n    'l': color(170, 228, 29),\n    'e': color(4, 126, 39),\n    'm': color(119, 214, 117),\n    \n    // Browns\n    't': color(125, 71, 44),\n    'b': color(89, 39, 19),\n    's': color(221, 173, 142),\n    '4': color(199, 144, 122),  \n    'q': color(156, 90, 60),\n    'h': color(179, 110, 89),\n    \n    // Grays\n    'w': color(255, 255, 255),\n    '1': color(107, 107, 107),\n    '2': color(153, 151, 153),\n    '3': color(74, 74, 74),\n    'k': color(0, 0, 0),\n    \n    // Orange\n    'o': color(212, 119, 65),\n    'r': color(175, 94, 55),\n    \n    // Blues\n    'n': color(60, 77, 124),\n    '5': color(44, 55, 90),\n    'a': color(77, 109, 243),\n    'c': color(58, 88, 207),\n    '7': color(207, 223, 247),\n    // Water\n    '8': color(4, 179, 189),\n    '9': color(5, 155, 163),\n    '0': color(225, 239, 242),\n    \n    // Yellows\n    'y': color(255, 194, 14),\n    'd': color(224, 166, 7),\n    'f': color(255, 219, 110),\n};\nvar terrainArt = {\n    forms: {\n        bird: [\n            '  a  ',\n            ' acc ',\n            ' acc ',\n            'acccc',\n            'cccc5',\n            ' cc5 ',\n            ' cc5 ',\n            '  5  ',\n        ],\n        fish: [\n            '  f  ',\n            ' fyy ',\n            ' fyy ',\n            'fyyyy',\n            'yyyyd',\n            ' yyd ',\n            ' yyd ',\n            '  y  ',\n            \n        ],\n        bug: [\n            '  6  ',\n            ' 666 ',\n            ' 666 ',\n            '66666',\n            '6666i',\n            ' 66i ',\n            ' 66i ',\n            '  i  '\n            \n        ]\n    },\n    doorClosed: [\n            ' eetttttt  ',\n            ' eqqqqqqqt ',\n            'tgqqttqqqqt',\n            'qqgeqtq44qt',\n            'q44ght444ht',\n            'b4g4hq444ht',\n            'bg44hq444ht',\n            'bgg4hq444ht',\n            'q4g4hq444ht',\n            'qhhhhqhhhbt',\n            'qqttqqqqqbt',\n            'qqqqqqqqqbt',\n            'q444hq444bt',\n            'q444hq444ht',\n            'q444ht444ht',\n            'q444ht44ght',\n            'b444ht4ggge',\n            'b444hqgg4he',\n            'b444hq444he',\n            'qhhhhqhhhet',\n            'qqqqqqqqeqt',\n            'qttqqttteqt',\n            \n        ],\n    doorOpen: [\n        '  qq       ',\n        ' qqqkkkek  ',\n        ' qqqkkekkk ',\n        'tqqqkekkkkk',\n        'tq4qkekkekk',\n        'tq4qkekeekk',\n        '4q4qkeeekkk',\n        '4q4qkkkekkk',\n        '4q4qkkeekkk',\n        '4q4qkkkkkkk',\n        '4q4qkkkkkkk',\n        '4q4qkkkkkkk',\n        '4q4qkkkkkkk',\n        'qq4qkkkkkkk',\n        'qqbqkkkkkkk',\n        '4bbqkkkkkkk',\n        '4bbqkkkkkkk',\n        '4qbqkkkkkkk',\n        '4q4qkkkkkkk',\n        '4q4qkkkkeee',\n        '4eeqkkkekke',\n        'qe4ekkkkkke',\n        'qq4ekkkkkek',\n        'ttqqekkkekk',\n        '  tt       '\n    ],\n    sign: [\n        '   gge    ',\n        'tqgqqqqqqq',\n        'tqqgqqqqqq',\n        'tqqbqqqbgqg',\n        'tbbbqbbbggg',\n        'tqqqqbqgqq',\n        'ttttqqgqqq',\n        '    tqg   ',\n        '    teeg  ',\n        '    eq e  ',\n        '   etq    ',\n    ],\n    landTop: [\n            'llllllllllllll',\n            'lgllglgglgllgl',\n            'ggglgggggglggl',\n            'gttggtgtgtttgg',\n            'tttgttttgtttgg',\n            'bbtttbbtttbtbt',\n            'btbtbbbbbbbbbb',\n            'bbbbbbtttbbbbb',\n            'bbtttbbbbbbbbb',\n            'tbbbbbbbbbbbbt',\n            'bbbbbbbtttbbbb',\n            'bbbttbbbbbbbbt',\n            'bbbbbbbbttbbbb',\n            'bbbbbbbbbbbbbb'],\n    landMiddle: [\n            'bbbbbbbbbbbttt',\n            'bbbbtttbbbbtbb',\n            'btbbbbbbbbbbbb',\n            'bbbbbbbbtttbbb',\n            'tttbbbbbbbbbbb',\n            'bbbtbbbbbbbbbb',\n            'bbbbbbbtbbbbbb',\n            'tbbbbbtbbbbbtt',\n            'bbbbbbbbbbbbbb',\n            'bbbbbbbbbtttbb',\n            'bbttbbbbbbbbbb',\n            'bbbbbbbbbbbbbb',\n            'bbbbbtttbbbbbb',\n            'bbbbbbbbbbbbbb'],\n    waterTop: [\n            [\n            '              ',\n            '    wwwwww    ',\n            '  ww777777ww  ',\n            'ww7788888877ww',\n            '77888888888877',\n            '88888888888888',\n            '88777888888888',\n            '88888888888888',\n            '88888888877888',\n            '89888898888888',\n            '99888999988899',\n            '99999999999999',\n            '99998899999999',\n            '99999999988999'],\n            [\n            '              ',\n            '      wwwwww  ',\n            '    ww777777ww',\n            'wwww7788888877',\n            '77778888888888',\n            '88888888888888',\n            '88777888888888',\n            '88888888888888',\n            '88888888877888',\n            '89888898888888',\n            '99888999988899',\n            '99999999999999',\n            '99998899999999',\n            '99999999988999'],\n            [\n            '              ',\n            '        wwwwww',\n            'ww    ww777777',\n            '77wwww77888888',\n            '88777788888888',\n            '88888888888888',\n            '88777888888888',\n            '88888888888888',\n            '88888888877888',\n            '89888898888888',\n            '99888999988899',\n            '99999999999999',\n            '99998899999999',\n            '99999999988999'],\n            [\n            '              ',\n            'ww        wwww',\n            '77ww    ww7777',\n            '8877wwww778888',\n            '88887777888888',\n            '88888888888888',\n            '88777888888888',\n            '88888888888888',\n            '88888888877888',\n            '89888898888888',\n            '99888999988899',\n            '99999999999999',\n            '99998899999999',\n            '99999999988999'],\n            [\n            '              ',\n            'wwww        ww',\n            '7777ww    ww77',\n            '888877wwww7788',\n            '88888877778888',\n            '88888888888888',\n            '88777888888888',\n            '88888888888888',\n            '88888888877888',\n            '89888898888888',\n            '99888999988899',\n            '99999999999999',\n            '99998899999999',\n            '99999999988999'],\n            [\n            '              ',\n            'wwwwww        ',\n            '777777ww    ww',\n            '88888877wwww77',\n            '88888888877778',\n            '88888888888888',\n            '88777888888888',\n            '88888888888888',\n            '88888888877888',\n            '89888898888888',\n            '99888999988899',\n            '99999999999999',\n            '99998899999999',\n            '99999999988999'],\n            [\n            '              ',\n            '  wwwwww      ',\n            'ww777777ww    ',\n            '7788888877wwww',\n            '88888888887777',\n            '88888888888888',\n            '88777888888888',\n            '88888888888888',\n            '88888888877888',\n            '89888898888888',\n            '99888999988899',\n            '99999999999999',\n            '99998899999999',\n            '99999999988999'],\n    ],\n    waterMiddle: [\n            '99999999999999',\n            '99999999999999',\n            '99999999999999',\n            '99999999998899',\n            '99998899999999',\n            '99999999999999',\n            '99999999999999',\n            '99999999999988',\n            '99999999999999',\n            '99999999999999',\n            '98899999999999',\n            '99999999999999',\n            '99999999999999',\n            '99999988899999',\n    ],\n    waterBottom: [\n        [\n            '99999999999999',\n            '99999999999999',\n            '99999999999999',\n            '999999e9998899',\n            '9e9988e9999999',\n            '9e9999e999e999',\n            '9e9999e999e999',\n            '9e9999e999e988',\n            '9e9999e999e999',\n            '9e9999e999e999',\n            'eesssssss9e999',\n            's4ss2ssss44sss',\n            's44sss4424444s',\n            'ts4ts244st4444',\n        ],\n        [\n            '99999999999999',\n            '99999999999999',\n            '99999999999999',\n            '9999999e998899',\n            '999e889e999999',\n            '99e9999e999e99',\n            '99e999ee999e99',\n            '9e9999e999e988',\n            '9e9999e999e999',\n            '9e9999e999e999',\n            'eesssssss9e999',\n            's4ss2ssss44sss',\n            's44sss4424444s',\n            'ts4ts244st4444',\n        ],\n        [\n            '99999999999999',\n            '99999999999999',\n            '99999999999999',\n            '99999999e98899',\n            '999e8899e99999',\n            '999e999e9999e9',\n            '99e999ee999e99',\n            '99e999e9999e88',\n            '9e9999e999e999',\n            '9e9999e999e999',\n            'eesssssss9e999',\n            's4ss2ssss44sss',\n            's44sss4424444s',\n            'ts4ts244st4444',\n        ],\n        \n            \n    ],\n    rock: [\n          '   223113    ',\n          '  223111113  ',\n          '  111112311  ',\n          ' 21111111111 ',\n          ' 32111111121 ',\n          ' 32111111213 ',\n          ' 121111111113',\n          '1231112111113',\n          '1111123111113',\n          '1111121111113',\n          '2231111111111',\n          '123311111223 ',\n          ' 12331112331 ',],\n    vine: [\n            '    e     ',\n            ' llgee    ',\n            ' ggeee    ',\n            '     elll ',\n            '    eeegll',\n            ' llgeg egl',\n            'glgeg   eg',\n            ' e ee     ',\n            '   e      ',\n            'll e  le  ',\n            'lgge lgge ',\n            '   eeeee  ',\n            '   e      ',\n            '   e      '],\n    thing: [ // You found the  e a s t e r  e g g  in the code.. now find it in the game\n        '   yy   ',\n        '  yyyy  ',\n        ' yyyffy ',\n        ' y6yy6y ',\n        'i6y66y66',\n        'dyyyyyyy',\n        'dy6yy6yy',\n        'i6y66y66',\n        ' dyyyyy ',\n        '  dddd   '\n    ],\n    clouds: [\n        [\n        '     wwww077         ',\n        '    wwwwww7          ',\n        '   wwwwwwww0    0w0  ',\n        '  00www070ww0 www007 ',\n        ' 00www070wwwwwwwww007',\n        ' 70www07ww0www7wwwww0',\n        '770www077ww0w070ww007',\n        ' 70007770ww000700777 ',\n        '  777   7777777   '\n        ],\n        [\n        '                 wwwww0       ',\n        '               wwww0www000    ',\n        '             wwwwwww0wwwww0   ',\n        '         wwwwwww0wwwwwww007   ',\n        '      wwww0wwwww0wwww07ww0077 ',\n        '    00wwwww0wwww0www007www007 ',\n        ' 000www00ww770ww0ww070wwwww007',\n        '0wwww07wwwww070ww0w070ww00ww07',\n        '00ww077wwww00700www070ww07w007',\n        '7770www07w0w0700www077w0070777',\n        '   7000070ww0700www00700w0077 ',\n        '   77777700000070000777707777 ',\n        ]\n    ],\n    tree: [\n        ' 4qtttqbtqqtttt',\n        ' qtttqqbttqtttb',\n        ' tt4qbqtbttbtqb',\n        'tttqbtttqqbttb ',\n        'tttqqqttbqqtttt',\n        '4tttqbttttqtttt',\n        ' t4bttbttbqqtqq',\n        'ttttqtttttttttt',\n        't4bttttttqbbttt',\n        't4bttqbttqbttqb',\n        'tttt4qqbtqtqqb ',\n        ],\n    treeBranch1: [\n        '         tqttt ',\n        '       tttqttt ',\n        '       ttbttbt  ',\n        '     ttttqqbt   ',\n        '    tqttbqqtt  ',\n        '   tqbttttqt   ',\n        '  tbttbttbq    ',\n        ' tttqttttt     ',\n        't4btttttt      ',\n        't4bttqb        ',\n        'tttt4q         ',\n    ],\n    treeBranch2: [\n        't4qtttq          ',\n        ' qtttqqbt        ',\n        '  4tt4qbqt       ',\n        '   ttttqbtt      ',\n        '    tttqqqtt     ',\n        '     4tttqbtt    ',\n        '      t4bttbtt   ',\n        '       tqtttttt  ',\n        '       tttttqbbt ',\n        '        bttqbttqb',\n        '          tqtqqbq',\n        ],\n    foliage: [\n        '   lll        ',\n        'll gggm    mm ',\n        ' gmmggm  mmge ',\n        'mmggggmg mgge  ',\n        ' eeegggggge   ',\n        ' g mggggge  mm',\n        'ggmggmggeemmgg',\n        ' mggmgegm egm ',\n        ' mgeg egm  egl',\n        'mggeg egmggegl',\n        'mg  e eggegegl',\n        '      eggeg m ',\n        '   mmmeg  gmm ',\n        '    ggeg  g   '\n    ],\n    sapling: [\n        '     t tt  ',\n        '      ttt  ',\n        '       qt  ',\n        '       tt  ',\n        '       4t q',\n        '       4tq ',\n        '       tt  ',\n        '       tq  ',\n        '       tq  ',\n        '       tt  ',\n        '       tq  ',\n        \n    ],\n};\nvar enemyArt = {\n    snake: {\n        poised: [\n        '     444       ',\n        '    4qkqb      ',\n        '    4qqqqb     ',\n        '        qb     ',\n        '       qqb     ',\n        '      qqqb  4  ',\n        '     qqqb   44b',\n        '    bbbb      q',\n        '  qqqqqqqqq   b',\n        '  bbqbbbqbb   q',\n        '4444444444444qq',\n        'qqqqqqqqqqqqqqb',\n        'bbqbbqbbqbbqbb '\n    ],\n        sleeping: [\n        '               ',\n        '               ',\n        '               ',\n        '               ',\n        '               ',\n        '    444        ',\n        '   4qqq44      ',\n        '   4qqqqbb     ',\n        '  qq4qqq4qq    ',\n        '  bbqbbbqbb    ',\n        '4444444444444q ',\n        'qqqqqqqqqqqqqq ',\n        'bbqbbqbbqbbqbb '\n    ],\n        strike:  [\n        '                 ',\n        ' 444             ',\n        '4qkqbb           ',\n        '4qqqqqb          ',\n        '     qqb          ',\n        '      qqb     4  ',\n        '      qqqb    44b',\n        '       bbbb     q',\n        '    qqqqqqqqq   b',\n        '    bbqbbbqbb   q',\n        '  4444444444444qq',\n        '  qqqqqqqqqqqqqqb',\n        '  bbqbbqbbqbbqbb '\n    ],\n    },\n    mosquito: [\n        [\n        '      11   222 ',\n        '      111 2222 ',\n        ' kkk  1112222  ',\n        '    k 112222   ',\n        ' kkk k12222    ',\n        '    kk2222     ',\n        '    3k2233     ',\n        '   k1k3331333  ',\n        '   33 kk666613 ',\n        '  3   kk i6613',\n        ' 3    k k 6i663',\n        '3      k k i6i6',\n        '        k k ii ',\n        '        k  k   ',\n        '         k  k  '\n        ],\n        [\n        '               ',\n        '               ',\n        ' kkk           ',\n        '    k          ',\n        ' kkk k  2222222',\n        '    kk 22222222',\n        '    3k22222222 ',\n        '   k1k3331333  ',\n        '   33 kk666613 ',\n        '  3   kk i6613',\n        ' 3    k k 6i663',\n        '3      k k i6i6',\n        '        k k ii ',\n        '        k  k   ',\n        '         k  k  '\n        ],\n    ],\n    alligator: {\n        nuetral: [\n            [\n            '     eeeee                    ',\n            ' eeeeggmmge  e e e            ',\n            'eggggggkkggeemememe e         ',\n            'wewewegggggegegegegemee       ',\n            'gwgwggggggggggggggggggge  e   ',\n            'emmmmmmmmmmmemmmmemmmmmgeemee ',\n            ' eeeeeeeeeeeeeeeeeeeeeemmmmmme',\n            '        eg ee  egeee   eeeeee ',\n            '        eg eg  eg eg          ',],\n            [\n            '     eeeee                    ',\n            ' eeeeggmmge  e e e            ',\n            'eggggggkkggeemememe e         ',\n            'wewewegggggegegegegemee       ',\n            'gwgwggggggggggggggggggge  e   ',\n            'emmmmmmmmmmmemmmmemmmmmgeemee ',\n            ' eeeeeeeeeeeeeeeeeeeeeemmmmmme',\n            '        eg ee  eg  ee  eeeeee ',\n            '       eg eg    eg  eg         ',]\n        ],\n        attack: [\n            'geee eeeee                    ',\n            'ggggeggmmge  e e e            ',\n            'w gggggkkggeemememe e         ',\n            '  w wegggggegegegegemee       ',\n            '      w gggggggggggggggge  e   ',\n            'w mmmmmmmmmmemmmmemmmmmgeemee ',\n            'eeeeeeeeeeggeeeeeggeeeemmmmmme',\n            '        egege  egege   eeeeee ',\n            '        eg eg  eg eg          ',\n            ]\n        },\n};\nvar playerArt = {\n    human: {\n        nuetral: [\n                '   oooo    ', \n                ' oooooooo  ',\n                ' oorrooooo ',\n                'ooroo44ssr ', \n                'roro4ssssr ', \n                'rooosksskr ',\n                'roo4sssssr ',\n                'roo4sssss  ',\n                ' roo444s   ',\n                ' rro54snn  ',\n                '5555nns5nn ',\n                '5nnnnn5nnn ',\n                '5nnnnnnnnn ',\n                '55n5nnnnnn ',\n                '55n5nnnnnn ',\n                ' nn55nnnnss',\n                ' ssttttttss',\n                ' ss555nne  ',\n                '  eeg eee  ',\n                '  eeg eee  ',\n                '  egg eee  ',\n                '  egg eee  ',\n                '  4ss 4sss ',\n                '  44s 44ss '\n        ],\n        jump: [\n                \n                '   oooo    ',\n                ' oooooooo  ',\n                ' oorrooooo ',\n                'roroo44ssr ',\n                'roro4ssssr ',\n                'rooosksskr ',\n                'rro4sssssr ',\n                'rro4sssss  ',\n                ' roo444s   ',\n                ' rro54snn  ',\n                '5555nns5nn ',\n                '5nnnnn5nnn ',\n                '5nnnnnnnnn ',\n                '55n5nnnnnnss',\n                '55n5nnnnnnss',\n                ' nn55nnnnn ',\n                'sstttttttt ',\n                'ss5555nnnn ',\n                '  eeg eeeee',\n                '  eeg eeeee',\n                '4eegg   eee',\n                '4eegg   4sss',\n                'ss      4sss',\n                '            '\n        ],\n        moveAnimation: [\n            [\n                \n                '   oooo     ',\n                ' oooooooo   ',\n                ' oorrooooo  ',\n                'roroo44ssr  ',\n                'roro4ssssr  ',\n                'rooosksskr  ',\n                'rro4sssssr  ',\n                'rro4sssss   ',\n                ' roo444s    ',\n                ' rro54snn   ',\n                ' 555nns5nn  ',\n                '5nnnnn5nnn  ',\n                '5nnnnnnnnn4s',\n                '55n5nnnnnn4s',\n                '55555nnnnn  ',\n                '555555nnnn  ',\n                ' 5sstttttt  ',\n                ' 5ss55nnnn  ',\n                '  eeg eeee  ',\n                '4eeeg  eeee ',\n                '4eeeg   eee ',\n                '4s       4ss',\n                '         4ss',\n            ],\n            [\n                \n                '   oooo     ',\n                ' oooooooo   ',\n                ' oorrooooo  ',\n                'roroo44ssr  ',\n                'roro4ssssr  ',\n                'rooosksskr  ',\n                'rro4sssssr  ',\n                'rro4sssss   ',\n                ' roo444s    ',\n                ' rro54snn   ',\n                ' 555nns5nn  ',\n                '5nnnnn5nnn  ',\n                '5nnnnnnnnn  ',\n                '55nnnnnnnn4s',\n                '55ssnnnnnn4s',\n                ' nss5nnnnn  ',\n                ' ttttttttt  ',\n                ' 55555nnnn  ',\n                '  eeg eeee  ',\n                '  eeg  eee  ',\n                '  eeg  eee  ',\n                '  sss  44ss ',\n                '  sss  44ss ',\n            ],\n            [\n                \n                '   oooo     ',\n                ' oooooooo   ',\n                ' oorrooooo  ',\n                'roroo44ssr  ',\n                'roro4ssssr  ',\n                'rooosksskr  ',\n                'rro4sssssr  ',\n                'rro4sssss   ',\n                ' roo444s    ',\n                ' rro54snn   ',\n                ' 555nns5nn  ',\n                '5nnnnn5nnn  ',\n                '5nnnnnnnnn  ',\n                '55ssnnnnnn  ',\n                '55ssnnnnnn  ',\n                ' nn55nnnnn  ',\n                ' ttttttttt  ',\n                ' 55555nnnn  ',\n                ' eeeg  eee  ',\n                '  eeggeee   ',\n                '   eggeee   ',\n                '   ssss44   ',\n                '   ssss44   ',\n            ],\n            [\n                \n                '   oooo     ',\n                ' oooooooo   ',\n                ' oorrooooo  ',\n                'roroo44ssr  ',\n                'roro4ssssr  ',\n                'rooosksskr  ',\n                'rro4sssssr  ',\n                'rro4sssss   ',\n                ' roo444s    ',\n                ' rro54snn   ',\n                ' 555nns5nn  ',\n                '5nnnnn5nnn  ',\n                '5nnnnnnnnn  ',\n                '55n5nnnnnns ',\n                '55nnnnnnnns ',\n                ' nss5nnnnn  ',\n                ' tsstttttt  ',\n                ' 55555nnnn  ',\n                '  eeg eeee  ',\n                '  eeg  eee  ',\n                '  eeg  eee  ',\n                '  sss  44ss ',\n                '  sss  44ss ',\n            ],\n    ],\n        climb: [\n        '        ss',\n        '        ss',\n        'ss      nn',\n        'ss      nn',\n        'nn ooooonn',\n        'nnoorroonn',\n        'nnrroooorn',\n        'nroooroorn',\n        'nrrorooorn',\n        'nnrorooron',\n        'nnrrrrrnon',\n        'nnnnnnnnnn',\n        ' 5nnnnnnn ',\n        ' 5nnnnnnn ',\n        ' 5nnnnnnn ',\n        ' 55nnnnnn ',\n        ' 55n5nn55 ',\n        ' 55nn5n55 ',\n        ' e55nn55  ',\n        ' ee5n5ngg ',\n        ' ee55eegg ',\n        ' eee  eegs',\n        ' eee  eegs',\n        ' eee  eegs',\n        ' eee  4sss',\n        ' sss      ',\n        'ssss      ',\n    ],\n        fightAnimation: [\n            [\n                '     oooo    ', \n                '   oooooooo  ',\n                '   oorrooooo ',\n                '  ooroo44ssr ', \n                '  roro4ssssr   q', \n                '  rooosksskr   3q',\n                '  roo4sssss   3  q',\n                ' rroo4sssss  3   q',\n                'rrrro4444s  3    q',\n                'rroonn4sn  3     q',\n                '  555nns5n3 nnnnsq2',\n                ' 55555555ssnnnnnsq',\n                ' 55555555ssn3    q ',\n                '  5555555nnn 3   q',\n                '   nnnnnnnn   3  q',\n                '   nnnnnnnn    3q',\n                '  tttttttt     q',\n                ' 55555nne    ',\n                '  eeg eeee   ',\n                '  eeg  eee    ',\n                ' egg   eee    ',\n                'egg    eee    ',\n                '4ss    4sss   ',\n                '44s    44ss   '\n        ],\n            [\n                '     oooo    ', \n                '   oooooooo  ',\n                '   oorrooooo ',\n                '  ooroo44ssr ', \n                '  roro4ssssr   q', \n                '  rooosksskr   3q',\n                '  roo4sssss    3 q',\n                ' rroo4sssss   3  q',\n                'rrrro4444s    3  q',\n                'rroonn4sn    3   q',\n                '  555nns5nn3 nnnsq ',\n                ' 55555555ssnnnnnsq',\n                ' 55555555ssn  3  q ',\n                '  5555555nnn  3  q',\n                '   nnnnnnnn    3 q',\n                '   nnnnnnnn    3q',\n                '  tttttttt     q',\n                ' 55555nne    ',\n                '  eeg eeee   ',\n                '  eeg  eee    ',\n                ' egg   eee    ',\n                'egg    eee    ',\n                '4ss    4sss   ',\n                '44s    44ss   '\n        ],\n        ]\n    },\n    bird: {\n        moveAnimation: [\n            [\n            '  ccaaa         ',\n            '  ncccca        ',\n            '   ncccaa       ',\n            '    nccca       ',\n            '    ncccaa acc  ',\n            '  aaancccccackc ',\n            'aaccccnnccccccyy',\n            ' cccccccccccccc ',\n            '    cc44sssss   '\n        ],\n            [\n            '',\n            '',\n            '',\n            '',\n            '     ccccc ccc  ',\n            '  ccccccccccckc ',\n            'cccccacaanccccyy',\n            ' cccacacncccccc ',\n            '    aaccnssss   ',\n            '   aacn         ',\n            \n        ],\n            [\n            '',\n            '',\n            '',\n            '',\n            '     aaaaa acc  ',\n            '  aaaccccccackc ',\n            'aacccaccncccccyy',\n            ' cccacccncccccc ',\n            '    acccnssss   ',\n            '   acccnn       ',\n            '   acccn        ',\n            '    cnn         ',\n            '     n          '\n        ],\n        ],\n        nuetral: [\n                '       ccc  ',\n                '      ackcc ',\n                '      acccyy',\n                '     cccccc ',\n                '    ccancc  ',\n                '   cccancs  ',\n                '  cccanccs  ',\n                ' ccaancccs  ',\n                ' cnnncccs   ',\n                'ccccccss    ',\n                'cc ycc      ',\n                '    y y     ',\n        ],\n    },\n    bug: {\n        nuetral: [\n            '  6k66k   ',\n            ' 6666666  ',\n            'k6k66k6kkk',\n            '666k6666kk',\n            '  k k k   ',\n            ' k  k  k  ',\n        ],\n        moveAnimation: [\n            [\n            '  6k66k   ',\n            ' 6666666  ',\n            'k6k66k6kkk',\n            '666k6666kk',\n            '  k  k k  ',\n            ' k  k   k ',\n            ],\n            [\n            '  6k66k   ',\n            ' 6666666  ',\n            'k6k66k6kkk',\n            '666k6666kk',\n            '  k  k k  ',\n            '   k kk   ',\n            ]\n        ],\n        jump: [\n            '  6k6     ',\n            '116666    ',\n            '1126k6k   ',\n            '11226666  ',\n            ' 11126k6kk',\n            ' kkk1166kk',\n            '  kkkkkk  ',\n            '  k k k   ',\n            ' k k k    ',\n        ],\n    \n    },\n    fish: {\n        nuetral: [\n                '      caa     ',\n                ' ca    ccc    ',\n                '  ca  yyyyyyf ',\n                '   cayfffffyyf',\n                '   ccydddddkdy',\n                '  accyyyyayyyd',\n                ' ac   daaayd ',\n        ],\n        moveAnimation: [\n                [\n                    \n                '      caa     ',\n                '  ca    ccc',\n                '  ca  yyyyyyf ',\n                '   caafffffyyf',\n                '   cccdddddkdy',\n                '  acccyyyaayyd',\n                '  ac   daaayd ',\n                ],\n                [\n                '      caa     ',\n                ' ca    ccc    ',\n                '  ca  yyyyyyf ',\n                '   cayfffffyyf',\n                '   ccydddddkdy',\n                '  accyyyyayyyd',\n                ' ac   daaayd ',\n        ],\n        ]\n    },\n    arrow: [\n        'q    2 ',\n        ' qqqqq2',\n        'q    2 '\n    ],\n    \n};\nvar displayArt = {\n    heart: [\n        ' iii iii ',\n        'iww6i666i',\n        'iw666666i',\n        'i6666666i',\n        ' i66666i ',\n        '  i666i  ',\n        '   i6i   ',\n        '    i    '\n    ],\n    halfHeart: [\n        '     iii ',\n        '    i666i',\n        '    6666i',\n        '    6666i',\n        '    666i ',\n        '    66i  ',\n        '    6i   ',\n        '    i    '\n    ],\n    menuButton: {\n        end: [\n            '   ',\n            '  q',\n            ' qm',\n            'tmg',\n            'tgg',\n            'tgg',\n            'tgg',\n            ' be',\n            '  b',\n            '   ',\n        ],\n        middle: [\n            'qqqqqq',\n            'mmmmmm',\n            'gggggg',\n            'gggggg',\n            'gggggg',\n            'gggggg',\n            'gggggg',\n            'gggggg',\n            'eeeeee',\n            'bbbbbb'\n            \n        ]\n    },\n    levelLeaf: [\n        '      mmmmmm      ',\n        '    mmmgmgmmmm    ',\n        '   mmggmgmggggmm  ',\n        '  mmeeeeeeeeeggmm ',\n        ' mmegmggmggmgeegm ',\n        'eemggmggmgggggmem ',\n        'ggggggggggggggggem',\n        'eeegggeeeeeeeeeggm',\n        '   eee          gg',\n        '                 g'\n    ],\n    levelVine: [\n        'mge',\n        'mge',\n        'mgg',\n        'mgg',\n        'mge',\n        'mge',\n        'mge',\n        'mgg',\n        'gmg',\n        'gmg',\n        'gmg',\n        'mgg',\n    ],\n    title: [\n        ' q   y  q   q  q  l   ttqqq g  qqqq   tttqqq   tqqq   q gg   q  ',\n        'tq gl6y tq tq tq tgl ttttttqg ttgttq tttttttq tttttq ttg gy  tq',\n        'tqg  l  tq tq tqt  g bt   ttq tttg   ttq  ttq bt  tq btg y6y tq',\n        'tg  gg  tq tq tqg  y bt    tq tt g   tq    tq bt  tq btq  y btq',\n        'bg      tq tt gg  y  bt    tq ttg    tq  ggtt bt  tqgbttt  bttq',\n        'be  tq  tt ttggt     bt   gtq bttt   tt g  gt bt tttggttttbtttq ',\n        'et  tq  bt btgtt     bt   gttgbtt    tt y  gt btttt  bg tttt tq',\n        'bt  bt  bt bt tt     bt    gt tt  gg tty6y gt bttt   bg  tt  tt',\n        'btt bt bttgbt btttq  bt   ttg tt y  gbtty gtt btttq  btg     tt',\n        ' bttttttt gbt bttttq bttttttg tt y   bttggttt bt  tq btg     tt',\n        '  bb  tt   g   bbtt   bbbtt    t      bbgttt   b  tq bg      tt'\n    ]\n};\n\nvar backgroundArt = [\n    'tf     ffff ffffft f',\n    'tf fffffffff  f fff ',\n    't  bf fffff  ff  tbv',\n    't b   f f ff  vl t v',\n    'tbv   lff bv  v lt v',\n    't v  fflff v  v  tff',\n    't v  ff lff   v  tbf',\n    't v   ff tf    fftv ',\n    'ff    vlft      ft  ',\n    't  f  v lt ff  f t  ',\n    't ff  v  t bfffs t  ',\n    't  s     tbv  fs t  ',\n    't  s     t v   s t  ',\n    't fs    ft     s t  ',\n    't ffff f t    fs t  ',\n    't  sf    t     s t  ',\n    't  s     t     s t  ',\n    't ff     t     s t  ',\n    't  fff   t     s t  ',\n    \n];\nvar backgroundMap = {\n    ' ': '           ',\n    't': terrainArt.tree,\n    'b': terrainArt.treeBranch1,\n    'l': terrainArt.treeBranch2,\n    'v': terrainArt.vine,\n    'f': terrainArt.foliage,\n    's': terrainArt.sapling,\n    '-': terrainArt.landTop,\n    '_': terrainArt.landMiddle,\n    \n};\n\nvar menuArt = [\n    'v vvv  vvvvv vvvv  v',\n    'v  vv   v  v  vv   v',\n    '   v    v      v   v',\n    '                    ',\n    '                    ',\n    '                    ',\n    '                    ',\n    '                    ',\n    '                    ',\n    '                    ',\n    ' f                  ',\n    'fff              f  ',\n    'fsf             fff ',\n    ' s              fsf ',\n    ' s f             s  ',\n    ' s sf            s  ',\n    ' s s           -----',\n    '---------------_____',\n    \n];\n} // --- Pixel art arrays\n\n{\nvar drawPixel = function(drawing, x, y, pixSize, reverse) {\n    noStroke();\n    pushMatrix();\n    translate(x, y);\n    for(var i = 0; i<drawing.length; i++) {\n        for(var j = 0; j<drawing[i].length; j++) {\n            var pixel = drawing[i][j];\n            \n            fill(palette[pixel]);\n            \n            \n            if (!reverse) {\n                rect(j*pixSize, i*pixSize, pixSize+0.8, pixSize+0.8);\n            } else {\n                rect(drawing[i].length*pixSize-j*pixSize-pixSize, i*pixSize, pixSize+0.5, pixSize+0.5);\n                \n            }\n            \n        }\n    }\n    popMatrix();\n};\nvar createImg = function(drawing, size) {\n    background(0, 0, 0, 0);\n    if(size) {\n        drawPixel(drawing, 0, 0, size, 0);\n    }\n    else {\n        drawPixel(drawing, 0, 0, 2, 0);\n    }\n    return get(0, 0, 100, 100);\n};\nvar images = {\n    forms: {\n        bird: createImg(terrainArt.forms.bird),  \n        fish: createImg(terrainArt.forms.fish),\n        bug: createImg(terrainArt.forms.bug),\n    },\n    doorClosed: createImg(terrainArt.doorClosed),\n    doorOpen: createImg(terrainArt.doorOpen),\n    sign: createImg(terrainArt.sign),\n    landTop: createImg(terrainArt.landTop),\n    landMiddle: createImg(terrainArt.landMiddle),\n    rock: createImg(terrainArt.rock),\n    vine: createImg(terrainArt.vine),\n    waterMiddle: createImg(terrainArt.waterMiddle),\n    waterTop: [\n        createImg(terrainArt.waterTop[0]),\n        createImg(terrainArt.waterTop[1]),\n        createImg(terrainArt.waterTop[2]),\n        createImg(terrainArt.waterTop[3]),\n        createImg(terrainArt.waterTop[4]),\n        createImg(terrainArt.waterTop[5]),\n        createImg(terrainArt.waterTop[6])\n    ],\n    waterBottom: [\n        createImg(terrainArt.waterBottom[0]),\n        createImg(terrainArt.waterBottom[1]),\n        createImg(terrainArt.waterBottom[2]),\n    ],\n    clouds: [\n        createImg(terrainArt.clouds[0], 3),\n        createImg(terrainArt.clouds[1], 3),\n    ],\n    tree: createImg(terrainArt.tree),\n    \n    human: {\n        nuetral: createImg(playerArt.human.nuetral),\n        jump: createImg(playerArt.human.jump),\n        climb: createImg(playerArt.human.climb),\n        moveAnimation: [\n            createImg(playerArt.human.moveAnimation[0]),\n            createImg(playerArt.human.moveAnimation[1]), \n            createImg(playerArt.human.moveAnimation[2]), \n            createImg(playerArt.human.moveAnimation[3]), \n        ],\n        fightAnimation: [\n            createImg(playerArt.human.fightAnimation[0]),\n            createImg(playerArt.human.fightAnimation[1]),\n        ]\n    },\n    bird: {\n        nuetral: createImg(playerArt.bird.nuetral),\n        moveAnimation: [\n            createImg(playerArt.bird.moveAnimation[0]),\n            createImg(playerArt.bird.moveAnimation[1]),\n            createImg(playerArt.bird.moveAnimation[2]),\n        ]\n    },\n    bug: {\n        nuetral: createImg(playerArt.bug.nuetral),\n        jump: createImg(playerArt.bug.jump),\n        moveAnimation: [\n            createImg(playerArt.bug.moveAnimation[0]),\n            createImg(playerArt.bug.moveAnimation[1]),\n        ],\n        \n    },\n    fish: {\n        nuetral: createImg(playerArt.fish.nuetral),\n        moveAnimation: [\n            createImg(playerArt.fish.moveAnimation[0]),\n            createImg(playerArt.fish.moveAnimation[1])\n        ],\n    },\n    arrow: createImg(playerArt.arrow),\n    \n    heart: createImg(displayArt.heart),\n    \n    snake: {\n        poised: createImg(enemyArt.snake.poised),\n        sleeping: createImg(enemyArt.snake.sleeping),\n        strike: createImg(enemyArt.snake.strike),\n    },\n    mosquito: [\n        createImg(enemyArt.mosquito[0]),\n        createImg(enemyArt.mosquito[1]),\n    ],\n    alligator: {\n        nuetral: [\n            createImg(enemyArt.alligator.nuetral[0]),\n            createImg(enemyArt.alligator.nuetral[1])\n        ],\n        attack: createImg(enemyArt.alligator.attack),\n    },\n    thing: createImg(terrainArt.thing),\n    blank: createImg(''),\n};\n} // --- Drawing pixel art\n\n{\nvar colliding = function(obj1, obj2) {\n    return obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width && obj1.y + obj1.height > obj2.y && obj1.y < obj2.y + obj2.height;  \n};\nvar moveObjectsX = function(objs, offset) {\n    for (var i = 0; i < objs.length; i++) {\n        objs[i].x -= offset;\n    }\n};\nvar moveObjectsY = function(objs, offset) {\n    for (var i = 0; i < objs.length; i++) {\n        objs[i].y -= offset;\n    }\n};\nvar drawSignText = function(num) {\n    fill(255, 255, 255);\n    textSize(20);\n    textAlign(CENTER, CENTER);\n    text(signText[num], width/2 - 1, 100);\n    text(signText[num], width/2 + 1, 100);\n    text(signText[num], width/2, 99);\n    text(signText[num], width/2, 101);\n    fill(0, 0, 0);\n    text(signText[num], width/2, 100);\n};\n} // --- Helper functions\n\n{\nvar drawMountains = function(incAmount, hei, col, startingT) {\n    stroke(col);\n    for (var t =    0; t < incAmount * width; t += incAmount) {\n        var n = noise(t);\n        var y = map(n, 0, 1, 0, height/hei);\n        var x = t * 1 / incAmount;\n        line(x, height - y, x, height);\n    }\n};\nvar drawBackground = function() {\n    background(147, 183, 245);\n    for(var i = 0; i<10; i++) {\n        image(images.clouds[0], random(0, 400), random(0, 400));\n    }\n    \n    drawMountains(0.0039, 1.08, color(123, 169, 181));\n    drawMountains(0.0088, 1.96, color(95, 158, 161));\n    \n    noStroke();\n    var g = get();\n    \n    return g;\n};\nvar drawForeground = function() {\n    for(var i = 0; i<backgroundArt.length; i++) {\n        for(var j = 0; j<backgroundArt[i].length; j++) {\n            drawPixel(backgroundMap[backgroundArt[i][j]], j*20, i*22, 2, 0);\n        }\n    }\n    fill(201, 214, 245, 80);\n    rect(0, 0, width, height);\n        \n    filter(BLUR, 1);\n    \n\n    \n    var b = get(0, 0, width, height);\n    \n    return b;\n    \n    \n};\nvar drawHealth = function(x, y, size, health) {\n    for(var i = 0; i<health; i++) {\n        image(images.heart, x+i*size/4, y, size, size);\n    }\n};\nvar bg = drawBackground();\nvar fg = drawForeground();\n} // --- Extra drawing functions\n\n{\nvar Player = function(x, y) {\n    this.x = x;\n    this.y = y;\n    this.xVel = 2;\n    this.yVel = 6;\n    this.termVel = 10;\n    this.jumping = false;\n    this.onVine = false;\n    this.inWater = false;\n    this.form = 'human';\n    this.img = playerArt[this.form].nuetral;\n    this.height = this.img.length * 1.9; \n    this.width = this.img[0].length * 2;\n    this.health = 3;\n    this.hurting = 0;\n    this.fighting = 0;\n    this.airLeft = 70;\n    this.arrows = [];\n    this.direction = 0;\n};\nPlayer.prototype.changeForm = function(form) {\n    if(this.form === form) {\n        this.form = 'human';\n    }\n    else {\n        this.form = form;\n    }\n    this.img = images[this.form].nuetral;\n    \n    // Set the width and height of the player\n    this.height = playerArt[this.form].nuetral.length*2;\n    this.width = playerArt[this.form].nuetral[0].length*2;\n};\nPlayer.prototype.control = function() {\n    // Change players X speed based on arrow keys\n    if(keyDown[RIGHT]) {\n        this.xVel += 1;\n        this.direction = 0;\n    }\n    else if(keyDown[LEFT]) {\n        this.xVel -= 1; \n        this.direction = 1;\n    }\n    \n    // Control when player is a bird, on a vine or in the water\n    if(this.onVine  || this.inWater) {\n        if(keyDown[UP]) {\n            this.yVel = -2.0;\n        } else if(keyDown[DOWN]) {\n            this.yVel = 2.0;\n            \n        }\n        \n        if(this.form === 'human' && !keyIsPressed) {\n            this.yVel = 0;\n        }\n    }\n    else if(this.form === 'bird') {\n        if(keyDown[UP]) {\n            this.yVel = -3.0;\n        } else if(keyDown[DOWN]) {\n            this.yVel = 3.0;\n        }\n    }\n    \n    // Space pressed\n    if(keyDown[32] && this.fighting <= 0 && this.form === 'human' && !this.onVine) {\n        this.fighting = 20;\n        this.shoot();\n    }\n    \n    \n    // Make player jump\n    if(keyDown[UP] && (!this.jumping) && !this.onVine && !this.onWater && (this.form === 'human' || this.form === 'bug')) {\n        this.jumping = true; \n        this.yVel = -7;\n    }\n    \n    // Add friction to the player speed (slow it down by factor of 0.2)\n    this.xVel *= 0.8;\n};\nPlayer.prototype.takeDamage = function(obj) {\n    if(!changingLevel) {\n        if (!this.hurting) {\n            this.hurting = 1;\n            this.health--;\n                        \n        }\n        this.yVel = -2;\n        if(obj !== undefined) {\n            if (this.x < obj.x) {\n                this.xVel = -5;\n            }\n            if (this.x > obj.x) {\n                this.xVel = +5;\n            }\n        }\n    }       \n};\nPlayer.prototype.collideX = function(objs){\n    for(var i = 0; i<objs.length; i++){\n        if(colliding(this, objs[i])){\n            if (objs[i].type === 'rock') {\n                if(this.x > objs[i].x) {\n                    this.xVel = 0;\n                    this.x = objs[i].x + objs[i].width;\n                    objs[i].xVel -= 2;\n                }\n                else {\n                    this.xVel = 0;\n                    this.x = objs[i].x - this.width;\n                    objs[i].xVel += 2;\n                }\n            } else if(objs[i].type === 'vine' && this.form === 'human') {\n                if (this.x + this.width - 1 > objs[i].x) {\n                    this.onVine = true;\n                }\n            } else if(objs[i].type === 'fc') {\n                this.changeForm(objs[i].form);\n                fc.splice(i, 1);\n            }\n            else if(objs[i].type === 'enemy' && objs[i].hurting === 0) {\n                this.takeDamage(objs[i]);\n            }\n            else if(objs[i].type.includes('water')) {\n                this.inWater = true;\n            }\n            else if(objs[i].type.includes('door')) {\n                objs[i].type = 'doorOpen';\n                changingLevel = true;\n            }\n            else if(objs[i].type === 'sign') {\n                drawSignText(currLevel);\n            }\n            else {\n                this.x -= this.xVel;\n                this.xVel = 0;\n            }\n            \n        }\n    }\n};\nPlayer.prototype.collideY = function(objs){\n    this.jumping = true;\n    this.inWater = false;\n    var isSubmerged = false;\n    \n    for(var i = 0; i<objs.length; i++){\n        if(colliding(this, objs[i]) && objs[i].type !== 'vine'){\n            if(objs[i].type.includes('water')) {\n                this.inWater = true;\n                \n                if (this.y + this.height > objs[i].y && this.y < objs[i].y + objs[i].height) {\n                    isSubmerged = true;\n                }\n                \n            } \n            else if(objs[i].type !== 'sign' && !objs[i].type.includes('door')){\n                this.y -= this.yVel;\n                this.yVel = 0;\n                if(this.y < objs[i].y + objs[i].height){\n                    this.jumping = false;\n                    if(objs[i].type !== 'rock') {\n                        this.y = objs[i].y - this.height;\n                    }\n\n                }\n                \n            }\n        }\n    }\n    if((isSubmerged && this.form !== 'fish') || (!isSubmerged && this.form === 'fish')) {\n        this.airLeft--;\n        if(this.airLeft <= 0) {\n            this.takeDamage();\n            this.airLeft = 70;\n        }\n    }\n    else {\n        this.airLeft = 70;   \n    }\n    \n    \n};\nPlayer.prototype.display = function() {\n    var art = images[this.form];\n    \n    if(this.onVine) {\n        this.img = art.climb;\n        \n    } else if(this.fighting > 0 && this.form === 'human') {\n        if(this.fighting > 5) {\n            this.img = art.fightAnimation[0];\n        }\n        else {\n            this.img = art.fightAnimation[1];\n        }\n    } else if(this.jumping && (this.form === 'human' || this.form === 'bug')) {\n        this.img = art.jump;\n        \n    } else if(abs(this.xVel) > 0.3 || abs(this.yVel) > 0 || this.inWater) {\n        this.img = art.moveAnimation[floor(frameCount/4) % art.moveAnimation.length];\n    } else {\n        this.img = art.nuetral;\n    }\n    \n    // Make player blink if getting hurt\n    if (this.hurting%10 < 5) {\n        if (this.hurting > 25) {\n            this.hurting = 0;\n        }\n    \n        // Draws player\n        pushMatrix();\n        translate(this.x, this.y);\n        \n        // Flip\n        if(this.direction === 1 || (abs(this.yVel) > 0.1 && this.onVine && floor(frameCount/28) % 2)) {\n            scale(-1.0, 1.0);\n            translate(-playerArt[this.form].nuetral[0].length*2, 0);\n        }\n        image(this.img, 0, 0);\n        popMatrix();\n    }\n    \n    // Increase hurting count\n    if (this.hurting > 0) {\n        this.hurting++;\n    }\n    \n};\nPlayer.prototype.shoot = function() {\n    if(this.direction === 1) {\n        this.arrows.push({x: this.x+this.width, y: this.y+this.height/2-5, xVel: -5 +this.xVel/2, yVel: 0});\n    } else {\n        this.arrows.push({x: this.x+this.width, y: this.y+this.height/2-5, xVel: 5 +this.xVel/2, yVel: 0});\n    }\n    \n};\nPlayer.prototype.update = function() {\n    \n    if (fadeSpeed <= 0) {\n        this.control();\n        this.display();\n    }\n    \n    if((this.inWater || this.form === 'bird')) {\n        this.termVel = 0.7;\n    }\n    else {\n        this.termVel = 10;\n    }\n    \n    if(this.yVel < this.termVel && !this.onVine) {\n        this.yVel += grav;\n    }\n    else if(this.yVel > this.termVel && !keyDown[DOWN]) {\n        this.yVel = this.termVel;   \n    }\n     \n    // Move player along X and Y axis by X and Y velocity\n    if(fadeSpeed > 0) {\n        this.xVel = 0;\n    }\n    this.x += this.xVel;\n    this.onVine = false;\n    this.collideX(blocks);\n    this.collideX(fc);\n    this.collideX(enemies);\n    this.y += this.yVel;\n    this.collideY(blocks);\n    \n    for(var i = 0; i<this.arrows.length; i++) {\n        // Move the arrows\n        var arrow = this.arrows[i];\n        arrow.x += arrow.xVel;\n        arrow.y += arrow.yVel;\n        \n        // Draw\n        arrow.yVel += 0.04;\n        pushMatrix();\n        translate(arrow.x, arrow.y);\n        if(arrow.xVel < 0) {\n            scale(-1, 1);\n            translate(10, 0);\n        }\n        image(images.arrow, 0, 0);\n        popMatrix();\n        \n        // Collide with enemies\n        arrow.width = 10;\n        arrow.height = 2;\n        for(var j = 0; j<enemies.length; j++) {\n            if(colliding(arrow, enemies[j]) && !enemies.hurting) {\n                enemies[j].health--;\n                enemies[j].hurting = 1;\n                this.arrows.splice(i, 1);\n            }\n        }\n        \n        // Delete if go off screen\n        if(arrow.x > width) {\n            this.arrows.splice(i, 1);  \n        }\n        \n    }\n     \n    // Kill player when falling down\n    if (this.y > 295) {\n        this.health--;\n    }\n    \n    // Slide camera (player and all blocks) when player gets near the edge of the screen\n    var panX = this.xVel * ((this.xVel > 0 ? this.x : 400 - this.x) / 300);\n    this.x -= panX;\n    this.x = constrain(this.x, 75, 325);\n    moveObjectsX(blocks, panX);\n    moveObjectsX(fc, panX);\n    moveObjectsX(enemies, panX);\n    moveObjectsX(this.arrows, panX);\n    \n    var panY = this.yVel * ((this.yVel > 0 ? this.y : 400 - this.y) / 300);\n    this.y -= panY;\n    this.y = constrain(this.y, 100, 300);\n    moveObjectsY(blocks, panY);\n    moveObjectsY(fc, panY);\n    moveObjectsY(enemies, panY);\n    moveObjectsY(this.arrows, panY);\n    \n    if(this.health <= 0 && !changingLevel) {\n        restarting = true;\n        pDeaths++;\n        this.form = 'human';\n    }\n    this.fighting--;\n        \n};\nvar p = new Player(0, 0);\n} // --- Player\n\n{\nvar Block = function(x, y, type) {\n    this.x = x;\n    this.y = y;\n    this.type = type; \n    this.height = terrainArt[this.type].length*2;\n    this.width = terrainArt[this.type][0].length*2;\n    \n    if(this.type === 'rock') {\n        this.xVel = 0;\n        this.yVel = 0;  \n        this.colliding = false;\n    }\n    else if(this.type === 'waterTop' || this.type === 'waterBottom') {\n        this.animate = 0;\n       \n    }\n};\nBlock.prototype.rockCollideY = function(objs) {\n    for(var i = 0; i<objs.length; i++) {\n        if(objs[i] !== this && colliding(this, objs[i]) && objs[i].type !== 'sign') {\n            // Check if rock is above or below\n            if(this.y < objs[i].y) {\n                this.y = objs[i].y - this.height;\n            }\n            else  {\n                this.y = objs[i].y + objs[i].height;\n            }\n            this.yVel = 0;\n        }\n    }\n};\nBlock.prototype.rockCollideX = function(objs) {\n    for(var i = 0; i<objs.length; i++) {\n        if(objs[i] !== this && colliding(this, objs[i]) && objs[i].type !== 'sign') {\n            // Check if rock is to the left or right\n           \n            /*if(this.x < objs[i].x) {\n                \n                this.x = objs[i].x - this.width;\n                \n            }\n            else if(this.x > objs[i].x) {\n                this.x = objs[i].x + objs[i].width;\n            }*/\n            this.x -= this.xVel;\n            \n            this.xVel = 0;\n        }\n    }\n};  \nBlock.prototype.display = function() {\n    // Animate if waterTop\n    if(this.type === 'waterTop' || this.type === 'waterBottom') {\n        image(images[this.type][floor(this.animate)], this.x, this.y);\n    }\n    else {\n        image(images[this.type], this.x, this.y);\n    }\n    \n    \n    // Falling rock\n    if(this.type === 'rock') {\n        this.y += this.yVel;\n        this.rockCollideY(blocks);\n        this.x += this.xVel;\n        this.rockCollideX(blocks);\n        \n        this.yVel += grav;\n        this.xVel = 0;\n    }\n    else if(this.type === 'waterTop' || this.type === 'waterBottom') {\n        this.height = terrainArt[this.type][0].length*2;\n        this.width = terrainArt[this.type][0][0].length*2;\n        this.animate+=0.2;\n        if(floor(this.animate) >= images[this.type].length) {\n            this.animate = 0;\n        }\n    }\n\n    \n};\n\nvar FormChanger = function(x, y, form) {\n    this.x = x;\n    this.y = y;\n    this.width = 10;\n    this.height = 10;\n    this.form = form;\n    this.type = 'fc';\n    this.display = function() {\n        //fill(this.col);\n        //ellipse(this.x, this.y, 10, 10);\n        image(images.forms[this.form], this.x, this.y);\n    };\n};\n} // --- Block\n\n{\nvar SnakeEnemy = function(x, y) {\n    this.x = x;\n    this.y = y+2;\n    this.type = 'enemy';\n    this.height = enemyArt.snake.sleeping.length*1.9;\n    this.width = enemyArt.snake.sleeping[0].length*2;\n    this.poisedRad = 150;\n    this.strikeRad = 50;\n    this.health = 1;\n    this.hurting = 0;\n};\nSnakeEnemy.prototype.playerInRad = function(rad) {\n    return dist(this.x+this.width/2, this.y+this.height/2, p.x, p.y) < rad;\n};\nSnakeEnemy.prototype.update = function() {\n    pushMatrix();\n    translate(this.x, this.y);\n    if(p.x > this.x) {\n        scale(-1, 1);   \n        translate(-this.width, 0);\n    }\n    if(this.hurting%10 < 5) {\n        if (this.hurting > 10) {\n            this.hurting = 0;\n        } \n        // Determine what image the snake should be depending on how close the player is\n        if(!this.playerInRad(this.poisedRad)) {\n            image(images.snake.sleeping, 0, 0);   \n        }\n        else if(this.playerInRad(this.strikeRad) && floor(frameCount/30) % 2) {\n            image(images.snake.strike, -4, 0);\n        }\n        else {\n            image(images.snake.poised, 0, 0);\n        }\n        drawHealth(19, -4, 61, this.health);\n    }\n    popMatrix();\n    \n    if (this.hurting > 0) {\n        this.hurting++;\n    }\n};\n\nvar MosquitoEnemy = function(x, y) {\n    this.x = x;\n    this.y = y;\n    this.speed = random(1, 3);\n    this.xVel = 0;\n    this.yVel = 0;\n    this.height = enemyArt.mosquito[0].length*2;\n    this.width = enemyArt.mosquito[0][0].length*2;\n    this.type = 'enemy';\n    this.hittingPlayer = 0;\n    this.health = 2;\n    this.hurting = 0;\n};\nMosquitoEnemy.prototype.collideY = function(objs) {\n    for(var i = 0; i<objs.length; i++) {\n        if(objs[i] !== this && colliding(this, objs[i])) {\n            this.y -= this.yVel;\n            this.yVel = 0;\n        }\n    }\n};\nMosquitoEnemy.prototype.collideX = function(objs) {\n    for(var i = 0; i<objs.length; i++) {\n        if(objs[i] !== this && colliding(this, objs[i])) {\n            this.x -= this.xVel;\n            this.xVel = 0;\n            \n        }\n    }\n};\nMosquitoEnemy.prototype.display = function() {\n    pushMatrix();\n    translate(this.x, this.y);\n    if(this.hurting%10 < 5) {\n        if (this.hurting > 10) {\n            this.hurting = 0;\n        } \n        if(p.x > this.x) {\n            scale(-1, 1);\n            translate(-this.width, 0);\n        }\n        // Switch between images so it looks like flapping\n        if(floor(frameCount/3) % 2) {\n            image(images.mosquito[0], 0, 0);   \n        }\n        else {\n            image(images.mosquito[1], 0, 0);   \n        }\n    }\n    drawHealth(0, -14, 61, this.health);\n    popMatrix();\n    \n    if (this.hurting > 0) {\n        this.hurting++;\n    }\n};\nMosquitoEnemy.prototype.update = function() {\n    this.collideX(blocks);\n    this.collideY(blocks);\n    // Go towards player if their near\n    if(dist(this.x, this.y, p.x, p.y) < width) {\n        // Trig stuff to make it move\n        var diffX = p.x - this.x;\n        var diffY = p.y - this.y;\n        \n        this.dir = atan2(diffY, diffX);\n        \n        // Jump back when hit player\n        if(colliding(this, p) && !this.hittingPlayer) {\n            this.speed = -this.speed;\n            this.hittingPlayer = 20;\n        }\n    \n        if(this.hittingPlayer > 0) {\n            this.hittingPlayer--;\n        }\n        else {\n            this.speed = abs(this.speed);\n        }\n        \n        this.xVel = this.speed*cos(this.dir);\n        this.yVel = this.speed*sin(this.dir);\n        \n        this.x += this.xVel;\n        this.y += this.yVel;\n    }\n    \n    this.display(p.x, p.y);\n};\n    \nvar AlligatorEnemy = function(x, y) {\n    this.x = x;\n    this.y = y;\n    this.xVel = 0;\n    this.yVel = 0;\n    this.height = enemyArt.alligator.nuetral.length*2;\n    this.width = enemyArt.alligator.nuetral[0].length*2;\n    this.health = 3;\n    this.type = 'enemy';\n    this.hurting = 0;\n    this.attackRad = 50;\n};\nAlligatorEnemy.prototype.collideX = function(objs) {\n    for(var i = 0; i<objs.length; i++) {\n        if(objs[i] !== this && colliding(this, objs[i]) && !objs[i].type.includes('water')) {\n            this.x -= this.xVel;\n            this.xVel = 0;\n            \n        }\n    }\n};\nAlligatorEnemy.prototype.collideY = function(objs) {\n    for(var i = 0; i<objs.length; i++) {\n        if(objs[i] !== this && colliding(this, objs[i]) && !objs[i].type.includes('water')) {\n            this.y -= this.yVel;\n            this.yVel = 0;\n        }\n    }\n};\nAlligatorEnemy.prototype.display = function() {\n    pushMatrix();\n    translate(this.x, this.y);\n    \n    if(this.hurting%10 < 5) {\n        if (this.hurting > 10) {\n            this.hurting = 0;\n        } \n        if(p.x > this.x) {\n            scale(-1, 1);\n            translate(-2*this.width, 0);\n        }\n        if(dist(this.x, this.y, p.x, p.y) < this.attackRad) {\n            image(images.alligator.attack, 0, 0);\n        }\n        else if(abs(this.xVel) > 0) {\n            if(floor(frameCount/10) % 2) {\n                image(images.alligator.nuetral[0], 0, 0);\n            }\n            else {\n                image(images.alligator.nuetral[1], 0, 0);\n            }\n        }\n        else {\n            image(images.alligator.nuetral[0], 0, 0);\n        }\n        drawHealth(0, -12, 62, this.health);\n    }\n    popMatrix();\n    \n    if (this.hurting > 0) {\n        this.hurting++;\n    }\n};\nAlligatorEnemy.prototype.update = function() {\n    this.collideX(blocks);\n    this.collideY(blocks);\n    // Go towards player if near and in water\n    if(p.inWater && dist(p.x, p.y, this.x, this.y) < width/2) {\n        var diffX = p.x - this.x;\n        var diffY = p.y - this.y;\n        \n        this.dir = atan2(diffY, diffX);\n        \n        this.xVel = cos(this.dir);\n        this.yVel = sin(this.dir);\n        \n        \n        this.x += this.xVel;\n        this.y += this.yVel;\n    }\n    \n    this.display(p.x, p.y);\n};\n} // --- Enemies\n\n{\nkeyPressed = function() {\n    keyDown[keyCode] = true;  \n};\nkeyReleased = function() {\n    keyDown[keyCode] = false;  \n};\nmouseClicked = function() {\n    clicked = true;  \n};\n} // --- User Input\n\n{\nvar initLevel = function(level) {\n    blocks = [];\n    fc = [];\n    enemies = [];\n    \n    var playerY;\n    var playerX;\n    for (var row = level.length - 1; row >= 0; row--) {\n        for (var colm = 0; colm < level[row].length; colm++) {\n            if (level[row][colm] === 'p') {\n                playerY = row * 29;   \n                playerX = colm * 29;\n            }\n        }\n    }\n    var yOffset = 250 - playerY;\n    //var xOffset = 200 - playerX;\n    \n    for(var row = level.length-1; row>=0; row--) {\n        for(var colm = 0; colm<level[row].length; colm++) {\n            var id = level[row][colm];\n            if(colm === 5 && row === 18 && currLevel === 19) {\n                id = 'e';\n            }\n            var x = colm*29;\n            var y = yOffset + row*29;\n            switch(id) {\n                case '-':\n                    if(level[row-1][colm] === '-' || level[row-1][colm] === 'w') {\n                        blocks.push(new Block(x, y, 'landMiddle'));\n                    }\n                    else {\n                        blocks.push(new Block(x, y, 'landTop'));\n                    }\n                    break;\n                case 'b':\n                    fc.push(new FormChanger(x+13, y+5, 'bird'));\n                    break;\n                case 'l':\n                    fc.push(new FormChanger(x+13, y+5, 'bug'));\n                    break;\n                case 'f':\n                    fc.push(new FormChanger(x+13, y+5, 'fish'));\n                    break;\n                case 'r':\n                    blocks.push(new Block(x, y, 'rock'));\n                    break;\n                case 'v':\n                    blocks.push(new Block(x, y, 'vine'));\n                    break;\n                case 'w':\n                    if(level[row-1][colm] === ' ') {\n                        blocks.push(new Block(x, y, 'waterTop'));\n                    }\n                    else if(level[row+1][colm] === '-') {\n                        blocks.push(new Block(x, y, 'waterBottom'));\n                    }\n                    else {\n                        blocks.push(new Block(x, y, 'waterMiddle'));\n                    }\n                    break;\n                case 's':\n                    enemies.push(new SnakeEnemy(x, y));\n                    break;\n                case 'p':\n                    p.x = x;\n                    p.y = y;\n                    p.changeForm('human');\n                    p.direction = 0;\n                    break;\n                case 'm':\n                    enemies.push(new MosquitoEnemy(x, y));\n                    break;\n                case 'e':\n                    blocks.push(new Block(x, y, 'thing'));\n                    break;\n                case 'a':\n                    enemies.push(new AlligatorEnemy(x, y));\n                    if(level[row-1][colm] === ' ') {\n                        blocks.push(new Block(x, y, 'waterTop'));\n                    }\n                    else if(level[row+1][colm] === 'w') {\n                        blocks.push(new Block(x, y, 'waterMiddle'));\n                    }\n                    break;\n                \n                case 'h':\n                    blocks.push(new Block(x, y+7, 'sign'));\n                    break;\n                case 'd':\n                    blocks.push(new Block(x+2, y-22, 'doorClosed'));\n                \n                    \n                \n            }\n            \n            \n        }\n    }\n    \n    if(currLevel === 19) {\n        blocks[17][3] = new Block(3 * 29, yOffset + 17*29, 'waterTop');\n    }\n};\nvar updateSprites = function() {\n    for(var i = 0; i<blocks.length; i++) {\n        blocks[i].display();\n    }\n    for(var i = 0; i<fc.length; i++) {\n        fc[i].display();   \n    }\n    for(var i = 0; i<enemies.length; i++) {\n        enemies[i].update();\n        if(enemies[i].health <= 0 && enemies[i].hurting === 0) {\n            \n            enemies.splice(i, 1);\n            \n        }\n    }\n    \n    \n    p.update();\n    fill(3, 3, 3);\n    textSize(15);\n    textAlign(CENTER, CENTER);\n    text('Deaths: ' + pDeaths, 299, 17);\n    text('Level: ' + (currLevel + 1), 200, 17);\n    \n    drawHealth(10, 8, 104, p.health);\n};\nvar fadeTransition = function() {\n    fadeAlpha += fadeSpeed;\n    \n    fill(0, 0, 0, fadeAlpha);\n    rect(0, 0, width, height);\n    \n    if(fadeAlpha > 255) {\n        currLevel++;\n        if(currLevel >= levels.length) {\n           currLevel = 0;\n        }\n        initLevel(levels[currLevel]);\n        fadeSpeed = -5;\n    }\n    else if(fadeAlpha <= 0) {\n        fadeAlpha = 0;\n        changingLevel = false;\n        fadeSpeed = 0;\n    }\n    \n};\ninitLevel(levels[currLevel]);\n} // --- Draw Level\n\n{\nvar vineY = 0;\nvar menuScreen = function() {\n    image(bg, 0, 0);\n    var x = 13;\n    var y = 88;\n    drawPixel(displayArt.title, x, y, 6, 0);\n    drawPixel(playerArt.bird.nuetral, x+234, y-30, 2.5, 1);\n    drawPixel(playerArt.bug.nuetral, x+100, y+36, 2.5, 0);\n    \n    for(var i = 0; i<menuArt.length; i++) {\n        for(var j = 0; j<menuArt[i].length; j++) {\n            drawPixel(backgroundMap[menuArt[i][j]], j*20, i*22, 2, 0);\n        }\n    }\n    var m = get(0, 0, width, height);\n    return m;\n};\nvar m = menuScreen();\nvar levelTree = function() {\n    vineY = constrain(vineY, -1025, 25);\n    for(var i = -1; i<29; i++) {\n        drawPixel(displayArt.levelVine, 245, i*49 + vineY, 5, 0);\n    }\n    for(var i = 0; i<levels.length; i++) {\n        var r = i%2 ? 0 : 1;\n        var x = i%2 ? 261 : 155;\n        var y = 5+i*70+vineY;\n        drawPixel(displayArt.levelLeaf, x, y, 5, r);\n        \n        textAlign(CENTER, CENTER);\n        fill(0, 0, 0);\n        if(i <= unlockedLevels) {\n            textSize(20);\n            text(i + 1, x+40, y+22);\n        }\n        else {\n            textSize(15);\n            text((i + 1) + ' (Locked)', x+44, y+22);\n        }\n        \n        if(clicked && i <= unlockedLevels && mouseX > x && mouseX < x + 80 && mouseY > y && mouseY < y + 45) {\n            scene = 'game';\n            currLevel = i;\n            initLevel(levels[currLevel]);\n        }\n    }\n};\n} // --- Other Scenes\n\n{\nvar Button = function(x, y, wid, sceneActive, sceneChange, txt) {\n    this.x = x;\n    this.y = y;\n    this.wid = wid;\n    this.sceneActive = sceneActive;\n    this.sceneChange = sceneChange;\n    this.text = txt;\n};\nButton.prototype.update = function() {\n    if(scene === this.sceneActive) {\n        var segWid = 37;\n        var totalWid = this.wid*segWid+18*2+segWid;\n        \n        drawPixel(displayArt.menuButton.end, this.x, this.y, 6, 0);\n        for(var i = 0; i<=this.wid; i++) {\n            drawPixel(displayArt.menuButton.middle, this.x+i*segWid+18, this.y, 6, 0);\n        }\n        drawPixel(displayArt.menuButton.end, this.x+totalWid-20, this.y, 6, 1);\n        \n        textSize(24);\n        fill(0, 0, 0);\n        textAlign(CENTER, CENTER);\n        text(this.text, this.x + (totalWid)/2, this.y + 26);\n    \n        if(mouseX > this.x && mouseX < this.x + totalWid && mouseY > this.y && mouseY < this.y + 60) {\n            fill(255, 255, 255, 50);\n            rect(this.x+4, this.y, totalWid-10, 61, 76);\n            if(clicked && typeof this.sceneChange !== 'function') {\n                scene = this.sceneChange;\n            }\n            else if(mouseIsPressed && typeof this.sceneChange === 'function') {\n                this.sceneChange();\n            }\n        }\n    }\n    \n};\n\nvar btns = [\n    new Button(89, 197, 4, 'menu', 'game', 'Play'),\n    new Button(108, 278, 3, 'menu', 'level tree', 'Levels'),\n    new Button(18, 331, 1, 'level tree', 'menu', 'Back'),\n    new Button(26, 18, 0, 'level tree', function() {vineY+=5;}, '▲'),\n    new Button(26, 91, 0, 'level tree', function() {vineY-=5;}, '▼'),\n];\n} // --- Buttons\n\ndraw = function() {\n    image(bg, 0, 0);\n    if(scene !== 'level tree' && scene !== 'menu') {\n        image(fg, 0, 0);\n    }\n    else if(scene === 'menu') {\n        image(m, 0, 0);\n    }\n    \n    // Different scenes\n    if(scene === 'game') {\n        updateSprites();\n    }\n    else if(scene === 'menu') {\n        menuScreen();\n    }\n    else if(scene === 'level tree') {\n        levelTree();\n    }\n    for(var i = 0; i<btns.length; i++) {\n        btns[i].update();   \n    }\n    \n    // Restarting\n    if(restarting) {\n        pDeaths++;\n        p.health = 3;\n        initLevel(levels[currLevel]);\n        restarting = false;\n    }\n    \n    // Restart if R is pressed\n    if(keyDown[82]) {\n        if (!rKeyPressed) { \n            restarting = true;\n            rKeyPressed = true; \n        }\n    } else {\n        rKeyPressed = false; \n    }\n    if(keyDown[77]) {\n        scene = 'menu';\n        currLevel = 0;\n        p.health = 3;\n    }\n    \n    // Changing levels\n    if(changingLevel) {\n        if(fadeSpeed === 0) {\n            fadeSpeed = 5;\n        }\n        fadeTransition();\n    }\n    if(currLevel > unlockedLevels) {\n        unlockedLevels = currLevel;   \n    }\n    \n    clicked = false;\n};\n\n",
    "title": "Wildform [GAME]",
    "votes": 53,
    "created": "a day ago",
    "updated": "an hour ago",
    "type": "PJS",
    "author": {
        "name": "Quantum Cat",
        "id": "kaid_9428127706426004539463954",
        "avatar": "/images/avatars/svg/stelly-yellow.svg"
    },
    "dimensions": {
        "width": 400,
        "height": 400
    },
    "forks": [
        {
            "title": "Spin-off of \"Wildform [GAME]\"",
            "id": "6476282385580032",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "lubabah574",
                "id": "kaid_38786883741864550777716"
            }
        }
    ],
    "posts": {
        "tips": [
            {
                "replyCount": 1,
                "votes": 6,
                "date": "a day ago",
                "author": {
                    "name": "Liam K.",
                    "id": "kaid_160653079463992085090428",
                    "avatar": "/images/avatars/svg/duskpin-ultimate.svg"
                },
                "text": "Love all of the graphics in this game. You guys did amazing, keep up the great work.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Quantum Cat",
                            "id": "kaid_9428127706426004539463954",
                            "avatar": "/images/avatars/svg/stelly-yellow.svg"
                        },
                        "text": "Thank you :)"
                    }
                ]
            },
            {
                "replyCount": 3,
                "votes": 6,
                "date": "a day ago",
                "author": {
                    "name": "𝐂𝐥𝐨𝐯𝐞𝐫",
                    "id": "kaid_2287805493149654773942312",
                    "avatar": "/images/avatars/svg/stelly-green.svg"
                },
                "text": "\"If you see any bugs, please put it in the Tips and Thanks\"<br>I saw a ladybug on level 9 :)<br><br>Really nice game I love the pixel art and colors, The game concept is very nice, and overall the gameplay feels pretty polished.<br><br>Votes ++;",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Quantum Cat",
                            "id": "kaid_9428127706426004539463954",
                            "avatar": "/images/avatars/svg/stelly-yellow.svg"
                        },
                        "text": "XD That's awesome, I didn't even think to make that pun.<br><br>Thanks!"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "𝐂𝐥𝐨𝐯𝐞𝐫",
                            "id": "kaid_2287805493149654773942312",
                            "avatar": "/images/avatars/svg/stelly-green.svg"
                        },
                        "text": "Your Welcome :)"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "kitty mascot",
                            "id": "kaid_1066778980955332043559618",
                            "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                        },
                        "text": "clever XD"
                    }
                ]
            },
            {
                "replyCount": 2,
                "votes": 3,
                "date": "a day ago",
                "author": {
                    "name": "apex",
                    "id": "kaid_1116211384842396834715509",
                    "avatar": "/images/avatars/svg/sneak-peak-blue.svg"
                },
                "text": "Bro the moment I read the first sign, I heard \"Welcome to the Jungle\" start playing in my head xD ;-; Amazing graphics, epic game!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Quantum Cat",
                            "id": "kaid_9428127706426004539463954",
                            "avatar": "/images/avatars/svg/stelly-yellow.svg"
                        },
                        "text": "lol, it does have that theme. Thanks!"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "apex",
                            "id": "kaid_1116211384842396834715509",
                            "avatar": "/images/avatars/svg/sneak-peak-blue.svg"
                        },
                        "text": "I haven't been able to look at this much but from the glance it really looks well done! i love the thought put into the levels. and the player sprite is superb."
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 3,
                "date": "a day ago",
                "author": {
                    "name": "Mushy Avocado",
                    "id": "kaid_889538221957342292210697",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "Love the graphics! The only thing I would change is make the player animation a little more dynamic. Perhaps a jumping and falling animation would make things a little more interesting.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "Biggermoo",
                    "id": "kaid_3238694467206040975012829",
                    "avatar": "/images/avatars/svg/starky-sapling.svg"
                },
                "text": "Woah, epic game! Found this on the 'recent' tab, just goes to show you should check there every once in a while :O",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Quantum Cat",
                            "id": "kaid_9428127706426004539463954",
                            "avatar": "/images/avatars/svg/stelly-yellow.svg"
                        },
                        "text": "Thank you!"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "Samurai Warrior™ ✝ (Offline)",
                    "id": "kaid_333534297788735128142174",
                    "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                },
                "text": "The graphics are really nice. Definitely one of the best platformers I've played :D<br>great job to both of you<br>It's also much more complex than most platformers. Love the vines! It kind of reminds me of an old PBS kids game called Monkey Mayhem, I think  (in a few ways)<br>EDIT: The forms are awesome as well! :)",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "21 hours ago",
                        "author": {
                            "name": "Quantum Cat",
                            "id": "kaid_9428127706426004539463954",
                            "avatar": "/images/avatars/svg/stelly-yellow.svg"
                        },
                        "text": "Thank you!<br><br>I remember that game! I used to play it all the time."
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "Luke Ellis",
                    "id": "kaid_8535468719137003545030723",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "Wow. You did an amazing job detailing the whole thing. This is great.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Quantum Cat",
                            "id": "kaid_9428127706426004539463954",
                            "avatar": "/images/avatars/svg/stelly-yellow.svg"
                        },
                        "text": "Thanks :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 2,
                "date": "a day ago",
                "author": {
                    "name": "SnackerDavis",
                    "id": "kaid_889584744100087037395082",
                    "avatar": "/images/avatars/svg/robot_female_2.svg"
                },
                "text": "this is epic<br>this is fantastic <br>this is amazing <br>this is spectacular<br>I can't come up with any more, this is a REALLY good game, you guys did an epic job :D<br><br>Vote++",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Quantum Cat",
                            "id": "kaid_9428127706426004539463954",
                            "avatar": "/images/avatars/svg/stelly-yellow.svg"
                        },
                        "text": "Thank you SnakerDavis!"
                    }
                ]
            },
            {
                "replyCount": 3,
                "votes": 2,
                "date": "5 hours ago",
                "author": {
                    "name": "Panda15",
                    "id": "kaid_9155426718383676698036057",
                    "avatar": "/images/avatars/svg/duskpin-ultimate.svg"
                },
                "text": "Um it starts on. level 9 rn",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "5 hours ago",
                        "author": {
                            "name": "CZS",
                            "id": "kaid_676584471536152741627316",
                            "avatar": "/images/avatars/svg/primosaur-ultimate.svg"
                        },
                        "text": "I know I'm not Quantum Cat, but if you're looking for a quick fix you can set <code>currLevel</code> to 0 (line 42)."
                    },
                    {
                        "date": "5 hours ago",
                        "author": {
                            "name": "Panda15",
                            "id": "kaid_9155426718383676698036057",
                            "avatar": "/images/avatars/svg/duskpin-ultimate.svg"
                        },
                        "text": "yes ik<br><br>Im telling cuantum cat because its a simple mistake probably made while testing levels, I would guess testing the pixel art for the lady bug transformer, but Quantum Cat probably dosent know about it"
                    },
                    {
                        "date": "an hour ago",
                        "author": {
                            "name": "Quantum Cat",
                            "id": "kaid_9428127706426004539463954",
                            "avatar": "/images/avatars/svg/stelly-yellow.svg"
                        },
                        "text": "changed back now, sorry"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "kitty mascot",
                    "id": "kaid_1066778980955332043559618",
                    "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                },
                "text": "this looks amazing!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "10 hours ago",
                "author": {
                    "name": "rola <3",
                    "id": "kaid_1364059929449504255902123",
                    "avatar": "/images/avatars/svg/stelly-green.svg"
                },
                "text": "this game is so cute!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "Agni Rammohan",
                    "id": "kaid_3213311138427945097628530",
                    "avatar": "/images/avatars/svg/blobby-green.svg"
                },
                "text": "How did you create graphics. Did yu use an engine like me?",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Quantum Cat",
                            "id": "kaid_9428127706426004539463954",
                            "avatar": "/images/avatars/svg/stelly-yellow.svg"
                        },
                        "text": "No, I just did it in the code."
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "Duke",
                    "id": "kaid_351465532815782433620675",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "Epic job of course ;P<br>not that I saw it or anything :P<br><br>I'll write a quick essay(lots of feedback) about this later.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Quantum Cat",
                            "id": "kaid_9428127706426004539463954",
                            "avatar": "/images/avatars/svg/stelly-yellow.svg"
                        },
                        "text": "Thank you!<br>You saw nothing ;)"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "16 hours ago",
                "author": {
                    "name": "dalegomango skool acc",
                    "id": "kaid_371114188602608232313934",
                    "avatar": "/images/avatars/svg/leaf-red.svg"
                },
                "text": "beat it!<br>Level 16 had me confused for a very long time before I remembered that I had a bow xD",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "joe",
                    "id": "kaid_5152328204325219784298563",
                    "avatar": "/images/avatars/svg/starky-sapling.svg"
                },
                "text": "That's very cool and unique, 1 level is all I needed to say that. Beautiful",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "21 hours ago",
                "author": {
                    "name": "PJ ILKclan",
                    "id": "kaid_5898539511970677449730315",
                    "avatar": "/images/avatars/svg/blobby-blue.svg"
                },
                "text": "Well down! This is awesome!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 2,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "Eyeinthesky",
                    "id": "kaid_6136710333637048514584747",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "This is really cool! :D<br><br>I saw the WIP a while ago :P",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Quantum Cat",
                            "id": "kaid_9428127706426004539463954",
                            "avatar": "/images/avatars/svg/stelly-yellow.svg"
                        },
                        "text": "Thanks!<br><br>Ha, so you were one of the ones who voted it"
                    },
                    {
                        "date": "a day ago",
                        "author": {
                            "name": "Eyeinthesky",
                            "id": "kaid_6136710333637048514584747",
                            "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                        },
                        "text": "YW! :D<br><br>No? I didn't vote the WIP :P"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "2 hours ago",
                "author": {
                    "name": "vihaanpatankar32",
                    "id": "kaid_635975318362605801021168",
                    "avatar": "/images/avatars/svg/piceratops-seedling.svg"
                },
                "text": "Jesus. The definition of awesome. Amazing Graphics. NO bugs (except the ladybug). LOVE it!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 3,
                "votes": 1,
                "date": "9 hours ago",
                "author": {
                    "name": "CZS",
                    "id": "kaid_676584471536152741627316",
                    "avatar": "/images/avatars/svg/primosaur-ultimate.svg"
                },
                "text": "Excellent art and animations! Making separate animations for each of the player's forms must have taken some dedication. Personally, I would have made pixel art sprites for the form changers instead of making them regular ellipses, since I think it would've helped them fit in a bit more with the overall aesthetic, but maybe that's just me. Great work, you two!<br><br>Oh, and I found the easter egg!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Quantum Cat",
                            "id": "kaid_9428127706426004539463954",
                            "avatar": "/images/avatars/svg/stelly-yellow.svg"
                        },
                        "text": "Thank you! I just added some art for the form changers. I think I meant to do it but just forgot.<br><br>I think you're the first :). Did you find it in the code or the game or both?"
                    },
                    {
                        "date": "5 hours ago",
                        "author": {
                            "name": "CZS",
                            "id": "kaid_676584471536152741627316",
                            "avatar": "/images/avatars/svg/primosaur-ultimate.svg"
                        },
                        "text": "That looks great! Although the game starts at level 9 now . . . I assume you did this so you could test out the new art and then forgot to change it back?<br><br>Nice! I found it in the game first, and then spent a good while looking through the code before I found it there as well (the way you prevented people from using ctrl+F is very clever)."
                    },
                    {
                        "date": "an hour ago",
                        "author": {
                            "name": "Quantum Cat",
                            "id": "kaid_9428127706426004539463954",
                            "avatar": "/images/avatars/svg/stelly-yellow.svg"
                        },
                        "text": "Oops yeah sorry, it's back to level 1 now.<br><br>I consider ctrl+f cheating :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "14 hours ago",
                "author": {
                    "name": "ASBackup",
                    "id": "kaid_714780036830891967670231",
                    "avatar": "/images/avatars/svg/aqualine-tree.svg"
                },
                "text": "ive been waiting a whole 2 dayz for this :O<br>looks amazing :D",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "an hour ago",
                        "author": {
                            "name": "Quantum Cat",
                            "id": "kaid_9428127706426004539463954",
                            "avatar": "/images/avatars/svg/stelly-yellow.svg"
                        },
                        "text": "Thank you!"
                    }
                ]
            }
        ],
        "questions": [
            {
                "replyCount": 0,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "TheGimGamer",
                    "id": "kaid_703826623747117899019912",
                    "avatar": "/images/avatars/svg/blobby-green.svg"
                },
                "text": "How many levels are there?",
                "replies": [],
                "answers": [
                    {
                        "replyCount": 1,
                        "votes": 2,
                        "date": "a day ago",
                        "author": {
                            "name": "Quantum Cat",
                            "id": "kaid_9428127706426004539463954",
                            "avatar": "/images/avatars/svg/stelly-yellow.svg"
                        },
                        "text": "20 levels. You can see them all by pressing on the levels button",
                        "replies": [
                            {
                                "date": "20 hours ago",
                                "author": {
                                    "name": "TheGimGamer",
                                    "id": "kaid_703826623747117899019912",
                                    "avatar": "/images/avatars/svg/blobby-green.svg"
                                },
                                "text": "Thank you! Also, this is one of the best games I have ever played!"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}