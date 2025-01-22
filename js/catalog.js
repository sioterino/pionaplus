async function fetchData(url, arr) {
    const response = await fetch(url)
    const data = await response.json()
    arr.push(...data)
}

var cardsData = []

function populate(data, max) {
    const template = document.querySelector(".option-template")
    const catalog = document.querySelector(".catalog")

    for (let i = 0; i < max; i++) {
        cardsData = data.map(item => {
            const option = template.content.cloneNode(true).children[0]
    
            const poster = option.querySelector(".poster")
            poster.style.backgroundImage = `url("${item.posterPath}")`
            
            const title = option.querySelector(".title")
            title.textContent = item.name
    
            const pagePath = option.querySelector(".page-path")
            pagePath.href = item.pagePath
    
            catalog.append(option)

            return {"name": item.name, "tags": item.tags, "year": item.year, "element": option}
        })
    }
}



async function main() {
    let data = []
    await fetchData('../data/concerts.json', data)
    data.reverse()

    populate(data, 1)
}

main()