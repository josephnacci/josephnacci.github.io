
// set the dimensions and margins of the graph
var margin1 = {top: 0, right: 0, bottom: 120, left: 120},
    width1 = 600 - margin1.left - margin1.right,
    height1 = 600 - margin1.top - margin1.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
    .append("g")
    .attr("transform",
	  "translate(" + margin1.left + "," + margin1.top + ")");

//Read the data
d3.csv("heatmap_man.csv", function(data) {
	console.log(data);
	var maxx = 0;
	var minn = 1000000;
	for(var i=0; i< data.length;i++){
	    if (+data[i].value > maxx){
		maxx = +data[i]["value"];
	    }
	    if (+data[i].value < minn & data[i].value > 0){
		minn = +data[i].value;
	    }

	}
	console.log(maxx,minn);


	for(var i=0; i< data.length;i++){
	    data[i].normval = 1-(+data[i].value/maxx);

	}
	

	// Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
	var myGroups = d3.map(data, function(d){return d.group;}).keys()
	    var myVars = d3.map(data, function(d){return d.variable;}).keys()

	    // Build X scales and axis:
	    var x = d3.scaleBand()
	    .range([ 0, width1 ])
	    .domain(myGroups)
	    .padding(0.05);
	svg.append("g")
	    .style("font-size", 15)
	    .attr("transform", "translate(0," + height1 + ")")
	    .call(d3.axisBottom(x).tickSize(0))
	    .selectAll("text")
	    .style("text-anchor", "end")
	    .attr("dx", "-.8em")
	    .attr("dy", ".15em")
	    .attr("transform", "rotate(-65)")
	    .select(".domain").remove()
	    
	    
	    // Build Y scales and axis:
	    var y = d3.scaleBand()
	    .range([ height1, 0 ])
	    .domain(myVars)
	    .padding(0.05);
	svg.append("g")
	    .style("font-size", 15)
	    .call(d3.axisLeft(y).tickSize(0))
	    .select(".domain").remove()

	    // Build color scale
	    var myColor = d3.scaleSequential()
	    .interpolator(d3.interpolateBlues)//Inferno)
	    .domain([0,1])

	    // create a tooltip
	    var tooltip = d3.select("#my_dataviz")
	    .append("div")
	    .style("opacity", 0)
	    .attr("class", "tooltip")
	    .style("background-color", "white")
	    .style("border", "solid")
	    .style("border-width", "2px")
	    .style("border-radius", "5px")
	    .style("padding", "5px")

	    // Three function that change the tooltip when user hover / move / leave a cell
	    var mouseover = function(d) {
	    tooltip
	    .style("opacity", 1)
	    d3.select(this)
	    .style("stroke", "black")
	    .style("opacity", 1)
	}
	var mousemove = function(d) {
	    tooltip
	    .html("Similarity between " + d.variable + " and " +d.group +"<br>" + d.normval)
	    .style("left",(d3.mouse(this)[0]+100) + "px")
	    .style("top", (d3.mouse(this)[1]+10) + "px")
	}
	var mouseleave = function(d) {
	    tooltip
	    .style("opacity", 0)
	    d3.select(this)
	    .style("stroke", "none")
	    .style("opacity", 0.8)
	}
	
	// add the squares
	var circleSize = 12;
	svg.selectAll()
	    .data(data, function(d) {return d.group+':'+d.variable;})
	    .enter()
	    .append("circle")
	    .attr("r", circleSize)
	    .attr("cx", function(d) { return x(d.group)+circleSize })
	    .attr("cy", function(d) { return y(d.variable)+circleSize })
	    .attr("width", x.bandwidth() )
	    .attr("height", y.bandwidth() )
	    .style("fill", function(d) { return myColor(d.normval)} )
	    .style("stroke-width", 4)
	    .style("stroke", "none")
	    .style("opacity", 0.9)
	    .on("mouseover", mouseover)
	    .on("mousemove", mousemove)
	    .on("mouseleave", mouseleave)
	    })

// Add title to graph
