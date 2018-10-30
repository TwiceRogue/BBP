/**
 * Created by cat on 2018/6/6.
 */

//4 aki_stage

var selection_domain=[];
function drawTable_withTable_editByYu20180919(patientDictList_all,patientDictList,column_names,divname){
//    console.log('DataTable');
    //console.log(patientList);
//    cross_patientList_all = patientList_all;
//    cross_patientList = patientList;
    allPatientDictList_filtered = patientDictList_all;

    cross_divname = divname;
    cross_column_names = column_names;

    var margin = {top: 30, right: 30, bottom: 50, left: 30};
    var div = document.getElementById(divname);

    var colorArr = ['#8D483C', '#94494D', '#954D5F', '#925572', '#885E82', '#796990', '#657399', '#4E7D9D', '#33869A',
        '#1C8E93', '#1A9586', '#319A77', '#4D9D66', '#689F55', '#84A046', '#A09E3D', '#BC9B3C', '#D69644', '#ED9154', '#000000'];
    var aki_color = ['#74d97b', '#0326ed', '#ff8201', '#ff2be9'];

    var th_height = 20, tr_width = 80; // tr_width = width/patientList[0].length;
    var rect_r = 10, circle_r = th_height / 2.2;

//    var rScale_age = d3.scaleLinear().range([0, circle_r]).domain([10, 100]);  // 年龄
//    var rScale_ml = d3.scaleLinear().range([0, circle_r]).domain(d3.extent(patientList, function (d) {
//        return d[12];
//    }));  // 对比剂用量ml
//    var rScale_gfr = d3.scaleLinear().range([0, circle_r]).domain(d3.extent(patientList, function (d) {
//        return d[13];
//    })); // gfr 肾小球过滤率
//    var rScale_hdlc = d3.scaleLinear().range([0, 70]).domain(d3.extent(patientList, function (d) {
//        return d[16];
//    })); // hdlc
//    var rScale_aki = d3.scaleLinear().range([0, circle_r]).domain([0, 3]);  // 年龄
//    var rScale_pre_crea = d3.scaleLinear().range([0, tr_width]).domain(d3.extent(patientList, function (d) {
//        return d[18];
//    }));  // pre_crea


    var header_text = ['Confidence', '住院号', '手术日期', '住院日期', '出院日期', '肾损伤', '手术年龄', '性别',
        'anemia', '糖尿病', '心力衰竭', 'IABP', 'hypotension', '对比剂用量', 'gfr', '心肌梗死史',
        'Hypercholesterolemia', 'HDL_C', 'urgent_PCI', 'Pre_Crea', '高血压', '主动脉球囊反搏', '心肌梗死', '吸烟',
        '血脂异常', '肾功能异常', "冠心病家族史", "早发冠心病家族史", "CABG手术史", "糖尿病治疗方案", "出血性脑血管疾病", "外周动脉疾病", "慢性肺病", "心率", "收缩压", "舒张压",
        "对比剂类型", "诊断性导管术", "造影结论", "左主干冠状动脉", "近段冠状动脉", "中段/远段/对角支冠状动脉", "Circ.OMs.LPDA.LPL",
        "RCA.RPDA.RPL.AM", "桥血管", "PCI状态", "PCI指征", "D2B 时间", "普通肝素", "阿司匹林(PCI)", "比伐卢定", "直接凝血酶抑制剂",
        "IIb/IIIa受体拮抗剂", "氯吡格雷(PCI)", "普拉格雷(PCI)", "替卡格雷", "噻氯吡啶(PCI)", "术前肌钙蛋白I", "术前血红蛋白", "术前低密度脂蛋白", "术后肌钙蛋白I",
        "术后血红蛋白", "术后低密度脂蛋白", "对比剂过敏"];
    var stage_in_hos_index = [2, 5, 6, 7, 8, 11, 13, 14, 15, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    var stage_pre_index = [32, 33, 34, 36];
    var stage_pre_proce_index = [16, 18, 56, 57, 58];
    var stage_in_proce_index = [1, 10, 12, 17, 20, 35, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 52, 53, 54, 55, 62];
    var stage_after_proce_index = [4, 9, 59, 60, 61];
    var stage_out_hos_index = [3, 51];

    var stage_all = [stage_in_hos_index, stage_pre_index, stage_pre_proce_index, stage_in_proce_index, stage_after_proce_index, stage_out_hos_index];

    var stage_col = [];
    var color_categorical_2 = ["blue","orange"];
    var color_categorical_3 = ['#fc8d59', '#ffffbf', '#91bfdb'];
    var color_categorical_8 = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'];
    var color_stage = ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae'];
    stage_col[0] = stage_col[1] = -1;
    for (var i = 0; i < 64; i++) {
        if (stage_in_hos_index.indexOf(i - 1) != -1) stage_col[i] = 0;
        if (stage_pre_index.indexOf(i - 1) != -1) stage_col[i] = 1;
        if (stage_pre_proce_index.indexOf(i - 1) != -1) stage_col[i] = 2;
        if (stage_in_proce_index.indexOf(i - 1) != -1) stage_col[i] = 3;
        if (stage_after_proce_index.indexOf(i - 1) != -1) stage_col[i] = 4;
        if (stage_out_hos_index.indexOf(i - 1) != -1) stage_col[i] = 5;
    }

    $('#apgraph').empty();
//    var head_div = document.createElement('div');
//    head_div.setAttribute('class', 'row head');
//    document.getElementById('apgraph').appendChild(head_div);
    var table = document.createElement('table');
    table.setAttribute('width', '100%');
    table.setAttribute('id', 'table');
    var body = document.createElement('tbody');
    for (var i = 0; i < 52; i++) {                                                      //表一页显示52行
        var tr = document.createElement('tr');

        for (var j = -1; j < column_names.length; j++) {
            var td = document.createElement('td');
            var di = document.createElement('div');
            var svg_c = document.createElement('svg');
            var m = document.createTextNode(i + ',' + j);
            td.appendChild(di);
            //di.appendChild(m);

//            svg_c.setAttribute('id','s-'+'r'+i+'c'+j);
//            svg_c.setAttribute('class','r'+i+' '+'c'+j+' '+'cell-svg');
//            svg_c.setAttribute('width',tr_width.toString()+'px');
//            svg_c.setAttribute('height',th_height.toString()+'px');
            di.setAttribute('class', 'cell-div' + ' ' + 'd-r' + i + 'c' + j + ' ' + 'row' + i + ' ' + 'col' + j);

            tr.appendChild(td);
            td.setAttribute('class', 'cell' + ' ' + 'tdcol' + j);
//            di.appendChild(svg_c);

        }  //建表
        if (i != 0 && i != 1) {
            if (i % 2 == 0) tr.setAttribute("bgcolor", "#f7f7f7");
//            tr.onclick = function () {
//                var id = this.id;
//                var row_no = parseInt(id.substring(4, id.length));
//                var patient_no = parseInt(document.getElementsByClassName("row" + row_no + " " + "col1")[0].textContent);
//                console.log(id);
//                var reducmenu = d3.select("#reduc_menu select");
//                var reductype = reducmenu.property("value");
//                var weightArray = [];
//                var inputArray = document.getElementsByClassName("inputW1");
//                for (var i = 0; i < inputArray.length; i++) {
//                    weightArray.push(parseFloat(inputArray[i].value))
//                }
//                console.log(weightArray);
//                $.ajax({
//                    type: "POST",
//                    url: "/showStoryLines/",
//                    traditional: true,
//                    data: {
//                        'reduction_method': reductype,
//                        'weightArray': weightArray
//                    },
//                    success: function (data) {
//                        //drawScatterGraphOption(data);
//                        //drawTable_all(data);
//                        //              drawStatistical_all(data);
//                        //drawTable_test(data);
//                        //var distance_array = drawStoryLines(data, patient_no);
//                        //drawSimilarPatient(patientList_all,distance_array,divname);
//                    }
//                });
//            };
        }
        tr.setAttribute("id", "tr-r" + i);
        body.appendChild(tr);
    }

    table.appendChild(body);
    document.getElementById('apgraph').appendChild(table);
    table.setAttribute('border', '0');

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0.0);

    var numerical = [5, 12, 13, 16, 18, 32, 33, 34, 38, 39, 40, 41, 42, 46, 56, 57, 58, 59, 60, 61];
//    for (var i = 0; i < column_names.length; i++) {
//        var div_pos = '.d-' + 'r' + '-1' + 'c' + i;
//        var di = document.createElement('div');
//        di.setAttribute('class', div_pos);
//        head_div.appendChild(di);
//    }
    for (var i = -1; i < column_names.length; i++) {                    //表头属性
        var div_pos = '.d-' + 'r' + 0 + 'c' + i;
        //console.log(div_pos);
        var head_g = d3.select(div_pos).append('div')
            .attr("class", "th_head")
            .style('width', tr_width).style('height', th_height);


         if(i ==-1){
              head_g.append("text")
            .text("Rank")
            .attr('class', 'head_text')
            .attr('text-anchor', 'middle')
            .attr('title','Rank')
            .style('z-index', '20')
            .attr("transform", "translate(" + tr_width / 2 + "," + th_height / 2 + ")");
            var div_summary_name = 's-c' + i;


            head_g.append('div')
            .attr('class', 'data-summary')
            .attr('id', div_summary_name);
        }
        else{
             head_g.append("text")
            .text(column_names[i])
            .attr('class', 'head_text')
            .attr('text-anchor', 'middle')
                 .attr('title',column_names[i])
            .style('z-index', '20')
            .attr("transform", "translate(" + tr_width / 2 + "," + th_height / 2 + ")");

        var div_summary_name = 's-c' + i;

        head_g.append('div')
            .attr('class', 'data-summary')
            .attr('id', div_summary_name);

         }


    }


    var toolbar = d3.selectAll('.th_head').append('div')
        .attr('class', 'toolbar').style('font-size','10px');
    var i_label = d3.selectAll(".toolbar").append('i')
        .attr('class', 'fa fa-toggle-left').attr('title', 'collapse').style('font-size','10px');
     var i_label = d3.selectAll(".toolbar").append('i')
        .attr('class', 'fa fa-close').attr('title', 'hide').style('font-size','10px');
    // var i_label = d3.selectAll(".toolbar").append('i')
    //     .attr('class', 'fa fa-pencil-square-o').attr('title', 'rename').style('font-size','10px');
    var i_label = d3.selectAll(".toolbar").append('i')
        .attr('class', 'fa fa-filter').attr('title', 'filter').style('font-size','10px');
    var i_label = d3.selectAll(".toolbar").append('i')
        .attr('class', 'fa fa-list-ol').attr('title', 'sort').style('font-size','10px');
    var i_label = d3.selectAll(".toolbar").append('i')
        .attr('class', 'fa fa-pie-chart').attr('title', 'vis').style('font-size','10px');

    var head = $(".th_head");

    head.hover(function () {
        $(this).children(".toolbar").css("display", 'inline-block');
    }, function () {
        $(this).children(".toolbar").css('display', 'none');
    });
     $('.fa-close').click(function () {
        var p_div_toolbar = this.parentNode;
        var p_div = p_div_toolbar.parentNode;
        var classname = p_div.parentNode.className;
        var cname = classname.split(" ");
        var colclass = cname.pop();
        console.log(colclass);
        //var this_classname = p_div_toolbar.className.split(' ');
        var hide_col_name =  '.td'+colclass;
        console.log(hide_col_name);
        $(hide_col_name).hide();
    });
    $('.fa-toggle-left').click(function () {
        //$(this).removeClass('toolbar');
        var p_div_toolbar = this.parentNode;
        var p_div = p_div_toolbar.parentNode;
        var classname = p_div.parentNode.className;
        var cname = classname.split(" ");
        var colclass = cname.pop();
        console.log(colclass);
        var this_classname = p_div_toolbar.className.split(' ');
        var if_compress = this_classname.pop();
        //console.log(p_div_toolbar);


        if (if_compress != 'compress-toolbar') {
            $('.' + colclass).css('width', 30);
            $('.' + colclass).children("svg").css('width', 30);
            $('.' + colclass).children("svg").children('text').css('display', 'none');
            $('.' + colclass).children("svg").children('circle').css('cx', 30 / 2);
            $('.' + colclass).children("svg").children('.tableRect-NA').css('width',10);
            $('.' + colclass).children("svg").children('.tableRect-NA').css('height',10);


            $(p_div_toolbar).css('right', 0);
            $(this).siblings().css('display', 'none');           // toolbar 只剩一个按钮
            $(p_div_toolbar).css('width', 15);
            $(p_div_toolbar).css('text-align', 'left');
            $(p_div).css('text-align', 'left');
            $(p_div).children('text').css('width', 15);
            $(p_div).children('.data-summary').css('width', 30);

            //console.log(before_width);
            var before_width = $(p_div).children('.data-summary').children('div').length;
            $(p_div).children('.data-summary').children('div').css('width', 30 / before_width);    // 柱形图变小
            //$(p_div).children('div').css('width',30);
            $(p_div_toolbar).addClass('compress-toolbar');
            $(p_div_toolbar).css('text_align', 'left');

            //console.log($(this).siblings());
        }
        else {
            //colclass = cname.pop();
            $('.' + colclass).css('width', 80);
            $('.' + colclass).children("svg").children('.tableRect-NA').css('width',80*0.9);
            $('.' + colclass).children("svg").children('.tableRect-NA').css('height',20*0.9);

            $(p_div_toolbar).css('width', 80);
            $(this).siblings().css('display', 'inline-block');
            $(p_div).css('text-align', 'center');
            $('.' + colclass).children("svg").css('width', 80);
            //$(p_div).children('div').css('width',70);
            $('.' + colclass).children("svg").children('text').css('display', 'inline-block');
            $('.' + colclass).children("svg").children('circle').css('cx', 80 / 2);
            $(p_div).children('text').css('display', 'inline-block');
            $(p_div).children('text').css('width', 80);
            $(p_div).children('.data-summary').css('width', 80);

            var before_width = $(p_div).children('.data-summary').children('div').length;

            $(p_div).children('.data-summary').children('div').css('width', 80 / before_width);
            $(p_div_toolbar).css('right', 5);
            $(p_div_toolbar).removeClass('compress-toolbar');
        }

    });
    // $('.fa-pencil-square-o').click(
    //     function () {
    //         var left = $(this).offset().left;
    //         //alert(left);
    //         var top = $(this).offset().top;
    //         //alert(top);
    //
    //         var positionX = left;
    //         var positionY = top;
    //         var myOffset = new Object();
    //         myOffset.left = positionX;
    //         myOffset.top = positionY;
    //         //$("#MyDiv").offset(myOffset);
    //         $("#MyDiv").css({position: "absolute", 'top': top, 'left': left, 'z-index': 2});
    //         $("#MyDiv").width(162);
    //         $("#MyDiv").height(200);
    //         var div1 = $('#MyDiv').show();
    //     }
    // );
    $('.fa-filter').click(function () {               // 筛选

            var p_div_toolbar = this.parentNode;
            var p_div = p_div_toolbar.parentNode;
            var classname = p_div.parentNode.className;
            console.log(classname);
            var cname = classname.split(" ");
            var colclass = cname.pop();
            var col_num = parseInt(colclass.substring(3));
            var left = $(this).offset().left;
            //alert(left);
            var top = $(this).offset().top;
            //alert(top);

            var positionX = left;
            var positionY = top;
            var myOffset = {};
            myOffset.left = positionX;
            myOffset.top = positionY;
            //$("#MyDiv").offset(myOffset);
            $("#filter-pop").css({position: "absolute", 'top': top+10, 'left': left+10, 'z-index': 2});
            // $("#filter-pop").width(330);
            // $("#filter-pop").height(500);
            console.log(columsName[col_num]);
            var filter_html = "";

            if (attributeNumericalList.indexOf(columsName[col_num]) == -1){     //类别型

                 //console.log(col_num-5);
                 console.log(attributeRangeOrCateNum[columsName[col_num]]['categorySet']);
                 for (var m=0;m< attributeRangeOrCateNum[columsName[col_num]]['categorySet'].length;m++){
                     //console.log(b);
                     var b= attributeRangeOrCateNum[columsName[col_num]]['categorySet'][m];
                     var check_box_id = col_num.toString()+"-"+b;
                     filter_html += "<tr><td class='checkmark'><input type='checkbox' class= 'filter-checkbox' id =" + check_box_id + "></td><td class='datalabel' style='opacity: 1;'>"+b+"</td></tr>"
            }
            // cross_cate[col_num-5]['max'] = -1000;
            // cross_cate[col_num-5]['min'] = -1000;
            $("#filter-selectionTablebody").html(filter_html);

            }
            else{
                var min_val =  attributeRangeOrCateNum[columsName[col_num]]['low'];
                var max_val =  attributeRangeOrCateNum[columsName[col_num]]['high'];

                //console.log(Object.keys(cross_cate[col_num-6]).length);
                console.log(min_val);
                console.log(max_val);
            //     for (var b in cross_cate[col_num-5]){
            //         var show_text = "";
            //         console.log(parseInt(b+1));
            //         var check_box_id = col_num.toString()+"-"+b;
            //
            //         show_text += parseFloat(min_val+parseFloat(b)* (max_val-min_val)/Object.keys(cross_cate[col_num-5]).length).toFixed(2).toString();
            //         show_text += ' ~ ';
            //         show_text += parseFloat(min_val+(parseFloat(b)+1)*(max_val-min_val)/Object.keys(cross_cate[col_num-5]).length).toFixed(2).toString();
            //
            //         filter_html += "<tr><td class='checkmark'><input type='checkbox' class= 'filter-checkbox' id ="+ check_box_id +"></td><td class='datalabel' style='opacity: 1;'>"+show_text+"</td></tr>"
            //
            // }
            // cross_cate[col_num-5]['max'] = max_val;
            // cross_cate[col_num-5]['min'] = min_val;
            $("#filter-selectionTablebody").html(filter_html);


            var brushed_axis_svg =  d3.select("#filter-selectionTablebody").append('svg')
                .attr("width", 80)
                .attr("height", 400);

                var yScale = d3.scaleLinear().domain([min_val,max_val]).range([380,20]);
                var yScale_anti = d3.scaleLinear().domain([380,20]).range([min_val,max_val]);
                var yAxis =  d3.axisLeft(yScale);
                brushed_axis_svg.append('g').attr('class','filter_axis').attr('id',col_num).attr('transform',"translate("+40+","+0+")").call(yAxis);
                var brush = brushed_axis_svg.append('g')
               .attr("class","brush")
               .call(d3.brushY()
                   .on("start",function () {})
                   .on("brush",function () {})
                   .on("end",function (e) {
                        var selection_brush = d3.event.selection;
                        selection_domain =  [yScale_anti(selection_brush[0]),yScale_anti(selection_brush[1])];
                       console.log(selection_domain);
                   })
               )

            }
            $("#filter-selectionTable").attr('class',col_num);
            var div1 = $('#filter-pop').show();
        // $('.checkicon').click(
        //     function () {
        //         var iconname = $(this)[0].className.split(" ");
        //         if (iconname.indexOf("fa-check-square-o") != -1){
        //             $(this).addClass("fa-square-o");
        //             $(this).removeClass("fa-check-square-o");
        //         }
        //         if(iconname.indexOf("fa-square-o") != -1){
        //             $(this).addClass("fa-check-square-o");
        //             $(this).removeClass("fa-square-o");
        //         }
        //         console.log(iconname.indexOf("fa-check-square-o"));
        //         console.log(iconname.indexOf("fa-square-o"));
        //
        //     }
        //
        // );

    });
    $('.fa-list-ol').click(function () {
        var p_div_toolbar = this.parentNode;
        var p_div = p_div_toolbar.parentNode;
        var classname = p_div.parentNode.className;
        var cname = classname.split(" ");
        var colclass = cname.pop();


        //console.log(colclass);
        var col_num = parseInt(colclass.substring(3));
       //console.log(col_num);


        //var order_stage = parseInt(this.getAttribute('stage'));
        //console.log($(this));
        //console.log(this.getAttribute('stage'));
        //console.log(typeof patientList_all[0][col_num]);
        if(order_stage[col_num] == 0){
             if (attributeNumericalList.indexOf(columsName[col_num]) != -1) {  // 数值型
                console.log('yes');
                console.log(col_num);
                patientDictList.sort(function(x, y){
                            return y[columsName[col_num]]- x[columsName[col_num]];
                        });
            }
            else{
                    patientDictList.sort(function(x, y){
                    return y[columsName[col_num]].toString().localeCompare(x[columsName[col_num].toString()]);
                });
            }
            //console.log(patientList_all);
            var patientList_order =  patientDictList.slice(0,49);
            drawTable_withTable_editByYu20180919(patientDictList,patientList_order, column_names , divname);
            allPatientList = patientDictList;
            order_stage[col_num] =1;
        }
        else if(order_stage[col_num] == 1){
            if (attributeNumericalList.indexOf(columsName[col_num]) != -1) {
                console.log('yes');
                console.log(col_num);
            patientDictList.sort(function(x, y){
                            return x[columsName[col_num]]- y[columsName[col_num]];
                        });
            }
            else{
                patientDictList.sort(function(x, y){
                    return x[columsName[col_num]].toString().localeCompare(y[columsName[col_num]].toString());
                 });
             }
            //console.log(patientList_all);
            var patientList_order =  patientDictList.slice(0,49);
            drawTable_withTable_editByYu20180919(patientDictList,patientList_order, column_names , divname);
            allPatientList = patientDictList;
            order_stage[col_num] = 2;
            console.log(order_stage[col_num]);
        }
        else{
             patientDictList.sort(function(x, y){
                            return x['id']- y['id'];
                        });
             var patientList_order =  patientDictList.slice(0,49);
             drawTable_withTable_editByYu20180919(patientDictList,patientList_order, column_names , divname);
             allPatientList = patientDictList;
            order_stage[col_num] =0;
        }


    });
//     $('.fa-pie-chart').click(function (){
//         var p_div_toolbar = this.parentNode;
//         var p_div = p_div_toolbar.parentNode;
//         var classname = p_div.parentNode.className;
//         var cname = classname.split(" ");
//         var colclass = cname.pop();
//
//
//         //console.log(colclass);
//         var col_num = parseInt(colclass.substring(3));
//         if(numerical.indexOf(col_num-1)==-1) return;
//
//         var th_height = 20,tr_width = 80;
//         var rect_r = 10, circle_r = th_height/2.2;
//
//         if(vis_stage[col_num]==0){
//             for (var index=2;index<patientList.length+2;index++){
//                 var div_pos = '.d-'+'r'+index+'c'+(col_num);
//                 var rScale = d3.scaleLinear().range([0, circle_r]).domain(d3.extent(patientList_all, function(d){ return d[col_num-1];}));
// //                  console.log(numerical.indexOf(row_no));
//                 $(div_pos).empty();
//                 var svg = d3.select(div_pos).append('svg').attr('width',70).attr('height',20);
//                 svg.append("circle")
//                     .attr("class", "circleTable")
//                     .attr("r", rScale(patientList[index-2][col_num-1]))
//                     .attr("cx", tr_width/2)
//                     .attr("cy", th_height/2)
//                     .attr("fill", colorArr[numerical.indexOf(col_num-1)]);
//                 svg.append('text')
//                     .text(String(patientList[index-2][col_num-1]).indexOf(".")!=-1?patientList[index-2][col_num-1].toFixed(1):patientList[index-2][col_num-1])
//                     .attr('fill','black')
//                     .attr('x', tr_width*0.1)
//                     .attr('y', th_height*0.1)
//                     .attr('text-anchor', 'right')
//                     .style('font-size', '10px')
//                     .attr('dy', 8);
//             }
//             vis_stage[col_num]=1;
//         }
//         else if(vis_stage[col_num]==1){
//             for (var index=2;index<patientList.length+2;index++){
//                 var div_pos = '.d-'+'r'+index+'c'+(col_num);
//                 var rScale = d3.scaleLinear().range([0, tr_width]).domain(d3.extent(patientList_all, function(d){ return d[col_num-1];}));
// //                console.log(numerical.indexOf(row_no));
//                 $(div_pos).empty();
//                 var svg = d3.select(div_pos).append('svg').attr('width',70).attr('height',20);
//                 svg.append("rect")
//                     .attr("class", "rectTable")
//                     .attr("width", rScale(patientList[index-2][col_num-1]))
//                     .attr("height",th_height)
//                     .attr("rx", 3)
//                     .attr("ry", 3)
//                     .attr("transform","translate(" + 0+ "," + 3 + ")")
//                     .attr("fill", colorArr[numerical.indexOf(col_num-1)]);
//                 svg.append('text')
//                     .text(patientList[index-2][col_num-1]).attr('fill','black')
//                     .attr('x', tr_width/2)
//                     .attr('y', th_height/2)
//                     .attr('text-anchor', 'middle')
//                     .style('font-size', '10px')
//                     .attr('dy', 8);
//             }
//             vis_stage[col_num]=0;
//         }
//     });

    $('.fa-pie-chart').click(function (){
            var p_div_toolbar = this.parentNode;
            var p_div = p_div_toolbar.parentNode;
            var classname = p_div.parentNode.className;
            var cname = classname.split(" ");
            var colclass = cname.pop();

            var p_div_col_name = p_div.innerText;
            console.log(p_div.innerText);
            console.log(colclass);

            var row_no = parseInt(colclass.substring(3));
            var left = $(this).offset().left;
            //alert(left);
            var top = $(this).offset().top;
            //alert(top);

            var positionX = left;
            var positionY = top;
            var myOffset = {};
            myOffset.left = positionX;
            myOffset.top = positionY;
            //$("#MyDiv").offset(myOffset);
            //$("#changeVisualization").width(103);
            //$("#changeVisualization").height(83);

         // var radios = document.getElementsByName("rendertype");
         // var newShowType;
         // for(var i=0;i<radios .length;i++){
         //     if(radios[i].checked){
         //         newShowType = radios[i].value;
         //         break;
         //     }
         // }
        if(attributeNumericalList.indexOf(p_div_col_name) != -1){
            $("#changeVisualization-numerical").css({position: "absolute", 'top': top, 'left': left, 'z-index': 2});
             var div1 = $('#changeVisualization-numerical').show();
        }
       else{
            $("#changeVisualization-cate").css({position: "absolute", 'top': top, 'left': left, 'z-index': 2});
            var div1 = $('#changeVisualization-cate').show();
        }

         $(".change-input").change(function () {

             console.log(attributeNumericalList.indexOf(p_div_col_name));
             if(attributeNumericalList.indexOf(p_div_col_name) != -1){    // 数值型
                var newShowType = $("input[name='renderertype-numerical']:checked").val();
                console.log(newShowType);

                if(newShowType=="circle"){
                    console.log(patientDictList.length);
                    for (var index=2;index<Object.keys(patientDictList).length+2;index++){
                        var div_pos = '.d-'+'r'+index+'c'+(row_no);
                        var rScale = d3.scaleLinear().range([0, circle_r]).domain([attributeRangeOrCateNum[column_names[row_no]]["low"],attributeRangeOrCateNum[column_names[row_no]]["high"]]);
                        $(div_pos).empty();

//                        console.log(numerical.indexOf(row_no));


                        var svg = d3.select(div_pos).append('svg').attr('width',70).attr('height',20);
                        svg.append("circle")
                        .attr("class", "circleTable")
                        .attr("r", rScale(patientDictList[index - 2][column_names[row_no]]))
                        .attr("cx", tr_width / 2)
                        .attr("cy", th_height / 2)
                        .attr("fill", colorArr[attributeNumericalList.indexOf(column_names[col])]);


                        // svg.append('text')
                        //     .text(cross_patientList[index-2][row_no]).attr('fill','black')
                        //     .attr('x', tr_width*0.1)
                        //     .attr('y', th_height*0.1)
                        //     .attr('text-anchor', 'middle')
                        //     .style('font-size', '10px')
                        //     .attr('dy', 8);
                    }
                    vis_stage[row_no]= 1;
                }
                else if(newShowType=="rect"){
                    for (var index=2;index<Object.keys(patientDictList).length+2;index++){
                        var div_pos = '.d-'+'r'+index+'c'+(row_no);
                        var rScale = d3.scaleLinear().range([0, tr_width]).domain([attributeRangeOrCateNum[column_names[row_no]]["low"],attributeRangeOrCateNum[column_names[row_no]]["high"]]);

                        console.log(numerical.indexOf(row_no));
                        $(div_pos).empty();
                        var svg = d3.select(div_pos).append('svg').attr('width',70).attr('height',20);
                        svg.append("rect")
                            .attr("class", "rectTable")
                            .attr("width", rScale(patientDictList[index - 2][column_names[row_no]]))
                            .attr("height", th_height)
                            .attr("rx", 3)
                            .attr("ry", 3)
                            .attr("transform", "translate(" + 0 + "," + 3 + ")")
                            .attr("fill", colorArr[attributeNumericalList.indexOf(column_names[row_no])]);
                        svg.append('text')
                            .text(patientDictList[index - 2][column_names[row_no]])
                            .attr('fill', 'black')
                            .attr('x', rScale(patientDictList[index - 2][column_names[row_no]]))
                            .attr('y', th_height / 2)
                            .attr('text-anchor', 'right')
                            .style('font-size', '10px')
                            .attr('dy', 8);

                    }
                      vis_stage[row_no]= 0;
                }
                else if(newShowType == 'string'){
                    for (var index=2;index<Object.keys(patientDictList).length+2;index++){
                        var div_pos = '.d-'+'r'+index+'c'+(row_no);
                        console.log(numerical.indexOf(row_no));
                        $(div_pos).empty();
                        var svg = d3.select(div_pos).append('svg').attr('width',70).attr('height',20);

                        svg.append('text')
                            .text(patientDictList[index-2][column_names[row_no]]).attr('fill','black')
                            .attr('x', tr_width/2)
                            .attr('y', th_height/2)
                            .attr('text-anchor', 'middle')
                            .style('font-style','italic')
                            .style('font-size', '12px')
                            .attr('dy', 8);
                    }
                 vis_stage[row_no]= 2;
                }
             }
             else{
                 var newShowType = $("input[name='renderertype-cate']:checked").val();
                 console.log(newShowType);
                 if(newShowType=='cate'){
                     for (var index=2;index<Object.keys(patientDictList).length+2;index++){
                        var div_pos = '.d-'+'r'+index+'c'+(row_no);
                        $(div_pos).empty();

//                        console.log(numerical.indexOf(row_no));

                        var svg = d3.select(div_pos).append('svg').attr('width',70).attr('height',20);

                        svg.append("rect")
                            .attr("class", "tableRect")
                            .attr("x", 0)
                            .attr("y", th_height / 4)
                            .attr("width", rect_r)
                            .attr("height", rect_r)
                            .attr("fill", localColorScale(patientDictList[index-2][column_names[row_no]]));
//                        .on("mouseover", function (d) {
//                            tooltip.html(patientDictList[index-2][column_names[col]])
//                                .style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px")
//                                .style("opacity", 1.0);
//                        })
//                        .on("mousemove", function (d) {
//                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
//
//                            tooltip.style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px");
//                        })
//                        .on("mouseout", function (d) {
//                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
//
//                            tooltip.style("opacity", 0.0);
//                        });
                    svg.append('text')
                        .text(patientDictList[index-2][column_names[row_no]]).attr('fill', 'black')
                        .attr('x', rect_r * 1.5)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'left')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                    }
                     vis_stage[row_no]= 0;
                 }
                 else if(newShowType == 'color'){
                      for (var index=2;index<Object.keys(patientDictList).length+2;index++){
                        var div_pos = '.d-'+'r'+index+'c'+(row_no);
                        $(div_pos).empty();

//                        console.log(numerical.indexOf(row_no));

                        var svg = d3.select(div_pos).append('svg').attr('width',70).attr('height',20);

                        svg.append("rect")
                            .attr("class", "tableRect")
                            .attr("x", 0)
                            .attr("y", 0)
                            .attr("width", tr_width*0.8)
                            .attr("height", th_height)
                            .attr("fill", localColorScale(patientDictList[index-2][column_names[row_no]]));
                       // .on("mouseover", function (d) {
                       //     tooltip.html(patientDictList[index-2][column_names[row_no]])
                       //         .style("left", (d3.event.pageX) + "px")
                       //         .style("top", (d3.event.pageY + 20) + "px")
                       //         .style("opacity", 1.0);
                       // })
                       // .on("mousemove", function (d) {
                       //     /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
                       //
                       //     tooltip.style("left", (d3.event.pageX) + "px")
                       //         .style("top", (d3.event.pageY + 20) + "px");
                       // })
                       // .on("mouseout", function (d) {
                       //     /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
                       //
                       //     tooltip.style("opacity", 0.0);
                       // });

                    svg.append('text')
                        .text(patientDictList[index-2][column_names[row_no]]).attr('fill', 'black')
                        .attr('x', rect_r)
                        .attr('y', th_height / 2)
                        .attr('text-anchor', 'left')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                    }
                      vis_stage[row_no]= 1;
                 }
                 else if(newShowType == 'string'){
                     for (var index=2;index<Object.keys(patientDictList).length+2;index++){
                        var div_pos = '.d-'+'r'+index+'c'+(row_no);
                        $(div_pos).empty();

//                        console.log(numerical.indexOf(row_no));

                        var svg = d3.select(div_pos).append('svg').attr('width',70).attr('height',20);


//                        .on("mouseover", function (d) {
//                            tooltip.html(patientDictList[index-2][column_names[col]])
//                                .style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px")
//                                .style("opacity", 1.0);
//                        })
//                        .on("mousemove", function (d) {
//                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
//
//                            tooltip.style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px");
//                        })
//                        .on("mouseout", function (d) {
//                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
//
//                            tooltip.style("opacity", 0.0);
//                        });
                    svg.append('text')
                        .text(patientDictList[index-2][column_names[row_no]]).attr('fill', 'black')
                        .attr('x', rect_r * 1.5)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'left')
                        .style('font-style','italic')
                        .style('font-size', '12px')
                        .attr('fill',localColorScale(patientDictList[index-2][column_names[row_no]]))
                        .attr('dy', 8);
                    }
                      vis_stage[row_no]= 2;
                 }
             }

         });



    });  // 有点多个之后前面也会一起变的bug


    $(document).mouseup(function(e) {
    var  pop = $('.change-input');
    if(!pop.is(e.target) && pop.has(e.target).length === 0) {
        // 可以在这里关闭弹窗 关闭changevisualization
        $('#changeVisualization-numerical').hide();
        $('#changeVisualization-cate').hide();

     var stage_cate_num = 0;   }
});


    $('.cell-div') .on("mouseover", function Mover() {
                            //console.log($(this).children('text'));
                            var html_text = $(this).children('text').context.innerText;
                            var tr_parent = this.parentNode.parentNode;

                            $(tr_parent).css('border','solid 1px #f0ad4e');
                            //console.log(html_text);
                                tooltip.html(html_text)
                                .style("left", (event.pageX) + "px")
                                .style("top", (event.pageY + 20) + "px")
                                .style("opacity", 1.0);
                        })
                        .on("mousemove", function Mmove() {
                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */

                            tooltip.style("left", (event.pageX) + "px")
                                .style("top", (event.pageY + 20) + "px");
                        })
                        .on("mouseout", function Mout() {
                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
                             var tr_parent = this.parentNode.parentNode;

                            $(tr_parent).css('border','0px');
                            tooltip.style("opacity", 0.0);
                        });
    $('.row0').off('mouseover');
    $('.row0').off('mousemove');
    $('.row0').off('mouseout');



    for (var index = 2; index < Object.keys(patientDictList).length + 2; index++) { //考虑翻页 //patient.length
        var count = 0;
//        for (var j = 0; j < patientDictList[index - 2].length; j++) {                         //计算confidence
//            if (patientList[index - 2][j] == "NA") {
//                count++;
//            }
//        }
        for(var key in patientDictList[index-2]) {
            if(patientDictList[index-2][key] == "NA") count++;
        }
        for (var col = -1; col < column_names.length; col++) {
//            console.log(col);
//            console.log(stage_col[col]);

            var div_pos = '.d-' + 'r' + index + 'c' + col;
//            console.log(div_pos);
            var svg = d3.select(div_pos).append('svg').attr('width', tr_width).attr('height', th_height);
            var simiScale = d3.scaleLinear().range([0, tr_width]).domain([0,1]);

//            console.log(svg);

            if(col==-1){

                     svg.append("rect")
                        .attr("class", "rectTable")
                        .attr("width", simiScale(pagePatientsSimilarityLevel[parseInt(patientDictList[index-2]['id'])]))
                        .attr("height", th_height)
                        .attr("rx", 3)
                        .attr("ry", 3)
                        .attr("transform", "translate(" + 0 + "," + 3 + ")")
                        .attr("fill", 'gray')
                         .style('opacity','0.3');

                 svg.append("text")
                    .attr("class", "textTable")
                    .text(index-1)
                    .attr('text-anchor', 'middle')
                    .attr("transform", "translate(" + tr_width / 2 + "," + th_height / 2 + ")");
            }

            if (col == 0) {                                                                         // 统计信息
                var arc_g = svg.append('g')
                    .attr("transform", "translate(" + tr_width / 2 + "," + th_height / 2 + ")");
                var arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(circle_r)
                    .startAngle(0)
                    .endAngle(2 * Math.PI * ((63 - count) / Object.keys(patientDictList[index-2]).length));
                arc_g.append("path")
                    .attr("class", 'arc')
                    .style('fill', 'pink')
                    .attr('d', arc);

                arc_g.append('text')
                    .text(d3.format('.2f')((63 - count) / Object.keys(patientDictList[index-2]).length)).style('opacity','0');
            }

            else if(attributeStrList.indexOf(column_names[col])!=-1){                                   //string类属性
                svg.append("text")
                    .attr("class", "textTable")
                    .text(patientDictList[index - 2][column_names[col]])
                    .attr('text-anchor', 'middle')
                    .attr("transform", "translate(" + tr_width / 2 + "," + th_height / 2 + ")");
            }
            else if(attributeCategoricalList.indexOf(column_names[col])!=-1){
                var categoryNum = attributeRangeOrCateNum[column_names[col]]["categoryNum"];
                var categorySet = attributeRangeOrCateNum[column_names[col]]["categorySet"];
                var localColorSet = [];
                switch(categoryNum){
                    case 2:
                        localColorSet = color_categorical_2;
                        break;
                    case 3:
                        localColorSet = color_categorical_3;
                        break;
                    default:
                        localColorSet = color_categorical_8;
                }
                var localColorScale = d3.scaleOrdinal().domain(categorySet).range(localColorSet);
                if(patientDictList[index-2][column_names[col]]=="NA"){
                    svg.append("rect")
                        .attr("class", "tableRect-NA")
                        .attr("x", 1)
                        .attr("y", 1)
                        .attr("width", tr_width * 0.9)
                        .attr("height", th_height)
                        .attr("fill", 'url("#stripes")')
                        .on("mouseover", function (d) {
                            tooltip.html("NA")
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY + 20) + "px")
                                .style("opacity", 1.0);
                        })
                        .on("mousemove", function (d) {
                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */

                            tooltip.style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY + 20) + "px");
                        })
                        .on("mouseout", function (d) {
                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/

                            tooltip.style("opacity", 0.0);
                        });
                    continue;
                }
                svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", localColorScale(patientDictList[index-2][column_names[col]]));
