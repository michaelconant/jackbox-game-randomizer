import * as db from "./db-functions.js"
import { formatURL } from "./string-manip.js";


let type;
if (document.getElementById('list-script').hasAttribute('list-type')) {
	switch (document.getElementById('list-script').getAttribute('list-type').toLowerCase()) {
		case "pack":
		case "packs":
			type = "pack"
			break;
		case "game":
		case "games":
		default:
			type = "game"
			break;
	}
} else {
	type = "game";
}
let listContainer = document.getElementById(`${type}s-container`);

let columns;
if (type === 'game') {
	columns = ', PlayersMin, PlayersMax, DurationMin, DurationMax';
} else {
	columns = '';
}

function clearList() {
	listContainer.replaceChildren();
}

async function getList() {
	let search = `SELECT Name, ReleaseDate, ListImg${columns} FROM ${type}s `;

	if (document.getElementById("search-bar") != null && document.getElementById("search-bar").value) {
		search += `WHERE Name LIKE '%${document.getElementById("search-bar").value}%' `;
	}

	search += `ORDER BY ReleaseDate DESC`;

	return await db.query(search);
}

async function fillList(result) {
	result.forEach((entry) => {
		var newContainer = document.createElement('a');
		newContainer.href = `../${type}?name=${formatURL(entry.Name)}`;
		newContainer.className = type;

		var newElement = document.createElement('div');
		newElement.className = 'overlay';
		newContainer.appendChild(newElement);

		newElement = document.createElement('img');
		newElement.alt = `${entry.Name}`;
		newElement.src = `${entry.ListImg}?format=auto`;
		newContainer.appendChild(newElement)

		newElement = document.createElement('p');
		newElement.appendChild(document.createTextNode(`${entry.Name}`));
		newContainer.appendChild(newElement);

		listContainer.appendChild(newContainer);
	});
}

async function updateList() {
	let result = await getList();
	clearList();
	fillList(result);
}

updateList();

if (document.getElementById("search-bar") !== null) {
	document.getElementById("search-bar").oninput = updateList;
}