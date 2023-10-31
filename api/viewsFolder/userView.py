from rest_framework import generics, status, exceptions
from ..serializers import EmployeeSerializer, AddEmployeeSerializer, CompanySerializer, AddCompanySerializer, UserSerializer, ChangeEmployeeSerializer
from ..models import Employee, Company, User
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.hashers import make_password
from ..permissions import IsAdminPermission
from django.contrib.auth.hashers import check_password

class GetLoggedInUserView(APIView):
    def get(self, request):
        if request.user.is_authenticated:

            user = User.objects.get(email=request.user.email)
            serializer = UserSerializer(user) 
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "User is not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)

class RegisterUserView(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.save()  

            login(request, user, backend='api.auth.CustomUserBackend')

            return Response({"message": "User registered and authenticated successfully."}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutUserView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            logout(request)
            return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "User is not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)

class LoginUserView(APIView):
    def post(self, request):

        email = request.data.get('username') 
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password, backend='api.auth.CustomUserBackend')

        if user is not None:
            if check_password(password, user.password):
                login(request, user)
                return Response({"message": "User logged in successfully."}, status=status.HTTP_200_OK)
            else:
                # Password does not match
                return Response({"message": "Invalid login credentials."}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            # Authentication failed
            return Response({"message": "Invalid login credentials."}, status=status.HTTP_401_UNAUTHORIZED)
