from django.db import models
from django.contrib.auth.models import User

# luodaan Note-malli
class Note(models.Model): 
    title = models.CharField(max_length=100) # lisätään title-kenttä, joka on merkkijono
    content = models.TextField() # lisätään content-kenttä, joka on tekstikenttä
    created_at = models.DateTimeField(auto_now_add=True) # lisätään created_at-kenttä, joka saa arvokseen luontihetken
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes") # lisätään author-kenttä, joka on yhteydessä User-malliin foreign keyllä

    def __str__(self):
        return self.title