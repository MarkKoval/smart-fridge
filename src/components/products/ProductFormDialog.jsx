import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { makeId } from "../../utils/id";

const unitOptions = [
  { value: "Pck", label: "Пакунок (Pck)" },
  { value: "Unit", label: "Одиниця (Unit)" },
  { value: "kg", label: "Кілограми (kg)" },
  { value: "g", label: "Грами (g)" },
  { value: "L", label: "Літри (L)" },
  { value: "mL", label: "Мілілітри (mL)" },
];

function validate({ name, category, quantity, expiryDate, unit }) {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = "Введи назву (мін. 2 символи).";
  if (!category) errors.category = "Обери категорію.";
  if (!unit) errors.unit = "Обери одиницю.";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("Pck");
  const [expiryDate, setExpiryDate] = useState(dayjs().add(3, "day"));
  const [errors, setErrors] = useState({});
  const [unitAnchor, setUnitAnchor] = useState(null);

  useEffect(() => {
    if (!open) return;

    if (initialProduct) {
      setName(initialProduct.name ?? "");
      setCategory(initialProduct.category ?? "");
      setQuantity(initialProduct.quantity ?? 1);
      setUnit(initialProduct.unit ?? "Pck");
      setExpiryDate(dayjs(initialProduct.expiryDate));
      setErrors({});
    } else {
      setName("");
      setCategory("");
      setQuantity(1);
      setUnit("Pck");
      setExpiryDate(dayjs().add(3, "day"));
      setErrors({});
    }
  }, [open, initialProduct]);

  const title = isEdit ? "Редагування продукту" : "Додати продукт";
  const selectedUnitLabel = useMemo(
    () => unitOptions.find((option) => option.value === unit)?.label ?? unit,
    [unit],
  );
  const isUnitMenuOpen = Boolean(unitAnchor);
  const sheetBackground = theme.palette.mode === "dark" ? "#1C1C1E" : "#f2f2f7";
  const cardBackground = theme.palette.mode === "dark" ? "#2C2C2E" : "#ffffff";
  const fieldBackground = theme.palette.mode === "dark" ? "#3A3A3C" : "#f9f9fb";

  const handleSave = () => {
    const payload = {
      name: name.trim(),
      category,
      quantity: Number(quantity),
      unit,
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
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: sheetBackground,
          borderRadius: isMobile ? "24px 24px 0 0" : 4,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          margin: 0,
          width: "100%",
          maxWidth: 520,
          position: isMobile ? "fixed" : "relative",
          bottom: isMobile ? 0 : "auto",
          fontFamily:
            '"SF Pro Text", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <Stack spacing={2} sx={{ px: { xs: 2.5, sm: 3 }, pt: 2, pb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <IconButton onClick={onClose} sx={{ backgroundColor: "#ffffff", boxShadow: 1 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="subtitle1" fontWeight={700}>
            {title}
          </Typography>
          <IconButton onClick={handleSave} sx={{ backgroundColor: "#34c759", color: "#fff" }}>
            <CheckIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ px: 0 }}>
          <Stack spacing={2.5}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: cardBackground,
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <Stack spacing={1.5}>
                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary">
                    Назва
                  </Typography>
                  <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    placeholder="Наприклад, Молоко"
                    fullWidth
                    size="small"
                    InputProps={{
                      sx: {
                        borderRadius: 2,
                        backgroundColor: fieldBackground,
                      },
                    }}
                  />
                </Stack>

                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary">
                    Категорія
                  </Typography>
                  <FormControl fullWidth error={Boolean(errors.category)}>
                    <InputLabel shrink>Категорія</InputLabel>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      displayEmpty
                      size="small"
                      sx={{
                        borderRadius: 2,
                        backgroundColor: fieldBackground,
                      }}
                    >
                      <MenuItem value="">
                        <em>Оберіть категорію</em>
                      </MenuItem>
                      {categories.map((c) => (
                        <MenuItem key={c} value={c}>
                          {c}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>

                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    Одиниця та кількість
                  </Typography>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Button
                      variant="contained"
                      onClick={(event) => setUnitAnchor(event.currentTarget)}
                      sx={{
                        borderRadius: 999,
                        px: 2.5,
                        minWidth: 84,
                        textTransform: "none",
                        backgroundColor: "#34c759",
                        boxShadow: "0 6px 14px rgba(52,199,89,0.35)",
                      }}
                    >
                      {unit}
                    </Button>
                    <TextField
                      type="number"
                      inputProps={{ min: 1, step: 1, inputMode: "decimal" }}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      error={Boolean(errors.quantity)}
                      helperText={errors.quantity}
                      placeholder="0"
                      size="small"
                      sx={{ flex: 1 }}
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                          backgroundColor: fieldBackground,
                        },
                      }}
                    />
                  </Stack>
                  {errors.unit && (
                    <Typography variant="caption" color="error">
                      {errors.unit}
                    </Typography>
                  )}
                </Stack>

                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary">
                    Термін придатності
                  </Typography>
                  <DatePicker
                    value={expiryDate}
                    onChange={(v) => setExpiryDate(v)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: Boolean(errors.expiryDate),
                        helperText: errors.expiryDate,
                        size: "small",
                        InputProps: {
                          sx: {
                            borderRadius: 2,
                            backgroundColor: fieldBackground,
                          },
                        },
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </DialogContent>

        <Button
          onClick={handleSave}
          variant="contained"
          size="large"
          sx={{
            borderRadius: 999,
            py: 1.5,
            fontWeight: 600,
            fontSize: "1rem",
            textTransform: "none",
            background: "linear-gradient(180deg, #4cd964 0%, #2fbf5b 100%)",
            boxShadow: "0 12px 24px rgba(52,199,89,0.35)",
          }}
        >
          {isEdit ? "Зберегти" : "Додати"}
        </Button>
      </Stack>

      <Menu
        anchorEl={unitAnchor}
        open={isUnitMenuOpen}
        onClose={() => setUnitAnchor(null)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor:
              theme.palette.mode === "dark"
                ? alpha("#2C2C2E", 0.92)
                : alpha("#ffffff", 0.92),
            backdropFilter: "blur(18px)",
            boxShadow: "0 16px 30px rgba(0,0,0,0.15)",
            minWidth: 220,
          },
        }}
      >
        <Typography variant="caption" sx={{ px: 2, pt: 1, color: "text.secondary" }}>
          {selectedUnitLabel}
        </Typography>
        {unitOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === unit}
            onClick={() => {
              setUnit(option.value);
              setUnitAnchor(null);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Dialog>
  );
}
