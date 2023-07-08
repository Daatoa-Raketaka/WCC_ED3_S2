export function initScroll() {
    const intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const target = entry.target as HTMLElement

            if (entry.isIntersecting) {
                target.classList.add(target.getAttribute('data-dr-scroll') as string)
                target.style.transitionDelay = target.getAttribute('data-dr-delay') + 'ms'
                target.style.transitionDuration = target.getAttribute('data-dr-duration') + 'ms'
            }
            else {
                target.classList.remove(target.getAttribute('data-dr-scroll') as string)
                target.style.transitionDelay = '0ms'
                target.style.transitionDuration = '0ms'
            }
        })
    }, {
        threshold: 0.5
    })

    document.querySelectorAll('[data-dr-scroll]').forEach(el => {        
        el.style.animationDelay = el.getAttribute('data-dr-delay') + 'ms'
        el.style.animationDuration = el.getAttribute('data-dr-duration') + 'ms'

        intersectionObserver.observe(el)
    })
}