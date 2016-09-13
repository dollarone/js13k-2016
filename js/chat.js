"use strict";


$.Chat = function() {
    this.list = [];
    this.chatlines = 0;
};


$.Chat.prototype.addChat = function (who, text, color) {
    this.list.push({who:who, text:text, color:color, fade:200});
    this.chatlines++;

};
$.Chat.prototype.render = function () {
    var buffer = "";
    for (var i=0; i<this.chatlines; i++) {
        if( this.list[i].fade > 0) {
            buffer += "<div style='color: " + this.list[i].color + "; opacity:" + Math.min(this.list[i].fade, 100)/100 + ";'>" +
             this.list[i].text + "</div><br />";
        }
    }
    buffer += "";
    document.getElementById('chat').innerHTML = buffer;
    
};

$.Chat.prototype.update = function (id) {
    for (var i=0; i<this.chatlines; i++) {
        if (this.list[i].fade > 0) {
            this.list[i].fade -= 0.5;
        }
    }
};
