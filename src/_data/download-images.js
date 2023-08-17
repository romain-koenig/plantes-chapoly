const https = require("https");
const fs = require("fs");
const plantesData = require('./plantes.js');

const IMAGE_FOLDER = "public/images/plantes";

// Check if folder exists or create one
if (!fs.existsSync(IMAGE_FOLDER)) {
	fs.mkdirSync(IMAGE_FOLDER, { recursive: true });
}

function downloadImage(imageUrl, details) {
	const imageFilename = imageUrl.split("/").pop().concat(".jpeg");

	// Check if file already exists
	if (fs.existsSync(`${IMAGE_FOLDER}/${imageFilename}`)) {
		console.log(`File ${imageFilename} for ${details} already exists. Skipping download.`);
		return;
	}

	const file = fs.createWriteStream(`${IMAGE_FOLDER}/${imageFilename}`);
	https.get(imageUrl, function (response) {
		response.pipe(file);
	});
}

async function main() {
	const plantes = await plantesData();

	plantes.forEach(plante => {
		const plantName = plante.name;
		// console.log(`Processing ${plantName}`);

		plante.photo_infos.forEach(pic => {
			// Download original size
			downloadImage(pic.full_photo_url, `${plantName} (full)`);

			// Download small size
			downloadImage(pic.small_photo_url, `${plantName} (small)`);

			// Download large size
			downloadImage(pic.large_photo_url, `${plantName} (large)`);
		});
	});
}

main().catch(err => {
	console.error(err);
});
