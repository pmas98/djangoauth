from rest_framework import serializers
from .models import Employee, Company, User

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'name', 'department', 'email', 'birthday', 'admissionDate', 'vacanciesDate', 'exitDate' , 'isAdmin' ,'createdAt')

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('id', 'name', 'cnpj', 'address', 'email', 'sector' ,'createdAt')

class AddEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('name', 'department', 'email', 'birthday', 'admissionDate')

class ChangeEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('name', 'department', 'email', 'birthday', 'admissionDate', 'exitDate', 'vacanciesDate')

class AddCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('name', 'cnpj', 'address', 'email', 'sector', 'logo')

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'is_active', 'is_staff')


    def create(self, validated_data):
        # Create and return a new user instance based on the validated data
        user = User(
            username=validated_data.get('username'),
            email=validated_data.get('email'),
            is_active=validated_data.get('is_active'),
            is_staff=validated_data.get('is_staff')
        )

        # Set the password (hashed) for the user
        user.set_password(validated_data['password'])

        # Save the user to the database
        user.save()
        return user