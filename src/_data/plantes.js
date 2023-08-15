const EleventyFetch = require("@11ty/eleventy-fetch");
const { env } = require('process');

require('dotenv').config();

module.exports = async function () {


	const API_KEY = process.env.AIRTABLE_API_KEY;
	const BASE_ID = process.env.AIRTABLE_BASE_ID;
	const PLANTS_TABLE_ID = process.env.AIRTABLE_PLANTES_TABLE_ID;
	const PHOTOS_TABLE_ID = process.env.AIRTABLE_PHOTOS_TABLE_ID;



	const fetchPlantsUrl = `https://api.airtable.com/v0/${BASE_ID}/${PLANTS_TABLE_ID}?maxRecords=100&view=ALL`;
	const fetchPhotosUrl = `https://api.airtable.com/v0/${BASE_ID}/${PHOTOS_TABLE_ID}?maxRecords=100&view=ALL`;

	console.log(`fetchUrl: ${fetchPlantsUrl}`)
	let plantsJsonData = await EleventyFetch(fetchPlantsUrl, {
		duration: "5m",
		type: "json",
		verbose: true,
		fetchOptions: {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${API_KEY}`
			}
		}
	});

	let photosJsonData = await EleventyFetch(fetchPhotosUrl, {
		duration: "5m",
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

	for (const key in plantsJsonData.records) {
		if (Object.hasOwnProperty.call(plantsJsonData.records, key)) {

			const plantElement = plantsJsonData.records[key];

			const plantPhotos = photosJsonData.records.filter(photo =>
				photo.fields.Plantes && photo.fields.Plantes[0] === plantElement.id);

			console.log(`plantElement: ${plantElement.fields.Name} - ${plantPhotos.length} photos`);


			let images = [];
			let months = [];
			let image = '';
			let thumbnail = '';

			if (plantElement.fields.hasOwnProperty('Pics')) {
				image = plantElement.fields.Pics[0].thumbnails.large.url;
				months = plantPhotos.map(photo => photo.fields.Mois);
				images = plantElement.fields.Pics.map(pic => pic.thumbnails.large.url);
				thumbnail = plantElement.fields.Pics[0].thumbnails.small.url;
			}


			const plante = {
				name: plantElement.fields.Name,
				type: plantElement.fields.Type,
				link: plantElement.fields["Lien externe"],
				notes: plantElement.fields.Notes,
				image: image,
				thumbnail: thumbnail,
				type: plantElement.fields.Type,
				image_id: plantElement.fields.Pics ? plantElement.fields.Pics[0].url.split("/").pop() + ".jpeg" : '',
				thumnail_id: plantElement.fields.Pics ? plantElement.fields.Pics[0].thumbnails.large.url.split("/").pop() + ".jpeg" : '',
				images: images,
				months: months

			};

			console.log(`Plante: ${plante.name} - ${plante.image_id ? plante.image_id : 'no image'}`);

			plantes.push(plante);

		}
	}

	return plantes.sort((a, b) => a.name.localeCompare(b.name));
} 	