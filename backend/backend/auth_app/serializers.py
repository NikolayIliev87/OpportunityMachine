from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from backend.auth_app.models import Profile, OpportunityMachineUser
import django.contrib.auth.password_validation as validators
from django.core import exceptions

UserModel = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('first_name', 'last_name', 'phone', 'photo_url')


class UserCreateSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)

    class Meta:
        model = UserModel
        fields = (UserModel.USERNAME_FIELD, 'password', 'profile', )

    def create(self, validated_data):
        # fix1 issue with password in plain text
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
            user=user,
        )

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
