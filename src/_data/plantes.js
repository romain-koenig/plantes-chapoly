const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {


	// This API Key is READONLY, on public data, this is under control
	// PAT = Personal Access Token just for PLANTES CHAPOLY and READONLY	
	const API_KEY = 'patLHqAiBo8dzIASF.0f45667473de73f3a2b8896844509ab82bc7020b191bddcccf71bf3397f4c4a6';
	const BASE_ID = 'appzdjdcihp4nnyZA';
	const TABLE_ID = 'tblVoYkm5qZsZ1iMC';


	let json = await EleventyFetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?maxRecords=100&view=ALL`, {
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

			console.log(element.fields.Name);

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
				// image_full: element.fields.Image[0].thumbnails.full.url,
				// image_large: element.fields.Image[0].thumbnails.large.url,
				// image_small: element.fields.Image[0].thumbnails.small.url,
				// link: element.fields.URL,
				// category: element.fields.Category,
			};

			plantes.push(plante);

		}
	}

	console.log(plantes.map((p) => p.type));

	return plantes.sort((a, b) => a.name.localeCompare(b.name));
}