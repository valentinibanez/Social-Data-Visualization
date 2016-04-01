/********************
 ******** 2C ********
 ********************/

 			//Width and height
      //Width and height
var barChartw = 1000;
var barCharth = 300;
var barPadding = 1;
var barChartPadding = {bottom: 50, left:40, top: 40};

var datasetVC = [];
var allCounts = [];

var barchartYScale;
var barchartSvg;
var dataSelector = 1;

var valueLabels;
var title;
var yearLabel;
var container;
d3.select("body")
  .select("#c")
  .append("div")
  .attr("class", "arrow-left")
  .attr("id", "back")
  .on("click", function() {
    if(dataSelector>1){
      dataSelector--;
    }
    transition();
  });
yearLabel = d3.select("body")
  .select("#c")
  .append("div")
  .style("float" , "left")
  .style("margin", "5px")
  .style("width", "30px")
  .text("2010")
  .attr("id", "yearLabel");
d3.select("body")
    .select("#c")
    .append("div")
    .attr("class", "arrow-right")
    .attr("id", "next")
    .on("click", function() {
      if(dataSelector<6){
        dataSelector++;
      }
      transition();
    });
container = d3.select("body")
  .select("#c")
  .append("p")
  .style("float" , "none")
  .style("margin", "5px")
  .attr("id", "chartContainer");

d3.csv("ViolentCrimesAll.csv", function(data) {
  datasetVC = data.map(function(d) { return [d["Category"], +d["2010"], +d["2011"], +d["2012"], +d["2013"], +d["2014"], +d["2015"],]; });

  for (i = 0; i < datasetVC.length; i++){
    for (j = 1; j < datasetVC.length; j++){
      allCounts = allCounts.concat(datasetVC[i][j]);
    }
  }
  barchartYScale = d3.scale.linear()
                   .domain([0, d3.max(allCounts)])
                   .range([0, barCharth - barChartPadding.bottom - barChartPadding.top]);

		//Create SVG element
  barchartSvg = d3.select("body").select("#c").select("#chartContainer")
  				.append("svg")
  				.attr("width", barChartw + barChartPadding.left)
  				.attr("height", barCharth);


	barchartSvg.selectAll("rect")
	   .data(datasetVC)
	   .enter()
	   .append("rect")
	   .attr("x", function(d, i) {
	   		return i * (barChartw / datasetVC.length) + barChartPadding.left;
	   })
	   .attr("y", function(d) {
	   		return barCharth - barchartYScale(d[dataSelector]) - barChartPadding.bottom;
	   })
	   .attr("width", barChartw / datasetVC.length - barPadding)
	   .attr("height", function(d) {
	   		return barchartYScale(d[dataSelector]);
	   })
	   .attr("fill", function(d) {
			return "rgb(0, 0, " + (d[dataSelector] * 10) + ")";
	   });

    // add value labels


    // add category labels
	barchartSvg.selectAll("text.labels")
	   .data(datasetVC)
	   .enter()
	   .append("text")
	   .text(function(d) {
	   		return d[0];
	   })
	   .attr("text-anchor", "middle")
	   .attr("x", function(d, i) {
	   		return i * (barChartw / datasetVC.length) + (barChartw / datasetVC.length - barPadding) / 2 + barChartPadding.left;
	   })
	   .attr("y", function(d) {
	   		return barCharth -30;
	   })
	   .attr("font-family", "sans-serif")
	   .attr("font-size", "11px")
	   .attr("fill", "black");

       // add value labels
  valueLabels = barchartSvg.selectAll("text.values")
    .data(datasetVC)
    .enter()
    .append("text")
    .text(function(d) {
       return d[dataSelector];
    })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
       return i * (barChartw / datasetVC.length) + (barChartw / datasetVC.length - barPadding) / 2 + barChartPadding.left;
    })
    .attr("y", function(d) {
      if(barchartYScale(d[dataSelector])> 30){
       return barCharth - barchartYScale(d[dataSelector]) - barChartPadding.bottom + 20;
     }
     else{
       return barCharth - barchartYScale(d[dataSelector]) - barChartPadding.bottom - 10;
     }
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", function(d){
      if(barchartYScale(d[dataSelector])> 30){
        return "white";
      }
      else{
        return "black";
      }
    });
  // add axis label
  barchartSvg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x", 0 - (barCharth / 2) )
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of Crimes Recorded");
  title =  barchartSvg.append("text")
      .attr("y", 0)
      .attr("x", (barChartw / 2) + barChartPadding.left/2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(function(d){
      year();
  });
});

var year = function(){
  switch(dataSelector){
    case 1:
    return "2010";
    break;
    case 2:
    return "2011";
    break;
    case 3:
    return "2012";
    break;
    case 4:
    return "2013";
    break;
    case 5:
    return "2014";
    break;
    case 6:
    return "2015";
    break;
  }
}
var transition = function(){
  console.log(dataSelector);
  // redraw columns
  barchartSvg.selectAll("rect")
  .data(datasetVC)
  .transition()
  .duration(500)
  .attr("x", function(d, i) {
     return i * (barChartw / datasetVC.length) + barChartPadding.left;
  })
  .attr("y", function(d) {
     return barCharth - barchartYScale(d[dataSelector]) - barChartPadding.bottom;
  })
  .attr("width", barChartw / datasetVC.length - barPadding)
  .attr("height", function(d) {
     return barchartYScale(d[dataSelector]);
  })
  .attr("fill", function(d) {
   return "rgb(0, 0, " + (d[dataSelector] * 10) + ")";
  });

  // redraw value labels
    valueLabels.data(datasetVC)
    .transition()
    .duration(500)
    .text(function(d) {
      console.log(d[dataSelector])
       return d[dataSelector];
    })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
       return i * (barChartw / datasetVC.length) + (barChartw / datasetVC.length - barPadding) / 2 + barChartPadding.left;
    })
    .attr("y", function(d) {
      if(barchartYScale(d[dataSelector])> 30){
       return barCharth - barchartYScale(d[dataSelector]) - barChartPadding.bottom + 20;
     }
     else{
       return barCharth - barchartYScale(d[dataSelector]) - barChartPadding.bottom - 10;
     }
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", function(d){
      if(barchartYScale(d[dataSelector])> 30){
        return "white";
      }
      else{
        return "black";
      }
    });
    // redraw title
    title.text(year());
    yearLabel.text(year());
}
