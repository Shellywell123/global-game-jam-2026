// This is how you import in a really basic way
import {hello} from './hello.js'

class State {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
};

window.onload = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    var state = new State();

    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 150, 100);

    hello("world");

    document.addEventListener("keypress", (e) => {
        switch (e.key) {
            case 'w':
                state.y += 1;
                break;
            case 'd':
                self.y -= 1;
                break;
            default:
                console.log(e.key);
        }
    });
};

