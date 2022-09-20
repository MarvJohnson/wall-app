from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .models import Message
from django.core import serializers
import json

# Create your views here.

def create_message(request):
  """
  Creates a new message if the requester is an authenticated user, and returns the newly created message in the response.
  """

  if request.user.is_authenticated:
    new_message = Message.objects.create(user=request.user, content=request.POST["messageContent"])
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

def register_new_user(request):
  user_email = request.POST["email"]
  user_username = request.POST["username"]
  user_password = request.POST["password"]
  user_exists = User.objects.filter(email=user_email).exists()

  if not user_exists:
    new_user = User.objects.create(email=user_email, username=user_username, password=user_password)
    new_user.save()
    return HttpResponse(status=201)
  else:
    return HttpResponseBadRequest(content="You cannot register an account with this email!", status=409)

def login_user(request):
  username = request.POST["username"]
  password = request.POST["password"]
  user = authenticate(username=username, password=password)

  if user is not None:
    login(request, user)
    return HttpResponse(status=200)
  else:
    return HttpResponseBadRequest(content="Login failed!", status=401)

def logout_user(request):
  logout(request)
  return HttpResponse(status=200)