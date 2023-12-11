import axios from "axios";
const rootApiPath = "https://localhost:7145/api/departamentos"

export const getAllDepartamentos = async () => {
    try {
        const response = await axios.get(rootApiPath);
        return response.data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getDepartamentoByID = async ( id ) => {
    try {
        const response = await axios.get("https://localhost:7145/api/departamento/" + id);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteDepartamento = async ( id ) => {
    try {
        const response = await axios.delete("https://localhost:7145/api/departamento/"+id);
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }
}

export const postNewDepartamento = async (Descripcion, selectedArea) => {
   const body = {
       Descripcion: Descripcion,
       AreaIdArea: selectedArea
   }
   try {
       const response = await axios.post("https://localhost:7145/api/departamento", body);
       return response;
   } catch (error) {
       console.log(error);
       throw error;
   }
}

export const putEditDepartamento = async (Descripcion, selectedArea,id) => {
    const body = {
        Descripcion: Descripcion,
        AreaIdArea: selectedArea
    }
    try {
        const response = await axios.put("https://localhost:7145/api/departamento/"+id, body);
        return response;
 
    } catch (error) {
        console.log(error);
        throw error;
 
    }
 }