//                        .on("mouseover", function (d) {
//                            tooltip.html(patientDictList[index-2][column_names[col]])
//                                .style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px")
//                                .style("opacity", 1.0);
//                        })
//                        .on("mousemove", function (d) {
//                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
//
//                            tooltip.style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px");
//                        })
//                        .on("mouseout", function (d) {
//                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
//
//                            tooltip.style("opacity", 0.0);
//                        });
                    svg.append('text')
                        .text(patientDictList[index-2][column_names[col]]).attr('fill', 'black')
                        .attr('x', rect_r * 1.5)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'left')
                        .style('font-size', '12px')
                        .attr('dy', 8);
            }
            else if(attributeNumericalList.indexOf(column_names[col])!=-1)//数值型
            {
                if (vis_stage[col]==1) {
                    var rScale = d3.scaleLinear().range([0, circle_r]).domain([attributeRangeOrCateNum[column_names[col]]["low"],attributeRangeOrCateNum[column_names[col]]["high"]]);

                    svg.append("circle")
                        .attr("class", "circleTable")
                        .attr("r", rScale(patientDictList[index - 2][column_names[col]]))
                        .attr("cx", tr_width / 2)
                        .attr("cy", th_height / 2)
                        .attr("fill", colorArr[attributeNumericalList.indexOf(column_names[col])]);
                    // svg.append('text')
                    //     .text(patientList[index-2][col-1]).attr('fill','black')
                    //     .attr('x', tr_width*0.1)
                    //     .attr('y', th_height*0.1)
                    //     .attr('text-anchor', 'middle')
                    //     .style('font-size', '10px')
                    //     .attr('dy', 8);
                }
                else if (vis_stage[col]==0) {
                    var rScale = d3.scaleLinear().range([0, tr_width]).domain([attributeRangeOrCateNum[column_names[col]]["low"],attributeRangeOrCateNum[column_names[col]]["high"]]);

                    svg.append("rect")
                        .attr("class", "rectTable")
                        .attr("width", rScale(patientDictList[index - 2][column_names[col]]))
                        .attr("height", th_height)
                        .attr("rx", 3)
                        .attr("ry", 3)
                        .attr("transform", "translate(" + 0 + "," + 3 + ")")
                        .attr("fill", colorArr[attributeNumericalList.indexOf(column_names[col])]);
                    svg.append('text')
                        .text(patientDictList[index - 2][column_names[col]])
                        .attr('fill', 'black')
                        .attr('x', rScale(patientDictList[index - 2][column_names[col]]))
                        .attr('y', th_height / 2)
                        .attr('text-anchor', 'right')
                        .style('font-size', '10px')
                        .attr('dy', 8);
                }
            }
