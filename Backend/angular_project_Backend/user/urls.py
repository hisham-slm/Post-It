from django.urls import path
from . import views

app_name = 'user'


urlpatterns = [
    path('login',views.login),
    path('signup',views.signup),
    path('email_list',views.add_to_email_list),
    path('post',views.upload_post),
    path('get_post',views.view_posts),
    path('get_profile_picture/<int:id>',views.SendProfilePicture),
    path('profile/<int:id>',views.show_profile),
    path('profile/<str:username>',views.send_user_profile),
    path('addcomment',views.addcomment),
    path('likepost/<int:userId>/<int:postId>',views.like_post),
    path('search/<str:search_key>', views.search_profile),
    path('follow', views.follow),
    path('delete_post', views.delete_post)
]