import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReservaForm } from "./ReservaForm";
import { set } from "date-fns";
import { useState } from "react";

export function DialogDemo({
  selectedRow,
  onCreateReserva,
  onUpdateReserva,
  editReserva,
  modal,
  handleModal,
  cancha,
}) {
  // const [modal, setModal] = useState(false);

  return (
    <Dialog open={modal} onOpenChange={handleModal}>
      <DialogTrigger asChild>
        <Button variant="">Reservar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reserva de cancha {cancha?.nombre}</DialogTitle>
          <DialogDescription>
            Crea tu reserva, ingresa los datos solicitados.
          </DialogDescription>
        </DialogHeader>
        <ReservaForm
          onCreateReserva={onCreateReserva}
          onUpdateReserva={onUpdateReserva}
          editReserva={editReserva}
          selectedRow={selectedRow}
        />
      </DialogContent>
    </Dialog>
  );
}
