var capture,w,h;

var video, resol;
function setup() {
  createCanvas(400,600);
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
  image(capture, 0, 0, map(w,0,w,0,width), map(h,0,w,0,width)); //保留 寬方向比例 變形

}
