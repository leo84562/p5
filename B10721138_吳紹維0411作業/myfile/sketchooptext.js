var capture,w,h;
var resol;

var arrcells = [];
var myFont;
// 設定文字 須進入 xampp 執行
function preload() {
  myFont = loadFont('./myfile/assets/Inconsolata.otf'); // 位置以 index 所在為準
}
// 使用OOP定義
// 不需要建構式 把它當成
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
    this.deep = -800; // 可改變深度
    // 顯示內容 根據屬性重寫 重複執行
    this.display=function(type){ 
        // 取得顏色
        this.r = capture.pixels[this.pixelsid];
        this.g = capture.pixels[this.pixelsid+1];
        this.b = capture.pixels[this.pixelsid+2];
        this.a = capture.pixels[this.pixelsid+3];
        this.brightness = (this.r*2+this.b+this.g*3)/6; // 每次更新快速用RGB算亮度
        //繪圖與位移
        push();
            rectMode(CENTER);
            noStroke();
            fill(this.r,this.g,this.b,this.a);// 一般顏色
            translate(this.x-width/2,this.y-height/2,map(this.brightness,0,255,0,this.deep)); //WEBGL設定以畫面為中心(0,0,0)
            if (type==="text"){
                let v = map(this.brightness,0,255,97,122); // 依 brightness 取得 97-122 值 轉換為 小寫英文文字
                textFont(myFont);
                textSize(36);
                text(String.fromCharCode(v),0,0);//在原點放置文字
            }else{
                rect(-1*this.size/2,-1*this.size/2,this.size,this.size);
            }
        pop();
    }
}
function setup() {
  createCanvas(400,600,WEBGL); // 加入3d
  capture = createCapture(VIDEO); // 開啟webcam抓取每瞬時imamge
  capture.hide(); // 需要將預設的攝影機關閉
  resol = 10;
  //console.log(capture.width,capture.height);
}

function draw() {
  //console.log(capture.width,capture.height);
  background(255);
  // webcam 的長寬是會變動的 因此需在 draw 裡面找瞬時的長寬比
  w = capture.width;
  h = capture.height;
  capture.loadPixels();
  // 若 arrcell 的數量 不同於image與resol比例 
  // 重新根據 image與resol 比例 建構物件
  if (arrcells.length !== (w/resol*h/resol)){
    arrcells = [];
    // 建構
    for(var x=0;x<w;x+=resol){
      for(var y=0;y<h;y+=resol){
        // 總量為 RGBA 因此陣列為全長*4 
        pixelindex = (y*w+x)*4; // 特定點為 >> 寬度*第幾行(row)+在第幾列(col)上
        arrcells.push(new cell(x,y,capture, pixelindex));
      }
    }
    console.log(arrcells.length);
  }
  // 若已建構好將所有cell更新即可
  for(var i=0;i<arrcells.length;i+=1){
    arrcells[i].display("text");
  }
  

}

