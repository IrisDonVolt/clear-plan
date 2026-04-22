from django.urls import path
from . import views 

urlpatterns = [
    path('', views.firstpage, name='firstpage'),
    path('register', views.register, name='register'),
    path('home/<str:mode>', views.home, name='home'), 
    path('editjournal', views.editjournal, name='editjournal')
]