# Generated by Django 3.2.8 on 2022-03-02 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sitewide_alert', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sitewidealertsettings',
            name='background_colour',
            field=models.CharField(blank=True, help_text='Background RGB value. e.g. <code>fd5765</code>', max_length=6),
        ),
        migrations.AddField(
            model_name='sitewidealertsettings',
            name='text_colour',
            field=models.CharField(blank=True, help_text='Text colour RGB value. e.g. <code>ffffff</code>', max_length=6),
        ),
    ]
