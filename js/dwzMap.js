// create a map module
var dwzMap = function (options) {
    var me = this;
    options = {
        id: options.id || 'allmap',
        initLng: options.initLng || null,
        initLat: options.initLat || null,
        initZoom: options.initZoom || 15
    };

    me.options = options;
    me.el = window.document.getElementById(options.id);

    if (!options.id) {
        console.warn("The map id not set!!");
        return;
    }
    if ((!options.initLng || !options.initLat) && !options.initCityName) {
        console.warn("The initialization of map not set!!");
        return;
    }
    if (!BMap) {
        console.warn("Baidu Map initialization may be has failed!!");
        return;
    }
    // init bmap
    var map = new BMap.Map(me.el);
    me.currentZoom = me.options.initZoom;
    map.enableScrollWheelZoom(true);
    me.currentMap = map;
    if (options.initLng && options.initLat) {
        me.centerAndZoom(new BMap.Point(
            me.options.initLng,
            me.options.initLat
        ), me.options.initZoom);
    }
    $('.BMap_cpyCtrl').remove();
};

// define a new center point and zoom a value
dwzMap.prototype.centerAndZoom = function(point, zoom) {
    var me = this;
    var setPoint = null,
        szoom = zoom || me.currentZoom;
    if (point instanceof BMap.Point) {
        setPoint = point;
    } else if (point[0] && point[1]) {
        setPoint = new BMap.Point(point[0], point[1]);
    }
    me.currentMap.centerAndZoom(setPoint, szoom);
    me.currentMap.panTo(point);
    me.currentCenterPoint = setPoint;
    me.currentZoom = szoom;
    return setPoint;
};

// zoom map to a value ranged 1 - 19
dwzMap.prototype.setZoom = function(zoom) {
    var me = this;
    me.currentMap.setZoom(zoom);
    return true;
};

// draw a marker
dwzMap.prototype.redrawMark = function(point, options) {
    var me = this;
    options.clear !== false && me.currentMap.clearOverlays();
    var bPoint = new BMap.Point(point[0], point[1]);
    var marker;
    if (options.icon) {
        var bIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300,157));
        marker = new BMap.Marker(bPoint, {icon: bIcon});
    } else {
        marker = new BMap.Marker(bPoint);
    }
    me.currentMap.addOverlay(marker);
    marker.setTop(true);
    if (options._click) {
        marker.addEventListener('click', options._click);
    }
    if (options._dragend) {
        marker.enableDragging();
        marker.addEventListener('dragend', options._dragend);
    }
    return marker;
};

// show marker's tip which need a diy module
dwzMap.prototype.showMarkerTip = function(marker, point) {
    // todo
    var me = this;
    if (!marker) {
        marker = new BMap.Marker(point);
    }
    if (me.options.markRender) {
        var infow = new BMap.InfoWindow(me.options.markRender(point));
        marker.openInfoWindow(infow);
    }
};

// draw dozens of markers
dwzMap.prototype.redrawMarkSet = function(pointSet, clear, tip, _click) {
    var me = this;
    if (clear !== false) {
        me.currentMap.clearOverlays();
    }
    var i;
    for(i = 0;i < pointSet.length;i++) {
        me.redrawMark(pointSet[i], false, null, _click);
    }
};

// open point line face edit
dwzMap.prototype.openDrawManager = function(_overlaycomplete, circleStyle, polylineStyle, polygonStyle, rectangleStyle) {
    var me = this;

    var defaultStyle = {
        strokeColor:"red",    //边线颜色
        fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果
        strokeWeight: 3,       //边线的宽度，以像素为单位
        strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1
        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1
        strokeStyle: 'solid' //边线的样式，solid或dashed
    }
    //实例化鼠标绘制工具
    var drawingManager = new BMapLib.DrawingManager(me.currentMap, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
        },
        circleOptions: circleStyle || defaultStyle, //圆的样式
        polylineOptions: polylineStyle || defaultStyle, //线的样式
        polygonOptions: polygonStyle || defaultStyle, //多边形的样式
        rectangleOptions: rectangleStyle || defaultStyle //矩形的样式
    });
     //添加鼠标绘制工具监听事件，用于获取绘制结果
    drawingManager.addEventListener('overlaycomplete', _overlaycomplete);
};

dwzMap.prototype.appendOverlays = function (data, type, options) {
    var me = this;
    if (!data) {
        console.warn('覆盖物的data未设定！！');
        return;
    }
    if (!type) {
        console.warn('覆盖物的类型未指定');
        return;
    }
    switch (type) {
        case 'marker': 
            if (typeof data[0] === 'number') {
                me.redrawMark(data, options);
            } else {
                me.redrawMarkSet(data, options);
            }
        break;
        case 'polyline': break;
        case 'polygon': break;
        default: return;
    }
};
dwzMap.prototype.constructor = dwzMap;
