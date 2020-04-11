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
  //sketch
  var videopixels = function(p5j){
    // 屬性資料
    var capture,w,h;    
    var arrcells = [];
    // !!!!!若需要 canvas 可由外部變動屬性!!!!
    p5j.resol = 10;
    // OOP
    var cell = function(_x,_y, _capture, _pixelsid){
    // cell屬性設定 只執行一次
    // 位置
    this.x=_x;
    this.y=_y;
    this.pixelsid = _pixelsid; // 索引像素
    this.capture = _capture;
    // 大小
    this.size=9;
    // 預設 rgba
    this.r = 50;
    this.g = 50;
    this.b = 50;
    this.a = 150;
    this.brightness = 150; // 亮度
    this.deep = -500; // 可改變深度
    // 顯示內容 根據屬性重寫 重複執行
    this.display=function(){ 
        // 取得顏色
        this.r = capture.pixels[this.pixelsid];
        this.g = capture.pixels[this.pixelsid+1];
        this.b = capture.pixels[this.pixelsid+2];
        this.a = capture.pixels[this.pixelsid+3];
        this.brightness = (this.r*2+this.b+this.g*3)/6; // 每次更新快速用RGB算亮度
        //繪圖與位移
        p5j.push();
            p5j.rectMode(p5j.CENTER);
            p5j.noStroke();
            p5j.fill(this.r,this.g,this.b,this.a);// 一般顏色
            p5j.translate(this.x,this.y,p5j.map(this.brightness,0,255,0,this.deep)); //WEBGL設定以畫面為中心(0,0,0)
            p5j.rect(-1*this.size/2,-1*this.size/2,this.size,this.size);
        p5j.pop();
      }
    }
    // setup
    p5j.setup = function(){
      p5j.createCanvas(250,250,p5j.WEBGL); // 加入3d
      capture = p5j.createCapture(p5j.VIDEO); // 開啟webcam抓取每瞬時imamge
      capture.hide(); // 需要將預設的攝影機關閉
    }
    // update
    p5j.draw = function(){
      p5j.background(50);
      w = capture.width;
      h = capture.height;
      p5j.camera(w/2,h/2, 300, 
               w/2,h/2, -300, 
                0, 1, 0);
      // webcam 的長寬是會變動的 因此需在 draw 裡面找瞬時的長寬比
      capture.loadPixels();
      // 若 arrcell 的數量 不同於image與resol比例 
      // 重新根據 image與resol 比例 建構物件
      if (arrcells.length !== (w/p5j.resol*h/p5j.resol)){
        arrcells = [];
        // 建構
        for(var x=0;x<w;x+=p5j.resol){
          for(var y=0;y<h;y+=p5j.resol){
            // 總量為 RGBA 因此陣列為全長*4 
            var pixelindex = (y*w+x)*4; // 特定點為 >> 寬度*第幾行(row)+在第幾列(col)上
            arrcells.push(new cell(x,y,capture, pixelindex));
          }
        }
      }
      // 若已建構好將所有cell更新即可
      for(var i=0;i<arrcells.length;i+=1){
        arrcells[i].display();
      }
    }
  }

  var a = new p5(videopixels, 'sketch0');
  var b = new p5(videopixels, 'sketch1');
  var c = new p5(videopixels, 'sketch2');

  a.resol = 40;
  b.resol = 20;
  c.resol = 10;

}