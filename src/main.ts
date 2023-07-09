import './style.scss'
import { activateMobileNavbar, mobileNavbar, burgerBtn, exitMobileNavbar, deactivateMobileNavbar, mobileNavbarLinks, mobileComingSoon, navbarLinks } from './modules/navbar.module'
import { initAnimation } from './modules/animation.module'
import { initScroll } from './modules/scroll.module'
import { initMouse } from './modules/mouse.module'
import { exitRacingModal, hideRacingModal, playRacingModal, racingModalOverlay, showRacingModal } from './modules/racing-modal.module'
import { exitPlatformerModal, hidePlatformerModal, platformerModalOverlay, playPlatformerModal, showPlatformerModal } from './modules/platformer-modal.module'
import { scrollToTop, scrollToTopBtn } from './modules/scroll-to-top.module'
import { desktopThemeBtn, detectTheme, mobileThemeBtn, toggleTheme } from './modules/theme.module'
import { initSlider } from './modules/slider.module'

window.addEventListener('load', () => {
  const overlay = document.querySelector('.overlay') as HTMLElement
  overlay.classList.add('loaded')
  overlay.style.backgroundColor = 'transparent'

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
  initSlider()

  window.addEventListener('resize', initSlider)
})

function main() {
  detectTheme()
  burgerBtn.addEventListener('click', () => activateMobileNavbar(mobileNavbar))
  exitMobileNavbar.addEventListener('click', () => deactivateMobileNavbar(mobileNavbar))
  mobileComingSoon.addEventListener('click', () => deactivateMobileNavbar(mobileNavbar))
  mobileNavbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      deactivateMobileNavbar(mobileNavbar)
      const currentLink = link as HTMLElement
      if (currentLink.classList.contains('racing')) {
        e.preventDefault()
        showRacingModal()
      }
      else if (currentLink.classList.contains('platformer')) {
        e.preventDefault()
        showPlatformerModal()
      }
    })
  })
  navbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const currentLink = link as HTMLElement
      if (currentLink.classList.contains('racing')) {
        e.preventDefault()
        showRacingModal()
      }
      else if (currentLink.classList.contains('platformer')) {
        e.preventDefault()
        showPlatformerModal()
      }
    })
  })
  racingModalOverlay.addEventListener('click', hideRacingModal)
  exitRacingModal.addEventListener('click', hideRacingModal)
  playRacingModal.addEventListener('click', hideRacingModal)

  platformerModalOverlay.addEventListener('click', hidePlatformerModal)
  exitPlatformerModal.addEventListener('click', hidePlatformerModal)
  playPlatformerModal.addEventListener('click', hidePlatformerModal)

  scrollToTopBtn.addEventListener('click', scrollToTop)

  desktopThemeBtn.addEventListener('click', toggleTheme)
  mobileThemeBtn.addEventListener('click', toggleTheme)
}

main()
