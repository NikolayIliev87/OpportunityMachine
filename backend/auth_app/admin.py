from django.contrib import admin

from backend.auth_app.models import OpportunityMachineUser, Profile, CityOffice, Role


@admin.register(OpportunityMachineUser)
class OpportunityMachineUserAdmin(admin.ModelAdmin):
    pass


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')
    pass


@admin.register(CityOffice)
class CityOfficeAdmin(admin.ModelAdmin):
    pass


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    pass
