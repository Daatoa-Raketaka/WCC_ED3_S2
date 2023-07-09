function play(path, level) {
    sessionStorage.setItem('mode', 'solo')
    sessionStorage.setItem('level', level)
    location.href = path
}