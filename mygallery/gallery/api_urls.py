from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserClientViewSet, CategoryViewSet, ArtistViewSet, ItemViewSet, PurchaseViewSet

router = DefaultRouter()
router.register(r'users', UserClientViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'artists', ArtistViewSet)
router.register(r'items', ItemViewSet)
router.register(r'purchases', PurchaseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
