import { alpha, createTheme } from "@mui/material/styles";

const LIGHT = {
  primary: { main: "#2E7D32", light: "#60AD5E", dark: "#005005" },
  secondary: { main: "#81C784", light: "#B2FAB4", dark: "#519657" },

  success: { main: "#2E7D32" },
  warning: { main: "#F9A825" },
  error: { main: "#D32F2F" },

  background: { default: "#F9FAF7", paper: "#FFFFFF" },
  divider: "#E0E0E0",
  text: { primary: "#1C1C1C", secondary: "#616161", disabled: "#9E9E9E" },
};

const DARK = {
  primary: { main: "#81C784" },
  secondary: { main: "#A5D6A7" },

  success: { main: "#81C784" },
  warning: { main: "#FFB300" },
  error: { main: "#EF5350" },

  background: { default: "#121212", paper: "#1E1E1E" },
  divider: alpha("#FFFFFF", 0.12),
  text: { primary: "#FFFFFF", secondary: "#BDBDBD", disabled: alpha("#FFFFFF", 0.5) },
};

export function buildTheme(mode) {
  const p = mode === "dark" ? DARK : LIGHT;

  return createTheme({
    palette: {
      mode,
      primary: p.primary,
      secondary: p.secondary,
      success: p.success,
      warning: p.warning,
      error: p.error,
      background: p.background,
      divider: p.divider,
      text: p.text,
    },

    shape: { borderRadius: 14 },

    typography: {
      fontFamily:
        'Inter, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif',
      h5: { fontWeight: 800, letterSpacing: -0.3 },
      h6: { fontWeight: 800, letterSpacing: -0.2 },
      button: { textTransform: "none", fontWeight: 700 },
    },

    shadows: [
      "none",
      "0px 1px 2px rgba(0,0,0,0.06)",
      "0px 2px 8px rgba(0,0,0,0.08)",
      "0px 6px 16px rgba(0,0,0,0.10)",
      ...Array(21).fill("0px 10px 30px rgba(0,0,0,0.12)"),
    ],

    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          body: {
            background: theme.palette.background.default,
          },
          "*::selection": {
            background: alpha(theme.palette.primary.main, 0.22),
          },
        }),
      },

      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            background: alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.75 : 0.9),
            color: theme.palette.text.primary,
            backdropFilter: "blur(10px)",
            borderBottom: `1px solid ${theme.palette.divider}`,
          }),
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: "none",
          }),
        },
      },

      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[2],
            transition: "transform 140ms ease, box-shadow 140ms ease",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: theme.shadows[3],
            },
          }),
        },
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 12,
            paddingInline: 14,
          }),
          containedPrimary: ({ theme }) => ({
            background: theme.palette.primary.main,
          }),
          containedSecondary: ({ theme }) => ({
            background: theme.palette.secondary.main,
            color: theme.palette.mode === "dark" ? "#0D0D0D" : theme.palette.text.primary,
          }),
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            fontWeight: 700,
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRadius: 18,
            border: `1px solid ${theme.palette.divider}`,
          }),
        },
      },

      MuiTextField: {
        defaultProps: {
          size: "small",
        },
      },

      MuiSelect: {
        defaultProps: {
          size: "small",
        },
      },

      MuiTableHead: {
        styleOverrides: {
          root: ({ theme }) => ({
            background: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.12 : 0.06),
          }),
        },
      },

      MuiTableRow: {
        styleOverrides: {
          root: ({ theme }) => ({
            "& td": { borderColor: theme.palette.divider },
          }),
        },
      },
    },
  });
}
