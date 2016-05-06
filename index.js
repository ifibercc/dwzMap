var options = {
    id: 'allmap',
    width: 1000,
    height: 700,
    initCityName: '北京',
    initLng: 116.404,
    initLat: 39.915,
    initZoom: 11
};

var myMap = new dwzMap(options);
$.get('test/test.json');