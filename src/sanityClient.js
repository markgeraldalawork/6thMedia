import { createClient } from "@sanity/client";

// Sanity client
export const client = createClient({
  projectId: "htebr8pi",
  dataset: "production",
  apiVersion: "2024-01-14",
  useCdn: false,
});

// Helper to fetch all photos
export const fetchPhotos = async () => {
  try {
    const query = `*[_type == "photo"] | order(order asc) {
      _id,
      category,
      "imageUrl": image.asset->url
    }`;
    const photos = await client.fetch(query);
    return photos;
  } catch (err) {
    console.error("Error fetching photos:", err);
    return [];
  }
};