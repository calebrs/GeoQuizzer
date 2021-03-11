const Http = new XMLHttpRequest();
const url = `http://localhost:3000/GeoQuizzer/`;

let worldMap = L.map('worldmap').setView([20, 0], 3);

let countryPoints = { "type": "FeatureCollection","features":[
  {"type": "Feature",
  "properties": {
      "name": "Canada",
  },
  "geometry": {
      "type": "Point",
      "coordinates": [-98.307, 61.362]
  }},
  {"type": "Feature",
  "properties": {
      "name": "South Africa",
  },
  "geometry": {
      "type": "Point",
      "coordinates": [25.083, -29]
  }},
  {"type": "Feature",
  "properties": {
      "name": "Mongolia",
  },
  "geometry": {
      "type": "Point",
      "coordinates": [103.052, 46.826]
  }}]
};

// let CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
// 	subdomains: 'abcd',
// 	maxZoom: 19
// });

let CartoDB_VoyagerNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

// let mapBoxBaseMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FsZWJycyIsImEiOiJja20zdmRvZjQwNm5tMnVueHhuaDIzdGllIn0._Myr90ISv0S773_l5GD2dQ', {
//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   maxZoom: 18,
//   id: 'mapbox/streets-v11',
//   tileSize: 512,
//   zoomOffset: -1,
//   accessToken: 'pk.eyJ1IjoiY2FsZWJycyIsImEiOiJja20zdmRvZjQwNm5tMnVueHhuaDIzdGllIn0._Myr90ISv0S773_l5GD2dQ',
// });

CartoDB_VoyagerNoLabels.addTo(worldMap);
L.geoJSON(countryPoints).addTo(worldMap);

function goToQuiz(e) {
  Http.open("GET", url + e.target.feature.properties.name);
  Http.send();
  return Http.responseText;
}

function onEachFeature(feature, layer) {
  layer.on({
    click: goToQuiz,
  });
}

let geojson = L.geoJSON(countryPoints, {
  onEachFeature: onEachFeature,
}).addTo(worldMap);