export const mobileNavbar = document.querySelector('header>.mobile-navbar') as HTMLElement
export const burgerBtn = document.querySelector('header>.navbar>.burger-btn') as HTMLElement
export const exitMobileNavbar = mobileNavbar.querySelector('.exit') as HTMLElement
export const mobileNavbarLinks = mobileNavbar.querySelectorAll('.link') as NodeList
export const mobileComingSoon = mobileNavbar.querySelector('.coming-soon') as HTMLElement

export function activateMobileNavbar(element: HTMLElement) {
  if (!element.classList.contains('active'))
    element.classList.add('active')
}

export function deactivateMobileNavbar(element: HTMLElement) {
  if (element.classList.contains('active'))
    element.classList.remove('active')
}