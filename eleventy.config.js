export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes"
    },
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "html"]
  };
}