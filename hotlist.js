var json = {"code":"/** My Entry to Blue Dragon's car contest. I joined in the beginner bracket.\n * \n * You know how everyone codes pictures of vehicles showing the front or the side? Well I    decided to code one showing the back. The back of a vehicle always gets underappreciated.      Let's give it some attention. I present to you, the rear view of an old truck.\n * \n * \n * If you liked this graphic, consider subscribing for more graphics and soon games. You know you want to.\nhttps://www.khanacademy.org/computer-programming/luke-elliss-subpage/6662691338240000\n * \n * \n * #6 on the hotlist.\n * \n * #5 on the hotlist 40 minutes later.\n * \n * Wow #3 on the hotlist an hour later.\n**/\n\n//Background {\nbackground(245, 245, 245);\n//}\n\n//Shadow Under Car {\nnoStroke();\nfill(166, 113, 70);\npushMatrix();\ntranslate(198, 311);\nrotate(2);\nellipse(0, 0, 357, 20);\npopMatrix();\n//}\n\n//Top of car {\nstroke(0, 0, 0);\nfill(170, 189, 174);\nbeginShape();\nvertex(284, 168);\nbezierVertex(281, 95, 294, 90, 138, 94);\nbezierVertex(107, 96, 86, 99, 83, 179);\nbezierVertex(111, 166, 161, 172, 284, 168);\nendShape();\n//}\n\n//Shadow {\nfill(120, 148, 122);\nnoStroke();\nbeginShape();\nvertex(278, 167);\nbezierVertex(277, 120, 281, 106, 226, 107);\nbezierVertex(159, 106, 124, 101, 124, 125);\nvertex(121, 183);\nendShape();\n//}\n\n//Ridge close to top {\nstrokeWeight(2);\nstroke(0, 0, 0);\nnoFill();\nbeginShape();\nvertex(277, 119);\nbezierVertex(246, 118, 126, 107, 94, 119);\nendShape();\n//}\n\n//Back window {\nstrokeWeight(1);\nfill(255, 255, 255);\nrect(152, 124, 98, 34, 7);\nfill(214, 186, 116, 195);\nstroke(0, 0, 0);\nstrokeWeight(3);\nrect(152, 124, 98, 34, 7);\n//}\n\n//Window Frame In Back Window {\nfill(0, 0, 0);\nbeginShape();\nvertex(225, 158);\nbezierVertex(231, 147, 219, 126, 249, 131);\nbezierVertex(251, 125, 216, 125, 220, 126);\nvertex(217, 158);\nvertex(230, 158);\nendShape();\n//}\n\n//Shade over to simulate glass {\nfill(214, 186, 116, 70);\nstroke(0, 0, 0);\nstrokeWeight(3);\nrect(152, 124, 98, 34, 7);\n//}\n\n//Left Side Window {\nstrokeWeight(2);\nfill(255, 255, 255);\nbeginShape();\nvertex(114, 164);\nvertex(117, 129);\nbezierVertex(119, 113, 91, 124, 95, 132);\nvertex(91, 167);\nvertex(114, 164);\nendShape();\n//}\n\n//Shade over to simulate glass {\nfill(214, 186, 116, 195);\nbeginShape();\nvertex(114, 164);\nvertex(117, 129);\nbezierVertex(119, 113, 95, 124, 95, 132);\nvertex(91, 167);\nvertex(114, 164);\nendShape();\n//}\n\n//Fills in spots without color {\nstroke(0, 0, 0);\nstrokeWeight(2);\nfill(0, 0, 0);\nrect(37, 222, 50, 46);\nrect(24, 256, 20, 12);\nnoStroke();\nrect(70, 222, 9, 40);\nfill(170, 189, 174);\nrect(83, 170, 40, 20);\nfill(170, 189, 174);\nrect(73, 178, 50, 91);\nfill(120, 148, 122);\nrect(56, 200, 53, 25);\nrect(71, 210, 10, 50);\nstroke(0, 0, 0);\n//}\n\n//Hood {\nfill(170, 189, 174);\nbeginShape();\nvertex(82, 173);\nbezierVertex(61, 178, 59, 191, 58, 205);\nvertex(76, 202);\nvertex(82, 173);\nendShape();\nstrokeWeight(1);\nbeginShape();\nvertex(74, 176);\nbezierVertex(70, 187, 68, 193, 69, 202);\nendShape();\nstrokeWeight(2);\n//}\n\n//Front Left Tire {\nfill(135, 94, 50);\nstrokeWeight(4);\nstroke(0, 0, 0);\nellipse(59, 273, 13, 40);\nstroke(92, 90, 90);\nstrokeWeight(10);\nnoFill();\nellipse(58, 273, 23, 52);\nstroke(0, 0, 0);\nstrokeWeight(2);\nfill(92, 90, 90);\nbeginShape();\nvertex(65, 303);\nvertex(73, 303);\nbezierVertex(81, 306, 87, 281, 85, 270);\nvertex(75, 270);\nbezierVertex(74, 285, 75, 294, 63, 303);\nendShape();\n//}\n\n//Front Left Tire Bolts {\nstrokeWeight(3);\npoint(57, 284);\npoint(60, 285);\npoint(61, 281);\npoint(61, 277);\npoint(61, 273);\npoint(61, 269);\npoint(60, 265);\npoint(58, 261);\n//}\n\n//Front Left Tire Cover {\nstrokeWeight(2);\nfill(170, 189, 174);\nbeginShape();\nvertex(31, 263);\nbezierVertex(23, 196, 78, 175, 74, 269);\nvertex(72, 266);\nbezierVertex(63, 205, 45, 211, 35, 263);\nendShape();\n//}\n\n//Lower Part of Left Door {\nstroke(0, 0, 0);\nfill(170, 189, 174);\nbeginShape();\nvertex(110, 192);\nbezierVertex(107, 200, 106, 200, 110, 264);\nvertex(79, 264);\nvertex(76, 214);\nbezierVertex(75, 193, 78, 198, 110, 192);\nendShape();\n//}\n\n//Random Details/lines {\nstrokeWeight(1);\nnoFill();\nbeginShape();\nvertex(82, 179);\nvertex(115, 171);\nvertex(193, 171);\nendShape();\nbeginShape();\nvertex(112, 173);\nvertex(110, 194);\nendShape();\nfill(88, 102, 89);\nrect(75, 267, 53, 4);\n//}\n\n//Filling in some empty areas {\nnoStroke();\nfill(120, 148, 122);\nrect(231, 170, 134, 69);\nellipse(365, 174, 6, 7);\npushMatrix();\ntranslate(123, 182);\nrotate(-6);\nrect(0, 0, 100, 10);\npopMatrix();\nrect(122, 172, 10, 95);\nfill(0, 0, 0);\nrect(211, 250, 8, 8);\n//}\n\n//Outline of Truckbed {\nstroke(0, 0, 0);\nnoFill();\nbeginShape();\nvertex(121, 183);\nvertex(208, 169);\nvertex(365, 170);\nbezierVertex(371, 174, 368, 176, 364, 179);\nvertex(365, 237);\nbezierVertex(377, 233, 375, 262, 372, 256);\nvertex(217, 258);\nendShape();\n//}\n\n//Back of Truckbed {\nfill(204, 111, 49);\nrect(227, 172, 134, 69);\n//}\n\n//Left Side of Truckbed {\nfill(204, 111, 49);\nbeginShape();\nvertex(126, 187);\nvertex(206, 174);\nvertex(208, 243);\nvertex(126, 261);\nvertex(126, 187);\nendShape();\nrect(126, 258, 15, 11);\n//}\n\n//Left Corner Panel of Truckbed {\nfill(204, 111, 49);\nbeginShape();\nvertex(227, 173);\nvertex(207, 174);\nvertex(207, 243);\nvertex(227, 240);\nvertex(227, 173);\nendShape();\n//}\n\n//Rear Right Tire {\nfill(92, 90, 90);\nbeginShape();\nvertex(340, 312);\nvertex(314, 312);\nbezierVertex(299, 308, 294, 273, 303, 257);\nvertex(344, 257);\nbezierVertex(350, 265, 350, 301, 338, 312);\nendShape();\nfill(0, 0, 0);\nellipse(315, 276, 23, 40);\nnoFill();\nbeginShape();\nvertex(325, 311);\nbezierVertex(335, 301, 337, 264, 331, 258);\nendShape();\n//}\n\n//Rear Axle {\nfill(41, 31, 31);\nrect(239, 251, 30, 20);\nellipse(255, 275, 35, 35);\nnoStroke();\nrect(212, 268, 104, 12);\nrect(281, 252, 10, 20);\nrect(218, 252, 10, 20);\n//}\n\n//Rear Bumper {\nstroke(0, 0, 0);\npushMatrix();\ntranslate(217, 240);\nrotate(-1);\nfill(120, 148, 122);\nrect(0, 0, 156, 18, 4);\npopMatrix();\n//}\n\n//Rear Lights {\nfill(156, 20, 20);\nellipse(218, 207, 15, 15);\nellipse(368, 209, 15, 15);\nfill(171, 70, 70);\nnoStroke();\nellipse(220, 206, 5, 5);\nellipse(370, 209, 5, 5);\n//}\n\n//Shadow Under Rear Left Tire Cover {\nfill(0, 0, 0);\nrect(146, 233, 61, 44);\nrect(157, 225, 38, 10);\nfill(204, 111, 49);\nrect(208, 241, 10, 11);\n//}\n\n//Rear Left Tire {\nfill(135, 94, 50);\nstrokeWeight(4);\nstroke(0, 0, 0);\nellipse(183, 278, 23, 51);\nnoFill();\nstroke(92, 90, 90);\nstrokeWeight(11);\nellipse(181, 278, 32, 63);\nstrokeWeight(2);\nstroke(0, 0, 0);\nfill(92, 90, 90);\nbeginShape();\nvertex(184, 314);\nvertex(204, 314);\nbezierVertex(215, 305, 220, 276, 209, 248);\nvertex(197, 248);\nbezierVertex(209, 272, 202, 314, 184, 314);\nendShape();\n//}\n\n//Rear Left Tire Bolts {\nstrokeWeight(4);\npoint(184, 296);\npoint(186, 290);\npoint(187, 284);\npoint(187, 277);\npoint(186, 270);\npoint(184, 264);\npoint(180, 260);\npoint(175, 266);\npoint(178, 294);\n//}\n\n//Rear Left Tire Cover {\nstroke(0, 0, 0);\nstrokeWeight(2);\nfill(170, 189, 174);\nbeginShape();\nvertex(141, 274);\nbezierVertex(130, 200, 215, 199, 208, 255);\nvertex(200, 255);\nbezierVertex(200, 220, 144, 207, 145, 274);\nendShape();\n//}\n\n//Truckbed Details {\nline(127, 194, 225, 178);\nline(144, 234, 144, 191);\nstrokeWeight(1);\nline(198, 222, 198, 183);\nstrokeWeight(3);\nline(228, 240, 226, 174);\nstrokeWeight(2);\nline(243, 239, 242, 184);\nline(347, 237, 347, 182);\nline(226, 182, 359, 182);\nstrokeWeight(1);\nline(242, 197, 348, 197);\nline(244, 211, 347, 211);\nline(244, 225, 348, 225);\nstrokeWeight(1);\nstroke(140, 78, 36);\nline(137, 194, 137, 256);\nline(155, 191, 155, 223);\nline(166, 188, 166, 216);\nline(177, 187, 177, 214);\nline(189, 186, 189, 217);\n//}\n\n//Finishing Details {\nnoStroke();\nfill(71, 87, 72);\nrect(219, 244, 15, 10);\nstroke(0, 0, 0);\nstrokeWeight(2);\nline(371, 250, 354, 251);\nline(123, 101, 128, 96);\nstrokeWeight(1);\nline(93, 228, 87, 234);\nline(98, 259, 91, 255);\nline(103, 252, 105, 245);\nline(93, 200, 96, 203);\nline(205, 97, 200, 93);\nline(299, 256, 288, 251);\nline(120, 253, 119, 245);\nline(122, 231, 121, 228);\nline(329, 200, 322, 205);\nline(248, 215, 245, 208);\nline(147, 203, 145, 207);\nline(215, 236, 219, 233);\nline(215, 124, 200, 148);\nline(200, 150, 218, 126);\nline(200, 151, 224, 123);\nline(181, 133, 181, 123);\nline(181, 134, 183, 121);\nline(182, 124, 183, 113);\nline(192, 119, 184, 113);\nline(176, 114, 192, 122);\nline(173, 123, 187, 115);\nline(126, 143, 122, 148);\nfill(204, 111, 49);\nbeginShape();\nvertex(305, 177);\nbezierVertex(310, 175, 313, 190, 303, 187);\nbezierVertex(322, 197, 321, 168, 305, 177);\nendShape();\n//}\n","title":"In My Dust","votes":50,"created":"2 days ago","updated":"2 days ago","type":"PJS","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"dimensions":{"width":400,"height":400},"forks":[{"title":"Spin-off of \"In My Dust\"","id":"4662066471682048","forks":0,"votes":1,"author":{"name":"Ryleigh.","id":"kaid_382116119050822496965100"}}],"posts":{"tips":[{"replyCount":0,"votes":13,"date":"2024-10-25T14:26:24.740658Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"Subscribe for more.\nhttps://www.khanacademy.org/computer-programming/luke-elliss-subpage/6662691338240000\nDon't let this sink.","locked":false,"pinned":false,"replies":[]},{"replyCount":0,"votes":3,"date":"2024-10-26T10:12:55.472969Z","author":{"name":"฿ⱠɄɆ ĐⱤ₳₲Ø₦™️","id":"kaid_1149753796445177146720975","avatar":"/images/avatars/svg/aqualine-ultimate.svg"},"text":"32 voet, also heres the link to the car contest i made that luke ellis was talking about,if u want to join, however there is only 5 days left, as it ends on the 31st of october:)  \n\nhttps://www.khanacademy.org/computer-programming/car-contest/5357786094813184","locked":false,"pinned":false,"replies":[]},{"replyCount":0,"votes":3,"date":"2024-10-26T16:17:59.108694Z","author":{"name":"Duke :P","id":"kaid_351465532815782433620675","avatar":"/images/avatars/svg/starky-ultimate.svg"},"text":"Wow excellent job Luke!\nThis is gonna beat whatever I am gonna be able to pull out my sleave lol\nPartly because I will only have one day to work on it ;P\n\nThe only flaw is that the front wheel is missing :P","locked":false,"pinned":false,"replies":[]},{"replyCount":1,"votes":2,"date":"2024-10-25T16:51:38.744456Z","author":{"name":"ASBackup","id":"kaid_714780036830891967670231","avatar":"/images/avatars/svg/aqualine-tree.svg"},"text":"ey luke :)\n\ni was there from cups with holes lol definitely progressed past that.\ni was ur first voter too :P\n\nanyhoo looks great :D","locked":false,"pinned":false,"replies":[{"date":"2024-10-25T16:55:59.166542Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"lol. Yeah, thanks for motivating me to do better, and also for being my first voter. Funny, because that was only a month ago. . .\nEither way, thanks."}]},{"replyCount":1,"votes":1,"date":"2024-10-25T19:21:20.283513Z","author":{"name":"keottman","id":"kaid_1045314495356137785044238","avatar":"/images/avatars/svg/old-spice-man-blue.svg"},"text":"cool truck","locked":false,"pinned":false,"replies":[{"date":"2024-10-25T19:41:49.504445Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"lol. My program in two words."}]},{"replyCount":17,"votes":1,"date":"2024-10-25T14:41:17.364278Z","author":{"name":"Norwegian Pathways","id":"kaid_1082366231138740611717261","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"Third vote.\n\nNice Job!\n\nI haven't seen a truck this good before. Is this an entry to the car contest?","locked":false,"pinned":false,"replies":[{"date":"2024-10-25T14:43:33.102056Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"lol. Yes it is. I said it on the top of the code."},{"date":"2024-10-25T14:45:34.641271Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"You're catching up in EP! Better start grinding."},{"date":"2024-10-25T14:46:21.875687Z","author":{"name":"Norwegian Pathways","id":"kaid_1082366231138740611717261","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"oops... Sometimes I accidentally-on-purpose forget to read that.\n\nI'm surprised. You usually respond within minutes. You must be online all day.\n\nI'm also working on my Subpage rn, but I was browsing other people's to see if I can come up with any ideas."},{"date":"2024-10-25T14:48:26.859014Z","author":{"name":"Norwegian Pathways","id":"kaid_1082366231138740611717261","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"You too!"},{"date":"2024-10-25T14:59:01.312607Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"lol.\n\nWell. . . I am really active. Recently, I've just been hanging around in the coding community, not getting much EP. I do need to work on that. Don't worry, though! I do have a life.\n\nYou probably didn't get much inspiration from my Subpage; it's kinda plain and boring."},{"date":"2024-10-25T15:00:47.703784Z","author":{"name":"Norwegian Pathways","id":"kaid_1082366231138740611717261","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"Your subpage isn't that bad. I've seen worse. Trust me."},{"date":"2024-10-25T15:04:14.768881Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"Still could use some kind of detailed background, though. . ."},{"date":"2024-10-25T15:05:26.325498Z","author":{"name":"Norwegian Pathways","id":"kaid_1082366231138740611717261","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"Bruh... I'm jumping from tab to tab, and I currently have 7 tabs open!"},{"date":"2024-10-25T15:11:44.395127Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"lol. I also have 7 tabs open."},{"date":"2024-10-25T15:14:45.253717Z","author":{"name":"Norwegian Pathways","id":"kaid_1082366231138740611717261","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"Really? At least I'm not losing it."},{"date":"2024-10-25T15:16:42.947701Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"Yessir. And if anyone's losing it, it's me."},{"date":"2024-10-25T15:23:36.854199Z","author":{"name":"Norwegian Pathways","id":"kaid_1082366231138740611717261","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"Yes, you're losing all your EP's just like you said :)"},{"date":"2024-10-25T15:24:56.368764Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"I haven't lost any EP. I just haven't got much. . ."},{"date":"2024-10-25T15:26:19.944364Z","author":{"name":"Norwegian Pathways","id":"kaid_1082366231138740611717261","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"You said your losing it. So, were you referring to your EP's? >:D"},{"date":"2024-10-25T15:27:59.9934Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"*Wow*. You got me at that one."},{"date":"2024-10-25T15:31:06.859679Z","author":{"name":"Norwegian Pathways","id":"kaid_1082366231138740611717261","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"That's me!"},{"date":"2024-10-25T15:34:39.573869Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"*Shakes head and sighs*"}]},{"replyCount":0,"votes":1,"date":"2024-10-27T10:33:07.455584Z","author":{"name":"LJ","id":"kaid_1144628223469068678737336","avatar":"/images/avatars/svg/leafers-sapling.svg"},"text":"50th vote ;)","locked":false,"pinned":false,"replies":[]},{"replyCount":2,"votes":1,"date":"2024-10-25T17:52:16.428123Z","author":{"name":"LemonTurtle","id":"kaid_26727758302107548837304","avatar":"/images/avatars/svg/primosaur-ultimate.svg"},"text":"You did a great job with this @Luke!!\n\nLooks sweet!","locked":false,"pinned":false,"replies":[{"date":"2024-10-25T17:55:21.544255Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"Thank you. It did a lot better than expected."},{"date":"2024-10-25T18:04:27.466578Z","author":{"name":"LemonTurtle","id":"kaid_26727758302107548837304","avatar":"/images/avatars/svg/primosaur-ultimate.svg"},"text":"It always will if you do your best!"}]},{"replyCount":0,"votes":1,"date":"2024-10-26T17:12:51.835035Z","author":{"name":"Joe Smith","id":"kaid_3324317700553449266081427","avatar":"/images/avatars/svg/blobby-green.svg"},"text":"Very nice","locked":false,"pinned":false,"replies":[]},{"replyCount":2,"votes":1,"date":"2024-10-25T19:37:33.151393Z","author":{"name":"Radar","id":"kaid_3902988618718040904060736","avatar":"/images/avatars/svg/leafers-seed.svg"},"text":"Wow nice!","locked":false,"pinned":false,"replies":[{"date":"2024-10-25T19:42:53.332644Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"Thank you. I appreciate it."},{"date":"2024-10-25T19:44:02.981712Z","author":{"name":"Radar","id":"kaid_3902988618718040904060736","avatar":"/images/avatars/svg/leafers-seed.svg"},"text":"You're welcome :)"}]},{"replyCount":2,"votes":1,"date":"2024-10-25T15:06:00.165206Z","author":{"name":"Mathlete11","id":"kaid_4902531429433401500771997","avatar":"/images/avatars/svg/starky-sapling.svg"},"text":"woah this is crazy good","locked":false,"pinned":false,"replies":[{"date":"2024-10-25T15:11:08.93923Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"I'm glad you liked it. Thanks."},{"date":"2024-10-25T16:13:14.051004Z","author":{"name":"Mathlete11","id":"kaid_4902531429433401500771997","avatar":"/images/avatars/svg/starky-sapling.svg"},"text":"no problem! u got a vote!"}]},{"replyCount":0,"votes":1,"date":"2024-10-27T13:45:12.983476Z","author":{"name":"sugarnlight","id":"kaid_516497598968512440616556","avatar":"/images/avatars/svg/aqualine-ultimate.svg"},"text":"looks great :O\nI think you have a good chance of winning!!","locked":false,"pinned":false,"replies":[]},{"replyCount":1,"votes":1,"date":"2024-10-25T17:41:48.220228Z","author":{"name":"Coder2098","id":"kaid_673573024191290348573492","avatar":"/images/avatars/svg/aqualine-ultimate.svg"},"text":"WOW great job luke! this is a huge step from when u started!!","locked":false,"pinned":false,"replies":[{"date":"2024-10-25T17:56:03.65977Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"Sure is. Thank you."}]},{"replyCount":10,"votes":1,"date":"2024-10-25T15:07:06.678112Z","author":{"name":"Sonic The Hedgehog","id":"kaid_851292644445276989632262","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"nice try.\nvote++;","locked":false,"pinned":false,"replies":[{"date":"2024-10-25T15:12:15.69196Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"Thanks, Sonic."},{"date":"2024-10-25T16:21:59.316536Z","author":{"name":"Cookie","id":"kaid_1826046083730180486895887","avatar":"/images/avatars/svg/leafers-sapling.svg"},"text":"Woah, you better be careful, apparently sonic hates it when you say his name XD"},{"date":"2024-10-25T16:30:51.867308Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"I wasn't informed of this."},{"date":"2024-10-25T19:12:12.652121Z","author":{"name":"Sonic The Hedgehog","id":"kaid_851292644445276989632262","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"Depends which person says it\nbtw hey cookie! i js came back from mexico"},{"date":"2024-10-25T19:14:20.719445Z","author":{"name":"Cookie","id":"kaid_1826046083730180486895887","avatar":"/images/avatars/svg/leafers-sapling.svg"},"text":"Hi! That sounds cool, I've never been out of my country. I just came back from a trip too!"},{"date":"2024-10-25T19:15:34.157423Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"@Sonic. Ah, but am I one of those people?"},{"date":"2024-10-25T19:30:48.300131Z","author":{"name":"Sonic The Hedgehog","id":"kaid_851292644445276989632262","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"@luke no way, i js dont like it when girls do that\n\n@cookie yeah i came back from a jewel mine, and got to see a ton of rare gems and such, i saw kryptonite\nits actually real! and it glows in the dark!"},{"date":"2024-10-25T19:40:31.364871Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"@Sonic. I see. . ."},{"date":"2024-10-25T23:42:14.662231Z","author":{"name":"Cookie","id":"kaid_1826046083730180486895887","avatar":"/images/avatars/svg/leafers-sapling.svg"},"text":"Oh, that's so cool! was the kryptonite green?"},{"date":"2024-10-26T15:17:44.451431Z","author":{"name":"Sonic The Hedgehog","id":"kaid_851292644445276989632262","avatar":"/images/avatars/svg/leaf-blue.svg"},"text":"yeah lol"}]},{"replyCount":1,"votes":1,"date":"2024-10-25T16:39:35.101554Z","author":{"name":"SnackerDavis","id":"kaid_889584744100087037395082","avatar":"/images/avatars/svg/robot_female_2.svg"},"text":"this is like, realllly good :O\ngreat job Luke! \n\nVote++","locked":false,"pinned":false,"replies":[{"date":"2024-10-25T16:42:09.743041Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"Let's see if I can win that contest. Thanks, SnackerDavis."}]},{"replyCount":1,"votes":1,"date":"2024-10-25T20:26:07.131886Z","author":{"name":"AGnawKneeMouse Coder","id":"kaid_9033829293805621369025816","avatar":"/images/avatars/svg/leaf-red.svg"},"text":"Nice work!!","locked":false,"pinned":false,"replies":[{"date":"2024-10-25T20:42:18.159663Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"Thanks, AC."}]}],"questions":[]}}