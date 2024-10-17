var json = {"code":"/**
 * CHESS!
 * by cwalsh1223
 * Week 3 of Khantober
 * 
 * Please don't vote down all the comments. Instead, tell me why you don't like this game. :)
 * 
 * My code is very inefficient, I know...
 * Do NOT click in the bottom right square on the title screen
 * No en passant! But there is pawn promotion and castling.
 * My bot is very aggressive. He is so blinded by his anger that he blunders his pieces a lot. xD
 * There is no check or checkmate as that would cause lag.
 * 
 * If you think this is a cool project and you want to see more, you can subscribe:
 * https://www.khanacademy.org/computer-programming/subscribe-bro/6540689310138368
 * */
size(600,600,1);
// Code can be found here.
// {
var board = [];
var clicked = false;
var skip2game = false|skip2game;
var scene = 'intro';
if(skip2game) {
    scene = 'game';
    skip2game = false;
}
var tcount = 0;
textAlign(3,3);
var outlineText = function(msg, x, y, c1, c2) {
    // Nobody owns this method as it's been used by various different people at various different times.
    fill(c1);
    for(var i = 0; i < 360; i += 18) {
        text(msg,x+sin(i)*2,y+cos(i)*2);
    }
    fill(c2);
    text(msg,x,y);
};
var inbutton = function(x, y, w, h, onClick) {
    fill(220);
    rect(x,y,w,h);
    if(mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h && mouseIsPressed) {
        fill(0);
        if(onClick !== undefined && clicked) {
            onClick();
        }
    } else {
        fill(255);
    }
    rect(x,y,w,2);
    rect(x,y,2,h);
    if(mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h && mouseIsPressed) {
        fill(255);
    } else {
        fill(0);
    }
    rect(x+2,y+h-2,w-2,2);
    rect(x+w-2,y+2,2,h-2);
};
var drawBoard = function(widf, hacht, x, y, bsize) {
    var black = true;
    for(var i = 0; i < widf; i++) {
        for(var j = 0; j < hacht; j++) {
            black = !black;
            fill((black)? color(128,64,0):color(255,255,220));
            rect(i*bsize+x,j*bsize+y,bsize,bsize);
        }
        black = !black;
    }
};
var w = 8;
var h = 8;
var b = 50;
var grabbing = false;
var turn = false;
var thinking = false;
var brave = brave|false;
var fixed = fixed|false;
var winner = false;
var displayChars = {
    'K':'?',
    'Q':'?',
    'R':'?',
    'B':'?',
    'N':'?',
    'P':'?'
};
if(fixed) {
    displayChars.P = '?';
}
var values = {
    'K':999999,
    'Q':900,
    'R':500,
    'B':325,
    'N':300,
    'P':100
};
var hletters = 'abcdefgh';
var typez = ['Q','R','B','N'];
var names = {
    'Q':'Queen',
    'R':'Rook',
    'B':'Bishop',
    'N':'Knight'
};
var promosel = 0;
var invert = function(number, side) {
    return (side)? number:-number;
};
var Piece = function(x, y, type, black, newer, alive) {
    this.x = x;
    this.y = y;
    this.ax = x;
    this.ay = y;
    this.type = type;
    this.black = black;
    this.gripped = false;
    this.hasMoved = !newer;
    this.alive = alive;
};
var _tboard = [];
Piece.prototype.move = function(dx, dy, gomove) {
    if(dx >= 0 && dx < w && dy >= 0 && dy < h) {
        var distX = dx-this.x;
        var distY = dy-this.y;
        var foundCastle = false;
        var rindex = 0;
        var dir = 0;
        var restricted = false;
        if(this.type === 'K') {
            if(abs(dx-this.x) > 2) {
                restricted = true;
            } else if(abs(dx-this.x) === 2 && abs(dy-this.y) === 0) {
                if(this.hasMoved) {
                    restricted = true;
                } else {
                    for(var i = 0; i < board.length; i++) {
                        if(dx > this.x) {
                            if(board[i].type === 'R' && board[i].black === this.black && board[i].x > this.x && !board[i].hasMoved) {
                                foundCastle = true;
                                rindex = i;
                                dir = 1;
                            }
                        } else {
                            //println("HI");
                            if(board[i].type === 'R' && board[i].black === this.black && !board[i].hasMoved && board[i].x < this.x) {
                                foundCastle = true;
                                rindex = i;
                                dir = -1;
                            }
                        }
                    }
                    if(!foundCastle) {
                        restricted = true;
                    }
                }
            } else if(abs(dx-this.x) === 2) {
                restricted = true;
            }
            if(abs(dy-this.y) > 1) {
                restricted = true;
            }
        }
        if(this.type === 'R') {
            if(abs(dx-this.x) > 0 && abs(dy-this.y) > 0) {
                restricted = true;
            }
        }
        if(this.type === 'B') {
            if(abs(dy-this.y) !== abs(dx-this.x)) {
                restricted = true;
            }
        }
        if(this.type === 'Q') {
            if(abs(dy-this.y) !== abs(dx-this.x)) {
                if(abs(dx-this.x) > 0 && abs(dy-this.y) > 0) {
                    restricted = true;
                }
            }
        }
        if(this.type === 'N') {
            if(!(abs(dy-this.y) === 1 && abs(dx-this.x) === 2) && !(abs(dx-this.x) === 1 && abs(dy-this.y) === 2)) {
                restricted = true;
            }
        }
        if(this.type === 'P') {
            var pawnGo = (this.black)?1:-1;
            var capturing = false;
            if(abs(dx-this.x) < 2) {
                if(dy-this.y === pawnGo) {
                    for(var i = 0; i < board.length; i++) {
                        if(board[i].x === dx && board[i].y === dy && !board[i].gripped && board[i].alive) {
                            if(dx-this.x === 0) {
                                restricted = true;
                            } else {
                                if(board[i].black !== this.black && board[i].alive) {
                                    capturing = true;
                                }
                            }
                        }
                    }
                    if(dx-this.x !== 0 && !capturing) {
                        restricted = true;
                    }
                } else if(dy-this.y === pawnGo*2 && dx-this.x === 0) {
                    if(this.hasMoved) {
                        restricted = true;
                    }
                    for(var i = 0; i < board.length; i++) {
                        if(board[i].x === dx && board[i].y === dy && !board[i].gripped && board[i].alive) {
                            restricted = true;
                        }
                    }
                } else {
                    restricted = true;
                }
            } else {
                restricted = true;
            }
        }
        var blocked = false;
        var tboard = [];
        for(var i = 0; i < w; i++) {
            tboard.push([]);
            for(var j = 0; j < h; j++) {
                tboard[i].push(false);
            }
        }
        _tboard = tboard;
        for(var i = 0; i < board.length; i++) {
            if(!board[i].gripped && board[i].alive && board[i] !== this) {
                tboard[board[i].x][board[i].y] = true;
            }
        }
        if(dy-this.y === 0 && dx-this.x > 0) {
            for(var i = this.x; i < dx; i++) {
                if(tboard[i][this.y]) {
                    blocked = true;
                }
            }
        }
        if(dy-this.y === 0 && dx-this.x < 0) {
            for(var i = this.x; i > dx; i--) {
                if(tboard[i][this.y]) {
                   blocked = true;
                }
            }
        }
        if(dy-this.y > 0 && dx-this.x === 0) {
            for(var i = this.y; i < dy; i++) {
                if(tboard[this.x][i]) {
                    blocked = true;
                }
            }
        }
        if(dy-this.y < 0 && dx-this.x === 0) {
            for(var i = this.y; i > dy; i--) {
                if(tboard[this.x][i]) {
                    blocked = true;
                }
            }
        }
        if(dy-this.y > 0 && dx-this.x === dy-this.y) {
            var alsoX = this.x;
            for(var i = this.y; i < dy; i++) {
                if(tboard[alsoX][i]) {
                    blocked = true;
                }
                alsoX++;
            }
        }
        if(dy-this.y < 0 && dx-this.x === dy-this.y) {
            var alsoX = this.x;
            for(var i = this.y; i > dy; i--) {
                if(tboard[alsoX][i]) {
                    blocked = true;
                }
                alsoX--;
            }
        }
        if(dy-this.y > 0 && dx-this.x === -(dy-this.y)) {
            var alsoX = this.x;
            for(var i = this.y; i < dy; i++) {
                if(tboard[alsoX][i]) {
                    blocked = true;
                }
                alsoX--;
            }
        }
        if(dy-this.y < 0 && dx-this.x === -(dy-this.y)) {
            var alsoX = this.x;
            for(var i = this.y; i > dy; i--) {
                if(tboard[alsoX][i]) {
                    blocked = true;
                }
                alsoX++;
            }
        }
        if(foundCastle && dir < 0) {
            if(tboard[this.x-3][this.y]) {
                blocked = true;
            }
        }
        var taken = false;
        if(dx === this.x && dy === this.y) {
            if(gomove) {
                turn = !turn;
            }
            this.gripped = false;
            return [true,0];
        }
        var winnings = 0;
        winnings = invert((dy-this.y)*10,this.black)+floor(random(-5,5));
        if(!restricted && !blocked) {
            for(var i = 0; i < board.length; i++) {
                if(board[i].x === dx && board[i].y === dy && !board[i].gripped && this.black === board[i].black && board[i].alive) {
                    taken = true;
                }
                if(board[i].x === dx && board[i].y === dy && !board[i].gripped && this.black !== board[i].black && board[i].alive) {
                    winnings += invert(values[board[i].type],this.black);
                }
                if(board[i].x === dx && board[i].y === dy && !board[i].gripped && this.black !== board[i].black && board[i].alive && gomove) {
                    board[i].alive = false;
                    playSound(getSound("rpg/hit-thud"));
                }
            }
        }
        if(!taken && !restricted && !blocked) {
            /* var gonbecap = false;
            for(var i = 0; i < board.length; i++) {
                if(board[i].black !== this.black) {
                    if(board[i].move(dx,dy,false)[0]) {
                        gonbecap = true;
                        break;
                    }
                }
            }
            if(gonbecap) {
                winnings -= values[this.type];
                // println("VALUE LOST! " + winnings + ' for ' + this.type + hletters[dx] + (dy+1));
            } */
            if(gomove) {
                if(foundCastle) {
                    board[rindex].x = this.x+dir;
                    board[rindex].hasMoved = true;
                }
                this.x = dx;
                this.y = dy;
                this.gripped = false;
                this.hasMoved = true;
            }
            return [true,winnings];
        }
    }
    return [false,0];
};
Piece.prototype.draw = function() {
    textSize(b/1.5);
    if(this.gripped) {
        this.ax = mouseX;
        this.ay = mouseY;
    }
    var toBeX = (this.gripped)? (this.ax):(this.x*b+b/2);
    var toBeY = (this.gripped)? (this.ay):(this.y*b+b/2);
    if(this.black) {
        fill(255);
        if(brave) {
            outlineText(displayChars[this.type],toBeX,toBeY-5,color(255),color(0));
        } else {
            outlineText(displayChars[this.type],toBeX,toBeY,color(255),color(0));
        }
    } else {
        fill(255);
        if(brave) {
            outlineText(displayChars[this.type],toBeX,toBeY-5,color(0),color(255));
        } else {
            outlineText(displayChars[this.type],toBeX,toBeY,color(0),color(255));
        }
    }
};
var setup = [
    'rnbqkbnr',
    'pppppppp',
    '        ',
    '        ',
    '        ',
    '        ',
    'PPPPPPPP',
    'RNBQKBNR'
];
for(var i = 0; i < setup.length; i++) {
    for(var j = 0; j < setup.length; j++) {
        if(setup[i][j] !== ' ') {
            var isitblack = (setup[i][j] !== setup[i][j].toUpperCase());
            if(isitblack) {
                board.push(new Piece(j,i,setup[i][j].toUpperCase(),true,true,true));
            } else {
                board.push(new Piece(j,i,setup[i][j],false,true,true));
            }
        }
    }
}
var pieces = 0;
var pieceIndexes = [];
var pieceToEval = 0;
var movesDiscovered = 0;
var moveCoords = [];
var board2 = [];
var awaiting = true;
var pieces2 = 0;
var pieceToEval2 = 0;
var pieceIndexes2 = [];
var mmw = 0;
var initStuff = function() {
    pieces = 0;
    pieceIndexes = [];
    pieceToEval = 0;
    movesDiscovered = 0;
    moveCoords = [];
    board2 = [];
    pieces2 = 0;
    pieceToEval2 = 0;
    pieceIndexes2 = [];
    mmw = 0;
    for(var i = 0; i < board.length; i++) {
        if(board[i].black && board[i].alive) {
            pieces++;
            pieceIndexes.push(i);
        }
    }
};
var introo = 400;
var printedSub = false;
var pacifist = false;
noStroke();
textFont(createFont('tahoma'));
draw = function() {
    cursor('auto');
    if(scene === 'intro') {
        background(128,0,0);
        textSize(60-introo/10);
        fill(0);
        text('cwalsh1223',300+introo,305);
        fill(255);
        text('cwalsh1223',300+introo,300);
        introo /= 1.1;
        if(frameCount > 200 || clicked) {
            scene = 'title';
        }
    } else if(scene === 'title') {
        background(220);
        drawBoard(8,8,0,0,75);
        fill(255,220);
        //rect(0,0,width,height);
        inbutton(150,250,300,70,function(){scene = 'game';});
        inbutton(150,350,300,70,function(){scene = 'how';});
        inbutton(150,450,300,70,function(){scene = 'sub';});
        fill(255,0,0);
        rect(20,50,560,100);
        var grw = 3;
        for(var i = 20; i < 580; i += grw) {
            fill(192+sin(i*3)*32);
            rect(i,50,grw,100);
        }
        fill(0);
        textSize(70);
        if(pacifist) {
            textSize(40);
            text('Chicken Bot 5000',200,100);
        } else {
            text('Chess!',300,100);
        }
        textSize(20);
        text('by cwalsh1223'.slice(0,floor(tcount/5)),500,130);
        textSize(40);
        text('Start!',300,285);
        text('How?',300,385);
        textSize(45+sin(frameCount*5)*10);
        text('Sub',300,485);
        fill(0);
        rect(0,560,205,40);
        fill(255);
        rect(5,565,195,30);
        fill(0);
        textSize(20);
        if(mouseX < 205 && mouseY > 560) {
            text('Khantober week 3',103,580);
        } else {
            text('Released 10-16-2024',103,580);
        }
        if(mouseX > 7*75 && mouseY > 7*75) {
            cursor('pointer');
            if(clicked) {
                pacifist = !pacifist;
            }
        }
        textSize(100);
        outlineText(displayChars.K,100,200,color(255),color(0));
        outlineText(displayChars.Q,233,200,color(0),color(255));
        outlineText(displayChars.B,366,200,color(255),color(0));
        outlineText(displayChars.N,500,200,color(0),color(255));
        tcount++;
    } else if(scene === 'sub') {
        fill(0,12);
        rect(0,0,width,height);
        fill(0,255,0);
        textSize(50);
        text('Copy the printed text\ninto a new tab',300,300);
        if(!printedSub) {
            println('https://www.khanacademy.org/computer-programming/subscribe-bro/6540689310138368');
            printedSub = true;
        }
        if(clicked) {
            printedSub = false;
            scene = 'title';
        }
    } else if(scene === 'how') {
        fill(0,12);
        rect(0,0,width,height);
        drawBoard(8,8,noise(frameCount*0.02)*600,noise((frameCount+1000)*0.02)*600,20);
        fill(0,128);
        rect(50,190,500,220);
        fill(255,255,0);
        textSize(50);
        text('HOW TO PLAY',300,50);
        textSize(40);
        text('You are playing as white,\nagainst the AI.\nClick a piece to pick it up.\nClick again to drop it.',300,300);
        if(clicked) {
            scene = 'title';
        }
    } else if(scene === 'game') {
    background(255);
    drawBoard(8,8,0,0,50);
    var bking = false, wking = false;
    for(var i = 0; i < board.length; i++) {
        if(board[i].alive) {
            if(mouseX >= board[i].x*b && mouseX < board[i].x*b+b && mouseY > board[i].y*b && mouseY < board[i].y*b+b) {
                cursor('grab');
            }
            board[i].draw();
            if(board[i].type === 'P') {
                if(board[i].black) {
                    if(board[i].y === 7) {
                        board[i].type = 'Q';
                    }
                } else {
                    if(board[i].y === 0) {
                        board[i].type = typez[promosel];
                    }
                }
            } else if(board[i].type === 'K') {
                if(board[i].black) {
                    bking = true;
                } else {
                    wking = true;
                }
            }
        }
    }
    if(grabbing) {
        cursor('grabbing');
    }
    if(!bking) {
        winner = true;
        scene = 'win';
        playSound(getSound("rpg/giant-no"));
        playSound(getSound("rpg/giant-hyah"));
        playSound(getSound("rpg/giant-yah"));
        playSound(getSound("rpg/hit-whack"));
        playSound(getSound("rpg/water-slosh"));
        playSound(getSound("rpg/water-bubble"));
    }
    if(!wking) {
        winner = false;
        scene = 'win';
        playSound(getSound("rpg/giant-no"));
        playSound(getSound("rpg/giant-hyah"));
        playSound(getSound("rpg/giant-yah"));
        playSound(getSound("rpg/hit-whack"));
        playSound(getSound("rpg/water-slosh"));
        playSound(getSound("rpg/water-bubble"));
    }
    stroke(0);
    if(mouseX > 200 && mouseY > 500 && mouseX < 320 && mouseY < 520) {
        fill(192);
        if(clicked) {
            brave = !brave;
        }
    } else {
        fill(220);
    }
    rect(200,500,120,20);
    if(mouseX > 200 && mouseY > 470 && mouseX < 320 && mouseY < 490) {
        fill(192);
        if(clicked) {
            fixed = !fixed;
            if(displayChars.P === '?') {
                displayChars.P = '?'; // Chrome SUCKS! Whoever DESTROYED the black pawn emoji on chrome should be ASHAMED OF THEMSELVES!!!
            } else {
                displayChars.P = '?';
            }
        }
    } else {
        fill(220);
    }
    rect(200,470,120,20);
    if(mouseX > 200 && mouseY > 530 && mouseX < 320 && mouseY < 550) {
        fill(192);
        if(clicked) {
            promosel++;
            promosel %= 4;
        }
    } else {
        fill(220);
    }
    rect(200,530,120,20);
    fill(0);
    textSize(12);
    text('Toggle brave mode',260,510);
    text('Change pawn emoji',260,480);
    text('Promote to: '+names[typez[promosel]],260,540);
    noStroke();
    textSize(50);
    if(pieceToEval < pieces) {
        text(pieceToEval+1+'/'+pieces,500,200);
    } else {
        text("Done",500,200);
    }
    textSize(30);
    text(movesDiscovered,500,300);
    text('Turn: ' + ((turn)?'black':'white'),500,400);
    text('Thinking: ' + thinking,480,450);
    if(thinking && pieces > 0) {
        if(pieceToEval < pieces) {
            //board2 = [];
            //pieces2 = 0;
            //pieceIndexes = [];
            /*for(var i = 0; i < board.length; i++) {
                if(board[i].alive) {
                    board2.push(new Piece(board[i].x,board[i].y,board[i].hasMoved,true));
                    if(!board[i].black) {
                        pieceIndexes2.push(i);
                        pieces2++;
                    }
                }
            }*/
            // pieceToEval2 = 0;
            
            var victim = board[pieceIndexes[pieceToEval]];
            /*if(victim.type === 'P') {
                // println(victim.move(victim.x,victim.y+1,false));
            }*/
            for(var i = 0; i < w; i++) {
                for(var j = 0; j < h; j++) {
                    var resulting = victim.move(i,j,false,board);
                    if(resulting[0] && (i !== victim.x || j !== victim.y)) {
                        movesDiscovered++;
                        moveCoords.push([pieceIndexes[pieceToEval],i,j,resulting[1]]);
                        // println(resulting[1]);
                    }
                }
            }
            awaiting = false;
            if(pieceToEval < pieces) {
                pieceToEval++;
            }
            //println('hi');
        } /*else if(pieceToEval2 < pieces2) {
            //println('hi');
            //var vic2im = board2[pieceIndexes2[pieceToEval2]];
            //if(pieceToEval2 < pieces2) {
            //    pieceToEval2++;
            //    println(pieceToEval2);
            //}
        }*/ else if(turn) {
            // println('Im making a move');
            var bestie = 0;
            if(pacifist) {
                bestie = Infinity;
            }
            var bestpos = floor(random(moveCoords.length));
            for(var i = 0; i < moveCoords.length; i++) {
                if(pacifist) {
                    if(moveCoords[i][3] < bestie) {
                        bestie = moveCoords[i][3];
                        bestpos = i;
                    }
                } else {
                    if(moveCoords[i][3] > bestie) {
                        bestie = moveCoords[i][3];
                        bestpos = i;
                    }
                }
            }
            var moveToMake = moveCoords[bestpos];
            // println(board[moveToMake[0]].type+','+moveToMake[1]+','+moveToMake[2]);
            board[moveToMake[0]].move(moveToMake[1],moveToMake[2],true,board);
            playSound(getSound("retro/hit1"));
            thinking = false;
            turn = !turn;
        } else {
            turn = true; // For some reason I need to do this after I capture a piece. \(O.o)/
        }
    } else if(thinking) {
        turn = false;
    }
    /* fill(255,0,0);
    for(var i = 0; i < _tboard.length; i++) {
        for(var j = 0; j < _tboard.length; j++) {
            if(_tboard[i][j]) {
                ellipse(i*b+b/2,j*b+b/2,10,10);
            }
        }
    } */
    inbutton(430,500,130,40,function(){scene = 'title';});
    fill(0);
    text("Back",495,520);
    } else if(scene === 'win') {
        if(winner) {
            fill(255,12);
            rect(0,0,width,height);
            fill(0);
            textSize(60);
            text('WHITE WINS!!!',300,100);
            fill(255,255,0);
            ellipse(300,350,300,300);
            fill(0);
            arc(300,360,200,200,0,180);
            fill(255);
            ellipse(250,300,40,40);
            ellipse(350,300,40,40);
            fill(0);
            ellipse(250,300,20,20);
            ellipse(350,300,20,20);
        } else {
            fill(0,12);
            rect(0,0,width,height);
            fill(255);
            textSize(60);
            text('BLACK WINS!!!',300,100);
            fill(255,255,0);
            ellipse(300,350,300,300);
            fill(0);
            arc(300,450,200,200,180,360);
            fill(255);
            ellipse(250,300,40,40);
            ellipse(350,300,40,40);
            fill(0);
            ellipse(250,300,20,20);
            ellipse(350,300,20,20);
        }
        textSize(30);
        outlineText('Click to play again',300,550,color(255),color(0));
        if(clicked) {
            skip2game = true;
            Program.restart();
        }
    }
    clicked = false;
};
mousePressed = function() {
    clicked = true;
    if(scene === 'game') {
    if(!thinking) {
        var flooredX = floor(mouseX/b);
        var flooredY = floor(mouseY/b);
        if(!grabbing) {
            for(var i = 0; i < board.length; i++) {
                if(flooredX === board[i].x && flooredY === board[i].y && board[i].alive && board[i].black === turn) {
                    board[i].gripped = true;
                    grabbing = true;
                }
            }
        } else {
            for(var i = 0; i < board.length; i++) {
                if(board[i].gripped) {
                    if(board[i].move(flooredX,flooredY, true,board)[0]) {
                        turn = !turn;
                        grabbing = false;
                        if(turn) {
                            playSound(getSound("retro/hit1"));
                        }
                    }
                }
            }
        }
        if(turn) {
            thinking = true;
            initStuff();
        }
    }
    }
};
// }","title":"Chess {khantober}","votes":51,"type":"PJS","author":{"name":"?BBB# 3221hslawc","id":"kaid_792288208072906614241148","avatar":"/images/avatars/svg/spunky-sam-red.svg"},"dimensions":{"width":600,"height":600},"forks":[{"title":"Derivado de "Chess {khantober}"","id":"4829469994303488","forks":0,"votes":1,"author":{"name":"Adriana Valentina Ignacio Reyes 5'A","id":"kaid_11236367869380800742287"}},{"title":"Spin-off of "Chess {khantober}"","id":"5692864519913472","forks":0,"votes":1,"author":{"name":"Cdawgfiddy487","id":"kaid_111452526845865481993756"}}],"posts":{"tips":[{"replyCount":2,"votes":5,"date":"2024-10-16T22:59:43.036531Z","author":{"name":"Cheesecake Programming","id":"kaid_4977756849462380705743011","avatar":"/images/avatars/svg/cs-winston.svg"},"text":"Cool game, I like how you managed to create a bot using only a simple concept. I do have a few suggestions though. First off, I think the UI really makes the game seem a bit less professional. I would recommend making the board take up most of the screen, and having either have some white space at the top or bottom, with the text and button there. However, I suppose that might be a bit difficult to make. Second off, I understand the having check and checkmate would lag the game a bit, but they are fundamental parts of chess, its not really chess if you cant put the opponent in check mate. Also I might be dumb, but what is the number on the side underneath "Done" and what is Brave mode?

