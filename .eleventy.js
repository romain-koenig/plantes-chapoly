const htmlmin = require("html-minifier");

const fs = require("fs");

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


	// HUMANS.TXT

	// Add as a valid extension to process
	// Alternatively, add this to the list of formats you pass to the `--formats` CLI argument
	// eleventyConfig.addTemplateFormats("txt");

	// eleventyConfig.addExtension("txt", {
	// 	compile: async (inputContent) => {

	// 		let output = inputContent.replace(/{DATE}/gi, new Date().toISOString().slice(0, 10));

	// 		return async () => {
	// 			return output;
	// 		};
	// 	}
	// });

	// eleventyConfig.addExtension("txt", {
	// 	compile: async (inputPath) => {
	// 		const inputContent = await fs.promises.readFile(inputPath, "utf-8");
	// 		const output = inputContent.replace(
	// 			/{DATE}/gi,
	// 			new Date().toISOString().slice(0, 10)
	// 		);
	// 		return async () => {
	// 			return output;
	// 		};
	// 	},
	// });


	return {
		dir: {
			input: "src",
			output: "public",
		},
	};
};