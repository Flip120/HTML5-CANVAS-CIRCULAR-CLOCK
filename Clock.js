function Clock(params) {
    //Config
    var doStep = {};
    var doDraw = {};
    var type, initValue, data, time, showText, textColor, bodyColor, borderColor, bodyWidth, borderWidth, bodySeparation, fontFace, endCallback, dateStart, freq, netRadius, autoDraw, clockInterval, drawInterval;
    
    this.params = params;
    setInitialClock(this);


    function setInitialClock(clock){
        type = clock.params.type || Clock.TYPE_CLOCKWISE_INCREMENT;
        initValue = clock.params.initValue || (type <= Clock.TYPE_CLOCKWISE_DECREMENT) ? 0 : 2;
        data = initValue;
        time = parseInt((clock.params.time) ? (clock.params.time) : 60);
        showText = (clock.params.showText != null) ? (clock.params.showText) : true;
        textColor = (showText) ? (clock.params.textColor || 'white') : null;
        bodyColor = (clock.params.bodyColor) ? clock.params.bodyColor : '#FF0000';
        borderColor = (clock.params.borderColor) ? clock.params.borderColor : 'transparent';
        bodyWidth = clock.params.bodyWidth || 10;
        borderWidth = clock.params.borderWidth || bodyWidth;
        bodySeparation = (clock.params.bodySeparation) ? (clock.params.bodySeparation) : 0;
        fontFace = (clock.params.fontFace) ? clock.params.fontFace : 'Arial';
        endCallback = clock.params.endCallBack || function() {
            console.log('TIME OUT!!');
        };
        dateStart = new Date();
        freq = (clock.params.freq != null) ? clock.params.freq : 10;
        netRadius = Math.max(bodyWidth, borderWidth);
        autoDraw = (clock.params.autoDraw != null) ? clock.params.autoDraw : true;
        clock.diff = 0;

        //PUBLIC:
        clock.ctx = clock.params.context;
        clock.x = clock.params.x || 300,
            clock.y = clock.params.y || 300,
            clock.radius = clock.params.radius || 200;
    }

    //Draw Funcs
    doStep[Clock.TYPE_CLOCKWISE_INCREMENT] = function(Clock) {
        if (data >= 2) {
            clearInterval(clockInterval);
            clearInterval(drawInterval); 
            data = 2;
            endCallback();
            return;
        }
        var now = new Date();
        Clock.diff = ((now.getTime() - dateStart.getTime()) / 1000);
        data = Clock.diff * 2 / time;
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
    };
    doStep[Clock.TYPE_COUNTERCLOCKWISE_INCREMENT] = function(Clock) {
        if (data <= 0) {
            clearInterval(clockInterval);
            clearInterval(drawInterval);
            data = 2;
            endCallback();
            return;
        }

        var now = new Date();
        Clock.diff = ((now.getTime() - dateStart.getTime()) / 1000);
        data = 2 - Clock.diff * 2 / time;
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
    };
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
        Clock.ctx.fillText(Math.ceil(time - Clock.diff), Clock.x, Clock.y + (Clock.radius / 4));
        Clock.ctx.restore();
    }
    function eraseZone(Clock) {
        Clock.ctx.clearRect(Clock.x - Clock.radius - netRadius, Clock.y - Clock.radius - netRadius, Clock.radius * 2 + netRadius * 2, Clock.radius * 2 + netRadius * 2);
    }
    //PUBLIC:
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
        clearInterval(drawInterval);
    }; 


    this.reset = function(params){
        

        var keys= Object.keys(this.params);
        var keys2= Object.keys(params);
        for(var i = 0; i < keys.length; i++){
            for (var j = 0; j < keys2.length; j++) {
                if(keys2[j] == keys[i]){
                    this.params[keys[i]] = params[keys2[j]]
                    break
                }
            };
        }

        setInitialClock(this);
    }
    /*,
     this.getGameTime = function(){
     return Math.ceil(this.diff);
     }*/
}
Clock.TYPE_CLOCKWISE_INCREMENT = 0;
Clock.TYPE_CLOCKWISE_DECREMENT = 1;
Clock.TYPE_COUNTERCLOCKWISE_INCREMENT = 2;
Clock.TYPE_COUNTERCLOCKWISE_DECREMENT = 3;
Clock.prototype.getGameTime = function() {
    return Math.ceil(this.diff);
};