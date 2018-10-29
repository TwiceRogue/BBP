///**
// * Created by sky on 18/07/2018.
// */
//
//function drawStoryLines(allData,patientID){
//
////	patientID = patientID||0;
//	var element = d3.select("#spgraph");
//	var div = document.getElementById('spgraph');
//	$('#spgraph').empty();
////	console.log(div.clientWidth);
////	console.log(div.clientHeight);
//    var width = div.clientWidth*0.8,height =div.clientHeight*0.8;
//    var margin = [30,20];
//    var svg = d3.select("#spgraph").append("svg")
//        .attr("width",width)
//        .attr("height",height)
//        .attr("id", "spgraphSvg")
//        .attr("transform","translate(" + div.clientWidth*0.1  + "," + div.clientHeight*0.1 + ")");
//	var color_stage = ['#92D050','#00B050','#00B0F0','#0070C0','#FF0000','#FFE900'];
//
//	var colorArr = ["#fed98e","#fe9929","#cc4c02","#993404"];
//
//
//	//for(var j= 1;j<6;j++){
//	//	allData[j].forEach(function(element,index,list){
//	//	list[index].push(index);
//	//});
//	//}
//	//console.log(allData[0]);
//    var maxStageIndex = 0;
//
//    for(var now_i = 0;now_i<allStageName.length;now_i++ ){
////        console.log("fuck");
////        console.log(document.getElementById("sumattr"+now_i+"-td3").innerHTML);
//        if(document.getElementsByClassName("stageNavSpan")[now_i].innerHTML.indexOf("(不显示)")==-1)
//        {
//            maxStageIndex++;
//            continue;
//        }
//
//    }
//    if(maxStageIndex==6) maxStageIndex=5;
////    console.log(maxStageIndex);
//
//	//console.log(allData[1]);
//	var patientList = allData[0];
////	console.log(patientList);
//    var stage_in =  allData[1];
////    console.log(stage_in);
//
//    var stage_early = allData[2];
//
//	var stage_before = allData[3];
////	console.log(stage_before);
//
//	var stage_during = allData[4];
//
//	var stage_after = allData[5];
//
//	var distance_array = [];
//	for(var id = 0;id<allData[0].length;id++){
////		var distance  = Math.sqrt((stage_in[id][0]-stage_in[patientID][0])*(stage_in[id][0]-stage_in[patientID][0])+
////		(stage_early[id][0]-stage_early[patientID][0])*(stage_early[id][0]-stage_early[patientID][0])+
////			(stage_before[id][0]-stage_before[patientID][0])*(stage_before[id][0]-stage_before[patientID][0])+
////			(stage_during[id][0]-stage_during[patientID][0])*(stage_during[id][0]-stage_during[patientID][0])+
////		(stage_after[id][0]-stage_after[patientID][0])*(stage_after[id][0]-stage_after[patientID][0]));
//        var distance = 0;
//        for(var stageIndex=1;stageIndex<=maxStageIndex;stageIndex++){
//            distance+=Math.pow((allData[stageIndex][id][0]-allData[stageIndex][patientID][0]),2);
////            if(stageIndex==3&&id==1) console.log(Math.pow((allData[stageIndex][id][0]-allData[stageIndex][patientID][0]),2));
//        }
//        distance=Math.pow(distance,2);
//		var temp = [distance,id];
//		distance_array.push(temp);
//	}
//	distance_array.sort(function(x,y){return x[0]-y[0]});
//
//	var patientList_sort = [];
//    for(var i = 0;i<50;i++){
//        patientList_sort.push(allPatientList[distance_array[i][1]]);
//    }
//
////	console.log(distance_array[1]);
//	//var result = stage_in[];
//
//    //console.log(stage_after[0]);
//    //console.log(stage_in[0][0]*1.1);
//    //console.log(stage_in[5][0]*1.2);
//	var data_in=[];
//	var data_early=[];
//	var data_before=[];
//	var data_during = [];
//	var data_after = [];
//	for(var k =1;k<11;k++){
//		data_in.push(stage_in[distance_array[k][1]][0]);
//		data_early.push(stage_early[distance_array[k][1]][0]);
//		data_before.push(stage_before[distance_array[k][1]][0]);
//		data_during.push(stage_during[distance_array[k][1]][0]);
//		data_after.push(stage_after[distance_array[k][1]][0]);
//	}
////	console.log(data_after);
////	console.log(d3.min(data_after));
////	console.log(d3.max(data_after));
//
//    var yScale_in = d3.scaleLinear()
//		.domain([d3.min(data_in)-Math.abs(d3.min(data_in)*0.1),d3.max(data_in)+Math.abs(d3.max(data_in)*0.1)])
//	    .range( [height-margin[0],margin[0]]);
//    var yScale_early = d3.scaleLinear()
//		.domain([d3.min(data_early)-Math.abs(d3.min(data_early)*0.1),d3.max(data_early)+Math.abs(d3.max(data_early)*0.1)])
//	    .range( [height-margin[0],margin[0]]);
//    var yScale_before = d3.scaleLinear()
//		.domain([d3.min(data_before)-Math.abs(d3.min(data_before)*0.1),d3.max(data_before)+Math.abs(d3.max(data_before)*0.1)])
//	    .range( [height-margin[0],margin[0]]);
//    var yScale_during = d3.scaleLinear()
//		.domain([d3.min(data_during)-Math.abs(d3.min(data_during)*0.1),d3.max(data_during)+Math.abs(d3.max(data_during)*0.1)])
//	    .range( [height-margin[0],margin[0]]);
//    var yScale_after = d3.scaleLinear()
//		.domain([d3.min(data_after)-Math.abs(d3.min(data_after)*0.1),d3.max(data_after)+Math.abs(d3.min(data_after)*0.1)])
//	    .range( [height-margin[0],margin[0]]);
//
//
//	//定义y轴
//	var yAxis_in = d3.axisLeft()
//        .ticks(0)
//		.scale(yScale_in);
//
//    var yAxis_early = d3.axisLeft()
//        .ticks(0)
//		.scale(yScale_early);
//
//    var yAxis_before = d3.axisLeft()
//        .ticks(0)
//		.scale(yScale_before);
//
//    var yAxis_during = d3.axisLeft()
//        .ticks(0)
//		.scale(yScale_during);
//
//    var yAxis_after = d3.axisLeft()
//        .ticks(0)
//		.scale(yScale_after);
//
//    svg.append("g")
//		.attr("class","y_axis_story")
//		.attr("transform","translate(" + (width/5 * 0+margin[1])  + "," + margin[0] + ")")
//		.append("line")
//		.attr("x1",0)
//		.attr("y1",0)
//		.attr("x2",0)
//		.attr("y2",height-2*margin[0])
//		.attr("stroke","#000");
//
//    svg.append("g")
//		.attr("class","y_axis_story")
//		.attr("transform","translate(" + (width/5 * 1+margin[1])  + "," + margin[0] + ")")
//		.append("line")
//		.attr("x1",0)
//		.attr("y1",0)
//		.attr("x2",0)
//		.attr("y2",height-2*margin[0])
//		.attr("stroke","#000");
//
//    svg.append("g")
//		.attr("class","y_axis_story")
//		.attr("transform","translate(" + (width/5 * 2+margin[1])  + "," + margin[0] + ")")
//		.append("line")
//		.attr("x1",0)
//		.attr("y1",0)
//		.attr("x2",0)
//		.attr("y2",height-2*margin[0])
//		.attr("stroke","#000");
//
//    svg.append("g")
//		.attr("class","y_axis_story")
//		.attr("transform","translate(" + (width/5 * 3+margin[1])  + "," + margin[0] + ")")
//		.append("line")
//		.attr("x1",0)
//		.attr("y1",0)
//		.attr("x2",0)
//		.attr("y2",height-2*margin[0])
//		.attr("stroke","#000");
//    svg.append("g")
//		.attr("class","y_axis_story")
//		.attr("transform","translate(" + (width/5 * 4+margin[1])  + "," + margin[0] + ")")
//		.append("line")
//		.attr("x1",0)
//		.attr("y1",0)
//		.attr("x2",0)
//		.attr("y2",height-2*margin[0])
//		.attr("stroke","#000");
//
//
//	for (var i =0 ;i<10;i++){
//		var lineData=[{"x":width/5 * 0+margin[1],   "y":yScale_in(data_in[i])},  {"x":width/5 * 1+margin[1],  "y":yScale_early(data_early[i])},
//                 {"x":width/5 * 2+margin[1],  "y":yScale_before(data_before[i])},{"x":width/5 * 3+margin[1],  "y":yScale_during(data_during[i])},
//                 {"x":width/5 * 4+margin[1],  "y":yScale_after(data_after[i])}];
//	//console.log(stage_in[i][0]);
//	var lineFunction = d3.line()
//                         .x(function(d){return d.x;})
//                         .y(function(d){return d.y;});
//
//	//var path_in = d3.path().moveTo((width/5 * 0+margin[1]),yAxis_in(stage_in[0])).moveTo((width/5 * 1+margin[1]),yAxis_early(stage_early[0]));
//
//	var lineGraph = svg.append("path")
//                            .attr("d",lineFunction(lineData))
//                            .attr("stroke",colorArr[patientList[distance_array[i][1]][4]])
//                            .attr("stroke-width",2)
//                            .attr("fill","none");
////    console.log(patientList[distance_array[i][1]][4]);
//	}
//	var stage_name = ["入院","早期评估","术前","术中","术后"];
//	for(var i = 0;i<5;i++){
//	    svg.append("text")
//	        .text(stage_name[i])
//	        .attr("stroke","#000")
//	        .attr("text-align","center")
//	        .attr("stroke-width",0)
//	        .attr("text-anchor","middle")
//            .attr("transform","translate(" + (width/5 * i+margin[1])  + "," + (height-10) + ")")
//	}
//    return distance_array;
//}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function get_colors(n) {
    var colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b"];

    return colors[ n % colors.length];
}


