function draw_freq_map(div_id) {
		// set the dimensions and margins of the graph
	var margin = {top: 50, right: 50, bottom: 50, left: 50},
		width = 450 - margin.left - margin.right,
		height = 450 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select(div_id)
		.append("svg")
		.attr("width", width + margin.left + margin.right + 20)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");

	// Labels of row and columns
	var b_channel = []
	var a_channel = []
	for (var i = 0; i <= 21; i++) {
		b_channel.push(i);
		a_channel.push(i);
	}

	var b_axis = []
	var a_axis = []
	for (var i = -110; i <= 100; i+=10) {
		b_axis.push(i);
		a_axis.push(i);
	}

	// Build X scales and axis:
	var x = d3.scaleBand()
		.range([ 0, width ])
		.domain(b_channel)
		.padding(0.01);
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(d3.scaleBand()
		.range([ 0, width ])
		.domain(b_axis)
		.padding(0.01)))
	svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin.left)
		.attr("x",0 - (height / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "Avenir")
		.text("a-Channel");

	var div = d3.select("body").append("div") 
	    .attr("class", "tooltip")       
	    .style("opacity", 0);
	// Build Y scales and axis:
	var y = d3.scaleBand()
		.range([ height, 0 ])
		.domain(a_channel)
		.padding(0.01);
	svg.append("g")
		.call(d3.axisLeft(d3.scaleBand()
		.range([ height, 0 ])
		.domain(a_axis)
		.padding(0.01)));

	svg.append("text")
		.attr("transform", "translate(" + (width/2) + " ," + (height + margin.top - 10) + ")")
		.style("text-anchor", "middle")
		.style("font-family", "Avenir")
		.text("b-Channel");

	d3.csv("http://localhost:8000/resources/hist.csv", function(data) {
		var data_max = 0
		for (var i = 0; i < data.length; i++) {
			if (parseInt(data[i].count) > data_max) {
				data_max = parseInt(data[i].count)
			}
		}
		console.log(Math.log(data_max))
		var log_max = Math.log(data_max)
		// Build color scale
		var myColor = d3.scaleLinear()
		.range(["#edf8bc", "#c1e6b5", "#6bc6bd","#36a6c1","#2a97bd","#216dae", "#1d368a"]) //"#69b3a2"
		.domain([0, log_max*(1.0/6.0), log_max*(2.0/6.0), log_max*(3.0/6.0), log_max*(4.0/6.0), log_max*(5.0/6.0), log_max])

		svg.selectAll("svg")
		.data(data, function(d) {return d.b+':'+d.a;})
		.enter()
		.append("rect")
		.attr("x", function(d) { return x(d.b) + 1 })
		.attr("y", function(d) { return y(d.a) })
		.attr("width", x.bandwidth() )
		.attr("height", y.bandwidth() )
		.style("fill", function(d) { //return myColor(Math.log(d.count)) 
									if (d.count == 0) { return "#ffffff"
									} else { return myColor(Math.log(d.count)) }
								})
		.on("mouseover", function(d) {    
          div.transition()    
              .duration(200)    
              .style("opacity", .9);    
          div .html("a: " + d.a + ",   b: " + d.b + "<br />Log Frequency: " + Math.log(d.count) + "<br />")
              .style("left", (d3.event.pageX + 7) + "px")   
              .style("top", (d3.event.pageY - 28) + "px")
              .style("font-family", "Avenir");  
          })
		.on("mouseout", function(d) {
          div.transition()    
              .duration(500)    
              .style("opacity", 0); 
      	});

	});
	colors = ["#edf8bc", "#c1e6b5", "#6bc6bd","#36a6c1","#2a97bd","#216dae", "#1d368a"]
	const gradientScale = d3.scaleLinear().range(colors);
	const linearGradient = svg.append('linearGradient').attr('id', 'linear-gradient');

	linearGradient.selectAll('stop') 
		.data(gradientScale.range())
		.enter().append('stop')
		.attr('offset', (d,i) => i/(gradientScale.range().length - 1))
		.attr('stop-color', (d) => d);

	svg.append('rect')
		.attr('width', 193)
		.attr('height', 17)
		.style('fill', 'url(#linear-gradient)')
		.attr("transform", "rotate(-90)")
		.attr("y", 377)
		.attr("x", -278);

	svg.append("g")
		.attr("transform", "translate(394, 85.5)")
		.call(d3.axisRight(d3.scaleLinear().range([191.5, 0]).domain([0,18])));
}

