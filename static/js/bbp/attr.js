/**
 * Created by Y on 2018/7/18.
 */

function drawAttr(patientList,patientListWithNo,divname){

    $("#"+divname).empty();
    $("#"+divname).append('<table border="0" id="tab" style="text-align:center;width:280px"><tr id="tr0" style="height:40px">'+
                        '<th style="text-align:center;width:80px">阶段</th>'+
                        '<th style="text-align:center;width:100px">属性</th>'+
//                        '<th style="text-align:center;width:80px">编码</th>'+
                        '<th style="text-align:center;width:100px">权值</th></tr></table>');


    var headText = [' ','属性','编码','权值'];
    var attrlist = ['住院号','手术日期','住院日期','出院日期','肾损伤','手术年龄','性别',
                    'anemia','糖尿病','心力衰竭','IABP','hypotension','对比剂用量','gfr','心肌梗死史',
                    'Hypercholesterolemia','HDL_C','urgent_PCI','Pre_Crea','高血压','主动脉球囊反搏','心肌梗死','吸烟',
                    '血脂异常','肾功能异常',"冠心病家族史",	"早发冠心病家族史",	"CABG手术史",	"糖尿病治疗方案",	"出血性脑血管疾病",	"外周动脉疾病","慢性肺病",	"心率",	"收缩压",	"舒张压",
                    "对比剂类型",	"诊断性导管术",	"造影结论",	"左主干冠状动脉",	"近段冠状动脉",	"中段/远段/对角支冠状动脉",	"Circ、OMs、LPDA、LPL",
                    "RCA...冠状动脉",	"桥血管",	"PCI状态",	"PCI指征",	"D2B 时间(分钟)",	"普通肝素",	"阿司匹林(PCI)",	"比伐卢定",	"直接凝血酶抑制剂",
                    "IIb/IIIa受体拮抗剂",	"氯吡格雷(PCI)",	"普拉格雷(PCI)",	"替卡格雷",	"噻氯吡啶(PCI)",	"术前肌钙蛋白I",	"术前血红蛋白",	"术前低密度脂蛋白",	"术后肌钙蛋白I",
                    "术后血红蛋白",	"术后低密度脂蛋白","对比剂过敏"];

    var colorArr = ['#8D483C','#94494D','#954D5F','#925572','#885E82','#796990','#657399','#4E7D9D','#33869A',
        '#1C8E93','#1A9586','#319A77','#4D9D66','#689F55','#84A046','#A09E3D','#BC9B3C','#D69644','#ED9154','#000000'];
//    for(var i=0;i<attributeStage.length;i++){
//        console.log(columsName.indexOf($.trim(attributeStage[i].attributename)));
//    }



    var numerical = [5,12,13,18,32,33,34,38,39,40,41,42,46,56,57,58,59,60,61];
    var div = document.getElementById(divname);
    var client_width = div.clientWidth;
    var client_height = div.clientHeight;

    var stage_in_hos_index = [2,5,6,7,8,11,13,14,15,19,21,22,23,24,25,26,27,28,29,30,31];
    var stage_pre_index = [32,33,34,36];
    var stage_pre_proce_index = [16,18,56,57,58];
    var stage_in_proce_index = [1,10,12,17,20,35,37,38,39,40,41,42,43,44,45,46,47,48,49,50,52,53,54,55,62];
    var stage_after_proce_index = [4,9,59,60,61];
    var stage_out_hos_index = [3,51];

    var native_attributeStage = attributeStage;

    native_attributeStage.sort(function(x,y){
        return x.stageindex-y.stageindex;
    });

    var stage_col = [];

    stage_col[0]=stage_col[1]=-1;                   //根据表格来的 第一列confidence 第二列 病历号
    for (var i = 0;i<64;i++){
        if(stage_in_hos_index.indexOf(i-1)!=-1) stage_col[i]=0;
        else if(stage_pre_index.indexOf(i-1)!=-1) stage_col[i]=1;
        else if(stage_pre_proce_index.indexOf(i-1)!=-1) stage_col[i]=2;
        else if(stage_in_proce_index.indexOf(i-1)!=-1) stage_col[i]=3;
        else if(stage_after_proce_index.indexOf(i-1)!=-1) stage_col[i]=4;
        else if(stage_out_hos_index.indexOf(i-1)!=-1) stage_col[i]=5;
        else stage_col[i]=-1;               //没有阶段 ID
    }

    var color_stage = ['#b3e2cd','#fdcdac','#cbd5e8','#f4cae4','#e6f5c9','#fff2ae'];

    var attrIndex=[];                                                                           //根据阶段进行排序
    for(var i=0;i<attrlist.length;i++){
        attrIndex.push({index:i,name:attrlist[i],stage:stage_col[i+1]})
    }

    attrIndex.sort(function(x,y){
       return x.stage-y.stage;
    });

//    console.log(attrIndex);
////////////////////////////////////////////////////////////////////////////////////////////////////    2018-09-12 edit begin
    for(var i = 0;i<native_attributeStage.length;i++){
        var bgc;
        if(parseInt(native_attributeStage[i].stageindex)==-1) bgc="#FFFFFF";
        else bgc=color_stage[parseInt(native_attributeStage[i].stageindex)-1];                                   //数据库中stageindex从1开始   没有stage的为-1

        var tab = document.getElementById("tab");
        var newTr = tab.insertRow(i+1);
        var td0 = newTr.insertCell(0);
        var td1 = newTr.insertCell(1);
        var td2 = newTr.insertCell(2);

        newTr.setAttribute("id","attr:"+native_attributeStage[i].attributename);
        newTr.setAttribute("height","40px");

//        var checkbox = document.createElement("input");
//        checkbox.setAttribute("type","checkbox");
//        checkbox.setAttribute("id","checkbox:"+native_attributeStage[i].attributename);
//        checkbox.setAttribute("class","myCheckbox");
//////////////////////////////////////////////////////////////////////////////////////////////////////////20180927 add_begin
        var svg = d3.select(td0).append("svg").attr("width","80px").attr("height","40px");
        svg.append("rect")
            .attr("rx",2)
            .attr("ry",2)
            .attr("x", 40-15/2)
            .attr("y", 20-10/2)
            .attr("width", 15)
            .attr("height", 10)
            .attr("fill", parseInt(native_attributeStage[i].stageindex)==-1?"#FFFFFF":color_stage[parseInt(native_attributeStage[i].stageindex)-1]);

//        td0.appendChild(checkbox);
//////////////////////////////////////////////////////////////////////////////////////////////////////////20180927 add_end

        td0.style.width="80px";
        td1.style.width="100px";
        td2.style.width="100px";

        var tddiv = document.createElement("div");
        td1.appendChild(tddiv);

        tddiv.setAttribute("class","mytddivclass");
        tddiv.setAttribute("id","td:"+native_attributeStage[i].attributename);
        tddiv.setAttribute("margin",0);
        tddiv.style.width="100px";
        tddiv.innerHTML = native_attributeStage[i].attributename;
        tddiv.onclick=function(){
            var id = this.id;

//            console.log(this);
            var attrChosenName = id.substring(id.indexOf(":")+1);
//            console.log(typeof attrChosenName);

            var col_index=null;
            for(var obj of attributeStage){
//                console.log(obj.attributename,attrChosenName);
                if (obj.attributename==attrChosenName)
                {
                    col_index = obj;
                    break;
                }
            }
//            console.log(col_index);
            var div = document.getElementById("piegraph");
            $(div).empty();
            if (col_index.category=="string") return;

            var client_width = div.clientWidth;
            var client_height = div.clientHeight;

            var margin = {top:30, right: 15, bottom: 30, left: 15},
                width = client_width - margin.left - margin.right,
                height = client_height - margin.top - margin.bottom;

            var svg = d3.select("#"+div.id).append("svg")
                .attr("width", client_width)
                .attr("height", client_height)
                .attr("id", divname+"Svg");

            var line_g = svg.append("g")
                .attr("class", "HistoLinesG")
                .attr("transform", "translate(" + margin.left + "," + (margin.top+height) + ")")
                .append("line")
                .attr("class","HistoLine")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", width)
                .attr("y2", 0);
            var blank_l = 30,blank_r = 30;

            histo_g = svg.append("g")
                .attr("class","HistoRectG")
                .attr("transform", "translate(" + margin.left + "," + margin.top+ ")");

            if(col_index.category=="categorical")     //类别 ////////////////////////////////////////////////
            {
                var class_map = [],class_all=[],class_num = 0,max_num=0;
                for(var j=0;j<allPatientDictList.length;j++)
                {
                    if(class_map.indexOf(allPatientDictList[j][col_index.attributename])==-1)
                    {
                        var temp = col_index.attributename;
                        class_map[class_num]=allPatientDictList[j][temp];
                        class_all[class_num] = 1;
                        class_num++;
                    }
                    else
                    {
                        var temp = col_index.attributename;
                        var index = class_map.indexOf(allPatientDictList[j][temp]);
                        class_all[index]++;
                    }
                }

                max_num = d3.max(class_all);
                var step_x = (width-blank_l-blank_r)/class_num;
                var step_y = height/max_num;


                var Fclass_all=[],Fclass_map=[];
                Fclass_all=sortArrayWithIndex(class_all,class_map).a;               //将类别按照每类数量进行排序
                Fclass_map=sortArrayWithIndex(class_all,class_map).b;
                console.log(Fclass_all);
                for (var k = 0;k<class_num;k++)
                {
                    histo_g.append("rect")
                        .attr("class","HistoRect")
                        .attr("x",blank_l+k*step_x)
                        .attr("y",height-step_y*Fclass_all[k])
                        .attr("width",step_x-1)
                        .attr("height",step_y*Fclass_all[k])
                        .attr("fill",color_stage[parseInt(col_index.stageindex)-1]);
                    histo_g.append("text")
                        .text(Fclass_map[k])
                        .attr("x",blank_l+(k+0.5)*step_x)
                        .attr("y",height+10)
                        .attr("fill","#000")
                        .attr("text-anchor","middle");
                }
            }
            else {                                       //数值型
                var numArray = [];
                for (var j=0;j<allPatientDictList.length;j++) numArray.push(allPatientDictList[j][col_index.attributename]);
//                console.log(numArray);
//                var bins = histogram()
//                    (numArray)
//                var x = d3.scaleLinear()
//                    .rangeRound([0, width]);

                var bins=d3.histogram()
                    .thresholds(d3.ticks(d3.extent(numArray)[0],d3.extent(numArray)[1],5))
                    (numArray)

                var bins_len = bins.map(function(i){
                    return i.length;
                })
                var bins_num = bins.length;
                var max_num = d3.max(bins_len);
                var step_x = (width-blank_l-blank_r)/bins_num;
                var step_y = height/max_num;
                for (var k = 0;k<bins_num;k++)
                {
                    histo_g.append("rect")
                        .attr("class","HistoRect")
                        .attr("x",blank_l+k*step_x)
                        .attr("y",height-step_y*bins_len[k])
                        .attr("width",step_x-1)
                        .attr("height",step_y*bins_len[k])
                        .attr("fill",color_stage[parseInt(col_index.stageindex)-1]);
                    histo_g.append("text")
                        .text(bins[k].x0)
                        .attr("x",blank_l+(k)*step_x)
                        .attr("y",height+10)
                        .attr("fill","#000")
                        .attr("text-anchor","middle");
                }
                histo_g.append("text")
                        .text(bins[bins_num-1].x1)
                        .attr("x",blank_l+(bins_num)*step_x)
                        .attr("y",height+10)
                        .attr("fill","#000")
                        .attr("text-anchor","middle");
//                console.log(bins);
//                console.log(bins_len);

            }
            var name_g = svg.append("g")
                .attr("transform", "translate(" + 0 + "," + 10+ ")")
                .append("text")
                .text(this.innerHTML);
        };

//        td3.setAttribute("width","80px");
//        $(td3).append("<div style='text-align: center'> <input type='text' id='weight'+"+i+"  style='width:40px;float:left' /></div>"+
//            "<input type='button' value='修改' onclick='add()' style='width:40px;float:left' />");
        var tddiv2 = document.createElement("div");
        tddiv2.setAttribute("text-align","center");
        tddiv2.setAttribute("align","center");
        var inputW1 = document.createElement("input")
        inputW1.setAttribute("type","text");
        inputW1.setAttribute("id","weightText:"+native_attributeStage[i].attributename);
        inputW1.setAttribute("class","inputW1");
        inputW1.setAttribute("align","center");
        if(native_attributeStage[i].category=="string") inputW1.setAttribute("value",0);
        else inputW1.setAttribute("value",1);
//        var inputW2 = document.createElement("input");
//        inputW2.setAttribute("type","button");
//        inputW2.setAttribute("value","修改");
//        inputW2.setAttribute("class","inputW2");
//        inputW2.setAttribute("id","weightButton"+i);
        tddiv2.appendChild(inputW1);
        tddiv2.style.whiteSpace="nowrap";
//        tddiv3.appendChild(inputW2);
        td2.appendChild(tddiv2);
        td2.style.whiteSpace="nowrap";
        var i_label = d3.select(tddiv2).append('i')
        .attr('class', 'fa fa-eye').attr('title', '可见').style('font-size','10px');
    }
////////////////////////////////////////////////////////////////////////////////////////////////////    2018-09-12 edit end


//    for(var i = 0; i <attrIndex.length ; i++){
//        var bgc;
//
//        if(i == 0 ) bgc = "#FFFFFF";
//        else bgc = color_stage[attrIndex[i].stage];
//
//        var tab = document.getElementById("tab");
//        var newTr = tab.insertRow(i+1);
//        var td0 = newTr.insertCell(0);
//        var td1 = newTr.insertCell(1);
//        var td3 = newTr.insertCell(2);
//        newTr.setAttribute("id","attr"+attrIndex[i].index);
//        newTr.setAttribute("bgcolor",bgc);
//        newTr.setAttribute("height","40px");
//
//        var checkbox = document.createElement("input");
//        checkbox.setAttribute("type","checkbox");
//        checkbox.setAttribute("id","checkbox"+attrIndex[i].index);
//        checkbox.setAttribute("class","myCheckbox");
//        td0.style.width="80px";
//        td0.appendChild(checkbox);
//        var tddiv = document.createElement("div");
//        td1.appendChild(tddiv);
//        td1.style.width="100px";
//        td3.style.width="100px";
//
//        tddiv.setAttribute("class","mytddivclass");
//        tddiv.setAttribute("id","td"+attrIndex[i].index);
//        tddiv.setAttribute("margin",0);
//        tddiv.style.width="100px";
//        tddiv.innerHTML = attrIndex[i].name;
//
//        tddiv.onclick=function(){
//            var id = this.id;
//
//            console.log(this);
//            var col_index = parseInt(id.substring(2,id.length));  //从病历号开始
////            console.log(col_index);
//            var div = document.getElementById("piegraph");
//            $(div).empty();
//            if (col_index == 0||col_index == 1||col_index == 2||col_index == 3||col_index == 45) return;
//
//
//            var client_width = div.clientWidth;
//            var client_height = div.clientHeight;
//
//            var margin = {top:30, right: 15, bottom: 30, left: 15},
//                width = client_width - margin.left - margin.right,
//                height = client_height - margin.top - margin.bottom;
//
//            var svg = d3.select("#"+div.id).append("svg")
//                .attr("width", client_width)
//                .attr("height", client_height)
//                .attr("id", divname+"Svg");
//
//            var line_g = svg.append("g")
//                .attr("class", "HistoLinesG")
//                .attr("transform", "translate(" + margin.left + "," + (margin.top+height) + ")")
//                .append("line")
//                .attr("class","HistoLine")
//                .attr("x1", 0)
//                .attr("y1", 0)
//                .attr("x2", width)
//                .attr("y2", 0);
//            var blank_l = 30,blank_r = 30;
//
//            histo_g = svg.append("g")
//                .attr("class","HistoRectG")
//                .attr("transform", "translate(" + margin.left + "," + margin.top+ ")");
//
//            if(col_index==4||col_index==6||col_index==7||col_index==8||col_index==9||col_index==10||col_index==11
//                    ||col_index==14||col_index==15||col_index==17||[19,20,21,22,23,24,25,26,27,28,29,30,31].indexOf(col_index)!=-1
//                    ||[35,36,37,43,44,47,48,49,50,51,52,53,54,55,62].indexOf(col_index)!=-1)     //类别
//            {
//                var class_map = [],class_all=[],class_num = 0,max_num=0;
//                for(var j=0;j<patientList.length;j++)
//                {
//                    if(class_map.indexOf(patientList[j][col_index])==-1)
//                    {
//                        class_map[class_num]=patientList[j][col_index];
//                        class_all[class_num] = 1;
//                        class_num++;
//                    }
//                    else
//                    {
//                        var index = class_map.indexOf(patientList[j][col_index]);
//                        class_all[index]++;
//                    }
//                }
//
//                max_num = d3.max(class_all);
//                var step_x = (width-blank_l-blank_r)/class_num;
//                var step_y = height/max_num;
//
//
//                var Fclass_all=[],Fclass_map=[];
//                Fclass_all=sortArrayWithIndex(class_all,class_map).a;               //将类别按照每类数量进行排序
//                Fclass_map=sortArrayWithIndex(class_all,class_map).b;
//                console.log(Fclass_all);
//                for (var k = 0;k<class_num;k++)
//                {
//                    histo_g.append("rect")
//                        .attr("class","HistoRect")
//                        .attr("x",blank_l+k*step_x)
//                        .attr("y",height-step_y*Fclass_all[k])
//                        .attr("width",step_x-1)
//                        .attr("height",step_y*Fclass_all[k])
//                        .attr("fill",color_stage[stage_col[col_index+1]]);
//                    histo_g.append("text")
//                        .text(Fclass_map[k])
//                        .attr("x",blank_l+(k+0.5)*step_x)
//                        .attr("y",height+10)
//                        .attr("fill","#000")
//                        .attr("text-anchor","middle");
//                }
//            }
//            else{                                       //数值型
//                var numArray = [];
//                for (var j=0;j<patientList.length;j++) numArray.push(patientList[j][col_index]);
//                console.log(numArray);
////                var bins = histogram()
////                    (numArray)
////                var x = d3.scaleLinear()
////                    .rangeRound([0, width]);
//
//                var bins=d3.histogram()
//                    .thresholds(d3.ticks(d3.extent(numArray)[0],d3.extent(numArray)[1],5))
//                    (numArray)
//
//                var bins_len = bins.map(function(i){
//                    return i.length;
//                })
//                var bins_num = bins.length;
//                var max_num = d3.max(bins_len);
//                var step_x = (width-blank_l-blank_r)/bins_num;
//                var step_y = height/max_num;
//                for (var k = 0;k<bins_num;k++)
//                {
//                    histo_g.append("rect")
//                        .attr("class","HistoRect")
//                        .attr("x",blank_l+k*step_x)
//                        .attr("y",height-step_y*bins_len[k])
//                        .attr("width",step_x-1)
//                        .attr("height",step_y*bins_len[k])
//                        .attr("fill",color_stage[stage_col[col_index+1]]);
//                    histo_g.append("text")
//                        .text(bins[k].x0)
//                        .attr("x",blank_l+(k)*step_x)
//                        .attr("y",height+10)
//                        .attr("fill","#000")
//                        .attr("text-anchor","middle");
//                }
//                histo_g.append("text")
//                        .text(bins[bins_num-1].x1)
//                        .attr("x",blank_l+(bins_num)*step_x)
//                        .attr("y",height+10)
//                        .attr("fill","#000")
//                        .attr("text-anchor","middle");
////                console.log(bins);
////                console.log(bins_len);
//
//            }
//            var name_g = svg.append("g")
//                .attr("transform", "translate(" + 0 + "," + 10+ ")")
//                .append("text")
//                .text(this.innerHTML);
//        };
//
////        var mySelect = document.createElement("select");
////
////        mySelect.id = "mySelect"+'-attr'+i;
////        mySelect.class = 'form-control form-control-mine';
////        if([0,1,2,3].indexOf(i)!=-1){
////            mySelect.add(new Option("text","text"));
////        }
////        else if(numerical.indexOf(i)!=-1){
////            mySelect.add(new Option("circle","circle"));
////            mySelect.add(new Option("rect","rect"));
////            if(i%2==0) mySelect.value = "rect";
////            else mySelect.value = "circle";
////        }
////        else mySelect.add(new Option("class","class"));
////
////        $(mySelect).change(function(){
//////            console.log(this);
////            var row_no = parseInt(this.id.substring(13,this.id.length));
////            console.log(row_no);
////            if(numerical.indexOf(row_no)!=-1){          //数值型数据
////                var newShowType = this.options[this.selectedIndex].value;
////                console.log(newShowType);
//////                var firstPatientNo = parseInt(document.getElementsByClassName("d-r2c1")[0].firstChild.firstChild.innerHTML);
//////                console.log(firstPatientNo);
////                var th_height = 20,tr_width = 80;
////                var rect_r = 10, circle_r = th_height/2.2;
////
////                if(newShowType=="circle"){
////                    console.log(patientListWithNo.length);
////                    for (var index=2;index<patientListWithNo.length+2;index++){
////                        var div_pos = '.d-'+'r'+index+'c'+(row_no+1);
////                        var rScale = d3.scaleLinear().range([0, circle_r]).domain(d3.extent(patientListWithNo, function(d){ return d[row_no];}));
//////                        console.log(numerical.indexOf(row_no));
////                        $(div_pos).empty();
////                        var svg = d3.select(div_pos).append('svg').attr('width',70).attr('height',20);
////                        svg.append("circle")
////                            .attr("class", "circleTable")
////                            .attr("r", rScale(patientListWithNo[index-2][row_no]))
////                            .attr("cx", tr_width/2)
////                            .attr("cy", th_height/2)
////                            .attr("fill", colorArr[numerical.indexOf(row_no)]);
////                        svg.append('text')
////                            .text(patientListWithNo[index-2][row_no]).attr('fill','black')
////                            .attr('x', tr_width*0.1)
////                            .attr('y', th_height*0.1)
////                            .attr('text-anchor', 'middle')
////                            .style('font-size', '10px')
////                            .attr('dy', 8);
////                    }
////                }
////                else if(newShowType=="rect"){
////                    for (var index=2;index<patientListWithNo.length+2;index++){
////                        var div_pos = '.d-'+'r'+index+'c'+(row_no+1);
////                        var rScale = d3.scaleLinear().range([0, tr_width]).domain(d3.extent(patientListWithNo, function(d){ return d[row_no];}));
////                        console.log(numerical.indexOf(row_no));
////                        $(div_pos).empty();
////                        var svg = d3.select(div_pos).append('svg').attr('width',70).attr('height',20);
////                        svg.append("rect")
////                            .attr("class", "rectTable")
////                            .attr("width", rScale(patientListWithNo[index-2][row_no]))
////                            .attr("height",th_height)
////                            .attr("rx", 3)
////                            .attr("ry", 3)
////                            .attr("transform","translate(" + 0+ "," + 3 + ")")
////                            .attr("fill", colorArr[numerical.indexOf(row_no)]);
////                        svg.append('text')
////                            .text(patientListWithNo[index-2][row_no]).attr('fill','black')
////                            .attr('x', tr_width/2)
////                            .attr('y', th_height/2)
////                            .attr('text-anchor', 'middle')
////                            .style('font-size', '10px')
////                            .attr('dy', 8);
////                    }
////                }
////
////            }
////
////        });
////
////        $(td2)[0].appendChild(mySelect);
//
//
////        $(td2).append("<select  class='form-control form-control-mine' style='width:80px'>"+
////                                    "<option value='circle'>circle</option>"+
////                                    "<option value='rect'>rect</option>"+
////                                    "<option value='arc'>arc</option>"+
////                                "</select>");
//        td3.setAttribute("width","80px");
////        $(td3).append("<div style='text-align: center'> <input type='text' id='weight'+"+i+"  style='width:40px;float:left' /></div>"+
////            "<input type='button' value='修改' onclick='add()' style='width:40px;float:left' />");
//        var tddiv3 = document.createElement("div");
//        tddiv3.setAttribute("text-align","center");
//        tddiv3.setAttribute("align","center");
//        var inputW1 = document.createElement("input")
//        inputW1.setAttribute("type","text");
//        inputW1.setAttribute("id","weightText"+attrIndex[i].index);
//        inputW1.setAttribute("class","inputW1");
//        inputW1.setAttribute("align","center");
//        if(attrIndex[i].index<=3) inputW1.setAttribute("value",0);
//        else inputW1.setAttribute("value",1);
////        var inputW2 = document.createElement("input");
////        inputW2.setAttribute("type","button");
////        inputW2.setAttribute("value","修改");
////        inputW2.setAttribute("class","inputW2");
////        inputW2.setAttribute("id","weightButton"+i);
//        tddiv3.appendChild(inputW1);
////        tddiv3.appendChild(inputW2);
//        td3.appendChild(tddiv3);
//
//
//    }
}

