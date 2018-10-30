/**
 * Created by cat on 2018/5/26.
 */
var allPatientList = [],attributeStage = [],columsName=[],allStageName=[],pagePatientList=[],outcomeAttrIndex=[],stageNum=0;
var cross_cate = [];
var cross_patientList_all_raw = [];
var order_stage = new Int8Array(64);
var vis_stage = new Int8Array(64);
var allPatientDictList = [];                                //所有病人的dict列表
var allPatientDictList_filtered = [];
var pagePatientDictList = [];                               //现阶段需要显示的病人dict列表
var patientDictList = [];
var attributeStrList = [];
var attributeCategoricalList = [];
var attributeNumericalList = [];
var attributeToStageIndex = {};                              //对象 保存每个属性名对应的阶段index
var attributeRangeOrCateNum = {};                            // {"attr1name":{categoryNum:x },"attr2name":{low:a,high:b}........}
var pagePatientsSimilarityLevel = [];

function send_data(){
    var reducmenu = d3.select("#reduc_menu select");
    var reductype = reducmenu.property("value");

    $('#scattergraph_all').empty();
    $('#scattergraph_in').empty();
    $('#scattergraph_be').empty();

    $('.outcomeGraphDiv').empty();

    $('#apgraph').empty();
    //$('#spgraph').empty();
    $('#piegraph').empty();
    $('#akigraph').empty();
    $('#spgraph').empty();

    var SimPatientBt = document.getElementById("SimPatientBt");
    SimPatientBt.innerHTML="相似病人";
    $.ajax({
    //                async : false,
        type:"POST",
        url:"/database/",
        data: {
            'shownumber': '50'
        },
        success: function(data2){
        //                    console.log(data2);
            allPatientList=data2[0];
            pagePatientList=data2[0];
            columsName=data2[2];
            attributeStage=data2[3];
            allPatientDictList=data2[4];
            pagePatientDictList = data2[4];
            attributeRangeOrCateNum = data2[6];
            attributeNumericalList = [];
            pagePatientsSimilarityLevel = new Float32Array(allPatientList.length);
            for(var i=0;i<attributeStage.length;i++){
                if(attributeStage[i].category=="string") attributeStrList.push(attributeStage[i].attributename);            //将属性的类别分类
                if(attributeStage[i].category=="numerical") attributeNumericalList.push(attributeStage[i].attributename);
                if(attributeStage[i].category=="categorical") attributeCategoricalList.push(attributeStage[i].attributename);
                if(attributeStage[i].stage==null) continue;

                if(allStageName.indexOf(attributeStage[i].stage)==-1){
                    allStageName[parseInt(attributeStage[i].stageindex)-1]=attributeStage[i].stage;
                    stageNum++;                                                                                             //统计stage的数量
                }

                attributeToStageIndex[attributeStage[i].attributename] = parseInt(attributeStage[i].stageindex);            //没有包含没有stage的属性

            }

            drawAttrTable(data2);
            //                drawAttrSumTable();
            drawTable_test(data2);



            $(".pointsRule")[0].style.display="block";
            $("#outcomeRow")[0].style.display="block";
            drawHistoAki(data2[0]);

            drawOutcome();
        }
    });

//    var weightArray = [];
////    var inputArray = document.getElementsByClassName("inputW1");
//    for(var i=0;i<columsName.length;i++){
//        weightArray.push(parseFloat(attributeStage[i].category=="string"?0:1.0));
//    }
//    console.log(weightArray);
//    $.ajax({
//        type:"POST",
//        url:"/showStoryLines/",
//        traditional: true,
//        data: {
//            'reduction_method': reductype,
//            'weightArray': weightArray,
//            'allPatientDictList':allPatientDictList
//        },
//        success: function(data){
//
//             drawStoryLines(data[1],0);
//        }
//    });

}
function fetch_data_minus(){
    var now_number =  d3.select("#nownumber").html();
    var number = parseInt(now_number);
    number=number-50;
    d3.select("#nownumber").html(number.toString());
//    var SimPatientBt = document.getElementById("SimPatientBt");
//    SimPatientBt.innerHTML="相似病人"
    //console.log(number-20);
     $('#apgraph').empty();
    if(number < 50) number =50;
    cross_patientList =  allPatientList.slice(number-50,number);
    patientDictList = pagePatientDictList.slice(number-50,number);
    drawTable_withTable_editByYu20180919(allPatientDictList,patientDictList,columsName,"apgraph");
//    drawHistoAki(allPatientList);
//    pagePatientList=allPatientList;
//    pagePatientDictList = allPatientDictList;
//    drawOutcome();

}
function fetch_data_plus(){
    var now_number =  d3.select("#nownumber").html();
    var number = parseInt(now_number);
    number=number+50;
//    var SimPatientBt = document.getElementById("SimPatientBt");
//    SimPatientBt.innerHTML="相似病人"
    d3.select("#nownumber").html(number.toString());
    $('#apgraph').empty();
    //console.log(number+20);
    // 翻页在筛选的时候有问题 会刷新
    cross_patientList =  allPatientList.slice(number-50,number);
    patientDictList = pagePatientDictList.slice(number-50,number);
    drawTable_withTable_editByYu20180919(allPatientDictList,patientDictList,columsName,"apgraph");

}

