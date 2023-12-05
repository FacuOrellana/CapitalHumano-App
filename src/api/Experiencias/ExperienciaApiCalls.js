import axios from "axios";
const rootApiPath = "https://localhost:7145/api/experiencia"
 
 
export const getAllExperiencias = async () =>{
    try {
        const response = await axios.get(rootApiPath);
        return response.data;
       
    } catch (error) {
        console.log(error);
        throw error;        
    }
}

export const getExperienciaById = async (id) => {
    try {
        const response = await axios.get(rootApiPath + "/" + id);
        //d/ebugger;
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



export const postNewExperiencia = async (nombre, descripcion, duracion, idEmpleado, idTipoExperiencia) => {
    const body = {
        nombre: nombre,            
        descripcion: descripcion,
        duracion: duracion,
        idEmpleado: idEmpleado,
        idTipoExperiencia: idTipoExperiencia
    }
    try {
        console.log(body)
        // console.log(rootApiPath,body)
        // const response = await axios.post(rootApiPath, body);
        // return response;

    } catch (error) {
        console.log(error);
        throw error;

    }
}
