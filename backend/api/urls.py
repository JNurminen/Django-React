from django.urls import path
from . import views # tuodaan views.py:n sisältö käyttöön

# Määritellään polut, joiden kautta API:in kautta voidaan hakea,lisätä ja poistaa muistiinpanoja 
urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"), # hakee kaikki muistiinpanot
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"), # luo sekä poistaa muistiinpanon
]