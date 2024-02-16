import { load } from "../dist/sql-httpvfs.js";

const worker = await load("../database/jackboxgames.db");

export async function query(statement) {
	return await worker.db.query(statement);
}

export async function getRandomGame(amount = 1) {
	return await worker.db.query(`SELECT * FROM Games ORDER BY RANDOM() LIMIT ${amount}`);
}