const select = document.querySelector('select'),
    alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""),
    letterArr = [],
    ul = document.querySelector('.list'),
    li = document.getElementsByTagName('li');
let par = document.querySelector('p');

//getting random number
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

//fill array with 5 unique letters
while (letterArr.length < 5) {
    let letter = alphabet[Math.round(getRandom(0, alphabet.length - 1))];
    if (!letterArr.includes(letter)) {
        letterArr.push(letter)
    }
}
//create options with letters
letterArr.forEach((el) => {
    let newOption = new Option(el);
    select.append(newOption);
});
//default value
addNames(select[0].value);

//create elements
function createElement(element) {
    return document.createElement(element);
}

//add elements to DOM
function append(parent, el) {
    return parent.appendChild(el);
}

//getting data from list.json
function addNames(letter) {
    fetch('data/list.json')
        .then((resp) => resp.json())
        .then((data) => {
            return data.forEach((author) => {
                if (author.name.charAt(0) === letter) {
                    let li = createElement('li');
                    li.innerHTML = author.name;
                    append(ul, li);
                }
            })


        }).then(() => showHide('li'))
        .catch((error) => {
            console.log(error);
        });
}

//change names when changed option
select.addEventListener('change', () => {
    document.querySelectorAll('li').forEach(li => li.remove())
    addNames(select.options[select.selectedIndex].value);
})

function showHide(element) {
    if (document.querySelectorAll(element).length === 0) {
        par.style.display = "block"
    } else {
        par.style.display = "none";
    }
}

showHide('li')