//            else {
//                if (patientList[index - 2][col - 1] == '否' && col > 4) {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[1]);
//                    svg.append('text')
//                        .text('否').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '是' && col > 4) {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[0]);
//                    svg.append('text')
//                        .text('是').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '有') {
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[0])
//                        .on("mouseover", function (d) {
//                            tooltip.html("有")
//                                .style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px")
//                                .style("opacity", 1.0);
//                        })
//                        .on("mousemove", function (d) {
//                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
//
//                            tooltip.style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px");
//                        })
//                        .on("mouseout", function (d) {
//                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
//
//                            tooltip.style("opacity", 0.0);
//                        });
//                    svg.append('text')
//                        .text('有').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '见现病史') {
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[2])
//                        .on("mouseover", function (d) {
//                            tooltip.html("见现病史")
//                                .style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px")
//                                .style("opacity", 1.0);
//                        })
//                        .on("mousemove", function (d) {
//                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
//
//                            tooltip.style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px");
//                        })
//                        .on("mouseout", function (d) {
//                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
//
//                            tooltip.style("opacity", 0.0);
//                        });
//                    svg.append('text')
//                        .text('见现病史').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '无') {
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[1])
//                        .on("mouseover", function (d) {
//                            tooltip.html("无")
//                                .style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px")
//                                .style("opacity", 1.0);
//                        })
//                        .on("mousemove", function (d) {
//                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
//
//                            tooltip.style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px");
//                        })
//                        .on("mouseout", function (d) {
//                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
//
//                            tooltip.style("opacity", 0.0);
//                        });
//                    svg.append('text')
//                        .text('无').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == 'NA') {
//                    svg.append("rect")
//                        .attr("class", "tableRect-NA")
//                        .attr("x", 1)
//                        .attr("y", 1)
//                        .attr("width", tr_width * 0.9)
//                        .attr("height", th_height)
//                        .attr("fill", 'url("#stripes")')
//                        .on("mouseover", function (d) {
//                            tooltip.html("NA")
//                                .style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px")
//                                .style("opacity", 1.0);
//                        })
//                        .on("mousemove", function (d) {
//                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
//
//                            tooltip.style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px");
//                        })
//                        .on("mouseout", function (d) {
//                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
//
//                            tooltip.style("opacity", 0.0);
//                        });
//                }
//                if (patientList[index - 2][col - 1] == '0' && col > 4) {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[1]);
//                    svg.append('text')
//                        .text('0').attr('fill', 'black')
//                        .attr('x', tr_width / 2)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'middle')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '1' && col > 4) {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[0]);
//                    svg.append('text')
//                        .text('1').attr('fill', 'black')
//                        .attr('x', tr_width / 2)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'middle')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '女' && col > 4) {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", 'blue');
//                    svg.append('text')
//                        .text('女').attr('fill', 'black')
//                        .attr('x', tr_width / 2)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'middle')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '男' && col > 4) {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", 'orange');
//                    svg.append('text')
//                        .text('男').attr('fill', 'black')
//                        .attr('x', tr_width / 2)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'middle')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '冠状动脉粥样硬化') {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[3]);
//                    svg.append('text')
//                        .text('冠状动脉粥样硬化').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '冠脉三支病变') {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[4]);
//                    svg.append('text')
//                        .text('冠脉三支病变').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '冠脉双支病变') {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[5]);
//                    svg.append('text')
//                        .text('冠脉双支病变').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '冠脉单支病变') {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[6]);
//                    svg.append('text')
//                        .text('冠脉单支病变').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '冠脉造影未见明显异常') {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[7]);
//                    svg.append('text')
//                        .text('冠脉造影未见明显异常').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (col - 1 == 44) {
//                    if (patientList[index - 2][col - 1] == "NA") {
//
//                    }
//                    else {
//                        var categoies = ['NA', '急诊', '择期', '早期'];
//                        svg.append("rect")
//                            .attr("class", "tableRect")
//                            .attr("x", 0)
//                            .attr("y", th_height / 4)
//                            .attr("width", rect_r)
//                            .attr("height", rect_r)
//                            .attr("fill", color_categorical_8[categoies.indexOf(patientList[index - 2][col - 1]) + 3]);
//                        svg.append('text')
//                            .text(patientList[index - 2][col - 1]).attr('fill', 'black')
//                            .attr('x', tr_width / 2)
//                            .attr('y', th_height / 2 - rect_r / 2)
//                            .attr('text-anchor', 'middle')
//                            .style('font-size', '12px')
//                            .attr('dy', 8);
//                    }
//                }
//                if (col - 1 == 45) {
//
//                    if (patientList[index - 2][col - 1] == "NA") {
//                    }
//                    else {
//                        var categoies = ['NA', 'PCI治疗STEMI（稳定，心梗发作>12小时）', 'PCI治疗STEMI（成功足量溶栓治疗后稳定）', 'STEMI的紧急PCI治疗', 'PCI治疗稳定型心绞痛', '分次PCI', 'PCI治疗高风险Non-STEMI或不稳定型心绞痛', 'PCI治疗STEMI（不稳定，心梗发作>12小时)'];
//                        svg.append("rect")
//                            .attr("class", "tableRect")
//                            .attr("x", 0)
//                            .attr("y", th_height / 4)
//                            .attr("width", rect_r)
//                            .attr("height", rect_r)
//                            .attr("fill", color_categorical_8[categoies.indexOf(patientList[index - 2][col - 1])]);
//                        var svg_g = svg.append('g').attr('class','text-wrapper');
//                        svg_g.append('text')
//                            .text(patientList[index - 2][col - 1]).attr('fill', 'black')
//                            .attr('width', 50)
//                            .attr('x', rect_r * 1.5)
//                            .attr('y', th_height / 2 - rect_r / 2)
//                            .attr('text-anchor', 'left')
//                            .style('font-size', '12px')
//                            .style('overflow', 'hidden')
//                            .style('text-overflow', 'ellipsis')
//                            .style("white-space","nowrap")
//                            .attr('dy', 8);
//                    }
//
//
//                }
//
//                if (col - 1 == 35) {
//                    var categoies = ['威视派克', '优维显', '欧乃派克', '典比乐'];
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[categoies.indexOf(patientList[index - 2][col - 1])]);
//                    svg.append('text')
//                        .text(patientList[index - 2][col - 1]).attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//
//            }

        }

    }
