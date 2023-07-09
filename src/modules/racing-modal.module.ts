export const racingModal = document.querySelector('.racing-modal') as HTMLElement
export const racingModalOverlay = racingModal.querySelector('.overlay') as HTMLElement
export const exitRacingModal = racingModal.querySelector('.footer>.exit-btn') as HTMLElement
export const playRacingModal = racingModal.querySelector('.footer>.play-btn') as HTMLElement

export function showRacingModal() {
  if (!racingModal.classList.contains('active'))
    racingModal.classList.add('active')
}

export function hideRacingModal() {
  if (racingModal.classList.contains('active'))
    racingModal.classList.remove('active')
}