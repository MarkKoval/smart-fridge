import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Select,
  Slider,
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
  { value: "Упак.", label: "Упак." },
  { value: "Одиниця", label: "Одиниця" },
  { value: "Кг", label: "Кілограми" },
  { value: "г", label: "Грами" },
  { value: "Л", label: "Літри" },
  { value: "Мл", label: "Мілілітри" },
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
  const [quantityMax, setQuantityMax] = useState(1);
  const [unit, setUnit] = useState("Упак.");
  const [expiryDate, setExpiryDate] = useState(dayjs().add(3, "day"));
  const [errors, setErrors] = useState({});
  const [unitAnchor, setUnitAnchor] = useState(null);

  useEffect(() => {
    if (!open) return;

    if (initialProduct) {
      setName(initialProduct.name ?? "");
      setCategory(initialProduct.category ?? "");
      setQuantity(initialProduct.quantity ?? 1);
      setQuantityMax(initialProduct.quantityMax ?? initialProduct.quantity ?? 1);
      setUnit(initialProduct.unit ?? "Упак.");
      setExpiryDate(dayjs(initialProduct.expiryDate));
      setErrors({});
    } else {
      setName("");
      setCategory("");
      setQuantity(1);
      setQuantityMax(1);
      setUnit("Упак.");
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
  const sliderMax = Number(quantityMax) || 1;
  const sliderStep = Number.isInteger(sliderMax) ? 1 : 0.1;
  const sliderMin = sliderMax < 1 ? Math.max(sliderStep, sliderMax / 10) : 1;

  const handleSave = () => {
    const payload = {
      name: name.trim(),
      category,
      quantity: Number(quantity),
      unit,
      expiryDate: dayjs(expiryDate).toISOString(),
      quantityMax: isEdit ? sliderMax : Number(quantity),
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
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
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
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.65)"
              : "rgba(0,0,0,0.35)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <Stack spacing={2} sx={{ px: { xs: 2.5, sm: 3 }, pt: 2, pb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <IconButton
            onClick={onClose}
            sx={{
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
              border: "1px solid",
              borderColor: "divider",
              boxShadow: 1,
            }}
          >
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
                backgroundColor: "background.default",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: 1,
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
                        backgroundColor: "background.paper",
                      },
                    }}
                  />
                </Stack>

                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary">
                    Категорія
                  </Typography>
                  <FormControl fullWidth error={Boolean(errors.category)}>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      displayEmpty
                      size="small"
                      sx={{
                        borderRadius: 2,
                        backgroundColor: "background.paper",
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
                    {!isEdit && (
                      <TextField
                        type="number"
                        inputProps={{ min: 1, step: 1, inputMode: "decimal" }}
                        value={quantity}
                        onChange={(e) => {
                          const value = e.target.value;
                          setQuantity(value === "" ? "" : Number(value));
                        }}
                        error={Boolean(errors.quantity)}
                        helperText={errors.quantity}
                        placeholder="0"
                        size="small"
                        sx={{ flex: 1 }}
                        InputProps={{
                          sx: {
                            borderRadius: 2,
                            backgroundColor: "background.paper",
                          },
                        }}
                      />
                    )}
                  </Stack>
                  {isEdit && (
                    <Stack spacing={1}>
                      <Slider
                        min={sliderMin}
                        max={sliderMax}
                        step={sliderStep}
                        value={Number(quantity) || sliderMin}
                        valueLabelDisplay="auto"
                        onChange={(event, value) => setQuantity(value)}
                        sx={{ mt: 0.5 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Поточна кількість: {quantity} / {sliderMax}
                      </Typography>
                      {errors.quantity && (
                        <Typography variant="caption" color="error">
                          {errors.quantity}
                        </Typography>
                      )}
                    </Stack>
                  )}
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
                            backgroundColor: "background.paper",
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
            backgroundColor: alpha(theme.palette.background.paper, 0.92),
            border: "1px solid",
            borderColor: "divider",
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
