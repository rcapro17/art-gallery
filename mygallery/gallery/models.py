from django.db import models
from django.contrib.auth.models import User

from django.db import models

class UserClient(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Category(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class Artist(models.Model):
    name = models.CharField(max_length=200)
    biography = models.TextField(blank=True)
    
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
    is_sold = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Purchase(models.Model):
    item = models.ForeignKey(Item, related_name='purchases', on_delete=models.CASCADE)
    user_client = models.ForeignKey(User, related_name='purchases', on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Purchase of {self.item.title} by {self.user_client.username}"

