from rest_framework import serializers
from .models import Comments, Likes, User, Email_list, Post, Follow


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email_list
        fields = "__all__"


class SendPostSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='username.username')
    profilePicture = serializers.ImageField(source='username.image')

    class Meta:
        model = Post
        fields = ('id', 'media', 'caption', 'post_likes','uploaded_date', 'username', 'profilePicture')


class UploadPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('media', 'caption', 'username')


class SendProfilePictureSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('image',)


class SendProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='username.username')
    bio = serializers.ReadOnlyField(source='username.bio')
    profilePicture = serializers.ImageField(source='username.image')
    following = serializers.ReadOnlyField(source='username.following')
    followers = serializers.ReadOnlyField(source='username.followers')
    # media = str(serializers.ListField())

    class Meta:
        model = Post
        fields = ('username', 'bio' ,'following','followers', 'profilePicture')

class MediaSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='username.username')
    profilePicture = serializers.ImageField(source='username.image')

    class Meta:
        model = Post
        fields =('id','media','caption','post_likes','comment','uploaded_date','username','profilePicture')

class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comments
        fields=('user','post','comment')

class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Likes
        fields = '__all__'

class SearchUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id','image')

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'