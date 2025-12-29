import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ProductFilters({
  categories,
  category,
  setCategory,
  sort,
  setSort,
  showExpiredOnly,
  setShowExpiredOnly,
  onAdd,
}) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      alignItems={{ xs: "stretch", md: "center" }}
      justifyContent="space-between"
      sx={{ mb: 2 }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} flexWrap="wrap">
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Категорія</InputLabel>
          <Select
            label="Категорія"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="all">Усі</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 240 }}>
          <InputLabel>Сортування</InputLabel>
          <Select label="Сортування" value={sort} onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="expiryAsc">Термін придатності (зрост.)</MenuItem>
            <MenuItem value="expiryDesc">Термін придатності (спад.)</MenuItem>
            <MenuItem value="addedDesc">Дата додавання (новіші)</MenuItem>
            <MenuItem value="addedAsc">Дата додавання (старіші)</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, pl: 0.5 }}>
          <Switch
            checked={showExpiredOnly}
            onChange={(e) => setShowExpiredOnly(e.target.checked)}
          />
          <Typography variant="body2">Лише прострочені</Typography>
        </Box>
      </Stack>

      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
        Додати продукт
      </Button>
    </Stack>
  );
}
