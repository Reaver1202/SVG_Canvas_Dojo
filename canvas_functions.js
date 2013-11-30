 function draw_b() {
  var b_canvas = document.getElementById("a");
  var b_context = b_canvas.getContext("2d");
  b_context.fillRect(50, 25, 150, 100);
}



// drawing a coordinate system:
function draw_coordinateSystem (){
	var c_canvas = document.getElementById("c_coordination");
	var context = c_canvas.getContext("2d");
	c_canvas.height = document.getElementById("height_input").value;
	c_canvas.width = document.getElementById("width_input").value;
	
	
	
	// at first sketich with a "pencil" --> not permanent 
	// --> just to test until it´s ok
	// like a "concept"
	for (var x = 0.5; x < c_canvas.width; x += 10){
		context.moveTo(x,0);
		context.lineTo(x,c_canvas.height);
	}
	
	for (var y = 0.5; y < c_canvas.height; y += 10){
		context.moveTo(0,y);
		context.lineTo(c_canvas.width,y);
	}
	
	// now drawing with ink --> permanent
	context.strokeStyle = "#eee";
	context.stroke();
	
	// draw new concept of the x- and y-axis
	// x-axis
	context.beginPath();
	context.moveTo(0, 40);
	context.lineTo(240, 40);
	context.moveTo(260, 40);
	context.lineTo(500, 40);
	context.moveTo(495, 35);
	context.lineTo(500, 40);
	context.lineTo(495, 45);
	
	// y-axis
	context.moveTo(60, 0);
	context.lineTo(60, 153);
	context.moveTo(60, 173);
	context.lineTo(60, 375);
	context.moveTo(65, 370);
	context.lineTo(60, 375);
	context.lineTo(55, 370);
	
	// draw axis permanently
	context.strokeStyle = "#000";
	context.stroke();
	
	// draw text on the axis
	context.font = "bold 12px sans-serif";
	context.fillText("x", 248, 43);
	context.fillText("y", 58, 165);
	
	// point (0,0)
	context.textBaseline = "top";
	context.fillText("( 0 , 0 )", 8, 5);
	
	// point (500,375)
	context.textAlign = "right";
	context.textBaseline = "bottom";
	context.fillText("( 500 , 375 )", 492, 370);
	
	// dot as rectangle
	context.fillRect(0, 0, 3, 3);
	context.fillRect(497, 372, 3, 3);
	
}

// draw image
function draw_image(){
	
	  var canvas = document.getElementById("c_image");
	  var context = canvas.getContext("2d");
	  var image = document.getElementById("p_image");

	// check which radiobutton is selected/checked
	 if (document.getElementById("r1").checked){
	 	x = document.getElementById("r1").value;
	 } else if (document.getElementById("r2").checked){
	 	x = document.getElementById("r2").value;
	 } else if(document.getElementById("r3").checked){
	 	x = document.getElementById("r3").value;
	 }

	  if (x==1){
	  	context.drawImage(image, 0, 0);
	  }else if(x==2){
	  // scaling (1)
	  	// scales the whole image into the canvas
	  	// the first 2 values define the upper left corner in the canvas
	  	// the last 2 values define the scaling
   		context.drawImage(image,16,28,384,272);
	  }else if (x==3){
	  
	  // scaling (2):
	  	// first 4 define rectangle that will be cutted off from image
	  	// next 2 define where is the left upper corner of the image in the canvas
	  	// last 2 define how the cutted image has to be scaled ( from 3./4. value to 7./8. value)
	  context.drawImage(image,960,680,500,400, 80,40, 250, 200);
	  }
	
}

//##########################################################
// own implementations / ideas
function createStorableGraph(height,width,nodeNumber){
	draw_graph(height,width,nodeNumber);
	createGraphIMG(); 
	document.getElementById("dynCoordSys").style.display ='none';
	document.getElementById("divIMG").style.display ='block';
}
function createGraphIMG(){
	var canvas = document.getElementById("dynCoordSys");
	var dataURL = canvas.toDataURL();
	document.getElementById("divIMG").src = dataURL;
}

