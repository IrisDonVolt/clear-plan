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
    journal = models.ForeignKey(Journal, on_delete=models.CASCADE, related_name="pages")
    date = models.CharField(max_length=None)
    title = models.CharField(max_length=None)
    
class Note(models.Model): 
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name="notes")
    content = models.CharField(max_length=None)
    
class Taskbox(models.Model): 
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name="tasklists") 
    
class TaskItem(models.Model):
    taskbox = models.ForeignKey(Taskbox, on_delete=models.CASCADE, related_name="taskitems")
    content = models.CharField(max_length=None)
    checked = models.BooleanField(default=False)