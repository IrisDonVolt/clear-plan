from django.contrib import admin
from .models import Users, Journal, Page, Note, Taskbox, TaskItem

# Register your models here.
admin.site.register(Users)
admin.site.register(Journal) 
admin.site.register(Page)
admin.site.register(Note)
admin.site.register(Taskbox)
admin.site.register(TaskItem)