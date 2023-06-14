var gl;
var numPoints = 5000;
var thetaLoc;
var theta;
var isDirClockwise = false;
var delay = 500;
var stoprotating = false;
var changecoordinates_x = 0;
var changecoordinates_y = 0;
window.onload = function main() {

		const canvas = document.querySelector("#glcanvas");
		  // Initialize the GL context
		gl = WebGLUtils.setupWebGL(canvas);
		 
		 // Only continue if WebGL is available and working
		if (!gl) {
			alert("Unable to initialize WebGL. Your browser or machine may not support it.");
			return;
		  }
		
		
		//create program
	  	var program = initShaders(gl,"vertex-shader","fragment-shader");
		gl.useProgram( program );
		
		
		// adding button
		var myButton = document.getElementById("DirectionButton"); 
		myButton.addEventListener("click", function() {(isDirClockwise = !isDirClockwise);});
		
		//changing speed
		document.getElementById("slide").onchange = function() {delay = this.value;};
		
		
		// stop button
		var stopbutton = document.getElementById("StopRotation");
	    stopbutton.addEventListener("click", function(){stoprotating = false;});		
		
		
		// start button
		var startbutton = document.getElementById("StartRotation");
	    startbutton.addEventListener("click", function(){stoprotating = true;});		
		
		
		// color buttons
		var buttonColor = document.getElementById("ColorButton");
	    var colorLocation = gl.getUniformLocation(program,"fColor");
   
		
		
		// renklendirme kısmı
	    document.getElementById("color").onchange = function(){delay2 = this.value;};
	  
	    var blue =[0.0,0.0,0.5,0.7];
	    var red =[1.0, 0.0, 0.0, 1.0];
	    var white =[1.0,1.0,1.0,1.0];
	    var green =[0.0, 0.5, 0.0,1.0];
	    buttonColor.addEventListener("click",
							function(){ 
							  if(delay2=="white"){color = white;gl.uniform4fv(colorLocation,color);}
							  if(delay2=="blue"){color = blue;gl.uniform4fv(colorLocation,color);}
							  if(delay2=="red"){color = red;gl.uniform4fv(colorLocation,color);}
							  if(delay2=="green"){color = green;gl.uniform4fv(colorLocation,color);} 
								;}
							  );
		
		
		
		//x-y düzlemlerinde kaydırma islemi
		
		var changecoordinatesy1 = document.getElementById("yup");
			changecoordinatesy1.addEventListener("click",
								function(){  changecoordinates_y += 10;                         
								});                                               
		var changecoordinatesy2 = document.getElementById("ydown");
			changecoordinatesy2.addEventListener("click",
								function(){ changecoordinates_y -= 10;                          
								}); 

		var changecoordinatesx1 = document.getElementById("xright");
			changecoordinatesx1.addEventListener("click",
								function(){ changecoordinates_x += 10;                        
								});                                               
		var changecoordinatesx2 = document.getElementById("xleft");
			changecoordinatesx2.addEventListener("click",
								function(){  changecoordinates_x -= 10;                         
								}); 


		
		// left-bottom left-top right-bottom right-top center design
		
		var lefttop = document.getElementById("lefttop");
			lefttop.addEventListener("click",
								function(){  changecoordinates_x = -140; changecoordinates_y = 180;
								});                                               
		var leftbottom = document.getElementById("leftbottom");
			leftbottom.addEventListener("click",
								function(){ changecoordinates_y = -180; changecoordinates_x = -140;                          
								}); 
		var righttop = document.getElementById("righttop");
			righttop.addEventListener("click",
								function(){  changecoordinates_x = 160; changecoordinates_y = 180;
								});                                               
		var rightbottom = document.getElementById("rightbottom");
			rightbottom.addEventListener("click",
								function(){ changecoordinates_y = -180; changecoordinates_x = 160;                          
								}); 
								
		var center = document.getElementById("center");
			center.addEventListener("click",
								function(){ changecoordinates_y = -0; changecoordinates_x = 0;                          
								}); 
		
		
		
		
		
		
		
		
		// coordinates of letters
		var vertices = [ // M harfi (30 satır)
						 vec2(-.65, -.5), //sol alt
						 vec2(-.65, 0.5), // sol üst
						 vec2(-.60, 0.5), // sağ üst
						 vec2(-.60, -.5), // sağ alt
						 vec2(-.65, -.5),
						 vec2(-.60, 0.5),
						 vec2(-0.35, -0.5),
						 vec2(-0.40, -0.5),
						 vec2(-.60, 0.32),
						 vec2(-0.35, -0.5), // 4.nokta
						 vec2(-.60, 0.5),
						 vec2(-.60, 0.32),
						 vec2(-0.39, -0.48),
						 vec2(-0.35, -0.5),
						 vec2(-.60, 0.32),
						 vec2(-0.16, 0.5),
						 vec2(-0.16, 0.32),
						 vec2(-0.39, -0.48),
						 vec2(-0.16, 0.5),
						 vec2(-0.16, 0.32),
						 vec2(-0.40, -0.5), 
						 vec2(-0.16, 0.32),
						 vec2(-0.35, -0.5),
						 vec2(-0.40, -0.5),
					     vec2(-0.16, 0.5),
						 vec2(-0.11, 0.5),
						 vec2(-0.11, -.5),
						 vec2(-0.11, -.5),
						 vec2(-0.16, -.5),
						 vec2(-0.16, 0.5),						 
						 // A harfi
						 vec2(0.15, -.5),
						 vec2(0.2, -.5),
						 vec2(0.38, 0.5),
						 vec2(0.15, -.5),
						 vec2(0.2, -.5),
						 vec2(0.38, 0.5),
						 vec2(0.15, -.5),
						 vec2(0.38, 0.5),
						 vec2(0.32, 0.5),
						 vec2(0.55, -.5),
						 vec2(0.32, 0.5),
						 vec2(0.38, 0.5),
						 vec2(0.60, -.5),
						 vec2(0.55, -.5),
						 vec2(0.38, 0.5),						 
						 vec2(0.26, -0.09),
						 vec2(0.26, -0.04),
						 vec2(0.47, -.04),
						 vec2(0.47, -.04),
						 vec2(0.47, -.09),
						 vec2(0.26, -0.09),
						  ];
		
			
		
		var bufferId = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
		
		
		// Associate out shader variables with our data buffer
		var vPosition = gl.getAttribLocation( program, "vPosition" );
		gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vPosition );

		
		thetaLoc = gl.getUniformLocation(program, "theta");
		theta=0;
		gl.uniform1f(thetaLoc, theta);


		render();


}

function render(){
	
	  if(stoprotating==true){
		  theta += (isDirClockwise ? -0.1 : 0.1);
		  gl.uniform1f(thetaLoc, theta);
	  }
	  
	  // default color
	  gl.clearColor(0.90, 0.85, 0.75, 1.0); 
	  gl.clear(gl.COLOR_BUFFER_BIT);
	  gl.drawArrays(gl.TRIANGLES, 0, 60);
	  gl.viewport(changecoordinates_x,changecoordinates_y,glcanvas.width,glcanvas.height);
		  
	  
	  setTimeout(function(){
        requestAnimFrame(render);
      },delay);
	  
}