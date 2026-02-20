export default function (eleventyConfig) {
  // update Nunjucks environment options
  eleventyConfig.setNunjucksEnvironmentOptions({
    trimBlocks: true,
    lstripBlocks: true,
  });

  // watch css change
  eleventyConfig.addWatchTarget("src/assets/css/");

  // port the assets
  eleventyConfig.addPassthroughCopy("src/assets/img");
  // eleventyConfig.addPassthroughCopy("src/assets/video");
  // eleventyConfig.addPassthroughCopy("src/assets/data");

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
    },
  };
}
