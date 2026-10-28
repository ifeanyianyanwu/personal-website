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
      title: "Photos and clips",
      description: "In the order they appear. Start with a photo: it's the cover and the gallery thumbnail.",
      type: "array",
      validation: (r) =>
        r
          .required()
          .min(1)
          .custom((items: { _type: string }[] | undefined) =>
            items?.[0]?._type === "image" ? true : "Start with a photo: it's the cover and the gallery thumbnail.",
          ),
      of: [
        defineArrayMember({
          type: "image",
          title: "Photo",
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
        defineArrayMember({
          type: "object",
          name: "clip",
          title: "Clip",
          fields: [
            defineField({
              name: "video",
              type: "file",
              description: "MP4 or WebM, about 5 to 15 seconds and under 20 MB. It plays muted on a loop.",
              options: { accept: "video/mp4,video/webm" },
              validation: (r) => [
                r.required(),
                r
                  .custom(async (value: { asset?: { _ref: string } } | undefined, context) => {
                    if (!value?.asset?._ref) return true;
                    const size = await context.getClient({ apiVersion: "2024-01-01" }).fetch<number | null>("*[_id == $id][0].size", { id: value.asset._ref });
                    return !size || size <= 20e6 ? true : `This clip is ${Math.round(size / 1e6)} MB. Under 20 MB keeps the page quick on phones.`;
                  })
                  .warning(),
              ],
            }),
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
              description: "What happens in the clip, for screen readers",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "poster",
              type: "image",
              description: "Optional still shown before it plays. Without one, the first frame is used.",
            }),
          ],
          preview: { select: { title: "alt", media: "poster" }, prepare: ({ title, media }) => ({ title: title || "Clip", subtitle: "Clip", media }) },
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
  preview: { select: { title: "title", subtitle: "category", media: "images.0" } }, // the cover is always a photo
});
