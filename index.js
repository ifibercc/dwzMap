var options = {
    id: 'allmap',
    width: 1000,
    height: 700,
    initLng: 117.278097,
    initLat: 39.077101,
    initZoom: 11
};
var myMap = new dwzMap(options);

myMap.redrawMark({lng:117.278097, lat:39.077101}, null, null, myClick, myDrag);

function myDrag(e) {
    $('#longitude').val(e.point.lng);
    $('#latitude').val(e.point.lat);
};

function myClick(e) {
    console.log(e);
};
// $.get('test/pointSet.json', function(data){
//     myMap.redrawMarkSet(data, null, null, myDrag);
// });