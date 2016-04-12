
// Defining an icon class with general options
var LeafIcon = L.Icon.extend({
	options: {
		shadowUrl: 'img/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [0, -28]
	}
});
var redMarker = new LeafIcon({ iconUrl: 'img/marker-red.png' });
var yellowMarker = new LeafIcon({ iconUrl: 'img/marker-yellow.png' });
var blueMarker = new LeafIcon({ iconUrl: 'img/marker-blue.png' });

var map;

/*
 *  StationMap - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 *  @param _data            -- Array with all stations of the bike-sharing network
 */

StationMap = function(_parentElement, _data, _mapPosition, _JsonData) {

	this.parentElement = _parentElement;
	this.data = _data;
	this.mapCenter = _mapPosition;
	this.geoJson = _JsonData;

	this.initVis();
}


/*
 *  Initialize station map
 */

StationMap.prototype.initVis = function() {
	var vis = this;

	map = L.map("station-map").setView([42.360082, -71.058880], 13);

	L.Icon.Default.imagePath = "img";


	L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
	}).addTo(map);


	L.geoJson(this.geoJson, {
		style: styleMBTALine,
		weight: 5,
		fillOpacity: 0.7
	}).addTo(map);

	vis.wrangleData();
}


/*
 *  Data wrangling
 */
StationMap.prototype.wrangleData = function() {
	var vis = this;

	// Currently no data wrangling/filtering needed
	// vis.displayData = vis.data;

	// Update the visualization
	vis.updateVis();

}


/*
 *  The drawing function
 */

StationMap.prototype.updateVis = function() {

	var vis = this;

	// Add empty layer groups for the markers / map objects
	hubwayStations = L.layerGroup().addTo(map);

	vis.data.forEach(function(d) {

		var popupContent = "<strong>" + d.name + "</strong><br/>";
		popupContent += "Bikes: " + d.nbBikes + "<br/>";
		popupContent += "Docks: " + d.nbEmptyDocks;

		if ((d.nbBikes == 0) || (d.nbEmptyDocks == 0))
			var marker = L.marker([d.lat, d.long], { icon: redMarker }).bindPopup(popupContent);
		else var marker = L.marker([d.lat, d.long], { icon: blueMarker }).bindPopup(popupContent);

		hubwayStations.addLayer(marker);	// add to layer group
	});

}




function styleMBTALine(feature) {

	var line = feature.properties.LINE;
	return { color: line };

}