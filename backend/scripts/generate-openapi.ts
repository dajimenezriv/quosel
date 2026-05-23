import { writeFileSync } from "node:fs";
import { app, openApiDoc } from "../src/app.ts";

const doc = app.getOpenAPI31Document(openApiDoc);

const outPath = new URL("../openapi.json", import.meta.url);
writeFileSync(outPath, JSON.stringify(doc, null, 2) + "\n");

console.log(`Wrote ${outPath.pathname}`);
