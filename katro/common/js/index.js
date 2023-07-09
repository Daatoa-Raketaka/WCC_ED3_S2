// function goTo(path) { location.href = path }
function setConfig(path, mode) {
    sessionStorage.setItem('mode', mode)
    location.href = path
}
function goTo(path, connectivity = '') {
    if (connectivity) localStorage.setItem('connectivity', connectivity)
    location.href = path
}

function copyToClipboard(toCopy) { if (toCopy) navigator.clipboard.writeText(toCopy) }

const audio = document.getElementById('audio')
let isPlayed = 0

window.addEventListener('keyup', (e) => {
    if (e.key === 'p') {
        if (isPlayed === 0) audio.play()
        else audio.pause()
        isPlayed = (isPlayed === 0) ? 1 : 0
        console.log(isPlayed)
    }
})
