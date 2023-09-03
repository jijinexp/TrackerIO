import {createContext, useMemo, useState} from "react";
import {createTheme} from "@mui/material/styles";
import {PaletteMode, Theme, ThemeOptions} from "@mui/material";

export interface Colours {
    Grey: ColourTokens,
    Primary: ColourTokens,
    RedAccent: ColourTokens,
    GreenAccent: ColourTokens,
    BlueAccent: ColourTokens
}

interface ColourTokens {
    CT100: string,
    CT200: string,
    CT300: string,
    CT400: string,
    CT500: string,
    CT600: string,
    CT700: string,
    CT800: string,
    CT900: string,
}


// color design tokens export
export const tokens = (mode: string): Colours => {
    const darkModeTokens: Colours = {
        Grey: getToken(
            "#e0e0e0",
            "#c2c2c2",
            "#a3a3a3",
            "#858585",
            "#666666",
            "#525252",
            "#3d3d3d",
            "#292929",
            "#141414"),
        Primary: getToken(
            "#d0d1d5",
            "#a1a4ab",
            "#727681",
            "#1F2A40",
            "#141b2d",
            "#101624",
            "#0c101b",
            "#080b12",
            "#040509"),
        GreenAccent: getToken(
            "#dbf5ee",
            "#b7ebde",
            "#94e2cd",
            "#70d8bd",
            "#4cceac",
            "#3da58a",
            "#2e7c67",
            "#1e5245",
            "#0f2922"),
        RedAccent: getToken(
            "#f8dcdb",
            "#f1b9b7",
            "#e99592",
            "#e2726e",
            "#db4f4a",
            "#af3f3b",
            "#832f2c",
            "#58201e",
            "#2c100f",
        ),
        BlueAccent: getToken(
            "#e1e2fe",
            "#c3c6fd",
            "#a4a9fc",
            "#868dfb",
            "#6870fa",
            "#535ac8",
            "#3e4396",
            "#2a2d64",
            "#151632",
        ),
    }
    const lightModeTokens: Colours = {
        Grey: getToken(
            "#141414",
            "#292929",
            "#3d3d3d",
            "#525252",
            "#666666",
            "#858585",
            "#a3a3a3",
            "#c2c2c2",
            "#e0e0e0",
        ),
        Primary: getToken(
            "#040509",
            "#080b12",
            "#0c101b",
            "#f2f0f0", // manually changed
            "#141b2d",
            "#1F2A40",
            "#727681",
            "#a1a4ab",
            "#d0d1d5",
        ),
        GreenAccent: getToken(
            "#0f2922",
            "#1e5245",
            "#2e7c67",
            "#3da58a",
            "#4cceac",
            "#70d8bd",
            "#94e2cd",
            "#b7ebde",
            "#dbf5ee",
        ),
        RedAccent: getToken(
            "#2c100f",
            "#58201e",
            "#832f2c",
            "#af3f3b",
            "#db4f4a",
            "#e2726e",
            "#e99592",
            "#f1b9b7",
            "#f8dcdb",
        ),
        BlueAccent: getToken(
            "#151632",
            "#2a2d64",
            "#3e4396",
            "#535ac8",
            "#6870fa",
            "#868dfb",
            "#a4a9fc",
            "#c3c6fd",
            "#e1e2fe",
        ),
    }
    return {
        ...(mode === "dark"
            ? darkModeTokens
            : lightModeTokens),
    }
};

function getToken(C100: string, C200: string, C300: string, C400: string, C500: string, C600: string,
                  C700: string, C800: string, C900: string): ColourTokens {
    return {
        CT100: C100,
        CT200: C200,
        CT300: C300,
        CT400: C400,
        CT500: C500,
        CT600: C600,
        CT700: C700,
        CT800: C800,
        CT900: C900
    };
}

// context for color mode
export const themeSettings = (mode: PaletteMode): ThemeOptions => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        main: colors.Primary.CT500,
                    },
                    secondary: {
                        main: colors.GreenAccent.CT500,
                    },
                    neutral: {
                        dark: colors.Grey.CT700,
                        main: colors.Grey.CT500,
                        light: colors.Grey.CT100,
                    },
                    background: {
                        default: colors.Primary.CT500,
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        main: colors.Primary.CT500,
                    },
                    secondary: {
                        main: colors.GreenAccent.CT500,
                    },
                    neutral: {
                        dark: colors.Grey.CT700,
                        main: colors.Grey.CT500,
                        light: colors.Grey.CT100,
                    },
                    background: {
                        default: "#fcfcfc",
                    },
                }),
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {
    },
});

export const useMode = (): [Theme, { toggleColorMode: () => void }] => {
    const [mode, setMode] = useState<PaletteMode>("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};