async function fetchData(url) {
    const response = await fetch(url)
    return await response.json()

}

function randint(max) {
    return Math.floor(Math.random() * max)
}

async function main() {
    const data = await fetchData('../data/slides.json')

    const i = randint(data.length)
    const item = data[i]

    const slide = document.querySelector(".slide")

    const j = randint(item.slidePath.length)
    slide.style.backgroundImage = `url(${item.slidePath[j]})`
    
    slide.querySelector(".name").textContent = item.name
    slide.querySelector

    let paragraphs
    if (item.summary.length) {
        paragraphs = item.summary
    } else {
        paragraphs = [
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hicaliquam laudantium vitae culpa voluptatem vero possimus. Laborum, eveniet assumenda ratione, debitis sit quidem, excepturi officia minima neque omnis reprehenderit iusto!",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sapiente doloremque odit a assumenda nobis itaque vel, reiciendis illo quis quos natus aspernatur distinctio dicta nulla, possimus, voluptatibus et minima?"
        ]
    }

    const summary = slide.querySelector(".summary")
    let counter = 0
    paragraphs.forEach(text => {
        const p = document.createElement("p")
        if (counter == 0) {
            p.classList.add("watcher")
            p.classList.add("slider")
        }
        p.textContent = text
        summary.appendChild(p)
        counter++
    })

    slide.querySelector(".watch").querySelector("a").href = item.watchPath
    slide.querySelector(".more").querySelector("a").href = item.seeMore
    
    let ratingPath
    switch (item.rating) {
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
    slide.querySelector(".rating").querySelector("img").src = ratingPath


}

main()
