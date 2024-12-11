import { z } from "zod";

export const reservaSchema = z.object({
  fecha: z.string().min(1, "Debe seleccionar una fecha."),
  hora: z.string().min(1, "Debe seleccionar una hora."),
  duracion: z
  .string()
  .min(1, "Duración debe ser al menos 1 hora.")
  .transform((value) => parseInt(value, 10))
  .refine((value) => !isNaN(value) && value >= 1, "Duración debe ser al menos 1 hora."),
  nombre: z.string().min(2, "El nombre es requerido."),
  telefono: z
    .string()
    .min(2, "El teléfono debe tener al menos 2 dígitos.")
    .regex(/^\d+$/, "El teléfono debe contener solo números."),
  cancha_id: z.number().min(0, "Debe seleccionar una cancha válida."),
});
