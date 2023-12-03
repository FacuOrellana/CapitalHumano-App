import axios from "axios";
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

export const getEmpleadoById = async (id) => {
    try {
        const response = await axios.get(rootApiPath + "/" + id);
        //d/ebugger;
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const postNewEmpleado = async (nombre, apellido, hotmail, edad, domicilio, fechaNacimiento, dni, celular, telFijo, estado) => {
    const body = {
        nombre: nombre,
        apellido: apellido,
        hotmail: hotmail,
        edad: edad,
        domicilio: domicilio,
        fechaNacimiento: fechaNacimiento,
        dni: dni,
        celular: celular,
        estado: estado
    }
    try {
        console.log(rootApiPath,body)
        const response = await axios.post(rootApiPath, body);
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }
}