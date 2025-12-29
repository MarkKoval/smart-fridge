const API_URL = "http://localhost:3001/api/products";

export async function getProducts() {
  return fetch(API_URL).then(r => r.json());
}

export async function addProduct(p) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p),
  }).then(r => r.json());
}

export async function updateProduct(p) {
  return fetch(`${API_URL}/${p.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p),
  }).then(r => r.json());
}

export async function deleteProduct(id) {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

export async function toggleUsed(id) {
  return fetch(`${API_URL}/${id}/toggle`, { method: "PATCH" }).then(r => r.json());
}
