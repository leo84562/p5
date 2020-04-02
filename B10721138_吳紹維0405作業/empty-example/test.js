	var x=300,y=300;
	var xspeed=2,yspeed=3;
function setup() {
  createCanvas(600,600);
}

function draw() {
  var cx=map(x,0,width,0,255);
	var cy=map(y,0,height,0,255);
	background(cx,150,cy);	
	if(x>=width-15|x<=15){
		xspeed*=-1;
	}
	if(y>=height-15|y<=15){
		yspeed*=-1;
	}
	noFill();
	circle(mouseX,mouseY,120);
	circle(x,y,30);
	if(dist(mouseX,mouseY,x,y)<=15){

		xspeed*=-1;
		yspeed*=-1;	
		while(dist(mouseX,mouseY,x,y)<=15){
			x=x+xspeed;
		y=y+yspeed;
		}
		xspeed*=2;
		yspeed*=2;
	}
	else if(dist(mouseX,mouseY,x,y)<=60)
	{
		x=x+xspeed/abs(xspeed);
		y=y+yspeed/abs(yspeed);
	}
	else
	{
		x=x+xspeed;
		y=y+yspeed;
	}
}