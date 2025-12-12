from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('admin/dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('trainer/dashboard/', views.trainer_dashboard, name='trainer_dashboard'),
    path('student/dashboard/', views.student_dashboard, name='student_dashboard'),
    path('trainer/my-assignments/', views.trainer_my_assignments, name='trainer_my_assignments'),
    path('student/my-assignments/', views.student_my_assignments, name='student_my_assignments'),

    # API endpoints
    path('api/students/', views.api_students, name='api_students'),
    path('api/trainers/', views.api_trainers, name='api_trainers'),
    path('api/courses/', views.api_courses, name='api_courses'),
    path('api/assignments/', views.api_assignments, name='api_assignments'),
    path('api/assignments/create/', views.create_assignment, name='create_assignment'),
    path('api/materials/', views.api_materials, name='api_materials'),
    path('api/live-classes/', views.api_live_classes, name='api_live_classes'),
    path('api/recorded-classes/', views.api_recorded_classes, name='api_recorded_classes'),
    path('api/attendance/', views.api_attendance, name='api_attendance'),
]
