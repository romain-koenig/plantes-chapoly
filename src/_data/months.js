const EleventyFetch = require("@11ty/eleventy-fetch");
const { env } = require("process");

require("dotenv").config();

module.exports = async function () {
	const API_KEY = process.env.AIRTABLE_API_KEY;
	const BASE_ID = process.env.AIRTABLE_BASE_ID;
	const TABLE_ID = process.env.AIRTABLE_PHOTOS_TABLE_ID;

	const fetchUrl = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?maxRecords=100&view=ALL`;
	console.log(`fetchUrl: ${fetchUrl}`);
	let json = await EleventyFetch(fetchUrl, {
		duration: "5m",
		type: "json",
		verbose: true,
		fetchOptions: {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${API_KEY}`,
			},
		},
	});

	const allMonths = [];

	for (const key in json.records) {
		if (Object.hasOwnProperty.call(json.records, key)) {
			const element = json.records[key];

			// Check if the record has a "Mois" field and a "Plantes" field
			if (element.fields.hasOwnProperty("Mois") && element.fields.hasOwnProperty("Plantes")) {
				allMonths.push(element.fields.Mois);
			}
		}
	}

	const uniqueMonths = [...new Set(allMonths)].sort();
	return uniqueMonths;
};
