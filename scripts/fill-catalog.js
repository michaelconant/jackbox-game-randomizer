import * as db from "./db-functions.js"
import { formatURL } from "./string-manip.js";

//console.log(document.getElementsByTagName('script')[0].hasAttribute('list-type'));
//console.log(document.getElementsByTagName('script')[0].getAttribute('list-type').toLowerCase());

let type;
switch(document.getElementsByTagName('script')[0].getAttribute('list-type').toLowerCase()) {
	case "pack":
	case "packs":
		type = "pack"
		break;
	case "game":
	case "games":
	default:
		type = "game"
}

//List Using Images
let result = await db.query(`SELECT Name, ListImg FROM ${type}s`);
console.log(`SELECT Name, ListImg FROM ${type}s`);
console.log(result);
result = db.sortByName(result);
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