function drawAttrSum(divname){
    $("#"+divname).empty();
    $("#"+divname).append('<table border="0" id="sumtab" style="text-align:center;width:280px"><tr id="sumtr0" style="height:40px">'+
                        '<th style="text-align:center;width:100px">阶段</th>'+
                        '<th style="text-align:center;width:100px">属性数目</th>'+
                        '<th style="text-align:center;width:100px">备注</th></tr></table>');

    var attrlist = ['住院号','手术日期','住院日期','出院日期','肾损伤','手术年龄','性别',
                    'anemia','糖尿病','心力衰竭','IABP','hypotension','对比剂用量','gfr','心肌梗死史',
                    'Hypercholesterolemia','HDL_C','urgent_PCI','Pre_Crea','高血压','主动脉球囊反搏','心肌梗死','吸烟',
                    '血脂异常','肾功能异常',"冠心病家族史",	"早发冠心病家族史",	"CABG手术史",	"糖尿病治疗方案",	"出血性脑血管疾病",	"外周动脉疾病","慢性肺病",	"心率",	"收缩压",	"舒张压",
                    "对比剂类型",	"诊断性导管术",	"造影结论",	"左主干冠状动脉",	"近段冠状动脉",	"中段/远段/对角支冠状动脉",	"Circ、OMs、LPDA、LPL",
                    "RCA...冠状动脉",	"桥血管",	"PCI状态",	"PCI指征",	"D2B 时间(分钟)",	"普通肝素",	"阿司匹林(PCI)",	"比伐卢定",	"直接凝血酶抑制剂",
                    "IIb/IIIa受体拮抗剂",	"氯吡格雷(PCI)",	"普拉格雷(PCI)",	"替卡格雷",	"噻氯吡啶(PCI)",	"术前肌钙蛋白I",	"术前血红蛋白",	"术前低密度脂蛋白",	"术后肌钙蛋白I",
                    "术后血红蛋白",	"术后低密度脂蛋白","对比剂过敏"];

    var div = document.getElementById(divname);
    var client_width = div.clientWidth;
    var client_height = div.clientHeight;

    var stage_in_hos_index = [2,5,6,7,8,11,13,14,15,19,21,22,23,24,25,26,27,28,29,30,31];
    var stage_pre_index = [32,33,34,36];
    var stage_pre_proce_index = [16,18,56,57,58];
    var stage_in_proce_index = [1,10,12,17,20,35,37,38,39,40,41,42,43,44,45,46,47,48,49,50,52,53,54,55,62];
    var stage_after_proce_index = [4,9,59,60,61];
    var stage_out_hos_index = [3,51];

    var stage_all = [stage_in_hos_index,stage_pre_index,stage_pre_proce_index,stage_in_proce_index,stage_after_proce_index,stage_out_hos_index];
    var stage_name = ["入院","早期评估","术前","术中","术后","出院"]
    var color_stage = ['#b3e2cd','#fdcdac','#cbd5e8','#f4cae4','#e6f5c9','#fff2ae'];

    for (var i = 0;i<stage_all.length;i++){
        var tab = document.getElementById("sumtab");
        var newTr = tab.insertRow(i+1);
        var td1 = newTr.insertCell(0);
        var td2 = newTr.insertCell(1);
        var td3 = newTr.insertCell(2);
        newTr.setAttribute("id","sumattr"+i);
        newTr.setAttribute("class","sumattr")
        newTr.setAttribute("bgcolor",color_stage[i]);
        newTr.setAttribute("height","40px");
        newTr.onclick=function(){
//            console.log(this);
            var now_i = parseInt(this.id.substr(7,this.id.length));
//
//            console.log(stage_all[now_i][0]);
//            console.log($('.col'+stage_all[now_i][0]).is(':visible'));


            if($('.col'+(stage_all[now_i][0]+1)).is(':visible'))
            {
                for(var j=1;j<attrlist.length;j++){
                    if(stage_all[now_i].indexOf(j)!=-1)
                    {
                        $(".col"+(j+1)).hide();
//                        var tdarray = document.getElementsByClassName("col"+(j+1));
//                        for (var k=0;k<tdarray.length;k++)   tdarray[k].setAttribute("border",0);
//                        d3.selectAll(".col"+(j+1)).style("border-style",'none');
                    }
                }
                document.getElementById("sumattr"+now_i+"-td3").innerHTML="不显示";
            }
            else
            {
                for(var j=1;j<attrlist.length;j++){
                    if(stage_all[now_i].indexOf(j)!=-1) $(".col"+(j+1)).show();
                }
                document.getElementById("sumattr"+now_i+"-td3").innerHTML="显示";
            }
        }

        var tddiv = document.createElement("div");
        td1.appendChild(tddiv);
        tddiv.setAttribute("class","mytdclass");
        tddiv.innerHTML = stage_name[i];

        var tddiv2 = document.createElement("div");
        td2.appendChild(tddiv2);
        tddiv2.setAttribute("class","mytdclass");
        tddiv2.innerHTML = stage_all[i].length;

        var tddiv3 = document.createElement("div");
        td3.appendChild(tddiv3);
        tddiv3.setAttribute("id","sumattr"+i+'-td3');
        tddiv3.setAttribute("class","mytdclass");
        tddiv3.innerHTML = "显示";
    }

}




