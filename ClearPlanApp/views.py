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

def home(request): 
    current_user = request.user 
    if current_user.is_authenticated:
        context = {
            'current_user': current_user
        }
        
        current_custom_user = Users.objects.get(username=current_user.username)
        journal = Journal.objects.filter(created_user=current_custom_user)
        if journal.exists():
            return redirect('userhome')
        else: 
            return render(request, 'home.html', context)

def userhome(request):
    if request.method == 'POST': 
        book_color = request.POST['book-options']
        binder_color = request.POST['binder-options']
        # get image as well 
        
        current_user = request.user
        current_custom_user = Users.objects.get(username=current_user.username)
        journal = Journal.objects.filter(created_user=current_custom_user)
        if journal.exists():
             journal.update(bookcolor=book_color, binder_color=binder_color)
             journal.save()
             
        else: 
            current_custom_user = Users.objects.get(username=current_user.username)
            new_journal = Journal(created_user=current_custom_user, bookcolor=book_color, bindercolor=binder_color)
            new_journal.save()
        
        context = {
            'book_color': book_color, 
            'binder_color': binder_color
        }
        return render(request, 'userhome.html', context=context)
    
    else: 
        current_custom_user = User.objects.get(username=request.user.username)
        journal = Journal.objects.get(created_user=current_custom_user)
        context = {
            'book_color': journal.bookcolor, 
            'binder_color': journal.bindercolor
        }
        return render(request, 'userhome.html', context=context)
    
def editjournal(request): 
    return render(request, 'editjournal.html')