import React from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import UndoIcon from "@mui/icons-material/Undo";
import ProductStatusChip from "./ProductStatusChip";
import { formatDate, daysUntil } from "../../utils/date";
import { alpha, useTheme } from "@mui/material/styles";
import { getExpiryStatus } from "../../utils/date";

function daysLabel(d) {
  if (d === null) return "";
  if (d < 0) return `(${Math.abs(d)} дн. тому)`;
  if (d === 0) return "(сьогодні)";
  if (d === 1) return "(завтра)";
  return `(через ${d} дн.)`;
}

export default function ProductTable({
  items,
  onEdit,
  onDelete,
  onToggleUsed,
  isUsedView = false,
}) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Назва</b></TableCell>
            <TableCell><b>Категорія</b></TableCell>
            <TableCell align="right"><b>К-сть</b></TableCell>
            <TableCell><b>Додано</b></TableCell>
            <TableCell><b>Придатний до</b></TableCell>
            <TableCell><b>Статус</b></TableCell>
            <TableCell align="right"><b>Дії</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((p) => {
            const dLeft = daysUntil(p.expiryDate);
            return (
              <TableRow key={p.id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {p.name}
                  </Typography>
                </TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell align="right">{p.quantity}</TableCell>
                <TableCell>{formatDate(p.dateAdded)}</TableCell>
                <TableCell>
                  {formatDate(p.expiryDate)}{" "}
                  <Typography component="span" variant="caption" color="text.secondary">
                    {daysLabel(dLeft)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <ProductStatusChip expiryDate={p.expiryDate} />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Редагувати">
                    <IconButton size="small" onClick={() => onEdit(p)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Видалити">
                    <IconButton size="small" onClick={() => onDelete(p)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={isUsedView ? "Повернути в активні" : "Позначити використаним"}>
                    <IconButton size="small" onClick={() => onToggleUsed(p)}>
                      {isUsedView ? <UndoIcon fontSize="small" /> : <CheckIcon fontSize="small" />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}

          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={7}>
                <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                  Нічого не знайдено за вибраними фільтрами.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
