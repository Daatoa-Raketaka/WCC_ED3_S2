export const platformerModal = document.querySelector('.platformer-modal') as HTMLElement
export const platformerModalOverlay = platformerModal.querySelector('.overlay') as HTMLElement
export const exitPlatformerModal = platformerModal.querySelector('.footer>.exit-btn') as HTMLElement
export const playPlatformerModal = platformerModal.querySelector('.footer>.play-btn') as HTMLElement

export function showPlatformerModal() {
  if (!platformerModal.classList.contains('acitve'))
    platformerModal.classList.add('active')
}

export function hidePlatformerModal() {
  if (platformerModal.classList.contains('active'))
    platformerModal.classList.remove('active')
}