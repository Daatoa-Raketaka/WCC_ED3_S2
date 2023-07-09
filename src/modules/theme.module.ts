export const desktopThemeBtn = document.querySelector('header>.navbar>.links>.theme') as HTMLElement
export const mobileThemeBtn = document.querySelector('header>.mobile-navbar>.logo>.theme') as HTMLElement
export const rootElement = document.querySelector('html') as HTMLHtmlElement

export function toggleTheme() {
  if (rootElement.classList.contains('light')) {
    rootElement.classList.remove('light')
    window.localStorage.setItem('dr-theme', 'dark')
  } else {
    rootElement.classList.add('light')
    window.localStorage.setItem('dr-theme', 'light')
  }
  (desktopThemeBtn.querySelector('.icon') as HTMLElement).classList.toggle('light');
  (mobileThemeBtn.querySelector('.icon') as HTMLElement).classList.toggle('light');
}

export function detectTheme() {
  const storedTheme = window.localStorage.getItem('dr-theme')
  if (storedTheme && storedTheme === 'light') {
    toggleTheme()
  }
  else if (storedTheme && storedTheme === 'dark') {
    if (rootElement.classList.contains('light'))
      rootElement.classList.remove('light')
  }
}