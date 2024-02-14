import * as db from "./db-functions.js"
import { formatURL } from "./string-manip.js";

const searchParams = new URLSearchParams(window.location.search);

if (searchParams.has('name')) {
	//sql-httpvfs doesn't seem to support REGEX in query
		//So REGEX can't be used in the query to match the url paramter to a specific row in the database.
		//Instead the find function can be used to find the correct result using REGEX.
	let result = await db.query(`SELECT * FROM Games`);
	result = result.find((game) => {
		return formatURL(game.Name) === formatURL(searchParams.get('name'));
	});
	if (typeof result !== undefined) {
		document.title = `Jackbox Picker - ${result.Name}`;

		document.getElementById('game-name').innerHTML = result.Name;
		document.getElementById('game-description').innerHTML = result.Description;
		document.getElementById('game-logo').src = `${result.Logo}?format=auto`;
		document.getElementById('game-splash').src = `${result.Splash}?format=auto`;
		document.getElementById('game-releasedate').innerHTML = result.ReleaseDate;
		document.getElementById('game-players').innerHTML = `${result.PlayersMin} - ${result.PlayersMax} Players`;
		if (result.PlayersMin == result.PlayersMax) {
			document.getElementById('game-players').innerHTML = `${result.PlayersMin} Players`;
		} else {
			document.getElementById('game-players').innerHTML = `${result.PlayersMin} - ${result.PlayersMax} Players`;
		}
		if (result.DurationMin == result.DurationMax) {
			document.getElementById('game-duration').innerHTML = `${result.DurationMin} Minutes`;
		} else {
			document.getElementById('game-duration').innerHTML = `${result.DurationMin} - ${result.DurationMax} Minutes`;
		}
	} else {
		console.log("game not found in database");
	}
} else {
	console.log("no game parameter");
}