/********************
 ******** 2B ********
 ********************/

//Width and height
var w = 500;
var h = 300;
var padding = 70;

//Dynamic, random dataset//
var dataset = []; //Initialize empty array
var crimeCount = [];
var numDataPoints = 50; //Number of dummy data points to create
var maxRange = Math.random() * 1000; //Max range of new values
var dataToggler = 1;
// svg and svg variables
var xScale;
var yScale;
var rScale;
var xAxis;
var yAxis;
var svg;

// initiate scatterplot with data//
d3.csv("2003T.csv", function(data) {
    dataset = data.map(function(d) { return [+d["PROSTITUTION"], +d["VEHICLE_THEFT"], +d["total"], d["PdDistrict"]]; });

    d3.csv("2015T.csv", function(data) {
        dataset2 = data.map(function(d) { return [+d["PROSTITUTION"], +d["VEHICLE_THEFT"], +d["total"], d["PdDistrict"]]; });
        xScale = d3.scale.linear()
            .domain([0, d3.max([d3.max(dataset, function(d) {
                return d[0];
            }), d3.max(dataset2, function(d) {
                return d[0];
            })])])
            .range([padding, w - padding * 2]);


        yScale = d3.scale.linear()
            .domain([0, d3.max([d3.max(dataset, function(d) {
                return d[1];
            }), d3.max(dataset2, function(d) {
                return d[1];
            })])])
            .range([h - padding, padding]);

        rScale = d3.scale.linear()
            .domain([0, d3.max([d3.max(dataset, function(d) {
                return d[2];
            }), d3.max(dataset2, function(d) {
                return d[2];
            })])])
            .range([2, 15]);

        xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(5);
        //Define Y axis
        yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(5);
        //Create SVG element
        svg = d3.select("body")
            .select("#b")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        //Create circles
        svg.selectAll("circle")
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
                return rScale(d[2]);
            });

        svg.selectAll("text") // append labels
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d) {
                return d[3];
            })
            .attr("x", function(d) {
                return xScale(d[0]) + 15;
            })
            .attr("y", function(d) {
                return yScale(d[1]);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "13px")
            .attr("fill", "black");

        //Create X axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);

        svg.append("text")      // text label for the x axis
            .attr("x", w / 2)
            .attr("y", h)
            .style("text-anchor", "middle")
            .text("PROSTITUTION");

        //Create Y axis
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x", 0 - (h / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("VEHICLE_THEFT");

    });

});


//On click, toggle between datasets//
d3.select("#toggleDate")
    .on("click", function() {
        if (dataToggler == 1) {
            transistionTo2015();
            dataToggler = 2;
        }
        else {
            transistionTo2003();
            dataToggler = 1;
        }
        //New values for dataset


    });

// transistion to 2015 data
var transistionTo2015 = function() {
    d3.csv("2015T.csv", function(data) {
        dataset = data.map(function(d) { return [+d["PROSTITUTION"], +d["VEHICLE_THEFT"], +d["total"], d["PdDistrict"]]; });

        //Update all circles
        svg.selectAll("circle")
            .data(dataset)
            .transition()
            .duration(1000)
            .attr("cx", function(d) {
                return xScale(d[0]);
            })
            .attr("cy", function(d) {
                return yScale(d[1]);
            })
            .attr("r", function(d) {
                return rScale(d[2]);
            });

        svg.selectAll("text") // append labels
            .data(dataset)
            .transition()
            .duration(1000)
            .text(function(d) {
                return d[3];
            })
            .attr("x", function(d) {
                return xScale(d[0]) + 15;
            })
            .attr("y", function(d) {
                return yScale(d[1]);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "13px")
            .attr("fill", "black");


    });
}


// transistion to 2003 data//
var transistionTo2003 = function() {
    d3.csv("2003T.csv", function(data) {
        dataset = data.map(function(d) { return [+d["PROSTITUTION"], +d["VEHICLE_THEFT"], +d["total"], d["PdDistrict"]]; });


        //Update all circles
        svg.selectAll("circle")
            .data(dataset)
            .transition()
            .duration(1000)
            .attr("cx", function(d) {
                return xScale(d[0]);
            })
            .attr("cy", function(d) {
                return yScale(d[1]);
            })
            .attr("r", function(d) {
                return rScale(d[2]);
            });

        svg.selectAll("text") // append labels
            .data(dataset)
            .transition()
            .duration(1000)
            .text(function(d) {
                return d[3];
            })
            .attr("x", function(d) {
                return xScale(d[0]) + 15;
            })
            .attr("y", function(d) {
                return yScale(d[1]);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "13px")
            .attr("fill", "black");


    });
}
