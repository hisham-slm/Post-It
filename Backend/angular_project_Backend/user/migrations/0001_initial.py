# Generated by Django 4.1.5 on 2023-06-05 04:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100)),
                ('password', models.CharField(max_length=20)),
                ('bio', models.CharField(max_length=500)),
                ('image', models.ImageField(upload_to='user/')),
            ],
            options={
                'db_table': 'user_table',
            },
        ),
    ]
