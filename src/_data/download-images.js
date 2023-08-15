// download-images.js
const Airtable = require("airtable");
const https = require("https");
const fs = require("fs");

const { env } = require('process');

require('dotenv').config();

// Initialize Airtable with your API key and base ID
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_PLANTES_TABLE_ID;

console.log(`AIRTABLE_API_KEY: ${AIRTABLE_API_KEY}`);

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);


function downloadImage(imageUrl, details) {
	const imageFilename = imageUrl.split("/").pop();

	// Check if file already exists
	if (fs.existsSync(`${IMAGE_FOLDER}/${imageFilename}.jpeg`)) {
		console.log(`File ${imageFilename} for ${details} already exists. Skipping download.`);
		return;
	}

	const file = fs.createWriteStream(`${IMAGE_FOLDER}/${imageFilename}.jpeg`);
	https.get(imageUrl, function (response) {
		response.pipe(file);
		console.log(`Downloaded ${imageFilename} for ${details}`);
	});
}


// Create a folder to store the images
const IMAGE_FOLDER = "public/images/plantes";
if (!fs.existsSync(IMAGE_FOLDER)) {
	fs.mkdirSync(IMAGE_FOLDER, { recursive: true });
}

// Fetch the records from Airtable
base(AIRTABLE_TABLE_NAME).select().eachPage(function page(records, fetchNextPage) {

	records.forEach(function (record) {
		const pics = record.get("Pics") || [];

		const plantName = record.get("Name");
		console.log(`Processing ${plantName}`);

		pics.forEach(pic => {
			// Download original size
			downloadImage(pic.url, `${plantName} (full)`);

			// Download small size
			if (pic.thumbnails && pic.thumbnails.small) {
				downloadImage(pic.thumbnails.small.url, `${plantName} (small)`);
			}

			// Download large size
			if (pic.thumbnails && pic.thumbnails.large) {
				downloadImage(pic.thumbnails.large.url, `${plantName} (large)`);
			}
		});
	});



	// Fetch next page of records if there are more pages
	fetchNextPage();

}, function done(err) {
	if (err) { console.error(err); return; }
});