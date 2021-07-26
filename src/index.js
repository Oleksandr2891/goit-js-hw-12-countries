import './sass/main.scss';


const colors = [
    '#FFFFFF',
    '#2196F3',
    '#4CAF50',
    '#FF9800',
    '#009688',
    '#795548',
    '#FFCC33',
    '#FF0000',
    '#CC33CC',
    '#0000CC',
    '#33FFFF',
    '#00FF66',
    '#336666',
    '#330066',
    '#CC0033',
    '#FFFF00',
    '#FF00CC',
    '#999900',
];

const randomIntegerFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const buttonStart = document.querySelector('button[data-action="start"]');
const buttonStop = document.querySelector('button[data-action="stop"]');
const backgroundForColors = document.querySelector('body');
const intervalChange = 1000;
let pressButton = true;

let intervalId;



buttonStart.addEventListener('click', () => {
    if (!pressButton) return;
    pressButton = false;
    intervalId = setInterval(() => {
        backgroundForColors.style.backgroundColor = colors[randomIntegerFromInterval(0, colors.length)];
        console.log("работает");
    }, intervalChange);
});

buttonStop.addEventListener('click', () => {
    pressButton = true;
    clearInterval(intervalId);
    console.log("интервал очищено");
});