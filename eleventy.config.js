import prettier from "prettier";

export default function (eleventyConfig) {
    // update njk environment options
    eleventyConfig.setNunjucksEnvironmentOptions({
        trimBlocks: true,
        lstripBlocks: true,
    });

    eleventyConfig.setServerOptions({
        // reload on css/js output change
        watch: ["public/assets/**/*.css", "public/assets/**/*.js"],
        // show network url for mobile preview
        showAllHosts: true,
    });

    // page slots for base.njk
    eleventyConfig.addBundle("styles");
    eleventyConfig.addBundle("headerscript");
    eleventyConfig.addBundle("popup");
    eleventyConfig.addBundle("footerscript");

    // port the assets
    eleventyConfig.addPassthroughCopy("src/assets/img");
    eleventyConfig.addPassthroughCopy({ "src/assets/favicon": "favicon" });
    // eleventyConfig.addPassthroughCopy("src/assets/video");
    // eleventyConfig.addPassthroughCopy("src/assets/data");

    // prettify HTML
    eleventyConfig.addTransform("prettify-html", function (content, outputPath) {
        if (outputPath && outputPath.endsWith(".html")) {
            return prettier.format(content, {
                parser: "html",
                printWidth: 300,
                tabWidth: 4,
            });
        }
        return content;
    });

    return {
        markdownTemplateEngine: "njk",
        dir: {
            input: "src",
            output: "public",
            includes: "_includes",
        },
    };
}
