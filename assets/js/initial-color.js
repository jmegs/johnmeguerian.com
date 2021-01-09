function getInitialTheme() {
    // did they already set it?
    let hasStoredPref = localStorage.getItem('theme')
    if (hasStoredPref) return hasStoredPref
    
    // does their browser tell us?
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference) return mql.matches ? 'dark' : 'light';

    // if not, oh well.
    return 'light'
  }

  function setInitialTheme() {
    // figure out what the theme should be
    let theme = getInitialTheme()

    // tell the site
    document.documentElement.dataset.theme = theme

    // tell localstorage
    localStorage.setItem('theme', theme)
  }

  // do it before the site loads
  setInitialTheme()