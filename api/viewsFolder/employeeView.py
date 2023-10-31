from rest_framework import generics, status, exceptions
from ..serializers import EmployeeSerializer, AddEmployeeSerializer, CompanySerializer, AddCompanySerializer, UserSerializer, ChangeEmployeeSerializer
from ..models import Employee, Company, User
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.hashers import make_password
from ..permissions import IsAdminPermission
from django.contrib.auth.hashers import check_password

class EmployeeView(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class CreateEmployeeView(APIView):
    serializer_class = AddEmployeeSerializer
    permission_classes = [IsAdminPermission]

    def post(self, request, format=None):
        if not request.user.is_staff:
            raise exceptions.PermissionDenied("You do not have permission to perform this operation.")

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name =  serializer.data.get("name")
            department= serializer.data.get("department")
            email = serializer.data.get("email")
            birthday =  serializer.data.get("birthday")
            admissionDate = serializer.data.get("admissionDate")
            queryset = Employee.objects.filter(email=email)
            if queryset.exists():
                employee = queryset[0]
                employee.name = name
                employee.department = department
                employee.birthday = birthday
                employee.admissionDate = admissionDate
                employee.save(update_fields=['name', 'department', 'birthday','profilePicture', 'admissionDate'])
            else: 
                employee = Employee(name=name, department=department, email=email, birthday=birthday, admissionDate=admissionDate)
                employee.save()
            
            return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateEmployeeView(generics.UpdateAPIView):
    serializer_class = ChangeEmployeeSerializer
    queryset = Employee.objects.all()
    lookup_field = "pk"
    permission_classes = [IsAdminPermission]

    def update(self, request, *args, **kwargs):
        if not request.user.is_staff:
            raise exceptions.PermissionDenied("You do not have permission to perform this operation.")

        serializer = self.get_serializer(instance=self.get_object(), data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Employee info updated successfully"})
        else:
            return Response({"message": "Failed", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class DeleteEmployeeView(generics.DestroyAPIView):
    queryset = Employee.objects.all()
    permission_classes = [IsAdminPermission]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Employee deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
