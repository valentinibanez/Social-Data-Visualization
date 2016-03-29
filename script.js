/********************
 ******** 2A ********
 ********************/
var dataset = [5, 10, 15, 20, 25];

d3.select("#a").selectAll("p")
    .data(dataset)
    .enter()
    .append("p")
    .text(function(d) {
        return "I can count up to " + d;
    })
    .style("color", function(d) {
        if (d > 15) { //Threshold of 15
            return "red";
        } else {
            return "black";
        }
    });

document.getElementById('a').innerHTML += '<svg width="500" height="100"><rect x="0" y="0" width="80" height="80" fill="rgba(128, 0, 128, 1.0)"/><rect x="20" y="5" width="80" height="80" fill="rgba(128, 0, 128, 0.75)"/><rect x="40" y="10" width="80" height="80" fill="rgba(128, 0, 128, 0.5)"/><rect x="60" y="15" width="80" height="80" fill="rgba(128, 0, 128, 0.25)"/><rect x="80" y="20" width="80" height="80" fill="rgba(128, 0, 128, 0.1)"/></svg>';

/********************
 ******** 2B ********
 ********************/

/********************
 ******** 2C ********
 ********************/

/********************
 ******** 2D ********
 ********************/
