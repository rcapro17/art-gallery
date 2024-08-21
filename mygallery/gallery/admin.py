from django.contrib import admin
from .models import Category, Item, Artist, Purchase, UserClient

admin.site.register(Category)
admin.site.register(Item)
admin.site.register(Artist)
admin.site.register(Purchase)
admin.site.register(UserClient)

