from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import UserClient, Category, Artist, Item, Purchase, Booking, User
from .serializers import UserClientSerializer, CategorySerializer, ArtistSerializer, ItemSerializer, PurchaseSerializer, BookingSerializer, UserSerializer, UserClientSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework import serializers
# views.py
from django.core.mail import send_mail
from rest_framework.permissions import AllowAny
from django.conf import settings


class UserClientViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  # Use the User model to get the correct data
    serializer_class = UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Public access

    def perform_create(self, serializer):
        serializer.save()  # Save the user

class UserClientViewSet(viewsets.ModelViewSet):
    queryset = UserClient.objects.all()
    serializer_class = UserClientSerializer
    permission_classes = [IsAuthenticated]  # Requires authentication for user management

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]  # Public access allowed to view categories

class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [AllowAny]  # Public access allowed to view artists

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [AllowAny] # Public access allowed to view items

class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = [IsAuthenticated]  # Requires authentication for making purchases

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class BookingCreateView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        booking = serializer.save()  # Save the booking instance

        # Prepare email confirmation
        subject = 'Confirmação de Agendamento'
        message = f'''
        Olá {booking.name},

        Sua visita foi agendada com sucesso para {booking.booking_date} às {booking.booking_time}.
        Mensagem: {booking.message}

        Agradecemos e esperamos vê-lo em breve!
        '''
        recipient_list = [booking.email]  # List of recipients

        # Send confirmation email
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            recipient_list,
            fail_silently=False,  # Consider changing this to True for production
        )

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny] 




