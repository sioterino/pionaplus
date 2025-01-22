async function fetchData(url) {
    const response = await fetch(url)
    return await response.json()

}

function randint(max) {
    return Math.floor(Math.random() * max)
}

async function main() {
    const data = await fetchData('../data/config.json')

    const item = data[0]
    const head = document.querySelector("head")

    console.log(head)

    head.querySelector(".favicon").href = item.favicon
    head.querySelector("title") = item.title

}

main()
