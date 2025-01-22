// function that opens and closes side bar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.toggle('show')

    if (!sidebar.classList.contains('show')) {
        dropdown.classList.remove('show')
        setTimeout(() => {
            dropdown.style.display = 'none'
        }, 200)
    }
}
// function that opens and closes the about dropdown in the side bar
const dropdown = document.querySelector('.dropdown__sidebar')
function showAbout() {
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show')
        setTimeout(() => {
            dropdown.style.display = 'none'
        }, 200)

    } else {
        dropdown.style.display = 'block'
        requestAnimationFrame(() => {
            dropdown.classList.add('show')
        })
    }
}

// watcher of the navbar which makes it change from linear gradient
// to solid color after it intersects with watcher class
const nav = document.querySelector('.nav')

setTimeout(() => {
    const navWatcher = document.querySelector(".watcher")
    const navObserver = new IntersectionObserver((entries) => {
        nav.classList.toggle('seen', !entries[0].isIntersecting)
    }, {rootMargin: "-200px 0px 0px 0px"})
    
    navObserver.observe(navWatcher)
}, 350);


// watcher of the slide which makes it play/run,
// when navbar intersects with slider class
const slide = document.querySelector(".slide")
const slideWatcher = document.querySelector(".slider")

const slideObserver = new IntersectionObserver((entries) => {
    slide.classList.toggle('play', entries[0].isIntersecting)
})

slideObserver.observe(slideWatcher)