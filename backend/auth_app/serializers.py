from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from backend.auth_app.models import Profile, OpportunityMachineUser, CityOffice, Role
import django.contrib.auth.password_validation as validators
from django.core import exceptions

UserModel = get_user_model()


class ProfileSerializerManagers(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = Profile
        fields = ('city_office', 'role_description', 'managing_city_offices', 'user', 'user_email')


class ProfileSerializerForRegister(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('first_name', 'last_name', 'phone', 'photo_url', 'city_office',
                  'manager', 'is_manager', 'role_type', 'role_description', 'managing_city_offices')


class OfficeCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = CityOffice
        fields = ('id', 'name', 'is_deleted')


class UserCreateSerializer(serializers.ModelSerializer):
    profile = ProfileSerializerForRegister(required=True)

    class Meta:
        model = UserModel
        fields = (UserModel.USERNAME_FIELD, 'password', 'profile')

    def create(self, validated_data):
        # fix1 issue with password in plain text
        if validated_data['profile']['role_type'].name == "Operations":
            user = OpportunityMachineUser.objects.create(
                email=validated_data['email'],
                password=make_password(validated_data['password']),
                is_staff=True
            )
        else:
            user = OpportunityMachineUser.objects.create(
                email=validated_data['email'],
                password=make_password(validated_data['password']),
            )

        profile_data = validated_data.pop('profile')

        profile = Profile.objects.create(
            first_name=profile_data['first_name'],
            last_name=profile_data['last_name'],
            phone=profile_data['phone'],
            photo_url=profile_data['photo_url'],
            city_office=profile_data['city_office'],
            manager=profile_data['manager'],
            is_manager=profile_data['is_manager'],
            role_type=profile_data['role_type'],
            role_description=profile_data['role_description'],
            user=user,
        )

        city_offices_list = profile_data['managing_city_offices']

        for city_office in city_offices_list:
                profile.managing_city_offices.add(city_office)

        return user

    def validate(self, data):
        user = self.context['request'].user

        password = data.get('password')

        errors = dict()
        try:
            validators.validate_password(password=password, user=user)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

            if errors:
                raise serializers.ValidationError(errors)

        return super(UserCreateSerializer, self).validate(data)

    # fix2 issue with password in plain text - remove password from return
    def to_representation(self, instance):
        result = super().to_representation(instance)
        result.pop('password')
        return result


class ProfileForDetailsSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = Profile
        fields = ('first_name', 'last_name', 'phone', 'photo_url', 'city_office',
                  'manager', 'is_manager', 'role_type', 'role_description', 'managing_city_offices', 'is_deleted', 'user',
                  'user_email')
        depth = 1

# add user in validate data ( even if it's not in meta-fields ( for creation of new ticket with user)
#     def create(self, validated_data):
#         validated_data['user'] = self.context['request'].user
#         return super().create(validated_data)


class ProfileForUpdateSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source='user.email')
    # managing_city_offices = OfficeCitySerializer(required=True, many=True)

    class Meta:
        model = Profile
        fields = ('first_name', 'last_name', 'phone', 'photo_url', 'city_office',
                  'manager', 'is_manager', 'role_type', 'role_description', 'managing_city_offices', 'is_deleted', 'user',
                  'user_email')

    def update(self, instance, validated_data):
        city_offices_list = validated_data.pop('managing_city_offices')
        instance = super().update(instance, validated_data)

        instance.save()

        for old_city in instance.managing_city_offices.all():
            instance.managing_city_offices.remove(old_city)

        for new_city in city_offices_list:
            instance.managing_city_offices.add(new_city)

        return instance


class RoleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'name', 'is_deleted')
