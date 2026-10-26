import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { plotPoint } from "./src/sanity/schema/plot-point";

export default defineConfig({
  name: "plot-points",
  title: "Plot points",
  basePath: "/studio",
  // "unset" keeps the Studio route building before a project exists; it shows Sanity's setup error until then.
  projectId: projectId || "unset",
  dataset,
  apiVersion,
  schema: { types: [plotPoint] },
  plugins: [structureTool()],
});