function new_stage(){
    var checkArray = document.getElementsByClassName("myCheckbox");
    var checked_Arrar = [];
    for (var i=0;i<checkArray.length;i++){
        if(checkArray[i].checked==true) checked_Arrar.push(i);
    }
    var tab = document.getElementById("sumtab");
    var rowNo = tab.rows.length;
    var newTr = tab.insertRow(rowNo);
    var td1 = newTr.insertCell(0);
    var td2 = newTr.insertCell(1);
    var td3 = newTr.insertCell(2);
    newTr.setAttribute("id","sumattr"+(rowNo-1));
    newTr.setAttribute("class","sumattr");
    newTr.setAttribute("bgcolor",document.getElementById("colorStage").value);
    newTr.setAttribute("height","40px");

    var tddiv = document.createElement("div");
    td1.appendChild(tddiv);
    tddiv.setAttribute("class","mytdclass");
    tddiv.innerHTML = document.getElementById("newStageName").value;

    var tddiv2 = document.createElement("div");
    td2.appendChild(tddiv2);
    tddiv2.setAttribute("class","mytdclass");
    tddiv2.innerHTML = checked_Arrar.length;

    var tddiv3 = document.createElement("div");
    td3.appendChild(tddiv3);
    tddiv3.setAttribute("id","sumattr"+(rowNo-1)+'-td3');
    tddiv3.setAttribute("class","mytdclass");
    tddiv3.innerHTML = "显示";

}

function simBtOnClicked(){
    var form_data = $("#sim_modal_data").serialize();
//    console.log(form_data);
    var new_form_data = form_data.split("&");
    //console.log(new_form_data);
    var patientID = parseInt(new_form_data[0].substring(new_form_data[0].indexOf("=")+1));
    //var similarity = parseFloat(new_form_data[1].substring(new_form_data[1].indexOf("=")+1));
    var SimPatientBt = document.getElementById("SimPatientBt");

    SimPatientBt.innerHTML="相似病人:"+patientID;


    $("#myModal").modal("hide");
}

