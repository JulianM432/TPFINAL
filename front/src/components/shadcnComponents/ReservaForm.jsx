"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { reservaSchema } from "@/schemas/reservaSchema";
import { useEffect } from "react";

export function ReservaForm({
  selectedRow,
  onCreateReserva,
  onUpdateReserva,
  editReserva,
}) {
  const form = useForm({
    resolver: zodResolver(reservaSchema),
    defaultValues: {
      fecha: "",
      hora: "",
      duracion: "",
      nombre: "",
      telefono: "",
      cancha_id: selectedRow || "",
    },
  });
  useEffect(() => {
    if (editReserva) {
      const reserva = {...editReserva};
      // console.log(reserva);
      form.reset(
         {
          fecha: editReserva.dia_hora.split("T")[0] || "",
          hora: editReserva.dia_hora.split("T")[1].slice(0, 5) || "",
          duracion: editReserva.duracion || "",
          nombre: editReserva.nombre || "",
          telefono: editReserva.telefono || "",
          cancha_id: editReserva.cancha_id || "",
        }
      );
    }
  }, [editReserva, selectedRow]);
  const onSubmit = (data) => {
    const reserva = {
      dia_hora: `${data.fecha} ${data.hora}:00`,
      duracion: parseInt(data.duracion),
      nombre: data.nombre,
      telefono: data.telefono,
      cancha_id: selectedRow,
    };
    console.log(reserva);
    if (editReserva) {
      onUpdateReserva(editReserva.id, reserva);
    } else {
      onCreateReserva(reserva);
    }
  };

  return (
    <Form {...form} className="grid gap-4 py-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          className="grid grid-cols-4 items-center gap-4"
          control={form.control}
          name="fecha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>Seleccione una fecha válida</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hora"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hora</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duracion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duración (en horas)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del cliente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telefono"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {editReserva ? "Actualizar Reserva" : "Crear Reserva"}
        </Button>
        {/* {form.formState.errors && (
          <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
        )} */}
      </form>
    </Form>
  );
}
