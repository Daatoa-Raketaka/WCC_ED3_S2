export function initSlider() {
    const element = document.querySelector('.carousel') as HTMLElement
    element.innerHTML = ''
    let currentElement: HTMLElement
    let i: number = 1

    do {
        const img = document.createElement('img')
        img.src = `/slider/${i}.png`
        element.appendChild(img)
        currentElement = img
        i = i < 9 ? i + 1 : 1
    } while(currentElement.getBoundingClientRect().left < (window.innerWidth * 1.5))

    document.body.addEventListener('scroll', () => {
        const elementTop = element.getBoundingClientRect().top
        const scrollPos = document.body.scrollTop - elementTop
        console.log(scrollPos)
        if (scrollPos > -200) {
            element.style.transform = `rotateZ(5deg) translateX(-${(scrollPos + 200) * 0.01}%)`
        }
    })
}