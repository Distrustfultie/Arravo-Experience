import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    theme: {
        extend: {
            colors: {
                tomato: {
                    50: "#fff5f3",
                    100: "#ffe7e2",
                    200: "#ffcfc6",
                    300: "#ffad9e",
                    400: "#fb806e",
                    500: "#ef5b47",
                    600: "#df4936",
                    700: "#ba382a",
                    800: "#962d24",
                    900: "#7c2922",
                },
            },
        },
    },

    plugins: [],
};

export default config;