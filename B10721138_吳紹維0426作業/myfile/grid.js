window.onload = function(){



var mapSketch = function(p5j){
    p5j.bikejson; // 修改匯入資料名

    p5j.loaded = 0; // 確認是否有讀取檔案
    p5j.control;
    //p5j.boundLU, p5j.boundRD; // 西北 東南 經緯度
    p5j.arr = [];
    

    p5j.basic=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }); // 將openstreetmap資料下載到 畫面中




    p5j.q15= new L.LayerGroup();
    p5j.q20= new L.LayerGroup();
    p5j.q20UP= new L.LayerGroup();
    

    p5j.q15.open = false;
    p5j.q20.open = false;
    p5j.q20UP.open = false;

    p5j.overlaying = {
        "剩餘<15": p5j.q15,
        "剩餘<20": p5j.q20,
        "剩餘>20": p5j.q20UP
    };

    // p5j.map = L.map('map').setView([24.147495,120.675914], 12); // 台北 經緯度 比例
    p5j.map = L.map('map',{
        layers: [p5j.basic],
        renderer : p5j.graphic
        }).setView([24.147495,120.675914], 15);

    p5j.control=L.control.layers(p5j.baseLayer, p5j.overlaying).addTo(p5j.map); // 添加層

    p5j.map.on('zoomend', function(e) {
        p5j.clear();
        console.log('zoomend');
    });
    p5j.map.on('moveend', function(e) {
        p5j.clear();
        console.log('moveend');
    });


    p5j.control.getContainer().onclick = function(e){//有click行為發生就會執行
        //console.log(e.target.parentElement.textContent); // 找到文字
        //console.log(e.target.checked); // 確認是否打開
          console.log('a');
        if (e.target.parentElement.textContent.replace(/ /g,"") === "剩餘<15"){ // 去除空白字串
            if (e.target.checked){                
                p5j.q15.open = true;
            }else{
                p5j.q15.open = false;
            }
        }else if (e.target.parentElement.textContent.replace(/ /g,"") === "剩餘<20"){ // 去除空白字串
            if (e.target.checked){
                p5j.q20.open = true;
            }else{
                p5j.q20.open = false;
            }
        }else if (e.target.parentElement.textContent.replace(/ /g,"") === "剩餘>20"){ // 去除空白字串
            if (e.target.checked){
                p5j.q20UP.open = true;
            }else{
                p5j.q20UP.open = false;
            }
        }
    }


    // oop
    var quake = function (c1,c0,q){
      // 初始化
      this.totalFrame = 10;
      this.currentFrame = 1;
      this.id=0;
      this.q = q;
      this.c1 = c1;
      this.c0 = c0;

      

     
      this.c= '#f20'
      this.ani=p5j.random(0,10);
      this.inverse=true;

      if (this.q>=0&&this.q<15){
        this.color = '#f00';
        this.layerGroup = p5j.q15;
      }else if (this.q>=15&&this.q<20){
        this.color = '#0f0';
        this.layerGroup = p5j.q20;
      }else {
        this.color = '#00f';
        this.layerGroup = p5j.q20UP;
      }
      // 定義 marker 物件
      this.marker = L.circle([this.c1, this.c0], { // 緯度在前面
                
                color: this.color,
                fillOpacity: 0.3,
                stroke: false, // 取消邊線
                radius: this.q*10 // 強度 乘上大小單位為公尺
              });
      this.marker.addTo(this.layerGroup).bindPopup('Here is '+this.c1+','+this.c0);


 
    //  var popup = L.popup();

    // function onMapClick(e) {
    //   let ll = e.latlng;
    //   popup
    //     .setLatLng(ll)
    //     .setContent("經緯度座標："  )
    //     .openOn(p5j.map);
    // }






      // 更新動畫



      this.update =function(){

        // p5j.map.on('click', onMapClick);
        let ll = this.marker.getLatLng();//marker是圈圈物件
        
        // 若不在範圍內
        if (p5j.map.getBounds().contains(ll)){
            let pix = p5j.map.latLngToLayerPoint(ll); // 轉換經緯度到畫面位置



            if (this.layerGroup.open){ // 若本layerGroup 打開

                  // p5j.textAlign(p5j.CENTER);
                  // // p5j.fill(0);
                  // p5j.textSize(7); 
                  // p5j.text(this.q, this.c1, this.c0);
                  


                if(p5j.dist(pix.x,pix.y,p5j.mouseX,p5j.mouseY)<=200){
                  p5j.noFill();
                  // if(p5j.dist(pix.x,pix.y,p5j.mouseX,p5j.mouseY)<=this.close){
                  //     var popup = L.popup()
                  //     .setLatLng(this.marker.getLatLng())
                  //     .setContent("經緯度座標：" )
                  //     .openOn(p5j.map);
                  // } 
                    
                }
                else{
                  p5j.fill(255);
                }




                // p5j.fill(this.color);
                if(this.q<15){
					p5j.ellipse(pix.x,pix.y,this.ani,this.ani);
					p5j.ellipse(pix.x,pix.y,this.q*5-this.ani,this.q*5-this.ani);
                }
                else if(this.q<20){
                	p5j.ellipse(pix.x,pix.y,this.q*5-this.ani,(this.q*5-this.ani)/2);
                p5j.ellipse(pix.x,pix.y,(this.q*5-this.ani)/2,this.q*5-this.ani);

                }
                else{
					p5j.triangle(pix.x,pix.y-this.ani/3,pix.x-this.ani/3,pix.y+this.ani/3, pix.x+this.ani/3,pix.y+this.ani/3);
                }
              
                
                // 到範圍畫 反向
                if (this.inverse){
                    this.ani-=1;
                }else{
                    this.ani+=1;
                }

                if (this.ani<0){
                    this.inverse = false;
                }else if(this.ani> this.q*5){
                    this.inverse = true;
                }
                


                p5j.stroke(0);
                let distance=p5j.dist(pix.x,pix.y,p5j.mouseX,p5j.mouseY);
                if(distance<200){
                p5j.line(pix.x,pix.y,p5j.mouseX,p5j.mouseY);}

            //     p5j.arr.forEach((q)=>{
            //         let d=p5j.dist(this.c1,this.c0,q.c1,q.c0);
            //         if((d<10)&&(q!=this)&&q.layerGroup.open){
            //            p5j.stroke(0);
            //           let qxy=p5j.map.latLngToLayerPoint(q.maker.getLatLng());
            //           p5j.line(pix.x,pix.y,qxy.x,qxy.y);
            // }
            //   });
            

            }
        }
      }
    }









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

    p5j.setup = function(){
    p5j.createCanvas(1200,600).style('z-index:800');
     var polygon = L.polygon([
    [24.439920, 120.622766],
    [24.288695, 120.840409],
    [24.301898, 120.922246],
    [24.338140, 120.925775],
    [24.295269, 121.043287],
    [24.436428, 121.317511],
    [24.366577, 121.420102],
    [24.228455, 121.339711],
    [24.245235, 121.256621],
    [24.110786, 120.885081],
    [24.124981, 120.842560],
    [24.001743, 120.746750],
    [24.033096, 120.629981],
    [24.105348, 120.614025],
    [24.128787, 120.534064],
    [24.204545, 120.489546],
    [24.215914, 120.460796],
    [24.311477, 120.527923]], {
    color: 'blue',
    fillColor: '#00f',
    fillOpacity: 0,
    stroke: true,
    radius: 500
    }).addTo(p5j.map).bindPopup('點擊紅色圓圈可觀看溫度與風速，粉色圓圈代表可租用數量<20，綠色反之，可租用數量越多圓圈越大，點擊可看詳細資料');
    
     
    }
    p5j.draw = function(){

      p5j.clear();

      if (!p5j.weather) {
        // Wait until the earthquake data has loaded before drawing.
        return;
      }else {
        if (p5j.loaded===1){ // 只執行一次
          console.log(p5j.weather.cwbopendata.location);
          console.log(p5j.ibike);

           // var popupa= L.popup()
            // .setLatLng([24.257753,120.515211])
            // .setContent('梧棲觀測站')
            // .openOn(p5j.map);

            var ku,kg;            
          p5j.weather.cwbopendata.location.forEach((val)=>{
            var k=0;            
            var popupb= L.popup()
            .setLatLng([24.147495,120.675914])
            .setContent('臺中觀測站')
            .openOn(p5j.map);

            val.weatherElement.forEach((val2)=>{	
            	if(k==3)
            		{ku=JSON.stringify(val2.elementValue.value);
                  console.log(JSON.parse(ku,function(key,value){return value;}));
            }
            if(k==2)
                {kg=val2.elementValue;
                  console.log(kg.value);
            }
            k++;        
          });
            L.circle([val.lat, val.lon], { // 緯度在前面
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.0,
                stroke: true, // 取消邊線
                radius: 5000 // 強度 乘上大小單位為公尺
            }).addTo(p5j.map).bindPopup(val.locationName+'當前溫度'+ku+'\n'+'  當前風速:'+ JSON.stringify(kg.value)+'公尺/秒');          
          });

          p5j.ibike.forEach((val)=>{
            	
          	 
            p5j.arr.push(new quake(val.Y,val.X,val.AvailableCNT));
            
            // L.circle([val.Y, val.X], { // 緯度在前面
            //     color: 'red',
            //     fillColor:  (val.AvailableCNT<20) ? ('#f0f') : ('#0f0'),
            //     fillOpacity: 0.2,
            //     stroke: false, // 取消邊線
            //     radius: 10*val.AvailableCNT // 強度 乘上大小單位為公尺
            // }

            // ).addTo(p5j.map).bindPopup('可租用數量:'+val.AvailableCNT +'輛'+
            // '  位置:'+val.CAddress);
        //'lat:'+val.X+'  lon:'+val.Y
          });
          console.log(p5j.q20.getLayers());
        }else{
          p5j.noFill();
            p5j.stroke(180,0,0);

          p5j.arr.forEach((q)=>{
            //      q.curentFrame = (p5j.loaded+q.currentFrame);
                  q.update();
              });
        }
        p5j.loaded +=1;
        
      }
    }
}
  
new p5(mapSketch, 'map');
}