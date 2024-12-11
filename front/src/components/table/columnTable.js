import { format, parseISO} from "date-fns";

export const columnsCanchas = [
  { accessorKey: "nombre", header: "Nombre" },
  {
    accessorKey: "techada",
    header: "Techada",
    render: (value) => (value ? "Sí" : "No"),
  },
];

export const columnsReservas = [
  {
    accessorKey: "dia_hora",
    header: "Día y hora",
    render: (value) => (value ? format(parseISO(value.split("T")[0]), "dd/MM/yyyy") : ""),
  },
  {
    accessorKey: "dia_hora",
    header: "Hora",
    render: (value) => (value ? `${value.split("T")[1].slice(0, 5)}` : ""),
  },
  { accessorKey: "duracion", header: "Duración" },
  { accessorKey: "nombre", header: "Nombre" },
  { accessorKey: "telefono", header: "Teléfono" },
  // { accessorKey: "cancha_id", header: "Cancha" },
];
