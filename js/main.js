
$(document).ready(function(){


var allData = [];


// Variable for the visualization instance
var stationMap;
var geoJsonData;


// Start application by loading the data
loadData();


function loadData() {

  // Hubway XML station feed
  var url = 'https://www.thehubway.com/data/stations/bikeStations.xml';

  // TO-DO: LOAD DATA
  var yql = 'http://query.yahooapis.com/v1/public/yql?q='
      + encodeURIComponent('SELECT * FROM xml WHERE url="' + url + '"')
      + '&format=json&callback=?';
// Send an asynchronous HTTP request with jQuery
  $.getJSON(yql, function(jsonData){
    console.log(jsonData);

    // extract station data array
    allData = jsonData.query.results.stations.station;

    // convert numeric strings
    allData.forEach(function(d) {
      d.id = +d.id;
      d.lat = +d.lat;
      d.long = +d.long;
      d.nbBikes = +d.nbBikes;
      d.nbEmptyDocks = +d.nbEmptyDocks;
    });

    console.log(allData);

    // output number of stations
    $("#station-count").text(allData.length);

    $.getJSON("data/MBTA-Lines.json", function(data) {
      geoJsonData = data;
      console.log(geoJsonData);

      createVis();

    });

  });
}


function createVis() {

  // TO-DO: INSTANTIATE VISUALIZATION

  stationMap = new StationMap("station-map", allData, [ 42.360082, -71.058880], geoJsonData);

  console.log(stationMap);
}



});
