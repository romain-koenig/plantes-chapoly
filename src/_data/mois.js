const plantesData = require('./plantes.js');
require('dotenv').config();
const fetchAllRecords = require('./helpers').fetchAllRecords;

const getIdFromUrl = require('./helpers').getIdFromUrl;

module.exports = async function () {

	console.log("Entered mois.js function");


	const plantesArray = await plantesData();
	const plantes = {};

	plantesArray.forEach(plant => {
		plantes[plant.id] = plant;
	});


	const API_KEY = process.env.AIRTABLE_API_KEY;
	const BASE_ID = process.env.AIRTABLE_BASE_ID;
	const PHOTOS_TABLE_ID = process.env.AIRTABLE_PHOTOS_TABLE_ID;

	const fetchPlantsUrl = `https://api.airtable.com/v0/${BASE_ID}/${PHOTOS_TABLE_ID}?view=ALL`;


	const photosJsonData = await fetchAllRecords(fetchPlantsUrl, API_KEY);

	console.log(`Photos: ${photosJsonData.length}`);


	let organizedData = {};

	photosJsonData.forEach(record => {

		// D'abord, organisez les données par mois.
		let month = record.fields.Mois;

		if (!organizedData[month]) {
			organizedData[month] = {};
		}


		// Ensuite, pour chaque mois, organisez les plantes, si elles existent.

		if (record.fields.Plantes) {

			// s'il y aune plante, il ne devrait y en avoirt qu'une seule (bloqué dans la saisie Airtable)
			record.fields.Plantes.forEach(plantId => {

				if (!organizedData[month][plantId]) {
					organizedData[month][plantId] = [];
				}

				// Pour chaque plante, ajoutez les photos, si elles existent (normalement elles existent, sinon on ne serait pas ici)
				if (record.fields.Photo && record.fields.Photo.length) {
					record.fields.Photo.forEach(photoId => {
						const photo_data =
						{
							"photo_id": photoId.id,
							"small_photo_id": getIdFromUrl(photoId.thumbnails.small.url),
							"large_photo_id": getIdFromUrl(photoId.thumbnails.large.url),
							"full_photo_id": getIdFromUrl(photoId.url),
							"plant_name": plantes[plantId] ? plantes[plantId].name : "Nom inconnu",
						};
						organizedData[month][plantId].push(photo_data);
					});
				}

			});

		}

	});


	return organizedData;
};