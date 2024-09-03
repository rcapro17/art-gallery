# myapp/authentication.py
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token

class CustomTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        try:
            token = Token.objects.select_related('user').get(key=key)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token.')

        return (token.user, token)
