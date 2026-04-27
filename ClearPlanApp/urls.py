from django.urls import path
from . import views 

urlpatterns = [
    path('', views.firstpage, name='firstpage'),
    path('testplate', views.testplate, name='testplate'),
    path('register', views.register, name='register'),
    path('home', views.home, name='home'), 
    path('userhome', views.userhome, name='userhome'),
    path('editjournal', views.editjournal, name='editjournal'), 
    path('themes', views.themes, name='themes')
]