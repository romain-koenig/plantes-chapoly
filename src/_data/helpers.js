const EleventyFetch = require("@11ty/eleventy-fetch");


function currentYear() {
	const today = new Date();
	return today.getFullYear();
}

async function fetchAllRecords(url, apiKey) {
	let allRecords = [];
	let offset = null;

	do {
		const response = await EleventyFetch(`${url}${offset ? `&offset=${offset}` : ''}`, {
			duration: "120m",
			type: "json",
			verbose: true,
			fetchOptions: {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${apiKey}`
				}
			}
		});

		allRecords = allRecords.concat(response.records);
		offset = response.offset; // Si "offset" n'est pas fourni, cela signifie que c'était la dernière page.

	} while (offset);

	return allRecords;
}


function getIdFromUrl(url) {
	return url.split("/").pop();
}

module.exports = {
	currentYear,
	fetchAllRecords,
	getIdFromUrl
};