# -*- coding: UTF-8 -*-
from django.shortcuts import render
import datetime
from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from src.deReduction import *
from BBP.settings import PROJECT_ROOT
import json
from bbpApp.models import UpdatedAki


# Create your views here.

def sayHello(request):
    s = 'Hello World!'
    current_time = datetime.datetime.now()
    html = '<html><head></head><body><h1> %s </h1><p> %s </p></body></html>' % (s, current_time)
    return HttpResponse(html)


# post html
def showbbpIndex(request):
    # list = [{id: 1, 'name': 'Jack'}, {id: 2, 'name': 'Rose'}]
    return render_to_response('bbpIndex.html')


@csrf_exempt
def showScatterGraph(request):
    print ("python start...")
    drMethod = str(request.POST['reduction_method'])
    filePath = PROJECT_ROOT + '/resources/BBP_data.csv'
    # patientList = read_file(filePath)
    patientList_aki = read_file_aki(PROJECT_ROOT + '/resources/Updated_AKI_Data.csv')
    # print(patientList_aki)
    # DRPosistionMatrix_before, DRPosistionMatrix_during, DRPosistionMatrix_all = getPatientPos(patientList, drMethod)

    # allData = transferDataToJason(patientList, DRPosistionMatrix_before, DRPosistionMatrix_during,
    #                              DRPosistionMatrix_all)

    allData = transferData(patientList_aki)
    response = JsonResponse(allData, safe=False)
    # print(allData)
    # print(response)
    return response


def showScatterGraph(request):
    print ("python start...")
    drMethod = str(request.POST['reduction_method'])
    filePath = PROJECT_ROOT + '/resources/BBP_data.csv'
    # patientList = read_file(filePath)
    patientList_aki = read_file_aki(PROJECT_ROOT + '/resources/Updated_AKI_Data.csv')
    # print(patientList_aki)
    # DRPosistionMatrix_before, DRPosistionMatrix_during, DRPosistionMatrix_all = getPatientPos(patientList, drMethod)

    # allData = transferDataToJason(patientList, DRPosistionMatrix_before, DRPosistionMatrix_during,
    #                              DRPosistionMatrix_all)

    allData = transferData(patientList_aki)
    response = JsonResponse(allData, safe=False)
    # print(allData)
    # print(response)
    return response


def fetchTableData(request):
    print ("python start...")
    indexnumber = int(request.POST['shownumber'])
    filePath = PROJECT_ROOT + '/resources/BBP_data.csv'
    # patientList = read_file(filePath)
    patientList_aki = read_file_aki_withnumber(PROJECT_ROOT + '/resources/Updated_AKI_Data.csv', indexnumber)
    patientList_aki_all = read_file_aki(PROJECT_ROOT + '/resources/Updated_AKI_Data.csv')

    # print(patientList_aki)
    # DRPosistionMatrix_before, DRPosistionMatrix_during, DRPosistionMatrix_all = getPatientPos(patientList, drMethod)

    # allData = transferDataToJason(patientList, DRPosistionMatrix_before, DRPosistionMatrix_during,
    #                              DRPosistionMatrix_all)

    allData = transferData([patientList_aki_all, patientList_aki])
    # print(allData)

    response = JsonResponse(allData, safe=False)
    # print(allData)
    # print(response)
    return response


def fetchAllData(request):
    print ("python start...")
    filePath = PROJECT_ROOT + '/resources/BBP_data.csv'
    # patientList = read_file(filePath)
    # patientList_aki = read_file_aki_withnumber(PROJECT_ROOT+'/resources/Updated_AKI_Data.csv',indexnumber)

    patientList_aki = read_file_aki(PROJECT_ROOT + '/resources/Updated_AKI_Data.csv')
    # print(patientList_aki)
    # DRPosistionMatrix_before, DRPosistionMatrix_during, DRPosistionMatrix_all = getPatientPos(patientList, drMethod)

    # allData = transferDataToJason(patientList, DRPosistionMatrix_before, DRPosistionMatrix_during,
    #                              DRPosistionMatrix_all)

    allData = transferData(patientList_aki)
    # print(allData)

    response = JsonResponse(allData, safe=False)
    # print(allData)
    # print(response)
    return response