Overall though, I can tell effort was put into this and you did a great job on it, especially for a Khantober project.","locked":false,"pinned":false,"replies":[{"date":"2024-10-16T23:45:35.008078Z","author":{"name":"?BBB# 3221hslawc","id":"kaid_792288208072906614241148","avatar":"/images/avatars/svg/spunky-sam-red.svg"},"text":"Thanks ?

Yeah, I should've made the UI more professional.

Check detection would be hard to add...

The number underneath "done" shows the amount of moves the bot found. Brave mode is for users of the Brave browser (myself included), where the text is shifted down. Brave mode shifts it back up where it should be."},{"date":"2024-10-17T02:29:26.97374Z","author":{"name":"Cheesecake Programming","id":"kaid_4977756849462380705743011","avatar":"/images/avatars/svg/cs-winston.svg"},"text":"Ofc.


I understand, reading through some of the code, I totally understand why you decided against it.

Ah, that makes sense,"}]},{"replyCount":1,"votes":4,"date":"2024-10-16T21:49:29.515649Z","author":{"name":"luke C.","id":"kaid_4664169513186158664614779","avatar":"/images/avatars/svg/blobby-yellow.svg"},"text":"The bot is better than most of the ppl I play on Chess.com. good job!
Vote++
P.S. you should probably look at how Stockfish (a very good Chess bot)
was coded.","locked":false,"pinned":false,"replies":[{"date":"2024-10-17T03:13:32.0374Z","author":{"name":"Duke","id":"kaid_351465532815782433620675","avatar":"/images/avatars/svg/starky-ultimate.svg"},"text":"lol I gotta wonder who you play xD"}]},{"replyCount":0,"votes":4,"date":"2024-10-17T00:27:39.32497Z","author":{"name":"Leo2009","id":"kaid_93723305121824615611989","avatar":"/images/avatars/svg/cs-ohnoes.svg"},"text":"Amazing! Great job!","locked":false,"pinned":false,"replies":[]},{"replyCount":7,"votes":3,"date":"2024-10-17T00:24:31.238749Z","author":{"name":"LJ","id":"kaid_1144628223469068678737336","avatar":"/images/avatars/svg/leafers-sapling.svg"},"text":"Great game, but on my device the default pawn emoji is black (ik you can change it but still) so maybe you'd want to change that","locked":false,"pinned":false,"replies":[{"date":"2024-10-17T02:10:54.723903Z","author":{"name":"CodeNinja","id":"kaid_6247985199070618801670730","avatar":"/images/avatars/svg/starky-ultimate.svg"},"text":"Did you win?? /jk"},{"date":"2024-10-17T02:13:21.667765Z","author":{"name":"LJ","id":"kaid_1144628223469068678737336","avatar":"/images/avatars/svg/leafers-sapling.svg"},"text":"I didn't lol"},{"date":"2024-10-17T02:14:15.513766Z","author":{"name":"CodeNinja","id":"kaid_6247985199070618801670730","avatar":"/images/avatars/svg/starky-ultimate.svg"},"text":"Woah. That was fast. Lol"},{"date":"2024-10-17T02:15:25.101831Z","author":{"name":"LJ","id":"kaid_1144628223469068678737336","avatar":"/images/avatars/svg/leafers-sapling.svg"},"text":"lightspeed lol"},{"date":"2024-10-17T02:16:20.9655Z","author":{"name":"CodeNinja","id":"kaid_6247985199070618801670730","avatar":"/images/avatars/svg/starky-ultimate.svg"},"text":"Hows the khantober project? Going well? Actually for me it was my first time"},{"date":"2024-10-17T02:17:18.835238Z","author":{"name":"LJ","id":"kaid_1144628223469068678737336","avatar":"/images/avatars/svg/leafers-sapling.svg"},"text":"going well, gonna release it on the 19th ;)"},{"date":"2024-10-17T02:24:45.531067Z","author":{"name":"CodeNinja","id":"kaid_6247985199070618801670730","avatar":"/images/avatars/svg/starky-ultimate.svg"},"text":"Same 'ere. I'm excited!"}]},{"replyCount":1,"votes":3,"date":"2024-10-17T03:39:56.713087Z","author":{"name":"TheDoughSmith","id":"kaid_327391748191379359037953","avatar":"/images/avatars/svg/primosaur-seed.svg"},"text":"hmm, the bot somehow failed to get out of check when there was a perfectly valid option . . . don't think it quite has its priorities straight.","locked":false,"pinned":false,"replies":[{"date":"2024-10-17T04:03:42.049704Z","author":{"name":"TheDoughSmith","id":"kaid_327391748191379359037953","avatar":"/images/avatars/svg/primosaur-seed.svg"},"text":"lol, played a second game and after clearing all of the bot's pieces, the bot proceeded to place itself into check multiple times."}]},{"replyCount":0,"votes":3,"date":"2024-10-16T23:26:13.287695Z","author":{"name":"??????????","id":"kaid_706406430552760652245376","avatar":"/images/avatars/svg/cacteye-yellow.svg"},"text":"Wow, one of the best chess remakes on KA.","locked":false,"pinned":false,"replies":[]},{"replyCount":0,"votes":2,"date":"2024-10-16T21:28:47.049843Z","author":{"name":"goat120","id":"kaid_1167989604939556743383715","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"I won","locked":false,"pinned":false,"replies":[]},{"replyCount":0,"votes":2,"date":"2024-10-16T21:23:40.878837Z","author":{"name":"goat120","id":"kaid_1167989604939556743383715","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"This is such a Good game just love it.","locked":false,"pinned":false,"replies":[]},{"replyCount":1,"votes":2,"date":"2024-10-16T16:29:11.317135Z","author":{"name":"Chickenfarmer2009","id":"kaid_287879839213083022099587","avatar":"/images/avatars/svg/piceratops-ultimate.svg"},"text":"Pretty nice!
So, basically, in about 5 turns, the bot blundered his king and I took it with my queen XD
But I'm sure chess bots are hard to make, so I won't complain too much :)","locked":false,"pinned":false,"replies":[{"date":"2024-10-17T02:24:24.375147Z","author":{"name":"Mathlete11","id":"kaid_4902531429433401500771997","avatar":"/images/avatars/svg/starky-sapling.svg"},"text":"lol yeah"}]},{"replyCount":0,"votes":2,"date":"2024-10-16T20:26:51.714068Z","author":{"name":"honeyghost","id":"kaid_381818316234075133568777","avatar":"/images/avatars/svg/boggle-yellow.svg"},"text":"No check? If you're in check it doesn't tell you, or the bot! That's no how chess works... oh well. I tried making a chess bot myself once, but it was no good, so I delete. This is awesome.","locked":false,"pinned":false,"replies":[]},{"replyCount":0,"votes":2,"date":"2024-10-16T17:03:27.640177Z","author":{"name":"ASBackup","id":"kaid_714780036830891967670231","avatar":"/images/avatars/svg/aqualine-tree.svg"},"text":"looks amazing :D
ez bot tho. won","locked":false,"pinned":false,"replies":[]},{"replyCount":1,"votes":2,"date":"2024-10-16T16:16:32.285694Z","author":{"name":"Luke Ellis","id":"kaid_8535468719137003545030723","avatar":"/images/avatars/svg/orange-juice-squid.svg"},"text":"Nice, but check doesn't work. I checked the opponent's king and it didn't try to block the check, kill my piece, or move the king to a safe spot. I'm sure this is just a loose imitation, though, so I'm not too worried.","locked":false,"pinned":false,"replies":[{"date":"2024-10-16T16:17:54.910374Z","author":{"name":"?BBB# 3221hslawc","id":"kaid_792288208072906614241148","avatar":"/images/avatars/svg/spunky-sam-red.svg"},"text":"Yeah, I tried adding an anti-blunder mechanism, but it caused too much lag..."}]},{"replyCount":0,"votes":2,"date":"2024-10-17T15:33:21.13899Z","author":{"name":"Graffiti.co","id":"kaid_8982127828265761166807194","avatar":"/images/avatars/svg/cs-hopper-jumping.svg"},"text":"'Blinded by his anger' is wild","locked":false,"pinned":false,"replies":[]},{"replyCount":1,"votes":2,"date":"2024-10-16T21:34:11.36537Z","author":{"name":"Panda15","id":"kaid_9155426718383676698036057","avatar":"/images/avatars/svg/duskpin-ultimate.svg"},"text":"the entire game I didnt know if the bot was bad, or if it was a genius and I couldnt tell what it was doing because I am so bad at chess.

pretty good bot though, better than what you might expect to see on KA

vote ++


also that how to play screen is W


EDIT: in only 700 lines! wow ur good","locked":false,"pinned":false,"replies":[{"date":"2024-10-16T21:36:31.063228Z","author":{"name":"?BBB# 3221hslawc","id":"kaid_792288208072906614241148","avatar":"/images/avatars/svg/spunky-sam-red.svg"},"text":"Yes. The bot is truly amazing. I can _never_ beat it!
haha jk

Thanks ???"}]},{"replyCount":1,"votes":1,"date":"2024-10-17T13:08:12.849881Z","author":{"name":"Chocq","id":"kaid_313818142787958594670670","avatar":"/images/avatars/svg/stelly-blue.svg"},"text":"this is the only ever chess game with a bot on Khan academy","locked":false,"pinned":false,"replies":[{"date":"2024-10-17T15:28:13.607132Z","author":{"name":"Dat","id":"kaid_4164356982737975081215128","avatar":"/images/avatars/svg/marcimus-orange.svg"},"text":"there's been atleast 3 others with higher quality, most well known is bob lyon's

(im only here to advertise that i hold the world record for strongest chess bot on ka!!)"}]},{"replyCount":2,"votes":1,"date":"2024-10-17T15:37:41.975079Z","author":{"name":"Pikachu","id":"kaid_4873573849551709881394723","avatar":"/images/avatars/svg/primosaur-tree.svg"},"text":"the pawns are indistinguishable by color and can be hard to keep track of in the late game.","locked":false,"pinned":false,"replies":[{"date":"2024-10-17T15:40:03.064693Z","author":{"name":"?BBB# 3221hslawc","id":"kaid_792288208072906614241148","avatar":"/images/avatars/svg/spunky-sam-red.svg"},"text":"Have you tried the "Change pawn emoji" button?"},{"date":"2024-10-17T16:14:40.220717Z","author":{"name":"math manual","id":"kaid_1132758746388014174224664","avatar":"/images/avatars/svg/cs-hopper-cool.svg"},"text":"Click on ?change pawn emoji?"}]},{"replyCount":0,"votes":0,"date":"2024-10-16T18:10:07.626155Z","author":{"name":"Levi Scougale","id":"kaid_6252893949131502091945936","avatar":"/images/avatars/svg/leafers-tree.svg"},"text":"I don't actually know how to make JavaScript, but anyway it's a great game. At first, I thought the king was the queen and vice versa, but I figured it out. One thing is that if you have your opponent's king in immediate danger, your opponent won't move his king out of the way, nor use another piece to block your path. And I thought chess rules stated that if your king is in danger of being captured, then you have to take immediate action to protect him.
But don't worry about it. It's still an awesome game.","locked":false,"pinned":false,"replies":[]},{"replyCount":1,"votes":0,"date":"2024-10-16T18:00:57.182815Z","author":{"name":"AmethystSky","id":"kaid_784805823121542822870790","avatar":"/images/avatars/svg/duskpin-ultimate.svg"},"text":"the bot keeps trying to attack with its king","locked":false,"pinned":false,"replies":[{"date":"2024-10-16T18:11:32.401501Z","author":{"name":"Levi Scougale","id":"kaid_6252893949131502091945936","avatar":"/images/avatars/svg/leafers-tree.svg"},"text":"I didn't notice that."}]},{"replyCount":2,"votes":0,"date":"2024-10-16T17:57:24.032952Z","author":{"name":"Duke","id":"kaid_351465532815782433620675","avatar":"/images/avatars/svg/starky-ultimate.svg"},"text":"Sweet job!

though the bot could try to get a bit better haha :P","locked":false,"pinned":false,"replies":[{"date":"2024-10-16T21:38:02.622069Z","author":{"name":"?BBB# 3221hslawc","id":"kaid_792288208072906614241148","avatar":"/images/avatars/svg/spunky-sam-red.svg"},"text":"Thank you (:

The bot does not consider what you will do in response. It captures what it can, and it tries to push deeper into your territory if it can't capture."},{"date":"2024-10-16T22:47:09.144095Z","author":{"name":"Duke","id":"kaid_351465532815782433620675","avatar":"/images/avatars/svg/starky-ultimate.svg"},"text":"Your welcome!

Oh I see. That definitely is easier to make."}]}],"questions":[{"replyCount":0,"votes":1,"date":"2024-10-17T16:01:49.078964Z","author":{"name":"math manual","id":"kaid_1132758746388014174224664","avatar":"/images/avatars/svg/cs-hopper-cool.svg"},"text":"Chicken bot 5000? Seriously?","replies":[],"answers":[{"replyCount":0,"votes":1,"date":"2024-10-17T16:11:43.926459Z","author":{"name":"math manual","id":"kaid_1132758746388014174224664","avatar":"/images/avatars/svg/cs-hopper-cool.svg"},"text":"I won","replies":[]}]}]}}