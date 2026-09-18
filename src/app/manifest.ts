import type { MetadataRoute } from "next";

import { SITE } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} ${SITE.nameEn}`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F3EA",
    theme_color: "#20382F",
    lang: "ko",
    icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
