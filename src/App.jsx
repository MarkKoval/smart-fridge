import React, { useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import dayjs from "dayjs";

import { buildTheme } from "./theme";
import AppLayout from "./components/layout/AppLayout";
import ProductsPage from "./pages/ProductsPage";
import UsedPage from "./pages/UsedPage";

import { useLocalStorageReducer } from "./hooks/useLocalStorageReducer";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { useSnackbar } from "./hooks/useSnackbar";

import { productsReducer, ProductAction } from "./state/productsReducer";
import { buildMockProducts, CATEGORIES } from "./data/mockProducts";

const STORAGE_KEY_PRODUCTS = "smart-fridge-products";
const STORAGE_KEY_THEME = "smart-fridge-theme";

export default function App() {
  // theme
  const [mode, setMode] = useLocalStorageState(STORAGE_KEY_THEME, "light");
  const theme = useMemo(() => buildTheme(mode), [mode]);

  // products
  const [products, dispatch] = useLocalStorageReducer(
    STORAGE_KEY_PRODUCTS,
    productsReducer,
    buildMockProducts()
  );

  // snackbar
  const { snack, notify, close } = useSnackbar();

  const onToggleMode = () => setMode((m) => (m === "dark" ? "light" : "dark"));

  const onAdd = (product) => {
    dispatch({ type: ProductAction.ADD, payload: product });
    notify("Продукт додано ✅", "success");
  };

  const onUpdate = (product) => {
    dispatch({ type: ProductAction.UPDATE, payload: product });
    notify("Зміни збережено ✅", "success");
  };

  const onDelete = (id) => {
    dispatch({ type: ProductAction.DELETE, payload: id });
    notify("Продукт видалено 🗑️", "info");
  };

  const onToggleUsed = (product) => {
    dispatch({
      type: ProductAction.TOGGLE_USED,
      payload: { id: product.id, nowISO: new Date().toISOString() },
    });
    notify(product.isUsed ? "Повернуто в активні ↩️" : "Позначено використаним ✅", "info");
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
        <BrowserRouter>
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
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
