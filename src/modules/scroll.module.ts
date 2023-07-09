export function initScroll() {
    const intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const target = entry.target as HTMLElement

            const currentTransition = target.style.transition

            if (entry.isIntersecting) {
                target.classList.add(target.getAttribute('data-dr-scroll') as string)
                target.style.transitionDelay = target.getAttribute('data-dr-delay') + 'ms'
                target.style.transitionDuration = target.getAttribute('data-dr-duration') + 'ms'
            }
            else {
                target.classList.remove(target.getAttribute('data-dr-scroll') as string)
            }

            target.addEventListener('animationend', () => target.style.transition = currentTransition)
        })
    }, {
        threshold: 0.5
    })

    document.querySelectorAll('[data-dr-scroll]').forEach(el => {        
        (el as HTMLElement).style.animationDelay = el.getAttribute('data-dr-delay') + 'ms';
        (el as HTMLElement).style.animationDuration = el.getAttribute('data-dr-duration') + 'ms'

        intersectionObserver.observe(el)
    })
}