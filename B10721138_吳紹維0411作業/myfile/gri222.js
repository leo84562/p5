window.onload = function(){
  // 基本型
  // document.getElementById("cards").innerHTML = "New text!";
  //function infill(){
    var str="";
    for(var i=0;i<3;i+=1){
    str+=
      '<div class="col-4">'+
        '<div class="card">'+
          '<div id="sketch'+i+'"></div>'+ // 將 sketch 塞入這裡 
          '<div class="card-body">'+
            '<p>'+i+'</p>'+
          '</div>'+
        '</div>'+
      '</div>';
    }  
    document.getElementById("cards").innerHTML = str;
  //}


  var hw1 = function(p5j){

  	var ball = function(){
  		this.x=100;
  		this.y=100;
  		this.xspeed=2;	
  		this.yspeed=3;


  	}

 //  		var x=200,y=200;
	// var xspeed=2,yspeed=3;
p5j.setup=function() {
  p5j.createCanvas(200,200);
}

p5j.draw=function() {
	console.log(p5j.mouseX);
  var cx=p5j.map(this.x,0,p5j.width,0,255);
	var cy=p5j.map(this.y,0,p5j.height,0,255);
	p5j.background(cx,150,cy);	
	if(this.x>=this.width-15|this.x<=15){
		this.xspeed*=-1;
	}
	if(this.y>=this.height-15|this.y<=15){
		this.yspeed*=-1;
	}
	p5j.noFill();
	p5j.circle(p5j.mouseX,p5j.mouseY,30);
	p5j.circle(this.x,this.y,10);
	if(pj5.dist(pj5.mouseX,pj5.mouseY,this.x,this.y)<=15){

		this.xspeed*=-1;
		this.yspeed*=-1;	
		while(pj5.dist(pj5.mouseX,pj5.mouseY,this.x,this.y)<=15){
			this.x=this.x+this.xspeed;
		this.y=this.y+this.yspeed;
		}
		this.xspeed*=2;
		this.yspeed*=2;
	}
	else if(pj5.dist(pj5.mouseX,pj5.mouseY,this.x,this.y)<=60)
	{
		this.x=this.x+this.xspeed/p5j.abs(this.xspeed);
		this.y=this.y+this.yspeed/p5j.abs(this.yspeed);
	}
	else
	{
		this.x=this.x+this.xspeed;
		this.y=this.y+this.yspeed;
	}
}
  }

  //sketch
  var hw2 = function(p5j){
    // 屬性資料
    var a,b,c;    
    var arrmovers = [];
    var nsize,number=0;
    let rectcolor=p5j.color(150,150,200);
    var k,b1,b2,b3,b4,b5,b6;
    


    // !!!!!若需要 canvas 可由外部變動屬性!!!!
    var pupu="";
    // OOP
    var mover = function(_x,_y, _xspeed, _yspeed){
      this.x=_x; 
      this.y=_y;
      this.xspeed=_xspeed;
      this.yspeed=_yspeed;
      this.nsize=10;
      this.number=0;
      this.k=3;
    this.b1=p5j.width/11*5;
    this.b2=p5j.width/11*5+k;
    this.b3=p5j.width/11*6-k;
    this.b4=p5j.width/11*6;
    this.b5=p5j.height/5*2;
    this.b6=p5j.height/5*2+k;


      this.rule1 = function(){
        // console.log(this.xspeed);
        this.x+=this.xspeed;
        this.y+=this.yspeed;
      }

      this.rule2 = function(){
        if (this.x>p5j.width)  {
        
            this.x=0;
            this.rule1();}
          else if(this.x<0){
            this.x=p5j.width;}
          
        if ((this.y>=p5j.height) || (this.y<=0)) {
          this.yspeed = -1 * this.yspeed;
          while(this.y+this.nsize>=p5j.height|this.y-this.nsize<=0){
          	this.rule1();
          	this.ruleShow();
          	if(this.y>=p5j.height-8){
          	if((this.x+this.nsize>=p5j.width/11*5)|(this.x-this.nsize<=p5j.width/11*6)){this.x=this.x-this.xspeed;}
          	}
          	
          }
          }
        // console.log(p5j.width);
        }
      this.rule3=function(){
   //        if(this.y+this.nsize>this.b5){
   //        	if((this.x+this.nsize>this.b1&this.x+this.nsize<b4)|(this.x-this.nsize>this.b1&this.x-this.nsize<b4)){
			// 	if(this.y<b5){
			// 		this.cyspeed();
			// 		while(!((this.x+this.nsize>this.b1&this.x+this.nsize<b4)|(this.x-this.nsize>this.b1&this.x-this.nsize<b4)|(this.y+this.nsize>this.b5))){
   //            			this.rule1();}
              			
   //            			}
			// 	}
			// 	else{
			// 		this.cxspeed();
			// 		while(!((this.x+this.nsize>this.b1&this.x+this.nsize<b4)|(this.x-this.nsize>this.b1&this.x-this.nsize<b4)|(this.y+this.nsize>this.b5))){
   //            			this.rule1();}
              			
   //            			}





			// }
			//  if(this.y+this.nsize>=p5j.height/5*2){
   //        	if((this.x+this.nsize/2>=p5j.width/11*5&this.x+this.nsize/2<=p5j.width/11*6)|(this.x-this.nsize/2>=p5j.width/11*5&this.x-this.nsize/2<=p5j.width/11*6)){
			// 	if(this.y<p5j.height/5*2){
			// 		if()
			// 		console.log("A");
			// 		this.cyspeed();
			// 		while(!(this.y+this.nsize<p5j.height/5*2)){
   //            			this.rule1();}
              			
   //            			}
				
			// 	else{
			// 		console.log("B");
			// 		this.cxspeed();
			// 		while(!(this.x+this.nsize<=p5j.width/11*5|this.x-this.nsize>=p5j.width/11*6)){
   //            			this.rule1();}
              			
   //            			}}

			// }




			 // if(this.y+this.nsize/2>=p5j.height/5*2){
    //       	if((this.x+this.nsize/2>=p5j.width/11*5&this.x+this.nsize/2<=p5j.width/11*6)|(this.x-this.nsize/2>=p5j.width/11*5&this.x-this.nsize/2<=p5j.width/11*6)){
				// if((this.x<=p5j.width/11*6&this.x>=p5j.width/11*5)|(this.x==p5j.width/11*5|this.x==p5j.width/11*6)){
				// 	console.log("A");
				// 	this.cyspeed();
				// 	while(this.y+this.nsize/2>p5j.width/5*2){
				// 		this.rule1();
				// 	}

 			// 		}
				
				// else{
				// 	console.log("B");
				// 	console.log(this.x);
				// 	console.log(this.y);
				// 	console.log("B/");
				// 	this.cxspeed();
				// 	while(this.x+this.nsize<=p5j.width/11*6&this.x-this.nsize>=p5j.width/11*5){
				// 		this.rule1();
				// 	}



		 
          	if((this.x+this.nsize/2>p5j.width/11*5&this.x+this.nsize/2<p5j.width/11*6)|(this.x-this.nsize/2>p5j.width/11*5&this.x-this.nsize/2<p5j.width/11*6)){
          		if(this.y+this.nsize/2>=p5j.height/5*2){ 
     //      				console.log("B");
					// console.log(this.x);
					// console.log(this.y);
					// console.log("B/");
					this.cxspeed();
					while(this.x+this.nsize<p5j.width/11*5&this.x-this.nsize>p5j.width/11*6){
						this.rule1();
					}

          			}
				if(this.y+this.nsize/2<=p5j.height/5*2&this.y+this.nsize/2>=p5j.height/5*2-3){ 

					
					this.cyspeed();
					while(this.y+this.nsize/2>p5j.width/5*2){
						this.rule1();
					}
				

				
				
					




					
					
					// while(!(this.y+this.nsize<p5j.height/5*2)){
     //          			this.rule1();}
					
              			
              			
              		}

			}
          
          // if((this.x>p5j.width/11*5&this.x<p5j.width/11*5+this.k&this.y>p5j.height/5*2&this.y<p5j.height|(this.x>p5j.width/11*6-this.k&this.x<p5j.width/11*6&this.y>p5j.height/5*2&this.y<p5j.height))&(this.x>p5j.width/11*5&this.x<p5j.width/11*5+this.k&this.y>p5j.height/5*2&this.y<p5j.height/5*2+5))
          //   { this.cyspeed();
             
          //   while(!((this.x>p5j.width/11*5&this.x<p5j.width/11*5+this.k&this.y>p5j.height/5*2&this.y<p5j.height|(this.x>p5j.width/11*6-this.k&this.x<p5j.width/11*6&this.y>p5j.height/5*2&this.y<p5j.height))&(this.x>p5j.width/11*5&this.x<p5j.width/11*5+this.k&this.y>p5j.height/5*2&this.y<p5j.height/5*2+5))){
          //     this.rule1();}
          //     }

          // if(this.x>p5j.width/11*5&this.x<p5j.width/11*5+this.k&this.y>p5j.height/5*2&this.y<p5j.height|(this.x>p5j.width/11*6-this.k&this.x<p5j.width/11*6&this.y>p5j.height/5*2&this.y<p5j.height)){
          //   this.cxspeed();
          //   rectcolor=p5j.color(150,p5j.random(200)+50,p5j.random(200)+50);
          //   // rectcolora=p5j.color(100);
          //   // this.rectcolor=p5j.color(150,p5j.random(200)+50,p5j.random(200)+50);
          //   while(!(this.x>p5j.width/11*5&this.x<p5j.width/11*5+this.k&this.y>p5j.height/5*2&this.y<p5j.height|(this.x>p5j.width/11*6-this.k&this.x<p5j.width/11*6&this.y>p5j.height/5*2&this.y<p5j.height))){
          //     this.rule1();
              
          //   }           
          // }

          // if(this.x>p5j.width/11*5&this.x<p5j.width/11*5+k&this.y>p5j.height/5*2&this.y<p5j.height/5*2+k){
          //   this.cyspeed();
          //   // this.rectcolor=p5j.color(150,200,200);
          //   // rectcolora=p5j.color(150,150,150,50);
          //   while(!(this.x>p5j.width/11*5&this.x<p5j.width/11*5+k&this.y>p5j.height/5*2&this.y<p5j.height/5*2+k)){
          //     this.rule1();
          //   }

           
          // }

        }


        this.cxspeed=function(){
          this.xspeed*=-1;
          rectcolor=p5j.color(p5j.random(255),p5j.random(255),p5j.random(255),20);
        }
        this.cyspeed=function(){
          this.yspeed*=-1;
          rectcolor=p5j.color(50,p5j.random(200)+50,50,20);
        }


        this.ruleShow=function() {    
          p5j.fill(255);   
          p5j.circle(this.x,this.y,this.nsize);
  }  

        this.update=function(){
          this.rule1();
         this.rule2();
          
          this.rule3();
          this.ruleShow();
          // console.log(this.b1);
        }}
   
      
    
    // setup
    p5j.setup = function(){
      p5j.createCanvas(200,200); // 加入3d
      arrmovers[0]=new mover(5,5,2,3);
      
     
      
    }
    // update
    p5j.draw = function(){
    let a=p5j.map(arrmovers[0].x,0,200,150,250);
      p5j.background(150,100,a,30);
      p5j.fill(rectcolor);
       p5j.rect(p5j.width/11*5,p5j.height/5*2,p5j.width/11,p5j.height);
//       arrmovers[0].ruleShow();
// arrmovers[0].rule1();
// arrmovers[0].rule2();
 arrmovers[0].update();

      

      
      
    }
  }

  var a = new p5(hw1, 'sketch0');
  var b = new p5(hw2, 'sketch1');
  var c = new p5(hw2, 'sketch2');

  

}