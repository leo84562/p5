window.onload = function(){



var mapSketch = function(p5j){
    p5j.bikejson; // 修改匯入資料名

    p5j.loaded = 0; // 確認是否有讀取檔案
    p5j.map = L.map('map').setView([23.547495,121.075914], 7); // 台北 經緯度 比例


    p5j.canvas;
    p5j.display = true;
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(p5j.map); // 將openstreetmap資料下載到 畫面中

     p5j.arr=[]; // 點雲
    p5j.arrarea=[]; // area

    p5j.download; // data

    p5j.preload = function() { // 需要先讀取 json
      // 若資料不允許即時取用 可先存在本地端
      let url = './myfile/data.json';
      let url2= './myfile/ibike.json';

      p5j.httpGet(url2, 'json', false, function(responsed) {
        p5j.ibike = responsed; // 修改匯入資料名
      });

      p5j.httpGet(url, 'json', false, function(response) {
        p5j.weather = response; // 修改匯入資料名
      });
    }

//oop
    var area = function(arr,popup){ // 輸入一系列area資料
      this.arr = arr;
      this.popup = popup;
      this.polygon = L.polygon(
        this.arr).bindPopup(this.popup).addTo(p5j.map);
      
      // 特殊滑鼠狀況
      this.polygon.on('mouseover',()=>{
        console.log('bb');
        this.polygon.setStyle({color:'yellow'})
      })
      this.polygon.on('mouseout',()=>{
        console.log('ll');
        this.polygon.setStyle({color:'green'})
      })
      // setting hover      
      this.update = function(){////////////////////////////////////////////////////////////////////////////////////////
        
      }
    }

     p5j.setup = function(){
        p5j.canvas = p5j.createCanvas(1200,600);
        p5j.canvas.style('z-index:400');
    //  var polygon = L.polygon([
    // [24.439920, 120.622766],
    // [24.288695, 120.840409],
    // [24.301898, 120.922246],
    // [24.338140, 120.925775],
    // [24.295269, 121.043287],
    // [24.436428, 121.317511],
    // [24.366577, 121.420102],
    // [24.228455, 121.339711],
    // [24.245235, 121.256621],
    // [24.110786, 120.885081],
    // [24.124981, 120.842560],
    // [24.001743, 120.746750],
    // [24.033096, 120.629981],
    // [24.105348, 120.614025],
    // [24.128787, 120.534064],
    // [24.204545, 120.489546],
    // [24.215914, 120.460796],
    // [24.311477, 120.527923]], {
    // color: 'blue',
    // fillColor: '#00f',
    // fillOpacity: 0,
    // stroke: true,
    // radius: 500
    // }).addTo(p5j.map).bindPopup('點擊紅色圓圈可觀看溫度與風速，粉色圓圈代表可租用數量<20，綠色反之，可租用數量越多圓圈越大，點擊可看詳細資料');
    }

    p5j.draw = function(){

      if (!p5j.download) {
        
        return;
      }else {
          if (p5j.loaded === 1){
          	console.log(p5j.download);
            // 每次增加一個polygon
            p5j.download.feed.entry.forEach((v)=>{
              let lat = v.gsx$lat.$t.split(','); // 取得lat資料字串
              let lng = v.gsx$lng.$t.split(','); // 取得lng資料字串
              let val = v.gsx$val.$t; // 取得資料字串
              let arr = [];
              lat.forEach((v,i)=>{
                arr.push(L.latLng(parseFloat(lat[i]),parseFloat(lng[i])));
              });
              p5j.arrarea.push(new area(arr,val))////////////////////////////////////////////////////////////////////////////////////////
            });
            
        }
        
        p5j.loaded +=1;
      }
      $('#content').html('POLYGON<br>目前有 '+p5j.arrarea.length+' 個');

    }


     p5j.mouseReleased = function(e) {
      // 確保在畫面內 點擊
      if (p5j.mouseX>0 && p5j.mouseX<$('#map').width() && p5j.mouseY>0 && p5j.mouseY<$('#map').height() ){ 

        if (p5j.mouseButton === 'left'){
          let pix = [p5j.mouseX,p5j.mouseY];
          let latlng = p5j.map.mouseEventToLatLng(e);

          if (p5j.display){
            this.arr.push(latlng);
            p5j.circle(pix[0],pix[1],5);
          }        
        }else if (p5j.mouseButton === 'center'){
          if (p5j.arr.length < 3){
          }else{
            p5j.arrarea.push(new area(p5j.arr,"val"));/////////////////////////////////////////////////////////////////////////////////////////
            p5j.arr = [];
            p5j.arrarea.forEach((v)=>{
              console.log(v.arr);
            });
            
          }

        }

        
      }
    }


    $('#zbutton').click((e)=>{
      if(e.target.getAttribute('aria-pressed')==='true'){
          p5j.canvas.style('z-index:0');
          p5j.display = false;
      }else{
          p5j.canvas.style('z-index:400');
          p5j.display = true;
      }
    });
    $('#cbutton').click(()=>{
        p5j.arr = [];
        p5j.clear();

    });
    $('#lbutton').click(()=>{
        let url = 'https://spreadsheets.google.com/feeds/list/1vAfJ91LDBRt_C59XzRs5f3tUoRCTQE8FkR6Z9G9BFhc/1/public/values?alt=json';
        p5j.loaded=0;
        //console.log(url);
        p5j.httpGet(url, 'jsonp', false, function(response) {
          p5j.download = response; // 會把所有回呼資料存於 earthquakes
        });

        
    });
    $('#ubutton').click(()=>{
        if(p5j.arrarea.length>0){
          let lattxt='';
          let lngtxt='';
          let valtxt='';
          // 將資料整理到lat 跟 lng中
          p5j.arrarea.forEach((v)=>{
            

            v.arr.forEach((latlng)=>{
              lattxt += latlng.lat.toFixed(3).toString()+',';///////////////////////////////////////
              lngtxt += latlng.lng.toFixed(3).toString()+',';

            });

            lattxt = lattxt.substring(0, lattxt.length - 1);
            lattxt += '|'; // 減去最後一個chr 改為 |

            lngtxt = lngtxt.substring(0, lngtxt.length - 1);
            lngtxt += '|'; 

            valtxt += v.popup+'|';
          });
          lattxt = lattxt.substring(0, lattxt.length - 1);
          lngtxt = lngtxt.substring(0, lngtxt.length - 1);
          valtxt = valtxt.substring(0, valtxt.length - 1);

          let exeurl = 'https://script.google.com/macros/s/AKfycbxqQcHbJCksLN4vDxxR3R0hrm1qQiOrlsZMgUyeeKTZ3em1Lzlx/exec';          
          let editurl = 'https://docs.google.com/spreadsheets/d/1vAfJ91LDBRt_C59XzRs5f3tUoRCTQE8FkR6Z9G9BFhc/edit#gid=0';
          console.log(lattxt);
          
          $.post(exeurl,{
            lat: lattxt,
            lng: lngtxt,
            val: valtxt,
            url: editurl,
            tag: '工作表1'
          },function(e){
            console.log(e);
        });
        

      }
    });

  p5j.keyPressed = function (e){


      console.log(e.key);
      if (e.key==='c'){
      	$('#cbutton').click();
        // $( "p" ).click();
        // 顯示p5j layer
      }if (e.key==='z'){
        $('#zbutton').click();
      }if (e.key==='u'){
        $('#ubutton').click();
    }if (e.key==='l'){
        $('#lbutton').click();
    }  
  }    


}
  
new p5(mapSketch, 'map');
}