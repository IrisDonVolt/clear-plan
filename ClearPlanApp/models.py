from django.db import models
from datetime import datetime

# Create your models here.
class Users(models.Model):
    username = models.CharField(max_length=None, primary_key=True) # string 
    theme = models.CharField(max_length=None, default="waffle") # string 
    font = models.CharField(max_length=None, default="courier")
    taskbar_pref = models.CharField(max_length=None, default="bottom")
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    
class Journal(models.Model):   
    user_name = models.CharField(max_length=None, primary_key=True, default="no_user")
    bookcolor = models.CharField(max_length=None) 
    bindercolor = models.CharField(max_length=None)
    created_at = models.DateTimeField(default=datetime.now, blank=True) 
    