const target = document.getElementById("typewriter");
const text = target.innerHTML;
const link = document.getElementById("link");

// Clear before type
target.innerHTML = "";

let i = 0;
let speed = 70;
let waiting = false;
let finished = false;

// Type a line
function typeWrite() {
    if (i < text.length) {
        const char = text.charAt(i);

        // Exit at newline
        if (char === '\n') {
            target.innerHTML += '\n';
            i++;
            waiting = true;
            return;
        }

        target.innerHTML += text.charAt(i);
        i++;

        // Wait for speed ms
        setTimeout(typeWrite, speed);
    } else {
        // if there is a link, make the link visible after typing
        if (link) {
            link.classList.add("visible");
        }
        finished = true;
    }
}

// Wait for user click before restarting
function clickAction() {
    if (waiting) {
        target.innerHTML += '\n';
        waiting = false;
        typeWrite();
    } else if (finished) {
        document.dispatchEvent(new Event("nextPage"));
    }
}

window.onload = typeWrite;
document.addEventListener("click", clickAction);