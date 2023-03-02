const htmlmin = require("html-minifier");

// Eleventy config file

module.exports = function (eleventyConfig) {

	eleventyConfig.addPassthroughCopy("./src/css/");
	eleventyConfig.addPassthroughCopy("./src/js/");

	eleventyConfig.addWatchTarget("./src/js/");
	eleventyConfig.addWatchTarget("./src/css/");

	eleventyConfig.addPassthroughCopy("src/images");
	eleventyConfig.addPassthroughCopy("src/favicon");


	// eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
	// 	// Eleventy 1.0+: use this.inputPath and this.outputPath instead
	// 	if (outputPath && outputPath.endsWith(".html")) {
	// 		let minified = htmlmin.minify(content, {
	// 			useShortDoctype: true,
	// 			removeComments: true,
	// 			collapseWhitespace: true
	// 		});
	// 		return minified;
	// 	}

	// 	return content;
	// });


	return {
		dir: {
			input: "src",
			output: "public",
		},
	};
};