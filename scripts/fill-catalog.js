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

	//determine what sort order should be used in sql statement
	let sortType;
	if (document.getElementById("sort-select")) {
		sortType = document.getElementById("sort-select").value;
	} else {
		sortType = null;
	}

	switch(sortType) {
		case "releaseASC":
			search += `ORDER BY ReleaseDate ASC`;
			break;
		case "releaseDESC":
		default:
			search += `ORDER BY ReleaseDate DESC`;
			break;
	}

	//get search result fromm database
	let result = await db.query(search);

	//sort by name if the user chose to
		//this is not done in sql because sql-httpvfs seems to not support REGEX and regex is used to sort the names (removing the "The" at the begining for example)
	if (sortType != null && sortType.includes("name")) {
		result = db.sortByName(result);
		if (sortType == "nameDESC") {
			console.log("reverse");
			result = result.reverse();
		}
	}

	return result;
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

//update the list of games by clearing the list and refilling the list
export async function updateList() {
	//the result is retrieved from the database before clearing the list in order to minimize the time the list is empty
	let result = await getList();
	clearList();
	fillList(result);
}

updateList();

if (document.getElementById("search-bar") !== null) {
	document.getElementById("search-bar").oninput = updateList;
}

if (document.getElementById("sort-select") !== null) {
	document.getElementById("sort-select").onchange = updateList;
}