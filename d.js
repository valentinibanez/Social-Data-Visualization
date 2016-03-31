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
var dVis = d3.select("#vis")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
//Load in GeoJSON data
d3.json("https://raw.githubusercontent.com/suneman/socialdataanalysis2016/master/files/sfpddistricts.geojson", function(json) {

    //Bind data and create one path per GeoJSON feature
    dVis.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path);

    var color = d3.scale.linear()
        .domain([0, 1, 2])
        .range(["red", "yellow", "green"]);
    // Add the data
    d3.csv("data/points.csv", function(data) {
        dataset = data.map(function(d) { return [+d["x"], +d["y"], +d["label"]]; });

        var xScale = d3.scale.linear()
            .domain([
                d3.min(dataset, function(d) { return d[0]; }),
                d3.max(dataset, function(d) { return d[0]; })
            ])
            .range([20, 760]);

        var yScale = d3.scale.linear()
            .domain([
                d3.min(dataset, function(d) { return d[1]; }),
                d3.max(dataset, function(d) { return d[1]; })
            ])
            .range([760, 120]);


        //Create circles
        dVis.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return xScale(d[0]);
            })
            .attr("cy", function(d) {
                return yScale(d[1]);
            })
            .attr("r", function(d) {
                return 5;
            })
            .style("fill", function(d) {
                return color(d[2]);
            });
    });

    // Add the center points
    d3.csv("data/centroids.csv", function(data) {
        dataset = data.map(function(d) { return [+d["x"], +d["y"]]; });

        var xScale = d3.scale.linear()
            .domain([
                d3.min(dataset, function(d) { return d[0]; }),
                d3.max(dataset, function(d) { return d[0]; })
            ])
            .range([150, 500]);

        var yScale = d3.scale.linear()
            .domain([
                d3.min(dataset, function(d) { return d[1]; }),
                d3.max(dataset, function(d) { return d[1]; })
            ])
            .range([500, 200]);


        //Create circles
        dVis.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return xScale(d[0]);
            })
            .attr("cy", function(d) {
                return yScale(d[1]);
            })
            .attr("r", function(d) {
                return 24;
            })
            .style("fill", "rgba(208,110,228,0.7)");
    });
});
var border = 1;
var bordercolor = 'black';
var borderPath = dVis.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", h)
    .attr("width", w)
    .style("stroke", bordercolor)
    .style("fill", "none")
    .style("stroke-width", border);