function draw_color_map(div_id) {
		// set the dimensions and margins of the graph
	var margin = {top: 50, right: 50, bottom: 50, left: 50},
		width = 450 - margin.left - margin.right,
		height = 450 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select("#my_dataviz")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");

	// Labels of row and columns
	var b_channel = []
	var a_channel = []
	for (var i = 0; i <= 21; i++) {
		b_channel.push(i);
		a_channel.push(i);
	}

	var b_axis = []
	var a_axis = []
	for (var i = -110; i <= 100; i+=10) {
		b_axis.push(i);
		a_axis.push(i);
	}

	var div = d3.select("body").append("div") 
	    .attr("class", "tooltip")       
	    .style("opacity", 0);
	// Build X scales and axis:
	var x = d3.scaleBand()
		.range([ 0, width ])
		.domain(b_channel)
		.padding(0.01);

	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(d3.scaleBand()
		.range([ 0, width ])
		.domain(b_axis)
		.padding(0.01)))
	svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin.left)
		.attr("x",0 - (height / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "Avenir")
		.text("a-Channel");

	// Build Y scales and axis:
	var y = d3.scaleBand()
		.range([ height, 0 ])
		.domain(a_channel)
		.padding(0.01);
	svg.append("g")
		.call(d3.axisLeft(d3.scaleBand()
		.range([ height, 0 ])
		.domain(a_axis)
		.padding(0.01)));
	svg.append("text")
		.attr("transform", "translate(" + (width/2) + " ," + (height + margin.top - 10) + ")")
		.style("text-anchor", "middle")
		.style("font-family", "Avenir")
		.text("b-Channel");


	//Read the data
	d3.csv("http://localhost:8000/resources/hist.csv", function(data) {

		svg.selectAll("svg")
		.data(data, function(d) {return d.b+':'+d.a;})
		.enter()
		.append("rect")
		.attr("x", function(d) { return x(d.b) + 1 })
		.attr("y", function(d) { return y(d.a) })
		.attr("width", x.bandwidth() )
		.attr("height", y.bandwidth() )
		.style("fill", function(d) { 
									if (d.count == 0) { return "#ffffff"
									} else { return d.color }
								})
		.on("mouseover", function(d) {    
          div.transition()    
              .duration(200)    
              .style("opacity", .9);    
          div .html("a: " + d.a + ",   b: " + d.b + "<br />Color: " + d.color + "<br />")
              .style("left", (d3.event.pageX + 7) + "px")   
              .style("top", (d3.event.pageY - 28) + "px")
              .style("font-family", "Avenir");  
          })
		.on("mouseout", function(d) {
          div.transition()    
              .duration(500)    
              .style("opacity", 0); 
      	});

	})
}

