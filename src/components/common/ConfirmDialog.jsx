import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";

export default function ConfirmDialog({ open, title, description, onCancel, onConfirm }) {
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs">
      <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
          {description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={1} sx={{ width: "100%", px: 2, pb: 1 }}>
          <Button fullWidth variant="outlined" onClick={onCancel}>
            Скасувати
          </Button>
          <Button fullWidth color="error" variant="contained" onClick={onConfirm}>
            Видалити
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
