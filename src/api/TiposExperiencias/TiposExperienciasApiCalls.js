import axios from "axios";
const rootApiPath = "https://localhost:7145/api/tiposexperiencia"
 
 
export const getAllTiposExperiencias = async () =>{
    try {
        const response = await axios.get(rootApiPath);
        return response.data;
       
    } catch (error) {
        console.log(error);
        throw error;        
    }
}

export const getTipoExperienciaById = async (id) => {
    try {
        const response = await axios.get(rootApiPath + "/" + id);
        //d/ebugger;
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



export const postNewTipoExperiencia = async (nombre, descripcion) => {
    const body = {
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