//    console.log(stage_all.length);

    var simiPatient = document.getElementById('SimPatientBt').innerText;
    var simiPatientText = simiPatient.split(':');
    var simiPatientId = -1;
    if(simiPatientText.length > 1)
        simiPatientId = parseInt(simiPatientText[1]);
    console.log(simiPatientId);
    var query_patient = allPatientDictList[simiPatientId]; // 相似病人固定首位
    if(simiPatientId == -1){
            // 当没有指定相似病人的时候 没有病人固定
    }
    else{
        for (var col = -1; col < column_names.length; col++) {
//            console.log(col);
//            console.log(stage_col[col]);

            var div_pos = '.d-' + 'r' + '1' + 'c' + col;
//            console.log(div_pos);
            var svg = d3.select(div_pos).append('svg').attr('width', tr_width).attr('height', th_height);

//            console.log(svg);
            if(col==-1){
                 svg.append("text")
                    .attr("class", "textTable")
                    .text('-')
                    .attr('text-anchor', 'middle')
                    .attr("transform", "translate(" + tr_width / 2 + "," + th_height / 2 + ")");
            }

            if (col == 0) {                                                                         // 统计信息 confidence
                var arc_g = svg.append('g')
                    .attr("transform", "translate(" + tr_width / 2 + "," + th_height / 2 + ")");
                var arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(circle_r)
                    .startAngle(0)
                    .endAngle(2 * Math.PI * ((63 - count) / Object.keys(query_patient).length));
                arc_g.append("path")
                    .attr("class", 'arc')
                    .style('fill', 'pink')
                    .attr('d', arc);

                 arc_g.append('text')
                    .text(d3.format('.2f')((63 - count) / Object.keys(query_patient).length)).style('opacity','0');

            }

            else if(attributeStrList.indexOf(column_names[col])!=-1){    // 字符串型
                svg.append("text")
                    .attr("class", "textTable")
                    .text(query_patient[column_names[col]])
                    .attr('text-anchor', 'middle')
                    .attr("transform", "translate(" + tr_width / 2 + "," + th_height / 2 + ")");
            }
            else if(attributeCategoricalList.indexOf(column_names[col])!=-1){ // 类别型
                var categoryNum = attributeRangeOrCateNum[column_names[col]]["categoryNum"];
                var categorySet = attributeRangeOrCateNum[column_names[col]]["categorySet"];
                var localColorSet = [];
                switch(categoryNum){
                    case 2:
                        localColorSet = color_categorical_2;
                        break;
                    case 3:
                        localColorSet = color_categorical_3;
                        break;
                    default:
                        localColorSet = color_categorical_8;
                }
                var localColorScale = d3.scaleOrdinal().domain(categorySet).range(localColorSet);
                if(query_patient[column_names[col]]=="NA"){
                    svg.append("rect")
                        .attr("class", "tableRect-NA")
                        .attr("x", 1)
                        .attr("y", 1)
                        .attr("width", tr_width * 0.9)
                        .attr("height", th_height)
                        .attr("fill", 'url("#stripes")')
                        .on("mouseover", function (d) {
                            tooltip.html("NA")
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY + 20) + "px")
                                .style("opacity", 1.0);
                        })
                        .on("mousemove", function (d) {
                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */

                            tooltip.style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY + 20) + "px");
                        })
                        .on("mouseout", function (d) {
                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/

                            tooltip.style("opacity", 0.0);
                        });
                    continue;
                }
                svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", localColorScale(query_patient[column_names[col]]));
//                        .on("mouseover", function (d) {
//                            tooltip.html(patientDictList[index-2][column_names[col]])
//                                .style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px")
//                                .style("opacity", 1.0);
//                        })
//                        .on("mousemove", function (d) {
//                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
//
//                            tooltip.style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px");
//                        })
//                        .on("mouseout", function (d) {
//                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
//
//                            tooltip.style("opacity", 0.0);
//                        });
                    svg.append('text')
                        .text(query_patient[column_names[col]]).attr('fill', 'black')
                        .attr('x', rect_r * 1.5)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'left')
                        .style('font-size', '12px')
                        .attr('dy', 8);
            }
            else if(attributeNumericalList.indexOf(column_names[col])!=-1)//数值型
            {
                if (vis_stage[col]==1) {
                    var rScale = d3.scaleLinear().range([0, circle_r]).domain([attributeRangeOrCateNum[column_names[col]]["low"],attributeRangeOrCateNum[column_names[col]]["high"]]);

                    svg.append("circle")
                        .attr("class", "circleTable")
                        .attr("r", rScale(query_patient[column_names[col]]))
                        .attr("cx", tr_width / 2)
                        .attr("cy", th_height / 2)
                        .attr("fill", colorArr[attributeNumericalList.indexOf(column_names[col])]);
                    // svg.append('text')
                    //     .text(patientList[index-2][col-1]).attr('fill','black')
                    //     .attr('x', tr_width*0.1)
                    //     .attr('y', th_height*0.1)
                    //     .attr('text-anchor', 'middle')
                    //     .style('font-size', '10px')
                    //     .attr('dy', 8);
                }
                else if (vis_stage[col]==0) {
                    var rScale = d3.scaleLinear().range([0, tr_width]).domain([attributeRangeOrCateNum[column_names[col]]["low"],attributeRangeOrCateNum[column_names[col]]["high"]]);

                    svg.append("rect")
                        .attr("class", "rectTable")
                        .attr("width", rScale(query_patient[column_names[col]]))
                        .attr("height", th_height)
                        .attr("rx", 3)
                        .attr("ry", 3)
                        .attr("transform", "translate(" + 0 + "," + 3 + ")")
                        .attr("fill", colorArr[attributeNumericalList.indexOf(column_names[col])]);
                    svg.append('text')
                        .text(query_patient[column_names[col]])
                        .attr('fill', 'black')
                        .attr('x', rScale(query_patient[column_names[col]]))
                        .attr('y', th_height / 2)
                        .attr('text-anchor', 'right')
                        .style('font-size', '10px')
                        .attr('dy', 8);
                }
            }
//            else {
//                if (patientList[index - 2][col - 1] == '否' && col > 4) {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[1]);
//                    svg.append('text')
//                        .text('否').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '是' && col > 4) {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[0]);
//                    svg.append('text')
//                        .text('是').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '有') {
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[0])
//                        .on("mouseover", function (d) {
//                            tooltip.html("有")
//                                .style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px")
//                                .style("opacity", 1.0);
//                        })
//                        .on("mousemove", function (d) {
//                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
//
//                            tooltip.style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px");
//                        })
//                        .on("mouseout", function (d) {
//                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
//
//                            tooltip.style("opacity", 0.0);
//                        });
//                    svg.append('text')
//                        .text('有').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '见现病史') {
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[2])
//                        .on("mouseover", function (d) {
//                            tooltip.html("见现病史")
//                                .style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px")
//                                .style("opacity", 1.0);
//                        })
//                        .on("mousemove", function (d) {
//                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
//
//                            tooltip.style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px");
//                        })
//                        .on("mouseout", function (d) {
//                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
//
//                            tooltip.style("opacity", 0.0);
//                        });
//                    svg.append('text')
//                        .text('见现病史').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '无') {
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[1])
//                        .on("mouseover", function (d) {
//                            tooltip.html("无")
//                                .style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px")
//                                .style("opacity", 1.0);
//                        })
//                        .on("mousemove", function (d) {
//                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
//
//                            tooltip.style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px");
//                        })
//                        .on("mouseout", function (d) {
//                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
//
//                            tooltip.style("opacity", 0.0);
//                        });
//                    svg.append('text')
//                        .text('无').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == 'NA') {
//                    svg.append("rect")
//                        .attr("class", "tableRect-NA")
//                        .attr("x", 1)
//                        .attr("y", 1)
//                        .attr("width", tr_width * 0.9)
//                        .attr("height", th_height)
//                        .attr("fill", 'url("#stripes")')
//                        .on("mouseover", function (d) {
//                            tooltip.html("NA")
//                                .style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px")
//                                .style("opacity", 1.0);
//                        })
//                        .on("mousemove", function (d) {
//                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
//
//                            tooltip.style("left", (d3.event.pageX) + "px")
//                                .style("top", (d3.event.pageY + 20) + "px");
//                        })
//                        .on("mouseout", function (d) {
//                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/
//
//                            tooltip.style("opacity", 0.0);
//                        });
//                }
//                if (patientList[index - 2][col - 1] == '0' && col > 4) {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[1]);
//                    svg.append('text')
//                        .text('0').attr('fill', 'black')
//                        .attr('x', tr_width / 2)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'middle')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '1' && col > 4) {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[0]);
//                    svg.append('text')
//                        .text('1').attr('fill', 'black')
//                        .attr('x', tr_width / 2)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'middle')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '女' && col > 4) {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", 'blue');
//                    svg.append('text')
//                        .text('女').attr('fill', 'black')
//                        .attr('x', tr_width / 2)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'middle')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '男' && col > 4) {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", 'orange');
//                    svg.append('text')
//                        .text('男').attr('fill', 'black')
//                        .attr('x', tr_width / 2)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'middle')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '冠状动脉粥样硬化') {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[3]);
//                    svg.append('text')
//                        .text('冠状动脉粥样硬化').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '冠脉三支病变') {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[4]);
//                    svg.append('text')
//                        .text('冠脉三支病变').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '冠脉双支病变') {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[5]);
//                    svg.append('text')
//                        .text('冠脉双支病变').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '冠脉单支病变') {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[6]);
//                    svg.append('text')
//                        .text('冠脉单支病变').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (patientList[index - 2][col - 1] == '冠脉造影未见明显异常') {
//                    //console.log(col);
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[7]);
//                    svg.append('text')
//                        .text('冠脉造影未见明显异常').attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//                if (col - 1 == 44) {
//                    if (patientList[index - 2][col - 1] == "NA") {
//
//                    }
//                    else {
//                        var categoies = ['NA', '急诊', '择期', '早期'];
//                        svg.append("rect")
//                            .attr("class", "tableRect")
//                            .attr("x", 0)
//                            .attr("y", th_height / 4)
//                            .attr("width", rect_r)
//                            .attr("height", rect_r)
//                            .attr("fill", color_categorical_8[categoies.indexOf(patientList[index - 2][col - 1]) + 3]);
//                        svg.append('text')
//                            .text(patientList[index - 2][col - 1]).attr('fill', 'black')
//                            .attr('x', tr_width / 2)
//                            .attr('y', th_height / 2 - rect_r / 2)
//                            .attr('text-anchor', 'middle')
//                            .style('font-size', '12px')
//                            .attr('dy', 8);
//                    }
//                }
//                if (col - 1 == 45) {
//
//                    if (patientList[index - 2][col - 1] == "NA") {
//                    }
//                    else {
//                        var categoies = ['NA', 'PCI治疗STEMI（稳定，心梗发作>12小时）', 'PCI治疗STEMI（成功足量溶栓治疗后稳定）', 'STEMI的紧急PCI治疗', 'PCI治疗稳定型心绞痛', '分次PCI', 'PCI治疗高风险Non-STEMI或不稳定型心绞痛', 'PCI治疗STEMI（不稳定，心梗发作>12小时)'];
//                        svg.append("rect")
//                            .attr("class", "tableRect")
//                            .attr("x", 0)
//                            .attr("y", th_height / 4)
//                            .attr("width", rect_r)
//                            .attr("height", rect_r)
//                            .attr("fill", color_categorical_8[categoies.indexOf(patientList[index - 2][col - 1])]);
//                        var svg_g = svg.append('g').attr('class','text-wrapper');
//                        svg_g.append('text')
//                            .text(patientList[index - 2][col - 1]).attr('fill', 'black')
//                            .attr('width', 50)
//                            .attr('x', rect_r * 1.5)
//                            .attr('y', th_height / 2 - rect_r / 2)
//                            .attr('text-anchor', 'left')
//                            .style('font-size', '12px')
//                            .style('overflow', 'hidden')
//                            .style('text-overflow', 'ellipsis')
//                            .style("white-space","nowrap")
//                            .attr('dy', 8);
//                    }
//
//
//                }
//
//                if (col - 1 == 35) {
//                    var categoies = ['威视派克', '优维显', '欧乃派克', '典比乐'];
//                    svg.append("rect")
//                        .attr("class", "tableRect")
//                        .attr("x", 0)
//                        .attr("y", th_height / 4)
//                        .attr("width", rect_r)
//                        .attr("height", rect_r)
//                        .attr("fill", color_categorical_8[categoies.indexOf(patientList[index - 2][col - 1])]);
//                    svg.append('text')
//                        .text(patientList[index - 2][col - 1]).attr('fill', 'black')
//                        .attr('x', rect_r * 1.5)
//                        .attr('y', th_height / 2 - rect_r / 2)
//                        .attr('text-anchor', 'left')
//                        .style('font-size', '12px')
//                        .attr('dy', 8);
//                }
//
//            }

        }
    }




    for(var now_i = 0;now_i<stage_all.length;now_i++ ){
//        console.log("fuck");
//        console.log(document.getElementById("sumattr"+now_i+"-td3").innerHTML);
        if(document.getElementsByClassName("stageNavSpan")[now_i].innerHTML.indexOf("(不显示)")==-1) continue;

        for(var j=2;j<columsName.length;j++){
                    if(stage_all[now_i].indexOf(j-1)!=-1)
                    {
                        $(".col"+j).hide();
                    }
        }
    }
    for (var cl = 1; cl < column_names.length; cl++) {
            draw_data_summary_in_head(patientDictList_all, cl);
    }

