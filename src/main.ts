import './style.scss'
import { activateMobileNavbar, mobileNavbar, burgerBtn, exitMobileNavbar, deactivateMobileNavbar, mobileNavbarLinks, mobileComingSoon } from './modules/navbar.module'
import { initAnimation } from './modules/animation.module'
import { initScroll } from './modules/scroll.module'
import { initMouse } from './modules/mouse.module'

window.addEventListener('load', () => {
  const overlay = document.querySelector('.overlay') as HTMLElement
  overlay.classList.add('loaded')

  const onEnd = (ev: Event) => {
    const target = (ev.target as HTMLElement)
    target.style.opacity = '0'
    target.removeEventListener('animationend', onEnd)
  }
  document.querySelectorAll('.loaded div').forEach(value => value.addEventListener('animationend', onEnd))

  const onLoadedAnimationEnd = (ev: Event) => {
    const target = (ev.target as HTMLElement)
    overlay.style.display = 'none'
    target.removeEventListener('animationend', onLoadedAnimationEnd)
  }
  document.querySelector('.overlay div:nth-child(6)')?.addEventListener('animationend', onLoadedAnimationEnd)

  initAnimation()
  initMouse()
  initScroll()
})

function main() {
  burgerBtn.addEventListener('click', () => activateMobileNavbar(mobileNavbar))
  exitMobileNavbar.addEventListener('click', () => deactivateMobileNavbar(mobileNavbar))
  mobileComingSoon.addEventListener('click', () => deactivateMobileNavbar(mobileNavbar))
  mobileNavbarLinks.forEach(link => {
    link.addEventListener('click', () => deactivateMobileNavbar(mobileNavbar))
  })
}

main()