function changeStageVisbility(stageNav){

    var stage_in_hos_index = [2,5,6,7,8,11,13,14,15,19,21,22,23,24,25,26,27,28,29,30,31];
    var stage_pre_index = [32,33,34,36];
    var stage_pre_proce_index = [16,18,56,57,58];
    var stage_in_proce_index = [1,10,12,17,20,35,37,38,39,40,41,42,43,44,45,46,47,48,49,50,52,53,54,55,62];
    var stage_after_proce_index = [4,9,59,60,61];
    var stage_out_hos_index = [3,51];

    var stage_all = [stage_in_hos_index,stage_pre_index,stage_pre_proce_index,stage_in_proce_index,stage_after_proce_index,stage_out_hos_index];
    var stage_name = ["入院(21)","早期评估(4)","术前(5)","术中(25)","术后(5)","出院(2)"];
    var color_stage = ['#b3e2cd','#fdcdac','#cbd5e8','#f4cae4','#e6f5c9','#fff2ae'];
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    thiSpanNav = stageNav.firstChild.firstChild;
//    stageNav = stageNav.firstChild.firstChild;

//    console.log(spanNav.innerHTML);

    stageNavSpan = document.getElementsByClassName("stageNavSpan");
    stageNavLi = document.getElementsByClassName("stageNavLi");
    var stageName = thiSpanNav.innerHTML.indexOf("(不显示)")!=-1?thiSpanNav.innerHTML.substring(0,thiSpanNav.innerHTML.indexOf("(不显示)")):thiSpanNav.innerHTML;

    var index = allStageName.indexOf(stageName);              //  0到index的阶段显示 index之后的不显示
    console.log(stageName);
    for(var i=0;i<allStageName.length;i++){
        if(i<=index)
        {
//            console.log(i);

            stageNavSpan[i].innerHTML=allStageName[i];
            stageNavLi[i].style.backgroundColor=color_stage[i];

        }
        else
        {

            if(stageNavSpan[i].innerHTML.indexOf("(不显示)")==-1) stageNavSpan[i].innerHTML=stageNavSpan[i].innerHTML.concat("(不显示)");
            stageNavLi[i].style.backgroundColor="white";
        }
    }

    for(var j=1;j<columsName.length;j++){
//        console.log(attributeStage[j-1]);
        if(allStageName.indexOf(attributeStage[j-1]["stage"])==null||allStageName.indexOf(attributeStage[j-1]["stage"])<=index)
        {
            $(".col"+j).show();
        }
        else
        {
            $(".col"+j).hide();
        }
    }
    for(var i=1;i<Object.keys(pagePatientDictList).length+1;i++){
        var count = 0;
        var stage_cate_num = 0;
        for (var j = 0; j <= index; j++) {
            stage_cate_num += stage_all[j].length;
            for(var k=1;k<columsName.length;k++){
                if(stage_all[j].indexOf(k)!=-1)
                {
                   if(pagePatientDictList[i-1][columsName[k]]=='NA'){
                            count++;
                   }
                }
            }
        }
        var div_pos = '.d-'+'r'+i+'c'+'0';
        $(div_pos).empty();
        var svg = d3.select(div_pos).append('svg').attr('width',70).attr('height',20);

         var arc_g = svg.append('g')
            .attr("transform", "translate(" + 70*0.5 + "," + 20/2 + ")");
        var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(8)
            .startAngle(0)
            .endAngle(2*Math.PI*((stage_cate_num-count)/stage_cate_num));
        arc_g.append("path")
            .attr("class",'arc')
            .style('fill','pink')
            .attr('d',arc);
        arc_g.append('text')
                    .text(d3.format('.2f')((stage_cate_num-count)/stage_cate_num)).style('opacity','0');
        //console.log(count);
    }
}

function showBorder(obj){
    obj.style.border = "1px #ddd solid";
}

function hideBorder(obj){
    obj.style.border = "0";
}

function showAttrModal(){
    $("#myModal_addOutcomeAttribute").modal('show');
}

function addOutcome(){

//    var checkArray = document.getElementsByClassName("myCheckbox");
    var checked_Arrar = [];
    var checkboxList = document.getElementsByClassName("myAttrCheckbox");
    for (var i=0;i<checkboxList.length;i++){
        var attrName = checkboxList[i].id.substring(checkboxList[i].id.indexOf(":")+1);
//        console.log(attrName);

        if(attributeStrList.indexOf(attrName)!=-1||attributeToStageIndex[attrName]==undefined) continue;       //跳过ID 进出院时间和手术日期 和aki 和pci指征
        var temp = document.getElementById("attrCheckbox:"+attrName);
        if(temp.checked==true) checked_Arrar.push(attrName);
    }

    console.log(checked_Arrar);

    //将全局变量outcomeAttrIndex赋值

    for(var i=0;i<checked_Arrar.length;i++){
        if(outcomeAttrIndex.indexOf(checked_Arrar[i])==-1)
        {
            outcomeAttrIndex.push(checked_Arrar[i]);
            var outcomeDiv = document.createElement("div");
            outcomeDiv.setAttribute("class","outcomeGraphDiv");
            outcomeDiv.setAttribute("id","outcomeGraph:"+checked_Arrar[i]);

            outcomeDiv.ondblclick=function(){
                $(this).remove();
                var outcomeIndex = parseFloat(this.id.substring(12,this.id.length));
                outcomeAttrIndex.splice(outcomeAttrIndex.indexOf(outcomeIndex),1);
            }

            var outcomeRowChild=document.getElementById("outcomeRow").children[0];
            outcomeRowChild.insertBefore(outcomeDiv,outcomeRowChild.lastElementChild);

        }
    }

    drawOutcome();
    $("#myModal_addOutcomeAttribute").modal("hide");

}

