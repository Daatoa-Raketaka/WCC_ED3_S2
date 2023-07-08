import './style.scss'

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
})