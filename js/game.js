"use strict";

var $ = {};

$.width = 800;
$.height = 500;

$.colors = {
//    black: 'rgba(0, 0, 0, 1)',
  //  gray: 'rgba(157, 157, 157, 1)',
//    white: 'rgba(255, 255, 255, 1)',
  //  red: 'rgba(190, 38, 51, 1)',
    pink: 'rgba(295, 99, 247, 1)',
    purple: 'rgba(91, 0, 110, 1)',
    darkbrown: 'rgba(73, 60, 43, 1)',
    brown: 'rgba(164, 100, 34, 1)',
    yellow: 'rgba(247, 226, 107, 1)',
    darkgreen: 'rgba(47, 72, 78, 1)',
    green: 'rgba(88, 167, 46, 1)',
 //   slimegreen: 'rgba(163, 206, 39, 1)',
    nightblue: 'rgba(27, 38, 50, 1)',
 //   seablue: 'rgba(0, 87, 132, 1)',
    skyblue: 'rgba(49, 162, 242, 1)',
   // cloudblue: 'rgba(178, 220, 239, 1)',

};

$.red = 'rgba(190, 38, 51, 1)';
$.black = 'rgba(0, 0, 0, 1)';
$.gray ='rgba(157, 157, 157, 1)';

$.timer = 0;
$.red_chat = 0;
$.frank_chat = 0;
$.hermit_chat = 0;

$.entities = [];
$.glitch = 0;

$.stop = false;
$.stop_count = 10;

$.quest_state = 0;
$.skip_state = 0;

var dt = 0;
var controls = { left: false, right: false, jump: false };

$.init = function () {
    $.canvas = document.getElementsByTagName('canvas')[0];
    $.canvas.width = $.width;
    $.canvas.height = $.height;
    $.ctx = $.canvas.getContext('2d');
    $.chat = new $.Chat();
    $.quests = new $.Quests();
    $.generateRandomObjects();
    $.map_x = 80;
    $.map_y = 50;
    $.loop();
};

$.loop = function () {
    $.render();
    $.update();

    window.requestAnimFrame($.loop);
};

