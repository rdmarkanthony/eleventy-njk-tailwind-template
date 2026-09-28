import esbuild from "esbuild";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ quiet: true });

const isWatch = process.argv.includes("--watch");

// expose PUBLIC_ env to the bundle
const publicEnv = Object.fromEntries(
    Object.entries(process.env)
        .filter(([key]) => key.startsWith("PUBLIC_"))
        .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
);

const ctx = await esbuild.context({
    entryPoints: ["src/assets/js/script.js"],
    bundle: true,
    minify: !isWatch,
    sourcemap: isWatch,
    outfile: "public/assets/js/script.js",
    format: "esm",
    target: ["es2020"],
    define: publicEnv,
});

if (isWatch) {
    await ctx.rebuild();
    await ctx.watch();
    console.log("DEV: Watching JS files for changes...");
} else {
    await ctx.rebuild();
    await ctx.dispose();
    console.log("BUILD: JS build complete");
}
