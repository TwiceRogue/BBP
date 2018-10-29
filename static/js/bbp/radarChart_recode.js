/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
////////////////// VisualCinnamon.com ///////////////////
/////////// Inspired by the code of alangrafu ///////////
/////////////////////////////////////////////////////////


var margin = {top: 30, right: 10, bottom: 30, left: 10},
				width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
				height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

var data = [
				{ name: 'Patient 1',
					axes: [
						{axis: '手术年龄', value: 71},
						{axis: '心率', value: 111},
						{axis: '收缩压', value: 139},
						{axis: '舒张压', value: 64},
						{axis: 'HDL-C', value: 1.04},
						{axis: 'Pre_Crea', value: 101},
                        {axis: '术前低密度脂蛋白', value: 4.17},
                        {axis: '术前肌钙蛋白', value: 16.88},
                        {axis: '术前血红蛋白', value: 145},
                        {axis: 'Cric', value: 84},
                        {axis: 'D2B时间', value: 40},
                        {axis: 'RCA', value: 194},
                        {axis: '中段比例', value: 81},
                        {axis: '对比剂用量', value: 40},
                        {axis: '左主干动脉比例', value: 263},
                        {axis: '近段冠脉比例', value: 143}
					]
				},
				{ name: 'Patient 2',
					axes: [
						{axis: '手术年龄', value: 89},
						{axis: '心率', value: 109},
						{axis: '收缩压', value: 106},
						{axis: '舒张压', value: 59},
						{axis: 'HDL-C', value: 1.97},
						{axis: 'Pre_Crea', value: 75.96},
                        {axis: '术前低密度脂蛋白', value: 3.09},
                        {axis: '术前肌钙蛋白', value: 10.76},
                        {axis: '术前血红蛋白', value: 162},
                        {axis: 'Cric', value: 66},
                        {axis: 'D2B时间', value: 71},
                        {axis: 'RCA', value: 580},
                        {axis: '中段比例', value: 87},
                        {axis: '对比剂用量', value: 29},
                        {axis: '左主干动脉比例', value: 423},
                        {axis: '近段冠脉比例', value: 438}
					]
				}
			];

var color = d3.scaleOrdinal()
				.range(["#EDC951","#CC333F","#00A0B0"]);

			var radarChartOptions = {
			  w: 280,
			  h: 200,
			  margin: margin,
			  maxValue: 0.5,
			  levels: 1,
			  roundStrokes: true,
			  color: color
			};
			//Call function to draw the Radar chart

const max = Math.max;
const sin = Math.sin;
const cos = Math.cos;
const HALF_PI = Math.PI / 2;

