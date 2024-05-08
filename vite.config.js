/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  mode: "development",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTest.js",
  },
});