function draw_rebal_weight_map(div_id) {
		// set the dimensions and margins of the graph
	var margin = {top: 50, right: 50, bottom: 50, left: 50},
		width = 450 - margin.left - margin.right,
		height = 450 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select(div_id)
		.append("svg")
		.attr("width", width + margin.left + margin.right + 20)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");

	// Labels of row and columns
	var b_channel = []
	var a_channel = []
	for (var i = 0; i <= 21; i++) {
		b_channel.push(i);
		a_channel.push(i);
	}

	var b_axis = []
	var a_axis = []
	for (var i = -110; i <= 100; i+=10) {
		b_axis.push(i);
		a_axis.push(i);
	}
	var div = d3.select("body").append("div") 
	    .attr("class", "tooltip")       
	    .style("opacity", 0);
	// Build X scales and axis:
	var x = d3.scaleBand()
		.range([ 0, width ])
		.domain(b_channel)
		.padding(0.01);
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(d3.scaleBand()
		.range([ 0, width ])
		.domain(b_axis)
		.padding(0.01)))
	svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin.left)
		.attr("x",0 - (height / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "Avenir")
		.text("a-Channel");

	// Build Y scales and axis:
	var y = d3.scaleBand()
		.range([ height, 0 ])
		.domain(a_channel)
		.padding(0.01);
	svg.append("g")
		.call(d3.axisLeft(d3.scaleBand()
		.range([ height, 0 ])
		.domain(a_axis)
		.padding(0.01)));

	svg.append("text")
		.attr("transform", "translate(" + (width/2) + " ," + (height + margin.top - 10) + ")")
		.style("text-anchor", "middle")
		.style("font-family", "Avenir")
		.text("b-Channel");

	d3.csv("http://localhost:8000/resources/rebal_weight.csv", function(data) {
		var data_max = 0
		for (var i = 0; i < data.length; i++) {
			if (parseInt(data[i].weight) > data_max) {
				data_max = parseInt(data[i].weight)
			}
		}
		console.log(data_max)
		// var log_max = Math.log(data_max)
		// Build color scale
		var myColor = d3.scaleLinear()
		.range(["#edf8bc", "#c1e6b5", "#6bc6bd","#36a6c1","#2a97bd","#216dae", "#1d368a"]) //"#69b3a2"
		.domain([0, data_max*(1.0/6.0), data_max*(2.0/6.0), data_max*(3.0/6.0), data_max*(4.0/6.0), data_max*(5.0/6.0), data_max])

		svg.selectAll("svg")
		.data(data, function(d) {return d.b+':'+d.a;})
		.enter()
		.append("rect")
		.attr("x", function(d) { return x(d.b) + 1 })
		.attr("y", function(d) { return y(d.a) })
		.attr("width", x.bandwidth() )
		.attr("height", y.bandwidth() )
		.style("fill", function(d) { //return myColor(Math.log(d.count)) 
									if (d.weight == 0) { return "#ffffff"
									} else { return myColor(d.weight) }
								})
		.on("mouseover", function(d) {    
          	div.transition()    
              .duration(200)    
              .style("opacity", .9);    
          	div .html("a: " + d.a + ",   b: " + d.b + "<br />Weight: " + d.weight + "<br />")
              .style("left", (d3.event.pageX + 7) + "px")   
              .style("top", (d3.event.pageY - 28) + "px")
              .style("font-family", "Avenir");  
          })
		.on("mouseout", function(d) {
          div.transition()    
              .duration(500)    
              .style("opacity", 0); 
      	});

	});
	colors = ["#edf8bc", "#c1e6b5", "#6bc6bd","#36a6c1","#2a97bd","#216dae", "#1d368a"]
	const gradientScale = d3.scaleLinear().range(colors);
	const linearGradient = svg.append('linearGradient').attr('id', 'linear-gradient');

	linearGradient.selectAll('stop') 
		.data(gradientScale.range())
		.enter().append('stop')
		.attr('offset', (d,i) => i/(gradientScale.range().length - 1))
		.attr('stop-color', (d) => d);

	svg.append('rect')
		.attr('width', 193)
		.attr('height', 17)
		.style('fill', 'url(#linear-gradient)')
		.attr("transform", "rotate(-90)")
		.attr("y", 377)
		.attr("x", -278);

	svg.append("g")
		.attr("transform", "translate(394, 85.5)")
		.call(d3.axisRight(d3.scaleLinear().range([191.5, 0]).domain([0,7])));
}



