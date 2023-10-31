from rest_framework import generics, status, exceptions
from ..serializers import EmployeeSerializer, AddEmployeeSerializer, CompanySerializer, AddCompanySerializer, UserSerializer, ChangeEmployeeSerializer
from ..models import Employee, Company, User
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.hashers import make_password
from ..permissions import IsAdminPermission
from django.contrib.auth.hashers import check_password

class CompanyView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class CreateCompanyView(APIView):
    serializer_class = AddCompanySerializer
    permission_classes = [IsAdminPermission]

    def post(self, request, format=None):
        if not request.user.is_staff:
            raise exceptions.PermissionDenied("You do not have permission to perform this operation.")

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name =  serializer.data.get("name")
            cnpj= serializer.data.get("cnpj")
            address = serializer.data.get("address")
            email =  serializer.data.get("email")
            sector = serializer.data.get("sector")
            logo = serializer.data.get("logo")
            queryset = Company.objects.filter(email=email)
            if queryset.exists():
                return Response({"message": "This company already exists"})
            else: 
                company = Company(name=name, cnpj=cnpj, email=email, sector=sector, logo=logo, address=address)
                company.save()

            return Response(CompanySerializer(company).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateCompanyView(generics.UpdateAPIView):
    serializer_class = AddCompanySerializer
    queryset = Company.objects.all()
    lookup_field = "pk"
    permission_classes = [IsAdminPermission]

    def update(self, request, *args, **kwargs):
        if not request.user.is_staff:
            raise exceptions.PermissionDenied("You do not have permission to perform this operation.")

        serializer = self.get_serializer(instance=self.get_object(), data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Company info updated successfully"})
        else:
            return Response({"message": "Failed", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class DeleteCompanyView(generics.DestroyAPIView):
    queryset = Company.objects.all()
    permission_classes = [IsAdminPermission]

    def destroy(self, request, *args, **kwargs):
        if not request.user.is_staff:
            raise exceptions.PermissionDenied("You do not have permission to perform this operation.")

        instance = self.get_object()
        instance.delete()
        return Response({"message": "Company deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