var fixHelperModified = function(e, tr) {
    var $originals = tr.children();
    var $helper = tr.clone();
    $helper.children().each(function(index) {
        $(this).width($originals.eq(index).width())
    });
    return $helper;
},
    updateIndex = function(e, ui) {
        console.log('updateIndex');
        var tr_all = $('#table  tr');

        // 重新排序Rank
        // for(var row_s = 2;row_s <tr_all.length; row_s++){
        //
        //     var div_pos = tr_all[row_s];
        //     $(div_pos.childNodes[0]).empty();
        //     var svg = d3.select(div_pos.childNodes[0]).append('svg').attr('width', tr_width).attr('height', th_height);
        //     //console.log(svg);
        //          svg.append("text")
        //             .attr("class", "textTable")
        //             .text(row_s-1)
        //             .attr('text-anchor', 'middle')
        //             .attr("transform", "translate(" + tr_width / 2 + "," + th_height / 2 + ")");
        // }
        //

       //
        var row_number =  $(ui.item[0]).attr('id');
        //console.log(tr_all.toArray().indexOf(ui.item[0])); // 调整后的位置
        //console.log(parseInt(row_number.substring(4))); // 一开始的位置
        if( tr_all.toArray().indexOf(ui.item[0]) > parseInt(row_number.substring(4))){
           // console.log('down');
           $(ui.item[0].childNodes[0]).remove('circle');
            var svg_item =  d3.select($(ui.item[0].childNodes[0]).children('svg')[0]);

            console.log(svg_item);
           var rankCircle =  svg_item.append('circle')
            .attr("class", "rankCircle")
		    .attr("r", 7)
		    .attr("cx",    tr_width / 2+25 )
		    .attr("cy",    th_height / 2-1)
		    .style("fill",'red')
		    .style("fill-opacity", 0.8);


            var t = d3.transition()
                .duration(3000)
                .ease(d3.easeLinear);

            rankCircle.transition(t)
               .style('"display"','none');

        }
        if(tr_all.toArray().indexOf(ui.item[0]) < parseInt(row_number.substring(4))){
            // console.log('up');

           $(ui.item[0].childNodes[0]).remove('circle');
            var svg_item =  d3.select($(ui.item[0].childNodes[0]).children('svg')[0]);

            console.log(svg_item);
           var rankCircle =  svg_item.append('circle')
            .attr("class", "rankCircle")
		    .attr("r", 7)
		    .attr("cx",    tr_width / 2+25 )
		    .attr("cy",    th_height / 2-1)
		    .style("fill",'green')
		    .style("fill-opacity", 0.8);


            var t = d3.transition()
                .duration(500)
                .ease(d3.easeLinear);

            rankCircle.transition(t)
               .style('"fill"','white');

        }

    };


    $("#table tbody").sortable({
        helper: fixHelperModified,
        stop: updateIndex
        }).disableSelection();

//     var el = document.getElementById('table');
//     var dragger = tableDragger(el, {
//         mode: 'row',
//         onlyBody: true,
//         animation:0
//         });
//     dragger.on('drop',function(from, to){
//         console.log(from);
//         console.log(to);
// });
//      $("#table").tableDnD({
//          onDrop:function () {
//              alert('ok');
//          }
//      });

}

