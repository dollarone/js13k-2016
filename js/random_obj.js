"use strict";

$.RandomObj = function (x, y) {
    this.x = x; // $.util.randomInRange(0, $.width);
    this.y = y; // $.util.randomInRange(0, $.height);
    this.dimension = 40;
    this.targetDimension = $.util.randomInRange(40, 40);
    this.growthSpeed = $.util.randomInRange(0.5, 2);
    this.color = $.util.pickRandomFromObject($.colors);
};


$.RandomObj.prototype.render = function () {
    $.Draw.rect(this.x, this.y, this.dimension, this.dimension, this.color);
};

$.RandomObj.prototype.update = function () {
    if (this.dimension < this.targetDimension) {
        this.dimension += this.growthSpeed;
    }
};
