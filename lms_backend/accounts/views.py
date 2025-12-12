from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json

# Authentication views
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('admin_dashboard')
        else:
            messages.error(request, 'Invalid credentials')
    return render(request, 'login.html')

def register_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        role = request.POST.get('role')

        if not all([username, email, password, role]):
            return JsonResponse({'success': False, 'error': 'All fields are required'})

        if role not in ['admin', 'trainer']:
            return JsonResponse({'success': False, 'error': 'Invalid role'})

        try:
            from .models import User
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                role=role
            )
            user.is_staff = (role == 'admin')
            user.save()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})

    return render(request, 'register.html')

def logout_view(request):
    logout(request)
    return redirect('index')

# Dashboard views
def admin_dashboard(request):
    if not request.user.is_authenticated:
        return redirect('login')
    if not request.user.is_staff:
        return redirect('index')
    return render(request, 'admin/dashboard.html')

def trainer_dashboard(request):
    return render(request, 'trainer/dashboard.html')

def trainer_my_assignments(request):
    from .models import Assignment
    assignments = Assignment.objects.all()
    return render(request, 'trainer/my-assignments.html', {'assignments': assignments})

def student_dashboard(request):
    return render(request, 'student/dashboard.html')

def student_my_courses(request):
    return render(request, 'student/my-courses.html')

def student_my_assignments(request):
    from .models import Assignment
    assignments = Assignment.objects.all()
    return render(request, 'student/my-assignments.html', {'assignments': assignments})

def student_materials(request):
    return render(request, 'student/materials.html')

def student_recorded_classes(request):
    return render(request, 'student/recorded-classes.html')

def student_live_classes(request):
    return render(request, 'student/live-classes.html')

def student_settings(request):
    return render(request, 'student/settings.html')

def student_assignment_details(request):
    return render(request, 'student/assignment-details.html')

def student_course_details(request):
    return render(request, 'student/course-details.html')

def student_my_attendance(request):
    return render(request, 'student/my-attendance.html')

# API views
def api_students(request):
    # Mock data
    students = [
        {'id': 1, 'name': 'John Doe', 'email': 'john@example.com'},
        {'id': 2, 'name': 'Jane Smith', 'email': 'jane@example.com'},
    ]
    return JsonResponse(students, safe=False)

def api_trainers(request):
    trainers = [
        {'id': 1, 'name': 'Trainer One', 'email': 'trainer1@example.com'},
        {'id': 2, 'name': 'Trainer Two', 'email': 'trainer2@example.com'},
    ]
    return JsonResponse(trainers, safe=False)

def api_courses(request):
    courses = [
        {'id': 1, 'name': 'Python Basics', 'trainer': 'Trainer One'},
        {'id': 2, 'name': 'Django Advanced', 'trainer': 'Trainer Two'},
    ]
    return JsonResponse(courses, safe=False)

def api_assignments(request):
    from .models import Assignment
    assignments = list(Assignment.objects.values('id', 'title', 'course__title', 'due_date', 'status'))
    return JsonResponse(assignments, safe=False)

@csrf_exempt
def create_assignment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        title = data.get('title')
        course_title = data.get('course')
        due_date = data.get('due_date')
        status = data.get('status', 'pending')

        from .models import Course, Assignment
        try:
            course = Course.objects.get(title=course_title)
            assignment = Assignment.objects.create(
                title=title,
                course=course,
                due_date=due_date,
                status=status
            )
            return JsonResponse({'success': True, 'id': assignment.id})
        except Course.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Course not found'})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    return JsonResponse({'success': False, 'error': 'Invalid method'})

def api_materials(request):
    materials = [
        {'id': 1, 'title': 'Material 1', 'course': 'Python Basics'},
    ]
    return JsonResponse(materials, safe=False)

def api_live_classes(request):
    classes = [
        {'id': 1, 'title': 'Live Class 1', 'time': '10:00 AM'},
    ]
    return JsonResponse(classes, safe=False)

def api_recorded_classes(request):
    classes = [
        {'id': 1, 'title': 'Recorded Class 1', 'url': 'https://example.com'},
    ]
    return JsonResponse(classes, safe=False)

def api_attendance(request):
    attendance = [
        {'id': 1, 'student': 'John Doe', 'status': 'Present'},
    ]
    return JsonResponse(attendance, safe=False)
