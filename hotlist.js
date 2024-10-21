var json = {"code":"<!DOCTYPE html>\n<!--\nLeaferStudios ChessAI\n\nSubscribe to me for cool projects!\nhttps://www.khanacademy.org/computer-programming/leaferstudios/4934504502870016\n\nAll rules are implemented. Checkmate works. Stalemate/draw works but it goes to the checkmate screen. Bot thinks around ~1.5 moves ahead with an estimated ELO of 1200. Bot responds in ~0.1-0.2 seconds with ~30,000 moves analyzed per second but it may depend on the power of your computer.\n\nFor more quality programs, subscribe:\nhttps://www.khanacademy.org/computer-programming/leaferstudios/4934504502870016\n\nProject Released: Monday, October 21, 2024\n\nFirst released for the Khan Academy Computing community.\n\nAny questions, tips, comments, or bug reports? Tell me in the comments section of this program on Khan Academy.\n\nAll code by LeaferStudios (https://www.khanacademy.org/profile/kaid_553656479258879622339276/projects)\n-->\n\n<html>\n\n<head>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <!-- SEO: add this to my subpage too -->\n    <meta name=\"description\" content=\"LeaferStudios ChessAI is a JavaScript chess bot designed and developed by LeaferStudios@LeaferStudios (https://www.khanacademy.org/profile/kaid_553656479258879622339276/)\" />\n    <meta name=\"author\" content=\"LeaferStudios\" />\n    <meta name=\"keywords\" content=\"LeaferStudios ChessAI,Educational,Chess,AI,Bot,Smart,Responsive,HTML,CSS,JS,JavaScript,LeaferStudios,Khan Academy\" />\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n    <link href=\"https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Roboto+Serif:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Inclusive+Sans:ital@0;1&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Noto+Color+Emoji&display=swap\" rel=\"stylesheet\">\n    <title>LeaferStudios ChessAI</title>\n    <style>\n        * {\n            --link-color: rgb(151, 204, 90);\n            --link-border-color: rgb(97, 150, 32);\n            --link-color-hover: rgb(97, 150, 32);\n            --link-border-color-hover: rgb(102, 153, 40);\n            --white-square: rgb(235, 236, 208);\n            --black-square: rgb(119, 149, 86);\n        }\n\n        html,\n        body {\n            background-color: #333;\n            color: #FFF;\n            font-family: 'IBM Plex Sans', helvetica;\n            margin: 0;\n            height: 100%;\n            width: 100%;\n        }\n\n        .board {\n            width: 85vh;\n            float: left;\n        }\n\n        .info {\n            height: 85vh;\n            max-height: 85vh;\n            font-family: 'IBM Plex Sans', helvetica, arial, sans-serif;\n            position: fixed;\n            right: 0;\n            top: 0;\n            width: 15vh;\n            max-width: 15vh;\n            text-align: right;\n            font-size: 14px;\n        }\n\n        .history {\n            display: block;\n            position: absolute;\n            bottom: 0;\n            border-radius: 0px;\n            border-top: 2px solid var(--black-square);\n            height: 15vh;\n            width: 100%;\n            padding-left: 5px;\n            font-family: 'Roboto Serif', helvetica;\n            overflow-y: scroll;\n        }\n\n        .clearfix-7da63 {\n            clear: both;\n        }\n\n        .board-b72b1 {\n            border: 2px solid #404040;\n            -moz-box-sizing: content-box;\n            box-sizing: content-box;\n        }\n\n        .square-55d63 {\n            float: left;\n            position: relative;\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -khtml-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            box-shadow: inset 0px 0px 23px 20px transparent;\n        }\n\n        .white-1e1d7 {\n            background: var(--white-square);\n            color: var(--black-square);\n            font-weight: 500;\n\n        }\n\n        .black-3c85d {\n            background: var(--black-square);\n            color: var(--white-square);\n            font-weight: 500;\n        }\n\n        .highlight1-32417,\n        .highlight2-9c5d2 {\n            transition: all 0.15s;\n            -webkit-box-shadow: inset 0 0 0px 3px rgb(212, 212, 212);\n            -moz-box-shadow: inset 0 0 0px 3px rgb(212, 212, 212);\n            box-shadow: inset 0 0 0px 3px rgb(212, 212, 212);\n        }\n\n        .notation-322f9 {\n            cursor: default;\n            font-family: Helvetica, Arial, sans-serif;\n            font-size: 14px;\n            font-weight: 500;\n            position: absolute;\n        }\n\n        .alpha-d2270 {\n            bottom: 1px;\n            right: 3px;\n        }\n\n        .numeric-fc462 {\n            top: 2px;\n            left: 2px;\n        }\n\n        .play-btn {\n            border-radius: 19px;\n            padding: 0 90px;\n            height: 90px;\n            border: none;\n            background-color: var(--black-square);\n            color: var(--white-square);\n            cursor: pointer;\n            font-size: 22px;\n            font-family: 'Roboto Serif';\n            letter-spacing: 2px;\n            text-transform: uppercase;\n            transition: all 0.17s ease-in-out, background-color 0.3s;\n        }\n\n        .play-btn:hover {\n            background-color: var(--white-square);\n            color: var(--black-square);\n            border-radius: 4px;\n            transform: scale(1.2);\n        }\n\n        .play-btn:active {\n            transform: scale(1);\n            background-color: var(--black-square);\n            color: var(--white-square);\n        }\n\n\n        h1,\n        h2,\n        h3,\n        h4,\n        h5,\n        h6 {\n            line-height: 1.2;\n            font-weight: 500;\n            color: var(--text);\n        }\n\n        h1 {\n            font-size: calc(1.375rem + 1.5vw);\n            color: var(--text);\n        }\n\n        /* no select */\n        .no-select {\n            -webkit-user-select: none;\n            /* Safari */\n            -khtml-user-select: none;\n            /* KHTML */\n            -moz-user-select: none;\n            /* Older Firefox */\n            -ms-user-select: none;\n            /* IE */\n            user-select: none;\n            /* Chrome, Edge, Opera and Firefox */\n        }\n\n        /* container */\n        .container {\n            margin: 0 auto;\n            padding: 1rem;\n            width: 100%;\n        }\n\n        .no-space {\n            margin: 0 !important;\n            padding: 0 !important;\n        }\n\n        hr {\n            background: gainsboro;\n            height: 1px;\n            border: none;\n        }\n\n        .text-left {\n            text-align: left;\n        }\n\n        .text-center {\n            text-align: center;\n        }\n\n        .text-right {\n            text-align: right;\n        }\n\n        p {\n            font-size: 1em;\n            line-height: 24px;\n            color: var(--text);\n        }\n\n        a {\n            color: var(--link-color);\n            text-decoration: none;\n            border: 1px solid transparent;\n\n        }\n\n        a:hover {\n            color: var(--link-color-hover);\n            text-decoration: none;\n            border-bottom: 1px solid var(--link-border-color);\n        }\n\n        a:focus {\n            border: 1px dashed var(--link-border-color);\n        }\n\n        .full-height {\n            height: 100%;\n        }\n\n        .no-margin {\n            margin: 0;\n        }\n\n        .no-padding {\n            padding: 0;\n        }\n\n        #title {\n            font-size: 2.9em;\n            font-family: 'Roboto Serif';\n            border-bottom: 2px solid var(--black-square);\n        }\n    </style>\n    <!-- Keyframe animations -->\n    <style>\n        @keyframes fadeIn {\n            from {\n                opacity: 0;\n            }\n\n            to {\n                opacity: 1;\n            }\n        }\n    </style>\n    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/gh/Longfields/LeaferStudiosCSS/css/grid.css\">\n<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/gh/Longfields/LeaferStudiosCSS/css/spacing.css\">\n    <style>\n        /* Responsive Grid System */\n        .row{display:flex;flex-wrap:wrap;margin:0 -.75rem}.col{flex:1 1 0;padding:0 .75rem}@media (min-width:576px){.col-sm-1{flex:0 0 8.33333333%}.col-sm-2{flex:0 0 16.66666667%}.col-sm-3{flex:0 0 25%}.col-sm-4{flex:0 0 33.33333333%}.col-sm-5{flex:0 0 41.66666667%}.col-sm-6{flex:0 0 50%}.col-sm-7{flex:0 0 58.33333333%}.col-sm-8{flex:0 0 66.66666667%}.col-sm-9{flex:0 0 75%}.col-sm-10{flex:0 0 83.33333333%}.col-sm-11{flex:0 0 91.66666667%}.col-sm-12{flex:0 0 100%}}@media (min-width:768px){.col-md-1{flex:0 0 8.33333333%}.col-md-2{flex:0 0 16.66666667%}.col-md-3{flex:0 0 25%}.col-md-4{flex:0 0 33.33333333%}.col-md-5{flex:0 0 41.66666667%}.col-md-6{flex:0 0 50%}.col-md-7{flex:0 0 58.33333333%}.col-md-8{flex:0 0 66.66666667%}.col-md-9{flex:0 0 75%}.col-md-10{flex:0 0 83.33333333%}.col-md-11{flex:0 0 91.66666667%}.col-md-12{flex:0 0 100%}}@media (min-width:992px){.col-lg-1{flex:0 0 8.33333333%}.col-lg-2{flex:0 0 16.66666667%}.col-lg-3{flex:0 0 25%}.col-lg-4{flex:0 0 33.33333333%}.col-lg-5{flex:0 0 41.66666667%}.col-lg-6{flex:0 0 50%}.col-lg-7{flex:0 0 58.33333333%}.col-lg-8{flex:0 0 66.66666667%}.col-lg-9{flex:0 0 75%}.col-lg-10{flex:0 0 83.33333333%}.col-lg-11{flex:0 0 91.66666667%}.col-lg-12{flex:0 0 100%}}@media (min-width:1200px){.col-xl-1{flex:0 0 8.33333333%}.col-xl-2{flex:0 0 16.66666667%}.col-xl-3{flex:0 0 25%}.col-xl-4{flex:0 0 33.33333333%}.col-xl-5{flex:0 0 41.66666667%}.col-xl-6{flex:0 0 50%}.col-xl-7{flex:0 0 58.33333333%}.col-xl-8{flex:0 0 66.66666667%}.col-xl-9{flex:0 0 75%}.col-xl-10{flex:0 0 83.33333333%}.col-xl-11{flex:0 0 91.66666667%}.col-xl-12{flex:0 0 100%}}\n    </style>\n    <style>\n        /* Margin & Padding Utilities */\n        /* Padding Top */\n        .p-t-0{padding-top:0}.p-t-1{padding-top:.25rem}.p-t-2{padding-top:.5rem}.p-t-3{padding-top:1rem}.p-t-4{padding-top:1.5rem}.p-t-5{padding-top:3rem}.p-b-0{padding-bottom:0}.p-b-1{padding-bottom:.25rem}.p-b-2{padding-bottom:.5rem}.p-b-3{padding-bottom:1rem}.p-b-4{padding-bottom:1.5rem}.p-b-5{padding-bottom:3rem}.p-l-0{padding-left:0}.p-l-1{padding-left:.25rem}.p-l-2{padding-left:.5rem}.p-l-3{padding-left:1rem}.p-l-4{padding-left:1.5rem}.p-l-5{padding-left:3rem}.p-r-0{padding-right:0}.p-r-1{padding-right:.25rem}.p-r-2{padding-right:.5rem}.p-r-3{padding-right:1rem}.p-r-4{padding-right:1.5rem}.p-r-5{padding-right:3rem}[class*=m-1]{margin:.25rem}[class*=m-2]{margin:.5rem}[class*=m-3]{margin:1rem}[class*=m-4]{margin:1.5rem}[class*=m-5]{margin:3rem}.m-t-0{margin-top:0}.m-t-1{margin-top:.25rem}.m-t-2{margin-top:.5rem}.m-t-3{margin-top:1rem}.m-t-4{margin-top:1.5rem}.m-t-5{margin-top:3rem}.m-b-0{margin-bottom:0}.m-b-1{margin-bottom:.25rem}.m-b-2{margin-bottom:.5rem}.m-b-3{margin-bottom:1rem}.m-b-4{margin-bottom:1.5rem}.m-b-5{margin-bottom:3rem}.m-l-0{margin-left:0}.m-l-1{margin-left:.25rem}.m-l-2{margin-left:.5rem}.m-l-3{margin-left:1rem}.m-l-4{margin-left:1.5rem}.m-l-5{margin-left:3rem}.m-r-0{margin-right:0}.m-r-1{margin-right:.25rem}.m-r-2{margin-right:.5rem}.m-r-3{margin-right:1rem}.m-r-4{margin-right:1.5rem}.m-r-5{margin-right:3rem}[class*=p-1]{padding:.25rem}[class*=p-2]{padding:.5rem}[class*=p-3]{padding:1rem}[class*=p-4]{padding:1.5rem}[class*=p-5]{padding:3rem}\n    </style>\n</head>\n\n<body>\n    <div class='scene text-center full-height' style='box-shadow:inset -100vw -100vh 0px rgb(0, 20, 15, 0.8);background-image:url(\"https://upload.wikimedia.org/wikipedia/commons/6/64/Dall-e_3_%28jan_%2724%29_artificial_intelligence_icon.png\");background-size:100%;background-position:bottom;'>\n        <h1 id='title' class='no-margin p-t-5 p-l-2 p-r-2 p-b-5'>\n            LeaferStudios ChessAI\n        </h1>\n        <h2>Version 1 &#8226;\n <a href='javascript:alert(\"All rules are implemented. Checkmate works. Stalemate/draw works but it goes to the checkmate screen. Bot thinks around ~1.5 moves ahead with an estimated ELO of 1200. Bot responds in ~0.1-0.2 seconds with ~30,000 moves analyzed per second but it may depend on the power of your computer.\");'>Program Info</a></h2>\n        <button class='play-btn' onclick='scene(1);'>Play</button>\n        <br />\n        <a href='https://www.khanacademy.org/computer-programming/leaferstudios/4934504502870016' target='_blank'><button class='play-btn m-t-5' style='letter-spacing: 8.5px'>Sub</button></a>\n        <div style='position:absolute;bottom:0;left:50%;transform:translateX(-50%);border-top: 2px solid var(--black-square);width: 100%;padding-top:10px;padding-bottom:10px;display:flex;justify-content:space-between;'>\n            <p style='margin-left: 15px;'>Released 21 October 2024</p>\n            <p style='margin-right: 15px;'>© 2024\n\n                <a href='https://www.khanacademy.org/profile/kaid_553656479258879622339276/projects' target='_blank'>LeaferStudios\n                </a>\n            </p>\n\n        </div>\n    </div>\n\n    <div class='scene'>\n        <div id=\"board\" class=\"board\"></div>\n        <br>\n        <div class=\"info\">\n        <div style='padding: 0 8px;'>\n            <span>Search Depth: <span id=\"search-depth\">0</span> (~<span id='estimated-elo'>0</span> ELO)</span><br>\n            \n\n            <br><br>\n            <span><span id=\"position-count\">0</span> Positions Analyzed</span><br><span> in <span id=\"time\">0</span>s</span>\n            <br><br><span><span id=\"positions-per-s\">0</span> Positions per second</span>\n</div>\n        </div>\n\n        <div id=\"history\" class=\"history\">\n        </div>\n    </div>\n    <div class='dynamic-overlay text-center full-height' style='background-color:rgba(0,0,0,0.65);position:fixed;top:0;left:0;right:0;bottom:0;'>\n        <h1 id='title' class='no-margin p-t-5 p-l-2 p-r-2 p-b-5'>\n            Checkmate!\n        </h1>\n        <h2>Feedback is appreciated.</h2>\n        <button class='play-btn' onclick='restartGame();scene(1);'>Replay</button>\n        <br />\n        <a href='https://www.khanacademy.org/computer-programming/leaferstudios/4934504502870016' target='_blank'><button class='play-btn m-t-5' style='letter-spacing: 18.2px'>Sub</button></a>\n        <div style='position:absolute;bottom:0;left:50%;transform:translateX(-50%);border-top: 2px solid var(--black-square);width: 100%;padding-top:10px;padding-bottom:10px;display:flex;justify-content:space-between;'>\n            <p style='margin-left: 15px;'>Released 21 October 2024</p>\n            <p style='margin-right: 15px;'>© 2024\n\n                <a href='https://www.khanacademy.org/profile/kaid_553656479258879622339276/projects' target='_blank'>LeaferStudios\n                </a>\n            </p>\n\n        </div>\n    </div>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js\"></script>\n    <script src=\"https://cdn.jsdelivr.net/gh/lhartikk/simple-chess-ai@master/lib/js/chess.js\"></script>\n\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/chessboard-1.0.0.min.js\"></script>\n    <!-- Main JS -->\n    <script type='application/javascript'>\n        /*\n        remove if using JQUERY\n        function $(selector) {\n            if (selector.startsWith('#')) {\n                return document.getElementById(selector.substring(1));\n            } else {\n                return document.querySelectorAll(selector);\n            }\n        }*/\n\n        function scene(index) {\n            //LeaferStudios ChessAI layout version 1 specific\n            if(index===2){\n                setTimeout(function() {\n            $('.scene')[0].style.display = 'none';\n            $('.scene')[1].style.display = 'block';\n            $('.dynamic-overlay')[0].style.display = 'block';\n            $('.dynamic-overlay')[0].style.animation = '2.5s fadeIn forwards';\n                }, 600);\n            }else{\n                $('.dynamic-overlay')[0].style.display = 'none';\n            for (var i = 0; i < $('.scene').length; i++) {\n                $('.scene')[i].style.display = 'none'; // visibility = hidden/visible does not work with fadeIn\n                if (index !== 0&&index!==1) {\n                    $('.scene')[i].style.animation = '1s fadeIn forwards';\n                }\n            }\n            for (var i = 0; i < $('.navlink').length; i++) {\n                $('.navlink')[i].className = 'navlink';\n            }\n            $('.scene')[index].style.display = 'block';\n            $('.navlink')[index].className = 'navlink active';\n            }\n            // peculiar\n            window.scroll({\n                top: 0,\n                left: 0,\n                behavior: 'smooth'\n            });\n        }\n        scene(0);\n    </script>\n    <script src=\"https://cdn.jsdelivr.net/gh/Longfields/LeaferStudios-ChessAI/main.min.js\"></script>\n    <script type=\"application/javascript\">\n        sD = 3;\n        //<script>\n    </script>\n    <script src=\"https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js\"></script>\n    <script type>\n  \n        // credit to Bluebird@birdwatcher03 for this thumbnail script (only needed on Khan Academy, makes the thumbnail resolution better)\n        var r = 600;\n        var s = document.documentElement.clientWidth;\n        window.parent.html2canvas = (e) => {\n            try {\n                html2canvas(document.body, {\n                        width: s,\n                        height: s,\n                        useCORS: true,\n                    })\n                    .then((e) => {\n                        var c = document.createElement(\"canvas\");\n                        c.width = r;\n                        c.height = r;\n                        c.getContext(\"2d\").drawImage(\n                            e,\n                            0,\n                            0,\n                            e.width,\n                            e.height,\n                            0,\n                            0,\n                            r,\n                            r\n                        );\n                        window.top.postMessage(c.toDataURL(), \"*\");\n                    })\n                    .catch((e) => {\n                        alert(\"Thumbnail Script Error: \" + e);\n                    });\n            } catch {\n                window.top.postMessage(\n                    document.createElement(\"canvas\").toDataURL(),\n                    \"*\"\n                );\n            }\n        };\n    </script>\n</body>\n\n</html>\n","title":"LeaferStudios ChessAI","votes":19,"type":"HTML","author":{"name":"LeaferStudios","id":"kaid_553656479258879622339276","avatar":"/images/avatars/svg/leafers-ultimate.svg"},"dimensions":{"width":600,"height":600},"forks":[{"title":"Spin-off of \"LeaferStudios ChessAI\"","id":"5531838201643008","forks":0,"votes":1,"author":{"name":"ArshpreetS","id":"kaid_353981257569138717761741"}}],"posts":{"tips":[{"replyCount":0,"votes":4,"date":"2024-10-21T20:20:10.795433Z","author":{"name":"LeaferStudios","id":"kaid_553656479258879622339276","avatar":"/images/avatars/svg/leafers-ultimate.svg"},"text":"*Subscribe for better programs from an improved version of me*!\nhttps://www.khanacademy.org/computer-programming/leaferstudios/4934504502870016","locked":false,"pinned":false,"replies":[]},{"replyCount":0,"votes":2,"date":"2024-10-21T22:00:30.927214Z","author":{"name":"Dat","id":"kaid_4164356982737975081215128","avatar":"/images/avatars/svg/marcimus-orange.svg"},"text":"the level of play is very underwhelming given the depth of the search and general speed. also major issues, often blunders\n\ndo your own research and experiment, dont go off of a basic tutorial online that has major flaws-\n\ni cant pinpoint problems cuz the code is minimized but\n\nadd a quiescence search to stop horizon effects. VERY prominent blunders in every opening there is.\n\nonce the main major problems are solved, improve the evaluation with better heuristics.\n\nmake it faster to get a higher depth search. DONT USE A LIRBARY cuz the move generation is slow.\n\nadd more pruning techniques.\n\niterative deepening and more of the very basic low level stuffs","locked":false,"pinned":false,"replies":[]},{"replyCount":0,"votes":2,"date":"2024-10-21T21:12:19.112884Z","author":{"name":"Washington","id":"kaid_701855056246665520276831","avatar":"/images/avatars/svg/piceratops-ultimate.svg"},"text":"Very Nice! I did beat it and I do think its ~1200 or maybe a bit less. I'm 800 elo but I usually get a performance of ~1300 so idk.\n\nChess bots seem to be the trend now.","locked":false,"pinned":false,"replies":[]},{"replyCount":4,"votes":1,"date":"2024-10-21T20:28:07.088398Z","author":{"name":"Chickenfarmer2009","id":"kaid_287879839213083022099587","avatar":"/images/avatars/svg/piceratops-ultimate.svg"},"text":"First, wow.\n\nCan't wait to play this!","locked":false,"pinned":false,"replies":[{"date":"2024-10-21T20:36:27.695162Z","author":{"name":"Chickenfarmer2009","id":"kaid_287879839213083022099587","avatar":"/images/avatars/svg/piceratops-ultimate.svg"},"text":"He plays pretty well! Very impressive for a KA bot!\nOne thing though, the console at the bottom seems to be messed up. (Overlaps with the board)"},{"date":"2024-10-21T20:39:32.436858Z","author":{"name":"LeaferStudios","id":"kaid_553656479258879622339276","avatar":"/images/avatars/svg/leafers-ultimate.svg"},"text":"Thanks, the console is not messed up for me on all screen sizes, did you know that it is a text box and you can scroll up and down it?"},{"date":"2024-10-21T20:44:45.950336Z","author":{"name":"Chickenfarmer2009","id":"kaid_287879839213083022099587","avatar":"/images/avatars/svg/piceratops-ultimate.svg"},"text":"@Leaferstudios\nYou're welcome!\nI know you can scroll it, but some of the top overlaps with the bottom of the board. It might just be a font size problem or something.\n\n@-_-\nAh, ok, hi!"},{"date":"2024-10-21T21:06:30.165101Z","author":{"name":"LeaferStudios","id":"kaid_553656479258879622339276","avatar":"/images/avatars/svg/leafers-ultimate.svg"},"text":"Thanks @-_-\n\n@Chickenfarmer2009\nIt should not happen, what browser/computer are you on?"}]},{"replyCount":0,"votes":1,"date":"2024-10-21T21:10:03.025873Z","author":{"name":"Duke","id":"kaid_351465532815782433620675","avatar":"/images/avatars/svg/starky-ultimate.svg"},"text":"Wow this is a great chess bot. Even though I am higher rated then it O.o\n\nI was able to draw it even though it had much more pieces then me. But it said checkmate haha :P","locked":false,"pinned":false,"replies":[]},{"replyCount":0,"votes":1,"date":"2024-10-21T20:45:11.895223Z","author":{"name":"STARGAZZER","id":"kaid_42739736927648846330130","avatar":"/images/avatars/svg/primosaur-ultimate.svg"},"text":"I... Lost...","locked":false,"pinned":false,"replies":[]},{"replyCount":0,"votes":1,"date":"2024-10-21T22:00:27.854857Z","author":{"name":"Cavan P","id":"kaid_716488551714127278797372","avatar":"/images/avatars/svg/leaf-red.svg"},"text":"Very nice!\n\n1200 ELO feels like a very high estimate, honestly.  How is that calculated?  It started _decent_, but after a few moves, it started making bonehead trades and blundering random pieces.\nI'd like to see something that allows me to set the depth I want it to search at, if possible.  I saw something in your jsdelivr script that seems to suggest 'settings' exist.\n\nI'm working on a chess bot myself, though mine plays Glinski's variant of Hexagonal chess.  Might be able to find some ideas here...","locked":false,"pinned":false,"replies":[]}],"questions":[]}}