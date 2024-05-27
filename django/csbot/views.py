from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render
from django.urls import reverse
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import ensure_csrf_cookie
import json
import re
from .FacultyGPT.manager.chat_manager import ChatManager
from django.http import JsonResponse
from .models import User, Chat
from .FacultyGPT.provider import english_provider
from django.utils import timezone
from django.middleware.csrf import get_token
from django.middleware.csrf import get_token

chatManagers = {}
chatManagers["admin"] = ChatManager()


def index(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            data = json.loads(request.body)
            prompt = data.get('userinput')
            if request.user.username in chatManagers:
                chat_manager_instance = chatManagers[request.user.username]
            else:
                chat_manager_instance = ChatManager()
            chatManagers[request.user.username] = chat_manager_instance
            response = english_provider.Prompt(prompt, chatManagers[request.user.username])
            print(request.user.username)
            chat = Chat(owner=request.user, message=prompt, response=response, created_at=timezone.now())
            chat.save()
            print(response)

            return JsonResponse({'prompt': prompt, 'response': response})
        else:
            return render(request, "csbot/index.html")
    else:
        return redirect('login')


def history(request):
    if request.user.is_authenticated:

        chats = Chat.objects.filter(owner=request.user)
        '''chats_data = [
            {"message": chat.message, "response": chat.response} 
            for chat in chats
        ]
        return JsonResponse({"chats": chats_data})'''
        return render(request, "csbot/history.html", {
            "chats": chats
        })
    else:
        return redirect('login')


def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        if username is None:
            return JsonResponse({'error': 'Username is required'}, status=400)
        if password is None:
            return JsonResponse({'error': 'Password is required'}, status=400)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            user_data = {
                'username': user.username,
                'email': user.email,
                'csrf_token': get_token(request)
            }
            return JsonResponse({'status': 'success', 'user': user_data})
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid username and/or password.'})
    else:
        csrf_token = get_token(request)
        return JsonResponse({'csrf_token': csrf_token})


def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        confirmation = data.get('confirmationPassword')

        # Validate username
        username_regex = '^[a-z]{3}[0-9]{7}$'
        if not re.match(username_regex, username):
            return JsonResponse(
                {'status': 'error', 'message': 'Username must start with 3 lowercase letters followed by 7 digits.'},
                status=400)

        password_validation_response = validate_password(password)
        if password_validation_response is not None:
            return password_validation_response

        # Ensure password matches confirmation
        if password != confirmation:
            return JsonResponse({'status': 'error', 'message': 'Passwords must match.'}, status=400)

        email = createEmail(username)
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
            chatManagers[user.username] = ChatManager()
        except IntegrityError:
            return JsonResponse({'status': 'error', 'message': 'Username already taken.'}, status=400)
        login(request, user)
        user_data = {
            'username': user.username,
            'email': user.email,
        }
        return JsonResponse({'status': 'success', 'user': user_data, 'csrf_token': get_token(request)})
    else:
        csrf_token = get_token(request)
        return JsonResponse({'csrf_token': csrf_token})


def logout_view(request):
    logout(request)
    return HttpResponse("Logged out.")


def validate_password(password):
    # Validate password length
    if len(password) < 8:
        return JsonResponse({'status': 'error', 'message': 'Password must be at least 8 characters.'}, status=400)
    # Check for at least one lowercase letter
    if not re.search("[a-z]", password):
        return JsonResponse({'status': 'error', 'message': 'Password must contain at least one lowercase letter.'},
                            status=400)
    # Check for at least one uppercase letter
    if not re.search("[A-Z]", password):
        return JsonResponse({'status': 'error', 'message': 'Password must contain at least one uppercase letter.'},
                            status=400)
    # Check for at least one digit
    if not re.search("[0-9]", password):
        return JsonResponse({'status': 'error', 'message': 'Password must contain at least one digit.'}, status=400)
    # Check for at least one symbol
    if not re.search("[@_!#$%^&*()<>?/\|}{~:]", password):
        return JsonResponse({'status': 'error', 'message': 'Password must contain at least one symbol.'}, status=400)
    return None


def createEmail(username):
    return username + "@ju.edu.jo"
