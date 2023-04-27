function print(data) {

    const newElement = document.createElement('label');
    newElement.textContent = data;
    document.body.appendChild(newElement);

}

function newline() {

    const br = document.createElement('br');
    document.body.appendChild(br);

}

let board_size = prompt("Please enter Grid Size :");

for (let i = 0; i < board_size; i++) {
    for (let j = 0; j < board_size; j++) {
        if ((i + j) % 2 == 0) {
            print("*");
        } else { print("#"); }
    }
    newline()
}