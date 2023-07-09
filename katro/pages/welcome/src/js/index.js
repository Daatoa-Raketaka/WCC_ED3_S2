const musicBtn = document.getElementById('music-btn')
musicBtn.addEventListener('click', () => {
    if (isPlayed === 0) audio.play()
    else audio.pause()
    isPlayed = (isPlayed === 0) ? 1 : 0
})