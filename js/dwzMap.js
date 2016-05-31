var dwzMap = function (options) {
    var me = this;
    options = $.extend({
        id: null,
        width: null,
        height: 450,
        initLng: null,
        initLat: null,
        initZoom: 15
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

    // init bmap
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
// define a new center point and zoom a value
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

// zoom map to a value ranged 1 - 19
dwzMap.prototype.setZoom = function(zoom) {
    var me = this;
    me.currentMap.setZoom(zoom);
};

// draw a marker
dwzMap.prototype.redrawMark = function(point, clear, tip, _click, _dragend) {
    var me = this;
    if (clear !== false) {
        me.currentMap.clearOverlays();
    }
    var marker = new BMap.Marker(point);
    me.currentMap.addOverlay(marker);
    marker.setTop(true);
    marker.enableDragging();
    if (_click) {
        marker.addEventListener('click', function () {
            alert(1);
        });
    }
    if (_dragend) {
        marker.addEventListener('dragend', _dragend);
    }
    return marker;
};

// show marker's tip which need a diy module
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

// draw dozens of markers
dwzMap.prototype.redrawMarkSet = function(pointSet, clear, tip, _click) {
    var me = this;
    if (clear !== false) {
        me.currentMap.clearOverlays();
    }
    var i;
    for(i = 0;i < pointSet.length;i++) {
        me.redrawMark(pointSet[i], false, null, null, _click);
    }
};


dwzMap.prototype.constructor = dwzMap;
