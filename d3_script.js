var width = 960,
    height = 500;
// sets the type of view
var projection = d3.geo.albersUsa()
    .scale(1070) // size, bigger is bigger
    .translate([width / 2, height / 2]);

//creates a new geographic path generator
var path = d3.geo.path().projection(projection);
var xScale = d3.scale.linear()
    .domain([0, 7])
    .range([0, 500]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickSize(13)
    .tickFormat(d3.format("0.0f"));


//set svg window
var svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)

var graticule = d3.geo.graticule()
    .extent([[-98 - 45, 38 - 45], [-98 + 45, 38 + 45]])
    .step([5, 5]);

// adding a blank background
svg.append("rect")
    .datum(graticule)
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
   // .on("click", clicked);

//declare g as our appended svg
var g = svg.append("g");

var defaultFill = "#aaa";



var colorScale = d3.scale.linear().domain([0.,0.1,0.2,0.5,0.7,1,1.25,1.5,1.75,2,5])
      .interpolate(d3.interpolateHcl)
    .range([d3.rgb('#67001f'),d3.rgb('#b2182b'),d3.rgb('#d6604d'),d3.rgb('#f4a582'),d3.rgb('#fddbc7'),
	    d3.rgb('#f7f7f7'),
	    d3.rgb('#d1e5f0'),d3.rgb('#92c5de'),d3.rgb('#4393c3'),d3.rgb('#2166ac'),d3.rgb('#053061')]);


	   //[d3.rgb("#f70000"),d3.rgb("#f7f7f7"),d3.rgb("#67a9cf"),d3.rgb("0C00FF")]);//d3.rgb("#043927"), d3.rgb("#98f898")]);



d3.json("nielsentopo.json", function(error, dma) {

  var nielsen = dma.objects.nielsen_dma.geometries;
console.log(nielsen);
  // adding data from tv json (number of TVs, etc) to map json
  d3.json("data.json", function(error, tv){

    for (var i = 0; i < nielsen.length; i++){
      var dma_code = nielsen[i].id;
      for (key in tv[dma_code]){
        nielsen[i].properties[key] = tv[dma_code][key];
      }
    }
  dma.objects.nielsen_dma.geometries = nielsen;

  g.append("g")
    .attr("id", "dmas")
    .selectAll("path")
    .data(topojson.feature(dma, dma.objects.nielsen_dma).features)
    .enter()
    .append("path")
    .attr("d", path)

    //.on("click", clicked)
    
    .on("mouseover", function(d){
      d3.select(this)
			.attr("opacity", 1);
			//.attr("fill", "orange");

      var prop = d.properties;
      var string = "<p><strong>Market Area Name</strong>: " + prop.dma1 + "</p>";
      string += "<p><strong>Ratio of Female to Male gamers</strong>: " + prop.value.toFixed(2)*100 + "%</p>";
      //string += "<p><strong>Nielsen Rank</strong>: " + prop.Rank + "</p>";

      d3.select("#textbox")
        .html("")
        .append("text")
        .html(string)
    })

			.on("mouseout", function(d){
			d3.select(this)})
			.attr("opacity", function(d,i){
			return 1;})//d.properties["HEB Awareness"]*d.properties["HEB Awareness"];})
			.attr("fill", function(d,i){

			return colorScale(d.properties.value); 
			});

  // add dma borders
  g.append("path", ".graticule")
      .datum(topojson.mesh(dma, dma.objects.nielsen_dma, function(a, b) { 
        return true;
      }))
      .attr("id", "dma-borders")
      .attr("d", path);	
		
  })
})

// via http://stackoverflow.com/a/2901298
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

