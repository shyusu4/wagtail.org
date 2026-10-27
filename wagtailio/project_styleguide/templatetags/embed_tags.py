import re

from django import template
from django.utils.html import conditional_escape
from django.utils.safestring import mark_safe

register = template.Library()

# Matches an opening <iframe> tag that has no title attribute.
IFRAME_WITHOUT_TITLE = re.compile(r"<iframe\b(?![^>]*\stitle\s*=)", re.IGNORECASE)


@register.filter
def add_iframe_title(html, title):
    """Add a title to any <iframe> in the embed HTML that doesn't have one.

    Providers such as YouTube return iframes without a title, which leaves
    them with no accessible name.
    """
    if not html:
        return html
    return mark_safe(
        IFRAME_WITHOUT_TITLE.sub(f'<iframe title="{conditional_escape(title)}"', str(html))
    )
