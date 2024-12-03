from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserClientViewSet, CategoryViewSet, ArtistViewSet, ItemViewSet, PurchaseViewSet, BookingViewSet, RegisterView, CreatePurchaseView

router = DefaultRouter()
router.register(r'users', UserClientViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'artists', ArtistViewSet)
router.register(r'items', ItemViewSet)
router.register(r'purchases', PurchaseViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('create-purchase/', CreatePurchaseView.as_view(), name='create-purchase'),
]


