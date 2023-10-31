from django.urls import path
from .viewsFolder.employeeView import EmployeeView, CreateEmployeeView, DeleteEmployeeView, UpdateEmployeeView
from .viewsFolder.companyView import CompanyView, CreateCompanyView, UpdateCompanyView, DeleteCompanyView
from .viewsFolder.userView import LoginUserView, RegisterUserView, LogoutUserView, GetLoggedInUserView

urlpatterns = [    
    path('sessionData', GetLoggedInUserView.as_view()),

    path("login", LoginUserView.as_view()),
    path("register", RegisterUserView.as_view()),
    path("logout", LogoutUserView.as_view()),

    path('getAllEmployees', EmployeeView.as_view()),
    path('createEmployee', CreateEmployeeView.as_view()),
    path('deleteEmployee/<int:pk>/', DeleteEmployeeView.as_view()),
    path('updateEmployee/<int:pk>/', UpdateEmployeeView.as_view()),

    path('getAllCompanies', CompanyView.as_view()),
    path('createCompany', CreateCompanyView.as_view()),
    path('updateCompany/<int:pk>/', UpdateCompanyView.as_view()),
    path('deleteCompany/<int:pk>/', DeleteCompanyView.as_view()),
]