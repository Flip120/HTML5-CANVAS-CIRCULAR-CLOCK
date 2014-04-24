function Clock(params) {

    //Config
    var doStep = {};
    var doDraw = {};
    var type = params.type || Clock.TYPE_CLOCKWISE_INCREMENT;
    var initValue = params.initValue || (type <= Clock.TYPE_CLOCKWISE_DECREMENT) ? 0 : 2;
    var data = initValue;
    var time = parseInt((params.time) ? (params.time) : 60);
    var showText = (params.showText != null) ? (params.showText) : true;
    var textColor = (showText) ? (params.textColor || 'white') : null;
    var bodyColor = (params.bodyColor) ? params.bodyColor : '#FF0000';
    var borderColor = (params.borderColor) ? params.borderColor : 'transparent';
    var bodyWidth = params.bodyWidth || 10;
    var borderWidth = params.borderWidth || bodyWidth;
    var bodySeparation = (params.bodySeparation) ? (params.bodySeparation) : 0;
    var fontFace = (params.fontFace) ? params.fontFace : 'Arial';
    var endCallback = params.endCallBack || function() {
        console.log('TIME OUT!!')
    };
    var dateStart = new Date();
    var freq = (params.freq != null) ? params.freq : 10;
    var netRadius = Math.max(bodyWidth, borderWidth);
    var autoDraw = (params.autoDraw != null) ? params.autoDraw : true;

    var clockInterval,
            drawInterval,
            diff;

    //Draw Funcs
    doStep[Clock.TYPE_CLOCKWISE_INCREMENT] = function(Clock) {

        if (data >= 2) {
            clearInterval(clockInterval);
            data = 2;
            endCallback();
            return;
        }

        var now = new Date();
        diff = ((now.getTime() - dateStart.getTime()) / 1000);
        data = diff * 2 / time;
    };

    doDraw[Clock.TYPE_CLOCKWISE_INCREMENT] = function(Clock) {
        eraseZone(Clock);
        drawBorder(Clock);
        Clock.ctx.beginPath();
        Clock.ctx.strokeStyle = bodyColor;
        Clock.ctx.lineWidth = bodyWidth;
        Clock.ctx.arc(Clock.x, Clock.y, Clock.radius, initValue * Math.PI, data * Math.PI, false);
        Clock.ctx.stroke();
        drawText(Clock);
    }

    doStep[Clock.TYPE_CLOCKWISE_DECREMENT] = function(Clock) {

        if (data >= 2) {
            clearInterval(clockInterval);
            data = 0;
            endCallback();
            return;
        }

        var now = new Date();
        diff = ((now.getTime() - dateStart.getTime()) / 1000);
        data = diff * 2 / time;
    };

    doDraw[Clock.TYPE_CLOCKWISE_DECREMENT] = function(Clock) {
        eraseZone(Clock);
        drawBorder(Clock);
        Clock.ctx.beginPath();
        Clock.ctx.strokeStyle = bodyColor;
        Clock.ctx.lineWidth = bodyWidth;
        Clock.ctx.arc(Clock.x, Clock.y, Clock.radius, data * Math.PI, initValue * Math.PI, false);
        Clock.ctx.stroke();
        drawText(Clock);
    }

    doStep[Clock.TYPE_COUNTERCLOCKWISE_INCREMENT] = function(Clock) {
        if (data <= 0) {
            clearInterval(clockInterval);
            data = 2;
            endCallback();
            return;
        }

        var now = new Date();
        diff = ((now.getTime() - dateStart.getTime()) / 1000);
        data = 2 - diff * 2 / time;
    };

    doDraw[Clock.TYPE_COUNTERCLOCKWISE_INCREMENT] = function(Clock) {
        eraseZone(Clock);
        drawBorder(Clock);
        Clock.ctx.beginPath();
        Clock.ctx.strokeStyle = bodyColor;
        Clock.ctx.lineWidth = bodyWidth;
        Clock.ctx.arc(Clock.x, Clock.y, Clock.radius, data * Math.PI, 0 * Math.PI, false);
        Clock.ctx.stroke();
        drawText(Clock);
    }


    doStep[Clock.TYPE_COUNTERCLOCKWISE_DECREMENT] = function(Clock) {

        if (data <= 0) {
            clearInterval(clockInterval);
            data = 0;
            endCallback();
            return;
        }

        var now = new Date();
        diff = ((now.getTime() - dateStart.getTime()) / 1000);
        data = 2 - diff * 2 / time;
    };

    doDraw[Clock.TYPE_COUNTERCLOCKWISE_DECREMENT] = function(Clock) {
        eraseZone(Clock);
        drawBorder(Clock);
        Clock.ctx.beginPath();
        Clock.ctx.strokeStyle = bodyColor;
        Clock.ctx.lineWidth = bodyWidth;
        Clock.ctx.arc(Clock.x, Clock.y, Clock.radius, 0 * Math.PI, data * Math.PI, false);
        Clock.ctx.stroke();
        drawText(Clock);
    }

    function drawBorder(Clock) {
        Clock.ctx.beginPath();
        Clock.ctx.strokeStyle = borderColor;
        Clock.ctx.lineWidth = borderWidth;
        Clock.ctx.arc(Clock.x, Clock.y, Clock.radius + bodySeparation, 0 * Math.PI, 2 * Math.PI, false);
        Clock.ctx.stroke();
    }

    function drawText(Clock) {

        if (!showText) {
            return;
        }

        Clock.ctx.fillStyle = textColor;
        Clock.ctx.font = "bold " + (Clock.radius / 1.5) + "px " + fontFace;
        Clock.ctx.textAlign = 'center';
        Clock.ctx.fillText(Math.ceil(time - diff), Clock.x, Clock.y + (Clock.radius / 4));
        Clock.ctx.restore();
    }

    function eraseZone(Clock) {
        Clock.ctx.clearRect(Clock.x - Clock.radius - netRadius, Clock.y - Clock.radius - netRadius, Clock.radius * 2 + netRadius * 2, Clock.radius * 2 + netRadius * 2);
    }

    //PUBLIC:
    this.ctx = params.context;
    this.x = params.x || 300,
            this.y = params.y || 300,
            this.radius = params.radius || 200;
    this.step = function() {
        clockInterval = setInterval(function(Clock) {
            doStep[type](Clock);
        }, freq, this);

        if (autoDraw) {
            drawInterval = setInterval(function(Clock) {
                Clock.draw();
            }, freq, this);
        }
    };
    this.draw = function() {
        this.ctx.save();
        doDraw[type](this);
        this.ctx.restore();
    };
    this.setEndCallBack = function(newCallBack) {
        endCallback = newCallBack;
    };
    //clear the interval
    this.stopEndCallBack = function(){
        clearInterval(clockInterval);
    }; 
}
Clock.TYPE_CLOCKWISE_INCREMENT = 0;
Clock.TYPE_CLOCKWISE_DECREMENT = 1;
Clock.TYPE_COUNTERCLOCKWISE_INCREMENT = 2;
Clock.TYPE_COUNTERCLOCKWISE_DECREMENT = 3;
