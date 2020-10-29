// Creating map project
var myMap = L.map("map", {
   center: [46.9989, -109.0452],
   zoom: 5
});


// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


//  link for All earthquake date for the past day
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// // Initialize & Create Two Separate LayerGroups: earthquakes & tectonicPlates
// var earthquakes = new L.LayerGroup();

// // Create Overlay Object to Hold Overlay Layers
// var overlayMaps = {
//   "Earthquakes": earthquakes
// };

// // Load in geojson data
// var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";
// var geojson;


// // Grab data with d3
d3.json(url, function(data) {
  // var earthquake = L.geoJSON(geoData, {
    // pointToLayer: function(geoData, latlng) {
    //   return L.circle(geoData.geometry[1], {
    //     radius: radiusSize(geoData.properties.felt),
    //     color: circleColor(geoData.properties.mag),
    //     fillOpacity: 1
    //   });
    // }).addTo(myMap);
    var quakes = (data.features);

    //create for loops
    for (var i=0; i<quakes.length; i++) {

      var color = " ";
      if (quakes[i].properties.mag <= 1) {
        color="yellow";
      }
      else if (quakes[i].properties.mag <= 2) {
        color = "greenyellow";
      }
      else if (quakes[i].properties.mag <= 3) {
          color = "yellowgreen";
        }
      else if (quakes[i].properties.mag <= 4) {
        color = "orange";
      }
      else if (quakes[i].properties.mag <= 5) {
          color = "orangered";
        }
      else {
        color = "red";
      }

      var coord = [quakes[i].geometry.coordinates[1],quakes[i].geometry.coordinates[0]]

  // Add circles to map
        // console.log(quakeLocs)
        L.circle(coord, {
          fillOpacity: 0.75,
          color: "grey",
          weight: 0.5,
          fillColor: color,
          // Adjust radius
          radius: quakes[i].properties.mag * 50000
        }).bindPopup("<h2>Location: " + quakes[i].properties.place + "</h2> <hr> <h2>Magnitude : " 
            + quakes[i].properties.mag + "</h2><hr><p>" + new Date(quakes[i].properties.time) + "</p>").addTo(myMap);


      }


  });



//  // Create a new choropleth layer
//  geojson = L.choropleth(data, {

//     // Set color scale
//     scale: ["#ffffb2", "#b10026"],

//     // Number of breaks in step range
//     steps: 10,

//     // q for quartile, e for equidistant, k for k-means
//     mode: "q",
//     style: {
//       // Border color
//       color: "#fff",
//       weight: 1,
//       fillOpacity: 0.8
//     },

  //   // Binding a pop-up to each layer
  //   onEachFeature: function(feature, layer) {
  //     layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Most Significant Earthquakes in the Past Week:<br>" +
  //       "$" + feature.properties.MHI2016);
  //   }
  // }).addTo(myMap);

  // // Set up the legend
  // var legend = L.control({ position: "bottomright" });
  // legend.onAdd = function() {
  //   var div = L.DomUtil.create("div", "info legend");
  //   var limits = geojson.options.limits;
  //   var colors = geojson.options.colors;
  //   var labels = [];

  //   // Add min & max
  //   var legendInfo = "<h1>Significant Earthquakes</h1>" +
  //     "<div class=\"labels\">" +
  //       "<div class=\"min\">" + limits[0] + "</div>" +
  //       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
  //     "</div>";

  //   div.innerHTML = legendInfo;

  //   limits.forEach(function(limit, index) {
  //     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  //   });

  //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  //   return div;
  // };

  // // Adding legend to the map
  // legend.addTo(myMap);

// });