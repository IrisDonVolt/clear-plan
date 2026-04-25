from django.db import models
from datetime import datetime

# Create your models here.
class Users(models.Model):
    username = models.CharField(max_length=None, primary_key=True) # string 
    theme = models.CharField(max_length=None) # string 
    font = models.CharField(max_length=None)
    taskbar_pref = models.CharField(max_length=None)
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    
class Journal(models.Model):   
    created_user = models.ForeignKey(Users, on_delete=models.CASCADE)
    bookcolor = models.CharField(max_length=None) 
    bindercolor = models.CharField(max_length=None) 
    coverimage = models.ImageField()
    created_at = models.DateTimeField(default=datetime.now, blank=True) 
    