function list_images(epoch_num, cate, label) {
	var new_div = document.createElement("DIV");
	for (i = 1; i < 17; i++) {
		var x = document.createElement("IMG");
		var url = "http://localhost:8000/resources/images_epoch/" + epoch_num.toString() + "/" + cate + "/" + i.toString()+ "-" + label + ".jpg"
		x.src = url;
		x.setAttribute("style", "margin-right: 1px; width: 5.5%;")
		// var src = document.getElementById("all_imgs");
		new_div.appendChild(x);
	}
	return new_div.outerHTML
}


function accuracy_map(svg_id, csv_file, title) {
	var margin = {top: 75, right: 35, bottom: 125, left: 85},
    width = 700 - margin.left - margin.right,
    height = 520 - margin.top - margin.bottom;

  var x = d3.scaleLinear().range([0, width]),
      y = d3.scaleLinear().range([0, height]);

  // Variables for colors and legend:
  var teal = "#0570b8",
      teal2= "#0B90B6",
      mint = "#17a1bf",
      mint2 = "#05B89A",
      green = "#11cf73",
      green2 = "#46eb5c",
      green3 = "#ceff65",
      green4 = "#f0ff65",
      yellow = "#ffd965"
      corn = "#FFCE65",
      corn2 = "#FFC039",
      gold = "#FFC707",
      orange = "#ffad39",
      orange2 = "#ff8839",
      heart = "#fa7046",
      heart2 = "#FF4739",
      sun = "#FF6307",
      sun2 = "#ff4d07",
      red = "#FF1907",
      red2 = "#c90f02",
      hot = "#d60929",
      hot2 = "#b80b27",
      hot3 = "#960018";
      // colors = [ "#05B89A", "#0B90B6", "#FFCE65", "#FFC039", "#FFC707", "#FF9339", "#FF6307", "#FF4739", "#FF1907", "#c90f02", "#960018" ],
      // legendScale = ["0 - 3", "3 - 5.5", "5.5 - 6", "6 - 6.5", "6.5 - 7", "7 - 8.5", "8.5 - 9", "9 - 9.5", "9.5 - 10", "10+"];

  // Function to scale temperature to color:
  var colorScale = function(temp) {
    if (temp >= 0 && temp < 9) { return teal; }
    else if (temp >= 9 && temp < 14) { return teal2; }
    else if (temp >= 14 && temp < 19) { return mint; }
    else if (temp >= 19 && temp < 24) { return mint2; }
    else if (temp >= 24 && temp < 29) { return green; }
    else if (temp >= 29 && temp < 34) { return green2; }
    else if (temp >= 34 && temp < 39) { return green3; }
    else if (temp >= 39 && temp < 44) { return green4; }
    else if (temp >= 44 && temp < 49) { return yellow; }
    else if (temp >= 49 && temp < 54) { return corn; }
    else if (temp >= 54 && temp < 59) { return corn2; }
    else if (temp >= 59 && temp < 64) { return gold; }
    else if (temp >= 64 && temp < 69) { return orange; }
    else if (temp >= 69 && temp < 74) { return orange2; }
    else if (temp >= 74 && temp < 77) { return heart; }
    else if (temp >= 77 && temp < 80) { return heart2; }
    else if (temp >= 80 && temp < 83) { return sun; }
    else if (temp >= 83 && temp < 86) { return sun2; }
    else if (temp >= 86 && temp < 89) { return red; }
    else if (temp >= 89 && temp < 92) { return red2; }
    else if (temp >= 92 && temp < 95) { return hot; }
    else if (temp >= 95 && temp < 97) { return hot2; }
    else if (temp >= 97 && temp < 100) { return hot3; }
  }

  // Append main chart element
  var svg = d3.select(svg_id).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Append div for tooltip on hover:
  var div = d3.select("body").append("div") 
      .attr("class", "tooltip")       
      .style("opacity", 0);

  var div2 = d3.select("#info");
  // div2.html("hello")


  var y = function(cate) {
    if (cate == 'mountain') {
      return 0;
    } 
    else if (cate == 'forest') {
      return 1;
    }
    else if (cate == 'buildings') {
      return 2;
    }
    else if (cate == 'sea') {
      return 3;
    }
    else if (cate == 'street') {
      return 4;
    }
  }

  // Get data:
  d3.csv(csv_file, function(data) {
    // Calculate the domains based on the data:
    // console.log(data)
    x.domain(d3.extent(data, function(d) { return parseInt(d.model)/4.0; }));
    // console.log(x(75))

    // Render the data in an svg:
    svg.selectAll("svg")
        .data(data)
        .enter().append("rect")
        .attr("class", "tile")
        .attr("x", function(d) { return x(d.model)/4.0; })
        .attr("y", function(d) { return y(d.cate) * height /6; })
        .attr("width", 6.5)
        .attr("height", height/6)
        .attr("transform", "translate(-2.5, -20.5)")
        .style("fill", function(d) { return colorScale(d.accu); })
        .on("mouseover", function(d) {    
            div.transition()    
                .duration(200)    
                .style("opacity", .9);    
            div .html("Category: " + d.cate + "<br />Epoch: " + d.model + "<br />Accuracy: " + d.accu + "<br />")
                .style("left", (d3.event.pageX + 7) + "px")   
                .style("top", (d3.event.pageY - 28) + "px")
                .style("font-family", "Avenir");
                // <text x="290" y="-37.5" text-anchor="middle" class="title" style="font-size: 26px; font-family: Avenir; fill: rgb(252, 252, 252);">Training Set Accuracy</text>
            div2.html("<p id='info_title'>Category Accuracy</p> <p id='info_stat'></p> <div id='all_imgs'></div>")
            	.style("font-size", "16px")
            	.style("margin-top", "-50px")
       			.style("font-family", "Avenir");

       		var info_title = d3.select("#info_title");
        	info_title.style("color","#FCFCFC");

        	var info_stat = d3.select("#info_stat");
        	info_stat.html("Category: " + d.cate + "<br />Epoch: " + d.model + "<br />Accuracy: " + d.accu + "<br />")
        			.style("font-size", "12px")
        			.style("color","#FCFCFC");

        	var all_imgs = d3.select("#all_imgs");
        	// all_imgs.html()
        	var new_imgs_t = list_images(d.model, d.cate, 't');
        	var new_imgs_p = list_images(d.model, d.cate, 'p');
        	var new_imgs_di = list_images(d.model, d.cate, 'di');
        	all_imgs.html(new_imgs_t + new_imgs_p + new_imgs_di)
        	// console.log(new_imgs)

            })
        .on("mouseout", function(d) {
            div.transition()    
                .duration(500)    
                .style("opacity", 0); 
        });

    // Add the title:
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .attr("class", "title")
        .style("font-size", "16px")
        .style("font-family", "Avenir")
        .style("fill", "#000000")
        .text(title);
  
    var ax = 
        d3.scaleBand()
        .domain(["Mountain", "Forest", "Buildings", "Sea", "Street"])
        .rangeRound([0, 267])
        .padding([0.1]);
    
    // Append y-axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0, -20)")
        .call(d3.axisLeft(ax))
        .selectAll(".tick text")
        .style("text-anchor", "end")
        .style("fill", "#000000")
        .style("font-size", "14px")
        .style("font-family", "Avenir")
        .attr("x", -10)
        .attr("y", 0);

    var bx = d3.scaleLinear()
      .domain([400, 0])         // This is what is written on the Axis: from 0 to 100
      .range([600, 10]);         // Note it is reversed

    svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(-10,247)")      // This controls the vertical position of the Axis
    .call(d3.axisBottom(bx))
    .selectAll(".tick text")
    .style("fill", "#000000")
    .style("font-size", "14px")
    .style("font-family", "Avenir");

  });
}

