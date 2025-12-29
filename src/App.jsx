import React, { useEffect, useMemo, useState, useCallback } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { HashRouter, Route, Routes } from "react-router-dom";

import { buildTheme } from "./theme";
import AppLayout from "./components/layout/AppLayout";
import ProductsPage from "./pages/ProductsPage";
import UsedPage from "./pages/UsedPage";

import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { useSnackbar } from "./hooks/useSnackbar";

import { CATEGORIES, buildMockProducts } from "./data/mockProducts";

// ✅ API
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  toggleUsed,
} from "./api/productsApi";

const STORAGE_KEY_THEME = "smart-fridge-theme";

export default function App() {
  // theme
  const [mode, setMode] = useLocalStorageState(STORAGE_KEY_THEME, "light");
  const theme = useMemo(() => buildTheme(mode), [mode]);

  // products (тепер не reducer)
  const [products, setProducts] = useState([]);

  // snackbar
  const { snack, notify, close } = useSnackbar();

  const onToggleMode = () => setMode((m) => (m === "dark" ? "light" : "dark"));

  // ✅ LOAD DATA
  const load = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      console.error(e);
      notify("Не вдалося завантажити продукти", "error");
    }
  }, [notify]);

  // ✅ POLLING (sync every 5s)
  useEffect(() => {
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, [load]);

  // ✅ CRUD
  const onAdd = async (product) => {
    try {
      await addProduct(product);
      notify("Продукт додано ✅", "success");
      load();
    } catch (e) {
      console.error(e);
      notify("Помилка додавання", "error");
    }
  };

  const onUpdate = async (product) => {
    try {
      await updateProduct(product);
      notify("Зміни збережено ✅", "success");
      load();
    } catch (e) {
      console.error(e);
      notify("Помилка оновлення", "error");
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteProduct(id);
      notify("Продукт видалено 🗑️", "info");
      load();
    } catch (e) {
      console.error(e);
      notify("Помилка видалення", "error");
    }
  };

  const onToggleUsed = async (product) => {
    try {
      await toggleUsed(product.id);
      notify(product.isUsed ? "Повернуто в активні ↩️" : "Позначено використаним ✅", "info");
      load();
    } catch (e) {
      console.error(e);
      notify("Помилка зміни статусу", "error");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
        <HashRouter>
          <AppLayout products={products} mode={mode} onToggleMode={onToggleMode}>
            <Routes>
              <Route
                path="/"
                element={
                  <ProductsPage
                    products={products}
                    categories={CATEGORIES}
                    onAdd={onAdd}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onToggleUsed={onToggleUsed}
                    snack={snack}
                    notifyClose={close}
                  />
                }
              />
              <Route
                path="/used"
                element={
                  <UsedPage
                    products={products}
                    categories={CATEGORIES}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onToggleUsed={onToggleUsed}
                    snack={snack}
                    notifyClose={close}
                  />
                }
              />
            </Routes>
          </AppLayout>
        </HashRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
