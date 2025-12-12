"""
URL configuration for lms_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import render
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from accounts.views import student_dashboard, student_my_courses, student_my_assignments, student_materials, student_recorded_classes, student_live_classes, student_settings, student_assignment_details, student_course_details, student_my_attendance, admin_dashboard, trainer_my_assignments

def index_view(request):
    return render(request, 'index.html')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index_view, name='index'),
    path('login.html', TemplateView.as_view(template_name='login.html'), name='login_page'),
    path('about.html', TemplateView.as_view(template_name='about.html'), name='about_page'),
    path('register.html', TemplateView.as_view(template_name='register.html'), name='register_page'),
    path('reset.html', TemplateView.as_view(template_name='reset.html'), name='reset_page'),
    path('trainer/trainer-login.html', TemplateView.as_view(template_name='trainer/trainer-login.html'), name='trainer_login'),
    path('trainer-login.html', TemplateView.as_view(template_name='trainer/trainer-login.html'), name='trainer_login_short'),
    path('student/student-login.html', TemplateView.as_view(template_name='student/student-login.html'), name='student_login'),
    path('student/student-register.html', TemplateView.as_view(template_name='student/student-register.html'), name='student_register'),
    path('student/dashboard.html', student_dashboard, name='student_dashboard_html'),
    path('student/my-courses.html', student_my_courses, name='student_my_courses_html'),
    path('student/my-assignments.html', student_my_assignments, name='student_my_assignments_html'),
    path('student/materials.html', student_materials, name='student_materials_html'),
    path('student/recorded-classes.html', student_recorded_classes, name='student_recorded_classes_html'),
    path('student/live-classes.html', student_live_classes, name='student_live_classes_html'),
    path('student/settings.html', student_settings, name='student_settings_html'),
    path('student/assignment-details.html', student_assignment_details, name='student_assignment_details_html'),
    path('student/course-details.html', student_course_details, name='student_course_details_html'),
    path('student/my-attendance.html', student_my_attendance, name='student_my_attendance_html'),
    path('trainer/my-courses.html', TemplateView.as_view(template_name='trainer/my-courses.html'), name='trainer_my_courses_static'),
    path('trainer/my-assignments.html', trainer_my_assignments, name='trainer_my_assignments_static'),
    path('trainer/my-attendance.html', TemplateView.as_view(template_name='trainer/my-attendance.html'), name='trainer_my_attendance_static'),
    path('trainer/my-students.html', TemplateView.as_view(template_name='trainer/my-students.html'), name='trainer_my_students_static'),
    path('trainer/materials.html', TemplateView.as_view(template_name='trainer/materials.html'), name='trainer_materials_static'),
    path('trainer/live-classes.html', TemplateView.as_view(template_name='trainer/live-classes.html'), name='trainer_live_classes_static'),
    path('trainer/recorded-classes.html', TemplateView.as_view(template_name='trainer/recorded-classes.html'), name='trainer_recorded_classes_static'),
    path('trainer/settings.html', TemplateView.as_view(template_name='trainer/settings.html'), name='trainer_settings_static'),
    path('trainer/course-details.html', TemplateView.as_view(template_name='trainer/course-details.html'), name='trainer_course_details_static'),
    path('trainer/student-details.html', TemplateView.as_view(template_name='trainer/student-details.html'), name='trainer_student_details_static'),
    path('trainer/assignment-details.html', TemplateView.as_view(template_name='trainer/assignment-details.html'), name='trainer_assignment_details_static'),
    path('admin/dashboard.html', admin_dashboard, name='admin_dashboard_static'),
    path('trainer/dashboard.html', TemplateView.as_view(template_name='trainer/dashboard.html'), name='trainer_dashboard_static'),
    path('', include('accounts.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0] if settings.STATICFILES_DIRS else None)
