var json = {
    "code": "<!DOCTYPE html>\n<html>\n    <head>\n        <meta charset=\"utf-8\">\n        <title>ACT 2 (2x better)</title>\n        <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n        <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n        <link href=\"https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap\" rel=\"stylesheet\">\n        <link href=\"https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap\" rel=\"stylesheet\">\n        <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js\"></script>\n        \n        <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined\" />\n        <style>\n            .lightMode {\n                background-color: rgb(240, 240, 240);\n                color: rgb(59, 61, 66);\n            }\n            .darkMode {\n                background-color: rgb(59, 61, 66);\n                color: white;\n            }\n            body {\n                font-family: \"Montserrat\";\n                transition: 1s;\n            }\n            #mainDiv {\n                margin-top: 10vh;\n                height: 530px;\n                width: 98vw;\n                overflow-y: auto;\n            }\n            body::-webkit-scrollbar {\n                display: none; /* Hide the scrollbar */\n            }\n            .messagebody {\n                display: flex;\n                align-items: center;\n                margin-bottom: 10px;\n            }\n            .time {\n                opacity: 0.5;\n                font-size: 20;\n                margin-left: 1.5vw;\n            }\n            .avatar img {\n                background-color: rgba(0, 0, 0, 0);\n                width: 10vw;\n                margin-right: 3vw;\n                margin-left: 3vw;\n                margin-top: 4vh;\n            }\n            .name {\n                font-weight: bold;\n                font-size: 25px;\n            }\n            .message-text {\n                margin-left: 16vw;\n                margin-top: -5vh;\n                width: 75vw;\n            }\n            #navBar {\n                height: 10vh;\n                width: 100vw;\n                left: 0;\n                top: 0;\n                position: absolute;\n                font-family: \"Poppins\";\n                font-weight: 700;\n                font-size: 7.4vw;\n                text-align: center;\n                user-select: none;\n                transition: 1s;\n                display: table;\n            }\n            .navLightMode {\n                background-color: rgb(240, 240, 240);\n                border-bottom: solid gray 3px;\n            }\n            .navDarkMode {\n                background-color: rgb(59, 61, 66);\n                color: rgb(92, 101, 238);\n                border-bottom: solid black 3px;\n            }\n            span {\n                position: absolute;\n                right: 3vw;\n                top: 2.5vw;\n            }\n            .material-symbols-outlined {\n                font-size: 30px;\n            }\n        </style>\n    </head>\n    <body class=\"darkMode\">\n        <div class=\"navDarkMode\" id=\"navBar\">\n            KHANCORD\n            <span class=\"material-symbols-outlined\" onclick=\"changeMode()\">dark_mode</span>\n            <script>\n                var nav = document.getElementById(\"navBar\");\n                var mode = document.getElementsByClassName(\"material-symbols-outlined\")[0];\n                function changeMode(){\n                    if (mode.innerHTML === 'light_mode') {\n                        mode.innerHTML = 'dark_mode';\n                        document.body.className = \"darkMode\";\n                        nav.className = \"navDarkMode\";\n                    } else {\n                        mode.innerHTML = 'light_mode';\n                        document.body.className = \"lightMode\";\n                        nav.className = \"navLightMode\";\n                    }\n                }\n            </script>\n        </div>\n        <div id=\"mainDiv\"></div>\n        <script>\n            var people = [\n                {\n                    name: \"Weirdo\",\n                    c: \"rgb(130, 130, 250)\",\n                    avatar: \"creatures/OhNoes\"\n                },\n                {\n                    name: \"RandoDude\",\n                    c: \"rgb(255, 0, 0)\",\n                    avatar: \"avatars/marcimus\"\n                },\n                {\n                    name: \"wealR\",\n                    c: \"rgb(0, 138, 16)\",\n                    avatar: \"creatures/Hopper-Cool\"\n                },\n                {\n                    name: \"PlumpGeorge\",\n                    c: \"rgb(255, 204, 0)\",\n                    avatar: \"avatars/spunky-sam\"\n                },\n                {\n                    name: \"Crazy OJ\",\n                    c: \"rgb(255, 123, 0)\",\n                    avatar: \"avatars/orange-juice-squid\"\n                },\n                {\n                    name: \"Ezra\",\n                    c: \"rgb(199, 0, 46)\",\n                    avatar: \"avatars/leaf-red\"\n                }\n            ];\n            function getCurrentTime() {\n                const now = new Date();\n                const hours = String(now.getHours()).padStart(2, '0');\n                const minutes = String(now.getMinutes()).padStart(2, '0');\n                if (hours > 12) {\n                    return (hours - 12) + \":\" + minutes + \" PM\";\n                } else {\n                    return hours + \":\" + minutes + \" AM\";\n                }\n            }\n            function capital(string) {\n                return string.charAt(0).toUpperCase() + string.slice(1);\n            }\n            //{\n            var sentenceOpeners = [\"Hey,\", \"Man,\", \"lol,\", \"bro,\", \"Dude,\", \"Yo\", \"Beg your pardon,\"];\n            var sayThinkVerbs = [\"thinks\", \"said\", \"told me\", \"joked\", \"thought\", \"argued\", \"complained\", \"whispered\", \"meowed\", \"clucked\", \"gossiped\", \"screamed\", \"commanded me to tell you guys\", \"is 100% sure\", \"believes\", \"would be crazy if they thought\", \"is so smart that they think\", \"made up the idea\"];\n            var emojis = [\"XD\", \":(\", \">:)\", \":P\", \":3\", ';)'];\n            var ingTVerbs = [\"kicking\", \"loving\", \"killing\", \"hitting\", \"smashing\", \"following\", \"breaking\", \"constructing\", \n  \"encouraging\", \"talking to\", \"yelling at\", \"whispering to\", \"alluding to\", \"helping\", \"supporting\", \n  \"ignoring\", \"observing\", \"complimenting\", \"criticizing\", \"chasing\", \"befriending\", \"confronting\", \n  \"inspiring\", \"guiding\", \"mocking\", \"protecting\", \"teasing\", \"warning\", \"inviting\", \"challenging\", \n  \"persuading\", \"motivating\", \"applauding\", \"rejecting\", \"insulting\", \"comforting\", \"lecturing\", \n  \"admiring\", \"appreciating\", \"scolding\", \"befuddling\", \"misleading\", \"provoking\", \"taunting\", \n  \"celebrating with\", \"dancing with\", \"running from\", \"learning from\", \"consulting\", \"consoling\", \n  \"apologizing to\", \"discussing with\", \"competing with\", \"sharing with\", \"arguing with\", \"complaining to\"];\n            var pronouns = [\"my mom's\", \"my dad's\", \"my\", \"my best friend's\", \"a\", \"the\"];\n            for (var i = 0; i < people.length; i++) {\n                pronouns.push(people[i].name + \"'s\");\n            }\n            var nouns = [\n              \"ball\", \"bat\", \"cat\", \"dog\", \"computer\", \"chatGPT\", \"cheese\", \"program\", \"lamp\", \"cow\",\n              \"robot\", \"alien\", \"spaceship\", \"book\", \"tree\", \"phone\", \"pencil\", \"bottle\", \"guitar\", \"shoe\",\n              \"mountain\", \"ocean\", \"car\", \"bicycle\", \"building\", \"cloud\", \"camera\", \"piano\", \"drone\", \"desk\",\n              \"headphone\", \"rocket\", \"planet\", \"sun\", \"moon\", \"keyboard\", \"mouse\", \"dragon\",\n               \"zombie\", \"wizard\", \"castle\", \"candle\", \"umbrella\", \"notebook\", \"sandwich\", \"watch\",\n              \"sword\", \"shield\", \"cup\", \"plate\", \"window\", \"door\", \"treehouse\", \"telescope\", \"whistle\", \"balloon\",\n              \"umbrella\", \"skateboard\", \"giraffe\", \"elephant\", \"lion\", \"tiger\", \"dolphin\", \"penguin\", \"octopus\", \"bear\",\n              \"furniture\", \"sofa\", \"table\", \"chair\", \"broom\", \"brush\", \"pillow\", \"blanket\", \"wallet\", \"trophy\",\n              \"paintbrush\", \"journal\", \"globe\", \"map\", \"torch\", \"flashlight\", \"cactus\", \"flower\", \"sticker\", \"rock\",\n              \"pocket\", \"key\", \"coin\", \"flag\", \"rocket\", \"kite\", \"seashell\", \"bracelet\", \"ring\", \"scarf\", \n              \"helmet\", \"scooter\", \"camera\", \"drum\", \"saxophone\", \"violin\", \"cymbal\", \"clarinet\", \"harp\", \"trumpet\"\n            ];\n\n            var subjects = [\n              'computer', 'pet chicken', 'alien', 'teacher', 'mayor', 'neighbor', \n              'friend', \"state's governor\", 'dog', 'cat', 'scientist', 'artist', 'chef', 'student', \n              'doctor', 'nurse', 'engineer', 'parent', 'child', 'sibling', 'grandparent', 'cousin', 'boss', 'employee', 'athlete', 'musician', 'writer', 'journalist', \n              'activist', 'philosopher', 'explorer', 'pilot', 'ninja', 'robot', \n              'zombie', 'wizard', 'detective', 'superhero', 'king', 'merchant', 'farmer', 'hunter', 'fisherman', 'baker', 'carpenter', 'miner', 'craftsman', \n              'librarian', 'waiter', 'barista', 'broadcaster', 'programmer', 'blogger', \"role model\"\n            ];\n\n            var noPronounSubjects = [\"everybody\", \"a random person\",];\n            var articles = ['a', 'the', 'that', 'this', \"another\", \"a different\", \"a random\"];\n            var adjectives = [\"bad\", \"dumb\", \"beautiful\", \"dull\", \"bored\", \"stupid\", \"good\", \"ugly\", \"random\", \"robotic\", \"old\", \"fat\", \"paunchy\", \"bald\", \"beautiful\", \"chubby\", \"clean\", \"dazzling\", \"drab\", \"elegant\", \"fancy\", \"fit\", \"flabby\", \"glamorous\", \"gorgeous\", \"handsome\", \"long\", \"magnificent\", \"muscular\", \"plain\", \"plump\", \"quaint\", \"scruffy\", \"short\", \"skinny\", \"stocky\", \"ugly\", \"unkempt\", \"unsightly\"];\n            var quantityOpinion = [\"too few\", \"too many\"];\n            var replies = [\"Why did you say that?\", \"You are crazy.\", \"Man that is my life!\", \"I would never say something that mean to you!\", \"Why do people like commenting about me.\", \"No, no, no, no. That's not true.\", \"Humph.\", \"Wow thanks!\", \"You are my hero!\", \"YES!\"];\n            var toBe = [\"were\", \"are\"];\n            var questions = [\"What is your favorite subject in school?\", \"What is your favorite time of day?\", \"Are you an animal?\"];\n            var subjectAnswers = [\"Math\", \"History\", \"Science\", \"Foreign Languages\", \"Social Science\", \"English\"];\n            var timeAnswers = [\"Morning\", \"Noon\", \"Afternoon\", \"Evening\", \"The middle of the night\"];\n            var animalAnswers = [\"Yes!\", \"No.\", \"Duh!!!\", \"Nope.\", \"Of course.\", \"I'm not sure.\", \"Yup.\", \"Never!\"];\n            var animals = [\"dog\", \"cat\", \"bird\", \"fish\", \"whale\", \"squirrel\", \"snake\", \"hamster\", \"seal\"];\n            var nonAnimals = [\"ChatGPT\", \"tree\", \"leaf\", \"ant\", \"bug\", \"computer\", \"AI\"];\n            var verbsOfAffection = [\"love\", \"like\", \"adore\", \"look up to\", \"value\", \"am fond of\", \"treasure\", \"cherish\"];\n            var beforeVOA = [\"just\", \"extremely\", \"respectfully\"];\n            var observingVerbs = [\n              \"looking at\", \"observing\", \"watching\", \"glancing at\", \"studying\", \n              \"gazing at\", \"noticing\", \"peeking at\", \"inspecting\", \"examining\", \n              \"monitoring\", \"surveying\", \"scrutinizing\", \"scanning\", \"spotting\", \n              \"eyeing\", \"checking out\", \"staring at\", \"focusing on\", \"viewing\", \n              \"tracking\", \"analyzing\", \"contemplating\", \"considering\", \"noting\"\n            ];\n            var timePhrases = [\"The other day,\", \"Yesterday,\", \"Today,\", \"One hour ago,\", \"45 minutes ago,\", \"Exactly 34.24 seconds ago,\", \"Precisely 100 years ago to this second,\"];\n            var prepositions = ['at', \"behind\", \"in front of\", \"inside of\", \"outside of\", \"on top of\", \"under\", \"around\", \"in\", \"on\", \"along\", \"within\"];\n            var prepNouns = [\"the beach\", \"my house\", \"my city hall\", \"Washington DC\", \"the park\", \"my dog's dog house\", \"a hamster ball\", \"the middle of the ocean\", \"a sandbox\", \"the top of a tree\", \"inside of a 10 inch box\", \"my computer\", \"the most dangerous place in the world\", \"a table\"];\n            var ifWhen = [\"if\", \"when\"];\n            var inFactType = [\"In fact\", 'Actually', 'Surprisingly', 'Extraordinarilly', 'Amazingly', 'In real life'];\n            var noType = [\"Do I look like one?\", 'What put that idea into your head?', 'I thought you knew what I am.', 'I am a little hurt.', 'I wish I was.'];\n            //}\n\n            var mainDiv = document.getElementById(\"mainDiv\");\n            var MAX_MESSAGES = 25;\n            function getWord(array) {\n                return array[Math.round(Math.random() * (array.length - 1))];\n            }\n            \n            function getOpinionOpener(currentName) {\n                var pronoun = getWord(pronouns);\n                while (pronoun.slice(0, -2) === currentName) {\n                    pronoun = getWord(pronouns);\n                }\n                return capital(pronoun) + \" \" + getWord(adjectives) + \" \" + getWord(subjects) + \" \" + getWord(sayThinkVerbs) + \" that\";\n            }\n            var talkedAboutSomeone = false;\n            var askedQuestion = false;\n            var question = 0;\n            var asker;\n            var answers = [];\n            var NUMOFANSWERS = 3;\n            function reduceRedund(current, old, array) {\n                while (old.includes(current)) {\n                    current = Math.round(Math.random() * (array.length - 1));\n                }\n                return current;\n            }\n            function addMessage() {\n                var message = \"\";\n                var person = Math.round(Math.random() * (people.length - 1));\n                var sentenceType = Math.random() * 7;\n                if (askedQuestion !== false) {\n                    person = reduceRedund(person, [asker, answers[0], answers[1]], people);\n                    if (question === 0) {\n                        var pronoun = Math.round(Math.random() * (pronouns.length - 1));\n                        while (pronouns[pronoun] === people[person].name.toString() + \"'s\") {\n                            pronoun = Math.round(Math.random() * (pronouns.length - 1));\n                        }\n                        message += getWord(subjectAnswers) + \".  I \" + getWord(beforeVOA) + \" \" + getWord(verbsOfAffection) + \" how it is \" + getWord(ingTVerbs) + \" \" + pronouns[pronoun] + \" \" + getWord(adjectives) + \" \" + getWord(nouns) + '.';\n                    }\n                    else if (question === 1) {\n                        message = getWord(timeAnswers) + '. ';\n                        message += \"At that time, I \" + getWord(beforeVOA) + \" \" + getWord(verbsOfAffection) + \" \" + getWord(observingVerbs) + \" myself \" + getWord(ingTVerbs) + \" \" + getWord(articles) + \" \" + \" \" + getWord(adjectives) + \" \" + getWord(nouns) + '.';\n                    }\n                    else if (question === 2) {\n                        answer = getWord(animalAnswers);\n                        message += answer;\n                        if (answer[0] === \"Y\" || answer[0] === \"D\" || answer[0] === \"O\") {\n                            message += \" \" + getWord(inFactType) + \", I am a very \" + getWord(adjectives) + \" \" + getWord(animals) + \".\";\n                        } else if (answer[0] === \"N\") {\n                            message += \" \" + getWord(noType) + \" \" + getWord(inFactType) + \" I am a very \" + getWord(adjectives) + \" \" + getWord(nonAnimals) + \".\"; \n                        }\n                    }\n                    answers[askedQuestion] = person;\n                    askedQuestion++;\n                    if (askedQuestion > NUMOFANSWERS - 1) {\n                        askedQuestion = false;\n                    }\n                } else if (talkedAboutSomeone !== false) {\n                    person = talkedAboutSomeone;\n                    message += getWord(replies) + \" \" + getWord(emojis);\n                    talkedAboutSomeone = false;\n                } else if (sentenceType <= 3) {\n                    message = getOpinionOpener(people[person].name);\n                    message += \" \" + getWord(quantityOpinion);\n                    message += \" \" + getWord(subjects) + \"s\";\n                    message += \" \" + getWord(toBe) + \" \" + getWord(ingTVerbs) + \" \" + getWord(articles) + \" \" + getWord(nouns) + '. ' + getWord(emojis);\n                } else if (sentenceType <= 4.5) {\n                    var talksAbout = Math.round(Math.random() * (people.length - 1));\n                    while (people[talksAbout].name === people[person].name) {\n                        talksAbout = Math.round(Math.random() * (people.length - 1));\n                    }\n                    talkedAboutSomeone = talksAbout;\n                    message += getWord(sentenceOpeners) + \" \" + \" my \" + getWord(subjects) + \" \" + getWord(sayThinkVerbs) + \" that \" + people[talksAbout].name + ' is ' + getWord(adjectives) + '.';\n                } else if (sentenceType <= 5.5) {\n                    var pronoun = getWord(pronouns);\n                    while (pronoun.toString().slice(0, -2) === people[person].name) {\n                        pronoun = getWord(pronouns);\n                    }\n                    message += getWord(timePhrases) + \" \" + getWord(prepositions) + \" \" + getWord(prepNouns) + \", \" + pronoun + \" \" + getWord(subjects) + \" was \" + getWord(observingVerbs) + \" \" + getWord(articles);\n                    message += \" \" + getWord(adjectives) + \" \" + getWord(nouns) + \" \" + getWord(ingTVerbs) + \" \" + getWord(articles) + \" \" + getWord(subjects) + '.';\n                } else { \n                    question = Math.round(Math.random() * (questions.length - 1));\n                    message = questions[question];\n                    askedQuestion = 0;\n                    asker = person;\n                    answers = [];\n                    for (var i = 0; i < NUMOFANSWERS; i++) {\n                        answers.push(asker);\n                    }\n                }\n                \n                if (mainDiv.childElementCount / 2 > MAX_MESSAGES) {\n                    mainDiv.removeChild(mainDiv.firstChild);\n                    mainDiv.removeChild(mainDiv.firstChild);\n                }\n                \n                var isAtBottom = false;\n                if (Math.abs(mainDiv.scrollTop + 530 - mainDiv.scrollHeight) < 10) {\n                    isAtBottom = true;\n                }\n                \n                \n                mainDiv.innerHTML += \"<div class='messagebody'><div class='avatar'><img style='user-select: none' src='https://cdn.kastatic.org/third_party/javascript-khansrc/live-editor/build/images/\"+ people[person].avatar + \".png'></div><div class='name' style='color:\" + people[person].c + \"'>\" + people[person].name + \"</div><div style='user-select: none' class='time'>Today at \" + getCurrentTime() + \"</div></div><div class='message-text'>\" + message + \"</div>\";\n                if (isAtBottom) {\n                    mainDiv.scrollTo({\n                        top: mainDiv.scrollHeight,\n                        behavior: 'smooth'\n                    });\n                }\n                \n                \n            }\n            addMessage();\n            setInterval(addMessage, 2000)\n        </script>\n        \n        <!-- CREDIT TO BlueBird@BirdWatcher03 FOR THE AMAZING SAVE FUNCTION -->\n        <!-- credit to leaf(https://www.khanacademy.org/computer-programming/i/4626826748018688) -->\n        <script src=\"https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.3/dist/html2canvas.min.js\"></script>\n        <script>\n        var save = function(){\n            html2canvas(document.body,{\n                allowTaint : false,\n                useCORS: true,\n                width:579,\n                height:566,\n            })\n            .then(function(canvas){\n                b64Img = canvas.toDataURL();\n                window.top.postMessage(b64Img, \"https://www.khanacademy.org/\");\n            });\n        };\n        var handleSave = function(e) {\n            if (JSON.parse(e.data).screenshot) {\n                setTimeout(function() {\n                    console.log(\"Saving...\");\n                    save();\n                }, 1000)\n            }\n        };\n        window.parent.savers = window.parent.savers || 0;\n        window.parent.addEventListener('message', handleSave);\n        window.parent.savers += 1;\n        for (window.parent.savers; window.parent.savers > 1; window.parent.savers -= 1) {\n            window.parent.removeEventListener('message', handleSave)\n        }\n        </script>   \n        <script type=\"application/javascript\">\n            document.body.addEventListener(\"keydown\", function(e) {\n                if (e.code === \"Escape\") {\n                    document.body.innerHTML = `\n                        <div style='position:absolute;top:0;left:0;width:100vw;height:100vw; background-color:rgb(97, 112, 239);'><br><br><br><br><h1 style='font-size:80px; text-align:center;'>KHANCORD</h1><br><h2 style='padding: 0 10vw; font-size:40px; text-align:center;'>A SUPER HILARIOUS AUTOGENERATED CHAT THREAD</h2></div>\n                    `;\n                }\n                \n                if (e.code === \"Enter\") {\n                    e.preventDefault();\n                }\n            });\n        </script>\n        <!--The Thumbnail Script 2.1.0 12/18/2023 by Bluebird@kaid_157624541333313939750668--><script src=\"https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js\"></script><script type>var r=600,s=document.documentElement.clientWidth;window.parent.html2canvas=t=>{try{html2canvas(document.body,{width:s,height:s,useCORS:!0,onclone:t=>t.getAnimations().forEach((t=>{try{t.finish()}catch{}}))}).then((t=>{var e=document.createElement(\"canvas\");e.width=r,e.height=r,e.getContext(\"2d\").drawImage(t,0,0,t.width,t.height,0,0,r,r),window.top.postMessage(e.toDataURL(),\"*\")})).catch((t=>{alert(\"Thumbnail Script Error: \"+t)}))}catch{window.top.postMessage(document.createElement(\"canvas\").toDataURL(),\"*\")}};</script>\n    </body>\n</html>\n<!--\nAutogenerated Chat Thread 2.\n\nFEATURES FROM OLD VERSION:\n  - Insults or praises others.\n  - Responds when insulted or praised.\n  - Answers questions that others ask.\n  - Two questions\n  \nUPDATES FROM OLD VERSION:\n  - Does not talk about themselves\n  - Does not answer their own question\n  - Does not answer a question more than once.\n  - Added one more question\n  - Added two more sentence patterns\n  - Removed one sentence pattern\n\nI know I didn't add much but I'm done for now with this program.\n\nThe old version:\nhttps://www.khanacademy.org/computer-programming/a-chat-thread-that-is-auto-generated/5803527879442432\n\n\nAnyways, please sub:\nhttps://www.khanacademy.org/computer-programming/lame-idk-fr/5681493063155712\n\n\n-->",
    "title": "ACT 2 (2x better)",
    "votes": 52,
    "created": "a day ago",
    "updated": "7 hours ago",
    "type": "HTML",
    "author": {
        "name": "wealR",
        "id": "kaid_831993479561352012904348",
        "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
    },
    "dimensions": {
        "width": 600,
        "height": 600
    },
    "forks": [
        {
            "title": "Spin-off of \"ACT 2 (2x better)\"",
            "id": "5460220705685504",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "DebidattaM",
                "id": "kaid_1196497146108329414558461"
            }
        },
        {
            "title": "Spin-off of \"ACT 2 (2x better)\"",
            "id": "6651234816540672",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "ihmandrew",
                "id": "kaid_1116498955829619146975594"
            }
        }
    ],
    "posts": {
        "tips": [
            {
                "replyCount": 1,
                "votes": 12,
                "date": "a day ago",
                "author": {
                    "name": "wealR",
                    "id": "kaid_831993479561352012904348",
                    "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                },
                "text": "<b>Sub pls</b><br><br>https://www.khanacademy.org/computer-programming/lame-idk-fr/5681493063155712",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "14 hours ago",
                        "author": {
                            "name": "YA",
                            "id": "kaid_3563621891021365862686148",
                            "avatar": "/images/avatars/svg/robot_female_3.svg"
                        },
                        "text": "too late, already subbed"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 7,
                "date": "13 hours ago",
                "author": {
                    "name": "AmethystSky",
                    "id": "kaid_784805823121542822870790",
                    "avatar": "/images/avatars/svg/duskpin-ultimate.svg"
                },
                "text": "<b>PlumpGeorge</b>:<br>Are you an animal?<br><b>RandoDude</b>:<br>Nope. I am a little hurt. Actually I am a very beautiful bug.<br><b>wealR</b>:<br>Yup. Actually, I am a very gorgeous fish.<br><b>Crazy OJ</b>:<br>Yup. Amazingly, I am a very handsome bird.<br><br><em>Bugs are animals.</em>",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "I guess RandoDude has the IQ of a vain bug lol"
                    }
                ]
            },
            {
                "replyCount": 5,
                "votes": 5,
                "date": "14 hours ago",
                "author": {
                    "name": "kitty mascot",
                    "id": "kaid_1066778980955332043559618",
                    "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                },
                "text": "RandoDude<br>What is your favorite subject in school?<br>wealR<br>Math. I extremely am fond of how it is persuading RandoDude's fat piano.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "14 hours ago",
                        "author": {
                            "name": "kitty mascot",
                            "id": "kaid_1066778980955332043559618",
                            "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                        },
                        "text": "what is wrong with this chat? XD"
                    },
                    {
                        "date": "11 hours ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "lol I have no idea XD"
                    },
                    {
                        "date": "11 hours ago",
                        "author": {
                            "name": "kitty mascot",
                            "id": "kaid_1066778980955332043559618",
                            "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                        },
                        "text": "are we gonna start this again? XD"
                    },
                    {
                        "date": "11 hours ago",
                        "author": {
                            "name": "kitty mascot",
                            "id": "kaid_1066778980955332043559618",
                            "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                        },
                        "text": "wealR<br> What is your favorite subject in school?<br> RandoDude<br> Science. I extremely like how it is befriending wealR's ugly bracelet. XD"
                    },
                    {
                        "date": "11 hours ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "lol probably XD"
                    }
                ]
            },
            {
                "replyCount": 14,
                "votes": 5,
                "date": "16 hours ago",
                "author": {
                    "name": "Ezra",
                    "id": "kaid_1112279572017452692208390",
                    "avatar": "/images/avatars/svg/leaf-red.svg"
                },
                "text": "Dude, my co-worker gossiped that wealR was fit! - RandomDude<br>I would never say something that mean to you! >:( = wealR<br><br>yeah because if you were fit then that wouldn't be lame and your lame so being lame you don't want people to call you not lame because you are the second greatest lamer ever!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "16 hours ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "lol this chat is ridiculous XD"
                    },
                    {
                        "date": "13 hours ago",
                        "author": {
                            "name": "Ezra",
                            "id": "kaid_1112279572017452692208390",
                            "avatar": "/images/avatars/svg/leaf-red.svg"
                        },
                        "text": "why you telling me?"
                    },
                    {
                        "date": "11 hours ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "I dunno, why not"
                    },
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "don't you love how the chatbot that represents me is so accurate to my disposition towards lameness?"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Ezra",
                            "id": "kaid_1112279572017452692208390",
                            "avatar": "/images/avatars/svg/leaf-red.svg"
                        },
                        "text": "@mathlete11 maybe cause I'm not the maker of the program lol<br><br>@wealR oh yeah you did so good at it. so good that is isn't even lame >:)<br>like if you were to put me in there I would be soooo lame"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "@Ezra i added you now you can see what you say lol"
                    },
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "Ezra",
                            "id": "kaid_1112279572017452692208390",
                            "avatar": "/images/avatars/svg/leaf-red.svg"
                        },
                        "text": "Wow I'm the lamest O.o"
                    },
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "Ezra",
                            "id": "kaid_1112279572017452692208390",
                            "avatar": "/images/avatars/svg/leaf-red.svg"
                        },
                        "text": "Afternoon. At that time, I extremely value inspecting myself dancing with this good bracelet.<br><br>see? :P"
                    },
                    {
                        "date": "5 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "O.o that's lame O.o"
                    },
                    {
                        "date": "4 hours ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "@weal can u add me XD"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Ezra",
                            "id": "kaid_1112279572017452692208390",
                            "avatar": "/images/avatars/svg/leaf-red.svg"
                        },
                        "text": "only lame people can be added. hence, only me and wealR"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "sorry Mathlete Ezra was just such an icon of lameneess that i coulnd't pass up that"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "haha i love that.<br><br>yeah i agree so muc... wait a minute did you say second greatest?"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Mathlete11",
                            "id": "kaid_4902531429433401500771997",
                            "avatar": "/images/avatars/svg/starky-sapling.svg"
                        },
                        "text": "phooey, I'm pretty lame, but whatever XD"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 3,
                "date": "18 hours ago",
                "author": {
                    "name": "𝐂𝐥𝐨𝐯𝐞𝐫",
                    "id": "kaid_2287805493149654773942312",
                    "avatar": "/images/avatars/svg/stelly-green.svg"
                },
                "text": "Flashbang < Khancord Light Mode<br><br><br>Nice Program, It's Pretty Funny. :)<br><br>Votes++;",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "Thanks :)"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 3,
                "date": "17 hours ago",
                "author": {
                    "name": "Lightning",
                    "id": "kaid_293295321613227018876720",
                    "avatar": "/images/avatars/svg/primosaur-tree.svg"
                },
                "text": "That's an interesting name...",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 3,
                "date": "14 hours ago",
                "author": {
                    "name": "YA",
                    "id": "kaid_3563621891021365862686148",
                    "avatar": "/images/avatars/svg/robot_female_3.svg"
                },
                "text": "Laughs in-loud",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 3,
                "date": "17 hours ago",
                "author": {
                    "name": "HACK",
                    "id": "kaid_6815067100354522609320825",
                    "avatar": "/images/avatars/svg/cs-ohnoes.svg"
                },
                "text": "wealR<br>45 minutes ago, outside of inside of a 10 inch box, my mom's librarian was inspecting that skinny flashlight following another nurse.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 2,
                "date": "13 hours ago",
                "author": {
                    "name": "ASBackup",
                    "id": "kaid_714780036830891967670231",
                    "avatar": "/images/avatars/svg/aqualine-tree.svg"
                },
                "text": "lol this is great :)",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "yes thanks!"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 2,
                "date": "8 hours ago",
                "author": {
                    "name": "Mr. X",
                    "id": "kaid_860766137188997026711729",
                    "avatar": "/images/avatars/svg/robot_male_1.svg"
                },
                "text": "Nice, you managed to capture a small essence of the brainrot that goes on in those discord threads. <em>And they said it couldn't be done</em>. bah<br><br>If they were as stupidly funny as these somehow get, though, they might be permissible, in a controlled environment.<br><br>wealR quote: \"Never! I thought you knew what I am. In real life I am a very dumb computer.\"",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "3 hours ago",
                "author": {
                    "name": "Jacob.S",
                    "id": "kaid_1005855128586451892649647",
                    "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                },
                "text": "Ezra<br>Are you an animal?<br>RandoDude<br>I'm not sure.<br>PlumpGeorge<br>No. I wish I was. Actually I am a very scruffy leaf.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "8 hours ago",
                "author": {
                    "name": "goat120",
                    "id": "kaid_1167989604939556743383715",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "how do u send things",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "9 hours ago",
                "author": {
                    "name": "AlIEN",
                    "id": "kaid_213001050410218690794137",
                    "avatar": "/images/avatars/svg/marcimus-purple.svg"
                },
                "text": "wealR<br>Are you an animal?<br>RandoDude<br>Of course. Extraordinarilly, I am a very robotic whale.<br>PlumpGeorge<br>Yup. Actually, I am a very ugly cat.<br>Crazy OJ<br>I'm not sure.<br><br>...tf...",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "9 hours ago",
                "author": {
                    "name": "AlIEN",
                    "id": "kaid_213001050410218690794137",
                    "avatar": "/images/avatars/svg/marcimus-purple.svg"
                },
                "text": "PlumpGeorge<br>Yo my child said that Crazy OJ is long.<br>Crazy OJ<br>Wow thanks! >:)<br><br>AYOOO",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 4,
                "votes": 1,
                "date": "8 hours ago",
                "author": {
                    "name": "Lightning",
                    "id": "kaid_293295321613227018876720",
                    "avatar": "/images/avatars/svg/primosaur-tree.svg"
                },
                "text": "That's a cool name! Did you come up with it by yourself?",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "you mean khancord? it's khan + d1sc0rd"
                    },
                    {
                        "date": "4 hours ago",
                        "author": {
                            "name": "Lightning",
                            "id": "kaid_293295321613227018876720",
                            "avatar": "/images/avatars/svg/primosaur-tree.svg"
                        },
                        "text": "Cool! Did you come up with it all by yourself?"
                    },
                    {
                        "date": "4 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "Yes. Its funny because concord means <code>agreement or harmony</code> while discord means  <code>lack of agreement or harmony</code>. So its a nice pun."
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "Clark Kent (occasionally active)",
                            "id": "kaid_714855751210369848518614",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "concord is a grape type as well<br>also used to be a super-sonic passenger jet line<br>(spellings may differ, IDK)"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "3 hours ago",
                "author": {
                    "name": "Ibraheem Ahmed (IA)",
                    "id": "kaid_42165633374795610935956",
                    "avatar": "/images/avatars/svg/spunky-sam.svg"
                },
                "text": "\"<em>I just like staring at myself misleading another quaint dolphin.</em>\"",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "7 hours ago",
                "author": {
                    "name": "Firebrand (offline)",
                    "id": "kaid_423049852746380987692804",
                    "avatar": "/images/avatars/svg/stelly-orange.svg"
                },
                "text": "lol too funny<br><br>still don't know how you found 'baby froggy'",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "lol thanks :)<br><br>i just scrolled down"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "11 hours ago",
                "author": {
                    "name": "Mathlete11",
                    "id": "kaid_4902531429433401500771997",
                    "avatar": "/images/avatars/svg/starky-sapling.svg"
                },
                "text": "dude, my barista gossiped that crazy oj is robotic!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "12 hours ago",
                "author": {
                    "name": "cwalsh1223 BBB#",
                    "id": "kaid_792288208072906614241148",
                    "avatar": "/images/avatars/svg/spunky-sam-red.svg"
                },
                "text": "This is awesome. At one point, \"you\" claimed to be a very fancy AI. I like how they use emotes sometimes. XD :( >:) :P :3 :)",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "13 hours ago",
                "author": {
                    "name": "OfflineSquidy",
                    "id": "kaid_8597585382861928237037056",
                    "avatar": "/images/avatars/svg/marcimus-red.svg"
                },
                "text": "cool! vote++",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "wealR",
                            "id": "kaid_831993479561352012904348",
                            "avatar": "/images/avatars/svg/cs-hopper-cool.svg"
                        },
                        "text": "Thanks :)"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "a day ago",
                "author": {
                    "name": "TTyper",
                    "id": "kaid_9072327922342976241122316",
                    "avatar": "/images/avatars/svg/piceratops-seed.svg"
                },
                "text": "Cool it is better than the old one nice job",
                "locked": false,
                "pinned": false,
                "replies": []
            }
        ],
        "questions": []
    }
}