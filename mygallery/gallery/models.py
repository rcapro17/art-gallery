from django.db import models
from django.utils import timezone

class UserClient(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class Booking(models.Model):
    user = models.ForeignKey(UserClient, related_name='bookings', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(null=False, max_length=255, default='Default Name')
    email = models.EmailField(null=False, default='default@example.com')
    booking_date = models.DateField(null=False)
    booking_time = models.TimeField(null=False)
    message = models.TextField(null=True)

    def __str__(self):
        return f"Booking by {self.name} on {self.booking_date} at {self.booking_time} - Message: {self.message}"

class Category(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class Artist(models.Model):
    name = models.CharField(max_length=200)
    biography = models.TextField(blank=True)
    foto = models.ImageField(upload_to='artists/', blank=True, null=True)

    def __str__(self):
        return self.name

class Item(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='artworks/')
    audio_description = models.FileField(upload_to='audio_descriptions/', blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, related_name='items', on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, related_name='items', on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=0)  # New field to track stock
    is_sold = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Automatically mark item as sold if the stock is zero
        if self.quantity == 0:
            self.is_sold = True
        super().save(*args, **kwargs)

class Purchase(models.Model):
    user = models.ForeignKey(UserClient, related_name='purchases', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100, default='Unknown')
    email = models.EmailField(max_length=100, default='default@example.com')
    phone = models.CharField(max_length=20, default='000-000-0000')  # Set the default value
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'Purchase {self.id} by {self.name}'

class PurchaseItem(models.Model):
    purchase = models.ForeignKey(Purchase, related_name='items', on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    
    def __str__(self):
        return f'{self.quantity} of {self.item.title}'
