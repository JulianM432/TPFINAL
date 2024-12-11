import axios from "axios";
import { toast } from "sonner";
// import {format} from "date-fns";
const baseURL = import.meta.env.VITE_URL_API;

export const getAllReservas = async () => {
  try {
    const response = await axios.get(`${baseURL}/reservas`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getReservaById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/reservas/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const createReserva = async (reserva) => {
  try {
    const response = await axios.post(`${baseURL}/reservas`, reserva);
    // console.log(response);
    toast.success("Reserva creada", {
      description: "Se ha creado la reserva correctamente",
    });
    return response;
  } catch (error) {
    // console.log(error);
    toast.error("Error al crear reserva", {
      description: "No se ha podido crear la reserva",
    });
    return error;
  }
};

export const updateReserva = async (id, reserva) => {
  try {
    const response = await axios.patch(`${baseURL}/reservas/${id}`, reserva);
    toast.success("Reserva actualizada exitosamente", {
      description: `La reserva ha sido actualizada`,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteReserva = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/reservas/${id}`);
    toast.success("Reserva eliminada exitosamente");
    return response;
  } catch (error) {
    toast.error("Error al eliminar la reserva");
    return error;
  }
};

export const getReservasByCanchaByDia = async (id, dia) => {
  try {
    const response = await axios.get(`${baseURL}/reservas/cancha/${id}/${dia}`);
    console.log(response.data);
    if(response.data.length === 0){
      toast.warning("No hay reservas para ese día", {
        duration: 3000,
      });
    }
    else{
      toast.success("Reservas", {
        duration: 3000,
      });
    }
    return response;
  } catch (error) {
    return error;
  }
};
