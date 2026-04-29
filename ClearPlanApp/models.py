from django.db import models
from datetime import datetime

# Create your models here.
class Users(models.Model):
    username = models.CharField(max_length=None, primary_key=True) # string 
    lightwash = models.CharField(max_length=7, default="#FFDAB7")
    primarycolor = models.CharField(max_length=7, default="#872E0B")
    secondarycolor = models.CharField(max_length=7, default="9A5A16")
    accentcolor = models.CharField(max_length=7, default="#000000")
    primaryfont=models.CharField(max_length=None, default="'Courier New', Courier, monospace")
    taskbar_pref = models.CharField(max_length=None, default="bottom")
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    
class Journal(models.Model):   
    user_name = models.CharField(max_length=None, primary_key=True, default="no_user")
    bookcolor = models.CharField(max_length=None) 
    bindercolor = models.CharField(max_length=None)
    created_at = models.DateTimeField(default=datetime.now, blank=True) 
    