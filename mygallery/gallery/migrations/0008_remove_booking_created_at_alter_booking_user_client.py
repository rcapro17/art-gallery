# Generated by Django 4.2.4 on 2024-08-29 18:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0007_alter_booking_message_alter_booking_user_client'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='created_at',
        ),
        migrations.AlterField(
            model_name='booking',
            name='user_client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gallery.userclient'),
        ),
    ]
