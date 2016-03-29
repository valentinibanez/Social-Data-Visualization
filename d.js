/********************
 ******** 2D ********
 ********************/
var w = 800;
var h = 800;
//Define default path generator
var projection = d3.geo.mercator()
    .scale(270000)
    .center([-122.4310, 37.7742]) // centers map at given coordinates
    .translate([w / 2, h / 2]); // translate map to svg
//path generator
var path = d3.geo.path().projection(projection);
//Create SVG element
var svg = d3.select("#vis")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
//Load in GeoJSON data
d3.json("https://raw.githubusercontent.com/suneman/socialdataanalysis2016/master/files/sfpddistricts.geojson", function(json) {

    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path);

});
var border = 1;
var bordercolor = 'black';
var borderPath = svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", h)
    .attr("width", w)
    .style("stroke", bordercolor)
    .style("fill", "none")
    .style("stroke-width", border);
