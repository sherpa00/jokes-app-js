// dom elements
const generateBtn = document.querySelector(".generate");
const select = document.querySelector("#number")
const inps = document.querySelectorAll("input");
const jokeArea = document.querySelector(".jokes_cont");


generateBtn.addEventListener("click", () => {
    if (jokeArea.children.length > 0) {
        for (let c = 0; c < jokeArea.children.length; c++) {
            jokeArea.removeChild(jokeArea.children[c])
        }
    };

    let amount = 1;
    let types = [];
    let jokesList = [];

    amount = select.value;

    for (let i = 0; i < inps.length; i++) {
        if (inps[i].checked == true) {
            types.push(inps[i].value);
        }
    }

    let joined = types.join(",");

    // base literal api url
    if (types.length == 0) {
        alert("PLEASE SELECT TYPE OF JOKE TO GENRATE");
    } else {
        
        jokeArea.style.opacity = "1";

        const base = `https://v2.jokeapi.dev/joke/${joined}?type=single&amount=${amount}`;

        //fetch the result of api
        fetch(base).then((result) => {
            return result.json();
        }).then((data) => {
            if (amount == 1) {
                addJokes(data.joke, jokeArea);
            } else {
                for (let i = 0; i < data.jokes.length; i++) {
                    addJokes(data.jokes[i].joke, jokeArea);
                }
            }
        })
    }

})

function addJokes(joke, parentElement) {
    let div = document.createElement("p");
    div.classList.add("joke");
    div.innerHTML = joke;
    parentElement.appendChild(div);
}