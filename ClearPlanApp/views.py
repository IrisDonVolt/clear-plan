from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages 
from .models import Users, Journal

# Create your views here.
def firstpage(request):
    return render(request, "firstpage.html")

def register(request): 
    if request.method == 'POST': 
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        
        if User.objects.filter(email=email).exists():
            messages.info(request, 'Email already exists.')
            return redirect('register')
        
        elif User.objects.filter(username=username).exists(): 
            messages.info(request, 'Username already exists.')
            return redirect('register')
        
        else: 
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            
            # create user object in Users database 
            user_object = Users(
                username=username, 
                theme="default",
                font="default",
                taskbar_pref="default" 
            )
            user_object.save()       
            return redirect('login')
            
            
    else: 
        return render(request, 'register.html')

def home(request, mode): 
    current_user = request.user 
    if current_user.is_authenticated: 
        current_user_id = current_user.id 
        current_user_username = current_user.username 
        
        context = {
            'id': current_user_id, 
            'username': current_user_username
        }
        
        journal = Journal.objects.filter(userid=current_user_id)
        if journal: 
            mode = f"{current_user_username}"
        else: 
            mode = "new"
        
        return render(request, 'home.html', {'context': context, 'mode': mode})

def editjournal(request): 
    return render(request, 'editjournal.html')