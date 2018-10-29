/**
 * Created by cat on 2018/6/6.
 */

function drawPie_selected(idList, patientList){
    var akiArr = [0, 0, 0, 0];
    idList.forEach(function(id){
        akiArr[patientList[id][4]]++;
    });
    var pieData = [];
    for(var i = 0; i < akiArr.length; i++){
        pieData.push([i, akiArr[i]]);
    }
    drawPie(pieData, "piegraph");
}

function drawPie(pieData, divname){
    $('#' + divname).empty();


    var div = document.getElementById(divname);
    var client_width = div.clientWidth;
    var client_height = div.clientHeight;
    var margin = {top:30, right: 30, bottom: 50, left: 30},
        width = client_width - margin.left - margin.right,
        height = client_height - margin.top - margin.bottom;


    var svg = d3.select("#"+divname).append("svg")
        .attr("width", client_width)
        .attr("height", client_height)
        .attr("id", divname+"Svg");

    var radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//     var color = d3.scaleOrdinal(['#2c46c8', '#ff40e9', '#ff8201', '#6d9e14']);
    var color = d3.scaleOrdinal(['#74d97b','#0326ed', '#ff8201', '#ff2be9']);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d[1]; });

    var path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var arc = g.selectAll(".arc")
        .data(pie(pieData))
        .enter().append("g")
        .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { 
        return color(d.data[0]); 
        });

    arc.append("text")
        .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
        .attr("dy", "0.35em")
        .text(function(d) { return d.data[0]; });

}
