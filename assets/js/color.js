document.querySelector(".themeswitch").addEventListener("click", onChange);

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", onPreferenceChange);

function onChange() {
    // if this is the first time clicking the theme button
    // note that they actually chose a preference
    if (!theme.hasPreference) {
        theme.hasPreference = true;
    }

    // temporarily disable css transitions so it's snappy
    // https://paco.sh/blog/disable-theme-transitions
    const css = document.createElement("style");
    css.type = "text/css";
    css.appendChild(
        document.createTextNode(
            `* {
           -webkit-transition: none !important;
           -moz-transition: none !important;
           -o-transition: none !important;
           -ms-transition: none !important;
           transition: none !important;
        }`
        )
    );
    document.head.appendChild(css);

    // set the next theme
    theme.toggle();

    // re-enable transitions
    // calling getComputedStyle forces the browser to redraw
    const _ = window.getComputedStyle(css).opacity;
    document.head.removeChild(css);
}

function onPreferenceChange(event) {
    // so the system preference just changed...
    // if they have already manually selected a theme
    // don't change it on them when the OS changes
    if (theme.hasPreference) return;

    // otherwise, update the theme for them
    if (event.matches) {
        theme.current = "dark";
    } else {
        theme.current = "light";
    }
}

const theme = {
    themes: ["light", "dark"],

    get current() {
        return document.documentElement.dataset.theme;
    },

    set current(val) {
        if (!this.themes.includes(val)) return;
        localStorage.setItem("theme", val);
        document.documentElement.dataset.theme = val;
    },

    get hasPreference() {
        return localStorage.getItem("has-theme-preference");
    },

    set hasPreference(val) {
        localStorage.setItem("has-theme-preference", val);
    },

    toggle() {
        let currIndex = this.themes.indexOf(this.current);
        let max = this.themes.length - 1
        let next = currIndex + 1 > max ? 0 : currIndex + 1;
        this.current = this.themes[next];
    },
};
