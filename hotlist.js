var json = {
    "code": "<!DOCTYPE html>\n<html>\n\n\n<!--\nReload if it does not work\n\nThis is a demo of a HUGE game I am going to be realesing in a while. \nSubscribe to the tread in the t&t to be notified when it is released!\n\nInspired by jumperman and capture by mushy avocado and henry, respectivly.\n\nNo code was taken from any sources, even the wonky block collisions.\n\n\nPlease post feedback! I will need all of the ideas I can get.\n-->\n    <!--no code-->\n    <!--todo:\n    give it a purpas(how do i do speling)\n    move between rooms. DONE\n    make the drones shoot. DONE\n    add a dieing animation. DONE\n    come up with a name. DONE\n    fix the breaking tab thing.not yet\n    mabye make it save your progress(like capture?)not yet\n    make a better level maker. DONE\n    make drones hit the blocks. not yet\n    gain health when standing over a fire. DONE\n    make the bullets hit and splice. DONE-->\n    <head>\n        <meta charset=\"utf-8\">\n        <title>Fuego [GAME]</title>\n    </head>\n    <style>\n        *{\n            margin:0;\n            overflow:hidden;\n        }\n        canvas{\n            width:600px;\n            height:600px;\n        }\n    </style>\n    <body>\n        <canvas id = \"myCanvas\" width = \"600\" height = \"600\"></canvas>\n        <script>\nvar maC = document.getElementById(\"myCanvas\");\nvar ctx = maC.getContext(\"2d\");\nfunction dro2(x, y, width, height, rot, color) {\n\tctx.save();\n\tctx.translate(x, y);\n\tctx.scale(width, height);\n\tctx.rotate(rot);\n\tctx.strokeStyle = \"rgb(100, 100, 100)\";\n\tctx.lineWidth = 2;\n\tctx.beginPath();\n\tctx.moveTo(35, 0);\n\tctx.lineTo(-35, 0);\n\tctx.stroke();\n\tctx.fillStyle = color;\n\tctx.beginPath();\n\tctx.roundRect(-15, -10, 30, 20, 3);\n\tctx.fill();\n\tctx.fillStyle = \"rgb(100, 100, 100)\";\n\tctx.beginPath();\n\tctx.moveTo(-6, 3);\n\tctx.lineTo(6, 3);\n\tctx.lineTo(10, -3);\n\tctx.lineTo(-10, -3);\n\tctx.lineTo(-6, 3);\n\tctx.fill();\n\tctx.fillStyle = color;\n\tctx.beginPath();\n\tctx.moveTo(-33, 5);\n\tctx.lineTo(-42, 5);\n\tctx.lineTo(-45, -7);\n\tctx.lineTo(-30, -7);\n\tctx.fill();\n\tctx.beginPath();\n\tctx.moveTo(33, 5);\n\tctx.lineTo(42, 5);\n\tctx.lineTo(45, -7);\n\tctx.lineTo(30, -7);\n\tctx.fill();\n\tctx.fillStyle = \"rgb(100, 100, 100)\";\n\tctx.beginPath();\n\tctx.moveTo(-33, -10);\n\tctx.lineTo(-42, -10);\n\tctx.lineTo(-45, -7);\n\tctx.lineTo(-30, -7);\n\tctx.fill();\n\tctx.beginPath();\n\tctx.moveTo(33, -10);\n\tctx.lineTo(42, -10);\n\tctx.lineTo(45, -7);\n\tctx.lineTo(30, -7);\n\tctx.fill();\n\tctx.strokeStyle = \"rgb(100, 100, 100)\";\n\tctx.beginPath();\n\tctx.moveTo(-38, -10);\n\tctx.lineTo(-38, -15);\n\tctx.stroke();\n\tctx.beginPath();\n\tctx.moveTo(38, -10);\n\tctx.lineTo(38, -15);\n\tctx.stroke();\n\tctx.beginPath();\n\tctx.moveTo(-18 + 38, -15);\n\tctx.lineTo(20 + 38, -15);\n\tctx.stroke();\n\tctx.beginPath();\n\tctx.moveTo(20 - 65, -15);\n\tctx.lineTo(20 - 38, -15);\n\tctx.stroke();\n\tctx.restore();\n\tctx.setTransform(1, 0, 0, 1, 0, 0);\n}\nctx.fillStyle = \"rgb(255, 238, 207)\";\nctx.fillRect(0, 0, 600, 600);\nfor (var i = 0; i < 60; i++) {\n\tfor (var j = 0; j < 60; j++) {\n\t\tctx.fillStyle = \"rgb(\" + i * 10 + \",\" + Math.random() * 100 + \",\" + Math.random() * 10 + \",0.2)\";\n\t\tctx.fillRect(i * 10, j * 10, 10, 10);\n\t}\n}\n//{\nctx.fillStyle = \"rgb(255, 255, 255)\"\nctx.save()\nctx.translate(-182, -192);\nctx.scale(1.4, 1.4);\nctx.beginPath();\nctx.lineTo(208, 262);\nctx.lineTo(246, 225);\nctx.lineTo(162, 1);\nctx.lineTo(222, 0);\nctx.lineTo(304, 217);\nctx.lineTo(349, 237);\nctx.lineTo(403, 0);\nctx.lineTo(467, 1);\nctx.lineTo(405, 265);\nctx.lineTo(421, 317);\nctx.lineTo(594, 90);\nctx.lineTo(596, 203);\nctx.lineTo(428, 344);\nctx.lineTo(420, 392);\nctx.lineTo(596, 445);\nctx.lineTo(595, 527);\nctx.lineTo(403, 423);\nctx.lineTo(343, 454);\nctx.lineTo(410, 592);\nctx.lineTo(411, 596);\nctx.lineTo(413, 596);\nctx.lineTo(295, 597);\nctx.lineTo(305, 456);\nctx.lineTo(245, 426);\nctx.lineTo(163, 595);\nctx.lineTo(75, 590);\nctx.lineTo(192, 392);\nctx.lineTo(174, 333);\nctx.lineTo(2, 327);\nctx.lineTo(0, 239);\nctx.lineTo(182, 291);\nctx.lineTo(189, 280);\nctx.lineTo(1, 62);\nctx.lineTo(0, 2);\nctx.lineTo(351, 374);\nctx.fill()\nctx.restore();\nctx.scale(0.9, 0.9);\nctx.translate(0, -56);\nctx.fillStyle = \"red\";\nctx.beginPath();\n//I used my own tool for these long things.\nctx.moveTo(105, 462);\nctx.lineTo(79, 388);\nctx.lineTo(105, 340);\nctx.lineTo(125, 253);\nctx.lineTo(163, 214);\nctx.lineTo(211, 170);\nctx.lineTo(213, 186);\nctx.lineTo(233, 169);\nctx.lineTo(264, 150);\nctx.lineTo(281, 128);\nctx.lineTo(281, 147);\nctx.lineTo(272, 190);\nctx.lineTo(259, 237);\nctx.lineTo(274, 240);\nctx.lineTo(292, 222);\nctx.lineTo(325, 181);\nctx.lineTo(377, 133);\nctx.lineTo(418, 138);\nctx.lineTo(413, 176);\nctx.lineTo(409, 200);\nctx.lineTo(394, 219);\nctx.lineTo(396, 251);\nctx.lineTo(404, 275);\nctx.lineTo(427, 276);\nctx.lineTo(517, 213);\nctx.lineTo(520, 225);\nctx.lineTo(517, 263);\nctx.lineTo(500, 290);\nctx.lineTo(477, 337);\nctx.lineTo(445, 381);\nctx.lineTo(419, 449);\nctx.lineTo(369, 502);\nctx.lineTo(327, 516);\nctx.lineTo(251, 512);\nctx.lineTo(128, 485);\nctx.lineTo(99, 459);\nctx.lineTo(105, 462);\nctx.lineTo(79, 388);\nctx.lineTo(105, 340);\nctx.lineTo(125, 253);\nctx.lineTo(163, 214);\nctx.lineTo(211, 170);\nctx.lineTo(213, 186);\nctx.fill();\nctx.fillStyle = \"rgb(255, 166, 0)\"\nctx.beginPath();\nctx.moveTo(150, 379);\nctx.lineTo(160, 358);\nctx.lineTo(173, 322);\nctx.lineTo(192, 310);\nctx.lineTo(212, 292);\nctx.lineTo(239, 267);\nctx.lineTo(251, 228);\nctx.lineTo(270, 209);\nctx.lineTo(287, 179);\nctx.lineTo(293, 183);\nctx.lineTo(295, 213);\nctx.lineTo(327, 238);\nctx.lineTo(355, 221);\nctx.lineTo(401, 243);\nctx.lineTo(392, 302);\nctx.lineTo(374, 336);\nctx.lineTo(351, 375);\nctx.lineTo(345, 401);\nctx.lineTo(318, 424);\nctx.lineTo(286, 430);\nctx.lineTo(264, 441);\nctx.lineTo(248, 436);\nctx.lineTo(170, 411);\nctx.lineTo(150, 371);\nctx.fill();\nctx.fillStyle = \"rgb(168, 34, 27)\";\nctx.save();\nctx.translate(279, 342);\nctx.scale(1, 0.8);\nctx.rotate(-1.1);\nctx.fillRect(-75, -75, 150, 150);\nctx.restore();\nctx.fillStyle = \"rgb(153, 0, 0, 0.5)\"\nctx.beginPath();\nctx.save();\nctx.translate(-59, 126);\nctx.rotate(-0.4);\nctx.restore();\nctx.fill();\nctx.fillStyle = \"white\";\nctx.font = \"200px monospace\"\nctx.save();\nctx.translate(0, 200);\nctx.lineWidth = 9;\nctx.strokeText(\"FUEGO\", 32, 461);\nctx.lineWidth = 4;\nctx.font = \"60px monospace\"\nctx.strokeText(\"A platformer\", 102, -60);\nctx.restore();\nvar img = ctx.getImageData(0, 0, 600, 600);\nctx.setTransform(1, 0, 0, 1, 0, 0);\nctx.fillStyle = \"white\";\nctx.fillRect(0, 0, 600, 600);\n//}\ntry{\nvar p = {\n\tx: 160,\n\ty: 320,\n\tcanJump: false,\n\tdustCloud: false,\n\tvx: 0,\n\tvy: 0,\n\thealth: 100,\n\twood: 0,\n\tfire: 5,\n\tfil: \"red\"\n};\n}catch(err){\n    document.body.innerHTML += err;\n}\nfunction dist(p1x, p1y, p2x, p2y) {\n\treturn Math.sqrt((p1x - p2x) * (p1x - p2x) + (p1y - p2y) * (p1y - p2y));\n}\nvar wooRoo = 0;\nvar blocks = [];\nfunction block(x, y, w, h, playerX, vx, playerY, vy, pw, ph, type, burn) {\n\tthis.x = x;\n\tthis.y = y;\n\tthis.w = w;\n\tthis.h = h;\n\tthis.pw = pw;\n\tthis.ph = ph;\n\tthis.playerX = playerX;\n\tthis.vx = vx;\n\tthis.playerY = playerY;\n\tthis.vy = vy;\n\tthis.type = type;\n\tthis.burn = burn;\n\tif (this.type === \"block\") {\n\t\tctx.fillStyle = \"rgb(0, 0, 0)\";\n\t} else if (this.type === \"vines\") {\n\t\tctx.fillStyle = \"rgba(39, 112, 0, \" + constrain(this.burn, 0, 1) + \")\"\n\t} else if (this.type === \"lava\") {\n\t\tctx.fillStyle = \"rgba(0, 0, 255, \" + constrain(this.burn, 0, 1) + \")\"\n\t}\n\tthis.draw = function() {\n\t    if (this.type === \"block\") {\n    \t\tctx.fillStyle = \"rgb(0, 0, 0)\";\n    \t} else if (this.type === \"vines\") {\n    \t\tctx.fillStyle = \"rgba(39, 112, 0, \" + constrain(this.burn, 0, 1) + \")\"\n    \t} else if (this.type === \"lava\") {\n    \t\tctx.fillStyle = \"rgba(0, 0, 255, \" + constrain(this.burn, 0, 1) + \")\"\n    \t}\n\t\tctx.fillRect(this.x, this.y, this.w, this.h);\n\t};\n\tthis.update = function() {\n\t\tthis.playerX = p.x;\n\t\tthis.playerY = p.y;\n\t\tthis.vx = p.vx;\n\t\tthis.vy = p.vy;\n\t\tif (this.playerX-1 > this.x - this.pw && this.playerY + - 1> this.y - this.ph && this.playerX - this.w + 1 < this.x && this.playerY  - this.h + 1< this.y && this.type === \"lava\") {\n\t\t    p.health = 0;\n\t\t}\n\t\tif (this.playerX + this.vx > this.x - this.pw && this.playerY + this.vy > this.y - this.ph && this.playerX + this.vx - this.w < this.x && this.playerY + this.vy - this.h < this.y&& this.type !== \"lava\") {\n\t\t\tctx.fillStyle = \"rgb(0, 255, 0)\";\n\t\t\t\n\t\t\tif (this.type === \"vines\" && (p.wood - wIR[currRoom]) === 0) {\n\t\t\t\tthis.burn -= 0.01;\n\t\t\t}\n\t\t\tvar thing = [\n\t\t\t\tdist(this.playerX, this.playerY, this.playerX, this.y - this.ph),\n\t\t\t\tdist(this.playerX, this.playerY, this.x - this.pw, this.playerY),\n\t\t\t\tdist(this.playerX, this.playerY, this.playerX, this.y + this.h),\n\t\t\t\tdist(this.playerX, this.playerY, this.x + this.w, this.playerY)\n\t\t\t];\n\t\t\tthis.choosenIndex = 0;\n\t\t\tfor (var i = 0; i < thing.length; i++) {\n\t\t\t\tif (thing[i] < thing[this.choosenIndex]) {\n\t\t\t\t\tthis.choosenIndex = i;\n\t\t\t\t}\n\t\t\t}\n\t\t\tif (this.choosenIndex === 0 && this.burn > 0) {\n\t\t\t\tp.canJump = true;\n\t\t\t\tp.y = this.y - ph;\n\t\t\t\tp.vy = 0;\n\t\t\t}\n\t\t\tif (this.choosenIndex === 1 && this.burn > 0) {\n\t\t\t\tp.x = this.x - pw;\n\t\t\t\tp.vx = 0;\n\t\t\t}\n\t\t\tif (this.choosenIndex === 2 && this.burn > 0) {\n\t\t\t\tp.y = this.y + h;\n\t\t\t\tp.vy = 0;\n\t\t\t}\n\t\t\tif (this.choosenIndex === 3 && this.burn > 0) {\n\t\t\t\tp.x = this.x + w;\n\t\t\t\tp.vx = 0;\n\t\t\t}\n\t\t}\n\n\t}\n\tthis.run = function() {\n\t\tthis.draw();\n\t\tthis.update();\n\t};\n}\n//particles\nvar parts = [];\nfunction Part(x, y, color, hit) {\n\tthis.x = x + Math.random() * 20;\n\tif (hit === 0) {\n\t\tthis.y = y + Math.random() * 20;\n\t} else {\n\t\tthis.y = y + 20;\n\t}\n\tthis.size = Math.random() * 4 + 3;\n\tthis.rotV = Math.random() / 2 - 0.25;\n\tthis.rot = Math.random();\n\tthis.Alpha = 0.7;\n\tthis.color = color;\n\tthis.timout = false;\n\tthis.draw = function() {\n\t\tctx.save();\n\t\tctx.globalAlpha = this.Alpha;\n\t\tctx.fillStyle = this.color + \")\"\n\t\tctx.translate(this.x, this.y);\n\t\tctx.rotate(this.rot);\n\t\tctx.fillStyle = this.color + this.Alpha;\n\t\tctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);\n\t\tctx.restore();\n\t};\n\tthis.update = function() {\n\n\t\tif (hit === 0) {\n\t\t\tthis.rot += this.rotV;\n\t\t\tthis.y -= Math.abs(this.rotV) * 4;\n\t\t} else if (hit === 1) {\n\t\t\tthis.x += Math.random() * 6 - 3;\n\t\t\tthis.y -= Math.random() * 2;\n\t\t} else if (hit === 2) {\n\t\t\tthis.x += Math.random() - 0.5;\n\t\t\tthis.y -= Math.random();\n\t\t}\n\t\tif (this.Alpha > 0) {\n\t\t\tthis.Alpha -= 0.03;\n\t\t} else {\n\t\t\tthis.Alpha = 0;\n\t\t\tthis.timout = true;\n\t\t}\n\t}\n\tthis.run = function() {\n\t\tthis.draw();\n\t\tthis.update();\n\t}\n}\nfunction dro(x, y, width, height, rot, color) {\n\tctx.save();\n\tctx.translate(x, y);\n\tctx.scale(width, height);\n\tctx.rotate(rot);\n\tctx.strokeStyle = \"rgb(100, 100, 100)\";\n\tctx.lineWidth = 2;\n\tctx.beginPath();\n\tctx.moveTo(35, 0);\n\tctx.lineTo(-35, 0);\n\tctx.stroke();\n\tctx.fillStyle = color;\n\tctx.beginPath();\n\tctx.roundRect(-15, -10, 30, 20, 3);\n\tctx.fill();\n\tctx.fillStyle = \"rgb(100, 100, 100)\";\n\tctx.beginPath();\n\tctx.moveTo(-6, 3);\n\tctx.lineTo(6, 3);\n\tctx.lineTo(10, -3);\n\tctx.lineTo(-10, -3);\n\tctx.lineTo(-6, 3);\n\tctx.fill();\n\tctx.fillStyle = color;\n\tctx.beginPath();\n\tctx.moveTo(-33, 5);\n\tctx.lineTo(-42, 5);\n\tctx.lineTo(-45, -7);\n\tctx.lineTo(-30, -7);\n\tctx.fill();\n\tctx.beginPath();\n\tctx.moveTo(33, 5);\n\tctx.lineTo(42, 5);\n\tctx.lineTo(45, -7);\n\tctx.lineTo(30, -7);\n\tctx.fill();\n\tctx.fillStyle = \"rgb(100, 100, 100)\";\n\tctx.beginPath();\n\tctx.moveTo(-33, -10);\n\tctx.lineTo(-42, -10);\n\tctx.lineTo(-45, -7);\n\tctx.lineTo(-30, -7);\n\tctx.fill();\n\tctx.beginPath();\n\tctx.moveTo(33, -10);\n\tctx.lineTo(42, -10);\n\tctx.lineTo(45, -7);\n\tctx.lineTo(30, -7);\n\tctx.fill();\n\tctx.strokeStyle = \"rgb(100, 100, 100)\";\n\tctx.beginPath();\n\tctx.moveTo(-38, -10);\n\tctx.lineTo(-38, -15);\n\tctx.stroke();\n\tctx.beginPath();\n\tctx.moveTo(38, -10);\n\tctx.lineTo(38, -15);\n\tctx.stroke();\n\tctx.beginPath();\n\tctx.moveTo(Math.sin(timer / 2) * 20 + 38, -15);\n\tctx.lineTo(Math.cos(timer / 2) * 20 + 38, -15);\n\tctx.stroke();\n\tctx.beginPath();\n\tctx.moveTo(Math.sin(timer / 2) * 20 - 38, -15);\n\tctx.lineTo(Math.cos(timer / 2) * 20 - 38, -15);\n\tctx.stroke();\n\tctx.restore();\n}\nvar drones = [];\nfunction drone(x, y, sx, sy, rot, type) {\n\tthis.x = x;\n\tthis.y = y;\n\tthis.sx = sx;\n\tthis.inRoom = false;\n\tthis.sy = sy;\n\tthis.rot = rot;\n\tthis.acc = 0;\n\tthis.type = type;\n\tthis.explodeTimer = 0;\n\tthis.hit = false;\n\tthis.displa = true;\n\tthis.explode = false;\n\tthis.dead = false;\n\tif (this.type === \"2\") {\n\t\tthis.bDmg = \"1\";\n\t}\n\tif (this.type === \"1\") {\n\t\tthis.dmg = 1;\n\t\tthis.col = \"rgb(0, 255, 30)\";\n\t} else if (this.type === \"2\") {\n\t\tthis.dmg = 2;\n\t\tthis.col = \"rgb(13, 0, 255)\";\n\t}\n\tthis.draw = function() {\n\t\tif (this.displa) {\n\t\t\tdro(this.x, this.y, this.sx, this.sy, this.rot, this.col);\n\t\t}\n\t};\n\tthis.update = function() {\n\t\tthis.rot += this.acc;\n\t\tif (this.hit === true) {\n\t\t\tthis.acc += 0.01;\n\t\t\tthis.y += this.acc * 50;\n\t\t}\n\t\tthis.bu = Math.random() * 5;\n\t\tif (this.explode) {\n\t\t\tthis.explodeTimer++;\n\t\t}\n\t\tvar differenceX = p.x + 10 - this.x;\n\t\tvar differenceY = p.y + 10 - this.y;\n\t\tvar playerDistance = Math.sqrt(differenceX * differenceX + differenceY * differenceY);\n\t\tdifferenceX /= playerDistance;\n\t\tdifferenceY /= playerDistance;\n\t\tif (this.type === \"1\" && this.hit === false) {\n\t\t\tthis.x += differenceX * 2;\n\t\t\tthis.y += differenceY * 2;\n\t\t} else if (this.type === \"2\" && this.hit === false) {\n\t\t\tif (dist(this.x, this.y, p.x, p.y) > 100) {\n\t\t\t\tthis.x += differenceX * 2;\n\t\t\t\tthis.y += differenceY * 2;\n\t\t\t} else {\n\t\t\t\tif (timer % (50) === 0) {\n\t\t\t\t\tenemyBullets.push(new enemyBullet(this.x, this.y, 4));\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t};\n\tthis.run = function() {\n\t\tthis.draw();\n\t\tthis.update();\n\t};\n}\nvar enemyBullets = [];\nfunction enemyBullet(x, y, speed) {\n\tthis.x = x;\n\tthis.y = y;\n\tthis.speed = speed;\n\tthis.dead = false;\n\tvar vX = p.x + 10 - this.x;\n\tvar vY = p.y + 10 - this.y;\n\tvar pd = Math.sqrt(vX * vX + vY * vY);\n\tvX /= pd;\n\tvY /= pd;\n\tthis.draw = function() {\n\t\tctx.fillStyle = \"rgb(0, 0, 255)\";\n\t\tctx.beginPath();\n\t\tctx.arc(this.x, this.y, 5, 0, 360);\n\t\tctx.fill();\n\t};\n\tthis.update = function() {\n\t\tthis.x += vX * this.speed;\n\t\tthis.y += vY * this.speed;\n\t};\n\tthis.run = function() {\n\t\tthis.draw();\n\t\tthis.update();\n\t};\n}\nvar woods = [];\nfunction wood(x, y, width, height, mag) {\n\tthis.x = x;\n\tthis.y = y;\n\tthis.width = width;\n\tthis.height = height;\n\tthis.mag = mag;\n\tthis.dead = false;\n\tthis.draw = function() {\n\t\tctx.save();\n\t\tctx.translate(this.x, this.y);\n\t\tctx.scale(this.width, this.height);\n\t\tctx.fillStyle = \"rgb(222, 156, 49)\";\n\t\tctx.lineWidth = \"0.3\";\n\t\tctx.strokeStyle = \"rgb(0, 0, 0)\";\n\t\tctx.beginPath();\n\t\tctx.moveTo(10 - 5, -2 - 5);\n\t\tctx.lineTo(13 - 5, 0 - 5);\n\t\tctx.lineTo(0 - 5, 10 - 5);\n\t\tctx.lineTo(-2 - 5, 7 - 5);\n\t\tctx.lineTo(10 - 5, -2 - 5);\n\t\tctx.fill();\n\t\tctx.stroke();\n\t\tctx.beginPath();\n\t\tctx.moveTo(10 - 7, -2 - 2);\n\t\tctx.lineTo(13 - 7, 0 - 2);\n\t\tctx.lineTo(0 - 7, 10 - 2);\n\t\tctx.lineTo(-2 - 7, 7 - 2);\n\t\tctx.lineTo(10 - 7, -2 - 2);\n\t\tctx.fill();\n\t\tctx.stroke();\n\t\tctx.beginPath();\n\t\tctx.moveTo(13 - 7, 2 - 2);\n\t\tctx.lineTo(13 - 7, 5 - 2);\n\t\tctx.lineTo(-2 - 7, 3 - 2);\n\t\tctx.lineTo(-2 - 7, -1 - 2);\n\t\tctx.lineTo(13 - 7, 2 - 2);\n\t\tctx.fill();\n\t\tctx.stroke();\n\t\tctx.restore();\n\t};\n\tthis.update = function() {\n\t\tthis.y = Math.sin(timer / 20) * this.mag + this.y;\n\t};\n\tthis.run = function() {\n\t\tthis.draw();\n\t\tthis.update();\n\t};\n}\nfunction constrain(value, min, max) {\n\tif (min > value) {\n\t\treturn min;\n\t} else if (max < value) {\n\t\treturn max;\n\t}\n\treturn value;\n}\nvar keys = {};\naddEventListener(\"keydown\", function(e) {\n\tkeys[e.key.toString().toLowerCase()] = true;\n\te.preventDefault();\n});\naddEventListener(\"keyup\", function(e) {\n\tkeys[e.key.toString().toLowerCase()] = false;\n\te.preventDefault();\n});\nvar squish = 0;\nvar timer = 0;\nvar dead = 0;\nvar levelEnds = [0, 600];\nvar gates = [];\nvar currRoom = 0;\nvar alive = true;\nvar dieing = false;\nvar rooms = [\n\t[\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a````s`````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a```aaa````````````````````````````````a\",\n\t\t\"a````a`````````````````````````````````a\",\n\t\t\"a````a`````````````````````````````````a\",\n\t\t\"a``a`a`a```````````````````````````````e\",\n\t\t\"a``a`a`a````l```````````````````````````\",\n\t\t\"aaaaaaaaaaaaaaaw````w```````````````````\",\n\t\t\"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"],\n\t[\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a```````````w``````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a```````````````a``````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a```````````````````a``````````````````a\",\n\t\t\"a````````````````````````g`````````````a\",\n\t\t\"a````````g``````a``````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\" ```````````````````a``````````````````e\",\n\t\t\" ``s````````````````````````````````````\",\n\t\t\" ```````````````a```````````````````````\",\n\t\t\"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"],\n\t\t[\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a`````````````g````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a`````````````````w````````````````````a\",\n\t\t\"a```````a```````aaaaa```````a``````````a\",\n\t\t\"a```````a```````````````````a``````````a\",\n\t\t\" ``````aa```````````````````aa`````````e\",\n\t\t\" ``s``aaa```````````````````aaa`````````\",\n\t\t\" ````aaaa```````````````````aaaa````````\",\n\t\t\"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"],\n\t[\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````g```````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a``````````````````````````````````````a\",\n\t\t\"a`````````````````````````````````````wa\",\n\t\t\"a```````````````````````````````````aaaa\",\n\t\t\"a``````````````````````````````l`aaa```a\",\n\t\t\"a`````````````````````````````aaa``````a\",\n\t\t\"a```````````g``````````````aaa`````````a\",\n\t\t\"a`````````````````````l`aaa````````````a\",\n\t\t\"a````````````````````aaa```````````````a\",\n\t\t\"a`````````````````aaa````g``b``````````a\",\n\t\t\"a````````b`````````````````````````````a\",\n\t\t\"a````````````a```b`````````````````````a\",\n\t\t\" ``````````a````````````````b``````````e\",\n\t\t\" `s`````a```````````````````````````b```\",\n\t\t\" ```````````````````````````````````````\",\n\t\t\"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"],\n\t[\n\t\t\"a`w``````````````````````````````````````````````a\",\n\t\t\"al````````````al```al```al```al``````````````````a\",\n\t\t\"al```````````````````````````````````````````````a\",\n\t\t\"al```l```````````````````````````````````````````a\",\n\t\t\"aaaaaaaa````````````````a````l```````al``````````a\",\n\t\t\"a````````````l``````````aaalaaaa`````````````````a\",\n\t\t\"a```````````````````l```a`````````a``````````````a\",\n\t\t\"a``````````l````````l```a`aaa`aa````l````````````a\",\n\t\t\"a```````laaaaaaal```l```a````````````````````````a\",\n\t\t\"a````````l`````a````ll``aa`aaa```a```````````````a\",\n\t\t\"a`a``````l`````a````la````l```````````a``````````a\",\n\t\t\"a``````````````a````l````````````````````````````a\",\n\t\t\"aaaaaaaa````l``a````l``a````````ll```ll```a``````a\",\n\t\t\"a``````````````a```lla``a````````````````````````a\",\n\t\t\"a``````a```````a````l````a``````aaalaaa``````````a\",\n\t\t\"a``````````````a````l`````a``````````````````````a\",\n\t\t\" `````````````aa````la`````al````````````````````a\",\n\t\t\" `s````````````a````l``````a`````````````````````a\",\n\t\t\" ``````a``lllllal```````a``l`````````````````````a\",\n\t\t\"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"],\n];\nvar sP = [];//lol the sp variable\nvar wIR = [];\nfor (var i = 0; i < rooms.length; i++) {\n\tblocks.push([]);\n\tgates.push([]);\n\tdrones.push([]);\n\twoods.push([]);\n\tsP.push([]);\n\tfor (var j = 0; j < rooms[i].length; j++) {\n\t\tfor (var k = 0; k < rooms[i][j].length; k++) {\n\t\t\tif (rooms[i][j][k] === \"a\") {\n\t\t\t\tblocks[i].push(new block(k * 30, j * 30, 30.5, 30, p.x, p.vx, p.y, p.vy, 20, 20, \"block\", 1));\n\t\t\t}\n\t\t\tif (rooms[i][j][k] === \"l\") {\n\t\t\t\tblocks[i].push(new block(k * 30, j * 30, 30.5, 30, p.x, p.vx, p.y, p.vy, 20, 20, \"lava\", 1));\n\t\t\t}\n\t\t\tif (rooms[i][j][k] === \"e\" && i >= currRoom) {\n\t\t\t\tgates[i].push(new block(k * 30 + 1, j * 30, 29, 90, p.x, p.vx, p.y, p.vy, 20, 20, \"vines\", 1));\n\t\t\t}\n\t\t\tif (rooms[i][j][k] === \"g\") {\n\t\t\t\tdrones[i].push(new drone(k * 30, j * 30, 0.6, 0.6, 0, \"1\"));\n\t\t\t}\n\t\t\tif (rooms[i][j][k] === \"b\") {\n\t\t\t\tdrones[i].push(new drone(k * 30, j * 30, 0.6, 0.6, 0, \"2\"));\n\t\t\t}\n\t\t\tif (rooms[i][j][k] === \"w\") {\n\t\t\t\twoods[i].push(new wood(k * 30 + 20, j * 30, 2, 2, 0.5));\n\t\t\t\twIR[i] = woods[i].length;\n\t\t\t}\n\t\t\tif(rooms[i][j][k] === \"s\"){\n\t\t\t    sP[i].push(k * 30, j * 30);\n\t\t\t}\n\t\t}\n\t}\n}\nvar check = false;\nwooRoo = wIR[currRoom];\nfunction draw() {\n\tctx.globalAlpha = 1;\n\tctx.fillStyle = \"rgba(255 ,255, 255, 1)\";\n\tctx.fillRect(0, 0, 600, 600);\n\tctx.translate(-constrain(p.x - 300, levelEnds[0], levelEnds[1]), 0);\n\ttimer++;\n\tif (timer % p.fire === 0 && p.health > 0) {\n\t\tparts.push(new Part(p.x, p.y, \"rgba(255, 0, 0\", 0));\n\t}\n\tif (p.x > levelEnds[1] + 600) {\n\t\tcurrRoom++;\n\t\tp.x = 0;\n\t\tp.wood = 0;\n\t}\n\tif (p.x < -20) {\n\t\tcurrRoom--;\n\t\tp.x = levelEnds[1] + 600 - 20;\n\t\tp.wood = 0;\n\t}\n\tif (keys.r || !alive) {\n\t\tp.wood = 0;\n\t\tp.x = sP[currRoom][0];\n\t\tp.y = sP[currRoom][1];\n\t\tp.vx = 0;\n\t\tp.vy = 0;\n\t\tp.fil = \"red\";\n\t\tp.health = 100;\n\t\twoods = [];\n\t\tdrones = [];\n\t\tgates = [];\n\t\tenemyBullets = [];\n\t\tfor (var i = 0; i < rooms.length; i++) {\n\t\t\tblocks.push([]);\n\t\t\tgates.push([]);\n\t\t\tdrones.push([]);\n\t\t\twoods.push([]);\n\t\t\tfor (var j = 0; j < rooms[i].length; j++) {\n\t\t\t\tfor (var k = 0; k < rooms[i][j].length; k++) {\n\t\t\t\t    if(i>=currRoom){\n    \t\t\t\t\tif (rooms[i][j][k] === \"e\") {\n    \t\t\t\t\t\tgates[i].push(new block(k * 30 + 1, j * 30, 29, 90, p.x, p.vx, p.y, p.vy, 20, 20, \"vines\", 1));\n    \t\t\t\t\t}\n    \t\t\t\t\tif (rooms[i][j][k] === \"g\") {\n    \t\t\t\t\t\tdrones[i].push(new drone(k * 30, j * 30, 0.6, 0.6, 0, \"1\"));\n    \t\t\t\t\t}\n    \t\t\t\t\tif (rooms[i][j][k] === \"b\") {\n    \t\t\t\t\t\tdrones[i].push(new drone(k * 30, j * 30, 0.6, 0.6, 0, \"2\"));\n    \t\t\t\t\t}\n    \t\t\t\t\tif (rooms[i][j][k] === \"w\") {\n    \t\t\t\t\t\twoods[i].push(new wood(k * 30 + 20, j * 30, 2, 2, 0.5));\n    \t\t\t\t\t\twIR[i] = woods[i].length;\n    \t\t\t\t\t}\n\t\t\t\t    }\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tcheck = true;\n\t\tp.canJump = false;\n\t\tdieing = false;\n\t\tdead = 0;\n\t\talive = true;\n\t}\n\tif (p.health > 0) {\n\t\tif ((keys.d || keys.arrowright) && (!keys.a || !keys.arrowleft) && p.vx < 6) {\n\t\t\tp.vx += 0.5;\n\t\t\tif (squish < 5) {\n\t\t\t\tsquish += 1.25;\n\t\t\t}\n\t\t}\n\t\tif ((keys.a || keys.arrowleft) && (!keys.d || !keys.arrowright) && p.vx > -6) {\n\t\t\tp.vx -= 0.5;\n\t\t\tif (squish > -5) {\n\t\t\t\tsquish += -1.25;\n\t\t\t}\n\t\t}\n\t\tif ((!keys.a && !keys.arrowleft) && (!keys.d && !keys.arrowright) || (keys.a || keys.arrowleft) && (keys.d || keys.arrowright)) {\n\t\t\tif (squish) {\n\t\t\t\tif (squish > 0) {\n\t\t\t\t\tsquish -= 1.25;\n\t\t\t\t} else if (squish < 0) {\n\t\t\t\t\tsquish += 1.25;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tif ((keys.w || keys.arrowup) && p.canJump) {\n\t\t\tp.vy = -8;\n\t\t\tp.canJump = false;\n\t\t\tp.hitBottom = false;\n\t\t\tfor (var i = 0; i < 5; i++) {\n\t\t\t\tparts.push(new Part(p.x, p.y, \"rgba(0, 0, 0\", 2));\n\t\t\t}\n\t\t}\n\t\tp.x += p.vx;\n\t\tp.y += p.vy;\n\t\tp.vx *= 0.85;\n\t\tif (p.vy < 10) {\n\t\t\tp.vy += 0.3;\n\t\t} else {\n\t\t\tp.vy = 10;\n\t\t}\n\t}\n\tctx.fillStyle = p.fil;\n\tctx.beginPath();\n\tctx.moveTo(p.x + squish, p.y);\n\tctx.lineTo(p.x + 20 + squish, p.y);\n\tctx.lineTo(p.x + 20, p.y + 20);\n\tctx.lineTo(p.x, p.y + 20);\n\tctx.fill();\n\tif (p.health < 100 && p.health > 0) {\n\t\tctx.lineWidth = \"3\";\n\t\tctx.strokeStyle = \"rgb(255, 0, 0)\";\n\t\tctx.beginPath();\n\t\tctx.moveTo(p.x, p.y - 4);\n\t\tctx.lineTo(p.x + 20, p.y - 4)\n\t\tctx.stroke();\n\t\tctx.strokeStyle = \"rgb(0, 255, 0)\";\n\t\tctx.beginPath();\n\t\tctx.moveTo(p.x, p.y - 4);\n\t\tctx.lineTo(p.x + p.health / 5, p.y - 4);\n\t\tctx.stroke();\n\t}\n\tctx.font = \"20px monospace\";\n\tctx.fillStyle = \"rgb(0, 0, 0)\"\n\tif (currRoom === 0) {\n\t\tctx.fillText(\"Welcome and \", 200, 200);\n\t\tctx.fillText(\"don't touch the water...\", 200, 220);\n\t\tctx.fillText(\"Get the all of wood before\", 802, 200);\n\t\tctx.fillText(\"you burn the vines.\", 802, 220);\n\t} else if (currRoom === 1) {\n\t\tctx.fillText(\"kill the evil water drones by jumping under them.\", 200, 140);\n\t\tctx.fillText(\"oh and by the way you are a fire.\", 200, 160);\n\t\tctx.fillText(\"You ran away from fire camp\", 652, 200);\n\t\tctx.fillText(\"to defeat the evil water queen\", 652, 220);\n\t\tctx.fillText(\"standing on the drones fire\", 702, 260);\n\t\tctx.fillText(\"after they die gives you health.\", 702, 280);\n\t} else if (currRoom === 3) {\n\t\tctx.fillText(\"blue drones have water guns\", 200, 140);\n\t\tctx.fillText(\"The evil queen will have boss fights for you too\", 630, 140);\n\t\tctx.fillText(\"Once she gets her creative gears\", 750, 160);\n\t\tctx.fillText(\"Working and programs one\", 750, 180);\n\t\tctx.fillText(\"You don't get one in the demo though lol\", 682, 450);\n\t} else if (currRoom === 2) {\n\t\tctx.fillText(\"r to restart\", 200, 140);\n\t\tctx.fillText(\"You can air jump.\", 200, 160);\n\t} else if (currRoom === 4) {\n\t\tctx.fillText(\"Hard last level\", 250, 140);\n\t}\n\tfor (var j = 0; j < rooms[currRoom].length; j++) {\n\t\tfor (var k = 0; k < rooms[currRoom][j].length; k++) {\n\t\t\tif (rooms[currRoom][j][k] === \"a\") {\n\t\t\t\tlevelEnds[1] = (k + 1) * 30 - 600;\n\t\t\t}\n\t\t}\n\t}\n\tfor (var i = 0; i < parts.length; i++) {\n\t\tparts[i].run();\n\t\tif (parts[i].Alpha < 0) {\n\t\t\tparts[i].timout = true;\n\t\t}\n\t}\n\tfor (var i = 0; i < drones[currRoom].length; i++) {\n\t\tif (p.x + 20 > drones[currRoom][i].x - 25 && p.x < drones[currRoom][i].x + 25 && p.y + 20 > drones[currRoom][i].y - 6 && p.y < drones[currRoom][i].y + 6 && drones[currRoom][i].hit === false) {\n\t\t\tif (p.vy < 0) {\n\t\t\t\tdrones[currRoom][i].hit = true;\n\t\t\t\tp.vy *= -1;\n\t\t\t} else {\n\t\t\t\tp.health -= drones[currRoom][i].dmg;\n\t\t\t}\n\t\t}\n\t\tif (drones[currRoom][i].y > 570 && drones[currRoom][i].hit === true) {\n\t\t\tdrones[currRoom][i].displa = false;\n\t\t}\n\t\tif (drones[currRoom][i].hit === true && drones[currRoom][i].y > 570) {\n\t\t\tdrones[currRoom][i].explode = true;\n\t\t\tif (drones[currRoom][i].explodeTimer > 30) {\n\t\t\t\tdrones[currRoom][i].explode = false;\n\t\t\t\tdrones[currRoom][i].dead = true;\n\t\t\t}\n\t\t\tif (drones[currRoom][i].explode) {\n\t\t\t\tparts.push(new Part(drones[currRoom][i].x, 550, \"rgba(\" + (Math.random() * 55 + 200) + \",\" + (Math.random() * 40 + 30) + \", 0\", 1));\n\t\t\t\tparts.push(new Part(drones[currRoom][i].x, 550, \"rgba(\" + (Math.random() * 55 + 200) + \",\" + (Math.random() * 40 + 30) + \", 0\", 1));\n\t\t\t\tparts.push(new Part(drones[currRoom][i].x, 550, \"rgba(\" + (Math.random() * 55 + 200) + \",\" + (Math.random() * 40 + 30) + \", 0\", 1));\n\t\t\t\tif (p.x + 20 > drones[currRoom][i].x && p.x < drones[currRoom][i].x + 20 && p.y > 530 && p.health < 100 && dieing === false) {\n\t\t\t\t\tp.health += 0.5;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tdrones[currRoom][i].run();\n\t}\n\tfor (var i = 0; i < enemyBullets.length; i++) {\n\t\tenemyBullets[i].run();\n\t\tif (enemyBullets[i].x > p.x && enemyBullets[i].x < p.x + 20 && enemyBullets[i].y > p.y && enemyBullets[i].y < p.y + 20) {\n\t\t\tenemyBullets[i].dead = true;\n\t\t\tp.health -= 10;\n\t\t}\n\t\tif (enemyBullets[i].x > levelEnds[1] + 600 || enemyBullets[i].x < 0 || enemyBullets[i].y > 600 || enemyBullets[i].y < 0) {\n\t\t\tenemyBullets[i].dead = true;\n\t\t}\n\t}\n\tfor (var i = 0; i < woods[currRoom].length; i++) {\n\t\twoods[currRoom][i].run();\n\t\tif (p.x + 20 > woods[currRoom][i].x - 15 && p.x < woods[currRoom][i].x + 15 && p.y + 20 > woods[currRoom][i].y - 15 && p.y < woods[currRoom][i].y + 15) {\n\t\t\tif (p.health > 0) {\n\t\t\t\twoods[currRoom][i].dead = true;\n\t\t\t\tp.health += 20;\n\t\t\t\tp.fire = 1;\n\t\t\t\tp.wood++;\n\t\t\t}\n\t\t}\n\t}\n\tfor (var i = 0; i < gates[currRoom].length; i++) {\n\t\tgates[currRoom][i].run();\n\t}\n\tfor (var i = 0; i < blocks[currRoom].length; i++) {\n\t    if(blocks[currRoom][i].type !== \"lava\"){\n\t\t    blocks[currRoom][i].run();\n\t    }\n\t}\n\tfor (var i = 0; i < blocks[currRoom].length; i++) {\n\t\tif(blocks[currRoom][i].type === \"lava\"){\n\t\t    blocks[currRoom][i].run();\n\t    }\n\t}\n\tif (p.health <= 0) {\n\t\tdead += 0.05;\n\t\tdieing = true;\n\t\tp.fil = \"rgb(\"+(255-155*dead) +\", 0, 0)\";\n\t}\n\tp.health = constrain(p.health, 0, 100);\n\tif (dead >= 1) {\n\t\talive = false;\n\t}\n\tctx.setTransform(1, 0, 0, 1, 0, 0);\n\tctx.fillStyle = \"rgb(0, 0, 0)\"\n\tctx.fillText(p.wood + \" / \" + wIR[currRoom], 42, 43);\n\tctx.save();\n\tctx.translate(117, 34);\n\tctx.scale(1.5, 1.5);\n\tctx.fillStyle = \"rgb(222, 156, 49)\";\n\tctx.lineWidth = \"0.3\";\n\tctx.strokeStyle = \"rgb(0, 0, 0)\";\n\tctx.beginPath();\n\tctx.moveTo(10 - 5, -2 - 5);\n\tctx.lineTo(13 - 5, 0 - 5);\n\tctx.lineTo(0 - 5, 10 - 5);\n\tctx.lineTo(-2 - 5, 7 - 5);\n\tctx.lineTo(10 - 5, -2 - 5);\n\tctx.fill();\n\tctx.stroke();\n\tctx.beginPath();\n\tctx.moveTo(10 - 7, -2 - 2);\n\tctx.lineTo(13 - 7, 0 - 2);\n\tctx.lineTo(0 - 7, 10 - 2);\n\tctx.lineTo(-2 - 7, 7 - 2);\n\tctx.lineTo(10 - 7, -2 - 2);\n\tctx.fill();\n\tctx.stroke();\n\tctx.beginPath();\n\tctx.moveTo(13 - 7, 2 - 2);\n\tctx.lineTo(13 - 7, 5 - 2);\n\tctx.lineTo(-2 - 7, 3 - 2);\n\tctx.lineTo(-2 - 7, -1 - 2);\n\tctx.lineTo(13 - 7, 2 - 2);\n\tctx.fill();\n\tctx.stroke();\n\tctx.restore();\n\tctx.fillStyle = \"rgb(0, 0, 0, \" + dead + \")\";\n\tctx.fillRect(0, 0, 600, 600);\n\tctx.font = \"50px monospace\";\n\tctx.fillText(\"Dead\", 245, 300);\n\tfor (var i = woods[currRoom].length - 1; i >= 0; i--) {\n\t\tif (woods[currRoom][i].dead) {\n\t\t\twoods[currRoom].splice(i, 1);\n\t\t}\n\t}\n\tfor (var i = parts.length - 1; i >= 0; i--) {\n\t\tif (parts[i].timout) {\n\t\t\tparts.splice(i, 1);\n\t\t}\n\t}\n\tfor (var i = enemyBullets.length - 1; i >= 0; i--) {\n\t\tif (enemyBullets[i].dead) {\n\t\t\tenemyBullets.splice(i, 1);\n\t\t}\n\t}\n\tfor (var i = gates[currRoom].length - 1; i >= 0; i--) {\n\t\tif (gates[currRoom][i].type === \"vines\" && gates[currRoom][i].burn <= 0) {\n\t\t\tgates[currRoom].splice(i, 1);\n\t\t}\n\t}\n\tif (keys.a && keys.b && keys.c) {\n\t\tctx.putImageData(img, 0, 0);\n\t}\n\tif (timer % 100 === 0) {\n\t\tp.fire = 5;\n\t}\n\tif(p.wood ===1&&currRoom === 4){\n\t    ctx.fillStyle = \"black\";\n\t    ctx.fillRect(0, 0, 600, 600);\n\t    ctx.fillStyle = \"rgb(255, 0 ,0)\"\n\t    ctx.font = \"20px monospace\";\n\t    ctx.fillText(\"you complaeted a usles demmo.\", 100, 300);\n\t    ctx.fillText(\"how do you fel?\", 100, 320);\n\t}\n\twindow.parent.raf = requestAnimationFrame(draw);\n}\ncancelAnimationFrame(window.parent.raf);\nwindow.parent.raf = requestAnimationFrame(draw); \n</script>\n</body>\n</html>\n<!--yay-->",
    "title": "Fuego [GAME]",
    "votes": 42,
    "created": "17 hours ago",
    "updated": "6 hours ago",
    "type": "HTML",
    "author": {
        "name": "The Former Wizard of Oz",
        "id": "kaid_981854986090143486946241",
        "avatar": "/images/avatars/svg/leaf-blue.svg"
    },
    "dimensions": {
        "width": 600,
        "height": 600
    },
    "forks": [
        {
            "title": "Spin-off of \"Fuego [GAME]\"",
            "id": "4598330299432960",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "jonlachlan",
                "id": "kaid_404916191500314209816664"
            }
        },
        {
            "title": "Spin-off of \"Fuego [GAME]\"",
            "id": "4709213637885952",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "WHY",
                "id": "kaid_7761350627896174296843957"
            }
        },
        {
            "title": "Spin-off of \"Fuego [GAME]\"",
            "id": "5156908378800128",
            "forks": 0,
            "votes": 1,
            "author": {
                "name": "SephB",
                "id": "kaid_749481601357154844323167"
            }
        }
    ],
    "posts": {
        "tips": [
            {
                "replyCount": 0,
                "votes": 13,
                "date": "17 hours ago",
                "author": {
                    "name": "The Former Wizard of Oz",
                    "id": "kaid_981854986090143486946241",
                    "avatar": "/images/avatars/svg/leaf-blue.svg"
                },
                "text": "Be notified when I release it!<br><em>Post a \".\" here and you will get mail in a long time!</em>",
                "locked": false,
                "pinned": false,
                "replies": []
            },
            {
                "replyCount": 4,
                "votes": 7,
                "date": "14 hours ago",
                "author": {
                    "name": "Liam K.",
                    "id": "kaid_160653079463992085090428",
                    "avatar": "/images/avatars/svg/duskpin-ultimate.svg"
                },
                "text": "Looking good so far!<br><br>I would highly recommend taking lots of time to polish the graphics for the final edition so they are more complicated than just solid colors. You'd be amazed how much a simple parallax background adds to a program.<br><br>Otherwise, keep up the great work!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "14 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Thanks! in the later version I plan to add more graphics and stuff like that. But what does parallax mean? Does it mean a good color scheme?"
                    },
                    {
                        "date": "13 hours ago",
                        "author": {
                            "name": "Liam K.",
                            "id": "kaid_160653079463992085090428",
                            "avatar": "/images/avatars/svg/duskpin-ultimate.svg"
                        },
                        "text": "By parallax, I mean that the background looks like it has perspective, and slightly moves with the camera"
                    },
                    {
                        "date": "13 hours ago",
                        "author": {
                            "name": "ASBackup",
                            "id": "kaid_714780036830891967670231",
                            "avatar": "/images/avatars/svg/aqualine-tree.svg"
                        },
                        "text": "if it helps, i used a parallax in the background of<br><br>khanacademy.org/cs/-/6727382872539136<br><br>in this example, the mouse moves the background at varying speeds depending on the layer."
                    },
                    {
                        "date": "13 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "@Liam K<br>Ohh, you mean like in metriod fusion. Thanks, thats a really good idea! I will add that probably in the later version and give credit for idea. <br><br>@asbackup<br>So beutiful"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 6,
                "date": "6 hours ago",
                "author": {
                    "name": "Dat",
                    "id": "kaid_4164356982737975081215128",
                    "avatar": "/images/avatars/svg/marcimus-orange.svg"
                },
                "text": "hey where are the takis",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "I ate them now u have to get them"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 3,
                "date": "11 hours ago",
                "author": {
                    "name": "HB_the_Pencil (semi-retired)",
                    "id": "kaid_412656070256786668848958",
                    "avatar": "/images/avatars/svg/mr-pants-green.svg"
                },
                "text": "Cool start!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "11 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Thank you!"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 2,
                "date": "12 hours ago",
                "author": {
                    "name": "xSilentx",
                    "id": "kaid_1041630047418182982949076",
                    "avatar": "/images/avatars/svg/stelly-blue.svg"
                },
                "text": "The last level seems impossible.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "11 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "It is difficult, but it is possible."
                    }
                ]
            },
            {
                "replyCount": 2,
                "votes": 2,
                "date": "15 hours ago",
                "author": {
                    "name": "LemonTurtle",
                    "id": "kaid_26727758302107548837304",
                    "avatar": "/images/avatars/svg/primosaur-ultimate.svg"
                },
                "text": "The makings of a great game! Keep it up!<br><br>Btw, if you get hurt in a level then advance to the next you don't heal.",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "15 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "It was meant to be different rooms, like capture, and you would have checkpoints. I just had not made checkpoints yet, and having you restart all the way back to the beginning every time you died would be frustrating, so I just made the doors the checkpoints. I am going to be very busy lol"
                    },
                    {
                        "date": "14 hours ago",
                        "author": {
                            "name": "LemonTurtle",
                            "id": "kaid_26727758302107548837304",
                            "avatar": "/images/avatars/svg/primosaur-ultimate.svg"
                        },
                        "text": "Hey that's cool bro! Just making sure you knew about it! ;)"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "6 hours ago",
                "author": {
                    "name": "Samurai Warrior™ ✝ (Offline)",
                    "id": "kaid_333534297788735128142174",
                    "avatar": "/images/avatars/svg/sneak-peak-green.svg"
                },
                "text": "Nice but that last level 💀",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "lol, thanks"
                    }
                ]
            },
            {
                "replyCount": 6,
                "votes": 1,
                "date": "15 hours ago",
                "author": {
                    "name": "Duke :P",
                    "id": "kaid_351465532815782433620675",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "Epic job! The fire particles are sweet. The drones are funny and super good at the same time. The idea is sweet. The graphics go well together. It's giving me capture vibes so thats good haha.<br>The only thing is that the drones are a little weird out of where place. But they still work great.<br>Overall epic job!",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "15 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Thanks! What does \"a little weird out of where\" mean? Whatever it is, I am sure it will be fixed in the later version."
                    },
                    {
                        "date": "15 hours ago",
                        "author": {
                            "name": "Duke :P",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Your most welcome! Keep it up :)<br>Oh I just meant everything is cubes and then there are drones which aren't exactly cubes ;P<br><br>but yeah it look sweet. And that isn't really a problem just something I was surprised by."
                    },
                    {
                        "date": "15 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Oh, ok. I might make the blocks have better graphics in the later games, or at least put something like bolts or a texture on them. So the drones will fit in better because they won't be the only non-square. Thanks!"
                    },
                    {
                        "date": "15 hours ago",
                        "author": {
                            "name": "Duke :P",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Personal now that I am used to it, it looks pretty good. But I don't care whatever you think looks best =D<br>Your welcome! Me and one of my irl friends are about to release a big game today.(or the demo of one) that we have been working on for ~2 months. So I was quite surprised when I saw what you said on khantober ;D"
                    },
                    {
                        "date": "14 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "What a small world(not sure if that is applicable in this situation though). Good luck! but not too good so you don't bump me off the hotlist lol"
                    },
                    {
                        "date": "14 hours ago",
                        "author": {
                            "name": "Duke :P",
                            "id": "kaid_351465532815782433620675",
                            "avatar": "/images/avatars/svg/starky-ultimate.svg"
                        },
                        "text": "Indeed it is(eh its good enough ;P)<br>Sorry man I'm afraid I can't promise that lol<br>But thank you. We'll low on time but were gonna try out best :P"
                    }
                ]
            },
            {
                "replyCount": 5,
                "votes": 1,
                "date": "7 hours ago",
                "author": {
                    "name": "sugarnlight",
                    "id": "kaid_516497598968512440616556",
                    "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                },
                "text": "its too much for my potato computer :(",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "7 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "It should not be that bad. It runs really fast on my school managed Chromebook, and that is about as potato as they come. What type of computer do you have, a Ti-84?"
                    },
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "sugarnlight",
                            "id": "kaid_516497598968512440616556",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": "xD, that's a calculator<br>I have a school Chromebook, but oh noes says the JavaScript is taking too long to load."
                    },
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Try pressing reload. There are a lot of things pushed into arrays at the beginning, once the game is there it should work fast. If it is slow, you have to be on internet explorer which does not execute the <code>ctx.fillStyle</code> property the right way. As far as I know, that is the only web browser that has issues with canvas 2D.<br><br>The Ti-84 thing was a joke lol."
                    },
                    {
                        "date": "6 hours ago",
                        "author": {
                            "name": "sugarnlight",
                            "id": "kaid_516497598968512440616556",
                            "avatar": "/images/avatars/svg/aqualine-ultimate.svg"
                        },
                        "text": "oh ok, it worked now, thanks!<br><br>yep ik, xD"
                    },
                    {
                        "date": "2 hours ago",
                        "author": {
                            "name": "HM Wogglebug TE",
                            "id": "kaid_2128909595278771717919649",
                            "avatar": "/images/avatars/svg/boggle-green.svg"
                        },
                        "text": "A Ti-86 could probably run a watered down version of this game =P"
                    }
                ]
            },
            {
                "replyCount": 1,
                "votes": 1,
                "date": "15 hours ago",
                "author": {
                    "name": "Vuong Vo",
                    "id": "kaid_79869111098624859119085",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "You heal from your enemies' disintegration. Btw, you misspelled defeat in the second level",
                "locked": false,
                "pinned": false,
                "replies": [
                    {
                        "date": "15 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "Yeah, that is supposed to happen, as you are a fire yourself. <br><br>I updated it, thanks!"
                    }
                ]
            }
        ],
        "questions": [
            {
                "replyCount": 0,
                "votes": 1,
                "date": "13 hours ago",
                "author": {
                    "name": "gpnedelea",
                    "id": "kaid_837047048676564421111370",
                    "avatar": "/images/avatars/svg/starky-ultimate.svg"
                },
                "text": "how to  beat the air jump level",
                "replies": [],
                "answers": [
                    {
                        "replyCount": 0,
                        "votes": 1,
                        "date": "12 hours ago",
                        "author": {
                            "name": "The Former Wizard of Oz",
                            "id": "kaid_981854986090143486946241",
                            "avatar": "/images/avatars/svg/leaf-blue.svg"
                        },
                        "text": "If you touch the ground and then slide off the edge of a block, you can jump in the air.",
                        "replies": []
                    }
                ]
            }
        ]
    }
}