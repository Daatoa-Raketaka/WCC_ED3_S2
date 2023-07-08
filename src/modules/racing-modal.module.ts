export const racingModal = document.querySelector('.racing-modal') as HTMLElement
export const racingModalOverlay = racingModal.querySelector('.overlay') as HTMLElement
export const exitRacingModal = racingModal.querySelector('.footer>.exit-btn') as HTMLElement
export const playRacingModal = racingModal.querySelector('.footer>.play-btn') as HTMLElement

export function showRacingModal(element: HTMLElement) {
  if (!element.classList.contains('active'))
    element.classList.add('active')
}

export function hideRacingModal(element: HTMLElement) {
  if (element.classList.contains('active'))
    element.classList.remove('active')
}