function drawStoryLines(allData,patientID){

// //	patientID = patientID||0;
	var element = d3.select("#spgraph");
	var div = document.getElementById('spgraph');
	$('#spgraph').empty();
	// console.log(div.clientWidth);
	// console.log(div.clientHeight);
    var width = div.clientWidth*0.8,height =div.clientHeight*0.8;
    // var margin = [0, 40];
    var svg = d3.select("#spgraph").append("svg")
        .attr("width",width)
        .attr("height",height)
        .attr("id", "spgraphSvg")
        .attr("transform","translate(" + div.clientWidth*0.1  + "," + div.clientHeight*0.1 + ")");
     // var g = svg.append("g")
     //     .attr("transform", "translate(" + margin[1] + "," + margin[0] + ")");

    var margin = {top: 10, right: 40, bottom: 20, left: 35},
        margin_width = +svg.attr("width") - margin.left - margin.right,
        margin_height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var dates = ['入院','早期评估','术前','术中','术后','出院后'];

    //set x scale
    var x = d3.scaleOrdinal()
        .domain(dates)
        .range([0, 90,180,270,360,450]);

    // var x = d3.scaleBand()
    //     .domain(dates)
    //     .rangeRound([0, margin_width]);

    //set y scale
    var y = d3.scaleLinear()
        .rangeRound([margin_height, 0]);

    var keys = ['0', '1', '2', '3'];
    //set color scale
    var color = d3.scaleOrdinal()
        .domain(keys)
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b"]);

    //draw axises
    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + margin_height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"));

    //draw icons
    var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice())
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", margin_width + 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", color);

    legend.append("text")
        .attr("x", margin_width + 14)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });

