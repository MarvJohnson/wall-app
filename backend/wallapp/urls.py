from django.urls import path
from . import views

urlpatterns = [
  path('messages', views.get_all_messages, name='get_all_messages'),
  path('messages/new', views.create_message, name='create_message'),
  path('get_authenticated_user', views.get_authenticated_user, name="get_authenticated_user"),
  path('auth/register_user', views.register_new_user, name='register_user'),
  path('auth/login_user', views.login_user, name='login_user'),
  path('auth/logout_user', views.logout_user, name='logout_user'),
]