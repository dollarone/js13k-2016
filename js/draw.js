"use strict";

$.Draw = {
    clear: function() {
        $.ctx.clearRect(0, 0, $.width, $.height);
    },

    rectFill: function(x, y, w, h, col) {
        $.ctx.beginPath();
        $.ctx.rect(x, y, w, h);
        $.ctx.fillStyle = col;
        $.ctx.fill();
    },
    rect: function(x, y, w, h, col) {
        $.ctx.beginPath();
        $.ctx.rect(x, y, w, h);
        $.ctx.strokeStyle = col;
        $.ctx.stroke();
    },
    putImageData: function(myImageData, dx, dy) {
        $.ctx.putImageData(myImageData, dx, dy);
    },
    fillText: function() {

        $.ctx.font="20px";
        $.ctx.fillText("Hello World!",10,50);
    }
};
