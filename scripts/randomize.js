import * as db from "./db-functions.js"

async function changeGame() {
	let game = (await db.getRandomGame())[0];

	document.getElementById('game-name').innerText = game.Name;
	//document.getElementById('game-img').src = ${game.ListImg};
	document.getElementById('game-img').src = `${game.ListImg}?format=auto&width=250`;
}

document.querySelector('#random-button').addEventListener('click', changeGame);