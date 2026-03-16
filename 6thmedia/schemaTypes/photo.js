export default {
  name: "photo",
  type: "document",
  title: "Photo",
  fields: [
    {
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          "Studio Session",
          "Wedding Coverage",
          "Uncovered Yet Concealed",
          "Portrait Session",
        ],
      },
    },
    {
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
    },
    {
      name: "order",
      type: "number",
      title: "Order",
    },
  ],
};
