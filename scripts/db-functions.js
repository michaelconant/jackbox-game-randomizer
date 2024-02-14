import { load } from "../dist/sql-httpvfs.js";
import { formatSorting } from "./string-manip.js";

const worker = await load("../database/jackboxgames.db");

export async function query(statement) {
	return await worker.db.query(statement);
}

//Sort result from data base using the Name for each row
export function sortByName(result) {
	function compareName( a, b ) {
		//compares them alphanumerically so the order will be (1, 2, 10) instead of (1, 10, 2)
		return formatSorting(a.Name).localeCompare(formatSorting(b.Name), undefined, {
			numeric: true,
			sensitivity: 'base'
		});
	}
	return result.sort(compareName);
}