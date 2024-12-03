from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.models import User
from .models import UserClient, Category, Artist, Item, Purchase, Booking
from .serializers import UserClientSerializer, CategorySerializer, ArtistSerializer, ItemSerializer, PurchaseSerializer, BookingSerializer, UserSerializer, PurchaseItem
from rest_framework_simplejwt.authentication import JWTAuthentication
import logging

# User-related views
class UserClientViewSet(viewsets.ModelViewSet):
    queryset = UserClient.objects.all()
    serializer_class = UserClientSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save()

# Category-related views
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

# Artist-related views
class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [AllowAny]

# Item-related views
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [AllowAny]

# Purchase-related views
class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

@api_view(['POST'])
def create_purchase(request):
    serializer = PurchaseSerializer(data=request.data)
    if serializer.is_valid():
        purchase = serializer.save()
        return Response({'id': purchase.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Booking-related views
class BookingCreateView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        booking = serializer.save()
        subject = 'Confirmação de Agendamento'
        message = f'''
        Olá {booking.name},

        Sua visita foi agendada com sucesso para {booking.booking_date} às {booking.booking_time}.
        Mensagem: {booking.message}

        Agradecemos e esperamos vê-lo em breve!
        '''
        recipient_list = [booking.email]
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            recipient_list,
            fail_silently=False,
        )

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]

# User serializer with custom user creation
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

logger = logging.getLogger(__name__)

class CreatePurchaseView(APIView):
    def post(self, request, *args, **kwargs):
        logger.debug(f"Request data: {request.data}")
        serializer = PurchaseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
