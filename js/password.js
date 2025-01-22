async function fetchData(url, arr) {
    const response = await fetch(url)
    const data = await response.json()
    arr.push(...data)
}

function randint(max) {
    return Math.floor(Math.random() * max)
}

function fstr(str) {
    return str.toLowerCase().replace(" ", "")
}

function login(answer) {
    const feedback_div = document.querySelector(".login .status")
    const senha = fstr(document.querySelector("#senha").value)

    feedback_div.innerHTML = ""
    
    if (senha && senha === answer) {
        window.location.replace("./catalog.html")
    } else {
        const status = document.createElement("p")
        status.classList.add("incorrect")
        status.textContent = "Senha incorreta."
        feedback_div.append(status);
        document.querySelector("#senha").value = ""
    }
}

async function main() {
    let dicas = []
    await fetchData('../data/passwords.json', dicas)
    const index = randint(dicas.length)
    const answer = dicas[index].resposta

    const tip = document.querySelector(".login .tip")
    tip.textContent = dicas[index].dica

    const enter = document.querySelector(".login .button")
    enter.addEventListener("click", (e) => {
        login(answer)
    })
    const input = document.querySelector(".login .password")
    input.addEventListener("keydown", (e) => {
        if (e.key == 'Enter') {
            login(answer)
        }
    })
}

main()