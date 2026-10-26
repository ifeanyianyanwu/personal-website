"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

// The Studio config pulls in browser-only code, so it's imported from a client component.
export function Studio() {
  return <NextStudio config={config} />;
}
