require('dotenv').config();
const fetchAllRecords = require('./helpers').fetchAllRecords;


function getIdFromUrl(url) {
	return url.split("/").pop();
}


module.exports = async function () {
	const API_KEY = process.env.AIRTABLE_API_KEY;
	const BASE_ID = process.env.AIRTABLE_BASE_ID;
	const PLANTS_TABLE_ID = process.env.AIRTABLE_PLANTES_TABLE_ID;

	const fetchPlantsUrl = `https://api.airtable.com/v0/${BASE_ID}/${PLANTS_TABLE_ID}?maxRecords=100&view=ALL`;


	const plantsJsonData = await fetchAllRecords(fetchPlantsUrl, API_KEY);


	console.log(`Plants: ${plantsJsonData.length}`);


	const plantes = [];

	for (const key in plantsJsonData) {

		if (Object.hasOwnProperty.call(plantsJsonData, key)) {
			const plantElement = plantsJsonData[key];


			const fields = plantElement.fields;

			let pics = [];
			if (fields.Pics) {
				pics = fields.Pics.map(pic => {

					const picinfos = {
						"photo_id": pic.id,
						"small_photo_url": pic.thumbnails.small.url,
						"large_photo_url": pic.thumbnails.large.url,
						"full_photo_url": pic.url,
						"thumbnail_id": getIdFromUrl(pic.thumbnails.large.url),
						"large_photo_id": getIdFromUrl(pic.thumbnails.large.url),
						"small_photo_id": getIdFromUrl(pic.thumbnails.small.url),
						"full_photo_id": getIdFromUrl(pic.url),
					};
					console.log(picinfos);
					return picinfos;

				});

			}
			//console.log(fields);

			const plante = {
				name: fields.Name || '',
				type: fields.Type || '',
				link: fields["Lien externe"] || '',
				notes: fields.Notes || '',
				main_image_id: fields.Pics && fields.Pics[0].id ? fields.Pics[0].id : '',
				thumbnail_id: fields.Pics && fields.Pics[0].thumbnails && fields.Pics[0].thumbnails.large ? fields.Pics[0].thumbnails.large.url.split("/").pop() : '',
				photo_infos: pics

			};

			//console.log(plante);

			plantes.push(plante);
		}
	}

	const sortedPlantes = plantes.sort((a, b) => a.name.localeCompare(b.name));
	//console.log(sortedPlantes);
	return sortedPlantes;
}
