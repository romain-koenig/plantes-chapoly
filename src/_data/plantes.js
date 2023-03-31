const EleventyFetch = require("@11ty/eleventy-fetch");
const { env } = require('process');

require('dotenv').config();

module.exports = async function () {


	const API_KEY = process.env.AIRTABLE_API_KEY;
	const BASE_ID = process.env.AIRTABLE_BASE_ID;
	const TABLE_ID = process.env.AIRTABLE_PLANTES_TABLE_ID;


	const fetchUrl = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?maxRecords=100&view=ALL`;
	console.log(`fetchUrl: ${fetchUrl}`)
	let json = await EleventyFetch(fetchUrl, {
		duration: "1m",
		type: "json",
		verbose: true,
		fetchOptions: {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${API_KEY}`
			}
		}
	});


	const plantes = [];

	for (const key in json.records) {
		if (Object.hasOwnProperty.call(json.records, key)) {
			const element = json.records[key];

			let image = '';
			if (element.fields.hasOwnProperty('Pics')) {
				image = element.fields.Pics[0].thumbnails.large.url;
			}

			const plante = {
				name: element.fields.Name,
				type: element.fields.Type,
				link: element.fields["Lien externe"],
				notes: element.fields.Notes,
				image: image,
				type: element.fields.Type,
				image_id: element.fields.Pics ? element.fields.Pics[0].url.split("/").pop() + ".jpeg" : '',

			};

			//console.log(`Plante: ${plante.name} - ${plante.image_id ? plante.image_id : 'no image'}`);

			plantes.push(plante);

		}
	}

	return plantes.sort((a, b) => a.name.localeCompare(b.name));
}