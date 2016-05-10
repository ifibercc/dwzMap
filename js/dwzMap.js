var dwzMap = function(options) {
    var me = this;
    options = $.extend({
        id: null,
        width: null,
        height: 450,
        initCityName: null,
        initLng: null,
        initLat: null,
        initZoom: 15,
        citys: null
    }, options);

    me.options = options;
    me.el = window.document.getElementById(options.id);
    me.$el = $(me.el);

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


    if (options.width) {
        me.$el.width(options.width);
    }
    if (options.height) {
        me.$el.height(options.height);
    }

    //初始化地图
    var map = new BMap.Map(me.el);
    me.currentZoom = me.options.initZoom;
    map.addControl(new BMap.MapTypeControl());
    map.enableScrollWheelZoom(true);
    me.currentMap = map;
    if (options.initLng && options.initLat) {
        me.centerAndZoom({
            lng: me.options.initLng,
            lat: me.options.initLat
        }, me.options.initZoom);
    } else if (options.initCityName) {
        // me.showAddress(options.initCityName, function (point) {
        //     if (point) {
        //         me.centerAndZoom(point, me.currentZoom);
        //     }
        // });
    }
};
// 重新指定一个中心点并缩放至指定大小
dwzMap.prototype.centerAndZoom = function(point, zoom) {
    var me = this;
    var setPoint = null,
        szoom = zoom || me.currentZoom;
    if (point instanceof BMap.Point) {
        setPoint = point;
    } else if (point.lng && point.lat) {
        setPoint = new BMap.Point(point.lng, point.lat);
    }
    me.currentMap.centerAndZoom(setPoint, szoom);
    me.currentMap.panTo(point);
    me.currentCenterPoint = setPoint;
    me.currentZoom = szoom;
    return setPoint;
};

// 将地图缩放至指定大小 1 - 19
dwzMap.prototype.setZoom = function(zoom) {
    var me = this;
    me.currentMap.setZoom(zoom);
};

// 绘制一个marker
dwzMap.prototype.redrawMark = function(point, clear, tip) {
    var me = this;
    if (clear !== false) {
        me.currentMap.clearOverlays();
    }
    var marker = new BMap.Marker(point);
    me.currentMap.addOverlay(marker);
    marker.setTop(true);
    marker.enableDragging();
    if (tip === true) {
        marker.addEventListener("click", function(e) {
            me.showMarkerTip(marker, e.point);
        });
        marker.addEventListener("dblclick", function(e) {
            me.showMarkerTip(marker, e.point);
            me.currentMap.centerAndZoom(e.point);
        });
    }
    marker.addEventListener("dragend", function (e) {
        // todo:作为参数传递
        $('#longitude').val(e.point.lng);
        $('#latitude').val(e.point.lat);
    });
    return marker;
};

// 显示marker的toolTip todo需要定制模板
dwzMap.prototype.showMarkerTip = function(marker, point) {
    var me = this;
    if (!marker) {
        marker = new BMap.Marker(point);
    }
    if (me.options.markRender) {
        var infow = new BMap.InfoWindow(me.options.markRender(point));
        marker.openInfoWindow(infow);
    }
};
// 绘制一个marker集合
dwzMap.prototype.redrawMarkSet = function(pointSet, clear, tip) {
    var me = this;
    if (clear !== false) {
        me.currentMap.clearOverlays();
    }
    var i;
    for(i = 0;i < pointSet.length;i++) {
        addMarker(pointSet[i]);
    }
    function addMarker(point) {
        var marker = new BMap.Marker(point);
        me.currentMap.addOverlay(marker);
        marker.setTop(true);
    }
};
dwzMap.prototype.constructor = dwzMap;
