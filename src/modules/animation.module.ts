export interface IAnimation {

}

export function initAnimation(options?: IAnimation) {
    const elements = document.querySelectorAll('[data-dr-anim]') as NodeListOf<HTMLElement>
    elements.forEach(el => el.style.animation = el.getAttribute('data-dr-anim') as string)
}