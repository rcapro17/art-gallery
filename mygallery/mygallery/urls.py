from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from gallery.views import RegisterView, BookingCreateView
from gallery.views import create_purchase
from django.conf import settings
from django.conf.urls.static import static
from gallery.views import create_purchase
from gallery import views






urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    
    path('api/bookings/', BookingCreateView.as_view(), name='booking-create'),
    path('api/', include('gallery.api_urls')),
    path('create-purchase/', views.create_purchase, name='create_purchase'),
    

    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

