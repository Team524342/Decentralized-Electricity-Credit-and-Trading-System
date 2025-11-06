from rest_framework.permissions import BasePermission

class IsConsumer(BasePermission):
    """Allow access only to users with role = consumer"""
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'consumer')


class IsProducer(BasePermission):
    """Allow access only to users with role = producer"""
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'producer')


class IsAdmin(BasePermission):
    """Allow access only to users with role = admin"""
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'admin')