function drawAki(patientList,idList, divname)
{
    var div = document.getElementById(divname);
    var colorArr = ["#fed98e","#fe9929","#cc4c02","#993404"];
    var client_width = div.clientWidth;
    var client_height = div.clientHeight;
    $('#akigraph').empty();
//    console.log(div.clientWidth);
//	console.log(div.clientHeight);
    var margin = {top:30, right: 15, bottom: 30, left: 15},
        width = client_width - margin.left - margin.right,
        height = client_height - margin.top - margin.bottom;

    var svg = d3.select("#"+divname).append("svg")
        .attr("width", client_width)
        .attr("height", client_height)
        .attr("id", divname+"Svg");

    var aki_stage_all = [];
    for (var i = 0;i < patientList.length;i++)
    {
        if(idList.indexOf(i)==-1) continue;
         if (aki_stage_all[patientList[i][4]] == undefined) aki_stage_all[patientList[i][4]] = 1;
         else aki_stage_all[patientList[i][4]]++;
    }
//    console.log(aki_stage_all);

    var stage_num = aki_stage_all.length;
    var line_g = svg.append("g")
        .attr("class", "HistoLinesG")
        .attr("transform", "translate(" + margin.left + "," + (margin.top+height) + ")")
        .append("line")
        .attr("class","HistoLine")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", width)
        .attr("y2", 0);
    var blank_l = 30,blank_r = 30;

    var histo_g = svg.append("g")
        .attr("class","HistoRectG")
        .attr("transform", "translate(" + margin.left + "," + margin.top+ ")")

    var max_num = 0;
    for (var i = 0;i<4; i++)
    {
        if(aki_stage_all[i]==undefined) aki_stage_all[i]=0;
        if(max_num<aki_stage_all[i]) max_num = aki_stage_all[i];
    }
//    var step_x = (width-blank_l-blank_r)/stage_num;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var class_map = [],class_all=[],class_num = 0;
        for(var j=0;j<patientList.length;j++)
        {
            if(class_map.indexOf(allPatientList[j][4])==-1)
            {
                class_map[class_num]=allPatientList[j][4];
                class_all[class_num] = 1;
                class_num++;
            }
             else
            {
                var index = class_map.indexOf(patientList[j][4]);
                class_all[index]++;
            }
        }

//    max_num = d3.max(class_all);                      //用部分病人的类别数做最大高度
    var step_x = (width-blank_l-blank_r)/class_num;
//    var step_y = height/max_num;
    var step_y = height/max_num;
//    console.log(step_x,step_y);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    for (var i = 0;i<4;i++)
    {
        histo_g.append("rect")
            .attr("class","HistoRect")
            .attr("x",blank_l+i*step_x)
            .attr("y",height-step_y*aki_stage_all[i])
            .attr("width",step_x-1)
            .attr("height",step_y*aki_stage_all[i])
            .attr("fill", colorArr[i]);
        histo_g.append("text")
            .text((aki_stage_all[i]*100/idList.length).toFixed(2)+"%")
            .attr("x",blank_l+(i+0.5)*step_x)
            .attr("y",height-step_y*aki_stage_all[i]-5)
            .attr("fill","#000")
            .attr("text-anchor","middle");
        histo_g.append("text")
            .attr("x",blank_l+(i+0.5)*step_x)
            .attr("y",height+10)
            .attr("fill","#000")
            .attr("text-anchor","middle")
            .text(i);
    }
    var name_g = svg.append("g")
                .attr("transform", "translate(" + (width/2) + "," + 10+ ")")
                .append("text")
                .text("肾损伤等级");

}

