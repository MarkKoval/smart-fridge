import React, { useMemo, useState } from "react";
import { Alert, Box, Paper, Snackbar, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProductFilters from "../components/products/ProductFilters";
import ProductTable from "../components/products/ProductTable";
import ProductCards from "../components/products/ProductCards";
import ProductFormDialog from "../components/products/ProductFormDialog";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { compareByExpiryAsc, compareByExpiryDesc } from "../utils/date";

export default function ProductsPage({
  products,
  categories,
  onAdd,
  onUpdate,
  onDelete,
  onToggleUsed,
  snack,
  notifyClose,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("expiryAsc");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const visible = useMemo(() => {
    let list = products.filter((p) => !p.isUsed);

    if (category !== "all") list = list.filter((p) => p.category === category);
    const sorted = [...list];
    if (sort === "expiryAsc") sorted.sort(compareByExpiryAsc);
    if (sort === "expiryDesc") sorted.sort(compareByExpiryDesc);
    if (sort === "addedDesc") sorted.sort((a, b) => (b.dateAdded || "").localeCompare(a.dateAdded || ""));
    if (sort === "addedAsc") sorted.sort((a, b) => (a.dateAdded || "").localeCompare(b.dateAdded || ""));
    return sorted;
  }, [products, category, sort]);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setFormOpen(true);
  };

  const requestDelete = (p) => {
    setToDelete(p);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (toDelete) onDelete(toDelete.id);
    setConfirmOpen(false);
    setToDelete(null);
  };

  const closeDelete = () => {
    setConfirmOpen(false);
    setToDelete(null);
  };

  const submitForm = (p) => {
    if (editing) onUpdate(p);
    else onAdd(p);
    setFormOpen(false);
    setEditing(null);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>
        Продукти
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Керуйте списком продуктів, відслідковуйте терміни придатності та позначайте використані.
      </Typography>

      <ProductFilters
        categories={categories}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        onAdd={openAdd}
      />

      {isMobile ? (
        <ProductCards
          items={visible}
          onEdit={openEdit}
          onDelete={requestDelete}
          onToggleUsed={onToggleUsed}
          isUsedView={false}
        />
      ) : (
        <ProductTable
          items={visible}
          onEdit={openEdit}
          onDelete={requestDelete}
          onToggleUsed={onToggleUsed}
          isUsedView={false}
        />
      )}

      <ProductFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={submitForm}
        categories={categories}
        initialProduct={editing}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Видалити продукт?"
        description={toDelete ? `Точно видалити "${toDelete.name}"?` : "Точно видалити продукт?"}
        onCancel={closeDelete}
        onConfirm={confirmDelete}
      />

      <Snackbar open={snack.open} autoHideDuration={2500} onClose={notifyClose}>
        <Alert onClose={notifyClose} severity={snack.severity} variant="filled" sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
