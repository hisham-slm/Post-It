# Generated by Django 4.1.5 on 2023-06-19 06:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_user_image_post'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='likes',
            field=models.IntegerField(null=True),
        ),
    ]