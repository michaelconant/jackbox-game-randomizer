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

let columns;
if (type === 'game') {
	columns = ', PlayersMin, PlayersMax, DurationMin, DurationMax';
} else {
	columns = '';
}

let result = await db.query(`SELECT Name, ReleaseDate, ListImg${columns} FROM ${type}s ORDER BY ReleaseDate DESC`);

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

	document.getElementById(`${type}s-container`).appendChild(newContainer);
});
