import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ProductFilters({
  categories,
  category,
  setCategory,
  sort,
  setSort,
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
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 4,
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: 1,
          flex: 1,
        }}
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
            <Typography variant="body2" color="text.secondary">
              Фільтри застосовуються до активних продуктів.
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
        Додати
      </Button>
    </Stack>
  );
}
