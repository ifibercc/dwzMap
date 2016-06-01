// default options and data
var options = {
    id: 'allmap',
    initLng: 117.278097,
    initLat: 39.077101,
    initZoom: 11
};
var data = [[117.278097,39.077101],[117.288097,39.087101]];
// create a bmap object
var myMap = new dwzMap(options);

myMap.appendOverlays([117.278097,39.077101], 'marker', {icon: true})
