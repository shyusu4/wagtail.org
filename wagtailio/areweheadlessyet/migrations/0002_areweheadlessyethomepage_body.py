# Generated by Django 3.2.8 on 2022-01-19 13:25

import wagtail.core.blocks
import wagtail.core.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("areweheadlessyet", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="areweheadlessyethomepage",
            name="body",
            field=wagtail.core.fields.StreamField(
                [
                    (
                        "section",
                        wagtail.core.blocks.StructBlock(
                            [
                                ("title", wagtail.core.blocks.CharBlock()),
                                (
                                    "content",
                                    wagtail.core.blocks.StreamBlock(
                                        [
                                            (
                                                "text",
                                                wagtail.core.blocks.RichTextBlock(),
                                            ),
                                            (
                                                "link_group",
                                                wagtail.core.blocks.StreamBlock(
                                                    [
                                                        (
                                                            "link",
                                                            wagtail.core.blocks.StructBlock(
                                                                [
                                                                    (
                                                                        "link",
                                                                        wagtail.core.blocks.URLBlock(
                                                                            required=True
                                                                        ),
                                                                    ),
                                                                    (
                                                                        "link_text",
                                                                        wagtail.core.blocks.CharBlock(
                                                                            required=True
                                                                        ),
                                                                    ),
                                                                ]
                                                            ),
                                                        )
                                                    ]
                                                ),
                                            ),
                                        ]
                                    ),
                                ),
                            ]
                        ),
                    )
                ]
            ),
        ),
    ]
