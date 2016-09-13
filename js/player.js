"use strict";

$.Player = function(x1, y1) {
    this.x = x1;
    this.y = y1;
    this.color = 'rgba(3, 3, 3, 1)';
    this.diameter = 10;
    this.dimension = 10;
    this.targetDimension = 6;
    this.growthSpeed = 1;
    this.left = false;
    this.right = false;
    this.jump = false;
    this.direction = 0;
    this.accel = 2;
};


$.Player.prototype.render = function () {
    $.Draw.rect(this.x-4, this.y-4, this.dimension, this.dimension, this.color);

};

$.Player.prototype.localGlitch = function () {

    var offsetX = $.util.randomIntInRange(-5,5);
    var offsetY = $.util.randomIntInRange(-5,5);
    while (offsetY === 0 && offsetX === 0) {
        offsetY = $.util.randomIntInRange(-5,5);
        offsetX = $.util.randomIntInRange(-5,5);
    }
    if ($.map.getData($.map_x + parseInt(this.x/20) + offsetX, $.map_y + parseInt(this.y/20) + offsetY) != $.gray) {
        $.map.setData($.map_x + parseInt(this.x/20) + offsetX, $.map_y + parseInt(this.y/20) + offsetY, $.util.pickRandomFromObject($.colors));
    }   
};

$.Player.prototype.update = function () {
    var newX = this.x;
    var newY = this.y; 

    if (controls.left) {
      // collision
        newX -= this.accel;
    }
    else if (controls.right) {
        newX += this.accel;
    }
    else if (controls.up) {
        newY -= this.accel;
    }
    else if (controls.down) {
        newY += this.accel;
    }
    else if (controls.x && $.quest_state > 0) {
        this.localGlitch();
    }

    if ($.map.isSolid($.map.getDataFromPixel(newX-5, newY-5)) || $.map.isSolid($.map.getDataFromPixel(newX+5, newY+5)) ||
        $.map.isSolid($.map.getDataFromPixel(newX-5, newY+5)) || $.map.isSolid($.map.getDataFromPixel(newX+5, newY-5))
        ){
        
    }
    else {
        this.x = newX;
        this.y = newY;
    }
        if ($.hermit_chat === 0 && ($.red === $.map.getDataFromPixel(newX-5, newY-5) || $.red === $.map.getDataFromPixel(newX+5, newY+5) ||
            $.red === $.map.getDataFromPixel(newX-5, newY+5) || $.red === $.map.getDataFromPixel(newX+5, newY-5))) {
            //death
            document.getElementById('death').innerHTML = "Frank was brutally absorbed by the red sludge.<br />A few days later, the glitching stopped and normal living resumed - except for Frank, who was dead.";
            $.stop = true;

        }
    if (this.x < 0) {
        this.x += 40*20;
        $.map_x -= 40;
    }
    else if (this.x > 40*20) {
        this.x -= 40*20;
        $.map_x += 40;
    }

    if (this.y < 0) {
        this.y += 25*20;
        $.map_y -= 25;

    }
    else if (this.y > 25*20) {
        this.y -= 25*20;
        $.map_y += 25;
    }

};

