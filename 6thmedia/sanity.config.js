import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";

// import your schemas
import photo from "./schemaTypes/photo";

export default defineConfig({
  name: "default",
  title: "6thMedia Studio",

  projectId: "htebr8pi", // replace with your actual projectId
  dataset: "production",

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [photo], // <-- this registers your photo schema
  },

  //   studio: {
  //   title: '6thMedia',
  //   hostname: 'admin.media',
  // },
});
