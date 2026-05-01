from django.db import models
from datetime import datetime

# Create your models here.
class Users(models.Model):
    username = models.CharField(max_length=None, primary_key=True)
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    
class Journal(models.Model):   
    user_name = models.CharField(max_length=None, primary_key=True, default="no_user")
    bookcolor = models.CharField(max_length=None) 
    bindercolor = models.CharField(max_length=None)
    created_at = models.DateTimeField(default=datetime.now, blank=True) 
    
class Page(models.Model): 
    pageid = models.BigAutoField(primary_key=True)
    user_name = models.CharField(max_length=None)
    date = models.CharField(max_length=None)
    title = models.CharField(max_length=None)
    page_number = models.IntegerField(max_length=None, default=0)
    
class Note(models.Model): 
    noteid = models.BigAutoField(primary_key=True)
    page = models.CharField(max_length=None)
    content = models.CharField(max_length=None)
    
class Taskbox(models.Model): 
    taskboxid = models.BigAutoField(primary_key=True)
    page = models.CharField(max_length=None) 
    
class TaskItem(models.Model):
    taskitemid = models.BigAutoField(primary_key=True)
    taskbox = models.CharField(max_length=None)
    content = models.CharField(max_length=None)
    checked = models.BooleanField(default=False)