from django.shortcuts import render
from django.contrib.auth.models import User # djangon sisään rakennettu käyttäjämalli
from rest_framework import generics # rest_frameworkin generic views
from .serializers import UserSerializer, NoteSerializer# tuodaan UserSerializer ja NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny # rest_frameworkin käyttöoikeudet
from .models import Note # tuodaan Note-malli

# luodaan NoteListCreate näkymä
class NoteListCreate(generics.ListCreateAPIView): # listaa ja luo uusia noteja
    serializer_class = NoteSerializer # käytetään NoteSerializeria
    permission_classes = [IsAuthenticated] # käyttäjän täytyy olla kirjautunut sisään

    def get_queryset(self): # haetaan kaikki käyttäjän omat notejen
        user = self.request.user # haetaan käyttäjä
        return Note.objects.filter(author=user) # palautetaan käyttäjän omat notet filtteröity lista

    def perform_create(self, serializer): # luodaan uusi note
        if serializer.is_valid(): # jos serializer on validi
            serializer.save(author=self.request.user) # tallennetaan serializer ja lisätään author-kenttään kirjautunut käyttäjä
        else:  # jos serializer ei ole validi
            print(serializer.errors) # tulostetaan virheet



# luodaan NoteDelete näkymä
class NoteDelete(generics.DestroyAPIView): # poistaa noteja 
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)



# luodaan CreateUserView näkymä
class CreateUserView(generics.CreateAPIView): # luo uuden käyttäjän
    queryset = User.objects.all() # haetaan kaikki käyttäjät
    serializer_class = UserSerializer # käytetään UserSerializeria 
    permission_classes = [AllowAny] # sallitaan kaikille