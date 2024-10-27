from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from gallery.views import RegisterView, BookingCreateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/bookings/', BookingCreateView.as_view(), name='booking-create'),
    path('api/', include('gallery.api_urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# from django.contrib import admin
# from django.urls import path, include
# from django.conf import settings
# from django.conf.urls.static import static
# from rest_framework_simplejwt import views as jwt_views
# from gallery.views import RegisterView, BookingCreateView

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
#     path('api/register/', RegisterView.as_view(), name='register'),
#     path('api/bookings/', BookingCreateView.as_view(), name='booking-create'),
#     path('api/', include('gallery.api_urls')), 
# ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
