from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
from django.core import mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from .models import Message
from django.core import serializers
import json

# Create your views here.

@csrf_exempt
def create_message(request):
  """
  Creates a new message if the requester is an authenticated user, and returns the newly created message in the response.
  """

  if request.user.is_authenticated:
    data = json.loads(request.body)
    new_message = Message.objects.create(user=request.user, content=data["messageContent"])
    new_message.save()

    # Serializes new_message and parses it as json.

    json_message = json.loads(serializers.serialize('json', [new_message,], fields=('username', 'content')))[0]

    response = {
      "user": request.user.username,
      "messageContent": json_message["fields"]["content"]
    }

    return JsonResponse(data=response, status=201)
  else:
    return HttpResponseBadRequest(content="You must be logged in to create a new message!", status=401)

@csrf_exempt
def get_all_messages(request):
  """
  Fetches all the objects belonging to the Message queryset and sends them as a list in the response.
  """
  
  all_messages = json.loads(serializers.serialize('json', Message.objects.all()))

  response = []

  for message in all_messages:
    message_fields = message["fields"]
    message_user = User.objects.get(pk=message_fields["user"])
    reformatted_message = {
      "user": message_user.username,
      "messageContent": message_fields["content"]
    }
    response.append(reformatted_message)

  return JsonResponse(response, safe=False)

@csrf_exempt
def register_new_user(request):
  """
  Attempts to register a new user with the credentials provided by the client and returns a failure message if it couldn't do so successfully.
  """
  
  data = json.loads(request.body)
  email = data["email"]
  username = data["username"]
  password = data["password"]
  user_exists = User.objects.filter(email=email).exists()

  if not user_exists:
    user = User.objects.create_user(email=email, username=username, password=password)
    
    send_mail(
        'Welcome to Wall App!',
        'With your new account, you\'ll be able to post messages to the message wall. Give it a try by logging in and entering a message!',
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
    )

    return HttpResponse(status=201)
  else:
    return HttpResponseBadRequest(content="You cannot register an account with this email!", status=409)

@csrf_exempt
def login_user(request):
  """
  Attempts to log the user in with the credentials provided by the client and returns the user's username if successful or a failure message otherwise.
  """
  
  data = json.loads(request.body)
  username = data["username"]
  password = data["password"]
  user = authenticate(request, username=username, password=password)
  
  if user is not None:
    login(request, user)
    return JsonResponse(data={ "username": username }, status=200)
  else:
    return HttpResponseBadRequest(content="Login failed!", status=401)

@csrf_exempt
def logout_user(request):
  """
  Logs the user out and clears their session data.
  """
  
  logout(request)
  return HttpResponse(status=200)

@csrf_exempt
def get_authenticated_user(request):
  """
  Checks whether the requesting client is an authenticated user and returns the user's username if they are.
  """
  
  if request.user.is_authenticated:
    user = User.objects.get(username=request.user.username)
    return JsonResponse(data={ "username": user.username }, status=200)
  else:
    return HttpResponse(status=200)