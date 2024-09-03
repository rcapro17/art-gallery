# Generated by Django 4.2.4 on 2024-08-29 13:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0005_booking_message'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='item',
        ),
        migrations.AlterField(
            model_name='booking',
            name='user_client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gallery.userclient'),
        ),
    ]