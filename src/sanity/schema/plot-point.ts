import { defineArrayMember, defineField, defineType } from "sanity";
import { categories } from "../types";

/** One gallery item: a dish, a sketch, a place, a game, a build, a moment. */
export const plotPoint = defineType({
  name: "plotPoint",
  title: "Plot point",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "date", type: "date", validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: { list: [...categories], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", type: "string", description: "City or country, e.g. Malta" }),
    defineField({ name: "tags", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
    defineField({
      name: "images",
      type: "array",
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
              description: "What's in the photo, for screen readers",
              validation: (r) => r.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({ name: "caption", type: "text", rows: 3 }),
    defineField({
      name: "recipe",
      type: "text",
      rows: 6,
      description: "Food only: the short version of how you made it",
      hidden: ({ document }) => document?.category !== "Food",
    }),
  ],
  orderings: [{ title: "Newest", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "images.0" } },
});
