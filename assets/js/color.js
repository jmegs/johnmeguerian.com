init()

function getTheme() {
  return document.documentElement.dataset.theme
}

function setTheme(theme) {
  localStorage.setItem('theme', theme)
  document.documentElement.dataset.theme = theme
  return theme
}

function setUserPreference() {
  localStorage.setItem('has-theme-preference', true)
}

function hasUserPreference() {
  return localStorage.getItem('has-theme-preference')
}

function onPreferenceChange(event) {
  // if they have manually selected a theme
  // don't change it on them if the OS changes
  if (hasUserPreference()) return

  if (event.matches) {
    setTheme('dark')
  } else {
    setTheme('light')
  }
}

function colorModeMQ() {
  return window.matchMedia('(prefers-color-scheme: dark)')
}

function toggleTheme() {
  const themes = ['light', 'dark']

  // if this is the first time clicking the theme button
  // note that they actually chose a preference
  if (!hasUserPreference()) {
    setUserPreference()
  }

  // temporarily disable css transitions so it's snappy
  // https://paco.sh/blog/disable-theme-transitions
  const css = document.createElement('style')
  css.type = 'text/css'
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
  )
  document.head.appendChild(css)

  // set the next theme
  let theme = getTheme()
  let index = themes.indexOf(theme)
  let max = themes.length - 1
  let next = index + 1 > max ? 0 : index + 1

  theme = setTheme(themes[next])

  // re-enable transitions
  // calling getComputedStyle forces the browser to redraw
  const _ = window.getComputedStyle(css).opacity
  document.head.removeChild(css)
}

function init() {
  document.querySelector('.themeswitch').addEventListener('click', toggleTheme)
  colorModeMQ().addEventListener('change', onPreferenceChange)
}
