import dayjs from "dayjs";
import { makeId } from "../utils/id";

export const CATEGORIES = [
  "Молочні",
  "М’ясо",
  "Овочі",
  "Фрукти",
  "Напої",
  "Заморозка",
  "Соуси",
  "Інше",
];

export function buildMockProducts() {
  const now = dayjs();

  return [
    {
      id: makeId(),
      name: "Молоко 2.5%",
      category: "Молочні",
      quantity: 1,
      dateAdded: now.subtract(1, "day").toISOString(),
      expiryDate: now.add(1, "day").toISOString(), // warning
      isUsed: false,
      usedAt: null,
    },
    {
      id: makeId(),
      name: "Куряче філе",
      category: "М’ясо",
      quantity: 2,
      dateAdded: now.subtract(3, "day").toISOString(),
      expiryDate: now.subtract(1, "day").toISOString(), // expired
      isUsed: false,
      usedAt: null,
    },
    {
      id: makeId(),
      name: "Огірки",
      category: "Овочі",
      quantity: 5,
      dateAdded: now.toISOString(),
      expiryDate: now.add(5, "day").toISOString(), // fresh
      isUsed: false,
      usedAt: null,
    },
    {
      id: makeId(),
      name: "Сік апельсиновий",
      category: "Напої",
      quantity: 1,
      dateAdded: now.subtract(10, "day").toISOString(),
      expiryDate: now.add(15, "day").toISOString(),
      isUsed: true,
      usedAt: now.subtract(2, "day").toISOString(),
    },
  ];
}
