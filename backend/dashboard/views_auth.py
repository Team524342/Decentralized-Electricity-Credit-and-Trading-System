# DEPRECATED FILE - Use api_views.py instead
# This file contains duplicate implementations of authentication endpoints
# All functions have been moved to api_views.py with proper error handling and JWT authentication

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.contrib.auth.hashers import check_password
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


# DEPRECATED - Use api_views.py login_user() instead
@api_view(['POST'])
def login_user(request):
    """
    DEPRECATED - Use /api/login/ endpoint instead which is implemented in api_views.py
    
    This duplicate function exists for backwards compatibility only.
    """
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

    if not check_password(password, user.password):
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

    # Generate JWT tokens tied to this user
    refresh = RefreshToken.for_user(user)
    # attach some custom claims
    refresh['email'] = user.email
    refresh['role'] = user.role
    refresh['name'] = user.name

    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'role': user.role,
        'name': user.name,
        'email': user.email,
    })


# DEPRECATED - Use api_views.py for producer dashboard
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def producer_dashboard(request):
    """
    DEPRECATED - Use /api/dashboard/ endpoint instead
    
    This duplicate function exists for backwards compatibility only.
    """
    # Use the request.user set by the authentication class
    user = getattr(request, 'user', None)
    if user is None:
        return Response({"detail": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

    if getattr(user, 'role', '').lower() != 'producer':
        return Response({"detail": "Access denied! Producers only."}, status=status.HTTP_403_FORBIDDEN)

    return Response({"message": f"Welcome Producer {user.name}!"}, status=status.HTTP_200_OK)

