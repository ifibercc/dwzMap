var options = {
    id: 'allmap',
    initLng: 117.278097,
    initLat: 39.077101,
    initZoom: 11
};
var myMap = new dwzMap(options);

// myMap.redrawMark({lng:117.278097, lat:39.077101}, null, null, myClick, myDrag);


// function myDrag(e) {
//     $('#longitude').val(e.point.lng);
//     $('#latitude').val(e.point.lat);
// };

function myClick(e) {
    console.log(e);
};

var json_data = [[117.278097,39.077101],[117.288097,39.087101]];
//myMap.redrawMarkSet(json_data, null, null, myClick);
// $.get('test/pointSet.json', function(data){
//     myMap.redrawMarkSet(data, null, null, myDrag);
// });
// 
// 
myMap.openDrawManager(overlaycomplete)
var overlays = [];
function overlaycomplete(e){
    overlays.push(e.overlay);
    console.info(overlays);
    console.info(e);
};