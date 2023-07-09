function goTo(path, mode) { 
    if (mode) localStorage.setItem('mode', mode)
    location.href = path 
}