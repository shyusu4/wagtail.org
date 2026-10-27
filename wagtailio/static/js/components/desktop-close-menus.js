// Adds "close" functionality for all DesktopSubMenus at once.
// It's a separate class because it captures events outside those components.

import DesktopSubMenu from './desktop-sub-menu';

class DesktopCloseMenus {
    constructor() {
        this.desktopSubMenus = document.querySelectorAll(
            DesktopSubMenu.selector(),
        );
        this.allPrimaryNavs = document.querySelectorAll(
            '[data-desktop-menu] [data-primary-nav]',
        );
        this.bindEvents();
    }

    // Close desktop menus when clicking on document
    closeMenus(e) {
        let close = true;

        this.allPrimaryNavs.forEach((item) => {
            if (e && item.contains(e.target)) {
                // don't close the menus if we are clicking anywhere on the primary navigation
                close = false;
            }
        });

        if (close) {
            this.desktopSubMenus.forEach((item) => {
                item.closest('[data-has-subnav]').classList.remove('active');
                item.setAttribute('aria-expanded', 'false');
            });
        }
    }

    bindEvents() {
        if (this.desktopSubMenus && this.desktopSubMenus.length !== 0) {
            document.addEventListener('touchstart', (e) => {
                this.closeMenus(e);
            });

            document.addEventListener('click', (e) => {
                this.closeMenus(e);
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // If focus is inside an open submenu, hand it back to that
                // submenu's trigger so it isn't lost when the menu hides.
                const openTrigger = Array.from(this.desktopSubMenus).find(
                    (item) =>
                        item.getAttribute('aria-expanded') === 'true' &&
                        item
                            .closest('[data-has-subnav]')
                            .contains(document.activeElement),
                );
                this.closeMenus();
                if (openTrigger) openTrigger.focus();
            };
        });
    }
}

export default DesktopCloseMenus;
