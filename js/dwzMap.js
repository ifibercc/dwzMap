var dwzMap = function (options) {
    var me = this;
    options = $.extend({
        id: null,
        width: null,
        height: 450,
        initCityName: null,
        initLng: null,
        initLat: null,
        initZoom: 18,
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

dwzMap.prototype.centerAndZoom = function (point, zoom) {
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