from django.db import models
from datetime import datetime
import uuid 

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
    pageid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_name = models.CharField(max_length=None)
    date = models.CharField(max_length=None)
    title = models.CharField(max_length=None)
    page_number = models.IntegerField(max_length=None, default=1)
    
class Note(models.Model): 
    noteid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    page = models.UUIDField(max_length=None, default='') # contains the page id of the page that it is part of
    content = models.CharField(max_length=None)
    position_top = models.CharField(max_length=None, default="100px")
    position_left = models.CharField(max_length=None, default="100px")
    width = models.CharField(max_length=None, default="100")
    height=models.CharField(max_length=None, default="100")
    
class Taskbox(models.Model): 
    taskboxid = models.BigAutoField(primary_key=True)
    page = models.CharField(max_length=None) 
    
class TaskItem(models.Model):
    taskitemid = models.BigAutoField(primary_key=True)
    taskbox = models.CharField(max_length=None)
    content = models.CharField(max_length=None)
    checked = models.BooleanField(default=False)