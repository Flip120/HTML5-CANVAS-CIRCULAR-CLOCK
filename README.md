HTML5-CANVAS-CIRCULAR-CLOCK
===========================

A HTML5 CIRCULAR COUNTDOWN CLOCK FOR DISPLAY IN CANVAS


GETTING STARTED:

All you need is to get the 2d context of a html5 canvas element and pass it by parameter 
to the Clock as the other parameters, here an example:

var canvas = document.getElementById("myCanvas");
var cont = canvas.getContext("2d");

Next you need to create the clock passing the parameters you want:

var clock = new Clock({ 
		context 	  : cont, 
  	type 		    : Clock.TYPE_CLOCKWISE_INCREMENT,
  	time 		    : 5,
  	showText 	  : true,
  	textColor 	: 'white',
  	bodyColor	  : '#00CAFF',
  	borderColor : 'white',
  	radius 	    : 100,
  	bodyWidth   : 10,
  	borderWidth : 10,
  	endCallBack : function(){
  		alert("COUNTDOWN FINISHED!");
  	}
});

Finally, you need to start the clock by calling the function "step()";

The list of parameteres than you can override are this :

{
  context          : cont, //The 2d context of the html5 canvas (No default value)
  type             : Clock.TYPE_CLOCKWISE_INCREMENT, //The type of the clock can be Clock.TYPE_CLOCKWISE_INCREMENT, Clock.TYPE_CLOCKWISE_DECREMENT, Clock.TYPE_COUNTERCLOCKWISE_INCREMENT, Clock.TYPE_COUNTERCLOCKWISE_DECREMENT(Default Clock.TYPE_CLOCKWISE_INCREMENT)
  time             : time, //The countdown of the clock in seconds, (Default 60)
  showText         : true, //If you want that the clock includes text showing the seconds in it's center(Default true),
  textColor        : '#00CAFF', //The color of the text(Default White),
  bodyColor        : '#00CAFF', //The color of the clock's body, ( Default #FF0000),
  borderColor      : 'red', //The color of the border of the clock, (Default transparent),
  fontFace         : 'Arial', //The font of the text (Default Arial)
  radius           : 100, //The radius of the circle (Default 200),
  bodyWidth        : 10, //The width of the body // Default 10
  borderWidth      : 10, //The width of the border
  borderSeparation : 5, //The separation between the body and the border,
  x                : 0, // x coordinate of the clock, (Default 300)
  y                : 0, // y coordinate of the clock, (Default 300)
  endCallBack      : function(){ // Function to execute when the coutdown has finished
    //Do something
  },
  autoDraw         : true, //true indicates if the clock uses a interval to drawn itself in the canvas, false indicates that you want to drawn it manually by you own logic (Default true)
  freq             : 10, //The frequency that the clock refresh it's state (In milliseconds) (Default 10)
}


EXAMPLES
============

--AUTOMATIC USE--
var canvas = document.getElementById("myCanvas");
var cont = canvas.getContext("2d");
var clock = new Clock({ 
		context 	  : cont, 
  	type 		    : Clock.TYPE_CLOCKWISE_INCREMENT,
  	time 		    : 5,
  	showText 	  : true,
  	textColor 	: 'white',
  	bodyColor	  : '#00CAFF',
  	borderColor : 'white',
  	radius 	    : 100,
  	bodyWidth   : 10,
  	borderWidth : 10,
  	endCallBack : function(){
  		alert("COUNTDOWN FINISHED!");
  	}
});

clock.step();

--MANUAL USE--
var canvas = document.getElementById("myCanvas");
var cont = canvas.getContext("2d");

var clock = new Clock({ 
		context 	  : cont, 
  	type 		    : Clock.TYPE_CLOCKWISE_INCREMENT,
  	time 		    : 5,
  	showText 	  : true,
  	textColor 	: 'white',
  	bodyColor	  : '#00CAFF',
  	borderColor : 'white',
  	radius 	    : 100,
  	bodyWidth   : 10,
  	borderWidth : 10,
  	autodraw    : false,
  	endCallBack : function(){
  		alert("COUNTDOWN FINISHED!");
  	}
});

clock.step();

//Example with setInterval
setInterval(function(){
  clock.paint();
},10);
