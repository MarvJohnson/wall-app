from django.test import TestCase
from django.core import mail
from django.contrib.auth.models import User
from .models import Message
from django.urls import reverse

# Create your tests here.

class MessageTests(TestCase):
  def test_reject_message_creation_if_user_not_logged_in(self):
    """
    test_reject_message_creation_if_user_not_logged_in() returns a 401 status code and failure message when a non-authenticated user attempts to create a new message, and
    ignores the message they attempted to create.
    """

    # Arrange/Act

    response = self.client.post(reverse("create_message"), { "messageContent": "abc1234" }, 'application/json')
    response_message = response.getvalue().decode("utf-8")

    # Assert

    self.assertEqual(response.status_code, 401)
    self.assertEqual(Message.objects.count(), 0)
    self.assertEqual(response_message, "You must be logged in to create a new message!")

  def test_add_message_to_feed_when_authenticated_user_submits_a_new_message(self):
    """
    test_add_message_to_feed_when_authenticated_user_submits_a_new_message() returns a 201 status code and the newly created message when an authenticated user creates
    a new message.
    """
    
    # Arrange

    user = User.objects.create_user(username="testuser", password="12345")

    # Act

    self.client.force_login(user)
    response = self.client.post(reverse("create_message"), { "messageContent": "abc1234" }, 'application/json')
    self.client.logout()

    # Assert
    
    self.assertEqual(response.status_code, 201)
    self.assertEqual(Message.objects.count(), 1)
    
    new_message = response.json()
    self.assertEqual(new_message["user"], "testuser")
    self.assertEqual(new_message["messageContent"], "abc1234")

  def test_unauthorized_user_requesting_all_messages(self):
    """
    test_unauthorized_user_requesting_all_messages() returns a 200 status code and all the objects belonging to the Message queryset.
    """

    # Arrange

    user = User.objects.create_user(username="testuser", password="123456")
    message1 = Message.objects.create(user=user, content="abc123")
    message1.save()
    message2 = Message.objects.create(user=user, content="def456")
    message2.save()

    # Act

    response = self.client.get(reverse("get_all_messages"))

    # Assert

    self.assertEqual(response.status_code, 200)
    all_messages = response.json()
    self.assertEqual(len(all_messages), 2)

  def test_authorized_user_requesting_all_messages(self):
    """
    test_authorized_user_requesting_all_messages() returns a 200 status code and all the objects belonging to the Message queryset.
    """

    # Arrange

    user = User.objects.create_user(username="testuser", password="123456")
    message1 = Message.objects.create(user=user, content="abc123")
    message1.save()
    message2 = Message.objects.create(user=user, content="def456")
    message2.save()

    # Act

    self.client.force_login(user)
    response = self.client.get(reverse("get_all_messages"))

    # Assert

    self.assertEqual(response.status_code, 200)
    all_messages = response.json()
    self.assertEqual(len(all_messages), 2)

class UserAuthTests(TestCase):
  def test_register_user(self):
    """
    test_register_user() creates a new User entry and returns a 201 status code.
    """

    # Arrange

    user_login = {
      "email": "test@test.com",
      "username": "testuser",
      "password": "abc123"
    }

    # Act

    response = self.client.post(reverse("register_user"), user_login, 'application/json')

    # Assert

    self.assertEquals(response.status_code, 201)
    self.assertEquals(User.objects.count(), 1)

  def test_reject_user_registration_if_user_already_exists(self):
      """
      test_reject_user_registration_if_user_already_exists() rejects a user's attempt to register a new account if another user with the same email already exists.
      """

      # Arrange

      user_login = {
        "email": "test@test.com",
        "username": "testuser",
        "password": "abc123"
      }

      User.objects.create_user(email=user_login["email"], username=user_login["username"], password=user_login["password"])

      # Act

      response = self.client.post(reverse("register_user"), user_login, 'application/json')
      response_message = response.getvalue().decode("utf-8")

      # Assert

      self.assertEquals(response.status_code, 409)
      self.assertEquals(response_message, "You cannot register an account with this email!")

  def test_login_user(self):
    """
    test_login_user() successfully logs a user in when they enter valid credentials and returns a 200 status code.
    """

    # Arrange

    user_login = {
      "username": "testuser",
      "password": "abc123"
    }

    User.objects.create_user(email="test@test.com", username=user_login["username"], password=user_login["password"])

    # Act

    response = self.client.post(reverse("login_user"), user_login, 'application/json')

    # Assert

    self.assertEqual(response.status_code, 200)

  def test_logout_user(self):
    """
    test_logout_user() successfully logs a user out and returns a 200 status code.
    """

    # Arrange

    user_login = {
      "username": "testuser",
      "password": "abc123"
    }

    user = User.objects.create_user(email="test@test.com", username=user_login["username"], password=user_login["password"])

    # Act

    self.client.force_login(user)
    response = self.client.post(reverse("logout_user"))

    # Assert

    self.assertEqual(response.status_code, 200)

  def test_get_authenticated_user_for_logged_in_user_returns_username(self):
    """
    test_get_authenticated_user_for_logged_in_user_returns_username() checks if the client is an authenticated, and if so, returns their username.
    """

    # Arrange

    user_login = {
      "username": "testuser",
      "password": "abc123"
    }

    user = User.objects.create_user(email="test@test.com", username=user_login["username"], password=user_login["password"])

    # Act

    self.client.force_login(user)
    response = self.client.post(reverse("get_authenticated_user"))

    # Assert

    resUser = response.json()["username"]
    self.assertEquals(resUser, "testuser")

  def test_get_authenticated_user_for_logged_out_user_returns_empty(self):
    """
    test_get_authenticated_user_for_logged_out_user_returns_empty() checks if the client is an authenticated, and if not, returns nothing.
    """

    # Arrange/Act
    response = self.client.post(reverse("get_authenticated_user"))

    # Assert

    self.assertRaises(ValueError, response.json)

class EmailTests(TestCase):
  def test_newly_registered_user_is_sent_welcome_email(self):
    """
    test_newly_registered_user_is_sent_welcome_email() ensures newly registered users are sent a welcome email.
    """
    
    # Arrange

    user_login = {
      "email": "test@test.com",
      "username": "testuser",
      "password": "abc123"
    }

    # Act

    self.client.post(reverse("register_user"), user_login, 'application/json')

    # Assert

    self.assertEqual(len(mail.outbox), 1)
    self.assertEqual(mail.outbox[0].subject, 'Welcome to Wall App!')