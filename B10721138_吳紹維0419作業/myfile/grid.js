window.onload = function(){



var mapSketch = function(p5j){
    p5j.bikejson; // 修改匯入資料名

    p5j.loaded = 0; // 確認是否有讀取檔案
    p5j.map = L.map('map').setView([24.147495,120.675914], 12); // 台北 經緯度 比例

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(p5j.map); // 將openstreetmap資料下載到 畫面中



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

    p5j.setup = function(){ var polygon = L.polygon([
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
            		{ku=val2.elementValue;
                  console.log(ku.value);
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
            }).addTo(p5j.map).bindPopup(val.locationName+'溫度'+ JSON.stringify(ku.value)+'\n'+'   風速:'+ JSON.stringify(kg.value)+'公尺/秒');          
          });

          p5j.ibike.forEach((val)=>{
            	
          	 

            L.circle([val.Y, val.X], { // 緯度在前面
                color: 'red',
                fillColor:  (val.AvailableCNT<20) ? ('#f0f') : ('#0f0'),
                fillOpacity: 0.2,
                stroke: false, // 取消邊線
                radius: 10*val.AvailableCNT // 強度 乘上大小單位為公尺
            }

            ).addTo(p5j.map).bindPopup('可租用數量:'+val.AvailableCNT +'輛'+
            '  位置:'+val.CAddress);
        //'lat:'+val.X+'  lon:'+val.Y
          });

        }
        p5j.loaded +=1;
        
      }
    }
}
  
new p5(mapSketch, 'map');
}
