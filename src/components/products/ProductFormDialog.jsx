import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { makeId } from "../../utils/id";

function validate({ name, category, quantity, expiryDate }) {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = "Введи назву (мін. 2 символи).";
  if (!category) errors.category = "Обери категорію.";
  if (quantity === "" || quantity === null || Number.isNaN(Number(quantity))) {
    errors.quantity = "Введи кількість.";
  } else if (Number(quantity) <= 0) {
    errors.quantity = "Кількість має бути > 0.";
  }
  if (!expiryDate || !dayjs(expiryDate).isValid()) errors.expiryDate = "Обери термін придатності.";
  return errors;
}

export default function ProductFormDialog({
  open,
  onClose,
  onSubmit,
  categories,
  initialProduct = null,
}) {
  const isEdit = Boolean(initialProduct?.id);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [expiryDate, setExpiryDate] = useState(dayjs().add(3, "day"));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;

    if (initialProduct) {
      setName(initialProduct.name ?? "");
      setCategory(initialProduct.category ?? "");
      setQuantity(initialProduct.quantity ?? 1);
      setExpiryDate(dayjs(initialProduct.expiryDate));
      setErrors({});
    } else {
      setName("");
      setCategory("");
      setQuantity(1);
      setExpiryDate(dayjs().add(3, "day"));
      setErrors({});
    }
  }, [open, initialProduct]);

  const title = isEdit ? "Редагування продукту" : "Додати продукт";

  const handleSave = () => {
    const payload = {
      name: name.trim(),
      category,
      quantity: Number(quantity),
      expiryDate: dayjs(expiryDate).toISOString(),
    };

    const v = validate(payload);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    if (isEdit) {
      onSubmit({
        ...initialProduct,
        ...payload,
      });
    } else {
      onSubmit({
        id: makeId(),
        ...payload,
        dateAdded: new Date().toISOString(),
        isUsed: false,
        usedAt: null,
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Назва"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
          />

          <FormControl fullWidth error={Boolean(errors.category)}>
            <InputLabel>Категорія</InputLabel>
            <Select
              label="Категорія"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Кількість"
            type="number"
            inputProps={{ min: 1, step: 1 }}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            error={Boolean(errors.quantity)}
            helperText={errors.quantity}
            fullWidth
          />

          <DatePicker
            label="Термін придатності"
            value={expiryDate}
            onChange={(v) => setExpiryDate(v)}
            slotProps={{
              textField: {
                fullWidth: true,
                error: Boolean(errors.expiryDate),
                helperText: errors.expiryDate,
              },
            }}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Скасувати</Button>
        <Button variant="contained" onClick={handleSave}>
          {isEdit ? "Зберегти" : "Додати"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