function drawTable_withTable(patientList_all,patientList,column_names,divname){
//    console.log('DataTable');
    //console.log(patientList);
    cross_patientList_all = patientList_all;
    cross_patientList = patientList;
    cross_divname = divname;
    cross_column_names = column_names;

    var margin = {top: 30, right: 30, bottom: 50, left: 30};
    var div = document.getElementById(divname);

    var colorArr = ['#8D483C', '#94494D', '#954D5F', '#925572', '#885E82', '#796990', '#657399', '#4E7D9D', '#33869A',
        '#1C8E93', '#1A9586', '#319A77', '#4D9D66', '#689F55', '#84A046', '#A09E3D', '#BC9B3C', '#D69644', '#ED9154', '#000000'];
    var aki_color = ['#74d97b', '#0326ed', '#ff8201', '#ff2be9'];

    var th_height = 20, tr_width = 80; // tr_width = width/patientList[0].length;
    var rect_r = 10, circle_r = th_height / 2.2;

    var rScale_age = d3.scaleLinear().range([0, circle_r]).domain([10, 100]);  // 年龄
    var rScale_ml = d3.scaleLinear().range([0, circle_r]).domain(d3.extent(patientList, function (d) {
        return d[12];
    }));  // 对比剂用量ml
    var rScale_gfr = d3.scaleLinear().range([0, circle_r]).domain(d3.extent(patientList, function (d) {
        return d[13];
    })); // gfr 肾小球过滤率
    var rScale_hdlc = d3.scaleLinear().range([0, 70]).domain(d3.extent(patientList, function (d) {
        return d[16];
    })); // hdlc
    var rScale_aki = d3.scaleLinear().range([0, circle_r]).domain([0, 3]);  // 年龄
    var rScale_pre_crea = d3.scaleLinear().range([0, tr_width]).domain(d3.extent(patientList, function (d) {
        return d[18];
    }));  // pre_crea


    var header_text = ['Confidence', '住院号', '手术日期', '住院日期', '出院日期', '肾损伤', '手术年龄', '性别',
        'anemia', '糖尿病', '心力衰竭', 'IABP', 'hypotension', '对比剂用量', 'gfr', '心肌梗死史',
        'Hypercholesterolemia', 'HDL_C', 'urgent_PCI', 'Pre_Crea', '高血压', '主动脉球囊反搏', '心肌梗死', '吸烟',
        '血脂异常', '肾功能异常', "冠心病家族史", "早发冠心病家族史", "CABG手术史", "糖尿病治疗方案", "出血性脑血管疾病", "外周动脉疾病", "慢性肺病", "心率", "收缩压", "舒张压",
        "对比剂类型", "诊断性导管术", "造影结论", "左主干冠状动脉", "近段冠状动脉", "中段/远段/对角支冠状动脉", "Circ.OMs.LPDA.LPL",
        "RCA.RPDA.RPL.AM", "桥血管", "PCI状态", "PCI指征", "D2B 时间", "普通肝素", "阿司匹林(PCI)", "比伐卢定", "直接凝血酶抑制剂",
        "IIb/IIIa受体拮抗剂", "氯吡格雷(PCI)", "普拉格雷(PCI)", "替卡格雷", "噻氯吡啶(PCI)", "术前肌钙蛋白I", "术前血红蛋白", "术前低密度脂蛋白", "术后肌钙蛋白I",
        "术后血红蛋白", "术后低密度脂蛋白", "对比剂过敏"];
    var stage_in_hos_index = [2, 5, 6, 7, 8, 11, 13, 14, 15, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    var stage_pre_index = [32, 33, 34, 36];
    var stage_pre_proce_index = [16, 18, 56, 57, 58];
    var stage_in_proce_index = [1, 10, 12, 17, 20, 35, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 52, 53, 54, 55, 62];
    var stage_after_proce_index = [4, 9, 59, 60, 61];
    var stage_out_hos_index = [3, 51];

    var stage_all = [stage_in_hos_index, stage_pre_index, stage_pre_proce_index, stage_in_proce_index, stage_after_proce_index, stage_out_hos_index];

    var stage_col = [];
    var color_categorical_3 = ['#fc8d59', '#ffffbf', '#91bfdb'];
    var color_categorical_8 = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'];
    var color_stage = ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae'];
    stage_col[0] = stage_col[1] = -1;
    for (var i = 0; i < 64; i++) {
        if (stage_in_hos_index.indexOf(i - 1) != -1) stage_col[i] = 0;
        if (stage_pre_index.indexOf(i - 1) != -1) stage_col[i] = 1;
        if (stage_pre_proce_index.indexOf(i - 1) != -1) stage_col[i] = 2;
        if (stage_in_proce_index.indexOf(i - 1) != -1) stage_col[i] = 3;
        if (stage_after_proce_index.indexOf(i - 1) != -1) stage_col[i] = 4;
        if (stage_out_hos_index.indexOf(i - 1) != -1) stage_col[i] = 5;
    }

    $('#apgraph').empty();
    var head_div = document.createElement('div');
    head_div.setAttribute('class', 'row head');
    document.getElementById('apgraph').appendChild(head_div);
    var table = document.createElement('table');
    table.setAttribute('width', '100%');
    table.setAttribute('id', 'table');
    var body = document.createElement('tbody');
    for (var i = 0; i < 52; i++) {                                                      //表一页显示52行
        var tr = document.createElement('tr');

        for (var j = 0; j < 64; j++) {
            var td = document.createElement('td');
            var di = document.createElement('div');
            var svg_c = document.createElement('svg');
            var m = document.createTextNode(i + ',' + j);
            td.appendChild(di);
            //di.appendChild(m);

//            svg_c.setAttribute('id','s-'+'r'+i+'c'+j);
//            svg_c.setAttribute('class','r'+i+' '+'c'+j+' '+'cell-svg');
//            svg_c.setAttribute('width',tr_width.toString()+'px');
//            svg_c.setAttribute('height',th_height.toString()+'px');
            di.setAttribute('class', 'cell-div' + ' ' + 'd-r' + i + 'c' + j + ' ' + 'row' + i + ' ' + 'col' + j);

            tr.appendChild(td);
            td.setAttribute('class', 'cell' + ' ' + 'tdcol' + j);
//            di.appendChild(svg_c);

        }  //建表
        if (i != 0 && i != 1) {
            if (i % 2 == 0) tr.setAttribute("bgcolor", "#E6E6E6");
            tr.onclick = function () {
                var id = this.id;
                var row_no = parseInt(id.substring(4, id.length));
                var patient_no = parseInt(document.getElementsByClassName("row" + row_no + " " + "col1")[0].textContent);
                console.log(id);
                var reducmenu = d3.select("#reduc_menu select");
                var reductype = reducmenu.property("value");
                var weightArray = [];
                var inputArray = document.getElementsByClassName("inputW1");
                for (var i = 0; i < inputArray.length; i++) {
                    weightArray.push(parseFloat(inputArray[i].value))
                }
                console.log(weightArray);
                $.ajax({
                    type: "POST",
                    url: "/showStoryLines/",
                    traditional: true,
                    data: {
                        'reduction_method': reductype,
                        'weightArray': weightArray
                    },
                    success: function (data) {
                        //drawScatterGraphOption(data);
                        //drawTable_all(data);
                        //              drawStatistical_all(data);
                        //drawTable_test(data);
                        //var distance_array = drawStoryLines(data, patient_no);
                        //drawSimilarPatient(patientList_all,distance_array,divname);
                    }
                });
            };
        }
        tr.setAttribute("id", "tr-r" + i);
        body.appendChild(tr);
    }

    table.appendChild(body);
    document.getElementById('apgraph').appendChild(table);
    table.setAttribute('border', '0');

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0.0);

    var numerical = [5, 12, 13, 16, 18, 32, 33, 34, 38, 39, 40, 41, 42, 46, 56, 57, 58, 59, 60, 61];
    for (var i = 0; i < 64; i++) {
        var div_pos = '.d-' + 'r' + '-1' + 'c' + i;
        var di = document.createElement('div');
        di.setAttribute('class', div_pos);
        head_div.appendChild(di);
    }
    for (var i = 0; i < 64; i++) {                    //表头属性
        var div_pos = '.d-' + 'r' + 0 + 'c' + i;
        //console.log(div_pos);
        var head_g = d3.select(div_pos).append('div')
            .attr("class", "th_head")
            .style('width', tr_width).style('height', th_height);

        var bgc = "#000000";
        for (var j = 0; j < stage_in_hos_index.length; j++) {
            if (stage_in_hos_index[j] + 1 == i) {
                bgc = color_stage[0];
            }
        }
        for (var j = 0; j < stage_pre_index.length; j++) {
            if (stage_pre_index[j] + 1 == i) {
                bgc = color_stage[1];
            }
        }
        for (var j = 0; j < stage_pre_proce_index.length; j++) {
            if (stage_pre_proce_index[j] + 1 == i) {
                bgc = color_stage[2];
            }
        }
        for (var j = 0; j < stage_in_proce_index.length; j++) {
            if (stage_in_proce_index[j] + 1 == i) {
                bgc = color_stage[3];
            }
        }
        for (var j = 0; j < stage_after_proce_index.length; j++) {
            if (stage_after_proce_index[j] + 1 == i) {
                bgc = color_stage[4];
            }
        }
        for (var j = 0; j < stage_out_hos_index.length; j++) {
            if (stage_out_hos_index[j] + 1 == i) {
                bgc = color_stage[5];
            }
        }

        head_g.append("text")
            .text(column_names[i])
            .attr('class', 'head_text')
            .attr('text-anchor', 'middle')
            .style('z-index', '20')
            .style('fill', bgc)
            .attr("transform", "translate(" + tr_width / 2 + "," + th_height / 2 + ")");

        var div_summary_name = 's-c' + i;

        head_g.append('div')
            .attr('class', 'data-summary')
            .attr('id', div_summary_name);

    }


    var toolbar = d3.selectAll('.th_head').append('div')
        .attr('class', 'toolbar').style('font-size','10px');
    var i_label = d3.selectAll(".toolbar").append('i')
        .attr('class', 'fa fa-toggle-left').attr('title', 'collapse').style('font-size','10px');
    var i_label = d3.selectAll(".toolbar").append('i')
        .attr('class', 'fa fa-pencil-square-o').attr('title', 'rename').style('font-size','10px');
    var i_label = d3.selectAll(".toolbar").append('i')
        .attr('class', 'fa fa-filter').attr('title', 'filter').style('font-size','10px');
    var i_label = d3.selectAll(".toolbar").append('i')
        .attr('class', 'fa fa-list-ol').attr('title', 'sort').style('font-size','10px');
    var i_label = d3.selectAll(".toolbar").append('i')
        .attr('class', 'fa fa-pie-chart').attr('title', 'vis').style('font-size','10px');

    var head = $(".th_head");

    head.hover(function () {
        $(this).children(".toolbar").css("display", 'inline-block');
    }, function () {
        $(this).children(".toolbar").css('display', 'none');
    });
    $('.fa-toggle-left').click(function () {
        //$(this).removeClass('toolbar');
        var p_div_toolbar = this.parentNode;
        var p_div = p_div_toolbar.parentNode;
        var classname = p_div.parentNode.className;
        var cname = classname.split(" ");
        var colclass = cname.pop();
        console.log(this,p_div);
        var this_classname = p_div_toolbar.className.split(' ');
        var if_compress = this_classname.pop();
//        console.log(p_div_toolbar);


        if (if_compress != 'compress-toolbar') {
            $('.' + colclass).css('width', 30);
            $('.' + colclass).children("svg").css('width', 30);
            $('.' + colclass).children("svg").children('text').css('display', 'none');
            $('.' + colclass).children("svg").children('circle').css('cx', 30 / 2);
            $('.' + colclass).children("svg").children('.tableRect-NA').css('width',10);
            $('.' + colclass).children("svg").children('.tableRect-NA').css('height',10);


            $(p_div_toolbar).css('right', 0);
            $(this).siblings().css('display', 'none');           // toolbar 只剩一个按钮
            $(p_div_toolbar).css('width', 15);
            $(p_div_toolbar).css('text-align', 'left');
            $(p_div).css('text-align', 'left');
            $(p_div).children('text').css('width', 15);
            $(p_div).children('.data-summary').css('width', 30);

            //console.log(before_width);
            var before_width = $(p_div).children('.data-summary').children('div').length;
            $(p_div).children('.data-summary').children('div').css('width', 30 / before_width);    // 柱形图变小
            //$(p_div).children('div').css('width',30);
            $(p_div_toolbar).addClass('compress-toolbar');
            $(p_div_toolbar).css('text_align', 'left');

            //console.log($(this).siblings());
        }
        else {
            //colclass = cname.pop();
            $('.' + colclass).css('width', 80);
            $('.' + colclass).children("svg").children('.tableRect-NA').css('width',80*0.9);
            $('.' + colclass).children("svg").children('.tableRect-NA').css('height',20*0.9);

            $(p_div_toolbar).css('width', 80);
            $(this).siblings().css('display', 'inline-block');
            $(p_div).css('text-align', 'center');
            $('.' + colclass).children("svg").css('width', 80);
            //$(p_div).children('div').css('width',70);
            $('.' + colclass).children("svg").children('text').css('display', 'inline-block');
            $('.' + colclass).children("svg").children('circle').css('cx', 80 / 2);
            $(p_div).children('text').css('display', 'inline-block');
            $(p_div).children('text').css('width', 80);
            $(p_div).children('.data-summary').css('width', 80);

            var before_width = $(p_div).children('.data-summary').children('div').length;

            $(p_div).children('.data-summary').children('div').css('width', 80 / before_width);
            $(p_div_toolbar).css('right', 5);
            $(p_div_toolbar).removeClass('compress-toolbar');
        }

    });
    $('.fa-pencil-square-o').click(
        function () {
            var left = $(this).offset().left;
            //alert(left);
            var top = $(this).offset().top;
            //alert(top);

            var positionX = left;
            var positionY = top;
            var myOffset = new Object();
            myOffset.left = positionX;
            myOffset.top = positionY;
            //$("#MyDiv").offset(myOffset);
            $("#MyDiv").css({position: "absolute", 'top': top, 'left': left, 'z-index': 2});
            $("#MyDiv").width(162);
            $("#MyDiv").height(200);
            var div1 = $('#MyDiv').show();
        }
    );
    $('.fa-filter').click(function () {               // 筛选

            var p_div_toolbar = this.parentNode;
            var p_div = p_div_toolbar.parentNode;
            var classname = p_div.parentNode.className;
            console.log(classname);
            var cname = classname.split(" ");
            var colclass = cname.pop();
            var col_num = parseInt(colclass.substring(3));
            var left = $(this).offset().left;
            //alert(left);
            var top = $(this).offset().top;
            //alert(top);

            var positionX = left;
            var positionY = top;
            var myOffset = {};
            myOffset.left = positionX;
            myOffset.top = positionY;
            //$("#MyDiv").offset(myOffset);
            $("#filter-pop").css({position: "absolute", 'top': top+10, 'left': left+10, 'z-index': 2});
            // $("#filter-pop").width(330);
            // $("#filter-pop").height(500);
            var filter_html = "";

            if (cross_cate[col_num-5]['max'] === -1000){     //类别型
                 delete cross_cate[col_num-5]['max'];
                 delete cross_cate[col_num-5]['min'];
                 //console.log(col_num-5);
                 console.log(cross_cate[col_num-5]);
                 for (var b in cross_cate[col_num-5]){
                     //console.log(b);
                     var check_box_id = col_num.toString()+"-"+b;
                     filter_html += "<tr><td class='checkmark'><input type='checkbox' class= 'filter-checkbox' id =" + check_box_id + "></td><td class='datalabel' style='opacity: 1;'>"+b+"</td></tr>"
            }
            cross_cate[col_num-5]['max'] = -1000;
            cross_cate[col_num-5]['min'] = -1000;
            $("#filter-selectionTablebody").html(filter_html);

            }
            else{
                var min_val =  cross_cate[col_num-5]['min'];
                var max_val =  cross_cate[col_num-5]['max'];
                delete cross_cate[col_num-5]['max'];
                delete cross_cate[col_num-5]['min'];
                console.log(Object.keys(cross_cate[col_num-6]).length);
                console.log(min_val);
                console.log(max_val);
                for (var b in cross_cate[col_num-5]){
                    var show_text = "";
                    console.log(parseInt(b+1));
                    var check_box_id = col_num.toString()+"-"+b;

                    show_text += parseFloat(min_val+parseFloat(b)* (max_val-min_val)/Object.keys(cross_cate[col_num-5]).length).toFixed(2).toString();
                    show_text += ' ~ ';
                    show_text += parseFloat(min_val+(parseFloat(b)+1)*(max_val-min_val)/Object.keys(cross_cate[col_num-5]).length).toFixed(2).toString();

                    filter_html += "<tr><td class='checkmark'><input type='checkbox' class= 'filter-checkbox' id ="+ check_box_id +"></td><td class='datalabel' style='opacity: 1;'>"+show_text+"</td></tr>"

            }
            cross_cate[col_num-5]['max'] = max_val;
            cross_cate[col_num-5]['min'] = min_val;
            $("#filter-selectionTablebody").html(filter_html);
            }

            var div1 = $('#filter-pop').show();
        // $('.checkicon').click(
        //     function () {
        //         var iconname = $(this)[0].className.split(" ");
        //         if (iconname.indexOf("fa-check-square-o") != -1){
        //             $(this).addClass("fa-square-o");
        //             $(this).removeClass("fa-check-square-o");
        //         }
        //         if(iconname.indexOf("fa-square-o") != -1){
        //             $(this).addClass("fa-check-square-o");
        //             $(this).removeClass("fa-square-o");
        //         }
        //         console.log(iconname.indexOf("fa-check-square-o"));
        //         console.log(iconname.indexOf("fa-square-o"));
        //
        //     }
        //
        // );

    });
    $('.fa-list-ol').click(function () {
        var p_div_toolbar = this.parentNode;
        var p_div = p_div_toolbar.parentNode;
        var classname = p_div.parentNode.className;
        var cname = classname.split(" ");
        var colclass = cname.pop();


        //console.log(colclass);
        var col_num = parseInt(colclass.substring(3));
       //console.log(col_num);


        //var order_stage = parseInt(this.getAttribute('stage'));
        //console.log($(this));
        //console.log(this.getAttribute('stage'));
        //console.log(typeof patientList_all[0][col_num]);
        if(order_stage[col_num] == 0){
             if ('number' === typeof patientList_all[0][col_num-1]) {
                console.log('yes');
                console.log(col_num);
                patientList_all.sort(function(x, y){
                            return y[col_num-1]- x[col_num-1];
                        });
            }
            else{
                    patientList_all.sort(function(x, y){
                    return y[col_num-1].localeCompare(x[col_num-1]);
                });
            }
            //console.log(patientList_all);
            var patientList_order =  patientList_all.slice(0,49);
            drawTable_withTable(patientList_all,patientList_order, column_names , divname);
            allPatientList = patientList_all;
            order_stage[col_num] =1;
        }
        else if(order_stage[col_num] == 1){
            if ('number' === typeof patientList_all[0][col_num-1]) {
                console.log('yes');
                console.log(col_num);
            patientList_all.sort(function(x, y){
                            return x[col_num-1]- y[col_num-1];
                        });
            }
            else{
                patientList_all.sort(function(x, y){
                    return x[col_num-1].localeCompare(y[col_num-1]);
                 });
             }
            //console.log(patientList_all);
            var patientList_order =  patientList_all.slice(0,49);
            drawTable_withTable(patientList_all,patientList_order, column_names , divname);
            allPatientList = patientList_all;
            order_stage[col_num] = 2;
            console.log(order_stage[col_num]);
        }
        else{
             patientList_all.sort(function(x, y){
                            return x[0]- y[0];
                        });
             var patientList_order =  patientList_all.slice(0,49);
             drawTable_withTable(patientList_all,patientList_order, column_names , divname);
             allPatientList = patientList_all;
            order_stage[col_num] =0;
        }


    });
    $('.fa-pie-chart').click(function (){
        var p_div_toolbar = this.parentNode;
        var p_div = p_div_toolbar.parentNode;
        var classname = p_div.parentNode.className;
        var cname = classname.split(" ");
        var colclass = cname.pop();


        //console.log(colclass);
        var col_num = parseInt(colclass.substring(3));
        if(numerical.indexOf(col_num-1)==-1) return;

        var th_height = 20,tr_width = 80;
        var rect_r = 10, circle_r = th_height/2.2;

        if(vis_stage[col_num]==0){
            for (var index=2;index<patientList.length+2;index++){
                var div_pos = '.d-'+'r'+index+'c'+(col_num);
                var rScale = d3.scaleLinear().range([0, circle_r]).domain(d3.extent(patientList_all, function(d){ return d[col_num-1];}));
//                  console.log(numerical.indexOf(row_no));
                $(div_pos).empty();
                var svg = d3.select(div_pos).append('svg').attr('width',70).attr('height',20);
                svg.append("circle")
                    .attr("class", "circleTable")
                    .attr("r", rScale(patientList[index-2][col_num-1]))
                    .attr("cx", tr_width/2)
                    .attr("cy", th_height/2)
                    .attr("fill", colorArr[numerical.indexOf(col_num-1)]);
                svg.append('text')
                    .text(String(patientList[index-2][col_num-1]).indexOf(".")!=-1?patientList[index-2][col_num-1].toFixed(1):patientList[index-2][col_num-1])
                    .attr('fill','black')
                    .attr('x', tr_width*0.1)
                    .attr('y', th_height*0.1)
                    .attr('text-anchor', 'right')
                    .style('font-size', '10px')
                    .attr('dy', 8);
            }
            vis_stage[col_num]=1;
        }
        else if(vis_stage[col_num]==1){
            for (var index=2;index<patientList.length+2;index++){
                var div_pos = '.d-'+'r'+index+'c'+(col_num);
                var rScale = d3.scaleLinear().range([0, tr_width]).domain(d3.extent(patientList_all, function(d){ return d[col_num-1];}));
//                console.log(numerical.indexOf(row_no));
                $(div_pos).empty();
                var svg = d3.select(div_pos).append('svg').attr('width',70).attr('height',20);
                svg.append("rect")
                    .attr("class", "rectTable")
                    .attr("width", rScale(patientList[index-2][col_num-1]))
                    .attr("height",th_height)
                    .attr("rx", 3)
                    .attr("ry", 3)
                    .attr("transform","translate(" + 0+ "," + 3 + ")")
                    .attr("fill", colorArr[numerical.indexOf(col_num-1)]);
                svg.append('text')
                    .text(patientList[index-2][col_num-1]).attr('fill','black')
                    .attr('x', tr_width/2)
                    .attr('y', th_height/2)
                    .attr('text-anchor', 'middle')
                    .style('font-size', '10px')
                    .attr('dy', 8);
            }
            vis_stage[col_num]=0;
        }
    });


    for (var index = 2; index < patientList.length + 2; index++) { //考虑翻页 //patient.length
        var count = 0;
        for (var j = 0; j < patientList[index - 2].length; j++) {
            if (patientList[index - 2][j] == "NA") {
                count++;
            }
        }
        for (var col = 0; col < patientList[0].length + 1; col++) {
//            console.log(col);
//            console.log(stage_col[col]);

            var div_pos = '.d-' + 'r' + index + 'c' + col;
            //console.log(div_pos);
            var svg = d3.select(div_pos).append('svg').attr('width', tr_width).attr('height', th_height);

            //console.log(svg);
            if (col == 0) {    // 统计信息
                var arc_g = svg.append('g')
                    .attr("transform", "translate(" + tr_width / 2 + "," + th_height / 2 + ")");
                var arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(circle_r)
                    .startAngle(0)
                    .endAngle(2 * Math.PI * ((63 - count) / 63));
                arc_g.append("path")
                    .attr("class", 'arc')
                    .style('fill', 'pink')
                    .attr('d', arc);
            }
            else if (col == 1 || col == 2) {
                svg.append("text")
                    .attr("class", "textTable")
                    .text(patientList[index - 2][col - 1])
                    .attr('text-anchor', 'middle')
                    .attr("transform", "translate(" + tr_width / 2 + "," + th_height / 2 + ")");
//                    .attr("fill", colorArr[index]);
            }
            else if (col == 3 || col == 4) {
                svg.append("text")
                    .attr("class", "textTable")
                    .text(patientList[index - 2][col - 1].substring(0, 8))
                    .attr('text-anchor', 'middle')
                    .attr("transform", "translate(" + tr_width / 2 + "," + th_height / 2 + ")")
                    .attr("fill", 'black');
            }
            else if (col == 5) {
                //var rScale_x = d3.scaleLinear().range([0, tr_width]).domain(d3.extent(patientList, function(d){ return d[col-1];}));
                //var g_numer = d3.select(this).append('g');
                svg.append("circle")
                    .attr("class", "circleTable")
                    .attr("r", rScale_aki(patientList[index - 2][col - 1]))
                    .attr("cx", tr_width / 2)
                    .attr("cy", th_height / 2)
                    .attr("fill", aki_color[patientList[index - 2][col - 1]]);
                if (patientList[index - 2][col - 1] != 0) {
                    svg.append('text')
                        .text(patientList[index - 2][col - 1].toString())
                        .attr('text-anchor', 'middle')
                        .attr("transform", "translate(" + tr_width / 2 + "," + th_height / 2 + ")");
                }
            }
            else if (numerical.indexOf(col - 1) != -1)//数值型
            {
                if (vis_stage[col]==1) {
                    var div_pos = '.d-' + 'r' + index + 'c' + (col);
                    var rScale = d3.scaleLinear().range([0, circle_r]).domain(d3.extent(patientList_all, function (d) {
                        return d[col - 1];
                    }));
//                        console.log(numerical.indexOf(row_no));
                    $(div_pos).empty();
                    var svg = d3.select(div_pos).append('svg').attr('width', tr_width).attr('height', th_height);
                    svg.append("circle")
                        .attr("class", "circleTable")
                        .attr("r", rScale(patientList[index - 2][col - 1]))
                        .attr("cx", tr_width / 2)
                        .attr("cy", th_height / 2)
                        .attr("fill", colorArr[numerical.indexOf(col - 1)]);
                    // svg.append('text')
                    //     .text(patientList[index-2][col-1]).attr('fill','black')
                    //     .attr('x', tr_width*0.1)
                    //     .attr('y', th_height*0.1)
                    //     .attr('text-anchor', 'middle')
                    //     .style('font-size', '10px')
                    //     .attr('dy', 8);
                }
                else if (vis_stage[col]==0) {
                    var div_pos = '.d-' + 'r' + index + 'c' + (col);
                    var rScale = d3.scaleLinear().range([0, tr_width]).domain(d3.extent(patientList_all, function (d) {
                        return d[col - 1];
                    }));
//                        console.log(numerical.indexOf(row_no));
                    $(div_pos).empty();
                    var svg = d3.select(div_pos).append('svg').attr('width', tr_width).attr('height', th_height);
                    svg.append("rect")
                        .attr("class", "rectTable")
                        .attr("width", rScale(patientList[index - 2][col - 1]))
                        .attr("height", th_height)
                        .attr("rx", 3)
                        .attr("ry", 3)
                        .attr("transform", "translate(" + 0 + "," + 3 + ")")
                        .attr("fill", colorArr[numerical.indexOf(col - 1)]);
                    svg.append('text')
                        .text(patientList[index - 2][col - 1])
                        .attr('fill', 'black')
                        .attr('x', rScale(patientList[index - 2][col - 1]))
                        .attr('y', th_height / 2)
                        .attr('text-anchor', 'right')
                        .style('font-size', '10px')
                        .attr('dy', 8);
                }
            }

//            else if(col == 6 || col ==13 || col == 14){
//                    var rScale_x = d3.scaleLinear().range([0, circle_r]).domain(d3.extent(patientList, function(d){ return d[col-1];}));
//                    //console.log(col);
//                    svg.append("circle")
//                    .attr("class", "circleTable")
//                    .attr("r", rScale_x(patientList[index-2][col-1]))
//                    .attr("cx", tr_width/2)
//                    .attr("cy", th_height/2)
//                    .attr("fill", colorArr[col-1]);
//                    if(col == 6){
//                        svg.append('text')
//                        .text(patientList[index-2][col-1]).attr('fill','black')
//                        .attr('x', tr_width*0.1)
//                        .attr('y', th_height*0.1)
//                        .attr('text-anchor', 'middle')
//                        .style('font-size', '10px')
//                        .attr('dy', 8);
//                    }
//
//            }
//
//
//            else if(col ==19 || col == 33 || col == 34||col == 35||col == 39||col == 40||col == 41||col == 42){
//                var rScale_x = d3.scaleLinear().range([0, tr_width]).domain(d3.extent(patientList, function(d){ return d[col-1];}));
//
//                svg.append("rect")
//                    .attr("class", "rectTable")
//                    .attr("width", rScale_x(patientList[index-2][col-1]))
//                    .attr("height",th_height)
//                    .attr("rx", 3)
//                    .attr("ry", 3)
//                    .attr("transform","translate(" + 0+ "," + 3 + ")")
//                    .attr("fill", 'Salmon');
//                svg.append('text')
//                        .text(patientList[index-2][col-1]).attr('fill','black')
//                        .attr('x', tr_width/2)
//                        .attr('y', th_height/2)
//                        .attr('text-anchor', 'middle')
//                        .style('font-size', '10px')
//                        .attr('dy', 8);
//            }
//            else if(col == 43 ||col == 47||col == 57||col == 58||col == 59||col == 60||col == 61||col == 62 ){
//                var rScale_x = d3.scaleLinear().range([0, tr_width]).domain(d3.extent(patientList, function(d){ return d[col-1];}));
//
//                svg.append("rect")
//                    .attr("class", "rectTable")
//                    .attr("width", rScale_x(patientList[index-2][col-1]))
//                    .attr("height",th_height)
//                    .attr("rx", 3)
//                    .attr("ry", 3)
//                    .attr("transform","translate(" + 0+ "," + 3 + ")")
//                    .attr("fill", 'NavajoWhite');
//                svg.append('text')
//                        .text(patientList[index-2][col-1]).attr('fill','black')
//                        .attr('x', tr_width/2)
//                        .attr('y', th_height/2)
//                        .attr('text-anchor', 'middle')
//                        .style('font-size', '10px')
//                        .attr('dy', 8);
//            }

            else {
                if (patientList[index - 2][col - 1] == '否' && col > 4) {
                    //console.log(col);
                    svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", color_categorical_8[1]);
                    svg.append('text')
                        .text('否').attr('fill', 'black')
                        .attr('x', rect_r * 1.5)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'left')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                }
                if (patientList[index - 2][col - 1] == '是' && col > 4) {
                    //console.log(col);
                    svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", color_categorical_8[0]);
                    svg.append('text')
                        .text('是').attr('fill', 'black')
                        .attr('x', rect_r * 1.5)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'left')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                }
                if (patientList[index - 2][col - 1] == '有') {
                    svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", color_categorical_8[0])
                        .on("mouseover", function (d) {
                            tooltip.html("有")
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY + 20) + "px")
                                .style("opacity", 1.0);
                        })
                        .on("mousemove", function (d) {
                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */

                            tooltip.style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY + 20) + "px");
                        })
                        .on("mouseout", function (d) {
                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/

                            tooltip.style("opacity", 0.0);
                        });
                    svg.append('text')
                        .text('有').attr('fill', 'black')
                        .attr('x', rect_r * 1.5)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'left')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                }
                if (patientList[index - 2][col - 1] == '见现病史') {
                    svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", color_categorical_8[2])
                        .on("mouseover", function (d) {
                            tooltip.html("见现病史")
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY + 20) + "px")
                                .style("opacity", 1.0);
                        })
                        .on("mousemove", function (d) {
                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */

                            tooltip.style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY + 20) + "px");
                        })
                        .on("mouseout", function (d) {
                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/

                            tooltip.style("opacity", 0.0);
                        });
                    svg.append('text')
                        .text('见现病史').attr('fill', 'black')
                        .attr('x', rect_r * 1.5)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'left')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                }
                if (patientList[index - 2][col - 1] == '无') {
                    svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", color_categorical_8[1])
                        .on("mouseover", function (d) {
                            tooltip.html("无")
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY + 20) + "px")
                                .style("opacity", 1.0);
                        })
                        .on("mousemove", function (d) {
                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */

                            tooltip.style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY + 20) + "px");
                        })
                        .on("mouseout", function (d) {
                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/

                            tooltip.style("opacity", 0.0);
                        });
                    svg.append('text')
                        .text('无').attr('fill', 'black')
                        .attr('x', rect_r * 1.5)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'left')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                }
                if (patientList[index - 2][col - 1] == 'NA') {
                    svg.append("rect")
                        .attr("class", "tableRect-NA")
                        .attr("x", 1)
                        .attr("y", 1)
                        .attr("width", tr_width * 0.9)
                        .attr("height", th_height)
                        .attr("fill", 'url("#stripes")')
                        .on("mouseover", function (d) {
                            tooltip.html("NA")
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY + 20) + "px")
                                .style("opacity", 1.0);
                        })
                        .on("mousemove", function (d) {
                            /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */

                            tooltip.style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY + 20) + "px");
                        })
                        .on("mouseout", function (d) {
                            /* 鼠标移出时，将透明度设定为0.0（完全透明）*/

                            tooltip.style("opacity", 0.0);
                        });
                }
                if (patientList[index - 2][col - 1] == '0' && col > 4) {
                    //console.log(col);
                    svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", color_categorical_8[1]);
                    svg.append('text')
                        .text('0').attr('fill', 'black')
                        .attr('x', tr_width / 2)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'middle')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                }
                if (patientList[index - 2][col - 1] == '1' && col > 4) {
                    //console.log(col);
                    svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", color_categorical_8[0]);
                    svg.append('text')
                        .text('1').attr('fill', 'black')
                        .attr('x', tr_width / 2)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'middle')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                }
                if (patientList[index - 2][col - 1] == '女' && col > 4) {
                    //console.log(col);
                    svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", 'blue');
                    svg.append('text')
                        .text('女').attr('fill', 'black')
                        .attr('x', tr_width / 2)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'middle')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                }
                if (patientList[index - 2][col - 1] == '男' && col > 4) {
                    //console.log(col);
                    svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", 'orange');
                    svg.append('text')
                        .text('男').attr('fill', 'black')
                        .attr('x', tr_width / 2)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'middle')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                }
                if (patientList[index - 2][col - 1] == '冠状动脉粥样硬化') {
                    //console.log(col);
                    svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", color_categorical_8[3]);
                    svg.append('text')
                        .text('冠状动脉粥样硬化').attr('fill', 'black')
                        .attr('x', rect_r * 1.5)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'left')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                }
                if (patientList[index - 2][col - 1] == '冠脉三支病变') {
                    //console.log(col);
                    svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", color_categorical_8[4]);
                    svg.append('text')
                        .text('冠脉三支病变').attr('fill', 'black')
                        .attr('x', rect_r * 1.5)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'left')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                }
                if (patientList[index - 2][col - 1] == '冠脉双支病变') {
                    //console.log(col);
                    svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", color_categorical_8[5]);
                    svg.append('text')
                        .text('冠脉双支病变').attr('fill', 'black')
                        .attr('x', rect_r * 1.5)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'left')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                }
                if (patientList[index - 2][col - 1] == '冠脉单支病变') {
                    //console.log(col);
                    svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", color_categorical_8[6]);
                    svg.append('text')
                        .text('冠脉单支病变').attr('fill', 'black')
                        .attr('x', rect_r * 1.5)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'left')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                }
                if (patientList[index - 2][col - 1] == '冠脉造影未见明显异常') {
                    //console.log(col);
                    svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", color_categorical_8[7]);
                    svg.append('text')
                        .text('冠脉造影未见明显异常').attr('fill', 'black')
                        .attr('x', rect_r * 1.5)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'left')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                }
                if (col - 1 == 44) {
                    if (patientList[index - 2][col - 1] == "NA") {

                    }
                    else {
                        var categoies = ['NA', '急诊', '择期', '早期'];
                        svg.append("rect")
                            .attr("class", "tableRect")
                            .attr("x", 0)
                            .attr("y", th_height / 4)
                            .attr("width", rect_r)
                            .attr("height", rect_r)
                            .attr("fill", color_categorical_8[categoies.indexOf(patientList[index - 2][col - 1]) + 3]);
                        svg.append('text')
                            .text(patientList[index - 2][col - 1]).attr('fill', 'black')
                            .attr('x', tr_width / 2)
                            .attr('y', th_height / 2 - rect_r / 2)
                            .attr('text-anchor', 'middle')
                            .style('font-size', '12px')
                            .attr('dy', 8);
                    }
                }
                if (col - 1 == 45) {

                    if (patientList[index - 2][col - 1] == "NA") {
                    }
                    else {
                        var categoies = ['NA', 'PCI治疗STEMI（稳定，心梗发作>12小时）', 'PCI治疗STEMI（成功足量溶栓治疗后稳定）', 'STEMI的紧急PCI治疗', 'PCI治疗稳定型心绞痛', '分次PCI', 'PCI治疗高风险Non-STEMI或不稳定型心绞痛', 'PCI治疗STEMI（不稳定，心梗发作>12小时)'];
                        svg.append("rect")
                            .attr("class", "tableRect")
                            .attr("x", 0)
                            .attr("y", th_height / 4)
                            .attr("width", rect_r)
                            .attr("height", rect_r)
                            .attr("fill", color_categorical_8[categoies.indexOf(patientList[index - 2][col - 1])]);
                        var svg_g = svg.append('g').attr('class','text-wrapper');
                        svg_g.append('text')
                            .text(patientList[index - 2][col - 1]).attr('fill', 'black')
                            .attr('width', 50)
                            .attr('x', rect_r * 1.5)
                            .attr('y', th_height / 2 - rect_r / 2)
                            .attr('text-anchor', 'left')
                            .style('font-size', '12px')
                            .style('overflow', 'hidden')
                            .style('text-overflow', 'ellipsis')
                            .style("white-space","nowrap")
                            .attr('dy', 8);
                    }


                }

                if (col - 1 == 35) {
                    var categoies = ['威视派克', '优维显', '欧乃派克', '典比乐'];
                    svg.append("rect")
                        .attr("class", "tableRect")
                        .attr("x", 0)
                        .attr("y", th_height / 4)
                        .attr("width", rect_r)
                        .attr("height", rect_r)
                        .attr("fill", color_categorical_8[categoies.indexOf(patientList[index - 2][col - 1])]);
                    svg.append('text')
                        .text(patientList[index - 2][col - 1]).attr('fill', 'black')
                        .attr('x', rect_r * 1.5)
                        .attr('y', th_height / 2 - rect_r / 2)
                        .attr('text-anchor', 'left')
                        .style('font-size', '12px')
                        .attr('dy', 8);
                }

            }

        }

    }
