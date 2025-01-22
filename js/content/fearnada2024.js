async function fetchData(url, arr) {
    const response = await fetch(url)
    const data = await response.json()
    arr.push(...data)
}

function randint(max) {
    return Math.floor(Math.random() * max)
}

async function main(index) {
    let data = []
    await fetchData('../../data/concerts.json', data)

    // SCENE
    const scene = document.querySelector(".scene")
    scene.style.backgroundImage = `url("${data[index].scenePath}")`

    // PAGE TITLE
    const pageTitle = document.querySelector(".page-title")
    pageTitle.textContent = data[index].name
    const width = pageTitle.offsetWidth

    // TAGS
    const tags = document.querySelector(".tags")
    tags.style.width = `${width}px`
    data[index].tags.reverse().forEach(tag => {
        const pTag = document.createElement("p")
        pTag.textContent = tag
        tags.append(pTag)
    })

    // WATCH HERE
    const watch = document.querySelector(".a-watch")
    const randVideo = randint(data[index].watch.length)
    watch.href = data[index].watch[randVideo].pagePath

    // TELEGRAM
    const telegram = document.querySelector(".a-more")
    telegram.href = data[index].telegram

    //RATING
    const ageGroup = data[index].rating
    let ratingPath
    switch (ageGroup) {
        case "L":
            ratingPath = "../../img/icons/L.svg"
            break
        
        case 10:
            ratingPath = "../../img/icons/10.svg"
            break
        
        case 12:
            ratingPath = "../../img/icons/12.svg"
            break

        case 14:
            ratingPath = "../../img/icons/14.svg"
            break
        
        case 16:
            ratingPath = "../../img/icons/16.svg"
            break

        case 18:
            ratingPath = "../../img/icons/18.svg"
            break
        default:
            ratingPath = "../../img/icons/er.svg"
    }
    const imgEl = document.querySelector(".rating")
    imgEl.src = ratingPath

    // CLOSED CAPTIONS
    const cc = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-160q-33 0-56.5-23.5T120-240v-480q0-33 23.5-56.5T200-800h560q33 0 56.5 23.5T840-720v480q0 33-23.5 56.5T760-160H200Zm80-200h120q17 0 28.5-11.5T440-400v-40h-60v20h-80v-120h80v20h60v-40q0-17-11.5-28.5T400-600H280q-17 0-28.5 11.5T240-560v160q0 17 11.5 28.5T280-360Zm280 0h120q17 0 28.5-11.5T720-400v-40h-60v20h-80v-120h80v20h60v-40q0-17-11.5-28.5T680-600H560q-17 0-28.5 11.5T520-560v160q0 17 11.5 28.5T560-360Z"/></svg>`
    const nocc = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M819-28 687-160H200q-33 0-56.5-23.5T120-240v-487l-93-93 57-57L876-85l-57 57Zm21-207L706-369q7-5 10.5-13.5T720-400v-40h-60v20h-5l-75-75v-45h80v20h60v-40q0-17-11.5-28.5T680-600H560q-17 0-28.5 11.5T520-560v5L275-800h485q33 0 56.5 23.5T840-720v485ZM280-360h120q17 0 28.5-11.5T440-400v-7l-33-33h-27v20h-80v-127l-45-45q-7 5-11 13.5t-4 18.5v160q0 17 11.5 28.5T280-360Z"/></svg>`
    let svgConteiner = document.querySelector(".svg-conteiner")
    if (data[index].sub) {
        svgConteiner.innerHTML = cc
    } else {
        svgConteiner.innerHTML = nocc
    }

    // YEAR
    const year = document.querySelector(".year")
    year.textContent = data[index].year

    // DURATION
    const duration = document.querySelector(".duration")
    if (data[index].duration.length <= 1) {
        duration.textContent = data[index].duration
    } else {
        duration.textContent = `${data[index].duration[0]} | ${data[index].duration[1]}`

    }

    // SUMMARY
    let paragraphs
    if (data[index].summary.length) {
        paragraphs = data[index].summary
    } else {
        paragraphs = [
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hicaliquam laudantium vitae culpa voluptatem vero possimus. Laborum, eveniet assumenda ratione, debitis sit quidem, excepturi officia minima neque omnis reprehenderit iusto!",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sapiente doloremque odit a assumenda nobis itaque vel, reiciendis illo quis quos natus aspernatur distinctio dicta nulla, possimus, voluptatibus et minima?"
        ]
    }
    const summary = document.querySelector(".summary")
    paragraphs.forEach(text => {
        const pParagraph = document.createElement("p")
        pParagraph.textContent = text
        summary.appendChild(pParagraph)
    })

    // VIDEOS
    const template = document.querySelector(".card-template")
    const catalog = document.querySelector(".catalog")
    
    data[index].watch.forEach(item => {
        const card = template.content.cloneNode(true).children[0]
    
        const video = card.querySelector(".video")
        video.style.backgroundImage = `url("${item.posterPath}")`
        
        const title = card.querySelector(".name")
        title.textContent = item.title

        const url = card.querySelector(".video-redirect")
        url.href = item.pagePath
    
        catalog.append(card)
    })
    
}

main(3)