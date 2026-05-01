from django.urls import path
from . import views 

urlpatterns = [
    path('', views.firstpage, name='firstpage'),
    path('register', views.register, name='register'),
    path('home', views.home, name='home'), 
    path('userhome', views.userhome, name='userhome'),
    path('editjournal', views.editjournal, name='editjournal'), 
    path('themes', views.themes, name='themes'), 
    path('calendar', views.calendar, name='calendar'), 
    path('createOpenPage', views.createOpenPage, name='createOpenPage'), 
    path('page/<str:date>/<int:pgno>', views.page, name='page'),
    path('createUpdateNote/<str:date>/<int:pgno>', views.createUpdateNote, name='createUpdateNote'), 
    path('updatePageTitle/<str:date>/<int:pgno>', views.updatePageTitle, name='updatePageTitle')
]