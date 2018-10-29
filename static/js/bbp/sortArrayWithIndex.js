/**
 * Created by Y on 2018/7/20.
 */

 function sortArrayWithIndex(dataArray,indexArray){
    var F_dataArray=[], F_indexArray=[];
    var tempArray = [];
    tempArray = dataArray.concat([]);
    while(d3.max(tempArray)!= -1){
        var maxN = d3.max(tempArray);
        var index = tempArray.indexOf(maxN);
        F_dataArray.push(maxN);
        F_indexArray.push(indexArray[index]);
        tempArray[index]=-1;
    }
//    console.log(F_dataArray);
    return {a:F_dataArray,b:F_indexArray};
 }
