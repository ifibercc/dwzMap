var options = {
    id: 'allmap',
    width: 1000,
    height: 700,
    initCityName: '北京',
    initLng: 117.278097,
    initLat: 39.077101,
    initZoom: 11
};
var myMap = new dwzMap(options);

 // myMap.redrawMark({lng:117.278097, lat:39.077101});
$.get('test/pointSet.json', function(data){
    myMap.redrawMarkSet(data, true);
});