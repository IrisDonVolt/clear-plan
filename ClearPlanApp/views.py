from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages 
from .models import Users, Journal, Page, Note, Taskbox, TaskItem
from django.http import HttpResponse
from datetime import datetime 

   

# Rendering views
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

    
def page(request, date, pgno):
    context = {
        'date_value': date, 
        'pgno': pgno
    }
    
    current_custom_user = Users.objects.get(username=request.user.username)
    
    current_page = Page.objects.get(user_name=current_custom_user.username, date=date, page_number=pgno)
    context['page_title'] = current_page.title
    notes = Note.objects.filter(page=current_page.pageid).values()
    
    if notes.exists(): 
        context['notes'] = notes
        
    return render(request, 'page.html', context=context)


# middleman views 
def createOpenPage(request): 
    current_custom_user = Users.objects.get(username=request.user.username)
    
    if request.method == "POST":
        date = request.POST['selected-date']
        
        # check if page exists otherwise create new page 
        page = Page.objects.filter(date=date, user_name=current_custom_user.username)
        if not page.exists(): 
            new_page = Page(user_name=current_custom_user.username, date=date, page_number=1)
            new_page.save()
        
        return redirect(f"page/{date}/1")
    
def turnPage(request, date, pgno): 
    current_custom_user = Users.objects.get(username=request.user.username)
    
    page = Page.objects.filter(date=date, user_name=current_custom_user.username, page_number=pgno)
    if not page.exists(): 
        new_page = Page(user_name=current_custom_user.username, date=date, page_number=pgno)
        new_page.save()
        
    return redirect(f"/page/{date}/{pgno}")
    
def updatePageTitle(request, date, pgno):
    current_custom_user = Users.objects.get(username=request.user.username)
    current_page = Page.objects.get(date=date, page_number=pgno, user_name=current_custom_user.username)
    
    if request.method == "POST": 
        page_title = request.POST['title-input']
        current_page.title = page_title 
        current_page.save()
        
    return redirect(f"/page/{date}/{pgno}")
    
def createUpdateNote(request, date, pgno):
    current_custom_user = Users.objects.get(username=request.user.username)
    current_page = Page.objects.get(date=date, page_number=pgno, user_name=current_custom_user.username)
    
    if request.method == "POST": 
        noteid = request.POST['hidden-note-id']
        notecontent = request.POST['hidden-note-content'].strip()
        notetop = request.POST['hidden-note-position-top']
        noteleft = request.POST['hidden-note-position-left'] 
    
        note = Note.objects.filter(noteid=noteid)
        if not note.exists():
            new_note = Note(noteid=noteid, page=current_page.pageid, content=notecontent, 
                            position_top=notetop, position_left=noteleft)
            new_note.save()
        else: 
            note = Note.objects.get(noteid=noteid)
            note.content = notecontent 
            note.position_top = notetop 
            note.position_left = noteleft 
            note.save()
        
    return redirect(f"/page/{date}/{pgno}")

def deleteNote(request, date, pgno, uuid): 
    note = Note.objects.get(noteid=uuid)
    note.delete()
    
    return redirect(f"/page/{date}/{pgno}") 