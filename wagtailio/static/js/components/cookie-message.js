import Cookies from 'js-cookie';

class CookieMessage {
    static selector() {
        return '[data-cookie-message]';
    }

    constructor(node) {
        this.messageContainer = node;
        this.optInButton = this.messageContainer.querySelector(
            '[data-cookie-opt-in]',
        );
        this.optOutButton = this.messageContainer.querySelector(
            '[data-cookie-opt-out]',
        );
        this.cookieName = 'wagtail_cookie';
        this.cookieDuration = 365;
        this.activeClass = 'active';
        this.inactiveClass = 'inactive';

        this.checkCookie();
        this.bindEvents();
    }

    checkCookie() {
        if (!this.messageContainer) {
            return;
        }

        // If cookie doesn't exist
        if (!Cookies.get(this.cookieName)) {
            this.messageContainer.classList.add(this.activeClass);
            this.watchHeight();
        }
    }

    // The banner is sticky at the bottom of the viewport. Keep the page's
    // scroll padding equal to its height so that focusing a link scrolls it
    // clear of the banner, rather than leaving it hidden underneath.
    updateScrollPadding() {
        const root = document.documentElement;

        if (!this.messageContainer.classList.contains(this.activeClass)) {
            root.style.removeProperty('scroll-padding-bottom');
            return;
        }

        const { marginBottom } = getComputedStyle(this.messageContainer);
        const height =
            this.messageContainer.offsetHeight + parseFloat(marginBottom);
        root.style.scrollPaddingBottom = `${height}px`;
    }

    // The banner's height changes when its text wraps, so keep the padding in sync.
    watchHeight() {
        this.updateScrollPadding();

        if ('ResizeObserver' in window) {
            this.resizeObserver = new ResizeObserver(() =>
                this.updateScrollPadding(),
            );
            this.resizeObserver.observe(this.messageContainer);
        }
    }

    applyCookie(event, cookieValue) {
        // prevent default link action
        event.preventDefault();
        // Add classes
        this.messageContainer.classList.remove(this.activeClass);
        this.messageContainer.classList.add(this.inactiveClass);
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        this.updateScrollPadding();
        // Set cookie
        Cookies.set(this.cookieName, cookieValue, {
            expires: this.cookieDuration,
        });
    
    }

    bindEvents() {
        if (!this.optInButton) {
            return;
        }

        this.optInButton.addEventListener('click', (event) => {
            this.applyCookie(event, true);
        });

        this.optOutButton.addEventListener('click', (event) =>
            this.applyCookie(event, false),
        );
    }
}

export default CookieMessage;