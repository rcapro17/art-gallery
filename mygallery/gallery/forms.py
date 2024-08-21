from django import forms
from .models import UserClient

class UserClientForm(forms.ModelForm):
    class Meta:
        model = UserClient
        fields = ['first_name', 'last_name', 'email', 'date_of_birth']
