import axios from "axios";
import dayjs from "dayjs";
const rootApiPath = "https://localhost:7145/api/contratos"

export const getAllContratos = async () => {
    try {
        const response = await axios.get(rootApiPath);
        return response.data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getContratoById = async (id) => {
    try {
        console.log(rootApiPath + "/" + id)
        const response = await axios.get(rootApiPath + "/" + id);
        console.log(response);
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }
}

export const postNewContrato = async (FechaInicio, FechaFin, Sueldo, Seniority, selectedEmpleado) => {
    const formattedFechaInicio = dayjs(FechaInicio).format('YYYY-MM-DD');
    const formattedFechaFin = dayjs(FechaFin).format('YYYY-MM-DD');
    console.log(selectedEmpleado);
    const body = {
        FechaInicio: formattedFechaInicio,
        FechaFin: formattedFechaFin,
        Sueldo: Sueldo,
        Seniority: Seniority,
        IdEmpleado: selectedEmpleado
    }
    try {
        const response = await axios.post(rootApiPath, body);
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }
}

export const putEditContrato = async (id, FechaInicio, FechaFin, Sueldo, Seniority, selectedEmpleado) => {
    const body = {
        FechaInicio: FechaInicio,
        FechaFin: FechaFin,
        Sueldo: Sueldo,
        Seniority: Seniority,
        idEmpleado: selectedEmpleado.idEmpleado
    }
    try {
        console.log(body);
        console.log(rootApiPath + "/" + id);
        const response = await axios.put(rootApiPath + "/" + id, body);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteContrato = async (id) => {
    console.log(id);   
    try {
        const response = await axios.delete(rootApiPath+"/"+id);
        return response;        
    } catch (error) {
        console.log(error);
        throw error;        
    }
}
