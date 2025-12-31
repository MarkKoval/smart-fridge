import React, { useMemo, useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { alpha, useTheme } from "@mui/material/styles";
import NavDrawer from "./NavDrawer";
import { getExpiryStatus } from "../../utils/date";

const DRAWER_WIDTH = 280;

export default function AppLayout({
  children,
  products,
  themeMode,
  onToggleTheme,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expiredOpen, setExpiredOpen] = useState(false);

  const expiredCount = useMemo(() => {
    return products
      .filter((p) => !p.isUsed)
      .filter((p) => getExpiryStatus(p.expiryDate).key === "expired").length;
  }, [products]);

  const expiredProducts = useMemo(() => {
    return products
      .filter((p) => !p.isUsed)
      .filter((p) => getExpiryStatus(p.expiryDate).key === "expired");
  }, [products]);

  const handleDrawerToggle = () => setMobileOpen((v) => !v);

  const drawer = (
    <NavDrawer onNavigate={() => isMobile && setMobileOpen(false)} />
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
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
              color: "text.primary",
            }}
          >
            <span style={{ fontSize: 18 }}>🌿</span> Розумний холодильник
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Badge
              badgeContent={expiredCount}
              color="error"
              title="Кількість прострочених"
            >
              <IconButton
                color="inherit"
                aria-label="Переглянути прострочені продукти"
                onClick={() => setExpiredOpen(true)}
              >
                <ReportProblemIcon />
              </IconButton>
            </Badge>
            <IconButton
              color="inherit"
              onClick={onToggleTheme}
              aria-label="Перемкнути тему"
            >
              {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog
        open={expiredOpen}
        onClose={() => setExpiredOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Прострочені продукти</DialogTitle>
        <DialogContent>
          {expiredProducts.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Немає прострочених продуктів.
            </Typography>
          ) : (
            <List dense>
              {expiredProducts.map((product) => (
                <ListItem key={product.id} divider>
                  <ListItemText
                    primary={product.name}
                    secondary={`${product.category} • ${product.quantity}${product.unit ? ` ${product.unit}` : ""}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>

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
                backgroundColor: alpha(theme.palette.background.paper, 0.92),
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
                backgroundColor: alpha(theme.palette.background.paper, 0.92),
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
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          px: { xs: 2, sm: 3 },
          pb: { xs: 3, sm: 4 },
          pt: { xs: 10, sm: 11 },
          maxWidth: 1180,
          mx: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
