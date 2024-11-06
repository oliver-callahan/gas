var json = {
    "code": "/**\n    \n    Star-Lord!\n    \n    I wanted to make a cooler and more higher quality program before I basically stop programming. So here's my highest quality pixel art that I've made so far!\n    \n    This took me about 7 hours of on and off work over the past few days. Not including the pixel art function. I hope you guys like it!\n    \n    @Note\n    If you click the canvas, it'll blur the image some. Please tell me which you like better: The blurred or not blurred image.\n    \n    I used a reference image for everything but the name.\n    I took a screen shot of it to make it easier to put the image next to my canvas and when I went back to get the reference image link, I couldn't find it. And some colors may be off from the image that I used.\n    \n**/\n\n// If the image is blurred or not\nvar blur = false;\n\n// Canvas size\nsize(600, 600, P2D);\n\n// Pixel art function\nvar PixelArt = (function () {\n    /** This pixel art function was made **/\n    /** by Ace Rogers (@AmericanGuard) **/\n    function PixelArt (art, x, y, size, clr, animate, speed) {\n        \n        // For your art\n        this.art = art;\n        \n        // The position\n        this.x = x;\n        this.y = y;\n        \n        // The size of the pixel art\n        this.size = size;\n        \n        // The colors you're using\n        this.clr = clr;\n        \n        // If it's animated or not\n        this.animate = animate;\n        \n        // The speed of the animation\n        this.speed = speed;\n        \n        // For picking which art for the animation\n        this.artNum = floor(frameCount / this.speed) % this.art.length;\n        \n    }\n    PixelArt.prototype = {\n        display: function (pixImg, x, y, pixSize) {\n            // Displays the pixels in their right order\n            for (var i = 0; i < pixImg.length; i++) {\n                for (var j = 0; j < pixImg[i].length; j++) {\n                    // If not \"-\" then use the color character you picked\n                    if (pixImg[i][j] !== \"-\") {\n                        noStroke();\n                        fill(this.clr[pixImg[i][j]]);\n                        rect(x + (j * pixSize), y + (i * pixSize), pixSize, pixSize);\n                    }\n                }\n            }\n        },\n        run: function () {\n            // If animated\n            if (this.animate) {\n                // This displays the animated pixel art\n                this.display(this.art[this.artNum], this.x, this.y, this.size);\n            } else {\n                // Else display just a normal pixel art\n                this.display(this.art, this.x, this.y, this.size);\n            }\n        }\n    };\n    return PixelArt;\n    // Version 2.0.0\n})();\n\n// Creating the arts\nvar StarLord = new PixelArt([\n\"aaaaaaaaamaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakkkk11111111111111n111111n11111111111111a\",\n\"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakaak11111111111n1n11n11n1n1n1n111111111111\",\n\"aaaaaanaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaak1nnnn1n1nn1n1n1111nn1n1n1n1111111111111\",\n\"aaaaaaaalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa11nnnnnn1n111111n111n1n1111n1n11111111111\",\n\"aaaaaaaamaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1nmnnnnnnn1nn1n1n1n11n1111111n111nnn111111\",\n\"kaaaaaaaaakaaaaaaaaaaaaaaakaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1nnnmnnnnnnnnn11n1n11nnn11111n1n1nn11111111\",\n\"aaaaaaamaaaaamalaamaaaaaaaaaaaaaaaaaaaaaaaaaaakaaaaaaaaaahhaaaaaaaaaaaaaaaaaaaaaaaaa1nmnmnmnnmnnnnnn11n1n11n1n11111n1n1nn1111n11\",\n\"aaaaaaaaaamaakalaaaaaaaaaaaaaaaaaaaaaagggggggggggggggaahhhhhaaaaaataaaaaaaaaaaaaaaaa1mnmnmnmnnmnnnnn11n11n1nn1nnn111n11n1n1111n1\",\n\"aaaaaaaaanlaallaaaaaaaaaaggggghhhhhhhhhgffffffhjjjjhhhhhhhhhhaaaaahhtaaaaaaaaaaaaaa1mnmnmnmnmmnmnnnn1n1n11nn111nn11111n1n111nn11\",\n\"aaaaaaaaakaaaaaaaaaaaahiggggfhhhhggjjffffffffhjjjjjjjjjjhhffhhhaaahjhhtaaaaaaaaaaa1mmmnmnnnmnnmnnnnnn1n1n11n11n1nn1n1111111n1111\",\n\"aaaaaaaaaaaakaaaaaaahiggggffffffffffffffgghhjjjjjgggggfffffhjhhggghjjjhhtaaaaaaaa1mmmmmnmnnnmmmmnnnnn11n1n11n11n1n11n111111nn111\",\n\"aaaaaaaaaaaaaaaaaaahiffffffffffffffffffffffjjjjfffffffffffhjjjfffhhjjjjhhtaaaaaaa1mmmmmmnmnnmmmnmnnnnn11n1nn1111n11n111111n11n11\",\n\"aaaaaaaaakaamaaakahjfffffffffffhhhhhffffjjjjjjjjjjjjhhhhhhffffffhhjjjjjfjtaaaaaa1mmlmlmnmnnnmmnmnmmnnn1n1n11n1n111n1n11111n1n1nn\",\n\"aaaaaaaaaaaaaaahgfffffffhhhhhhhjjjjjjjfffjjjhhhhhjjjjjjjffffhhhhjjjjjjjfftaaaaaa1mlmlmmmnmnnmnnmmnnmn1nnn1nnnnnnnnnnnnnnn11n1n1n\",\n\"aaaaaaaaaaaaaahgffffjjjjjjjjjjjjjjjffjjffffjjjjjjjjjjjjjjjjjjjjjjjjjfjjfgtaaaaallkmlmmmnmnmnmnmmnmnnmmm11nnnmmnn11n1111111n1n1n1\",\n\"aaaaaaaaaaakagffffjjjjjjjjffffffjjffffffffffffffffffjjjjjjjjjjjgfjjffjfgtaaaaaalklkllmmnmmmnmmnmnnnnnmmmn1nmn11nn11n1111111n1n1n\",\n\"aaaaakaaaaaagfffjjjfffffffffffffffffffffffffffffffffffffffjihhhffjjfffggtaaaaalkkklkmmmmnmmnmmmmmmmmmn1n1nnm111n1nn1n1n111n1n1nn\",\n\"aaaaaaaaaccgffffjffffffffffffffffffffffjjjjhhffffffffffffffffffffjfffggtaaaaaalkklkllmlmmmnnnmnmmmmmn1n1m1nnnnnnnn1n1n111n1n1n11\",\n\"aaaaaaaacbfffffffffffffpprrrrrppofffffffffffjjffffffffffffffffffffffztaaaaaaaalkkklllmmmmmnnmnnmmmmmnn1n1n1nm111nnn1111nn1n1n111\",\n\"aaaaaaaccfffffffffaaooooooooooooopprrrpprffffffffffffjuuuuuuffffffxxzrtaaaaaalkkklllmmmmmnmnnnmnmnnmnnn1nnnm111n1n1111n11nn11nnn\",\n\"aaaaaaccbfffffaaaaaooooooooooooooooooooooaoffffffjjuuuuvvvvvvvvfrrxxxrrtaaaaalkkkkllmlllmmnnnnmnnmnmnnnnnnmnnnn11111nn111n1nn11n\",\n\"aaaaaccb7fffaaaaaaooooooooooooooooooooopaoorroouuuuvvvvvwwwwwwxyrzxxxzrtaaaaalkllllmlmlmllmnnnnmnnmmnnnnnmm1nn1n111nn111n1111n11\",\n\"aaaaacb77faaaaaaaoooooooooooooooooooooopaoopoppoouvvvwwwwwwwxyyyxzyxxxzttaaaalkkklllllmlmmlnnmmnnnnnnnnnnnmmm1n1nnnn11111n1111nn\",\n\"aaaacb77aaaaaaaooooooooooooooooooooooooaooppoooppooowwwwwwpppxxxxztxxxzytaaalkklklllmmlmmmmnnmnmnnnnnmmnnnnnnnnn111n1111n111nn11\",\n\"aaaab7aaaaaaaooooooooooooooooooooooooopaooppoooooppooowwoxpppxxxxxytxxxyytaalklkkklllmmlmmmmnmmmnnnnmmnnnnnnn1mn1nn111111n1n11nn\",\n\"aaabbaaaaaaaooooooooopprsrrsrqpppppooopaoppooooooooqqooaoxppppyxxxztxxxzytaalkkkllkmlllmmmmmnmmmmnnmmmnmmnn1nmmmn1111111n1nnn1n1\",\n\"aaabaaaaaaoooooooooppaaaaaaaaaaaaaaqqpaooppooooooooooqoaopxpppyxxxxytxxzytaalkkkkkkklmmlmlmmnmmmnmnmmmmmmmmnnnnnn11111n11n11nn1n\",\n\"aabaaaaaaooooooooqaaaooooooooooooooaaaooqppoooooooooopoaopyppppyxxxzyxxxzrtalklklllmlllmlmmmnnmnmnnmmmnmnnn11nn1n11n11n111nnn1n1\",\n\"aabaaaaaoooooooqaaooooooooooooooooooooooqppoooooooooopooaopypppyxxxxzzxxzrtalkkllkllmmmlmmmmnmnmnnnmmnmnnnn1nzttttnn1n11n1nn1n1n\",\n\"aaaaaaaooooooqaaoooooooooooooooooooooooosrppoooooooooopoaopypppqyxxxzzxxxzrtlklklllllmmmmmmlmmmnnnnmnnnnnttnxxyyytnn1n1n1n1n11nn\",\n\"abaaaaoooooopaooooooooooooooooooooooooooosrqpooooooooopooaopypppyxxxxzzxxzrtlkkkkkllkmlmmmlmnmnmnnnmmnnnootaaaxxatn111n1n1n11nnn\",\n\"abaaaaooooopcaoooooooooooooooooooooooooooooqppooooooooopoaopypppqpqqtttttaattklkkkllklllllnnmmmnmmmmmnnooxztaaaaaann111n11n11n1n\",\n\"aaaaaooooopbbaoooooooooooooooooooooooooooooopppoooooooopoaoppqpooppppppppttptkklklkklllllllmnmnmmmnmnnooxxxttaaaaytmnn11111nn1nn\",\n\"baaaooooopbbbbaoooooooooooooooooooooooooooooopppooooooopoaoopoozpppppppppxpxttkklllkllmlmlmnmnmmnnmnnooxxxxzzttyy2tnnn11111n1nn1\",\n\"baaaoooopbbbd7aoooooooooooooooooooooooooooooooopoooooooqoaoooooyyppppppppxxxttkkkklkllmmlmlmnmnmnmnmnooxxxzxxx22t2t1n1n1n1n1n1nn\",\n\"aaaaooopbbbd7bbaoooooooooooooooooooooooooooooooopooooooqoaooooooyyp222ppppxpttkkkklklllmmlmlmnmnnnmnooxxxxzxxzzzy2t1nn1n1n11nn1n\",\n\"aaaoooopbbd7bbbaoooooooooooooooooooooooooooooooooooooooooaoooooooo2pppppp222tlkkkkllllmmmmmmmmmmnmnooxxxx2xxxzzyzt1n11n11111n1n1\",\n\"aaaooopbbd7bbbd7aoooooooooooooooooooooooooooooooopqooooaaaoopppp2cddddddppppaalkklklklllmlmmmnmnnnooxxxxz2xxzzzyytn1n1111111nn11\",\n\"aaaooopbbd7bbd7baooooooooooooooooooooooooooooooooopoooaaaoop2dddddyyyttdddddttlkkklkkllllmmmnmnmnooxxxxx2xxxzz2yytnn1n1n1111n1n1\",\n\"aaooopbbe7bbd7bbbaooaaaaaaaaappooooooooooooooooooooooaaaaop2dddddappqqqtddddoptkklklklllmlllmnmnmoxxxxxz2xxzzy2xytmmm1111111nn11\",\n\"aaooopbbd7bbd7bbbaaaaaaaaaaaaaaqoooooooooooooooooooooaaaoopdddddappq655qtdddoptlkklllllmlmlmmmnmooxaaax2xxxzz2xytmnn1n11n11nn111\",\n\"aaooopbbd7bd7bbbbaaaappppppaaapqqooooooooooooooooooooaaooppdddbcaqq65556qtddaptlkkklkklllmllllmnoxxxxxx2xxzzy2xytn11n11nnnn111n1\",\n\"aaoopbbb7bbd7bbbappppppppppprsqppooooooooooooooooooooaaooppdddbapqq54444qtddaptalkkkllklmllmmmmooxaaaxztaaaaaaxytn1111n11111111n\",\n\"aaoopbbd7bd7bbbbpppppppppppppspppooooooooooooooooooooaaooptddbbaqq6544456ptdapptlkklkklllmlmmmmoxxxxxxtaaoppqt1nn1nnnn11ytt1nnn1\",\n\"aaoopbbd7bd7bbbpppppppppppppppqpppoooooooooooooooooooaaooptddbbaqq6544445qtdapptallklkklmlmlmmooxaaaxztaaopzzt1n1nnn111xxy2n111n\",\n\"aaoopbbd7bd7bbbpppqaaaaaaaaappprppoooooooooooooooooooaaooptddbbaqq6544445qtddaptalklklkllmlmlmoxxxxxx2taoopzqt11n1nnn1axxaa211n1\",\n\"aaoopbbd7bd7bbpppqaqrrqppppqapprqppooooooooooooooooooaaoopqddbbapqq544456qtddaptaalklklklmlmmooxaaaxztaaooqqqt1n1n1ntt2aa2tyt1nn\",\n\"aaoopbbd7bb7bbpppappppppppppqapprppooooooooooooooooooaaooppdddbaaqq654445qtddaptaaalklklkmllmoxxxxxztooyyoppptn1n1n1qqyttyyxytt1\",\n\"kaooopbb7bbd7bpppapppppppppppapprppooooooooooooooooooaaoopp2ddbbapqq54456q3ddaptaaaalklklmlmooxaaxzybbbcyzzyyt111n12ppxyyxxxy2t1\",\n\"kaooopbbd7bd7bpppapppppppppppqaprqpoooooooooooooooooqaaaoopydddbaapp6555qtdddaptaaaalkkkllmloxxxxzybbbbe7bbbbt1nn11pppxxxxxxy2t1\",\n\"kaoooopbb7bd7bbppapppppppppppqappqpoooooooooooooooooqyaaoopy3ddbbappqqqqtdddd33aaaaaalkkklmooxxxxzyb7bbe7bbcetn11n1ppxxxxxxxz2t1\",\n\"kaoooopbbd7bd7bppqapppppppppprarrrpoooooooooooooooooqyaaooopydddbbapppqtddddzztaaaaaaalkkkloxxxxxzbbbbcb7bbeet1n1nnnaopaxxxxy2t1\",\n\"kapoooopbb7bd7bppqappppppppprapaaarrpppppooooooooqqqqyaaoooppydddbbayytbdddzztttaaaaaaalllooxxxxzyaabbc7bbee3tn11n1naozaxaxxy2t1\",\n\"kaapoooobbe7d7bbppqappppppppaapppqaaaaaaapqqqqqqqqqqq2aaoooopqpqdddbbbbdddz22xytaamlaaaaaloxxxxxztaaoooaabcd3t1nn1nnaoxasxaxyt11\",\n\"kkapoooopbd7bd7bppqappppppppaapppqooooooaaaaaaaaaaqyyyxaaooooopptddddddddpztxxytaamaaakaaooxxxxxztooooaaaooo3tnnnnnnaoxasaxayt11\",\n\"kkapooooobb7bd7bbppqappppppqaappppqoooaaaaaaaoooooooooooaaaooooopttdddddppzxxxytaaaanaaaaooxxxxx2t7bbe7aooopt1nnnnn7booxaxaxyt1a\",\n\"kkaaooooopbe7bd7bppqappppppqaappppqooaappoooaaaaaaaaoooooaabbboooopttdxxppxxxootaanaaaaaaoxxxxxzt777be7bbccpt11n1117be7xsaxaytaa\",\n\"kkaaoooooobd7bd7bbpppapppppqoaappppqoaaaaaaoooopppooaaaaaaadbbbbooooottxxpxxoy2taaaaaaalooxxxxxzt7bbb37b77c3t1n11117be7saxaxztaa\",\n\"kkaapooooopbd7bd7bpppappppppsaappppqooaaaaaaaaaaaaaaooqqqaaddbbbbbbboootttpoxxytaamaaaaaooxxxxx2t77ac37bbec3tn111117bc7sxaxxztaa\",\n\"kkkaaoooooobd7bd7bbpppappppppoaapppqooooooooooaaaaaaaaaoqaaddddddbbbbppoootpxxootaaaaaaaoxxxxxzt77bbd77b773t1111111aopasaxaxztaa\",\n\"kkkaaoooooopbd7bd7bzzppapppppsoappppqoooooaaaaooooooooaaaoabdddddddbbppppotpxoy2taaaaaaaoxxxxxztoozyy7bbcc3t111111aaopaxxaxxytaa\",\n\"kkkkaaooooopbd7bd7bboyyapppppqoappppqooooaappoaaaaaaaaoooooaddddddddbpqqpootpxy2taaakaaooxxxxxztooqqyzzyccdtaaaaaa7boppaxxaxytaa\",\n\"kkkkaaooooopbbd7bd7bbozoapppppqoappppqoooaaaaaopppqqoooaaaoabdddddddbppqppotpxootanmkaaooxxxxx2tooqoqqqqyzytaaaaaa7bbec77xxzytaa\",\n\"kakakaaooooppbd7bbd7fozoapppppqoappppqooooaaaaaaaaaaaaaoppaabdddddddbppqqpotpox2taaaaaaoxxxxxx2zoqqqqqqoqqtaaaaaa7bbbec77xxytaaa\",\n\"akakaaaooooppbd7bbbfffozoapppppzappppqoooooooooaaaaaaaaaooaabbdddddddppqqpotpxxytaaaaaooxxxxxytaaaazzzyooqtaaaaaa7bb77777xx2taaa\",\n\"kkkkkaaaoooppbbd7bffffozoapppppyapppppqooooaaaappooooooaaaoabbbdddddddpqqpotpxootaaaaaooxxxxxytaoqoaaaazyytaaaaaa7bbb3b7xxx2taaa\",\n\"kkkkkaaaoooppbbd7fff?ffozzazzyyoooppppqoooaaqqpaaaaaaaaoooooabbbddddddppqpotpozytaaaaaoxxxxxx2taooqoqootaaaaaaaaaxbb7777yxx2taaa\",\n\"kkkkakaaooppbbbbfff???fopzzpppppppoooopqooaaaaaoooopppooaaaoabbbbdddddppqpotpxxxtaaaaooxxxxxx2taoooqrotaaaaaaaaaaqbbb3b7yxx2taaa\",\n\"kkkkkakaooppbbbffff???ffoooopzz222qqppoooooaaaaaaaaaaaaaoppaabbbbbddddppqqotpxootaaaaooxxxxxx2aaqoooqrtaalaaaaaaaoxxxyxayxx2tkaa\",\n\"kkakakaaaopbbbffff?????fffaaaopppq2zzzqpppppooooaaaaooaaaopaabbbbbbdddppqpotpoxztamkaooxxxxxx2aaaqoooqtaaaaaaaaaaooqxqqayxx2taka\",\n\"kakakakaaopbbffff?????????????fffppppp2zzzzzpppppooozooraaaoabbbbbbbddppppotpzxxtmnmaoxxxxxxy2aaaaaoootaaaaaaaaaaooqxqayxxx2tkak\",\n\"kkakaaakaobbbfff??????????????????ffaaoooooozyzzzppozzqrsrooabbbbppxx22pppotpxxztamaooxxxxxyy2aaaaaaoootaaaaaaaaoooxqqayxxx2takk\",\n\"kkkakaaaaobbfff???????wwwwwww???????ppaaaaaaoooppzooyppqrrssabbbppxppxxttppotxzzytaaooxxxxxy2aaaaaaaaoooqtaaaaaaooqxqqayxxztaaak\",\n\"kkkkakaaabbbff???????wwwwwwwwww??????pppppzoaaaoppooyzpppqqroozypppppppxzttttxzzytaaoxxxxxyooaaaww##aqooooqtaaaaoqxqqqayxx2takak\",\n\"kkkaaaaaebbof????????wwwwwwwwwwww??????ppppzoooaoooyppzypppqqoz2xzzpppppppzztyzzxtaooxxxxxo##aauw..##oqaaoorqtaaqxxqqayxxz2tkkkk\",\n\"akkaaaaaeboff????????wwwwwwwwwwwwww??????ppzoooaoozyppppzqpppox2xxzzzpppppppztzxxtaooxxxxowww#a?wwwwooaaaaoqooooaaxxxayxxz2tkkkk\",\n\"kakkkaak$899?????????wwwwwwwwwwwwwww????????/ooozzooyyppppqqoxx2pppxxxxxpppxptxxxxtoxxxxxow.ww#a?uu?ooaaaaaoqooooqaaaayxxztkkkkk\",\n\"akakakka$88899???????wwwwwwwwwwwwwwwww???????//////ooozzppppoxxzpppppxxz22ppptxxxxtoxxxxxow,.w#ao??qqaaaaaaaaaqoooqqoaxxx2takaak\",\n\"kakkkaaa$888899??????wwwwwwwwwwwwwwwwwww??????//////oooozqpoxxyxppppppppx22zxytxxxxttxxxx/w,.w#aqoooauuvaaaaaaaqooooqaxxx2tkakkk\",\n\"kkakakaa$88888899???wwwwwwwwwwwwwwwwwwwwww?????//////ooooozozyyxypppppppppxxxzt2xxxtytxxx/w,.wwaoqoowwwwvvaaaaaaqoooaxxxx2takakk\",\n\"kkkakaaa$8888888899?wwwwwwwwwwwwwwwwwwwwwww?????////////ooopzyooz2zppppppppppxtx2xx2zytxowwwwwwaoqoowwwwwwaaaaaaaoooaxxxz2taakkk\",\n\"kkakaaaa$8888888888900wwwwwwwwwwwwwwwwwwwwwww????////////pppppoooo22zppppppppxtx2xx2xytxowwwwwaoooqowwww..?vvaaaaqooaxxxztakakkk\",\n\"kkkaaaaa$888888888889900wwwwwwwwwwwwwwwwwwwwwww???//////pppppoooooop2xxxppppxxtx2xx2xytxow.wufaoooow....,?ww#vaaaoqqxaxx2tkaakak\",\n\"kkakaaaa$8888888888889990000wwwwwwwwwwwwwwwwwwww???//////ppp//oooooooooxzzppxxtx2xx2xytxow.w.wwaqooww.,,,?.www#aaoooxaax2taaaakk\",\n\"kkkaaaaa$8888888888888999999000wwwwwwwwwwwwwwwwww????////////////oooooooozzxxtox222xxytxow...wwaoqowwwu.?,,www?iaoooxaaa2tkakaak\",\n\"kkkakaaa$8888888888888899999999900wwwwwwwwwwwwwwww?????////////////oooooooozztxxttzzztxo/w,,wwwaoqoww.uu?.,ww?wwiaooxaaaatkkkakk\",\n\"kkkkakak$88888888888888889999999999@@@@wwwwwwwwwwww???ii,a///////////ooooopztoxttzzyyxxo/w,.wwwaooqu..u?.wwww?wwwvooqaaatkakakak\",\n\"akaakaka$888888888899988888999999999990@@00wwwwwwwww.##,aaaaa///////////oopptztyyyyxxxxo/w,wwufaaooquuu?wuww?w.ww#qqaaaatakakakk\",\n\"kaaakkk$$888888888889999988889999999999990@@000wwwww.##,aakaa////////////pqtzytooxxxxxxo/w.wuwwfaaoooqouw.ww?w...#oqaaaatkaaaakk\",\n\"aaakak$$8888888888888999999888999999999999$$$$$900www##,aaaaaa///////////qqtttaooxxxxxxo/w.wwwwuuaooooqu..u?www.,ooxaaaataaaakkk\",\n\"aakaka$$888888898888888999999999999998888999999999900#,aaaaaaaa////////aaaaaaaaooxxxxxxoow...wwwwaaoooqouuu?w.wuvooxaaataaakkkkk\",\n\"akkka$$8888888899999999998889999999999988888899999999$,aaaaaaaaaaaaaaaaaaaaaaaoooxxxxxxoow,wwwwwwuaooooqoooou..voqxxaaataakaakkk\",\n\"kkkkk$$8888889988999999999988899999999998888880999999$$@taaaaaaaaaaaaaaaaaaaaaooxxxxxxxpow,wwwwwwuaaqoooqqoouw.vooaaxaataaakakkk\",\n\"kkkk$$888888999998889999999999999999999999998880999999$$@taaaaaaaaaaaaaaaaaaaaooxxxxxxypouwwuwwwwwuaoqooooqoouuqooaaaaatkakaaakk\",\n\"kkkk$$8888899999999988999999999999999999900998880999999$$$ttaaaaaaaaaaaaaaaanaooxxxxxxyptauuuwwwwwuaaoqooooqooooqaaaaaatakakakak\",\n\"kkk$$$88888988888899988888999999999999999900998880999999$$$$ttaaaaaaaaaaaaaaaoooxxxxxy2taauuwwwwwwwuaaqooooqooooqaaaaatakakakakk\",\n\"kka$$88888888888999988999988889999999999999909988099999999$8$tttaaaaaaaaaaaaaooxxxxxxy2taaauuwwwwwwuaaaqooooqooooaaaaataakakkkkk\",\n\"kk$88888888888999999899999999988889999999999009888999999990088$$ttaaaaaaaaaaaooxxxxxx2taaaaauwww#wwuoaaaqqoooqqooaaaaataaakkkkak\",\n\"kk$888888888999999998999999999999988899999999999999999998888888$$$taaaaaanaaakoxxxxxy2tkaaaaawww#wwuooaaaaqooooqaaaaaatkakakkakk\",\n\"ka$8888888999999999899999999999999999888899999999999999999888888<<$taaaaaaaaaaanxxxx2taaka222uwwwwwuoooaaaaqooooaaaaaatakakakkak\",\n\"k$$8888899999999999899999999999999999999988889999999999999998888888$taaaaaanaaaaxxxxttaaa9808uuuwwwuooqoaaaoaoooaaaaqtaaakakkakk\",\n\"k$$88888999999999998999999999999000099999999988889999999999990888888$taaaaaakaaaxxx2aaaa99880uuuuwwwuooqooaaoaaoaaqqrtaakakkakkk\",\n\"k$$8888999999999998899999999990000@@00009999999998888999999998888888$@taaaaaaaaaax2aaaaa988889uuuuuuuuooqqooaooxxqqaatkaakaakakk\",\n\"k$888889999999988888888888999000000@@@0000099999999998888999$@088!!8$@talaankkaaaaaaaaa99888889uuuuuuuuuuo.oooaxqaaaatakaaaaakkk\",\n\"$$888889999998889999999998889909999900@@@099999999999999988<$$@08!!8@@taaakaakaanamlaaa9888888899uuuuuuuuuu##,aqaaaataaakaaakkkk\",\n\"$8888899999888999999999999988999999990@0099000009999999998@ta$<@8888@taaaaaaaaakaaamaan888899988999uuuuuuuu#,aaqaaaataaaakkkkkkk\",\n\"$8888899998899988888999999998899999990@9000000@@0999999998@taa<<<88$talkaaakaaaaaaaaaa888889999899999uuuuu##,aaaaaaatkaaaakkkkkk\",\n\"$888888998898888899999999999988999999909900@000@@9999999988@taa<<<$taakaaaaaalmaaaaaaa98888889999999990000@t8taaataakakaakakkkkk\",\n\"$888888988988899999999999999998899999909900@0900@@999999988@taaa<$taaaakmaaknkaaaaaaaa98888888889999999999$t88tttaaaakakaakakkkk\",\n\"$888888889888999999999999000999889999990990@099900999999988@@taaaaaaaaaaankaaaaakaaaaa98888899999999999999$$tt888ttaaakakaaaakkk\",\n\"$888888898889999888899999990000988999999990@0099900999999888@taaaaaaaaalaaaaankaaaaaaa888988899999999009999$$$tttt8taaakakkakkkk\",\n\"$888888888889988889999999900000098899999990@00999009999999880@taakaaaaaaaamakaakkaaaa98889988889999999000009@@@@@$ttaakakkkkkkkk\",\n\"$888888888898888899999999999000009889999990@099990999999998800@tmaaaamaaaaammlaaaaaaa98889998888999999990000000@@@@takakakakkkkk\",\n\"$8888888888888888999999999999900@0988999990@099999999999998880@@taaaaaaaaaaaaaaaaaaaa98889999988999999999000000@@@@tkakakaaakkkk\",\n\"$8888888888888889999999999999990@@098899990@009999999999998880@@taaaaaaaaaaaakmmaakaa9888999999988999009900000@!!@@taakakkakakkk\",\n\"$8888888888888889999999999999990@@0098899990009999909999998880@@@tlaaanaaaaaaaaaaaaaa9888999999999889990000000@!!@taakakkkkkkakk\",\n\"$88888888888888899999999999999000@00098899900099999099999988888@@taaaaaaaaaaaaaaaaaa98888899999999998899999000@0@@taaakkakkkakkk\",\n\"$88888888888888889999999999990000@@@0998899000999900999999988880@@taaaaaaaaaaaaaaaaa98888899999999999988899990@@@@taakaaakaakakk\",\n\"$8888888888888888889999999990000@@@@@0998990999999000999999888800@taaaaaaaaaaaaaaaaa988888999999999999999888900@@taakaaaaaaaakkk\",\n\"$888888888888888888889999900000@@@00@099889999999900@999999988880@@taaaaaaaaaaaaaka98888888999999999999999998880@taaakakkaaaakkk\",\n\"$88888888888888888888999990000@@@@00@$99989999999900@999999988880@@taaaaaaaaaaaaaaa988888888899999999999999999988taaaakkakaakkkk\",\n\"$8888888888888888888899999000@@@@@00009998999999900@@999999998880@@taaaaaaaaaaaaaa98888888888888899999999999990@taaaaaaaaakkkkkk\",\n\"$8888888888888888888899990000@@@@@$$000998899999900@0999999998888@@taaaaaaaaaaaaaa98888889888889999999999999900@taaaaaaaaakakkkk\",\n\"$888888888888888888889999000@@@0000880099989999990@00999999999888@@taaaaaaaaaaaaa9889988899999999990999000000@@taaaaaaaaaaaaakkk\",\n\"$88888888888888888888899900@@@@000008800998899990@@099999999998880@taaaaaaaaaaaaa9889988999999999990099990@@@@@taaaaaaakakakakkk\",\n\"$8888888888888888888889990@0@@000008880099989990000099999999999888@taaaaaaaaaaaa98899988999999999990099999900@taaaaaaaakkakakakk\",\n\"$888888888888888888888990@@0@@000088880099988990099999999999999988@taaaaaaaaaaaa9889998999999999999000999900@@taaakakakkakakkkkk\",\n\"$888888888888888888888990000@@0008888800099989999999999999999999988taaaaaaaaaaa988999999999999999999000@@@@@@@taaaakaaaakakkkkkk\",\n],\n0, 0, 4.68, {\n    \"a\": color(0), // Black\n    \"b\": color(92, 86, 3), // Dark gold\n    \"c\": color(115, 109, 0), // Gold\n    \"d\": color(161, 129, 13), // Light gold\n    \"e\": color(150, 143, 18), // Shiny gold\n    \"f\": color(59, 36, 4), // Main brown\n    \"g\": color(92, 54, 4), // Light brown\n    \"h\": color(212, 118, 87), // Lighting brown\n    \"i\": color(168, 91, 65), // Light shade brown\n    \"j\": color(89, 53, 35), // Hair shading?\n    \"k\": color(0, 33, 21), // Dark teal\n    \"l\": color(105, 22, 64), // Purple\n    \"m\": color(181, 56, 77), // Light purple\n    \"n\": color(255, 110, 110), // Pink\n    \"o\": color(40), // Dark gray\n    \"p\": color(60), // Dark-ish gray\n    \"q\": color(80), // Semi dark gray\n    \"r\": color(100), // Gray\n    \"s\": color(150), // Light gray\n    \"t\": color(230), // Really light gray\n    \"u\": color(99, 70, 56), // Skin shadow\n    \"v\": color(143, 89, 76), // Skin shading\n    \"w\": color(163, 101, 88), // Skin color\n    \"x\": color(90, 73, 92), // Purple gray\n    \"y\": color(158, 129, 158), // Light purple gray\n    \"z\": color(115, 100, 115), // Shiny purple gray\n    \"1\": color(255, 212, 166), // Light pink\n    \"2\": color(207, 180, 207), // Super light (puray)\n    \"3\": color(255, 230, 0), // Yellow\n    \"4\": color(255, 120, 0), // Orange\n    \"5\": color(255, 157, 59), // Light orange\n    \"6\": color(255, 199, 143), // Super light orange\n    \"7\": color(69, 62, 0), // Super dark gold\n    \"8\": color(41, 4, 4), // Dark red\n    \"9\": color(105, 15, 15), // Red\n    \"0\": color(201, 32, 46), // Lighting red\n    \"@\": color(255, 51, 70), // Lighter red\n    \"#\": color(224, 160, 148), // Skin lighting\n    \"$\": color(97, 7, 7), // Light shade red\n    \"?\": color(99, 54, 28), // Shade skin\n    \"/\": color(10), // Light black\n    \".\": color(191, 123, 111), // Light skin color\n    \",\": color(247, 196, 188), // Lighting skin color\n    \"<\": color(69, 6, 6), // Light dark red\n    \"!\": color(20, 4, 4), // Super dark red\n}, false, 0);\nvar Name = new PixelArt([\n    \"----aaaaaaaa--------aaaaaaaaaaaa----------aaaa----------aaaaaaaaaa----------------------aaaa----------------aaaaaaaa--------aaaaaaaaaa--------aaaaaaaa------\",\n    \"---aaaaaaaaaa------aaaaaaaaaaaaaa--------aaaaaa--------aaaaaaaaaaaa--------------------aaaaaa--------------aaaaaaaaaa------aaaaaaaaaaaa------aaaaaaaaaa-----\",\n    \"--aaxxxxxxxxaa----aaxxxxxxxxxxxxaa------aaxxxxaa------aaxxxxxxxxxxaa------------------aaxxxxaa------------aaxxxxxxxxaa----aaxxxxxxxxxxaa----aaxxxxxxxxaa----\",\n    \"-aaaxxxxxxxxaaa---aaxxxxxxxxxxxxaa-----aaaxxxxaaa-----aaxxxxxxxxxxaaa-----------------aaxxxxaa-----------aaaxxxxxxxxaaa---aaxxxxxxxxxxaaa---aaxxxxxxxxaaa---\",\n    \"aaxxxxxxxxxxxxaa--aaxxxxxxxxxxxxaa----aaxxxxxxxxaa----aaxxxxxxxxxxxxaa----------------aaxxxxaa----------aaxxxxxxxxxxxxaa--aaxxxxxxxxxxxxaa--aaxxxxxxxxxxaa--\",\n    \"aaxxxxxxxxxxxxaa--aaxxxxxxxxxxxxaa---aaaxxxxxxxxaaa---aaxxxxxxxxxxxxaa----------------aaxxxxaa----------aaxxxxxxxxxxxxaa--aaxxxxxxxxxxxxaa--aaxxxxxxxxxxaaa-\",\n    \"aaxxxxaaaaxxxxaa---aaaaaxxxxaaaaa---aaxxxxxxxxxxxxaa--aaxxxxaaaaxxxxaa----------------aaxxxxaa----------aaxxxxaaaaxxxxaa--aaxxxxaaaaxxxxaa--aaxxxxaaaaxxxxaa\",\n    \"aaxxxxaaaaxxxxaa----aaaaxxxxaaaa----aaxxxxxxxxxxxxaa--aaxxxxaaaaxxxxaa----------------aaxxxxaa----------aaxxxxaaaaxxxxaa--aaxxxxaaaaxxxxaa--aaxxxxaaaaxxxxaa\",\n    \"aaxxxxaaaaaaaaa-------aaxxxxaa------aaxxxxaaaaxxxxaa--aaxxxxaaaaxxxxaa----aaaaaaaa----aaxxxxaa----------aaxxxxaaaaxxxxaa--aaxxxxaaaaxxxxaa--aaxxxxaaaaxxxxaa\",\n    \"aaxxxxaaaaaaaa--------aaxxxxaa------aaxxxxaaaaxxxxaa--aaxxxxaaaaxxxxaa---aaaaaaaaaa---aaxxxxaa----------aaxxxxaaaaxxxxaa--aaxxxxaaaaxxxxaa--aaxxxxaaaaxxxxaa\",\n    \"-aaaxoxxoxxxaa--------aaxxxoaa------aaxxoxaaaaxxxoaa--aaxoxxaaaaoxxxaa--aaxxxxxxxxaa--aaxxxoaa----------aaoxoxaaaaxxxxaa--aaxxoxaaaaxxxxaa--aaxxxxaaaaxxxxaa\",\n    \"--aaxxxoxxoxaaa-------aaoxoxaa------aaoxxoaaaaxooxaa--aaxxxoaaaaxoxoaa--aaoxxoxxoxaa--aaoxoxaa----------aaxxxoaaaaxoxoaa--aaxoxoaaaaoxoxaa--aaoxoxaaaaxxoxaa\",\n    \"---aaaooxoooxoaa------aaoxooaa------aaoxxooooxoxoxaa--aaooxoxooxxoaaa---aaooxooxooaa--aaoxooaa----------aaoxooaaaaoxooaa--aaoxooooooxoaaa---aaxxooaaaaoxooaa\",\n    \"---aaaxoooxoooaa------aaxooxaa------aaooxoooooxoooaa--aaxoooooooooaa----aaooooooooaa--aaooxxaa----------aaooxoaaaaooooaa--aaooxooooooxaa----aaooxoaaaaoooxaa\",\n    \"--aaaaaaaaooooaa------aaooooaa------aaooooooooooooaa--aaooooooooooaa-----aaaaaaaaaa---aaooooaa----------aaooooaaaaooxoaa--aaooooooooooaa----aaooooaaaaooooaa\",\n    \"-aaaaaaaaaooooaa------aaooooaa------aaooooooooooooaa--aaooooooooooaaa-----aaaaaaaa----aaooooaa----------aaooooaaaaooooaa--aaooooooooooaaa---aaooooaaaaooooaa\",\n    \"aaooooaaaaooooaa------aaooooaa------aaooooaaaaooooaa--aaooooaaooooooaa----------------aaooooaaaaaaaa----aaooooaaaaooooaa--aaooooaaooooooaa--aaooooaaaaooooaa\",\n    \"aaooooaaaaooooaa------aaooooaa------aaooooaaaaooooaa--aaooooaaooooooaa----------------aaooooaaaaaaaaa---aaooooaaaaooooaa--aaooooaaooooooaa--aaooooaaaaooooaa\",\n    \"aaooooooooooooaa------aaooooaa------aaooooaaaaooooaa--aaooooaaaaooooaa----------------aaooooooooooooaa--aaooooooooooooaa--aaooooaaaaooooaa--aaooooooooooaaa-\",\n    \"aaooooooooooooaa------aaooooaa------aaooooaaaaooooaa--aaooooaaaaooooaa----------------aaooooooooooooaa--aaooooooooooooaa--aaooooaaaaooooaa--aaooooooooooaa--\",\n    \"-aaaooooooooaaa-------aaooooaa------aaooooaaaaooooaa--aaooooaaaaooooaa----------------aaooooooooooooaa---aaaooooooooaaa---aaooooaaaaooooaa--aaooooooooaaa---\",\n    \"--aaooooooooaa--------aaooooaa------aaooooaaaaooooaa--aaooooa-aaooooaa----------------aaooooooooooooaa----aaooooooooaa----aaooooa-aaooooaa--aaooooooooaa----\",\n    \"---aaaaaaaaaa----------aaaaaa--------aaaaaa--aaaaaa----aaaaaa--aaaaaa------------------aaaaaaaaaaaaaa------aaaaaaaaaa------aaaaaa--aaaaaa----aaaaaaaaaa-----\",\n    \"----aaaaaaaa------------aaaa----------aaaa----aaaa------aaaa----aaaa--------------------aaaaaaaaaaaa--------aaaaaaaa--------aaaa----aaaa------aaaaaaaa------\",\n],\n4, 505, 3.8, {\n    \"a\": color(50), // Gray\n    \"x\": color(255, 200, 0), // Yellow\n    \"o\": color(255, 150, 0) // Orange\n}, false, 0);\n\n// Making the blurred art into a image {\n\n// Black background for the edge\nbackground(0);\n\n// Runs the art\nStarLord.run();\n\n// Blur and erode\nfilter(BLUR, 1.5);\n\n// His name\nName.run();\n\n// Blur\nfilter(BLUR, 1.5);\n\n// Makes it into an image\nvar blurred = get(0, 0, 600, 600);\n\n// }\n\n// Makes it so you can right click the canvas to save the image\nenableContextMenu();\n\n// Switches between blurred and not when clicked\nmouseClicked = function () {\n    blur = !blur;\n};\n\n// Draws everything\ndraw = function () {\n    background(0); // Black background\n    if (blur) {\n        image(blurred, 2, 2); // Blurred pixel art\n    } else {\n        \n        // Runs the art\n        StarLord.run();\n        \n        // His name\n        Name.run();\n        \n    }\n};\n\n",
    "title": "Star-Lord (Pixel Art)",
    "votes": 55,
    "created": "9 hours ago",
    "updated": "8 hours ago",
    "type": "PJS",
    "author": {
        "name": "Ace Rogers (Off)",
        "id": "kaid_714276242204949021450419",
        "avatar": "/images/avatars/svg/leaf-blue.svg"
    },
    "dimensions": {
        "width": 600,
        "height": 600
    },
    "forks": [
        {
            "title": "Spin-off of \"Star-Lord (Pixel Art)\"",
            "id": "4521511797833728",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "David D",
                "id": "kaid_7624324260586488996642156"
            }
        },
        {
            "title": "temporily",
            "id": "5247638782787584",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "JeansonV",
                "id": "kaid_1052770694110426314942556"
            }
        },
        {
            "title": "Spin-off of \"Star-Lord (Pixel Art)\"",
            "id": "5869824220512256",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "Foster, Blake",
                "id": "kaid_753473551755021369428677"
            }
        },
        {
            "title": "Spin-off of \"Star-Lord (Pixel Art)\"",
            "id": "5985151642157056",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "Foster, Blake",
                "id": "kaid_753473551755021369428677"
            }
        }
    ],
    "posts": {
        "tips": [
            {
                "replyCount": 0,
                "votes": 13,
                "date": "9 hours ago",
                "author": {
                    "name": "Ace Rogers (Off)",
                    "id": "kaid_714276242204949021450419",
                    "avatar": "/images/avatars/svg/leaf-blue.svg"
                },
                "text": "<b>Subscribe to get notified whenever I make a new program</b>!<br><br>https://www.khanacademy.org/computer-programming/my-subpage/5880949017985024",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 4,
                "date": "8 hours ago",
                "author": {
                    "name": "NL",
                    "id": "kaid_101904269317089495055459",
                    "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                },
                "text": "man simply cannot leave xD<br><br>nice squares!<br><br>blurred for thumbnail but regular for graphic :)",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Yeah, you're right. XD<br><br>Thanks! :)<br><br>Okay, I'll change the thumbnail. :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 3,
                "date": "8 hours ago",
                "author": {
                    "name": "CZS",
                    "id": "kaid_676584471536152741627316",
                    "avatar": "/images/avatars/svg/primosaur-ultimate.svg"
                },
                "text": "Looks amazing! I seem to be in the minority here, but I like the blurred version slightly more.<br><br>I also think it's more authentic—I'm not old enough to remember this, but I'm told that pixel art looked more blurry back when games were played on CRT monitors, whereas the crisp-edged pixel art you usually see these days is more of a modern phenomenon.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Thanks! :D<br>I haven't decided which I like better yet. :P<br><br>Someone else said something about pixel art used to be blurred, so I think you're right. :)"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "5 hours ago",
                "author": {
                    "name": "theBTG15",
                    "id": "kaid_1184047636356324637542824",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "Unblurred. BTW THIS IS AMAZING! You gotta love Star Lord.",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "9 hours ago",
                "author": {
                    "name": "Cookie",
                    "id": "kaid_1826046083730180486895887",
                    "avatar": "/images/avatars/svg/leafers-sapling.svg"
                },
                "text": "Wow, this looks amazing! I can't imagine making a pixel art this huge! It must have been very tedious.<br><br>Hmm, they both look cool, but I would say the not blurred one :)",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Thanks! :D Yeah, it took a while. XD No, not really. :P<br><br>Okay. :)"
                    }
                ]
            },
            {
                "replyCount": 5,
                "votes": 1,
                "date": "7 hours ago",
                "author": {
                    "name": "TH3 ROUG3 L3G3ND™",
                    "id": "kaid_2809101008758048501324524",
                    "avatar": "/images/avatars/svg/boggle-blue.svg"
                },
                "text": "I THOUGHT YOU WERE LEAVING (you must have listened to my warning) XD",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "I am. I just couldn't without one final quality program. XD"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Plus, I'm not totally leaving. I'm still staying to comment to some of my closest friends (and some others when I need to reply to someone) and to work on a project when I get time, but I'm mostly trying to leave to recover from my stress. :)"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "TH3 ROUG3 L3G3ND™",
                            "id": "kaid_2809101008758048501324524",
                            "avatar": "/images/avatars/svg/boggle-blue.svg"
                        },
                        "text": "Oh, hmmm, just tell me when you make a new project when you get back(So that I can yell at you ;)"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "...Okay. XD<br>I'll probably come back for CoC (I told Duke I would) and then I might go inactive again. But once I'm back, I'll probably try and finish Frontline and Monopoly that I was programming but never finished. :) So you can yell at me when I release one of those. XP"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "TH3 ROUG3 L3G3ND™",
                            "id": "kaid_2809101008758048501324524",
                            "avatar": "/images/avatars/svg/boggle-blue.svg"
                        },
                        "text": "Lol, I will"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "8 hours ago",
                "author": {
                    "name": "Chickenfarmer2009",
                    "id": "kaid_287879839213083022099587",
                    "avatar": "/images/avatars/svg/piceratops-ultimate.svg"
                },
                "text": "This is spectacular! Better than any pixel art I could make XD<br><br>Glad your not gonna go down without leaving a message.<br><br>Can't decide on the blur or not blur... Um... I might actually have to go with the blurred one.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Thanks! :D<br>XD I'm sure you could make something better if you put in at least 7 hours of work. XP<br><br>Yeah. XD<br><br>Okay. :)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "6 hours ago",
                "author": {
                    "name": "- k a t i t e -",
                    "id": "kaid_312040000225853665820004",
                    "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                },
                "text": "whoa, this is so amazing! it looks like a pixelized photograph :D",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Thanks! :D<br>Yeah, it does. :)"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "4 hours ago",
                "author": {
                    "name": "JLE",
                    "id": "kaid_344949764307318233637518",
                    "avatar": "/images/avatars/svg/aqualine-sapling.svg"
                },
                "text": "Ace !! good 2 c that u had time to make one more graphic =)<br><br>I'ma miss these graphics when u gone =(",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 3,
                "votes": 1,
                "date": "9 hours ago",
                "author": {
                    "name": "Duke",
                    "id": "kaid_351465532815782433620675",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "lol new you had something else up your sleaves :P",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Yeah, I was just keeping the wip secret for more of a surprise when I released it. :P"
                    },
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "Duke",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Ok so personally I prefer the normal pixel art but the blur is what most pixel art game would do so it definitely looks good that way too."
                    },
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Yeah, the blur makes it look less jaggy, but not blurred is more clearer and you can see more of the different shading. :)"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "4 hours ago",
                "author": {
                    "name": "𝓧𝓛𝓟 [Off]",
                    "id": "kaid_387597695665654041806576",
                    "avatar": "/images/avatars/svg/piceratops-seed.svg"
                },
                "text": "42nd. :O<br>Ima miss being that late on your projects. <:(<br><br>Honestly I like both images. Great job! :)",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 4,
                "votes": 1,
                "date": "7 hours ago",
                "author": {
                    "name": "TheMessenger",
                    "id": "kaid_492737111195244262916025",
                    "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                },
                "text": "AAAHH! My jaw DROPPED when I saw this! O.O<br>I'm so sad you're leaving, but even so, you still come out and make a spectacular program for us all to remember you by! I hope life treats you well out there, and best wishes from yours truly :)<br>(I think it looks best unblurred.)",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "XD<br>Yeah, me too. But I'll be back. :) XD<br>Thanks! :)<br>Okay.<br>Btw, did you ever get my comment asking what types of features you would like to have for a pixel art drawing tool?"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "TheMessenger",
                            "id": "kaid_492737111195244262916025",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "Umm, no?<br><b>2 hours later</b>...<br>Okay, I found it! lol<br>Honestly, I have no idea, especially since I don't have much experience with tools, so I guess you can just surprise me. :)<br>And oh, well I'm glad you're not leaving forever! Now my little speech seems cheesy... XD"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "XD<br>Okay. :)<br>It was still nice though. :)"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "TheMessenger",
                            "id": "kaid_492737111195244262916025",
                            "avatar": "/images/avatars/svg/duskpin-sapling.svg"
                        },
                        "text": "XD<br>Well, thank you ;)"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "7 hours ago",
                "author": {
                    "name": "sugarnlight",
                    "id": "kaid_516497598968512440616556",
                    "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                },
                "text": "WOW it looks awesome!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 3,
                "votes": 1,
                "date": "7 hours ago",
                "author": {
                    "name": "Eyeinthesky",
                    "id": "kaid_6136710333637048514584747",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "I can't wait 'til CoC then :D<br><br>Until then...<br><br>Farewell!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Thread stalker! XP<br><br>Farewell!"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Eyeinthesky",
                            "id": "kaid_6136710333637048514584747",
                            "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                        },
                        "text": "Yep! XD<br><br>come back soon! :'("
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "XD<br><br>I'll try. But it'll be about 2 months before you see a quality program from me. :P After CoC, I don't know when I'll make another program."
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "8 hours ago",
                "author": {
                    "name": "CodeNinja",
                    "id": "kaid_6247985199070618801670730",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "This is awesome! Go marvel!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 5,
                "votes": 1,
                "date": "6 hours ago",
                "author": {
                    "name": "Stitch Girl💠",
                    "id": "kaid_6490115305785159643926933",
                    "avatar": "/images/avatars/svg/marcimus-red.svg"
                },
                "text": "I see nothing but black for some reason",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Try restarting the program and don't go down in the comments. :)"
                    },
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "Stitch Girl💠",
                            "id": "kaid_6490115305785159643926933",
                            "avatar": "/images/avatars/svg/marcimus-red.svg"
                        },
                        "text": "I think it was my laptop doing it. It got like super laggy. Were you able to see my comments on the other project?"
                    },
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Oh, okay.<br>You mean the one on the CJCool MC skin? Because I replied to that. :)"
                    },
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "Stitch Girl💠",
                            "id": "kaid_6490115305785159643926933",
                            "avatar": "/images/avatars/svg/marcimus-red.svg"
                        },
                        "text": "I sent a reply back? My laptop hates me and has been acting up for the pass half hour"
                    },
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Oh, well I didn't get your reply back."
                    }
                ]
            },
            {
                "replyCount": 22,
                "votes": 1,
                "date": "9 hours ago",
                "author": {
                    "name": "Coder2098",
                    "id": "kaid_673573024191290348573492",
                    "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                },
                "text": "wow this is amazing Ace! the shading is amazing!! i prefer the unblurred one personally :P",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Thanks! :D<br>Yeah, I tried getting all the shading and lighting to make it look better. :P<br>I'm still undecided which I like better. XP"
                    },
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Coder2098",
                            "id": "kaid_673573024191290348573492",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": "ofc!<br>lol it looks awesome KA's really gonna be different without u :[ but i hope u enjoy your well deserved break!!<br>XD i get the feeling"
                    },
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "I know. And I don't like leaving it that way. :( I'll try. :)<br>XD"
                    },
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Coder2098",
                            "id": "kaid_673573024191290348573492",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": "yeahh but as with anything it'll become whole in time :) plus you've helped so many people that they are more than ready to take up a stronger position yk?"
                    },
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Yeah, but hopefully not too long. :P<br>Yeah, some of them. But some still have some things to learn that I could teach. :/"
                    },
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Coder2098",
                            "id": "kaid_673573024191290348573492",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": "eh KA is constantly evolving someone will come along!<br>lol yeah but if u look at it like that then one can never quit, there will always be a newcomer and someone in need of teaching thats where other people come in, people will come and step up in your place they won't ever quite fill it like u but they'll do it in their own way :)"
                    },
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Yeah, but there are few advanced programmers that I've seen actually go out of their way to help the newer generation (no offense to anyone). They help when they are asked a question or maybe reply to a help request. But I like actually going to the people that need help. That's also how I make a lot of new friends. :)<br>Yeah, that's why I don't want to. And I want to be there to help when they do come.<br>True. :P"
                    },
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Coder2098",
                            "id": "kaid_673573024191290348573492",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": "yeah i spose thats true but i wouldn't worry about it everything comes in its own time right? <br>lol yeah thats sorta how chicken and i became friends! XD <br>its hard taking a step back ik but trust me there are better things in wait for u than KA lol"
                    },
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "I guess. :P<br>XD<br>It's probably how I became friends with 1/3 of my current friends. :P 1/3 are probably friends that I met while on the same team and the other 1/3 is just by chance that we met. :)<br>Yeah, I know. It's just that I've been mostly active (sometimes I wasn't) on KA for about 4 years and I don't want to leave. :/<br>But I know if I stay, it'll just be worse."
                    },
                    {
                        "date": "8 hours ago",
                        "author": {
                            "name": "Coder2098",
                            "id": "kaid_673573024191290348573492",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": ".<br>.<br>lol wow! thats a lot more than i was expecting tbh!<br>.<br>yeahh maybe just take a break then? come back in like a month or two that always helps. but just take it easy, maybe only work on things when u really want to yk?"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "XP<br>Yeah, I have over 64 friends on KA. XD<br><br>Yeah, that's what I'm planning on doing. Because I told Duke I'd try to come back for CoC. But by then I'm planning on organizing how I'm doing things so I don't get so stressed. :)<br>But that's the problem. I want to help people and to do collaborations. And that's how I overfilled my plate which led me to being stressed. So when I come back, I'm going to have a limit on things that I'm doing at once. :P"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Coder2098",
                            "id": "kaid_673573024191290348573492",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": "holy pony!! 0-0 <br><br>mmk! yeah just don't overbook yourself if u overbook then the stress is too much.. lol yeah im the same wayyy! thats what i started to do cause otherwise i get really stressed and whatnot too. another thing that helps is having other hobbies so u can just step back easily like i do archery on the side, and art and music as my career (for lack of a better term) so it helps to have those to fall onto when i am sick of KA"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Coder2098",
                            "id": "kaid_673573024191290348573492",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": "but another thing is the hardest step is the first step, once u get past that its not too bad :)"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "I know. And I'm subscribed to, I think, all of them, plus some other coders that I like. :P<br><br>I know that now. I just had to learn it the hard way. XP<br>Ah.<br>I have been doing that already. My hobbies are: Programming XP, Gaming, watching some movies that I like, reading, writing books, and listening to music is nice. :)<br>Archery. I like it, but I've only done it once. :/ I would like to get better at it though. :)"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Yeah, but it's hard. XP<br>But it's something I need to do, so I will do it. :)"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Coder2098",
                            "id": "kaid_673573024191290348573492",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": "jeez the spam must be real! XD<br><br>lol hey i had to learn it the hard way too :P like rn im SUPER booked irl and coding wise but i am lessing the coding one and working on my organizational skills so while i would have liked to learn it from someone ELSES experience i learned it all the same!<br>XDD well that ones gonna take a backseat, yeah ig thats a hobby of mine too :P, same, same (u have GOT to read 1984 its an amazing book for this day in age), my grandpa does that and i sorta do it but i mostly do comic books :P, fair!<br>haha its hard! oh and make SURE u have proper safety gear cause it can hurt if u dont XD ask me how i know 🫥 just start by trying to hit a tree then get more accurate from there :P<br><br>yeah it is what it is!"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "XD<br><br>XD<br>Wait, it's just called \"1984\"?<br>I do mostly fantasy and some other books that I won't mention because of the rules. :P<br>Um, is it bad that I didn't. O.O I was using a training bow (I think that's what it was called) and the tip wasn't too sharp. XP<br>Um, I was using targets. :P<br><br>Yep."
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Coder2098",
                            "id": "kaid_673573024191290348573492",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": ".<br><br>yup! its written by George Orwell. it does have some inappropriate themes but once u look past that its an incredible book!<br>ah okay! XD fair<br>HAHHA well at least u didn't get lashed :P was it just a small recurve then i spose?  ah dull points okay!  that works too but price wise the trees are free! XDD i started on dull points but now i use hunting points. but really its not the arrows that will hurt u, its the BOW more specifically the string of the bow 0-0 if that sucker decides to go a lil out of line and lash ur arm it will and it WILL hurt XD i have a scar from that :P and once u get good enough u can do bow hunting but thats not really my thing tbh im a lil bit too soft hearted :P"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Okay, I'll add that to my list of books that people want me to read that I'll try to read after I finish a tall stack of books that I want to read. XD<br>XD<br>Um, maybe. I did get a little bit of my skin peeled up. :P<br>They weren't mine. And I didn't have to pay. >:P<br>Cool! I know. That's why I tried to stay away from getting hit by the string. XP<br>XD Luckily that hasn't happened to me. XP<br>Oh.<br>Yeah, I don't plan on hunting. I just kinda want to do it because it's fun and I want to get good at it. I also want to get good at blacksmithing and sword fighting. :)"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Coder2098",
                            "id": "kaid_673573024191290348573492",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": "XDD fair! <br><br>LOLLL <br>XDD the best archery range is a free one!<br>yeahh its best if u get an arm guard and a hand guard then u will likely not get hit by the string anymore :P<br>yeah just wait XD<br>.<br>yeah same here :) oo i have a friend who does blacksmithing! its pretty cool the kinda things he can make! yess fencing! i live out in the country so we just do fencing with no protection and random sticks in the yard XD but normal fencing is always fun!"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Hey, can we move here so we aren't talking about something that isn't related to the program. :P<br>https://www.khanacademy.org/computer-programming/archery/6078710659596288<br>This was to be an archery game, before I was too busy to finish it. XP"
                    },
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Coder2098",
                            "id": "kaid_673573024191290348573492",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": "alrighty! sounds good :P"
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
                "text": "Hah. XD Funny you should make an art of him, as \"Come and Get your Love\" by Redbone is stuck inside my head. I also put Chris Pratt for governor on the official ballot yesterday. XD<br><br>Well done! :)",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "7 hours ago",
                "author": {
                    "name": "ASBackup",
                    "id": "kaid_714780036830891967670231",
                    "avatar": "/images/avatars/svg/aqualine-tree.svg"
                },
                "text": "looks great :)",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 3,
                "votes": 1,
                "date": "7 hours ago",
                "author": {
                    "name": "cwalsh1223 BBB#",
                    "id": "kaid_792288208072906614241148",
                    "avatar": "/images/avatars/svg/spunky-sam-red.svg"
                },
                "text": "Nice pixel art. You did a good job. I prefer the crispy version.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Thanks! :D<br>\"The crispy version\"? XD Which one do you count as that? o.O"
                    },
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "cwalsh1223 BBB#",
                            "id": "kaid_792288208072906614241148",
                            "avatar": "/images/avatars/svg/spunky-sam-red.svg"
                        },
                        "text": "I mean the non-blurred version. The edges are crisper. ʘ͜ʘ"
                    },
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Okay. That's what I thought, I just wanted to make sure. :)"
                    }
                ]
            },
            {
                "replyCount": 0,
                "votes": 1,
                "date": "9 hours ago",
                "author": {
                    "name": "Ducky Momo",
                    "id": "kaid_803024247073237306758396",
                    "avatar": "/images/avatars/svg/duskpin-ultimate.svg"
                },
                "text": "This is epic!",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 2,
                "votes": 1,
                "date": "9 hours ago",
                "author": {
                    "name": "Luke Ellis",
                    "id": "kaid_8535468719137003545030723",
                    "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                },
                "text": "This is the best pixel art that I've ever seen on KA. Great job, Ace.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "Ace Rogers (Off)",
                            "id": "kaid_714276242204949021450419",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Thanks, but other programmers (like Green Ghost and Lazerwolf) have made better ones. :P<br>Thanks! :D"
                    },
                    {
                        "date": "9 hours ago",
                        "author": {
                            "name": "Luke Ellis",
                            "id": "kaid_8535468719137003545030723",
                            "avatar": "/images/avatars/svg/orange-juice-squid.svg"
                        },
                        "text": "Yeah, I know. I just don't think I've viewed them yet."
                    }
                ]
            }
        ],
        "questions": []
    }
}