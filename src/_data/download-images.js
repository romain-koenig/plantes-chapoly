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


function downloadImage(imageUrl) {
	// Get the image filename from the URL
	const imageFilename = imageUrl.split("/").pop();
	// Create a write stream to save the image locally
	const file = fs.createWriteStream(`${IMAGE_FOLDER}/${imageFilename}.jpeg`);
	// Make a request to download the image and pipe it to the file stream
	https.get(imageUrl, function (response) {
		response.pipe(file);
		console.log(`Downloaded ${imageFilename}`);
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
		// Get the image URLs from the Photo field
		const imageUrls = record.get("Pics") ? record.get("Pics").map(pic => pic.url) : [];

		if (!imageUrls.length) return;

		console.log(`Processing ${record.get("Name")}`);

		// Loop through all image URLs and download them
		imageUrls.forEach(imageUrl => {
			downloadImage(imageUrl);
		});
	});


	// Fetch next page of records if there are more pages
	fetchNextPage();

}, function done(err) {
	if (err) { console.error(err); return; }
});