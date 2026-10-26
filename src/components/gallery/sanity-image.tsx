"use client";

import Image from "next/image";
import { imageAt, type SanityImage as Img } from "@/sanity/types";

/** A Sanity CDN image through next/image, with its blurred placeholder while it loads. */
export function SanityImage({ image, sizes, className, priority }: { image: Img; sizes: string; className?: string; priority?: boolean }) {
  return (
    <Image
      src={image.url}
      loader={({ src, width }) => imageAt(src, width)}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      placeholder={image.lqip ? "blur" : "empty"}
      blurDataURL={image.lqip}
      className={className}
    />
  );
}