//     legend.append("text")
//      .attr("x",margin_width+14)
// //      .attr("dy", "0.75em")
//      .attr("y",12)
//      .text("Aki Stage");
	// var color_stage = ['#92D050','#00B050','#00B0F0','#0070C0','#FF0000','#FFE900'];

// 	var colorArr = ["#fed98e","#fe9929","#cc4c02","#993404"];
//
//
	for(var j= 1;j<6;j++){
		allData[j].forEach(function(element,index,list){
		list[index].push(index);
	});
	}
	// console.log(allData[0]);
    var maxStageIndex = 0;
//
    for(var now_i = 0;now_i<allStageName.length;now_i++ ){
//        console.log("fuck");
//        console.log(document.getElementById("sumattr"+now_i+"-td3").innerHTML);
        if(document.getElementsByClassName("stageNavSpan")[now_i].innerHTML.indexOf("(不显示)")==-1)
        {
            maxStageIndex++;
            continue;
        }

    }
    if(maxStageIndex==6) maxStageIndex=5;
    // console.log(maxStageIndex);

	var patientList = allData[0];
	// console.log(patientList);

	var stage_in =  allData[1];
   // console.log(stage_in);

    var stage_early = allData[2];	//从绝对值小到大的排序......

	var stage_before = allData[3];

	var stage_during = allData[4];

	var stage_after = allData[5];

	var distance_array = [];

    for(var id = 0;id<allData[0].length;id++){
        var distance = 0;
        for(var stageIndex=1;stageIndex<=maxStageIndex;stageIndex++){
            distance += Math.pow((allData[stageIndex][id][0]-allData[stageIndex][patientID][0]),2);
        }
        distance=Math.pow(distance,2);
		var temp = [distance,id];
		distance_array.push(temp);
	}
	distance_array.sort(function(x,y){return x[0]-y[0]});

    var distance_temp = [];

    for(var id = 0;id<allData[0].length;id++){
        var distance = 0;
        var distance_group = [];
        var distance_sum = [];
        for(var stageIndex=1;stageIndex<=maxStageIndex;stageIndex++){
            distance_group[stageIndex-1] = Math.pow((allData[stageIndex][id][0]-allData[stageIndex][patientID][0]),2);
            distance += distance_group[stageIndex-1];
            distance_sum[stageIndex-1] = distance;//不同阶段的欧式距离
        }
        var distance_square = [];
        var temp = [];
        for(var stageIndex=1;stageIndex<=maxStageIndex;stageIndex++){
            temp[stageIndex-1] = [];
            distance_square[stageIndex-1] = Math.pow(distance_sum[stageIndex-1],2);
            temp[stageIndex-1].push([distance_square[stageIndex-1],id]);
        }
		distance_temp.push(temp);
	}
	//将数组第一维设为stage
    var distanceByStage = [];

    for(var stage = 0;stage<maxStageIndex;stage++){
        distanceByStage[stage] = [];
        for(var i = 0;i<allData[0].length;i++){
            distanceByStage[stage].push(distance_temp[i][stage]);
        }
        // distanceByStage = distance_array[stage];
        distanceByStage[stage].sort(function(x,y){return x[0][0]-y[0][0]});
    }
    console.log(distanceByStage);

	var patientList_sort = [];
	for(var stage=0; stage<maxStageIndex;stage++)
	{
        patientList_sort[stage] = [];
	    for(var i = 0;i<50;i++)
    {
        patientList_sort[stage].push(allPatientList[distanceByStage[stage][i][0][1]]);
    }
    }
    // console.log(patientList_sort);

    var tempList = [];
    for(var i=0;i<allData[0].length;i++) tempList.push(i);
    var idList=arguments[1]?arguments[1]:tempList;

    var aki_stage_all = [];
    // console.log(idList);
    for(var j=0;j < maxStageIndex;j++){
        aki_stage_all[j] = [];
        for (var i = 0;i < patientList_sort[j].length;i++)
    {
        var aki_stage = patientList_sort[j][i][4];
        // console.log(aki_stage);
        // if(idList.indexOf(i)==-1) continue;
         if (aki_stage_all[j][aki_stage] == undefined)
             aki_stage_all[j][aki_stage] = 1;
         else aki_stage_all[j][aki_stage]++;
    }
    }
    // console.log(aki_stage_all);

    // aki_stage_all.unshift([0,0,0,0]);

    for(var j= 0;j<aki_stage_all.length;j++){
        for (var aki_stage = 0;aki_stage<4;aki_stage++){
            if (aki_stage_all[j][aki_stage]==undefined)
                aki_stage_all[j][aki_stage] = 0;
        }
		aki_stage_all[j].forEach(function(element,index,list){
		list[index] = list[index] / 50;
	});
	}
    console.log(aki_stage_all);

    //set area
    var area = d3.area()
        .x(function(d, i) { return x(dates[i]); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); });

    var stack = d3.stack()
        .keys(d3.range(keys.length));
    stack.keys(keys);

    //draw areas
    g.selectAll(".layer").remove();

    var layer = g.selectAll(".layer")
            .data(stack(aki_stage_all))
            .enter().append("g")
            .attr("class", "layer");

        layer.append("path")
            .attr("class", "area")
            .style("fill", function(d, i) {
     	        return get_colors(i);
            })
            .attr("d", area);

    var data_in=[];
	var data_early=[];
	var data_before=[];
	var data_during = [];
	var data_after = [];
	for(var k =1;k<11;k++){
		data_in.push(stage_in[distance_array[k][1]][0]);
		data_early.push(stage_early[distance_array[k][1]][0]);
		data_before.push(stage_before[distance_array[k][1]][0]);
		data_during.push(stage_during[distance_array[k][1]][0]);
		data_after.push(stage_after[distance_array[k][1]][0]);
	}

    return distance_array;
}