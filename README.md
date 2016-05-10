# dwzMap
封装百度地图，适应dwz的项目
## 一、创建一个普通地图
1. 引入文件，需填写自己的ak  
```
    <script src="http://api.map.baidu.com/api?v=2.0&ak=OpVm9UjnXj1ACmgEQLH7QSFh"></script>
    <script src="js/jquery-2.1.4.min.js"></script>
    <script src="js/dwzMap.js"></script>
    <script src="index.js"></script>
```
2. HTML创建一个容器，需要制定id  
`<div id="mapId"></div>`
3. 实例化一个map对象  
`var myMap = new dwzMap(options);`
4. options含义及其默认值  
    + `id`: String，必填，为承载map的容器id
    + `width`: Number，可选，默认值700px，为地图的宽度
    + `height`: Number，可选，默认值450px，为地图的高度
    + `initCityName`: String，
    + `initLng`: Number，
    + `initLat`: Number，
    + `initZoom`: Number，
    + `citys`: String，
## 二、相关方法
- **mapObject**.redrawMark(point, clear, tip)  
    在map上显示一个marker
    - `point`: Object，必填，要显示的坐标
    - `clear`: Boolean，可选，是否清除其他marker，默认true
    - `tip`: Boolean，可选，是否显示markerTip，默认false