function drawOutcome(){
    var color_stage = ['#b3e2cd','#fdcdac','#cbd5e8','#f4cae4','#e6f5c9','#fff2ae'];

    var stage_in_hos_index = [2,5,6,7,8,11,13,14,15,19,21,22,23,24,25,26,27,28,29,30,31];
    var stage_pre_index = [32,33,34,36];
    var stage_pre_proce_index = [16,18,56,57,58];
    var stage_in_proce_index = [1,10,12,17,20,35,37,38,39,40,41,42,43,44,45,46,47,48,49,50,52,53,54,55,62];
    var stage_after_proce_index = [4,9,59,60,61];
    var stage_out_hos_index = [3,51];

    var stage_col = [];

    stage_col[0]=stage_col[1]=-1;                   //根据表格来的 第一列confidence 第二列 病历号
    for (var i = 0;i<64;i++){
        if(stage_in_hos_index.indexOf(i-1)!=-1) stage_col[i]=0;
        if(stage_pre_index.indexOf(i-1)!=-1) stage_col[i]=1;
        if(stage_pre_proce_index.indexOf(i-1)!=-1) stage_col[i]=2;
        if(stage_in_proce_index.indexOf(i-1)!=-1) stage_col[i]=3;
        if(stage_after_proce_index.indexOf(i-1)!=-1) stage_col[i]=4;
        if(stage_out_hos_index.indexOf(i-1)!=-1) stage_col[i]=5;
    }


    for(var i=0;i<outcomeAttrIndex.length;i++){

        var outcomeDiv=document.getElementById("outcomeGraph:"+outcomeAttrIndex[i]);
        var attrName = outcomeAttrIndex[i];
        $(outcomeDiv).empty();
        var client_width = outcomeDiv.clientWidth;
        var client_height = outcomeDiv.clientHeight;
        var margin = {top:30, right: 15, bottom: 30, left: 15},
                width = client_width - margin.left - margin.right,
                height = client_height - margin.top - margin.bottom;

        var svg = d3.select(document.getElementById(outcomeDiv.id)).append("svg")                           //
            .attr("width", client_width)
            .attr("height", client_height)
            .attr("id", outcomeDiv.id+"Svg");

        var line_g = svg.append("g")
            .attr("class", "HistoLinesG")
            .attr("transform", "translate(" + margin.left + "," + (margin.top+height) + ")")
            .append("line")
            .attr("class","HistoLine")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", width)
            .attr("y2", 0);
        var blank_l = 30,blank_r = 30;

        histo_g = svg.append("g")
            .attr("class","HistoRectG")
            .attr("transform", "translate(" + margin.left + "," + margin.top+ ")");

        if(attributeCategoricalList.indexOf(attrName)!=-1)     //类别
            {
                var class_map = [],class_all=[],class_num = 0,max_num=0,total_num=0;
                for(var j=0;j<pagePatientDictList.length;j++)
                {
                    if(class_map.indexOf(pagePatientDictList[j][attrName])==-1)
                    {
                        class_map[class_num]=pagePatientDictList[j][attrName];
                        class_all[class_num] = 1;
                        class_num++;
                    }
                    else
                    {
                        var index = class_map.indexOf(pagePatientDictList[j][attrName]);
                        class_all[index]++;
                    }
                }

                for(var j=0;j<allPatientDictList.length;j++){                           //将pagelist中没有的类别包含进来但是不计算个数
                    if(class_map.indexOf(allPatientDictList[j][attrName])==-1)
                    {
                        class_map[class_num]=allPatientDictList[j][attrName];
                        class_all[class_num] = 0;
                        class_num++;
                    }
                }

                max_num = d3.max(class_all);
                total_num = d3.sum(class_all)
                var step_x = (width-blank_l-blank_r)/class_num;
                var step_y = height/max_num;


                var Fclass_all=[],Fclass_map=[];
                Fclass_all=sortArrayWithIndex(class_all,class_map).a;               //将类别按照每类数量进行排序
                Fclass_map=sortArrayWithIndex(class_all,class_map).b;
                console.log(Fclass_all);
                for (var k = 0;k<class_num;k++)
                {                                                                     ///////////////////////////////////////////////20180917改
                    histo_g.append("rect")
                        .attr("class","HistoRect")
                        .attr("x",blank_l+k*step_x)
                        .attr("y",height-step_y*Fclass_all[k])
                        .attr("width",step_x-1)
                        .attr("height",step_y*Fclass_all[k])
                        .attr("fill",color_stage[attributeToStageIndex[attrName]-1]);
                    histo_g.append("text")
                        .text((Fclass_all[k]*100/pagePatientDictList.length).toFixed(2)+"%")
                        .attr("x",blank_l+(k+0.5)*step_x)
                        .attr("y",height-step_y*Fclass_all[k]-5)
                        .attr("fill","#000")
                        .attr("text-anchor","middle");
                    histo_g.append("text")
                        .text(Fclass_map[k])
                        .attr("x",blank_l+(k+0.5)*step_x)
                        .attr("y",height+10)
                        .attr("fill","#000")
                        .attr("text-anchor","middle");
                }
            }
            else{                                       //数值型
                var numArray = [];
                for (var j=0;j<pagePatientDictList.length;j++) numArray.push(pagePatientDictList[j][attrName]);
//                console.log(numArray);
//                var bins = histogram()
//                    (numArray)
//                var x = d3.scaleLinear()
//                    .rangeRound([0, width]);




//d3.ticks(d3.extent(numArray)[0],d3.extent(numArray)[1],5)
                var bins=d3.histogram()
                    .thresholds(5)
                    (numArray)
                console.log(bins);

                var bins_len = bins.map(function(i){
                    return i.length;
                })
                var bins_num = bins.length;
                var max_num = d3.max(bins_len);
                var total_num = d3.sum(bins_len)
//                console.log(max_num);
                var step_x = (width-blank_l-blank_r)/bins_num;
                var step_y = height/max_num;
                for (var k = 0;k<bins_num;k++)
                {
//                    console.log(typeof bins[k].x0);
                    histo_g.append("rect")
                        .attr("class","HistoRect")
                        .attr("x",blank_l+k*step_x)
                        .attr("y",height-step_y*bins_len[k])
                        .attr("width",step_x-1)
                        .attr("height",step_y*bins_len[k])
                        .attr("fill",color_stage[attributeToStageIndex[attrName]-1]);
                    histo_g.append("text")
                        .text((bins_len[k]*100/pagePatientList.length).toFixed(2)+"%")
                        .attr("x",blank_l+(k+0.5)*step_x)
                        .attr("y",height-step_y*bins_len[k]-5)
                        .attr("fill","#000")
                        .attr("text-anchor","middle");
                    histo_g.append("text")
                        .text(bins[k].x0%1!=0?bins[k].x0.toFixed(1):bins[k].x0)
                        .attr("x",blank_l+(k)*step_x)
                        .attr("y",height+10)
                        .attr("fill","#000")
                        .attr("text-anchor","middle");

                }
                histo_g.append("text")
                        .text( bins[bins_num-1].x1%1!=0?bins[bins_num-1].x1.toFixed(1):bins[bins_num-1].x1)
                        .attr("x",blank_l+(bins_num)*step_x)
                        .attr("y",height+10)
                        .attr("fill","#000")
                        .attr("text-anchor","middle");
//                console.log(bins);
//                console.log(bins_len);

            }
            var temptext = document.getElementById("td:"+attrName).innerHTML;
            var name_g = svg.append("g")
                .attr("transform", "translate(" + (margin.left+width/2) + "," + 10+ ")")
                .append("text")
                .attr("text-anchor","middle")
                .text(temptext);

    }
}

