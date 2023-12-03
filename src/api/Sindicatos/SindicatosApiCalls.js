import axios from "axios";
const rootApiPath = "https://localhost:7145/api/sindicatos"
 
 
export const getAllSindicatos = async () =>{
    try {
        const response = await axios.get(rootApiPath);
        console.log(response);
        return response.data;
       
    } catch (error) {
        console.log(error);
        throw error;        
    }
}

export const getSindicatoById = async (id) => {
    try {
        const response = await axios.get(rootApiPath + "/" + id);
        //d/ebugger;
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



export const postNewSindicato = async (descripcion,aporte) => {
    const body = {
        descripcion: descripcion,        
        aporte: aporte            
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