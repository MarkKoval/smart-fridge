import dayjs from "dayjs";

export function formatDate(iso) {
  if (!iso) return "—";
  const d = dayjs(iso);
  return d.isValid() ? d.format("DD.MM.YYYY") : "—";
}

export function daysUntil(iso) {
  const today = dayjs().startOf("day");
  const target = dayjs(iso).startOf("day");
  if (!target.isValid()) return null;
  return target.diff(today, "day");
}

/**
 * Статуси:
 * - expired: < 0
 * - warning: >= 0 && < 2
 * - fresh: >= 2
 */
export function getExpiryStatus(expiryISO) {
  const d = daysUntil(expiryISO);
  if (d === null) return { key: "fresh", daysLeft: null };

  if (d < 0) return { key: "expired", daysLeft: d };
  if (d < 2) return { key: "warning", daysLeft: d };
  return { key: "fresh", daysLeft: d };
}

export function compareByExpiryAsc(a, b) {
  const da = dayjs(a.expiryDate);
  const db = dayjs(b.expiryDate);
  if (!da.isValid() && !db.isValid()) return 0;
  if (!da.isValid()) return 1;
  if (!db.isValid()) return -1;
  return da.valueOf() - db.valueOf();
}

export function compareByExpiryDesc(a, b) {
  return -compareByExpiryAsc(a, b);
}
