const API_BASE = import.meta.env.VITE_API_BASE || ""; // той самий домен

export async function getProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export async function addProduct(p) {
  const res = await fetch(`${API_BASE}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p),
  });
  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
}

export async function updateProduct(p) {
  const res = await fetch(`${API_BASE}/api/products/${p.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
  return true;
}

export async function toggleUsed(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}/toggle`, { method: "PATCH" });
  if (!res.ok) throw new Error("Failed to toggle used");
  return res.json();
}
