import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import UndoIcon from "@mui/icons-material/Undo";
import ProductStatusChip from "./ProductStatusChip";
import { formatDate, daysUntil } from "../../utils/date";

function daysLabel(d) {
  if (d === null) return "";
  if (d < 0) return `${Math.abs(d)} дн. тому`;
  if (d === 0) return "сьогодні";
  if (d === 1) return "завтра";
  return `через ${d} дн.`;
}

export default function ProductCards({
  items,
  onEdit,
  onDelete,
  onToggleUsed,
  isUsedView = false,
}) {
  return (
    <Stack spacing={2}>
      {items.map((p) => {
        const dLeft = daysUntil(p.expiryDate);
        return (
          <Card key={p.id} variant="outlined">
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
                <Typography variant="subtitle1" fontWeight={700}>
                  {p.name}
                </Typography>
                <ProductStatusChip expiryDate={p.expiryDate} />
              </Stack>

              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
                <Chip size="small" label={p.category} />
                <Chip size="small" label={`К-сть: ${p.quantity}`} />
              </Stack>

              <Typography variant="body2" sx={{ mt: 1 }}>
                <b>Додано:</b> {formatDate(p.dateAdded)}
              </Typography>
              <Typography variant="body2">
                <b>Придатний до:</b> {formatDate(p.expiryDate)}{" "}
                <Typography component="span" variant="caption" color="text.secondary">
                  ({daysLabel(dLeft)})
                </Typography>
              </Typography>

              {p.isUsed && p.usedAt && (
                <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                  <b>Використано:</b> {formatDate(p.usedAt)}
                </Typography>
              )}
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Tooltip title="Редагувати">
                <IconButton onClick={() => onEdit(p)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Видалити">
                <IconButton onClick={() => onDelete(p)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={isUsedView ? "Повернути в активні" : "Позначити використаним"}>
                <IconButton onClick={() => onToggleUsed(p)}>
                  {isUsedView ? <UndoIcon /> : <CheckIcon />}
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        );
      })}

      {items.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Нічого не знайдено за вибраними фільтрами.
        </Typography>
      )}
    </Stack>
  );
}