$.update = function () {
    if ($.stop) return;

    $.timer++;

    if ($.timer == 100) {
        $.chat.addChat("Frank","Oh hi. I'm Frank, how are you?", $.colors["green"]);
    }
    if ($.timer == 300) {
        $.chat.addChat("Frank","You can control me with the arrow keys. How do you like my home?", $.colors["green"]);
    }
    if ($.timer == 700) {
        $.chat.addChat("Frank","I know, it could use a lick of paint. But I like it here!", $.colors["green"]);
    }
    if ($.timer == 800) {
        $.chat.addChat("Frank","I got my stuff, I got my space. I'm happy.", $.colors["green"]);
    }
    if ($.timer == 1100) {
        $.chat.addChat("Frank","Let's go outside for a bit. You can walk on all the light tiles.", $.colors["green"]);
    }

    if ($.timer == 1350) {
        if ($.player.y > (61%25)*20) {
            $.map.setData(96,60,$.colors["darkgreen"]);
        }
        else {
            $.map.setData(96,63,$.colors["darkgreen"]);
        }
    }
    if ($.timer == 1380) {
        $.chat.addChat("Frank","What in the highest!", $.colors["green"]);
    }
    if ($.timer == 1440) {
        $.chat.addChat("Frank","A tree! In the middle of my house!", $.colors["green"]);
    }
    if ($.timer == 1550) {
        $.chat.addChat("Frank","I mean, I like trees. But not ones appearing without an invitation.", $.colors["green"]);
    }
    if ($.timer == 1720) {
        $.chat.addChat("Frank","This is highly irregular!", $.colors["green"]);
    }
    if ($.timer == 2000) {
        $.chat.addChat("Frank","I need to go ask Gunnar. Gunnar knows about science and stuff.", $.colors["green"]);
    }
    if ($.timer == 2200) {
        $.chat.addChat("Frank","He lives not far to the south east. Let's go!", $.colors["green"]);
    }
    if ($.timer == 2400) {
        $.quests.addQuest(1, "Find Gunnar the science guy in the south east" , 3,3);
        $.quest_state = 1;

    }
    if ($.skip_state == 0 && controls.space) {
        $.skip_state = 1;
        $.timer = 1999;
    }
    if ($.timer > 3000 && $.map_y == 50 && $.map_x == 80 && $.red_chat == 0) {
        $.red_chat = $.timer;
        $.map.setData(110,70,$.red);
        
    }
    if ( $.red_chat > 0) {
        if ($.timer === ($.red_chat + 30)) {
            $.chat.addChat("Frank","Did you see that?", $.colors["green"]);
        }
        if ($.timer === ($.red_chat + 150)) {
            $.chat.addChat("Frank","That's... not good", $.colors["green"]);
        }
        if ($.timer === ($.red_chat + 300)) {
            $.chat.addChat("Frank","That red sludge is highly dangerous. Don't go near it!", $.colors["green"]);
        }
        if ($.timer === ($.red_chat + 500)) {
            $.chat.addChat("Frank","It will ooze around open spaces. Good luck it's been trapped between solid stuff!", $.colors["green"]);
        }
        if ($.timer === ($.red_chat + 650)) {
            $.chat.addChat("Frank","But how did it get there?", $.colors["green"]);
            $.red_chat = -1;
        }
    }

    if ($.npcs.overlap() === "noone") {
    }
    else {
        if( $.npcs.overlap() === "Gunnar") {
            var qs = $.quests.getAll();

           for (var i=0; i<qs.length; i++) {
               if (qs[i].id === 1 && !qs[i].complete) {
                    $.quests.complete(1);
                    $.quest_state = 2;

                    $.chat.addChat("Gunnar","HI FRANK!", $.colors["skyblue"]);
                    $.frank_chat = $.timer;    

                }
            }
        }
        else  if( $.npcs.overlap() === "The Hermit") {
            var qs = $.quests.getAll();

           for (var i=0; i<qs.length; i++) {
               if (qs[i].id === 2 && !qs[i].complete) {
                    $.quests.complete(2);
                    $.quest_state = 3;

                    $.chat.addChat("The Hermit","Frank. I didn't expect _you_", $.colors["yellow"]);
                    $.hermit_chat = $.timer;    

                }
            }
        }

    }
    if ($.hermit_chat > 0) {
        if ($.timer === ($.hermit_chat + 70)) {
            $.chat.addChat("Frank","Apologies oh great Hermit...", $.colors["green"]);
        }
        if ($.timer === ($.hermit_chat + 270)) {
            $.chat.addChat("The Hermit","Yeah yeah. This kinda thing happens way too often for my liking.", $.colors["yellow"]);
        }
        if ($.timer === ($.hermit_chat + 350)) {
            $.chat.addChat("Frank","So sorry oh great Hermit...", $.colors["green"]);
        }
        if ($.timer === ($.hermit_chat + 500)) {
            $.chat.addChat("The Hermit","I got good news: I have the perfect solution!", $.colors["yellow"]);
        }
        if ($.timer === ($.hermit_chat + 600)) {
            $.chat.addChat("Frank","Ah! Thank you so much oh great...", $.colors["green"]);
        }
        if ($.timer === ($.hermit_chat + 660)) {
            $.chat.addChat("The Hermit","If you lot can't learn... maybe others will.", $.colors["yellow"]);
        }
        if ($.timer === ($.hermit_chat + 800)) {
            $.chat.addChat("Frank","What do you mean...others? ", $.colors["green"]);
        }
        if ($.timer > ($.hermit_chat + 1000)) {

            for (var i = 1; i < 5; i++) {
                var offsetX = $.util.randomIntInRange(0,41);
                var offsetY = $.util.randomIntInRange(0,26);

               $.map.setData(offsetX, offsetY, $.red);
            }
        }
        if ($.timer > ($.hermit_chat + 1500)) {

            for (var i = 0; i < 41; i++) {
                for (var j = 0; j < 26; j++) {
                   $.map.setData(i,j, $.red);
                }
            }
            $.Draw.rectFill(8*20, 8*20, 160,160, $.red);
            document.getElementById('death').innerHTML = "Frank had one last thought before the red sludge ate him up: It had been a bad day for Frank.<br/><br/>Thanks for playing!<br/><br/>Made by dollarone for JS13k 2016.";


            $.stop = true;
        }
    }

    if ($.frank_chat > 0) {
        if ($.timer === ($.frank_chat + 70)) {
            $.chat.addChat("Frank","Hi Gunnar.", $.colors["green"]);
        }
        if ($.timer === ($.frank_chat + 150)) {
            $.chat.addChat("Frank","Uhm... weird things are happening man.", $.colors["green"]);
        }
        if ($.timer === ($.frank_chat + 300)) {
            $.chat.addChat("Frank","A tree suddenly appeared in my house!", $.colors["green"]);
        }
        if ($.timer === ($.frank_chat + 400)) {
            $.chat.addChat("Gunnar","OH NOT THIS AGAIN.", $.colors["skyblue"]);
        }
        if ($.timer === ($.frank_chat + 480)) {
            $.chat.addChat("Frank","Again? What do you...", $.colors["green"]);
        }
        if ($.timer === ($.frank_chat + 600)) {
            $.chat.addChat("Gunnar","OHSHITOHSHITOHSHIT", $.colors["skyblue"]);
        }
        if ($.timer === ($.frank_chat + 800)) {
            $.chat.addChat("Frank","Gunnar? Why is this happening?", $.colors["green"]);
        }
        if ($.timer === ($.frank_chat + 1000)) {
            $.chat.addChat("Gunnar","FRANK! YOU HAVE TO GO ASK FOR HELP.", $.colors["skyblue"]);
        }
        if ($.timer === ($.frank_chat + 1300)) {
            $.chat.addChat("Gunnar","GO TO THE HERMIT AND PLEAD!", $.colors["skyblue"]);
        }
        if ($.timer === ($.frank_chat + 1650)) {
            $.chat.addChat("Frank","The Hermit? but...", $.colors["green"]);
        }
        if ($.timer === ($.frank_chat + 1690)) {
            $.chat.addChat("Gunnar","FRANK!", $.colors["skyblue"]);
        }
        if ($.timer === ($.frank_chat + 1700)) {
            $.chat.addChat("Gunnar","YOU NEED TO DO THIS FOR ME. I HAVE ... HISTORY WITH HIM.", $.colors["skyblue"]);
        }
        if ($.timer === ($.frank_chat + 2000)) {
            $.chat.addChat("Gunnar","THE HERMIT LIVES ON THE ISLAND NORTH WEST OF HERE.", $.colors["skyblue"]);
        }
        if ($.timer === ($.frank_chat + 2250)) {
            $.chat.addChat("Frank","But how do I cross the red sludge?", $.colors["green"]);
        }
        if ($.timer === ($.frank_chat + 2500)) {
            $.chat.addChat("Gunnar","NOT A PROBLEM. HERE. TAKE THIS. ", $.colors["skyblue"]);
        }
        if ($.timer === ($.frank_chat + 2800)) {
            $.chat.addChat("Gunnar","ITS A RANDOMASSER™. ", $.colors["skyblue"]);
        }
        if ($.timer === ($.frank_chat + 3000)) {
            $.chat.addChat("Gunnar","JUST PRESS THAT X BUTTON TO USE IT. ", $.colors["skyblue"]);
        }
        if ($.timer === ($.frank_chat + 3300)) {
            $.chat.addChat("Gunnar","AND BE CAREFUL. IT'S NOT PASSED SAFETY TESTING YET. ", $.colors["skyblue"]);
        }
        if ($.timer === ($.frank_chat + 3450)) {
            $.chat.addChat("Frank","Gunnar... what does it do?", $.colors["green"]);
        }
        if ($.timer === ($.frank_chat + 3750)) {
            $.chat.addChat("Gunnar","OH IT JUST CHANGES THE STRUCTURE OF MASS AROUND YOU.", $.colors["skyblue"]);
        }
        if ($.timer === ($.frank_chat + 4100)) {
            $.chat.addChat("Gunnar","NOW GO AS QUICK AS YOU CAN. TIME IS POTENTIALLY LIMITED.", $.colors["skyblue"]);
            $.quests.addQuest(2, "Ask the Hermit on the northwestern island for help" , 3,3);
            $.quest_state = 2;

        }

    }

    $.glitch++;
    if ($.quest_state > 0 && $.glitch > parseInt(63-($.quest_state*20)) ) {
       $.randomGlitch();
       $.glitch = 0;
    }
    for (var i = 0; i < $.entities.length; i++) {
        $.entities[i].update();    
    }

    $.player.update();
    $.quests.update();
    $.chat.update();
    $.npcs.update();
};

