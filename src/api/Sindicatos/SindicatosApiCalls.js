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