function drawAttrTable(allData){
    var divname = "attrgraph";

    var patientList = allData[0];
    var patientListWithNo = allData[1];
    drawAttr(patientList,patientListWithNo,divname);
}

function drawAttrSumTable(){
    var divname = "attrsum";
    drawAttrSum(divname);
}

function drawHistoAki(allData)
{
    var divname = "akigraph";
    var patientList = allData;
    var tempList = [];
    for(var i=0;i<allData.length;i++) tempList.push(i);
    var idList=arguments[1]?arguments[1]:tempList;
    drawAki(patientList,idList,divname);
}

function initOutcomeModal(modalObj)
{
//    console.log(modalObj);
    var bodyDiv = $(modalObj).children(".modal-dialog").children(".modal-content").children(".modal-body")[0];
//    console.log(bodyDiv.childNodes);
    $(bodyDiv).empty();
//    console.log(bodyDiv);
//    console.log(columsName.length);
    var newTable = document.createElement("table");
    newTable.style.width = "100%";
    bodyDiv.appendChild(newTable);
    for (var i=1,attrCount=0;i<columsName.length;i++){

        if(attributeStrList.indexOf(columsName[i])!=-1) continue;
        attrCount++;                                                            //统计显示的属性的个数
//        console.log(attrCount);
        if((attrCount-1)%4==0) {
//            console.log(attrCount);
            var newTr = newTable.insertRow(Math.floor((attrCount-1)/4));
            newTr.setAttribute("id","attrTr"+Math.floor((attrCount-1)/4));
            newTr.style.height="25px";
            var td0 = newTr.insertCell(0);td0.style.width = "20%";
            var td1 = newTr.insertCell(1);td1.style.width = "20%";
            var td2 = newTr.insertCell(2);td2.style.width = "20%";
            var td3 = newTr.insertCell(3);td3.style.width = "20%";
//            var td4 = newTr.insertCell(4);td4.style.width = "20%";
        }

        var td = document.getElementById("attrTr"+(Math.floor((attrCount-1)/4))).childNodes[(attrCount-1)%4];
//        console.log(td);

        var checkbox = document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("class","myAttrCheckbox");
        checkbox.setAttribute("id","attrCheckbox:"+columsName[i]);
        checkbox.style.float = "left";
        checkbox.style.width = "15%";
        var textDiv = document.createElement("div");
        textDiv.setAttribute("id","attrDiv:"+columsName[i]);
        textDiv.innerHTML = columsName[i];
//        textDiv.style.wordwrap = "break-word";
//        textDiv.setAttribute("word-wrap","break-word");
        textDiv.style.float = "left";
        textDiv.style.overflow = "hidden";
        textDiv.style.textOverflow="ellipsis";
        textDiv.style.whiteSpace="nowrap";
        textDiv.style.width = "85%";
        td.appendChild(checkbox);
        td.appendChild(textDiv);
    }
    for(var i=0;i<outcomeAttrIndex.length;i++)
    {
        var checkTemp = document.getElementById("attrCheckbox:"+outcomeAttrIndex[i]);
        checkTemp.checked = true;
    }
}