const RadarChart = function RadarChart(parent_selector, data, options,maxValue_Array) {
	//Wraps SVG text - Taken from http://bl.ocks.org/mbostock/7555321
	const wrap = (text, width) => {
	  text.each(function() {
			var text = d3.select(this),
				words = text.text().split(/\s+/).reverse(),
				word,
				line = [],
				lineNumber = 0,
				lineHeight = 1.4, // ems
				y = text.attr("y"),
				x = text.attr("x"),
				dy = parseFloat(text.attr("dy")),
				tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

			while (word = words.pop()) {
			  line.push(word);
			  tspan.text(line.join(" "));
			  if (tspan.node().getComputedTextLength() > width) {
					line.pop();
					tspan.text(line.join(" "));
					line = [word];
					tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
			  }
			}
	  });
	}//wrap

	const cfg = {
	 w: 600,				//Width of the circle
	 h: 600,				//Height of the circle
	 margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
	 levels: 1,				//How many levels or inner circles should there be drawn
	 maxValue: 0, 			//What is the value that the biggest circle will represent
	 labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
	 wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
	 opacityArea: 0.0, 	//The opacity of the area of the blob
	 dotRadius: 2, 			//The size of the colored circles of each blog
	 opacityCircles: 0.1, 	//The opacity of the circles of each blob
	 strokeWidth: 2, 		//The width of the stroke around each blob
	 roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
	 color: d3.scaleOrdinal(d3.schemeCategory10),	//Color function,
	 format: '',
	 unit: '',
	 legend: false
	};

	//Put all of the options into a variable called cfg
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }//for i
	}//if

	//If the supplied maxValue is smaller than the actual one, replace by the max in the data
	// var maxValue = max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
	let maxValue = 0;
	let numaxes =  data[0].axes.length;
	//let maxValue_Array =  new Float32Array(data[0].axes.length);  // 每个轴的最大值

	// for (let j=0; j < data.length; j++) {
	// 	for (let i = 0; i < data[j].axes.length; i++) {
	// 		data[j].axes[i]['id'] = data[j].name;
	// 		if (data[j].axes[i]['value'] > maxValue_Array[i]) {
	// 			maxValue_Array[i] = data[j].axes[i]['value'];
	// 		}
	// 	}
	// }
	// 所有数据的最大值 把所有轴的数值都看做一起 没有把轴分开考虑
	maxValue = max(cfg.maxValue, maxValue);

	const allAxis = data[0].axes.map((i, j) => i.axis),	//Names of each axis
		total = allAxis.length,					//The number of different axes
		radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
		Format = d3.format(cfg.format),			 	//Formatting
		angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice" 轴数目的切片角度

	//Scale for the radius
	const rScale = d3.scaleLinear()
		.range([0, radius])
		.domain([0, maxValue]);
	//每个轴都应该会有一个比例尺

    console.log(maxValue_Array);
    let rScaleArray = [];
    for(let i=0;i<numaxes;i++){
        let rScale_temp = d3.scaleLinear()
		.range([0, radius])
		.domain([0, maxValue_Array[i]]);
        rScaleArray.push(rScale_temp);
    }
    console.log(rScaleArray);


	/////////////////////////////////////////////////////////
	//////////// Create the container SVG and g /////////////
	/////////////////////////////////////////////////////////
	const parent = d3.select(parent_selector);

	//Remove whatever chart with the same id/class was present before
	parent.select("svg").remove();

	//Initiate the radar chart SVG
	let svg = parent.append("svg")
			.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom+40)
			.attr("class", "radar");

	//Append a g element
	let g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");

	/////////////////////////////////////////////////////////
	////////// Glow filter for some extra pizzazz ///////////
	/////////////////////////////////////////////////////////

	//Filter for the outside glow
	let filter = g.append('defs').append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	/////////////////////////////////////////////////////////
	/////////////// Draw the Circular grid //////////////////
	/////////////////////////////////////////////////////////


    // 内有几个圆-level

	//Wrapper for the grid & axes
	let axisGrid = g.append("g").attr("class", "axisWrapper");

	//Draw the background circles
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", d => radius / cfg.levels * d)
		.style("fill", "#000000")
		.style("stroke", "#000000")
		.style("fill-opacity", cfg.opacityCircles)
		.style("filter" , "url(#glow)");

	//Text indicating at what % each level is
	axisGrid.selectAll(".axisLabel")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter().append("text")
	   .attr("class", "axisLabel")
	   .attr("x", 4)
	   .attr("y", d => -d * radius / cfg.levels)
	   .attr("dy", "0.4em")
	   .style("font-size", "10px")
	   .attr("fill", "#bbbbbb")
	   .text((d,i) => Format(maxValue_Array[i] * d / cfg.levels) + cfg.unit);

	/////////////////////////////////////////////////////////
	//////////////////// Draw the axes //////////////////////
	/////////////////////////////////////////////////////////

	//Create the straight lines radiating outward from the center
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()
		.append("g")
		.attr("class", "axis");
	//Append the lines
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", (d, i) => rScaleArray[i](maxValue_Array[i] *1.1) * cos(angleSlice * i - HALF_PI))
		.attr("y2", (d, i) => rScaleArray[i](maxValue_Array[i]* 1.1) * sin(angleSlice * i - HALF_PI))
		.attr("class", "line")
		.style("stroke", "white")
		.style("stroke-width", "2px");

	//Append the labels at each axis
	axis.append("text")
		.attr("class", "legend")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", (d,i) => rScaleArray[i](maxValue_Array[i] * cfg.labelFactor) * cos(angleSlice * i - HALF_PI))
		.attr("y", (d,i) => rScaleArray[i](maxValue_Array[i] * cfg.labelFactor) * sin(angleSlice * i - HALF_PI))
		.text(d => d)
		.call(wrap, cfg.wrapWidth);

	/////////////////////////////////////////////////////////
	///////////// Draw the radar chart blobs ////////////////
	/////////////////////////////////////////////////////////

	//The radial line function
	const radarLine = d3.radialLine()
		.curve(d3.curveLinearClosed)
		.radius((d,i) => rScaleArray[i](d.value))
		.angle((d,i) => i * angleSlice);

	if(cfg.roundStrokes) {
		radarLine.curve(d3.curveCardinalClosed)
	}

	//Create a wrapper for the blobs
	const blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarWrapper");

	//Append the backgrounds
	blobWrapper
		.append("path")
		.attr("class", "radarArea")
		.attr("d", d => radarLine(d.axes))
		.style("fill", (d,i) => cfg.color(i))
		.style("fill-opacity", cfg.opacityArea)
		.on('mouseover', function(d, i) {
			//Dim all blobs
			parent.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", 0.1);
			//Bring back the hovered over blob
			d3.select(this)
				.transition().duration(200)
				.style("fill-opacity", 0.7);
		})
		.on('mouseout', () => {
			//Bring back all blobs
			parent.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", cfg.opacityArea);
		});

	//Create the outlines
	blobWrapper.append("path")
		.attr("class", "radarStroke")
		.attr("d", function(d,i) { return radarLine(d.axes); })
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", (d,i) => cfg.color(i))
		.style("fill", "none")
		.style("filter" , "url(#glow)");

	//Append the circles
	blobWrapper.selectAll(".radarCircle")
		.data(d => d.axes)
		.enter()
		.append("circle")
		.attr("class", "radarCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", (d,i) => rScaleArray[i](d.value) * cos(angleSlice * i - HALF_PI))
		.attr("cy", (d,i) => rScaleArray[i](d.value) * sin(angleSlice * i - HALF_PI))
		.style("fill", (d) => cfg.color(d.id))
		.style("fill-opacity", 0.8);

	/////////////////////////////////////////////////////////
	//////// Append invisible circles for tooltip ///////////
	/////////////////////////////////////////////////////////

	//Wrapper for the invisible circles on top
	const blobCircleWrapper = g.selectAll(".radarCircleWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarCircleWrapper");

	//Append a set of invisible circles on top for the mouseover pop-up
	blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(d => d.axes)
		.enter().append("circle")
		.attr("class", "radarInvisibleCircle")
		.attr("r", cfg.dotRadius * 1.5)
		.attr("cx", (d,i) => rScaleArray[i](d.value) * cos(angleSlice*i - HALF_PI))
		.attr("cy", (d,i) => rScaleArray[i](d.value) * sin(angleSlice*i - HALF_PI))
		.style("fill", "none")
		.style("pointer-events", "all")
		.on("mouseover", function(d,i) {
			tooltip
				.attr('x', this.cx - 10)
				.attr('y', this.cy - 10)
				.transition()
				.style('display', 'block')
				.text(Format(d.value) + cfg.unit);
		})
		.on("mouseout", function(){
			tooltip.transition()
				.style('display', 'none').text('');
		});

	const tooltip = g.append("text")
		.attr("class", "tooltip")
		.attr('x', 0)
		.attr('y', 0)
		.style("font-size", "12px")
		.style('display', 'none')
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em");

	if (cfg.legend !== false && typeof cfg.legend === "object") {
		let legendZone = svg.append('g');
		let names = data.map(el => el.name);
		if (cfg.legend.title) {
			let title = legendZone.append("text")
				.attr("class", "title")
				.attr('transform', `translate(${cfg.legend.translateX},${cfg.legend.translateY})`)
				.attr("x", cfg.w - 70)
				.attr("y", 10)
				.attr("font-size", "12px")
				.attr("fill", "#404040")
				.text(cfg.legend.title);
		}
		let legend = legendZone.append("g")
			.attr("class", "legend")
			.attr("height", 100)
			.attr("width", 200)
			.attr('transform', `translate(${cfg.legend.translateX},${cfg.legend.translateY + 20})`);
		// Create rectangles markers
		legend.selectAll('rect')
		  .data(names)
		  .enter()
		  .append("rect")
		  .attr("x", cfg.w - 65)
		  .attr("y", (d,i) => i * 20)
		  .attr("width", 10)
		  .attr("height", 10)
		  .style("fill", (d,i) => cfg.color(i));
		// Create labels
		legend.selectAll('text')
		  .data(names)
		  .enter()
		  .append("text")
		  .attr("x", cfg.w - 52)
		  .attr("y", (d,i) => i * 20 + 9)
		  .attr("font-size", "11px")
		  .attr("fill", "#bbbbbb")
		  .text(d => d);
	}
	return svg;
}