function searchSimPatients(){

    var SimPatientBt = document.getElementById("SimPatientBt");

    if(SimPatientBt.innerHTML.indexOf(":")==-1) {
        alert("请选择相似病人");
        return;
    }

    var patientID = parseInt(SimPatientBt.innerHTML.substring(SimPatientBt.innerHTML.indexOf(":")+1));
    var similarity = parseFloat(document.getElementById('demo').innerText.substring(4));
    var reducmenu = d3.select("#reduc_menu select");
    var reductype = reducmenu.property("value");
    var weightArray = [];
    console.log(SimPatientBt.innerHTML);
    if(SimPatientBt.innerHTML.indexOf('度')){

    }
    SimPatientBt.innerHTML=SimPatientBt.innerHTML+'<br>'+'相似度:'+similarity;

//    for(var i=0;i<document.getElementsByClassName("inputW1").length;i++){
//        var inputArray = document.getElementById("weightText"+i);
//        weightArray.push(parseFloat(inputArray.value))
//    }
//    console.log(weightArray);
    var weightArray = [];
//    var inputArray = document.getElementsByClassName("inputW1");
    for(var i=0;i<columsName.length-1;i++){
        weightArray.push(parseFloat(attributeStage[i]["category"]=="string"?0:1.0));
    }
    console.log(weightArray);

    var maxStageIndex=0;
    for(var now_i = 0;now_i<allStageName.length;now_i++ ){
//        console.log("fuck");
//        console.log(document.getElementById("sumattr"+now_i+"-td3").innerHTML);
        if(document.getElementsByClassName("stageNavSpan")[now_i].innerHTML.indexOf("(不显示)")==-1)
        {
            maxStageIndex++;
            continue;
        }

    }



    $.ajax({
        type:"POST",
        url:"/showStoryLines/",
        traditional: true,
        data: {
            'reduction_method': reductype,
            'weightArray': weightArray,
            'maxStageIndex':maxStageIndex,
            'patientID':patientID,
            'similarity':similarity
        },
        success: function(data){
            console.log(data);

            var simiPatientId = [];
            var pagePatientsDicts = [];
            var showSimiPatientLength= 100;

            if(data.length<showSimiPatientLength){
                showSimiPatientLength=data.length;
            }

            for(var i=0;i<showSimiPatientLength;i++)   // 从1开始就把当前病人去掉
            {
               simiPatientId.push(data[i]["id"]);
               pagePatientsDicts.push(allPatientDictList[data[i]["id"]]);
               pagePatientsSimilarityLevel[parseInt(data[i]['id'])] = data[i]['similarity_level'];
            }
            pagePatientDictList = pagePatientsDicts;
//             pagePatientList=pagePatients;
//    //                     console.log(simiPatientId);
//    //                     pagePatientList=simiPatientId;
            console.log(pagePatientsDicts);
            console.log(attributeNumericalList);
            CaculateRadar(pagePatientsDicts);
            drawSimilarPatient(data,"spgraph");
            drawHistoAki(allPatientList,simiPatientId);                        //重新draw outcome
            drawOutcome();




        }
    });
}

