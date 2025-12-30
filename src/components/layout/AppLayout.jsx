import React, { useMemo, useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useTheme } from "@mui/material/styles";
import NavDrawer from "./NavDrawer";
import { getExpiryStatus } from "../../utils/date";

const DRAWER_WIDTH = 280;

export default function AppLayout({ children, products }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const expiredCount = useMemo(() => {
    return products
      .filter((p) => !p.isUsed)
      .filter((p) => getExpiryStatus(p.expiryDate).key === "expired").length;
  }, [products]);

  const handleDrawerToggle = () => setMobileOpen((v) => !v);

  const drawer = (
    <NavDrawer onNavigate={() => isMobile && setMobileOpen(false)} />
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" color="default" elevation={0}>
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 700,
            }}
          >
            <span style={{ fontSize: 18 }}>🌿</span> Розумний холодильник
          </Typography>

          <Badge
            badgeContent={expiredCount}
            color="error"
            sx={{ mr: 1 }}
            title="Кількість прострочених"
          >
            <ReportProblemIcon />
          </Badge>

        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        aria-label="navigation"
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                width: DRAWER_WIDTH,
                backgroundColor: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(20px)",
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            open
            sx={{
              "& .MuiDrawer-paper": {
                width: DRAWER_WIDTH,
                boxSizing: "border-box",
                backgroundColor: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(20px)",
              },
            }}
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          px: { xs: 2.5, sm: 3.5, md: 4 },
          pb: { xs: 3, sm: 4 },
          pt: { xs: 10, sm: 11 },
          maxWidth: 1180,
          mx: { xs: 0, md: 0 },
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
