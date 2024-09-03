
from django.contrib import admin
from .models import Category, Item, Artist, Purchase, UserClient, Booking

# Register models with default configuration
admin.site.register(Category)
admin.site.register(Item)
admin.site.register(Artist)
admin.site.register(Purchase)
admin.site.register(UserClient)
admin.site.register(Booking)


