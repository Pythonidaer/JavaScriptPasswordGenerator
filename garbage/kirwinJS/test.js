
let x;

function promptUser(x) {
    x = parseInt(prompt(`What number between 1 - 10?`));
    if (
        !x ||
        x < 1 ||
        x > 10
    ) {
        return prompt()
    } else {
        alert('You chose: ' + x)
    }
}

window.addEventListener('DOMContentLoaded', promptUser);

