from django.urls import path
from .views import index
from django.contrib.auth.decorators import login_required
from .decorator import staff_required

urlpatterns = [
    path('', index),
    path('register', index),
    path('home', index),
    path('logout', index),
    path('employeeData', login_required(index)),
    path('addEmployee', staff_required(index)), 
    path('addCompany', staff_required(index)),  
    path('timeline', login_required(index)),
]
