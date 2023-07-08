export function initMouse() {
    const elements = document.querySelectorAll('[data-dr-mouse]') as NodeListOf<HTMLElement>

    const elPositions = [
        { x: -150, y: 0 },
        { x: -100, y: 100 },
        { x: 150, y: 0 },
        { x: 150, y: 100 },
    ]

    window.addEventListener('mousemove', (ev: MouseEvent) => {
        const mouse = {
            x: ev.clientX - (window.innerWidth / 2),
            y: ev.clientY - (window.innerHeight / 2),
        }
    
        elements.forEach((el, index) => {
            const offset = parseFloat(el.getAttribute('data-dr-mouse') as string)
            const pos = elPositions[index]

            el.style.transform = `translate(${pos.x + (mouse.x * offset)}%, ${pos.y + (mouse.y * offset)}%)`
        })
    })
}
