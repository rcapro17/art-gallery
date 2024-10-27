from django.contrib.auth.models import User  # Import the User model
from rest_framework import serializers
from .models import UserClient, Booking, Category, Artist, Item, Purchase

class UserClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserClient
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'

# serializers.py



class ItemSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(read_only=True)

    class Meta:
        model = Item
        fields = '__all__'

class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['name', 'email', 'booking_date', 'booking_time', 'message']

# Add UserSerializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])  # Set the password properly
        user.save()
        return user

class UserClientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Associa o usuário ao perfil

    class Meta:
        model = UserClient
        fields = '__all__'
