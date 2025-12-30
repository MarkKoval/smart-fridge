import React, { useMemo, useState } from "react";
import { Alert, Box, Snackbar, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProductTable from "../components/products/ProductTable";
import ProductCards from "../components/products/ProductCards";
import ProductFormDialog from "../components/products/ProductFormDialog";
import ConfirmDialog from "../components/common/ConfirmDialog";

export default function UsedPage({
  products,
  categories,
  onUpdate,
  onDelete,
  onToggleUsed,
  snack,
  notifyClose,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const used = useMemo(() => {
    return [...products]
      .filter((p) => p.isUsed)
      .sort((a, b) => (b.usedAt || "").localeCompare(a.usedAt || ""));
  }, [products]);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

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
    onUpdate(p);
    setFormOpen(false);
    setEditing(null);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>
        Використані
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Тут зберігається історія. Можна повернути продукт назад або видалити.
      </Typography>

      {isMobile ? (
        <ProductCards
          items={used}
          onEdit={openEdit}
          onDelete={requestDelete}
          onToggleUsed={onToggleUsed}
          isUsedView={true}
        />
      ) : (
        <ProductTable
          items={used}
          onEdit={openEdit}
          onDelete={requestDelete}
          onToggleUsed={onToggleUsed}
          isUsedView={true}
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
