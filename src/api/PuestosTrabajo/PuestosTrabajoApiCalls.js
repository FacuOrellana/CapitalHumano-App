import axios from "axios";
const rootApiPath = "https://localhost:7145/api/puestos"
 
 
export const getAllPuestosTrabajo = async () =>{
    try {
        const response = await axios.get(rootApiPath);
        return response.data;
       
    } catch (error) {
        console.log(error);
        throw error;        
    }
}

export const getPuestoTrabajoById = async (id) => {
    try {
        const response = await axios.get(rootApiPath + "/" + id);
        //d/ebugger;
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



export const postNewPuestoTrabajo = async (nombre, descripcion) => {
    const body = {
        nombre: nombre,            
        descripcion: descripcion
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
