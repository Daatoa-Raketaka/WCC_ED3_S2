export const scrollToTopBtn = document.querySelector('.scroll-to-top') as HTMLElement

export function scrollToTop() {
  document.body.scrollTo({ top: 0 })
  window.location.href = '#'
}