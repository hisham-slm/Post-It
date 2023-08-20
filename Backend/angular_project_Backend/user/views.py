from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from .models import Likes, Post, User, Follow
from .serializer import CommentSerializer, FollowSerializer, LikeSerializer, MediaSerializer, SearchUserSerializer, SendPostSerializer, SendProfilePictureSerializer, SendProfileSerializer, UserSerializer, EmailSerializer, UploadPostSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from datetime import datetime
from rest_framework.filters import SearchFilter, OrderingFilter
# Create your views here.


@api_view(['POST'])
def login(request):
    params = request.data
    username = params['username']
    password = params['password']
    print('in login view')
    try:
        msg = ''
        statusCode = 0
        token = ''
        userId = 0
        try:
            user = User.objects.get(username=username, password=password)
            statusCode = 201
            userId = user.id
            print(userId)
            msg = "Success"
            token = username

        except:
            statusCode = 401
            msg = 'Wrong Username or Password'
            token = ''
            userId = False

    except Exception as e:
        statusCode = 404
        msg = 'Something Went Wrong'
        token = ''
        userId = False
    return JsonResponse({'statusCode': statusCode, 'msg': msg, 'token': token, 'userId': userId})


@api_view(['POST'])
def signup(request):
    msg = ''

    try:
        params = request.data
        users = User.objects.values_list('username', flat=True)
        emails = User.objects.values_list('email', flat=True)
        username = params['username']
        user_email = params['email']
        print(params)
        if username in users or user_email in emails:
            print('username in use')
            statusCode = 000
            msg = 'username or email already in use'
            userId = False

        else:
            user_data = UserSerializer(data=params)
            if user_data.is_valid():
                user_data.save()
                msg = 'Succesfully created your account!'
                statusCode = 204
                userId = User.objects.get(username=username).id
            else:
                msg = "Form Error!"
                statusCode = 403
    except:
        msg = "Something Went Wrong"
        statusCode = 505

    return JsonResponse({'statusCode': statusCode, 'msg': msg, 'userId': userId})


@api_view(['POST'])
def add_to_email_list(request):
    msg = ''
    params = request.data
    email_address = params['emailId']
    users = User.objects.values_list('email', flat=True)
    serialized_data = EmailSerializer(data=params)

    try:

        if email_address in users:

            if serialized_data.is_valid():
                serialized_data.save()
                msg = 'Succesfully added!'
                statusCode = 204
            else:
                msg = "Form Error!"
                statusCode = 403
        else:
            msg = "You haven't signed up yet"
            statusCode = 401
    except Exception as e:
        msg = "Something Went Wrong"
        statusCode = 505
        print(str(e))

    return JsonResponse({'statusCode': statusCode, 'msg': msg})


@api_view(['POST'])
def upload_post(request):
    params = request.data
    print(params)
    media = params['media']
    username_id = params['username']
    caption = params['caption']

    statusCode = 0
    msg = ''
    userId = username_id
    serialized_data = UploadPostSerializer(data=params)

    # try:
    if serialized_data.is_valid():
        serialized_data.save()
        msg = 'Succesfully Posted!'
        statusCode = 204
        userId = username_id

    else:
        msg = "Form Error!"
        statusCode = 403
        userId = username_id
        print(serialized_data.errors)
    # except:
    #     msg = "Something Went Wrong"
    #     statusCode = 505

    return JsonResponse({'statusCode': statusCode, 'msg': msg, 'userId': userId})


@api_view(['GET'])
def view_posts(request):
    posts = Post.objects.all()
    serializer = SendPostSerializer(posts, many=True)

    statusCode = 200
    msg = 'OK'
    return JsonResponse({'msg': msg, 'statusCode': statusCode, 'data': serializer.data})


@api_view(['POST'])
def SendProfilePicture(request, id):
    user = User.objects.filter(id=id).first()
    profilePicture = str(user.image)

    data = {'image': profilePicture}

    return JsonResponse({'profilePicture': data})


@api_view(['GET'])
def show_profile(request, id):
    user = User.objects.filter(id=id).first()
    post_count = Post.objects.filter(username=user).count()

    if user is not None:
        posts = Post.objects.filter(username=user)
        medias = Post.objects.filter(username=user)
        profile_data = SendProfileSerializer(posts, many=True)
        media_serializer = MediaSerializer(medias, many=True)
        username = user.username
        profilePicture = user.image

        statusCode = 200
        msg = 'OK'

        return JsonResponse({'msg': msg, 'statusCode': statusCode, 'profileData': profile_data.data[0], 'mediaData': media_serializer.data, 'postCount': post_count})

    else:
        statusCode = 404
        msg = 'User not found'
        return JsonResponse({'msg': msg, 'statusCode': statusCode})


