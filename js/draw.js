var data = [];

$(document).ready(function () {
    loadData();
});

function loadData() {
    d3.csv("data/databreaches.csv", (d) => {
        data = d;
        data.forEach((item) =>{
          item.YEA = parseInt(item.YEA);
          item.num_stolen = parseInt(item.num_stolen)
        });
    drawChartOne(data);
    });
}
function drawChartOne(dataitems){
  var w = 1200;
  var h = 800;
  var margin = {top: 100, right: 200, bottom: 200, left: 150};
  var width = w - margin.left - margin.right;
  var height = h -margin.top - margin.bottom;
  var svg = d3.select("#chart1").append("svg")
  .attr("width",w)
  .attr("height", h)
  .attr("id", "basic")
  .append('g')
  .attr("transform", "translate("+ margin.left + "," + margin.top + ")");
  var x = d3.scaleBand(dataitems)
      .domain(dataitems.map((d)=>d.YEA))
      .range([0,width])
      .paddingInner(0.1);
  var y = d3.scaleBand(dataitems)
      .domain(dataitems.map((d)=>d.M_O_L))
      .range([height, 0]);
  svg.append("g")
  .attr("class", "x_axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

  svg.append("g")
  .attr("class", "y_axis")
  .call(d3.axisLeft(y))

  var simulation = d3.forceSimulation(dataitems)
  .force("x", d3.forceX(function(d){return x(d.YEA);}).strength(1))
  .force("y", d3.forceY(height/2))
  .force("collide", d3.forceCollide(function(d,i){
    // console.log(d,i)
    return 3//(d.num_stolen/10000000)
  }))
  .stop();

  for (var i = 0; i < 120; ++i) simulation.tick();
  var cell = svg.append("g")
  .attr("class", "cells")
  .attr("transform", "translate(25,0)")
  .selectAll("g").data(d3.voronoi()
  .extent([[-margin.left, -margin.top], [width + margin.right, height + margin.top]])
  .x(function(d) { return d.x; })
  .y(function(d) { return d.y; })
  .polygons(data)).enter().append("g");


  cell.append("circle")
      .attr("r", function(d){return (d.data.num_stolen/10000000)})
      .attr("sensitivity", function(d){return d.data.SENSITIVITY})
      .attr("story", function(d){return d.data.story})
      .attr("cx", function(d) { return d.data.x; })
      .attr("cy", function(d) { return d.data.y; });

  cell.append("path")
      .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

  // cell.append("title")
  //     .text(function(d) { return d.data.id + "\n" + formatValue(d.data.value); });

}

//
//
//
//   g.append("g")
//       .attr("class", "axis axis--x")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x).ticks(20, ".0s"));
//

//

// });
//
// function type(d) {
//   if (!d.value) return;
//   d.value = +d.value;
//   return d;
// }
