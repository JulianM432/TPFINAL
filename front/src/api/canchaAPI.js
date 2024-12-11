import axios from "axios";
// import { toast } from "sonner";
const baseURL = import.meta.env.VITE_URL_API;

export const getAllCanchas = async () => {
  try {
    const response = await axios.get(`${baseURL}/canchas`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getCanchaById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/canchas/${id}`);
    // toast.success("Cancha encontrada");
    return response;
  } catch (error) {
    return error;
  }
};

export const createCancha = (cancha) => {
  return axios.post(`${baseURL}/canchas`, cancha);
};

export const updateCancha = (id, cancha) => {
  return axios.put(`${baseURL}/canchas/${id}`, cancha);
};

export const deleteCancha = (id) => {
  return axios.delete(`${baseURL}/canchas/${id}`);
};