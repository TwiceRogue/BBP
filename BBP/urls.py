"""BBP URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from bbpApp.views import *

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^bbpApp/sayHello$', sayHello),
    url(r'^bbpApp/bbpIndex$', showbbpIndex),
    url(r'^showScatterGraph/$', showScatterGraph),
    url(r'^fetchTableData/$', fetchTableData),
    url(r'^fetchAllData/$', fetchAllData),
    url(r'^showStoryLines/$', showStoryLines),
    url(r'^database/',query_test),
    url(r'^learnsvm/',learn_svm),
]