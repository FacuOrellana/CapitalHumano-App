import axios from "axios";
const rootApiPath = "https://localhost:7145/api/equipos"
 
 
export const getAllEquiposTrabajo = async () =>{
    try {
        const response = await axios.get(rootApiPath);
        return response.data;
       
    } catch (error) {
        console.log(error);
        throw error;        
    }
}


