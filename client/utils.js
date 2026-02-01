export function magnitude(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

export function textToMatrix(text) {
    return text.split("\n").map((row) => row.split(""));
}

export function randomSelect(array) {
     return array[Math.floor(Math.random() * array.length)];
}
