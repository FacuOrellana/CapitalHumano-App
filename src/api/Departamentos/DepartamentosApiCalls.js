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