@api_view(['POST'])
def addcomment(request):
    msg = ''
    statusCode = 0
    params = request.data

    serialized_comment = CommentSerializer(data=params)
    if serialized_comment.is_valid():
        serialized_comment.save()
        msg = "Succesfully Added"
        statusCode = 204
    else:
        print(serialized_comment.errors)
        msg = 'Something Went Wrong'
        statusCode = 403

    return JsonResponse({'msg': msg, 'statusCode': statusCode})


@api_view(['POST'])
def like_post(request, userId, postId):
    user_id = userId
    post_id = postId
    msg = ''
    statusCode = 0

    previosly_liked_users = Likes.objects.filter(user=user_id, post_id=post_id).exists()
    post = Post.objects.get(id=post_id)

    if previosly_liked_users == True:
        print(post)
        post.post_likes = post.post_likes - 1
        Likes.objects.get(post=post_id, user=user_id).delete()
        post.save()
        msg = "Disliked The Post"
        statusCode = 410

    else:
        serialized_data = LikeSerializer(
            data={'user': user_id, 'post': post_id})

        if serialized_data.is_valid():
            serialized_data.save()
            post.post_likes = post.post_likes + 1
            post.save()

            msg = "Successfully Liked"
            statusCode = 204
        else:
            print(serialized_data.errors)
            msg = "Something Went Wrong"
            statusCode = 404

    return JsonResponse({'msg': msg, 'statusCode': statusCode})


@api_view(['GET'])
def send_user_profile(request, username):
    user = User.objects.filter(username=username).first()
    post_count = Post.objects.filter(username=user).count()

    if user is not None:
        posts = Post.objects.filter(username=user)
        medias = Post.objects.filter(username=user)
        profile_data = SendProfileSerializer(posts, many=True)
        media_serializer = MediaSerializer(medias, many=True)
        username = user.username
        profilePicture = user.image

        statusCode = 200
        msg = 'OK'

        return JsonResponse({'msg': msg, 'statusCode': statusCode, 'profileData': profile_data.data[0], 'mediaData': media_serializer.data, 'postCount': post_count})

    else:
        statusCode = 404
        msg = 'User not found'
        return JsonResponse({'msg': msg, 'statusCode': statusCode})


@api_view(["GET"])
def search_profile(request, search_key):
    msg = ''
    statusCode = 0
    data = []

    try:

        users = User.objects.filter(username__contains=search_key)
        if users.exists():
            for users in users:
                serialized_data = SearchUserSerializer(users)

                user = {'username': users.username,
                        'profilePicture': str(users.image)}
                data.append(user)
                msg = 'User found'
                statusCode = 302
        else:
            msg = 'No User Found'
            statusCode = 404

    except KeyError:
        msg = 'Something Went Wrong'
        statusCode = 400

    return JsonResponse({'msg': msg, 'data': data, 'statusCode': statusCode})



@api_view(['POST'])
def follow(request):
    msg = ''
    statusCode = 0
    try:
        params = request.data

        follower = params['follower']
        following = params['following']

        user_following = User.objects.get(username=following)
        user_follower = User.objects.get(username=follower)


        following_list = Follow.objects.filter(following=user_following).exists()

        print(following_list, user_following.username)
        
        if following_list == False:
            serialized_data = FollowSerializer(data = {'following' : user_following.id, 'follower': user_follower.id})


            if serialized_data.is_valid():
                user_following.followers += 1
                user_following.save()

                serialized_data.save()

                user_follower.following += 1
                user_follower.save()

                msg = 'Followed'
                statusCode = 200
            else:
                print(serialized_data.errors)
                msg = 'Invalid data'
                statusCode = 400
        else:

            user_follower.followers -= 1
            user_follower.save()

            user_following.following -= 1
            user_following.save()

            Follow.objects.filter(following=user_following).delete()

            msg = 'unfollowed'
            statusCode = 403
    except Exception as e:


        msg = 'Something went wrong'
        print('the error is ',e)
        statusCode = 500

    return JsonResponse({'statusCode': statusCode , 'msg': msg})


@api_view(['POST'])
def delete_post(request):
    post_id = request.data

    post = Post.objects.get(id = post_id)
    post.delete()
    
    print(Post.objects.filter(id = post_id).exists())
    

    return JsonResponse({'msg' : 'yea'})

    