function CaculateRadar(alldata) {
    var ColumnStatic = [];
    var axes_patient_low = [];
    var axes_patient_high = [];
    var axes_patient_query=[];
    var maxValueArray = [];

    var simiPatient = document.getElementById('SimPatientBt').innerText;
    var simiPatientText = simiPatient.split(':');
    var simiPatientId = -1;
    if(simiPatientText.length > 1)
        simiPatientId = parseInt(simiPatientText[1]);
    var queryPatient =  allPatientDictList[simiPatientId];
    console.log(attributeToStageIndex);
    console.log(attributeNumericalList);
    var maxStageIndex=0;
    for(var now_i = 0;now_i<allStageName.length;now_i++ ){
//        console.log("fuck");
//        console.log(document.getElementById("sumattr"+now_i+"-td3").innerHTML);
        if(document.getElementsByClassName("stageNavSpan")[now_i].innerHTML.indexOf("(不显示)")==-1)
        {
            maxStageIndex++;
            continue;
        }

    }
    console.log(maxStageIndex);




    for(var k = 0 ;k<attributeNumericalList.length;k++){
        var tempColumn = {};
        var axis_low={};
        var axis_high = {};
        var axis_p = {};
        tempColumn['name'] = attributeNumericalList[k];
        if(attributeToStageIndex[attributeNumericalList[k]]>maxStageIndex){
            continue;
        }

        tempColumn['max'] = 0;
        tempColumn['min'] = 1000;
        ColumnStatic.push(tempColumn);
        var sum = 0;
        for(var i =0 ;i<alldata.length;i++){
                sum+=alldata[i][attributeNumericalList[k]];
                if(alldata[i][attributeNumericalList[k]]>tempColumn['max']){
                   tempColumn['max'] =alldata[i][attributeNumericalList[k]];
                }
                if(alldata[i][attributeNumericalList[k]]< tempColumn['min']){
                   tempColumn['min'] =alldata[i][attributeNumericalList[k]];
                }
        }
        var mean = sum/alldata.length;
        tempColumn['average'] = mean;
        sum=0 ;
        for(var i =0 ;i<alldata.length;i++){
                sum+= Math.pow(alldata[i][attributeNumericalList[k]]-mean,2);
        }
        tempColumn['variance'] = Math.sqrt(sum/alldata.length);
        axis_low['axis'] = attributeNumericalList[k];
        axis_high['axis'] = attributeNumericalList[k];
        axis_low['value'] =  tempColumn['average']-tempColumn['variance'];
        axis_high['value'] =  tempColumn['average']+tempColumn['variance'];
        axis_p['value'] = queryPatient[attributeNumericalList[k]];
        axis_p['axis'] =attributeNumericalList[k];
        // console.log(attributeNumericalList[k]+tempColumn['average']);
        // console.log(attributeNumericalList[k]+tempColumn['variance']);
        //console.log();
        axes_patient_query.push(axis_p);
        axes_patient_high.push(axis_high);
        axes_patient_low.push(axis_low);
        maxValueArray.push(tempColumn['max']);
    }



    var radarData = [];

    var patient_high={};
    var patient_low={};
    var patient_query={};

    patient_query['name'] = 'patient_query';
    patient_query['axes'] = axes_patient_query;
    patient_high['name'] = 'patient_high';
    patient_high['axes'] = axes_patient_high;
    patient_low['name'] = 'patient_low';
    patient_low['axes'] = axes_patient_low;
    radarData.push(patient_high);
    radarData.push(patient_query);
    radarData.push(patient_low);
    console.log(radarData);
    console.log(maxValueArray);
    RadarChart(".piegraph", radarData, radarChartOptions,maxValueArray);
}

function learnSvmSimPatients() {

    var patientID = parseInt(SimPatientBt.innerHTML.substring(SimPatientBt.innerHTML.indexOf(":")+1));

     var weightArray = [];
//    var inputArray = document.getElementsByClassName("inputW1");
    for(var i=0;i<columsName.length-1;i++){
        weightArray.push(parseFloat(attributeStage[i]["category"]=="string"?0:1.0));
    }
    console.log(weightArray);

    var maxStageIndex=0;
    for(var now_i = 0;now_i<allStageName.length;now_i++ ){
//        console.log("fuck");
//        console.log(document.getElementById("sumattr"+now_i+"-td3").innerHTML);
        if(document.getElementsByClassName("stageNavSpan")[now_i].innerHTML.indexOf("(不显示)")==-1)
        {
            maxStageIndex++;
            continue;
        }

    }


    var table = $('#table tr');

    var similarityIndex = [];
    for(var row_s = 2;row_s <table.length; row_s++){
            var div_pos = table[row_s];
            // console.log($(div_pos.childNodes[2]));
            //
            // console.log($(div_pos.childNodes[2])[0].innerText);

            similarityIndex.push(parseInt($(div_pos.childNodes[2])[0].innerText));

        }

    console.log(similarityIndex);

    $.ajax({
                    type:"POST",
                    url:"/learnsvm/",
                    traditional: true,
                     data: {
                         'weightArray': weightArray,
                        'maxStageIndex':maxStageIndex,
                        'patientID':patientID,
                        'similarityIndex':similarityIndex
                             },
                success: function (data) {
                    console.log(data);
                    var weight_input = $('.inputW1');

                    for(var i =0 ;i < weight_input.length;i++){
                        weight_input[i].value = data[0][i];
                    }


                }

                }
            )

}