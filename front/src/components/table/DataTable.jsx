import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Notebook } from "lucide-react";

const RowActions = ({ type, onEditar, onBorrar, row }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      {type !== "canchas" && (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onEditar(row.id)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onBorrar(row.id)}>
            Borrar
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
      {/* {type === "canchas" && (
          <DropdownMenuItem onClick={() => onReservar(row.id)}>
          Reservar
          </DropdownMenuItem>
          )} */}
    </DropdownMenu>
  );
};
function DataTable({
  columns,
  data,
  type,
  onReservar,
  onEditar,
  onBorrar,
  selectedRow,
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={row.id === selectedRow ? "bg-muted/75" : ""}
            >
              {columns.map((col, colIndex) => (
                <TableCell className="h-24 text-center" key={colIndex}>
                  {col.render
                    ? col.render(row[col.accessorKey], row)
                    : row[col.accessorKey]}
                </TableCell>
              ))}
              {type !== "canchas" ? (
                <TableCell>
                  <RowActions
                    type={type}
                    onEditar={onEditar}
                    onBorrar={onBorrar}
                    row={row}
                  />
                </TableCell>
              ) : (
                <TableCell>
                  <Button variant="ghost" onClick={() => onReservar(row.id)}>
                    <Notebook />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
