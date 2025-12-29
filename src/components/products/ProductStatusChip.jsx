import React from "react";
import { Chip } from "@mui/material";
import { getExpiryStatus } from "../../utils/date";

export default function ProductStatusChip({ expiryDate }) {
  const s = getExpiryStatus(expiryDate);

  if (s.key === "expired") {
    return <Chip size="small" label="Прострочено" color="error" />;
  }
  if (s.key === "warning") {
    return <Chip size="small" label="Закінчується" color="warning" />;
  }
  return <Chip size="small" label="Свіже" color="success" />;
}
