import axios from "axios";
import dayjs from 'dayjs';
const rootApiPath = "https://localhost:7145/api/empleados"


export const getAllEmpleados = async () => {
    try {
        const response = await axios.get(rootApiPath);
        return response.data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const postNewEmpleado = async (Nombre, Apellido, Email,DNI,Legajo, Celular, fechaNacimiento, Direccion, Ciudad, selectedPuestoTrabajo,selectedEquipoTrabajo,selectedSindicato,selectedObraSocial) => {
     // Formatear la fecha utilizando dayjs
     const formattedFechaNacimiento = dayjs(fechaNacimiento).format('YYYY-MM-DD');
    const body = {
        Nombre: Nombre,
        Apellido: Apellido,
        Email: Email,
        DNI: DNI,
        Legajo:Legajo,
        Celular: Celular,
        fechaNacimiento: formattedFechaNacimiento, // Usar la fecha formateada
        Direccion: Direccion,
        Ciudad: Ciudad,
        IdPuestoTrabajo:selectedPuestoTrabajo,
        IdEquipoTrabajo:selectedEquipoTrabajo,
        IdSindicato: selectedSindicato,
        IdObraSocial: selectedObraSocial
    }
    try {
        const response = await axios.post(rootApiPath, body);
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }
}

export const getEmpleadoById = async (id) => {
    try {
        const response = await axios.get(rootApiPath+"/"+id);
        console.log(response);
        return response;
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

export const updateEmpleado = async (id,Nombre, Apellido, Email,DNI,Legajo,Celular, fechaNacimiento, Direccion, Ciudad, selectedPuestoTrabajo,selectedEquipoTrabajo,selectedSindicato,selectedObraSocial) => {
    const body ={
        Nombre:Nombre,
        Apellido:Apellido,
        Email:Email,
        DNI:DNI,
        Legajo:Legajo,
        Celular: Celular,
        fechaNacimiento: fechaNacimiento,
        Direccion: Direccion,
        Ciudad: Ciudad,
        IdPuestoTrabajo:selectedPuestoTrabajo.idPuestoTrabajo,
        IdEquipoTrabajo:selectedEquipoTrabajo.idEquipoTrabajo,
        IdSindicato: selectedSindicato.idSindicato,
        IdObraSocial: selectedObraSocial.idObraSocial
    }
    console.log(body);
    try {
        const response = await axios.put(rootApiPath+"/"+id,body);
        return response;
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}