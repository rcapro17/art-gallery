from django.contrib.auth.models import User  # Import the User model
from rest_framework import serializers
from .models import UserClient, Booking, Category, Artist, Item, Purchase, PurchaseItem

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



class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'title', 'description', 'image', 'audio_description', 'price', 'category', 'artist', 'quantity', 'is_sold']


# class ItemSerializer(serializers.ModelSerializer):
#     artist = ArtistSerializer(read_only=True)

#     class Meta:
#         model = Item
#         fields = '__all__'

class PurchaseItemSerializer(serializers.ModelSerializer):
    item = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all(), write_only=True)

    class Meta:
        model = PurchaseItem
        fields = ['item', 'quantity']

class PurchaseSerializer(serializers.ModelSerializer):
    items = PurchaseItemSerializer(many=True)

    class Meta:
        model = Purchase
        fields = ['name', 'email', 'phone', 'address', 'created_at', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        purchase = Purchase.objects.create(**validated_data)
        for item_data in items_data:
            PurchaseItem.objects.create(purchase=purchase, **item_data)
        return purchase
 

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
