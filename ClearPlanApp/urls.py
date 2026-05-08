from django.urls import path
from . import views 
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.firstpage, name='firstpage'),
    path('register', views.register, name='register'),
    path('home', views.home, name='home'), 
    path('userhome', views.userhome, name='userhome'),
    path('editjournal', views.editjournal, name='editjournal'), 
    path('themes', views.themes, name='themes'), 
    path('calendar', views.calendar, name='calendar'), 
    path('viewCalendarInfo', views.viewCalendarInfo, name='viewCalendarInfo'),
    path('createOpenPage', views.createOpenPage, name='createOpenPage'), 
    path('page/<str:date>/<int:pgno>', views.page, name='page'),
    path('turnPage/<str:date>/<int:pgno>', views.turnPage, name='turnPage'),
    path('updatePageTitle/<str:date>/<int:pgno>', views.updatePageTitle, name='updatePageTitle'),
    path('createUpdateNote/<str:date>/<int:pgno>', views.createUpdateNote, name='createUpdateNote'), 
    path('createUpdateTaskBox/<str:date>/<int:pgno>', views.createUpdateTaskBox, name='createUpdateTaskBox'),
    path('updateTaskPosition/<str:date>/<int:pgno>', views.updateTaskPosition, name='updateTaskPosition'),
    path('updateTaskCheck/<str:date>/<int:pgno>/<str:uuid>/<int:check>', views.updateTaskCheck, name='updateTaskCheck'),
    path('saveImage/<str:date>/<int:pgno>', views.saveImage, name='saveImage'),
    path('deleteEntity/<str:date>/<int:pgno>/<str:uuid>', views.deleteEntity, name='deleteNote')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)