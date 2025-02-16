from django.contrib.auth.models import User # djangon sisään rakennettu käyttäjämalli
from rest_framework import serializers # rest_frameworkin serializers
from .models import Note # tuodaan Note-malli

# määritellään UserSerializer
class UserSerializer(serializers.ModelSerializer): 
    class Meta: # määritellään UserSerializerin meta-luokka
        model = User # malli, joka serialisoidaan
        fields = ["id", "username", "password"] # kentät, jotka serialisoidaan
        extra_kwargs = {"password": {"write_only": True}} # salasanaa ei näytetä serialisoinnin yhteydessä

    # ylikirjoitetaan create-metodi, joka luo uuden käyttäjän
    def create(self, validated_data):  # validoidut tiedot annetaan parametrina jos käyttäjä on validi
        print(validated_data) # tulostetaan validoidut tiedot
        user = User.objects.create_user(**validated_data) # luodaan uusi käyttäjä
        return user # palautetaan käyttäjä
    
# määritellään NoteSerializer
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note # malli, joka serialisoidaan
        fields = ["id", "title", "content", "created_at", "author"] # kentät, jotka serialisoidaan
        extra_kwargs = {"author": {"read_only": True}} # author-kenttä on read-only

