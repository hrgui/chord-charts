import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/chord-charts/",
  title: "Chord Charts",
  description: "A NPM package to transpose and manage chord charts for music",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Quickstart", link: "/quickstart" },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/hrgui/chord-charts" }],
  },
});
