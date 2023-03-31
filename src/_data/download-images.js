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

// Create a folder to store the images
const IMAGE_FOLDER = "public/images/plantes";
if (!fs.existsSync(IMAGE_FOLDER)) {
	fs.mkdirSync(IMAGE_FOLDER, { recursive: true });
}

// Fetch the records from Airtable
base(AIRTABLE_TABLE_NAME).select().eachPage(function page(records, fetchNextPage) {

	// Loop through each record
	records.forEach(function (record) {

		// Message to show at which plant we are

		// Get the image URL from the Photo field
		const imageUrl = record.get("Pics") ? record.get("Pics")[0].url : "";

		if (!imageUrl) return;

		console.log(`Processing ${record.get("Name")}`);

		// Get the image filename from the URL
		const imageFilename = imageUrl.split("/").pop();
		// Create a write stream to save the image locally
		const file = fs.createWriteStream(`${IMAGE_FOLDER}/${imageFilename}.jpeg`);
		// Make a request to download the image and pipe it to the file stream
		https.get(imageUrl, function (response) {
			response.pipe(file);
			console.log(`Downloaded ${imageFilename}`);
		});
	});

	// Fetch next page of records if there are more pages
	fetchNextPage();

}, function done(err) {
	if (err) { console.error(err); return; }
});