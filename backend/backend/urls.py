from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView # tuodaan CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # tuodaan valmiiksi luodut TokenObtainPairView ja TokenRefreshView

# määritellään reitit
urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"), # luodaan reitti CreateUserView-näkymälle
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"), # luodaan reitti TokenObtainPairView-näkymälle
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"), # luodaan reitti TokenRefreshView-näkymälle
    path("api-auth/", include("rest_framework.urls")), # lisätään reitti rest_frameworkin oletusnäkymille
    path("api/", include("api.urls")), # lisätään reitti api-sovelluksen reiteille
]
