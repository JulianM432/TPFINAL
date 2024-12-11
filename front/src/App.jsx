import { useEffect, useState } from "react";
import { getAllCanchas, getCanchaById } from "./api/canchaAPI";
import {
  getReservasByCanchaByDia,
  createReserva,
  getReservaById,
  updateReserva,
  deleteReserva,
} from "./api/reservasAPI";
import { DatePickerDemo } from "./components/ui/date-picker";
import DataTable from "./components/table/DataTable";
import {
  columnsCanchas,
  columnsReservas,
} from "./components/table/columnTable";
import { DialogDemo } from "./components/shadcnComponents/Dialog";
import { Toaster } from "sonner";
function App() {
  //#region funciones
  const [canchas, setCanchas] = useState([]);
  const [editReserva, setEditReserva] = useState(null);
  const [canchaFiltrada, setCanchaFiltrada] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [canchaID, setCanchaID] = useState(null);
  const handleSelectFecha = (date) => {
    setFecha(date);
  };
  const handleRowSelect = (id) => {
    setSelectedRow(id);
  };
  const handleRowEdit = (id) => {
    getReservaById(id).then((res) => {
      if (res.status === 200) {
        // console.log(res.data);
        setEditReserva(res.data);
        setModal(true);
      }
    });
  };
  const handleRowDelete = (id) => {
    deleteReserva(id).then((res) => {
      if (res.status === 204) {
        // alert("Reserva eliminada");
        setCanchaFiltrada((reservas) =>
          reservas.filter((item) => item.id !== id)
        );
      } else {
        alert("Error al eliminar la reserva");
      }
    });
  };
  useEffect(() => {
    getAllCanchas().then((res) => {
      if (res.status === 200) {
        setCanchas(res.data);
      }
    });
  }, []);
  // useEffect(() => {
  //   console.log(canchaFiltrada);
  // }, [canchaFiltrada]);

  useEffect(() => {
    if (selectedRow && fecha) {
      getReservasByCanchaByDia(selectedRow, fecha).then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setCanchaFiltrada(res.data);
        }
      });
    }
  }, [selectedRow, fecha]);

  // useEffect(() => {
  //   if (selectedRow) {
  //     getCanchaById(selectedRow).then((res) => {
  //       if (res.status === 200) {
  //         setCanchaID(res.data);
  //       }
  //     });
  //   }
  // }, [selectedRow]);
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
    if (editReserva) setEditReserva(null);
  };
  //#endregion
  return (
    <div className="flex flex-col items-center justify-center mx-auto h-screen space-y-10">
      <Toaster richColors position="bottom-center" theme="system" />
      <div className=" container flex flex-row items-center justify-evenly">
        <div className="space-y-10 flex flex-col">
          <DataTable
            columns={columnsCanchas}
            data={canchas}
            type={"canchas"}
            onReservar={handleRowSelect}
            selectedRow={selectedRow}
          />
          <DatePickerDemo handleSelectFecha={handleSelectFecha} />
        </div>
        { (
          <div className="space-y-10">
            <DataTable
              type={"reservas"}
              columns={columnsReservas}
              data={canchaFiltrada}
              onBorrar={handleRowDelete}
              onEditar={handleRowEdit}
            />
          </div>
        )}
      </div>
      {selectedRow && fecha && (
        <DialogDemo
          onCreateReserva={createReserva}
          onUpdateReserva={updateReserva}
          editReserva={editReserva}
          selectedRow={selectedRow}
          handleModal={handleModal}
          modal={modal}
        />
      )}
    </div>
  );
}

export default App;