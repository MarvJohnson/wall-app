from django.db import models

# Create your models here.

class User(models.Model):
  email = models.EmailField(max_length=1000)
  username = models.CharField(max_length=300)
  password = models.CharField(max_length=2000)

class Message(models.Model):
  user = models.OneToOneField(User)
  content = models.CharField(max_length=1000)

class Feed(models.Model):
  messages = models.ForeignKey(Message)