const gameContainer = document.getElementById('game');
const ANIMALS = [
	'choclo',
	'elephant',
	'tiger',
	'toucan',
	'gorilla',
	'choclo',
	'elephant',
	'tiger',
	'toucan',
	'gorilla'
];
function shuffle(array) {
	let counter = array.length;
	while (counter > 0) {
		let index = Math.floor(Math.random() * counter);
		counter--;
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	return array;
}
let shuffledAnimals = shuffle(ANIMALS);
function createDivsForAnimals(animalArray) {
	for (let animal of animalArray) {
		const container = document.createElement('div');
		const card = document.createElement('div');
		const front = document.createElement('div');
		const back = document.createElement('div');
		container.setAttribute('name', 'container');
		card.setAttribute('name', 'card');
		card.setAttribute('data-ani', animal);
		front.setAttribute('name', 'front');
		back.setAttribute('name', 'back');
		back.classList.add(animal);
		container.addEventListener('click', flipCard);
		gameContainer.append(container);
		container.append(card);
		card.append(front);
		card.append(back);
	}
}
createDivsForAnimals(shuffledAnimals);
let count = 0;
let flippedCard = false;
let firstCard, secondCard;
let lockcards = false;
function flipCard(e) {
	count += 1;
	counts.textContent = count;
	const counter = sessionStorage.setItem('counter', count);
	if (lockcards) return;
	if (e.target.parentElement === firstCard) return;
	e.target.parentElement.classList.add('flip');
	if (!flippedCard) {
		flippedCard = true;
		firstCard = e.target.parentElement;
		return;
	}
	secondCard = e.target.parentElement;
	matchChecker();
}
function matchChecker() {
	let match = firstCard.dataset.ani === secondCard.dataset.ani;
	match ? disableCards() : unflip();
}
function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	restCards();
}

function unflip() {
	lockcards = true;
	setTimeout(function() {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		restCards();
	}, 1500);
}
function restCards() {
	[ flippedCard, lockcards ] = [ false, false ];
	[ firstCard, secondCard ] = [ null, null ];
}

let counts = document.querySelector('.count');
const bestScore = 100;
let score = document.querySelector('.score');

if (sessionStorage.counter < bestScore) {
	localStorage.setItem('bestScore', sessionStorage.counter);
	score.textContent = sessionStorage.counter;
}