def showStoryLines(request):
    print "python start..."
    drMethod = str(request.POST['reduction_method'])
    weightArray = request.POST.getlist('weightArray')
    maxStageIndex = str(request.POST['maxStageIndex'])
    patientID = str(request.POST['patientID'])
    similarity = str(request.POST['similarity'])
    allData = read_aki_inDataBase(0)
    allPatientDictList = allData[4]
    attributeStage = allData[3]
    columsName = allData[2]
    attributeRangeOrCateNum = allData[6]
    # allPatientDictList = str(request.POST['allPatientDictList'])
    # allPatientDictList = json.loads(allPatientDictList)
    newArray = []
    print float(similarity)
    for i in weightArray:
        newArray.append(float(i))

    similarityArray = calculatingSimilarity(allPatientDictList, attributeStage, columsName, newArray, maxStageIndex,
                                            int(patientID), attributeRangeOrCateNum, float(similarity))
    # rankSvm(allPatientDictList, attributeStage, columsName, newArray, maxStageIndex,
    #                                         int(patientID), attributeRangeOrCateNum, similarityArray)
    response = JsonResponse(similarityArray, safe=False)
    print len(similarityArray)
    # print weightArray
    # print newArray
    # print allPatientDictList
    # filePath = PROJECT_ROOT + '/resources/BBP_data.csv'
    # patientList = read_file(filePath)

    # read_data = read_aki_inDataBase2()
    # patientList_aki = read_data[0]
    # print(patientList_aki)
    # DRPosistionMatrix_in,DRPosistionMatrix_early,DRPosistionMatrix_during,DRPosistionMatrix_before,DRPosistionMatrix_after = getPatientPos_storyline(patientList_aki, drMethod,newArray)
    # DRPosistionMatrix_before, DRPosistionMatrix_during, DRPosistionMatrix_all = getPatientPos(patientList_aki, drMethod)
    #
    # allData = transferDataToJason_storyline(patientList_aki, DRPosistionMatrix_in,DRPosistionMatrix_early,DRPosistionMatrix_during,DRPosistionMatrix_before,DRPosistionMatrix_after)
    # allData_withList = [read_data,allData]
    # # allData = transferData(patientList_aki)
    # response = JsonResponse(allData_withList, safe=False)
    # print(allData[3])
    # print(response)
    return response


def query_test(request):
    response1 = ""
    indexnumber = int(request.POST['shownumber'])

    allData = read_aki_inDataBase(indexnumber);

    # staff_list = UpdatedAki.objects.all() # 这里是所有病人数据
    # if indexnumber <=50:
    #     intersts = UpdatedAki.objects.all()[0:indexnumber ]
    # else:
    #     intersts = UpdatedAki.objects.all()[indexnumber - 50:indexnumber]
    # # entry_list = list(UpdatedAki.objects.all())
    # columns = UpdatedAki._meta.get_fields(include_hidden=True)
    # # print columns[0]
    # columns_name = []
    # attr_names = []                        # 属性名称 是指models中的
    # for attr in columns:
    #     # print
    #     attrs = str(attr).strip().split('.')
    #     # print attrs
    #     attr_names.append(attrs[2])
    #     # print attrs[2]
    #     if attr.db_column is not None:
    #         columns_name.append(attr.db_column)
    #     else:
    #         columns_name.append(attrs[2])
    # # print columns_name
    # # print attr_names
    # allData = []
    # patients_list = []
    # # test = UpdatedAki.objects.get(id=1)
    # # print test
    # # test_attr = getattr(test,attr_names[6])
    # # print test_attr
    # for var in staff_list:
    #     patient = []
    #     for col in attr_names:
    #         attr_value = getattr(var,col)
    #         # if isinstance(attr_value,unicode):
    #         #     attr_value = attr_value.encode('utf-8')
    #             # print col
    #         patient.append(attr_value)
    #     # response1 += getattr(var,attr_names[3])
    #     patient = read_database(patient)
    #     patients_list.append(patient)
    # # staff_str = map(str, staff_list)
    # allData.append(patients_list)     # 所有表里面的病人数据
    #
    # patients_list = []
    # for var in intersts:
    #     patient = []
    #     for col in attr_names:
    #         attr_value = getattr(var,col)
    #         # if isinstance(attr_value,unicode):
    #         #     attr_value = attr_value.encode('utf-8')
    #             # print col
    #         patient.append(attr_value)
    #     # response1 += getattr(var,attr_names[3])
    #     patient = read_database(patient)
    #     patients_list.append(patient)
    # allData.append(patients_list)     # 选择50个的病人数据
    # columns_name.insert(0,'confidence')
    # allData.append(columns_name)      # 列名
    # numerical = []
    # count = 0
    # for col in attr_names:
    #     attr_value =  getattr(staff_list[0],col)
    #     if isinstance(attr_value,float):
    #         numerical.append(count)
    #     count += 1
    # print numerical
    # allData.append(numerical)
    # print len(allData);
    return JsonResponse(allData, safe=False)

def learn_svm(request):
    print "python start..."

    weightArray = request.POST.getlist('weightArray')
    maxStageIndex = str(request.POST['maxStageIndex'])
    patientID = str(request.POST['patientID'])
    similarityIndex= request.POST.getlist('similarityIndex')
    allData = read_aki_inDataBase(0)
    allPatientDictList = allData[4]
    attributeStage = allData[3]
    columsName = allData[2]
    attributeRangeOrCateNum = allData[6]
    # allPatientDictList = str(request.POST['allPatientDictList'])
    # allPatientDictList = json.loads(allPatientDictList)
    newArray = []

    print "similarityIndex"
    print similarityIndex
    newArray = []

    for i in weightArray:
        newArray.append(float(i))

    svm = rankSvm(allPatientDictList, attributeStage, columsName, newArray, maxStageIndex,
            int(patientID), attributeRangeOrCateNum, similarityIndex)
    svm = svm.tolist()
    response = JsonResponse(svm, safe=False)
    return response