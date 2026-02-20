export default function (eleventyConfig) {
  // Update Nunjucks environment options
  eleventyConfig.setNunjucksEnvironmentOptions({
    trimBlocks: true,
    lstripBlocks: true,
  });

  eleventyConfig.addPassthroughCopy("src/assets/img");
  // eleventyConfig.addPassthroughCopy("src/assets/video");
  // eleventyConfig.addPassthroughCopy("src/assets/data");

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "html"],
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
    },
  };
}
