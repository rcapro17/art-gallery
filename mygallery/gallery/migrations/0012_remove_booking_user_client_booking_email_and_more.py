# Generated by Django 4.2.4 on 2024-08-30 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0011_alter_purchase_user_client'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='user_client',
        ),
        migrations.AddField(
            model_name='booking',
            name='email',
            field=models.EmailField(default='default@example.com', max_length=254),
        ),
        migrations.AddField(
            model_name='booking',
            name='name',
            field=models.CharField(default='Default Name', max_length=255),
        ),
        migrations.AlterField(
            model_name='booking',
            name='message',
            field=models.TextField(null=True),
        ),
    ]
