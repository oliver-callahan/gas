var json = {
    "code": "<!DOCTYPE html>\n<!--\n\n            WELCOME TO TCW 2024!\n\nHost: TDJ\nJudges: TDJ, HM Wogglebug TE, Quantum Cat, TBD, TBD, TBD.\n\nTCW is an annual team competition that runs in November-December.\nIt consists of 4 challenges & 2 mini challenges, lasting for 5 weeks in total.\n\nHave any questions? Post them in the questions section of the comments & I'll get back to you as soon as I can! =]\n\nTEAM HOMEPAGES:\n    Delfin: TBD\n    Echolite: TBD\n    Foxin: TBD\n\nCREDITS:\n    Bluebird - thumbnail script\n    Gray Wolf - sorting by name\n    w3schools - search function on participants page, prevent default function thing\n    Iron Programming - copy string function\n\n-->\n<html lang=\"en\">\n    <head>\n        <meta charset=\"utf-8\">\n        <title>The Code Wars 2024</title>\n        \n        <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n        <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n        <link href=\"https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Black+Ops+One&family=Material+Icons&display=swap\" rel=\"stylesheet\">\n        \n        <!-- Setup styling -->\n        <style>\n            * {\n                overflow-x: hidden;\n                scroll-behavior: smooth;\n            }\n            html {\n                margin: -10px -10px;\n            }\n            body {\n                font-family: \"Roboto\", sans-serif;\n            }\n            \n            ::-webkit-scrollbar {\n                background: white;\n                width: 8px;\n            }\n            ::-webkit-scrollbar-thumb {\n                background: #DB1733;\n                border-radius: 4px;\n            }\n            \n            .page {\n                padding: 50px 20px 10px 20px;\n            }\n            \n            h1, h2, h3 {\n                font-family: \"Roboto\", sans-serif;\n                font-weight: 400;\n                text-shadow: 0px 0px 4px #AAA;\n            }\n            h1 {\n                margin-bottom: -10px;\n            }\n            h2 {\n                margin-bottom: -8px;\n            }\n            \n            a {\n                color: #DB1744;\n                font-weight: 500;\n            }\n            a:hover {\n                color: #BA1744;\n            }\n        </style>\n        <!-- Header styling -->\n        <style>\n            header {\n                position: fixed;\n                top: 0px;\n                left: 0px;\n                width: 100%;\n                z-index: 1;\n            }\n            \n            nav {\n                display: flex;\n                background: #EA1744;\n                color: white;\n            }\n            nav a {\n                padding: 20px;\n                color: white;\n                text-decoration: none;\n            }\n            nav a:hover {\n                cursor: pointer;\n                background: #DB1744;\n                color: white;\n            }\n            \n            #news-banner {\n                background: #EDB230;\n                display: block;\n                padding: 10px;\n                color: #444;\n                font-weight: 700;\n            }\n            #close-news-banner {\n                padding-top: 0px;\n                text-decoration: none;\n                color: darkslategray;\n                float: right;\n                font-size: 20px;\n                transition: 0.3s all;\n            }\n            #close-news-banner:hover {\n                transform: scale(1.2);\n            }\n        </style>\n        <!-- Home page styling -->\n        <style>\n            #i-need-a-herooo {\n                margin: 15px -20px 0px -20px;\n                background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Programming.jpg/800px-Programming.jpg');\n                background-size: cover;\n                background-repeat: no-repeat;\n                border-bottom: 40px solid #EA1744;\n            }\n            #i-need-a-herooo h1 {\n                margin: 0px;\n                background: linear-gradient(#0004, #0008);\n                text-align: center;\n                -webkit-text-stroke: 4px white;\n                text-stroke: 4px solid white;\n                text-shadow: 0px 0px 20px white;\n                font-family: \"Black Ops One\";\n                font-size: 88px;\n                font-weight: 500;\n                padding: 145px 20px 135px 20px;\n                color: #EA1744;\n            }\n            \n            #comp-stats {\n                background: #DB1744;\n                display: flex;\n                text-align: center;\n                padding: 30px 30px 30px 100px;\n                border-radius: 30px;\n                color: white;\n                font-size: 20px;\n                font-weight: 600;\n                box-shadow: 0px 0px 10px black;\n                transition: 0.5s all;\n            }\n            #comp-stats:hover {\n                transform: scale(1.02);\n                cursor: pointer;\n            }\n            #comp-stats div {\n                padding-right: 50px;\n            }\n            \n            #joinup {\n                background: #DB1744;\n                display: flex;\n                height: 28px;\n                padding: 30px;\n                text-align: center;\n                border-radius: 30px;\n                color: white;\n                font-size: 20px;\n                font-weight: 600;\n                box-shadow: 0px 0px 10px black;\n                transition: 0.5s all;\n            }\n            #joinup h2 {\n                margin-top: -5px;\n                padding-right: 400px;\n            }\n            #joinup:hover {\n                transform: scale(1.02);\n                cursor: pointer;\n            }\n        </style>\n        <!-- Teams page styling -->\n        <style>\n            .avatar-lineup {\n                display: inline;\n            }\n            .avatar-lineup img {\n                width: 100px;\n            }\n        </style>\n        <!-- Join page styling -->\n        <style>\n            label {\n                font-weight: bold;\n            }\n            select, input {\n                background: #EA1744;\n                color: white;\n                margin-bottom: 5px;\n                padding: 2px;\n                border: none;\n            }\n            input {\n                border: 1px solid slategray;\n            }\n            input:focus {\n                outline: 0;\n            }\n            ::placeholder {\n                color: white;\n            }\n            \n            #submit-joinform {\n                margin-left: 220px;\n                margin-bottom: 20px;\n                background: #EA1744;\n                color: white;\n                font-weight: bold;\n                font-size: 20px;\n                padding: 10px 30px;\n                border: none;\n                border-radius: 6px;\n                transition: 0.5s;\n            }\n            #submit-joinform:hover {\n                cursor: pointer;\n                box-shadow: 0px 2px 8px darkslategray;\n            }\n        </style>\n        <!-- Challenges page styling -->\n        <style>\n            .challenge {\n                margin-top: -10px;\n            }\n            .challenge h2 {\n                background: #EA1744;\n                color: white;\n                font-weight: 500;\n                padding: 5px 8px;\n                margin-left: 20px;\n                margin-bottom: -25px;\n            }\n            .challenge p {\n                width: 90%;\n                border: dashed #EA1744;\n                padding: 15px;\n            }\n        </style>\n        <!-- Participants page styling -->\n        <style>\n            table {\n                margin-bottom: 5px;\n            }\n            th {\n                text-align: left;\n            }\n            \n            .participant {\n                overflow: hidden;\n                width: 540px;\n                height: 50px;\n                border: 1px dashed;\n                border-radius: 10px;\n                margin-bottom: 10px;\n                transition: 1s all;\n            }\n            .participant:hover {\n                background: #EEE;\n            }\n            \n            .participant-link {\n                position: absolute;\n                margin-left: 10px;\n                margin-top: 16px;\n            }\n            .participant-img {\n                width: 50px;\n                margin-left: 5px;\n            }\n            .participant-level {\n                position: absolute;\n                margin-top: 16px;\n                left: 300px;\n            }\n            .participant-points {\n                position: absolute;\n                margin-top: 16px;\n                right: 60px;\n            }\n            \n            #show-score {\n                background: #0006;\n                position: fixed;\n                left: 0px;\n                top: 0px;\n                z-index: 1;\n                padding-top: 100px;\n                padding-left: 100px;\n                width: 700px;\n                height: 700px;\n            }\n            #show-score-box {\n                background: white;\n                width: 400px;\n                height: 400px;\n            }\n            #show-score-info {\n                margin-top: -20px;\n                padding: 20px;\n            }\n            #show-score-close {\n                position: absolute;\n                top: 100px;\n                left: 460px;\n                font-size: 40px;\n            }\n        </style>\n        <!-- Judging page styling -->\n        <style>\n            #judges {\n                display: grid;\n                grid-template-columns: auto auto;\n                padding: 10px 10%;\n            }\n            \n            .judge {\n                margin: 10% 10%;\n                overflow: hidden;\n                width: 170px;\n                height: 240px;\n                background: #555;\n                border: 2px solid #EA1744;\n                box-shadow: 0px 0px 10px #EA1744;\n                border-radius: 10px;\n                color: white;\n                text-decoration: none;\n                text-align: center;\n                transition: 0.5s all;\n            }\n            .judge:hover {\n                color: white;\n                transform: scale(1.05);\n            }\n            .judge img {\n                max-width: 130px;\n                margin-top: 0px;\n                margin-bottom: -30px;\n            }\n            .judge-info {\n                padding: 5px;\n            }\n            .judge h3 {\n                text-shadow: 0px 0px 5px white;\n                margin-bottom: -5px;\n            }\n        </style>\n    </head>\n    \n    <body>\n        <!-- Header -->\n        <header>\n            <div id=\"news-banner\">\n                <span id=\"news-message\"></span>\n                <a href=\"javascript: closeBanner()\" id=\"close-news-banner\" class=\"material-icons\">close</a>\n            </div>\n            \n            <nav>\n                <a href=\"javascript: changePage(0)\" class=\"material-icons\" title=\"Home\">home</a>\n                <a href=\"javascript: changePage(1)\" class=\"material-icons\" title=\"Teams\">bug_report</a>\n                <a href=\"javascript: changePage(2)\" class=\"material-icons\" title=\"Join\">group_add</a>\n                <a href=\"javascript: changePage(3)\" class=\"material-icons\" title=\"Challenges\">playlist_add_check</a>\n                <a href=\"javascript: changePage(4)\" class=\"material-icons\" title=\"Participants\">groups</a>\n                <a href=\"javascript: changePage(5)\" class=\"material-icons\" title=\"Scores\">leaderboard</a>\n                <a href=\"javascript: changePage(6)\" class=\"material-icons\" title=\"Judging\">gavel</a>\n            </nav>\n        </header>\n        \n        <!-- Home page -->\n        <div class=\"page\">\n            <div id=\"i-need-a-herooo\">\n                <h1>THE CODE WARS 2024</h1>\n            </div>\n            \n            <h1>Welcome to TCW 2024!</h1>\n            \n            <h2>What is TCW?</h2>\n            <p>The Code Wars (TCW) is an annual team coding competition is hosted by <a href=\"https://www.khanacademy.org/profile/kaid_682972421482671044758972/projects\" target=\"_blank\">TDJ</a>.<br></p>\n            \n            <h2>TCW Stats</h2><br>\n            <div id=\"comp-stats\">\n                <div><span class=\"material-icons\">people</span><br>175+ participants</div><!--178 participants-->\n                <div><span class=\"material-icons\">terminal</span><br>190+ entries</div><!--191 entries-->\n            </div>\n            \n            <h2>How does it work?</h2>\n            <p>Each participant creates an entry for their team & submits it in the entry thread for the challenge. These entries are scored & the points added to the team's total. The team with the most points at the end wins!</p>\n            \n            <div id=\"joinup\" onclick=\"javascript: changePage(1)\">\n                <h2>JOIN</h2>\n                <span class=\"material-icons\">keyboard_double_arrow_right</span>\n            </div>\n        </div>\n        \n        <!-- Teams page -->\n        <div class=\"page\">\n            <h1>Teams</h1>\n            \n            <h2><a href=\"https://www.khanacademy.org/computer-programming/avatar-for-shatter/6274676578107392\" target=\"_blank\">Delfin</a></h2><br>\n            <div class=\"avatar-lineup\">\n                <img src=\"https://www.khanacademy.org/computer-programming/spin-off-of-delfin-redo-seed/6147299433431040/latest.png\">\n                <img src=\"https://www.khanacademy.org/computer-programming/spin-off-of-delfin-redo-seedling/6411448403017728/latest.png\">\n                <img src=\"https://www.khanacademy.org/computer-programming/spin-off-of-delfin-redo-sapling/6504553093447680/latest.png\">\n                <img src=\"https://www.khanacademy.org/computer-programming/spin-off-of-delfin-redo-tree/4906544341630976/latest.png\">\n                <img src=\"https://www.khanacademy.org/computer-programming/spin-off-of-delfin-redo-ultimate/4569475014639616/latest.png\">\n            </div><br>\n            <strong>Creator: <a href=\"https://www.khanacademy.org/profile/kaid_714276242204949021450419/projects\" target=\"_blank\">Ace Rogers</a></strong>\n            <p>The Delfin is a new species of Dolphin. The Delfin leaves deep down in the sea, preferring to keep to themselves. They live in packs and if danger or a challange appears, they work together to defeat it.<br><br>Being built mostly like a Dolphin, Delfin has spikes that grow out of their backs when they are fully grown. They also have designs on their scales.<br><br>Some of their favorite things to do are to play around with other Delfins, hunting for their food and defending their friends and homes.</p>\n            \n            <h2><a href=\"https://www.khanacademy.org/computer-programming/i/4974893918109696\" target=\"_blank\">Echolite</a></h2><br>\n            <div class=\"avatar-lineup\">\n                <img src=\"https://www.khanacademy.org/computer-programming/echolite-seed/5109190787514368/latest.png\">\n                <img src=\"https://www.khanacademy.org/computer-programming/echolite-seedling/6518104578768896/latest.png\">\n                <img src=\"https://www.khanacademy.org/computer-programming/echolite-sapling/6576545661108224/latest.png\">\n                <img src=\"https://www.khanacademy.org/computer-programming/echolite-tree/6435808172752896/latest.png\">\n                <img src=\"https://www.khanacademy.org/computer-programming/echolite-ultimate/6581001958113280/latest.png\">\n            </div><br>\n            <strong>Creator: <a href=\"https://www.khanacademy.org/profile/kaid_659800661397715681487277/projects\" target=\"_blank\">Samwise</a></strong>\n            <p>Echolites are reasonably small, feathered Avatars. They live in the rainforest canopy, eating small insects and drinking nectar. You have to be lucky to ever spot them, as they're very elusive and well camouflaged. They love to hover in place like hummingbirds. Echolites are allies to many other avatars. They prefer to remain peaceful at all times. They take good care of their young, and are fiercely loyal. They aways have each other's back. All for one, and one for all!</p>\n            \n            <h2><a href=\"https://www.khanacademy.org/computer-programming/foxin/6499781393170432\" target=\"_blank\">Foxin</a></h2><br>\n            <div class=\"avatar-lineup\">\n                <img src=\"https://www.khanacademy.org/computer-programming/spin-off-of-foxin-seed/4774518598844416/latest.png\">\n                <img src=\"https://www.khanacademy.org/computer-programming/spin-off-of-foxin-seedling/4925415563902976/latest.png\">\n                <img src=\"https://www.khanacademy.org/computer-programming/spin-off-of-foxin-sapling/5667073033158656/latest.png\">\n                <img src=\"https://www.khanacademy.org/computer-programming/spin-off-of-foxin-tree/6572573035773952/latest.png\">\n                <img src=\"https://www.khanacademy.org/computer-programming/spin-off-of-foxin-ultimate/6155493056626688/latest.png\">\n            </div><br>\n            <strong>Creator: <a href=\"https://www.khanacademy.org/profile/kaid_714276242204949021450419/projects\" target=\"_blank\">Ace Rogers</a></strong>\n            <p>The Foxins are sneaky and smart. They lurk in the shadows then attack their foes by surprise, coming at them in huge numbers. They do whatever they can to have the upper hand.<br><br>Being a special breed of Fox, they have big ears that allow them to hear very well. Their fur comes in orange, brown and white. Their eyes are keen on details.<br><br>Some of their favorite things to do is to tackle other of their kind, hunting, confusing their enemies.</p>\n        </div>\n        \n        <!-- Join page -->\n        <div class=\"page\">\n            <h1>Join</h1>\n            \n            <p>Please note that not all teams will be available at times. Sometimes options will be restricted, in order to even teams out.</p>\n            \n            <form id=\"join-form\" style=\"margin-top: 10px\">\n                <label for=\"join-level\">Level:</label>\n                <select id=\"join-level\" required>\n                    <option value=\"0\">Beginner</option>\n                    <option value=\"1\">Familiar</option>\n                    <option value=\"2\">Intermediate</option>\n                    <option value=\"3\">Advanced</option>\n                    <option value=\"4\">Expert</option>\n                </select><br>\n                \n                <label for=\"join-team\">Team:</label>\n                <select id=\"join-team\" required>\n                    <option value=\"Delfin\">Delfin</option>\n                    <option value=\"Echolite\">Echolite</option>\n                    <option value=\"Foxin\">Foxin</option>\n                </select>\n                <p style=\"display: inline; margin-left: 10px\">View the teams <a href=\"javascript: changePage(1)\">here</a>.</p><br>\n                \n                <label for=\"join-name\">Name:</label>\n                <input id=\"join-name\" placeholder=\"Name\" required><br>\n                \n                <label for=\"join-kaid\">KA ID:</label>\n                <input id=\"join-kaid\" placeholder=\"KA ID\" required><p style=\"display: inline; margin-left: 10px\">You can find your KA ID <a href=\"https://www.khanacademy.org/support\" target=\"_blank\">here</a>.</p><br>\n                \n                <br>\n\n                <strong style=\"color: #EA1744\">Your join code will be automatically copied to your clipboard. Please paste this (control + v / command + v) in a comment in the join thread in the Tips & Thanks tab of the comments.</strong>\n\n                <br><br>\n                \n                <button type=\"submit\" id=\"submit-joinform\" onclick=\"javascript: copyJoinCode()\">Submit</button><br>\n\n                <p>Note: You will not be added to the participants list immediately. Please be patient & I will add you within a day or two. =]</p>\n            </form>\n            \n            <!--Join Code-->\n            <script>\n                // don't do stupid stuff =P (credit to w3schools)\n                document.getElementById(\"submit-joinform\").addEventListener(\"click\", function(event){\n                    event.preventDefault();\n                });\n                \n                // create join code\n                function copyJoinCode() {\n                    var teamName = document.getElementById(\"join-team\").value;;\n                    var Level = document.getElementById(\"join-level\").value;\n                    var Name = document.getElementById(\"join-name\").value;\n                    var Kaid = document.getElementById(\"join-kaid\").value;\n                    var joinCode = \"{name: '\" + Name + \"', kaid: '\" + Kaid + \"',team: '\" + teamName + \"',level: \" + Level + \",points: [0,0,0,0,0,0],},\";\n                    copyStringToClipboard(joinCode);\n                    changePage(0);\n                }\n        \n                //Credit to Iron Programming\n                function copyStringToClipboard(str) {\n                    // Create new element\n                    var el = document.createElement('textarea');\n                    // Set value (string to be copied)\n                    el.value = str;\n                    // Set non-editable to avoid focus and move outside of view\n                    el.setAttribute('readonly', '');\n                    el.style = {\n                        position: 'absolute',\n                        left: '-9999px'\n                    };\n                    document.body.appendChild(el);\n                    // Select text inside element\n                    el.select();\n                    // Copy text to clipboard\n                    document.execCommand('copy');\n                    // Remove temporary element\n                    document.body.removeChild(el);\n                }\n            </script>\n        </div>\n        \n        <!-- Challenges page -->\n        <div class=\"page\">\n            <h1>Challenges</h1>\n            <p>Challenges are scored out of 10 points, mini challenges out of 5.<br>Entries can be webages, PJS, SQL or Python, unless otherwise specified.<br>Challenges are due at 11:59pm EST.</p>\n            \n            <div class=\"challenge\">\n                <h2>Homepage Challenge (Challenge 0)</h2>\n                <p>Create a homepage for your team.<br><em>11-18 November</em></p>\n            </div>\n            \n            <div class=\"challenge\">\n                <h2>Challenge 1 - Team Avatar</h2>\n                <p>Use your team avatar in a program.<br><em>18-25 November</em></p>\n            </div>\n            \n            <div class=\"challenge\">\n                <h2>Challenge 2 - Python</h2>\n                <p>Create a <a href=\"https://www.khanacademy.org/computing/intro-to-python-fundamentals\" target=\"_blank\">Python program</a>!<br><em>25 November - 2 December</em></p>\n            </div>\n            \n            <div class=\"challenge\">\n                <h2>Challenge 3 - Collaboration</h2>\n                <p>Your team will split into groups, and each group will work on an entry together. There must be at least 2 people in each group, & each user can only be in one group.<br><em>2-16 December</em></p>\n            </div>\n            \n            <div class=\"challenge\">\n                <h2>Mini Challenge 1 - CSS Challenge</h2>\n                <p>Using the <a href=\"https://www.khanacademy.org/computer-programming/css-challenge-tcw-2024/5827215561244672\" target=\"_blank\">template</a>, add CSS to the webpage to bring it to life! You can only modify the CSS.<br><em>2-9 December</em></p>\n            </div>\n            \n            <div class=\"challenge\">\n                <h2>Mini Challenge 2 - 100 Lines</h2>\n                <p>Create a program in just 100 lines of code.<br><em>9-16 December</em></p>\n            </div>\n        </div>\n        \n        <!-- Participants page -->\n        <div class=\"page\">\n            <h1>Participants</h1>\n            \n            <h3>Search participants:</h3>\n            <input id=\"search\" type=\"text\" placeholder=\"Search...\">\n            \n            <br><br>\n            \n            <table>\n                <thead>\n                    <th><a href=\"javascript: sortByTeam()\">Team</a></th>\n                    <th><a href=\"javascript: sortByName()\" style=\"margin-left: 18px\">Name</a></th>\n                    <th><a href=\"javascript: sortByLevel()\" style=\"margin-left: 170px\">Level</a></th>\n                    <th><a href=\"javascript: sortByPoints()\" style=\"margin-left: 150px\">Points</a></th>\n                </thead>\n            </table>\n            \n            <!-- list of participants -->\n            <div id=\"participants-table\"></div>\n            \n            <!-- detailed view of participant scores -->\n            <div id=\"show-score\">\n                <div id=\"show-score-box\">\n                    <div id=\"show-score-info\"></div>\n                </div>\n                <a href=\"javascript: closeScoreBox()\" id=\"show-score-close\" class=\"material-icons\">close</a>\n            </div>\n        </div>\n        \n        <!-- Scores page -->\n        <div class=\"page\">\n            <h1>Scores</h1>\n            \n            <br>\n            \n            <canvas id=\"myChart\" style=\"width: 100%\"></canvas>\n            \n            <script src=\"https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js\"></script>\n            <script>\n                var xValues = [\"Delfin\", \"Echolite\", \"Foxin\"];\n                var yValues = [0, 0, 0, 0, 50];\n                var barColors = [\"skyblue\", \"#0A2\", \"darkorange\"];\n                \n                new Chart(\"myChart\", {\n                    type: \"bar\",\n                    data: {\n                        labels: xValues,\n                        datasets: [{\n                            backgroundColor: barColors,\n                            data: yValues\n                        }]\n                    },\n                    options: {\n                        legend: {\n                            display: false,\n                        },\n                    },\n                });\n            </script>\n        </div>\n        \n        <!-- Judging page -->\n        <div class=\"page\">\n            <h1>Judging</h1>\n            \n            <h2>Criteria</h2>\n            <ul>\n                <li>Complexity</li>\n                <li>Readability</li>\n                <li>Graphics</li>\n                <li>Interactivity</li>\n                <li>Efficiency</li>\n            </ul>\n            \n            <h2>Judges</h2>\n            <div id=\"judges\">\n                <a class=\"judge\" href=\"https://www.khanacademy.org/profile/kaid_682972421482671044758972/projects\" target=\"_blank\">\n                    <img src=\"https://cdn.kastatic.org/images/avatars/svg/boggle-green.svg\">\n                    <div class=\"judge-info\">\n                        <h3>TDJ</h3>\n                        <p>The host.</p>\n                    </div>\n                </a>\n                \n                <a class=\"judge\" href=\"https://www.khanacademy.org/profile/kaid_9428127706426004539463954/projects\" target=\"_blank\">\n                    <img src=\"https://cdn.kastatic.org/images/avatars/svg/stelly-yellow.svg\">\n                    <div class=\"judge-info\">\n                        <h3>Quantum Cat</h3>\n                        <p>Creator of cool games and graphics in both JS and Python.</p>\n                    </div>\n                </a>\n                \n                <a class=\"judge\" href=\"https://www.khanacademy.org/profile/kaid_2128909595278771717919649/projects\" target=\"_blank\">\n                    <img src=\"https://cdn.kastatic.org/images/avatars/svg/boggle-green.svg\">\n                    <div class=\"judge-info\">\n                        <h3>HM Wogglebug TE</h3>\n                        <p>Math enthusiast & programming guru.</p>\n                    </div>\n                </a>\n                \n                <!--<a class=\"judge\" href=\"https://www.khanacademy.org/profile/kaid_682972421482671044758972/projects\" target=\"_blank\">\n                    <img src=\"https://cdn.kastatic.org/images/avatars/svg/boggle-green.svg\">\n                    <div class=\"judge-info\">\n                        <h3>TDJ</h3>\n                        <p>The host.</p>\n                    </div>\n                </a>\n                \n                <a class=\"judge\" href=\"https://www.khanacademy.org/profile/kaid_682972421482671044758972/projects\" target=\"_blank\">\n                    <img src=\"https://cdn.kastatic.org/images/avatars/svg/boggle-green.svg\">\n                    <div class=\"judge-info\">\n                        <h3>TDJ</h3>\n                        <p>The host.</p>\n                    </div>\n                </a>-->\n            </div>\n        </div>\n        \n        <!-- Participants script -->\n        <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js\"></script>\n        <script>\n            var Participants = [\n                \n            ];\n            \n            var table = document.getElementById('participants-table');\n            \n            function createTable() {\n                table.innerHTML = \"\";\n                \n                for (var i = 0; i < Participants.length; i++) {\n                    var p = Participants[i];\n                    var img;\n                    var level;\n                    var total = Math.round(100 * (p.points[0] + p.points[1] + p.points[2] + p.points[3] + p.points[4] + p.points[5])) / 100;\n                    \n                    switch (p.team) {\n                        case \"Delfin\":\n                            switch (p.level) {\n                                case 0:\n                                    img = \"https://www.khanacademy.org/computer-programming/spin-off-of-delfin-redo-seed/6147299433431040/latest.png\";\n                                break;\n                                case 1:\n                                    img = \"https://www.khanacademy.org/computer-programming/spin-off-of-delfin-redo-seedling/6411448403017728/latest.png\";\n                                break;\n                                case 2:\n                                    img = \"https://www.khanacademy.org/computer-programming/spin-off-of-delfin-redo-sapling/6504553093447680/latest.png\";\n                                break;\n                                case 3:\n                                    img = \"https://www.khanacademy.org/computer-programming/spin-off-of-delfin-redo-tree/4906544341630976/latest.png\";\n                                break;\n                                case 4:\n                                    img = \"https://www.khanacademy.org/computer-programming/spin-off-of-delfin-redo-ultimate/4569475014639616/latest.png\";\n                                break;\n                            }\n                        break;\n                        \n                        case \"Echolite\":\n                            switch (p.level) {\n                                case 0:\n                                    img = \"https://www.khanacademy.org/computer-programming/echolite-seed/5109190787514368/latest.png\";\n                                break;\n                                case 1:\n                                    img = \"https://www.khanacademy.org/computer-programming/echolite-seedling/6518104578768896/latest.png\";\n                                break;\n                                case 2:\n                                    img = \"https://www.khanacademy.org/computer-programming/echolite-sapling/6576545661108224/latest.png\";\n                                break;\n                                case 3:\n                                    img = \"https://www.khanacademy.org/computer-programming/echolite-tree/6435808172752896/latest.png\";\n                                break;\n                                case 4:\n                                    img = \"https://www.khanacademy.org/computer-programming/echolite-ultimate/6581001958113280/latest.png\";\n                                break;\n                            }\n                        break;\n                        \n                        case \"Foxin\":\n                            switch (p.level) {\n                                case 0:\n                                    img = \"https://www.khanacademy.org/computer-programming/spin-off-of-foxin-seed/4774518598844416/latest.png\";\n                                break;\n                                case 1:\n                                    img = \"https://www.khanacademy.org/computer-programming/spin-off-of-foxin-seedling/4925415563902976/latest.png\";\n                                break;\n                                case 2:\n                                    img = \"https://www.khanacademy.org/computer-programming/spin-off-of-foxin-sapling/5667073033158656/latest.png\";\n                                break;\n                                case 3:\n                                    img = \"https://www.khanacademy.org/computer-programming/spin-off-of-foxin-tree/6572573035773952/latest.png\";\n                                break;\n                                case 4:\n                                    img = \"https://www.khanacademy.org/computer-programming/spin-off-of-foxin-ultimate/6155493056626688/latest.png\";\n                                break;\n                            }\n                        break;\n                    }\n                    \n                    switch(p.level) {\n                        case 0:\n                            level = \"Beginner\";\n                        break;\n                        case 1:\n                            level = \"Familiar\";\n                        break;\n                        case 2:\n                            level = \"Intermediate\";\n                        break;\n                        case 3:\n                            level = \"Advanced\";\n                        break;\n                        case 4:\n                            level = \"Expert\";\n                        break;\n                    }\n                    \n                    table.innerHTML += \"<div class='participant'><img src='\" + img + \"' class='participant-img'><a href='https://www.khanacademy.org/profile/\" + p.kaid + \"/projects' class='participant-link' target='_blank'>\" + p.name + \"</a><span class='participant-level'>\" + level + \"</span><a href='javascript:showScore(\" + i + \")' class='participant-points'>\" + total + \"</a></div>\";\n                }\n                \n                // when no participants 😭\n                if (Participants.length === 0) {\n                    table.innerHTML = \"<h3 style='margin-top: 0px'>No participants yet.</h3><br>\";\n                }\n            }\n            createTable();\n            \n            // sorting participants\n            var sortTeamMode = \"ascending\";\n            var sortNameMode = \"a-z\";\n            var sortLevelMode = \"ascending\";\n            var sortPointsMode = \"ascending\";\n            function sortByTeam() {\n                if (sortTeamMode === \"descending\") {\n                    sortTeamMode = \"ascending\";\n                } else {\n                    sortTeamMode = \"descending\";\n                }\n                \n                if (sortTeamMode === \"ascending\") {\n                    Participants.sort(function(a, b) {\n                        return a.team.toUpperCase() < b.team.toUpperCase() ? 1 : -1;\n                    });\n                } else {\n                    Participants.sort(function(a, b) {\n                        return a.team.toUpperCase() < b.team.toUpperCase() ? -1 : 1;\n                    });\n                }\n                \n                createTable();\n            }\n            function sortByName() {\n                if (sortNameMode === \"z-a\") {\n                    sortNameMode = \"a-z\";\n                } else {\n                    sortNameMode = \"z-a\";\n                }\n                \n                // credit to Gray Wolf for name sorting\n                if (sortNameMode === \"z-a\") {\n                    Participants.sort(function(a, b) {\n                        return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;\n                    });\n                } else {\n                    Participants.sort(function(a, b) {\n                        return a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1;\n                    });\n                }\n                \n                createTable();\n            }\n            function sortByLevel() {\n                if (sortLevelMode === \"descending\") {\n                    sortLevelMode = \"ascending\";\n                } else {\n                    sortLevelMode = \"descending\";\n                }\n                \n                if (sortLevelMode === \"ascending\") {\n                    Participants.sort(function(a, b) {\n                        return a.level - b.level;\n                    });\n                } else {\n                    Participants.sort(function(a, b) {\n                        return b.level - a.level;\n                    });\n                }\n                \n                createTable();\n            }\n            function sortByPoints() {\n                if (sortPointsMode === \"descending\") {\n                    sortPointsMode = \"ascending\";\n                } else {\n                    sortPointsMode = \"descending\";\n                }\n                \n                if (sortPointsMode === \"ascending\") {\n                    Participants.sort(function(a, b) {\n                        return (a.points[0] + a.points[1] + a.points[2] + a.points[3] + a.points[4] + a.points[5]) - (b.points[0] + b.points[1] + b.points[2] + b.points[3] + b.points[4] + b.points[5]);\n                    });\n                } else {\n                    Participants.sort(function(a, b) {\n                        return (b.points[0] + b.points[1] + b.points[2] + b.points[3] + b.points[4] + b.points[5]) - (a.points[0] + a.points[1] + a.points[2] + a.points[3] + a.points[4] + a.points[5]);\n                    });\n                }\n                \n                createTable();\n            }\n            \n            // showing detailed score view for participants\n            var scoreBox = document.getElementById('show-score');\n            var scoreBoxInfo = document.getElementById('show-score-info');\n            function showScore(user) {\n                var p = Participants[user];\n                var points = [];\n                for (var i = 0; i < p.points.length; i++) {\n                    points[i] = Math.round(100 * p.points[i])/100;\n                }\n                \n                // update stats/info\n                scoreBoxInfo.innerHTML = \"<h2>\" + p.name + \"</h2><br><strong>Homepage Challenge: </strong><span>\" + points[0] + \"</span><br><strong>Challenge 1: </strong><span>\" + points[1] + \"</span><br><strong>Challenge 2: </strong><span>\" + points[2] + \"</span><br><strong>Challenge 3: </strong><span>\" + points[3] + \"</span><br><strong>Mini Challenge 1: </strong><span>\" + points[4] + \"</span><br><strong>Mini Challenge 2: </strong><span>\" + points[5] + \"</span>\";\n                \n                scoreBox.style.display = \"block\";// show box\n            }\n            function closeScoreBox() {\n                scoreBox.style.display = \"none\";// hide box\n            }\n            closeScoreBox();\n            \n            // searching table\n            $(document).ready(function(){\n                $(\"#search\").on(\"keyup\", function() {\n                    var value = $(this).val().toLowerCase();\n                    $(\".participant\").filter(function() {\n                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)\n                    });\n                });\n            });\n        </script>\n        \n        <!-- News banner & page changing script -->\n        <script>\n            var pages = document.getElementsByClassName('page');\n            \n            var message = 0;\n            var news = [\n                \"Joining is open! <a href='javascript:changePage(2)'>Sign up</a> now!\",\n                \"🏠 The Homepage Challenge has begun!\",\n                \"Challenge 1 has begun!\",\n                \"Challenge 2 has begun!\",\n                \"Challenge 3 & Mini Challenge 1 has begun!\",\n                \"Mini Challenge 2 has begun!\",\n                \"⏲ Challenge 3 is due!\",\n                \"The <a href='' target='_blank'>results</a> have been posted! 🥳\",\n                \"TCW is over. Post a period (.) in the news thread to be notified of TCW 2025!\",\n            ];\n            var banner = document.getElementById('news-banner');\n            var newsMessage = document.getElementById('news-message');\n            \n            function addMessage() {\n                for (var i = 0; i < pages.length; i++) {\n                    pages[i].style.paddingTop = \"90px\";\n                }\n                newsMessage.innerHTML = news[message];\n            }\n            addMessage();\n            function closeBanner() {\n                for (var i = 0; i < pages.length; i++) {\n                    pages[i].style.paddingTop = \"50px\";\n                }\n                banner.style.display = \"none\";\n            }\n            \n            function changePage(index) {\n                for (var i = 0; i < pages.length; i++) {\n                    pages[i].style.display = 'none';\n                }\n                pages[index].style.display = 'block';\n                window.scroll(0, 0);\n            }\n            changePage(0);\n        </script>\n        \n        <!--The Thumbnail Script 2.1.0 12/18/2023 by Bluebird@kaid_157624541333313939750668--><script src=\"https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js\"></script><script type>var r=600,s=document.documentElement.clientWidth;window.parent.html2canvas=t=>{try{html2canvas(document.body,{width:s,height:s,useCORS:!0,onclone:t=>t.getAnimations().forEach((t=>{try{t.finish()}catch{}}))}).then((t=>{var e=document.createElement(\"canvas\");e.width=r,e.height=r,e.getContext(\"2d\").drawImage(t,0,0,t.width,t.height,0,0,r,r),window.top.postMessage(e.toDataURL(),\"*\")})).catch((t=>{alert(\"Thumbnail Script Error: \"+t)}))}catch{window.top.postMessage(document.createElement(\"canvas\").toDataURL(),\"*\")}};</script>\n    </body>\n</html>\n",
    "title": "The Code Wars 2024",
    "votes": 25,
    "created": "9 hours ago",
    "updated": "5 hours ago",
    "type": "HTML",
    "author": {
        "name": "TDJ",
        "id": "kaid_682972421482671044758972",
        "avatar": "/images/avatars/svg/boggle-green.svg"
    },
    "dimensions": {
        "width": 600,
        "height": 600
    },
    "forks": [
        {
            "title": "My join code",
            "id": "6652300132007936",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "~The Wolf~",
                "id": "kaid_6337778158362361978377342"
            }
        }
    ],
    "posts": {
        "tips": [
            {
                "replyCount": 0,
                "votes": 12,
                "date": "9 hours ago",
                "author": {
                    "name": "TDJ",
                    "id": "kaid_682972421482671044758972",
                    "avatar": "/images/avatars/svg/boggle-green.svg"
                },
                "text": "<b>NEWS THREAD</b><br><br><em>Subscribe for the latest contest news & announcements by posting a single period (.) as a reply to this thread.<br><br>Please do not post here otherwise.<br><br>Please keep this thread at the top.</em>",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 6,
                "votes": 11,
                "date": "9 hours ago",
                "author": {
                    "name": "TDJ",
                    "id": "kaid_682972421482671044758972",
                    "avatar": "/images/avatars/svg/boggle-green.svg"
                },
                "text": "<b>JOIN THREAD</b><br><br><em>Post your join code here. Please do not modify it in any way. To ensure that your join code is not hidden, you may need to add some extra filler text after it.<br><br><b>*Note: you may be asked to switch teams</b>.<br><br>Please keep this thread at the top.</em>",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "3 hours ago",
                        "author": {
                            "name": "YokieBob",
                            "id": "kaid_681887786554114354822051",
                            "avatar": "/images/avatars/svg/marcimus-red.svg"
                        },
                        "text": "{name: 'Yokiebob', kaid: 'kaid_681887786554114354822051',team: 'Echolite',level: 3,points: [0,0,0,0,0,0],},<br>Am I the first joiner?"
                    },
                    {
                        "date": "3 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "{name: 'The Former Wizard of Oz', kaid: 'kaid_981854986090143486946241',team: 'Echolite',level: 2,points: [0,0,0,0,0,0],},<br>Never joined before."
                    },
                    {
                        "date": "3 hours ago",
                        "author": {
                            "name": "Hokeycat",
                            "id": "kaid_438466413527508491816275",
                            "avatar": "/images/avatars/svg/blobby-green.svg"
                        },
                        "text": "{name: 'Hokeycat', kaid: 'kaid_438466413527508491816275',team: 'Echolite',level: 3,points: [0,0,0,0,0,0],},<br>3rd joiner, also I feel that I need to add the last punctiation that hasn't been done... (!)"
                    },
                    {
                        "date": "3 hours ago",
                        "author": {
                            "name": "cwalsh1223 BBB#",
                            "id": "kaid_792288208072906614241148",
                            "avatar": "/images/avatars/svg/spunky-sam-red.svg"
                        },
                        "text": "{name: 'cwalsh1223', kaid: 'kaid_792288208072906614241148',team: 'Foxin',level: 2,points: [0,0,0,0,0,0],},"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "SnackerDavis",
                            "id": "kaid_889584744100087037395082",
                            "avatar": "/images/avatars/svg/robot_female_2.svg"
                        },
                        "text": "{name: 'Snacker Davis', kaid: ' kaid_889584744100087037395082',team: 'Delfin',level: 2,points: [0,0,0,0,0,0],},"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Animator101",
                            "id": "kaid_457601383838709034574070",
                            "avatar": "/images/avatars/svg/piceratops-ultimate.svg"
                        },
                        "text": "{name: 'Animator101', kaid: 'kaid_457601383838709034574070',team: 'Delfin',level: 3,points: [0,0,0,0,0,0],},<br><br>This looks like it could be fun :D<br>If I don't get to be a judge then use this application, but imma also apply to be a judge :)"
                    }
                ]
            },
            {
                "replyCount": 2,
                "votes": 7,
                "date": "6 hours ago",
                "author": {
                    "name": "TDJ",
                    "id": "kaid_682972421482671044758972",
                    "avatar": "/images/avatars/svg/boggle-green.svg"
                },
                "text": "<b>JUDGE APPLICATION THREAD</b><br><br><em>To apply to be a judge, post the links to 2 programs that you have created that best showcase your ability.</em>",
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
                        "text": "Well my best current program is Collab haha :P<br><br>Here is probably my best: https://www.khanacademy.org/computer-programming/for-freedoms-cause-ft-vvhitetiger/6060441058590720<br><br>Here is probably my favorite to make but not sure if it would count as my best: https://www.khanacademy.org/computer-programming/french-cultureka-contest-submission/6665298894045184<br><br>I know JS well, webpages pretty good, and python well."
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Animator101",
                            "id": "kaid_457601383838709034574070",
                            "avatar": "/images/avatars/svg/piceratops-ultimate.svg"
                        },
                        "text": "My best...<br>Hmm<br><br>Here's a physics engine I wrote ~6 months ago<br>https://www.khanacademy.org/computer-programming/physics-engine/5450620616884224<br><br>Here's a really cool but also currently unrealistic fluid motion simulator(it's unrealistic because fluids, at least liquids, are generally incompressible).<br>https://www.khanacademy.org/computer-programming/fluid-motion/5797975958405120<br><br>I'm rather good at PJS(not as good as YokieBob and such, but I'd say I'm fairly good at it), I know how to do CSS, HTML, and JS for webpages, I am somewhat familiar with SQL, I know python, and in addition to that(languages outside of KA), I know C++, C, C#, a bit of Ruby, a bit of Rust, and a few others :)"
                    }
                ]
            },
            {
                "replyCount": 8,
                "votes": 7,
                "date": "9 hours ago",
                "author": {
                    "name": "TDJ",
                    "id": "kaid_682972421482671044758972",
                    "avatar": "/images/avatars/svg/boggle-green.svg"
                },
                "text": "<b>TEAM ECHOLITE DISCUSSION THREAD</b><br><br><em>This is a temporary discussion thread for Team Echolite members, until their team homepage has been decided.<br><br>Only post here if you have joined Team Echolite.</em>",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "3 hours ago",
                        "author": {
                            "name": "YokieBob",
                            "id": "kaid_681887786554114354822051",
                            "avatar": "/images/avatars/svg/marcimus-red.svg"
                        },
                        "text": "Hello team!"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Xatnys",
                            "id": "kaid_3144599174897393521218325",
                            "avatar": "/images/avatars/svg/boggle-yellow.svg"
                        },
                        "text": "I am here."
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Xatnys",
                            "id": "kaid_3144599174897393521218325",
                            "avatar": "/images/avatars/svg/boggle-yellow.svg"
                        },
                        "text": "@Oz<br><br>That's wacky.  I did comment in the join thread and have been recieving notifications when other people join.  I looked at the thread in another browser and it did not have my comment.  I'm guessing someone flagged it or something.  idk"
                    },
                    {
                        "date": "an hour ago",
                        "author": {
                            "name": "Xatnys",
                            "id": "kaid_3144599174897393521218325",
                            "avatar": "/images/avatars/svg/boggle-yellow.svg"
                        },
                        "text": "@Oz<br><br>I've tried four times and it isn't showing up.  I even tried copying Animator101 's filler text, but it still didn't go through."
                    },
                    {
                        "date": "an hour ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Ok, I can post it for you. What's your skill level?<br><br>EDT: I posted it. I am going to delete my other comments to reduce the scrolling for later."
                    },
                    {
                        "date": "44 minutes ago",
                        "author": {
                            "name": "Xatnys",
                            "id": "kaid_3144599174897393521218325",
                            "avatar": "/images/avatars/svg/boggle-yellow.svg"
                        },
                        "text": "Thanks, I put 3."
                    },
                    {
                        "date": "27 minutes ago",
                        "author": {
                            "name": "Karthikeya K #BringBackBackgrounds",
                            "id": "kaid_6258990316746013677705461",
                            "avatar": "/images/avatars/svg/stelly-blue.svg"
                        },
                        "text": "Hello team! I started on a draft for Challenge 0: <br><br>https://www.khanacademy.org/computer-programming/team-echolite-homepage-wip/5292946371821568"
                    },
                    {
                        "date": "14 minutes ago",
                        "author": {
                            "name": "Hokeycat",
                            "id": "kaid_438466413527508491816275",
                            "avatar": "/images/avatars/svg/blobby-green.svg"
                        },
                        "text": "Nice job so far Karthikeya K!"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 7,
                "date": "9 hours ago",
                "author": {
                    "name": "TDJ",
                    "id": "kaid_682972421482671044758972",
                    "avatar": "/images/avatars/svg/boggle-green.svg"
                },
                "text": "<b>TEAM DELFIN DISCUSSION THREAD</b><br><br><em>This is a temporary discussion thread for Team Delfin members, until their team homepage has been decided.<br><br>Only post here if you have joined Team Delfin.</em>",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "SnackerDavis",
                            "id": "kaid_889584744100087037395082",
                            "avatar": "/images/avatars/svg/robot_female_2.svg"
                        },
                        "text": "im I the only one :("
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 7,
                "date": "9 hours ago",
                "author": {
                    "name": "TDJ",
                    "id": "kaid_682972421482671044758972",
                    "avatar": "/images/avatars/svg/boggle-green.svg"
                },
                "text": "<b>TEAM FOXIN DISCUSSION THREAD</b><br><br><em>This is a temporary discussion thread for Team Foxin members, until their team homepage has been decided.<br><br>Only post here if you have joined Team Foxin.</em>",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "5 minutes ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "umm I joined? I don't really know how this whole thing works, so yeah..."
                    }
                ]
            },
            {
                "replyCount": 2,
                "votes": 1,
                "date": "2 hours ago",
                "author": {
                    "name": "Mathlete11",
                    "id": "kaid_4902531429433401500771997",
                    "avatar": "/images/avatars/svg/starky-sapling.svg"
                },
                "text": "how exactly does this work? do you have to be accepted onto a team, or can you just join?",
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
                        "text": "You can just join. Go to the join section on the webpage above, and then choose the team you want to be on. I believe the rest is explained in the webpage."
                    },
                    {
                        "date": "21 minutes ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "ok. thank you"
                    }
                ]
            }
        ],
        "questions": [
            {
                "replyCount": 0,
                "votes": 1,
                "date": "2 hours ago",
                "author": {
                    "name": "SnackerDavis",
                    "id": "kaid_889584744100087037395082",
                    "avatar": "/images/avatars/svg/robot_female_2.svg"
                },
                "text": "Do we post our entry's in our team chat thread or is there a thread that made for posting entry's?",
                "replies": [],
                "answers": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "2 hours ago",
                "author": {
                    "name": "SnackerDavis",
                    "id": "kaid_889584744100087037395082",
                    "avatar": "/images/avatars/svg/robot_female_2.svg"
                },
                "text": "Does the first challenge start today?",
                "replies": [],
                "answers": []
            }
        ]
    }
}