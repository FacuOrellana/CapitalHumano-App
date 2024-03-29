import axios from "axios";
const rootApiPath = "https://localhost:7145/api/areas"

export const getAllAreas = async () => {
    try {
        const response = await axios.get(rootApiPath);
        return response.data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAreaById = async (id) => {
    try {
        const response = await axios.get(rootApiPath + "/" + id);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    } 
}

export const postNewArea = async ( descripcion ) => {
    const body = {
        descripcion: descripcion
    }
    try {
        const response = await axios.post(rootApiPath, body);
        return response;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const putEditArea = async ( id, descripcion ) => {
    const body = {
        descripcion: descripcion
    }
    try {
        console.log(rootApiPath+"/"+id);
        const response = await axios.put(rootApiPath+"/"+id, body);
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }
}

export const deleteArea = async ( id ) => {
    try {
        const response = await axios.delete(rootApiPath+"/"+id);
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }
}