// filter icon
const filteron = document.querySelector('#filteron')
const filteroff = document.querySelector('#filteroff')
// dropdown faces
const cat = document.querySelector('#category')
// dropdown options
const catOptions = document.querySelector('#catOptions')

const caret = document.querySelector('#caret')
//searchbar
const search = document.querySelector('#search')
const searchbar = document.querySelector('#searchbar')

// OPENING FILTERS
filteron.addEventListener('click', () => {
    // opens dropdown faces
    cat.style.display = 'flex'
    requestAnimationFrame(() => {
        cat.classList.remove('fade-left')
        cat.classList.add('fade-right')
    })
    //changes icon from FILTER ON to FILTER OFF
    filteroff.style.display = 'block'
    filteron.style.display = 'none'
    // closes searchbar if open
    if (window.getComputedStyle(searchbar).display == 'block') {
        searchbar.value = ""
        searchbar.style.display = 'none'
        search.classList.remove("on")
    }
})

// CLOSING FILTERS
filteroff.addEventListener('click', () => {
    // closes dropdown faces
    cat.classList.add('fade-left')
    cat.classList.remove('fade-right')
    setTimeout(() => {
        cat.style.display = 'none'
    }, 200)
    // changes icon from FILTER OFF to FILTTER ON
    turnFilterOff()
    // closes CATEGORY options if opened
    if (window.getComputedStyle(catOptions).display == 'block') {
        caret.classList.remove('turn')
        catOptions.classList.add('fade-out')
        catOptions.classList.remove('fade-in')
        setTimeout(() => {
            catOptions.style.display = 'none'
        }, 50)
    }
})

// TOGGLE CATEGORY OPTIONS
cat.addEventListener('click', () => {
    // opens CATEGORY OPTIONS if it is closed
    if (window.getComputedStyle(catOptions).display === 'none') {
        caret.classList.add('turn')
        catOptions.style.display = 'block'

        requestAnimationFrame(() => {
            catOptions.classList.remove('fade-out')
            catOptions.classList.add('fade-in')
        })


        catOptions.style.display = 'block'
        requestAnimationFrame(() => {
            catOptions.classList.add('fade-in')
        })


    } else {
        // closes SORT CATEGORY if it is opened
        caret.classList.remove('turn')
        catOptions.classList.add('fade-out')
        catOptions.classList.remove('fade-in')
        setTimeout(() => {
            catOptions.style.display = 'none'
        }, 200)
    }
})


// TOGGLE SEARCHBAR
search.addEventListener('click', () => {
    if (window.getComputedStyle(searchbar).display === 'none') {
        searchbar.style.display = 'block'
        search.classList.add("on")
        requestAnimationFrame(() => {
            searchbar.classList.remove('fade-left')
            searchbar.classList.add('fade-right')
        })
        
        cat.style.display = 'none'
        if (window.getComputedStyle(filteroff).display === 'block') {
            filteroff.style.display = 'none'
            filteron.style.display = 'block'

            turnFilterOff()
            
            caret.classList.remove('turn')
            catOptions.style.display = 'none'
        }
    } else {
        searchbar.classList.add('fade-left')
        searchbar.classList.remove('fade-right')
        search.classList.remove("on")
        setTimeout(() => {
            searchbar.style.display = 'none'
        }, 200)
    }
})

function turnFilterOff() {
    filteroff.style.display = 'none'
    filteron.style.display = 'block'

    title.textContent = "Catálogo Completo"
    
    liCat.forEach(item => {
        item.classList.remove("selected")
    })
    
    find(false, window.cardsData)
    setTimeout(() => {
        cat.querySelector(".name").textContent = "Categoria"
    }, 200);
}

const all = document.querySelector("#all")
const concerts = document.querySelector("#concerts")
const fanmeetings = document.querySelector("#fanmeetings")
const festivals = document.querySelector("#festivals")

const liCat = [all, concerts, fanmeetings, festivals]

const title = document.querySelector(".title")

liCat.forEach(item => {
    item.addEventListener('click', () =>  {
        const text = item.textContent
        cat.querySelector(".name").textContent = text
        liCat.forEach(item => {
            item.classList.remove("selected")
        })
        item.classList.add("selected")
        catOptions.style.display = 'none'
        caret.classList.remove('turn')
        changeTitle(text)

        const x = text.toLowerCase().replaceAll(" ", "") === "tudo" ? false : text.toLowerCase().replaceAll(" ", "");
        console.log(x)

        find(x, window.cardsData)
    })
})

function changeTitle(text) {
    switch (text) {
        case "Show":
            title.textContent = "Shows"
            break
        case "Fanmeeting":
            title.textContent = "Fanmeetings"
            break
        case "Festival":
            title.textContent = "Festivais"
            break
        case "Tudo":
            title.textContent = "Catálogo Completo"
            break
    }
}

function find(value, data) {
    data.forEach(item => {
        const name = item.name.toLowerCase().replaceAll(" ", "").includes(value)
        const year = item.year.toLowerCase().replaceAll(" ", "").includes(value)
        const tags = item.tags.some(tag => 
            tag.toLowerCase().replaceAll(" ", "").includes(value)
        )

        let show = ""
        if (value === false) {
            show = true
        } else {
            show = name || year || tags
        }

        if (!show) {
            item.element.classList.add("hidden")
        } else {
            item.element.classList.remove("hidden")
        }
    })
}

setTimeout(() => {
    const data = window.cardsData

    searchbar.addEventListener('input', (e) => {
        turnFilterOff()
        find(e.target.value.toLowerCase().replaceAll(" ", ""), data)
    })

}, 500)
