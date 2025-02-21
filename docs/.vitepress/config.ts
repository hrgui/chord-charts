import { defineConfig } from "vitepress";
import typedocSidebar from "../api/typedoc-sidebar.json";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/chord-charts/",
  title: "Chord Charts",
  description: "A NPM package to transpose and manage chord charts for music",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Demo", link: "/" },
      { text: "API", link: "/api/" },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/hrgui/chord-charts" }],
    sidebar: [
      {
        text: "API",
        items: typedocSidebar,
      },
    ],
  },
});
