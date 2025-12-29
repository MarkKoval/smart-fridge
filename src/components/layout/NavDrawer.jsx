import React from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import KitchenIcon from "@mui/icons-material/Kitchen";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  color: "inherit",
  display: "block",
  borderRadius: 12,
  margin: "4px 8px",
  background: isActive ? "rgba(25, 118, 210, 0.12)" : "transparent",
});

export default function NavDrawer({ onNavigate }) {
  return (
    <div>
      <Toolbar />
      <Divider />
      <List sx={{ py: 1 }}>
        <NavLink to="/" style={linkStyle} onClick={onNavigate}>
          <ListItemButton sx={{ borderRadius: 2 }}>
            <ListItemIcon>
              <KitchenIcon />
            </ListItemIcon>
            <ListItemText primary="Продукти" secondary="Активні в холодильнику" />
          </ListItemButton>
        </NavLink>

        <NavLink to="/used" style={linkStyle} onClick={onNavigate}>
          <ListItemButton sx={{ borderRadius: 2 }}>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Використані" secondary="Історія" />
          </ListItemButton>
        </NavLink>
      </List>
    </div>
  );
}
