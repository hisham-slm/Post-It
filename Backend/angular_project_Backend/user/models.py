import django
from django.db import models
from datetime import datetime

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=20)
    bio = models.CharField(max_length=500)
    image = models.ImageField(upload_to='user/media/profilePictures',default='user/media/ProfilePicture/default_PP.png')
    following = models.IntegerField(default= 0)
    followers = models.IntegerField(default= 0)

    class Meta:
        db_table = 'user_table'

class Email_list(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    class Meta:
        db_table = 'email_list'

class Post(models.Model):
    username =  models.ForeignKey(User, on_delete=models.CASCADE)
    media = models.ImageField(upload_to='user/media/posts')
    caption = models.CharField(max_length=500)
    post_likes = models.IntegerField(null= True ,default = 0)
    comment = models.CharField(max_length=500 , null= True)
    uploaded_date = models.DateField(default= django.utils.timezone.now)

    class Meta:
        db_table = 'posts'

class Comments(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    comment = models.TextField(max_length=5000, null= True)

    class Meta:
        db_table = 'comments'

class Likes(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    post = models.ForeignKey(Post,on_delete=models.CASCADE)

    class Meta:
        db_table = 'likes'

class Follow(models.Model):
    follower = models.ForeignKey(User, related_name='following_set', on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name='followers_set', on_delete=models.CASCADE)

    class Meta:
        db_table = 'follow'
        unique_together = ('follower', 'following')