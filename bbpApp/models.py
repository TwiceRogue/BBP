# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class Stage(models.Model):
    attributename = models.CharField(primary_key=True, max_length=45)
    stage = models.CharField(max_length=45, blank=True, null=True)
    stageindex = models.CharField(db_column='stageIndex', max_length=45, blank=True, null=True)  # Field name made lowercase.
    category = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stage'


class UpdatedAki(models.Model):
    id = models.IntegerField(primary_key=True)
    procedure_date = models.CharField(db_column='Procedure_Date', max_length=45, blank=True, null=True)  # Field name made lowercase.
    in_hos_datetime = models.CharField(db_column='IN_HOS_DATETIME', max_length=45, blank=True, null=True)  # Field name made lowercase.
    out_hos_datetime = models.CharField(db_column='OUT_HOS_DATETIME', max_length=45, blank=True, null=True)  # Field name made lowercase.
    aki_stage = models.IntegerField(blank=True, null=True)
    field_field = models.FloatField(db_column='\u624b\u672f\u5e74\u9f84', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'.
    field_field_0 = models.CharField(db_column='\u6027\u522b', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    anemia = models.IntegerField(blank=True, null=True)
    field_field_1 = models.CharField(db_column='\u7cd6\u5c3f\u75c5', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_2 = models.CharField(db_column='\u5fc3\u529b\u8870\u7aed', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_iabp_field = models.IntegerField(db_column='\u4e3b\u52a8\u8109\u5185\u7403\u56ca\u53cd\u640f(IABP)', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'.
    hypotension = models.IntegerField(blank=True, null=True)
    field_field_3 = models.FloatField(db_column='\u5bf9\u6bd4\u5242\u7528\u91cf', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    gfr = models.FloatField(blank=True, null=True)
    field_field_4 = models.IntegerField(db_column='\u5fc3\u808c\u6897\u6b7b\u53f2', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    hypercholesterolemia = models.IntegerField(db_column='Hypercholesterolemia', blank=True, null=True)  # Field name made lowercase.
    hdl_c = models.FloatField(db_column='HDL-C', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    urgent_pci = models.IntegerField(db_column='urgent_PCI', blank=True, null=True)  # Field name made lowercase.
    pre_crea = models.FloatField(db_column='Pre_Crea', blank=True, null=True)  # Field name made lowercase.
    field_field_5 = models.CharField(db_column='\u9ad8\u8840\u538b', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_6 = models.CharField(db_column='\u4e3b\u52a8\u8109\u7403\u56ca\u53cd\u640f', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_7 = models.CharField(db_column='\u5fc3\u808c\u6897\u6b7b', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_8 = models.CharField(db_column='\u5438\u70df', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_9 = models.CharField(db_column='\u8840\u8102\u5f02\u5e38', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_10 = models.CharField(db_column='\u80be\u529f\u80fd\u5f02\u5e38', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_11 = models.CharField(db_column='\u51a0\u5fc3\u75c5\u5bb6\u65cf\u53f2', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_12 = models.CharField(db_column='\u65e9\u53d1\u51a0\u5fc3\u75c5\u5bb6\u65cf\u53f2', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    cabg_field = models.CharField(db_column='CABG\u624b\u672f\u53f2', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    field_field_13 = models.CharField(db_column='\u7cd6\u5c3f\u75c5\u6cbb\u7597\u65b9\u6848', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_14 = models.CharField(db_column='\u51fa\u8840\u6027\u8111\u8840\u7ba1\u75be\u75c5', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_15 = models.CharField(db_column='\u5916\u5468\u52a8\u8109\u75be\u75c5', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_16 = models.CharField(db_column='\u6162\u6027\u80ba\u75c5', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_17 = models.FloatField(db_column='\u5fc3\u7387', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_18 = models.FloatField(db_column='\u6536\u7f29\u538b', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_19 = models.FloatField(db_column='\u8212\u5f20\u538b', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_20 = models.CharField(db_column='\u5bf9\u6bd4\u5242\u7c7b\u578b', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_21 = models.CharField(db_column='\u8bca\u65ad\u6027\u5bfc\u7ba1\u672f', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_22 = models.CharField(db_column='\u9020\u5f71\u7ed3\u8bba', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_23 = models.FloatField(db_column='\u5de6\u4e3b\u5e72\u51a0\u72b6\u52a8\u8109', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_24 = models.FloatField(db_column='\u8fd1\u6bb5\u51a0\u72b6\u52a8\u8109', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_25 = models.FloatField(db_column='\u4e2d\u6bb5/\u8fdc\u6bb5/\u5bf9\u89d2\u652f\u51a0\u72b6\u52a8\u8109', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    circ_oms_pda_lpl = models.FloatField(db_column='Circ.OMs.PDA.LPL', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    rca_rpda_rpl_am = models.FloatField(db_column='RCA.RPDA.RPL.AM', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    field_field_26 = models.CharField(db_column='\u6865\u8840\u7ba1', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    pci_field = models.CharField(db_column='PCI\u72b6\u6001', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    pci_field_0 = models.CharField(db_column='PCI\u6307\u5f81', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it ended with '_'. Field renamed because of name conflict.
    d2b_field = models.FloatField(db_column='D2B \u65f6\u95f4', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    field_field_27 = models.CharField(db_column='\u666e\u901a\u809d\u7d20', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_pci_field = models.CharField(db_column='\u963f\u53f8\u5339\u6797(PCI)', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'.
    field_field_28 = models.CharField(db_column='\u6bd4\u4f10\u5362\u5b9a', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_29 = models.CharField(db_column='\u76f4\u63a5\u51dd\u8840\u9176\u6291\u5236\u5242', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    iib_iiia_field = models.CharField(db_column='IIb/IIIa\u53d7\u4f53\u62ee\u6297\u5242', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    field_pci_field_0 = models.CharField(db_column='\u6c2f\u5421\u683c\u96f7(PCI)', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_pci_field_1 = models.CharField(db_column='\u666e\u62c9\u683c\u96f7(PCI)', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_30 = models.CharField(db_column='\u66ff\u5361\u683c\u96f7', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_pci_field_2 = models.CharField(db_column='\u567b\u6c2f\u5421\u5576(PCI)', max_length=45, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_i = models.FloatField(db_column='\u672f\u524d\u808c\u9499\u86cb\u767dI', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it started with '_'.
    field_field_31 = models.FloatField(db_column='\u672f\u524d\u8840\u7ea2\u86cb\u767d', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_32 = models.FloatField(db_column='\u672f\u524d\u4f4e\u5bc6\u5ea6\u8102\u86cb\u767d', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_i_0 = models.FloatField(db_column='\u672f\u540e\u808c\u9499\u86cb\u767dI', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because of name conflict.
    field_field_33 = models.FloatField(db_column='\u672f\u540e\u8840\u7ea2\u86cb\u767d', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_34 = models.FloatField(db_column='\u672f\u540e\u4f4e\u5bc6\u5ea6\u8102\u86cb\u767d', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.
    field_field_35 = models.CharField(db_column='\u5bf9\u6bd4\u5242\u8fc7\u654f', max_length=45, blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it started with '_'. Field renamed because it ended with '_'. Field renamed because of name conflict.

    class Meta:
        managed = False
        db_table = 'updated_aki'
