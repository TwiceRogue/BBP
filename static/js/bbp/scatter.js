/**
 * Created by cat on 2018/5/26.
 */

function drawScatterGraphOption(allData){
    var patientList = allData[0],
        DRPosistionMatrix_be = allData[1],
        DRPosistionMatrix_in = allData[2],
        DRPosistionMatrix_all = allData[3];
    drawSctterGraph(patientList, DRPosistionMatrix_be, "scattergraph_be");
    drawSctterGraph(patientList, DRPosistionMatrix_in, "scattergraph_in");
    drawSctterGraph(patientList, DRPosistionMatrix_all, "scattergraph_all");
}

function drawSctterGraph(patientList, DRPosistionMatrix, divname){
    //var patientList = allData[0],
    //    DRPosistionMatrix = allData[3];

    var scatterCircleR = 5;

    var circle_color = ['#74d97b','#0326ed', '#ff8201', '#ff2be9'];
    var div = document.getElementById(divname);
    var client_width = 750;
    var client_height = 350;
    var margin = {top:10, right: 10, bottom: 10, left: 10},
        width = client_width - margin.left - margin.right,
        height = client_height - margin.top - margin.bottom;
    var svg = d3.select("#"+divname).append("svg")
        .attr("width", client_width)
        .attr("height", client_height)
        .attr("id", divname+"Svg");

    var x = d3.scaleLinear().range([0, width]).domain(d3.extent(DRPosistionMatrix, function(d){ return d[0];}));
    var y = d3.scaleLinear().range([0, height]).domain(d3.extent(DRPosistionMatrix, function(d){ return d[1];}));

    var circleG = svg.append("g")
        .attr("class", "circleG")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var circles = circleG.selectAll(".scatterCircle").data(DRPosistionMatrix)
        .enter().append("circle")
        .attr("class", "scatterCircle")
        .attr("id", function(d, i){return "scatterCircle_"+i;})
        .attr("cx", function(d){
            return x(d[0]);
        })
        .attr("cy", function(d){
            return y(d[1]);
        })
        .attr("r", scatterCircleR)
        .attr("fill", function(d, i){
            var aki = patientList[i][4];
            return circle_color[aki];
        });

    var brush = d3.brush()
        .extent([[0, 0], [width, height]])
        .on("start brush", brushed)
        .on("end", brushended);

    svg.append("g")
        .attr("class", "brush")
        .call(brush);

    function brushed() {
        // console.log( d3.event.selection );
        var s = d3.event.selection;

        circles.classed("active", function(d) { return x(d[0]) >= s[0][0] && x(d[0]) <= s[1][0] && y(d[1]) >= s[0][1] && y(d[1]) <= s[1][1]; });
    }

    function brushended() {
        console.log('end');
        if (!d3.event.selection) {
//             console.log('There is no selection');
            circles.classed("active", false);
        }else{
            var idList = [];
            var selected_circles = d3.selectAll('.scatterCircle.active').each(function(d, i){
                var id = parseInt(d3.select(this).attr("id").split("_")[1]);
                idList.push(id);
            });
            drawTable_selected(idList, patientList);
            drawPie_selected(idList, patientList);
        }
    }
}
