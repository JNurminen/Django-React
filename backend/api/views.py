from django.shortcuts import render
from django.contrib.auth.models import User # djangon sisään rakennettu käyttäjämalli
from rest_framework import generics # rest_frameworkin generic views
from .serializers import UserSerializer, NoteSerializer # tuodaan UserSerializer ja NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny # rest_frameworkin käyttöoikeudet

# luodaan CreateUserView näkymä
class CreateUserView(generics.CreateAPIView): 
    queryset = User.objects.all() # haetaan kaikki käyttäjät
    serializer_class = UserSerializer # käytetään UserSerializeria 
    permission_classes = [AllowAny] # sallitaan kaikille