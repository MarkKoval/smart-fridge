import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "products.json");

app.use(cors());
app.use(express.json());

// -------- helpers --------
function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// -------- routes --------

// Get all products
app.get("/api/products", (req, res) => {
  res.json(readData());
});

// Add product
app.post("/api/products", (req, res) => {
  const products = readData();
  const product = req.body;

  products.unshift(product);
  writeData(products);

  res.status(201).json(product);
});

// Update product
app.put("/api/products/:id", (req, res) => {
  const products = readData();
  const id = req.params.id;

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).end();

  products[index] = req.body;
  writeData(products);

  res.json(products[index]);
});

// Delete product
app.delete("/api/products/:id", (req, res) => {
  const products = readData();
  const id = req.params.id;

  const filtered = products.filter((p) => p.id !== id);
  writeData(filtered);

  res.status(204).end();
});

// Toggle used
app.patch("/api/products/:id/toggle", (req, res) => {
  const products = readData();
  const id = req.params.id;

  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).end();

  product.isUsed = !product.isUsed;
  product.usedAt = product.isUsed ? new Date().toISOString() : null;

  writeData(products);
  res.json(product);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🟢 API running on http://0.0.0.0:${PORT}`);
});
