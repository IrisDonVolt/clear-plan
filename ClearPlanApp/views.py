from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages 
from .models import Users, Journal, Page, Note, Taskbox, TaskItem
from django.http import HttpResponse
from datetime import datetime 

   

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
            user_object = Users(username=username)
            user_object.save()       
            return redirect('login')
            
            
    else: 
        primarycolor = request.COOKIES.get('primarycolor')
        context = {
            'primarycolor': primarycolor
        }
        return render(request, 'register.html', context)

def home(request): 
    current_user = request.user 
    if current_user.is_authenticated:
        context = {
            'current_user': current_user
        }
        
        primarycolor = request.COOKIES.get('primarycolor')
        context['primarycolor'] = primarycolor
        current_custom_user = Users.objects.get(username=current_user.username)
        journal = Journal.objects.filter(user_name=current_custom_user.username)
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
        journal = Journal.objects.filter(user_name=current_custom_user.username)
        if journal.exists():
            journal.update(bookcolor=book_color, bindercolor=binder_color)
             
        else: 
            current_custom_user = Users.objects.get(username=current_user.username)
            try: 
                new_journal = Journal(user_name=current_custom_user.username, bookcolor=book_color, bindercolor=binder_color)
                new_journal.save()
                
            except: 
                return HttpResponse(current_custom_user) 
        
        context = {
            'book_color': book_color, 
            'binder_color': binder_color
        }
        return render(request, 'userhome.html', context=context)
    
    else: 
        current_custom_user = Users.objects.get(username=request.user.username)
        journal = Journal.objects.get(user_name=current_custom_user.username)
        context = {
            'book_color': journal.bookcolor, 
            'binder_color': journal.bindercolor
        }
        return render(request, 'userhome.html', context=context)
    
def editjournal(request): 
    current_custom_user = Users.objects.get(username=request.user.username)
    journal_queryset = Journal.objects.filter(user_name=current_custom_user.username)
    if journal_queryset.exists():
        journal = Journal.objects.get(user_name=current_custom_user.username)
        context = {
            'book_color': journal.bookcolor, 
            'binder_color': journal.bindercolor
        }
    
    else: 
        context = {
            'book_color': '#1C4E78', 
            'binder_color': '#000000'
        }
        
    return render(request, 'editjournal.html', context=context)

def themes(request): 
    return render(request, 'themes.html')

def calendar(request): 
    return render(request, 'calendar.html')

def redirectToPage(request): 
    if request.method == "POST":
        date = request.POST['selected-date']
        
        # check if page exists otherwise create new page 
        page = Page.objects.filter(date=date)
        if not page.exists(): 
            current_custom_user = Users.objects.get(username=request.user.username)
            current_journal = Journal.objects.get(user_name=current_custom_user.username)
            new_page = Page(journal=current_journal, date=date)
            new_page.save()
        
        return redirect(f"page/{date}/1")
    
def page(request, date, pgno): 
    context = {'date_value': date, 'pgno': pgno}
    return render(request, 'page.html', context=context)