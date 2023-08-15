const groupBy = require("./src/_filters/group-by");

// Eleventy config file

module.exports = function (eleventyConfig) {

	eleventyConfig.addPassthroughCopy("./src/css/");
	eleventyConfig.addPassthroughCopy("./src/js/");

	eleventyConfig.addWatchTarget("./src/js/");
	eleventyConfig.addWatchTarget("./src/css/");

	eleventyConfig.addPassthroughCopy("src/images");
	eleventyConfig.addPassthroughCopy("src/favicon");


	eleventyConfig.addCollection("months", async (collectionApi) => {
		const allPhotos = await collectionApi.getFilteredByGlob("./src/photos/*.json");
		const months = [...new Set(allPhotos.map((photo) => photo.data.Mois))];
		return months;
	});

	function groupByMonth(photos) {
		return photos.reduce((acc, photo) => {
			const month = photo.data.Mois;
			if (!acc[month]) {
				acc[month] = [];
			}
			acc[month].push(photo);
			return acc;
		}, {});
	}


	eleventyConfig.addFilter("groupBy", groupBy);

	eleventyConfig.addFilter("get", function (obj, key) {
		return obj[key];
	});

	eleventyConfig.addCollection("photosByMonth", (collectionApi) => {
		const allPhotos = collectionApi.getFilteredByGlob("./src/photos/*.json");
		console.log(`allPhotos: ${allPhotos}`);
		return groupByMonth(allPhotos);
	});




	return {
		dir: {
			input: "src",
			output: "public",
		},
	};
};