$.render = function () {
    $.Draw.clear();
    $.map.render($.map_x, $.map_y);
    $.player.render();
    $.quests.render();
    $.chat.render();
    $.npcs.render();
};

$.randomGlitch = function () {

    var offsetX = $.util.randomIntInRange(1,199);
    var offsetY = $.util.randomIntInRange(1,124);
    while (offsetY === parseInt($.map_y + $.player.y/20) && offsetX === parseInt($.map_x + $.player.x/20)) {
        offsetX = $.util.randomIntInRange(1,199);
        offsetY = $.util.randomIntInRange(1,124);
    }

    if ($.map.getData(offsetX, offsetY) != $.gray) {

       $.map.setData(offsetX, offsetY, $.util.pickRandomFromObject($.colors));
   }
};

$.generateRandomObjects = function () {
    $.entities = [];

    $.map = new $.Map(202,127, $.colors);
    $.player = new $.Player(20*20+9,12*20+9);
    $.npcs = new $.Npcs();
    $.npcs.addNpc("Gunnar", 187,92);
    $.npcs.addNpc("The Hermit", 15, 15); //187,92));
};

window.addEventListener('load', $.init, false);

window.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, true);
window.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);

function onkey(ev, key, down) {
    var KEY = { SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, X: 88 };

  switch(key) {
    case KEY.LEFT:  controls.left  = down; return false;
    case KEY.RIGHT: controls.right = down;  return false;
    case KEY.UP: controls.up  = down; return false;
    case KEY.DOWN: controls.down  = down; return false;
    case KEY.SPACE: controls.space = down; return false;
    case KEY.X: controls.x = down; return false;
  }
}