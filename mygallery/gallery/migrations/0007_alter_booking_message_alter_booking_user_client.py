# Generated by Django 4.2.4 on 2024-08-29 14:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gallery', '0006_remove_booking_item_alter_booking_user_client'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='message',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='booking',
            name='user_client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