//    console.log(stage_all.length);
    for(var now_i = 0;now_i<stage_all.length;now_i++ ){
//        console.log("fuck");
//        console.log(document.getElementById("sumattr"+now_i+"-td3").innerHTML);
        if(document.getElementsByClassName("stageNavSpan")[now_i].innerHTML.indexOf("(不显示)")==-1) continue;

        for(var j=2;j<columsName.length;j++){
                    if(stage_all[now_i].indexOf(j-1)!=-1)
                    {
                        $(".col"+j).hide();
                    }
        }
    }
    for (var cl = 5; cl < column_names.length; cl++) {
            draw_data_summary_in_head(patientList_all, cl);
    }
}

function drawSimilarPatient(data,divname){
    patientDictList = pagePatientDictList.slice(0,50);
//    console.log(distance_array);
    // 这里好像不对？
    drawTable_withTable_editByYu20180919(pagePatientDictList,patientDictList,columsName,divname);
}



function drawStatistical(patientList, divname){

    var div = document.getElementById(divname);
    var client_width = div.clientWidth;
    var client_height = div.clientHeight;
    var margin = {top:30, right: 30, bottom: 50, left: 30},
        width = client_width - margin.left - margin.right,
        height = client_height - margin.top - margin.bottom;
    var th_height = 35,tr_width = 70; // tr_width = width/patientList[0].length;
    var rect_r = 10, circle_r = th_height/2;

    var colorArr = ['#8D483C','#94494D','#954D5F','#925572','#885E82','#796990','#657399','#4E7D9D','#33869A',
        '#1C8E93','#1A9586','#319A77','#4D9D66','#689F55','#84A046','#A09E3D','#BC9B3C','#D69644','#ED9154','#000000'];

    var aki_color = ['#74d97b','#0326ed', '#ff8201', '#ff2be9'];

    var header_text =['Confidence','住院号','手术日期','住院日期','出院日期','肾损伤','手术年龄','性别',
                    'anemia','糖尿病','心力衰竭','IABP','hypotension','对比剂用量','gfr','心肌梗死史',
                    'Hypercholesterolemia','HDL_C','urgent_PCI','Pre_Crea','高血压','主动脉球囊反搏','心肌梗死','吸烟',
                    '血脂异常','肾功能异常',"冠心病家族史",	"早发冠心病家族史",	"CABG手术史",	"糖尿病治疗方案",	"出血性脑血管疾病",	"外周动脉疾病","慢性肺病",	"心率",	"收缩压",	"舒张压",
                    "对比剂类型",	"诊断性导管术",	"造影结论",	"左主干冠状动脉",	"近段冠状动脉",	"中段/远段/对角支冠状动脉",	"Circ、OMs、LPDA、LPL",
                    "RCA...冠状动脉",	"桥血管",	"PCI状态",	"PCI指征",	"D2B 时间(分钟)",	"普通肝素",	"阿司匹林(PCI)",	"比伐卢定",	"直接凝血酶抑制剂",
                    "IIb/IIIa受体拮抗剂",	"氯吡格雷(PCI)",	"普拉格雷(PCI)",	"替卡格雷",	"噻氯吡啶(PCI)",	"术前肌钙蛋白I",	"术前血红蛋白",	"术前低密度脂蛋白",	"术后肌钙蛋白I",
                    "术后血红蛋白",	"术后低密度脂蛋白","对比剂过敏"];
    var stage_in_hos_index = [2,5,6,7,8,11,13,14,15,19,21,22,23,24,25,26,27,28,29,30,31];
    var stage_pre_index = [32,33,34,36];
    var stage_pre_proce_index = [16,18,56,57,58];
    var stage_in_proce_index = [1,10,12,17,20,35,37,38,39,40,41,42,43,44,45,46,47,48,49,50,52,53,54,55,62];
    var stage_after_proce_index = [4,9,59,60,61];
    var stage_out_hos_index = [3];
    var color_stage = ['#92D050','#00B050','#00B0F0','#0070C0','#FF0000','#FFE900'];
}

