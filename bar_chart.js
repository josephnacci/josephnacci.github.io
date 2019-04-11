




//
//var margin = {top: 20, right: 20, bottom: 70, left: 40},
//    width = 600 - margin.left - margin.right,
//    height = 300 - margin.top - margin.bottom;
//
//// Parse the date / time
//
//var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
//
//var y = d3.scale.linear().range([height, 0]);
//
//var xAxis = d3.svg.axis()
//    .scale(x)
//    .orient("bottom");
//
//var yAxis = d3.svg.axis()
//    .scale(y)
//    .orient("left")
//    .ticks(10);
//
//var svg = d3.select("#chart").append("svg")
//    .attr("width", width + margin.left + margin.right)
//    .attr("height", height + margin.top + margin.bottom)
//    .append("g")
//    .attr("transform", 
//          "translate(" + margin.left + "," + margin.top + ")");

//var margin = {top: 20, right: 20, bottom: 30, left: 150},
//    width = +svg.attr("width") - margin.left - margin.right,
//    height = +svg.attr("height") - margin.top - margin.bottom;

var margin = {top: 0, right: 20, bottom: 0, left: 120},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var svgb = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


  
var tooltip = d3.select("#chart").append("div").attr("class", "toolTip");
var g = svgb.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
d3.csv("bar-data.csv", function(error, data) {
	
	var max_val = 0;
	var min_val=1000000;
	for(var i=0;i<data.length;i++){
	    if (data[i]['stdev'] < min_val){
		min_val = data[i]['stdev'];
	    }
	}
	
	data.forEach(function(d) {
		d.name = d.username;
		d.value = min_val/+d.stdev;//similarity;
	    });
	
	console.log(data);

	//sort bars based on value
        data = data.sort(function (a, b) {
		return d3.ascending(a.value, b.value);
	    });
	
	//set up svg using margin conventions - we'll need plenty of room on the left for labels
//	var margin = {
//            top: 0,
//            right: 25,
//            bottom: 20,
//            left: 150
//        };
//
//        var width = 500 - margin.left - margin.right,
//            height = 400 - margin.top - margin.bottom;
//
//        var svg = d3.select("#chart").append("svg")
//            .attr("width", width + margin.left + margin.right)
//            .attr("height", height + margin.top + margin.bottom)
//            .append("g")
//            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



//	var tip = d3.tip()
//	    .attr('class', 'd3-tip')
//	    .offset([-10, 0])
//	    .html(function(d) {
//		    return "<strong>Consistency Score:</strong> <span style='color:red'>" + (d.value*100).toFixed(1) + "%</span>";
//		});
//
//	svg.call(tip);

	var x = d3.scaleLinear().range([0, width - margin.left - margin.right]);
	var y = d3.scaleBand().range([height, 0]);

	x.domain([0, d3.max(data, function(d) { return d.value; })]);
	y.domain(data.map(function(d) { return d.name; })).padding(0.1);

	g.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    ;

	g.append("g")
	    .attr("class", "y axis")
	    .call(d3.axisLeft(y));

	g.selectAll(".bar")
	    .data(data)
	    .enter().append("rect")
	    .attr("class", "bar")
	    .attr("x", 0)
	    .attr("height", y.bandwidth())
	    .attr("y", function(d) { return y(d.name); })
	    .attr("width", function(d) { return x(d.value); })
	    .on("mouseover", function(d){
            tooltip
		.style("left", x(d.value)+100 + "px")
		.style("top",  y(d.name) -45+"px")//d3.event.pageY - 60 + "px")
		.style("display", "inline-block")
		.html("Consistency score: " + (d.value*100).toFixed(1));
		})
	    .on("mouseout", function(d){ tooltip.style("display", "none");});
    });
//
//        //var x = d3.scale.linear()
//        //    .range([0, width])
//        //    .domain([0, d3.max(data, ion (d) {
//	//		    return d.value;
//	//		})]);
//	//
//        //var y = d3.scale.ordinal()
//        //    .rangeRoundBands([height, 0], .1)
//        //    .domain(data.map(function (d) {
//	//		return d.name;
//	//	    }));
//
//        //make y axis to show bar names
//        var yAxis = d3.svg.axis()
//            .scale(y)
//            //no tick marks
//            .tickSize(0)
//            .orient("left");
//
//        var gy = svg.append("g")
//            .attr("class", "y axis")
//            .call(yAxis)
//
//	    var bars = svg.selectAll(".bar")
//            .data(data)
//            .enter()
//            .append("g")
//
//	    //append rects
//	    bars.append("rect")
//            .attr("class", "bar")
//            .attr("y", function (d) {
//		    return y(d.name);
//		})
//            .attr("height", y.rangeBand())
//            .attr("x", 0)
//            .attr("width", function (d) {
//		    return x(d.value);
//		})
//	    ;
//	//	    .on('mouseover', tip.show)
//	//	    .on('mouseout', tip.hide);
//
//
//        //add a value label to the right of each bar
////        bars.append("text")
////            .attr("class", "label")
////            //y position of the label is halfway down the bar
////            .attr("y", function (d) {
////		    return y(d.name) + y.rangeBand() / 2 + 4;
////		})
////            //x position is 3 pixels to the right of the bar
////            .attr("x", function (d) {
////		    return x(d.value) + 3;
////		})
////            .text(function (d) {
////		    return d.value;
////		});
//    });