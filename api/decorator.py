from django.contrib.auth.decorators import login_required, user_passes_test
from django.shortcuts import render

# View to check if a user is authorized
def is_employee(user):
    return user.is_authenticated and user.is_employee

@login_required  # Requires user to be logged in
@user_passes_test(is_employee)  # Requires user to pass the "is_employee" test
def employee_data_view(request):
    # Your view logic for employee data here
    return render(request, 'frontend/index.html')