function draw_graph(height,width,nodeNumber){
	var canvas = document.getElementById("dynCoordSys");
	var context = canvas.getContext("2d");
	document.getElementById("dynCoordSys").style.display ='block';

		
	var nodeImage = document.getElementById("nodeIMG");
	
	var nodeNumber = nodeNumber;// document.getElementById("node_input").value;
	
	var gheight = height;//document.getElementById("graphHeight_input").value;
	var gwidth = width;//document.getElementById("graphWidth_input").value;
	
	// draw coordination system
	draw_dynCoordSys(gheight,gwidth, canvas, context);

	
	var cx=100; // x value of corner
	var cy=100; // y value of corner
	context.beginPath();

	for (var x = 1; x <= nodeNumber; x++ ){

		draw_node(nodeImage,canvas, context, cx,cy);
		
		if (cx+60 < canvas.width-50 && x+1 <=nodeNumber){
			draw_branch(canvas, context, cx+20,cy+10);
			cx = cx + 60;
		} else if (cx+60 >= canvas.width-50 && x+1 <=nodeNumber){
			draw_connection(canvas, context, cx+20,cy+10);
			cx = 100;
			cy = cy + 60;
		};
	};
	context.strokeStyle = "#000";
	context.stroke();
	
	
}

function draw_node (nodeImage,canvas, context,cx, cy){
	//context.fillRect(cx, cy, 20, 20);
	
		context.drawImage(nodeImage,cx,cy, 20, 20);
	
}

function draw_branch (canvas, context, cx,cy){
	// because of the possibility of perfomance enhancemence 
	// is defined before the call of this function
	// --> before for-loop
	// context.beginPath(); 
	
	context.moveTo(cx, cy);
	context.lineTo(cx+40, cy);
	context.moveTo(cx+35,cy-5);
	context.lineTo(cx+40, cy);
	context.moveTo(cx+35,cy+5);
	context.lineTo(cx+40, cy);
	
	// the permanent drawing of the path is also outer this function
	// --> after the for-loop
	// context.strokeStyle = "#000";
	// context.stroke();
	
}

function draw_connection(canvas, context, cx,cy){
	context.moveTo(cx,cy);
	context.lineTo(cx+30,cy);
	context.lineTo(cx+30,cy+30);
	context.lineTo(80,cy+30);
	context.lineTo(80,cy+60);
	context.lineTo(100,cy+60);
	context.moveTo(95,cy+55);
	context.lineTo(100,cy+60);
	context.moveTo(95,cy+65);
	context.lineTo(100,cy+60);
}

// drawing a coordinate system:
function draw_dynCoordSys (height, width, canvas, context){
	var g_canvas=canvas;
	var g_context = context;
	g_canvas.height = height;
	g_canvas.width = width; 
	
	
	// at first sketich with a "pencil" --> not permanent 
	// --> just to test until it´s ok
	// like a "concept"
	for (var x = 0.5; x < g_canvas.width; x += 10){
		g_context.moveTo(x,0);
		g_context.lineTo(x,g_canvas.height);
	}
	
	for (var y = 0.5; y < g_canvas.height; y += 10){
		g_context.moveTo(0,y);
		g_context.lineTo(g_canvas.width,y);
	}
	
	// now drawing with ink --> permanent
	g_context.strokeStyle = "#eee";
	g_context.stroke();
	
	// draw new concept of the x- and y-axis
	// x-axis
	g_context.beginPath();
	g_context.moveTo(0, 40);
	//g_context.lineTo(g_canvas.width/2-10, 40);
	//g_context.moveTo(g_canvas.width/2+10, 40);
	g_context.lineTo(g_canvas.width, 40);
	g_context.moveTo(g_canvas.width-20, 30);
	g_context.lineTo(g_canvas.width, 40);
	g_context.lineTo(g_canvas.width-20, 50);
	
	// y-axis
	g_context.moveTo(60, 0);
	//g_context.lineTo(60, g_canvas.height/2-10);
	//g_context.moveTo(60, g_canvas.height/2+10);
	g_context.lineTo(60, g_canvas.height);
	g_context.moveTo(70, g_canvas.height-20);
	g_context.lineTo(60, g_canvas.height);
	g_context.lineTo(50, g_canvas.height-20);
	
	// draw axis permanently
	g_context.strokeStyle = "#000";
	g_context.stroke();
	
	// draw text on the axis
	g_context.font = "bold 12px sans-serif";
	g_context.fillText("x-axis", g_canvas.width-50, 20);
	g_context.fillText("y-axis", 10, g_canvas.height-30);
	
	// point (0,0)
	g_context.textBaseline = "top";
	g_context.fillText("( 0 , 0 )", 8, 5);

	// dot as rectangle of (0,0)
	g_context.fillRect(58, 38, 4, 4);
	
	g_context.save();
	
}

