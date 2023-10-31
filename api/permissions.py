from rest_framework import permissions

class IsAdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and has isAdmin set to True
        user = request.user
        return user.is_authenticated and user.is_staff
