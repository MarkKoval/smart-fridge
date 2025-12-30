import { alpha, createTheme } from "@mui/material/styles";

const IOS = {
  primary: { main: "#34C759", light: "#4CD964", dark: "#248A3D" },
  secondary: { main: "#0A84FF", light: "#5AC8FA", dark: "#0060DF" },
  success: { main: "#34C759" },
  warning: { main: "#FF9F0A" },
  error: { main: "#FF453A" },
  background: { default: "#F2F2F7", paper: "#FFFFFF" },
  divider: "#D1D1D6",
  text: { primary: "#1C1C1E", secondary: "#636366", disabled: "#8E8E93" },
};

export function buildTheme(mode) {
  const p = IOS;

  return createTheme({
    palette: {
      mode: "light",
      primary: p.primary,
      secondary: p.secondary,
      success: p.success,
      warning: p.warning,
      error: p.error,
      background: p.background,
      divider: p.divider,
      text: p.text,
    },

    shape: { borderRadius: 16 },

    typography: {
      fontFamily:
        '"SF Pro Text", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
      h5: { fontWeight: 700, letterSpacing: -0.2 },
      h6: { fontWeight: 700, letterSpacing: -0.1 },
      subtitle1: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },

    shadows: [
      "none",
      "0px 1px 2px rgba(0,0,0,0.04)",
      "0px 4px 10px rgba(0,0,0,0.08)",
      "0px 10px 20px rgba(0,0,0,0.12)",
      ...Array(21).fill("0px 20px 40px rgba(0,0,0,0.14)"),
    ],

    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          body: {
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            WebkitFontSmoothing: "antialiased",
          },
          "*::selection": {
            background: alpha(theme.palette.primary.main, 0.22),
          },
        }),
      },

      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            background: alpha(theme.palette.background.paper, 0.85),
            color: theme.palette.text.primary,
            backdropFilter: "blur(18px)",
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
          }),
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: "none",
            borderRadius: theme.shape.borderRadius,
          }),
        },
      },

      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
            boxShadow: theme.shadows[1],
            transition: "transform 140ms ease, box-shadow 140ms ease",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: theme.shadows[2],
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
            borderRadius: 999,
            paddingInline: 18,
            paddingBlock: 8,
          }),
          containedPrimary: ({ theme }) => ({
            background: "linear-gradient(180deg, #4CD964 0%, #34C759 100%)",
            boxShadow: "0 10px 20px rgba(52,199,89,0.25)",
          }),
          containedSecondary: ({ theme }) => ({
            background: "linear-gradient(180deg, #5AC8FA 0%, #0A84FF 100%)",
            color: "#FFFFFF",
          }),
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            fontWeight: 700,
            backgroundColor: alpha("#34C759", 0.12),
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRadius: 24,
            border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
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

      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 48,
            height: 28,
            padding: 0,
          },
          switchBase: {
            padding: 2,
            "&.Mui-checked": {
              transform: "translateX(20px)",
              color: "#fff",
              "& + .MuiSwitch-track": {
                backgroundColor: "#34C759",
                opacity: 1,
              },
            },
          },
          thumb: {
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            width: 24,
            height: 24,
            borderRadius: 12,
          },
          track: {
            borderRadius: 14,
            backgroundColor: alpha("#8E8E93", 0.4),
            opacity: 1,
          },
        },
      },

      MuiTableHead: {
        styleOverrides: {
          root: ({ theme }) => ({
            background: alpha(theme.palette.primary.main, 0.08),
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