function drawTable_all(allData){
    var patientList = allData[0];
    var divname = "apgraph";
    drawTable(patientList, divname);
}

function drawTable_test(allData){
    var patientList_all = allData[0];
    var patientList = allData[1];
    var divname = "spgraph";
//    drawTable_withTable(patientList_all,patientList, columsName,divname);
     $('.hasBeenSelected').empty();
    for (var i = 0; i < columsName.length; i++) {
        $(".hasBeenSelected ").append("<div class=\"selectedInfor selectedShow\" style=\"display:none\"  num = \" " + i +" \" ><span></span><label></label><em></em></div>");
    }
    $(".selectedShow em").click(function(){                // 删除筛选条件函数
             $(this).parents(".selectedShow").hide();
             if($(".listIndex .selected").length < 2){
                 $(".eliminateCriteria").hide();
             }
             var selection_condition =  $('.selectedShow:visible');
             var filter_patients = allPatientDictList;

             selection_condition.each(function () {
                 var temp=[];
                 var conditions =  this.innerText.split(':');
                 console.log(conditions);
                 console.log(this.getAttribute('num'));
                 var selected_col_name = conditions[0];
                 var selected_col_num =  parseInt(this.getAttribute('num'));
                 //类别型
                 if(attributeNumericalList.indexOf(selected_col_name) === -1){
                      for(var j = 0;j<filter_patients.length;j++){
                          if(filter_patients[j][selected_col_name].toString() === conditions[1]){
                              temp.push(filter_patients[j]);
                          }
                      }
                      filter_patients = temp;
                 }
                 // 数值型
                 else{
                     var domain =  conditions[1].split('~ ');
                     var lower_band = parseFloat(domain[0]);
                     var upper_band = parseFloat(domain[1]);
                     console.log(lower_band);
                     console.log(upper_band);
                     for(var j = 0;j<filter_patients.length;j++){
                          if(filter_patients[j][selected_col_name]<= upper_band && filter_patients[j][selected_col_name]>=lower_band){
                              temp.push(filter_patients[j]);
                          }
                     }
                     filter_patients = temp;
                 }

             });
             //console.log(filter_patients);
       drawTable_withTable_editByYu20180919(filter_patients,filter_patients.slice(0,49),cross_column_names,"spgraph");
         });
    drawTable_withTable_editByYu20180919(allPatientDictList,allData[5],columsName,divname);
}

function drawStatistical_all(allData){
     var patientList = allData[0];
     var divname = "apgraph";
    drawStatistical(patientList, divname);
}


function drawTable_selected(idList, patientList){
     $('#spgraph').empty();

    var newpatientList = [];
    idList.forEach(function(id){
        newpatientList.push(patientList[id]);
    });
    drawTable(newpatientList, "spgraph");
}
function jqueryCloseDiv() {
    $('#MyDiv').hide();
};
function draw_data_summary_in_head(patientDictList_all,col_num) {
    var div_id = 's-c'+col_num;
    //console.log(div_id);
    var width = document.getElementById(div_id).clientWidth;
    //console.log(width);
    var numerical = [5,12,13,16,18,32,33,34,38,39,40,41,42,46,56,57,58,59,60,61]; //差一 也就是说没加前面的confidence的列数 id=0开始
    //alert('in');
    var color_categorical_2 = ["blue","orange"];
    var color_categorical_3 = ['#fc8d59', '#ffffbf', '#91bfdb'];
    var color_categorical_8 = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'];
    var colorArr = ['#8D483C','#94494D','#954D5F','#925572','#885E82','#796990','#657399','#4E7D9D','#33869A',
        '#1C8E93','#1A9586','#319A77','#4D9D66','#689F55','#84A046','#A09E3D','#BC9B3C','#D69644','#ED9154','#000000'];

    if(attributeStrList.indexOf(columsName[col_num])!=-1) {
//        console.log(columsName[col_num]);
        return;
    }

    if(attributeCategoricalList.indexOf(columsName[col_num])!=-1){ //即为类别型数据
//        console.log(columsName[col_num]);
        var categoryNum = attributeRangeOrCateNum[columsName[col_num]]["categoryNum"];
        var categorySet = attributeRangeOrCateNum[columsName[col_num]]["categorySet"];
        var localColorSet = [];
        switch(categoryNum){
            case 2:
                localColorSet = color_categorical_2;
                break;
            case 3:
                localColorSet = color_categorical_3;
                break;
            default:
                localColorSet = color_categorical_8;
        }
        var localColorScale = d3.scaleOrdinal().domain(categorySet).range(localColorSet);
//        if(col_num==3){
//            console.log(localColorScale(categorySet[0]),localColorScale(categorySet[2]));
//        }
        var col_data = [];
        for (var i=0;i<patientDictList_all.length;i++){
            col_data.push(patientDictList_all[i][columsName[col_num]]);
        }

        var obj = {},k;
        for (var i = 0, len = col_data.length; i < len; i++) {
            k = col_data[i];
            if (obj[k])
                obj[k]++;
            else
                obj[k] = 1;
        }
        //console.log(obj);
        var max_number = 0;
        var obj_length = 0;
        for(var o in obj){
            obj_length++;
            if (obj[o]>max_number)
                max_number = obj[o]
        }
        //console.log(max_number);

        var cate_count = 0 ;
        for (var j in obj){
            var bgc='#ffffff';
            if(j=='是'||j=='有'||j==1){
                bgc = '#e41a1c';
            }
            else if (j=='无'||j=='否'||j==0){
                bgc = '#377eb8';
            }
            else if(j=='NA'){
                bgc = '#999999';
            }
            else if(j=='见现病史'){
                bgc = '#4daf4a';
            }
            else if (j=='男'){
                bgc='orange';
            }
            else if (j=='女'){
                bgc = 'blue';
            }
            else {
                bgc = color_categorical_8[cate_count];
            }
            //console.log(70/obj_length);
            d3.select('#'+div_id).append('div')
                .style('height',((obj[j]/max_number)*90).toString()+"%")
                .style('width',((width-2)/obj_length).toString()+'px')
                .style('background-color',localColorScale(j))
                .style('display','inline-block')
                .style('border','1px solid')
                .style('opacity','0.7')
                .attr('title',j)
                .attr('transform',"translate(" + cate_count*((width-2)/obj_length) + "," + 20 + ")");
            cate_count++;
        }
             obj['min'] = -1000;
             obj['max'] = -1000;
             cross_cate.push(obj);
    }
    else{                      // 数值型数据
        var col_data = [];
//        console.log(columsName[col_num]);
        var max_value = attributeRangeOrCateNum[columsName[col_num]]["high"];
        var min_value = attributeRangeOrCateNum[columsName[col_num]]["low"];

        for (var i=0;i<patientDictList_all.length;i++){
            col_data.push(patientDictList_all[i][columsName[col_num]]);
//            if (max_value < patientDictList_all[i][columsName[col_num])
//                max_value = patientDictList_all[i][columsName[col_num];
//            if (min_value > patientDictList_all[i][columsName[col_num])
//                min_value = patientDictList_all[i][columsName[col_num];
        }
        //console.log(max_value);
        //console.log(min_value);
        var bin_num = 9;
        var bins = (max_value-min_value)/bin_num;
        var obj = {},k;
        for (var i = 0;i<bin_num+1;i++){
            obj[i]=0;
        }
        //console.log(bins);
        for (var i = 0, len = col_data.length; i < len; i++) {
            // k = col_data[i];
            // if (obj[k])
            //     obj[k]++;
            // else
            //     obj[k] = 1;
            obj[Math.floor((col_data[i]-min_value)/bins)]++;
            //onsole.log(Math.floor((col_data-min_value)/bins));

        }
        obj[8]+=obj[9];
        delete obj[9];

        //console.log(obj);
        var max_number = 0;
        var obj_length = 0;
        for(var o in obj){
            obj_length++;
            if (obj[o]>max_number)
                max_number = obj[o]
        }
        //console.log(max_number);
        var div_id = 's-c'+col_num;
        var cate_count = 0 ;
        for (var j in obj){
            //console.log(70/obj_length);
            d3.select('#'+div_id).append('div')
                .style('height',((obj[j]/max_number)*90).toString()+"%")
                .style('width',((width-2)/obj_length).toString()+'px')
                .style('background-color',colorArr[attributeNumericalList.indexOf(columsName[col_num])])
                .style('display','inline-block')
                .style('border','1px solid')
                .attr('transform',"translate(" + cate_count*((width-2)/obj_length) + "," + 20 + ")");
            cate_count++;

        }
         obj['min']=min_value;
        obj['max'] = max_value;
        cross_cate.push(obj);
    }

}
function CloseFilterDiv() {
    $('#filter-pop').hide();
}

function filter_patientList() {
    var numerical = [5, 12, 13, 16, 18, 32, 33, 34, 38, 39, 40, 41, 42, 46, 56, 57, 58, 59, 60, 61];
    var checked_box = [];
    var filter_patients_all = [];
    var filter_table = $("#filter-selectionTable");
    var filter_checkbox =  document.getElementsByClassName('filter-checkbox');
    var filter_column_num = parseInt(filter_table.attr('class'));
    var filter_column_name = columsName[filter_column_num];
    console.log(filter_column_num);
    console.log(filter_column_name);
    $('#HasFiletered').show();

    if(attributeNumericalList.indexOf(filter_column_name) == -1){    // 类别型


        for (var i=0;i<filter_checkbox.length;i++){
        if(filter_checkbox[i].checked == true) {
            var tmp_checked_array = filter_checkbox[i].id.split(['-']);
            //filter_column_num = parseInt(tmp_checked_array[0]);
            checked_box.push(tmp_checked_array[1]);
        }
    }
        console.log(checked_box);
        var selectedShow = $(".selectedShow");
        //添加筛选标签项 现在只支持1个标签
        selectedShow.eq(filter_column_num).find("span").text(columsName[filter_column_num]+":");
        selectedShow.eq(filter_column_num).find("label").text(checked_box[0]);
        $(".selectedShow").eq(filter_column_num).show();


    // for(var n=0;n<checked_box.length;n++){
    //     var selection = document.createElement('div');
    //     var selection_text = document.createTextNode(checked_box[n]);
    //     selection.appendChild(selection_text);
    //     document.getElementById('HasFiletered').appendChild(selection);
    // }
    //console.log(cross_patientList_all);

    for(var i =0;i<Object.keys(allPatientDictList_filtered).length;i++){

        if(checked_box.indexOf(allPatientDictList_filtered[i][filter_column_name].toString()) !== -1){
            filter_patients_all.push(allPatientDictList_filtered[i]);
        }
    }
    console.log(filter_patients_all);
    var filter_patientList_order =  filter_patients_all.slice(0,49);
    drawTable_withTable_editByYu20180919(filter_patients_all,filter_patientList_order,columsName,"spgraph");
    }
    else{          //数值型
    //     for (var i=0;i<filter_checkbox.length;i++){
    //     if(filter_checkbox[i].checked === true) {
    //         //var tmp_checked_array = filter_checkbox[i].id.split(['-']);
    //         //filter_column_num = parseInt(tmp_checked_array[0]);
    //         console.log($(filter_checkbox[i].parentNode).siblings()[0].innerText);
    //         var checked_domain = $(filter_checkbox[i].parentNode).siblings()[0].innerText;
    //         checked_box.push(checked_domain);
    //     }
    // }

        var selectedShow = $(".selectedShow");
        //添加筛选标签项 现在只支持1个标签
        selectedShow.eq(filter_column_num).find("span").text(columsName[filter_column_num]+":");
        selectedShow.eq(filter_column_num).find("label").text(selection_domain[1]+"~"+selection_domain[0]);
        $(".selectedShow").eq(filter_column_num).show();

     for(var i =0;i<Object.keys(allPatientDictList_filtered).length ;i++){
        //for(var j=0;j<checked_box.length;j++){
            //var domain =  checked_box[j].split('~ ');

            // var lower_band = parseFloat(domain[0]);
            // var upper_band = parseFloat(domain[1]);
           var lower_band = selection_domain[1];
           var upper_band = selection_domain[0];
            //console.log(lower_band);
            //console.log(upper_band);
            if(allPatientDictList_filtered[i][filter_column_name]<= upper_band && allPatientDictList_filtered[i][filter_column_name]>=lower_band){
                filter_patients_all.push(allPatientDictList_filtered[i]);
            }
       // }
     }
     var filter_patientList_order =  filter_patients_all.slice(0,49);
     console.log(filter_patients_all);
     drawTable_withTable_editByYu20180919(filter_patients_all,filter_patientList_order,columsName,"spgraph");
    }

}

function reset_patientList() {
    cross_patientList =  allPatientList.slice(0,49);
    drawTable_withTable(allPatientList,cross_patientList,cross_column_names,"spgraph");
}
