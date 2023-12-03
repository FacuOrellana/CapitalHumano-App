import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { putEditArea } from "../../api/Areas/AreaApiCalls";


const EditArea = () => {
    const [area, setArea] = useState({});
    const [Descripcion, setDescripcion] = useState();

    const setError = (error, header) => {
        console.log(error);
    };
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("https://localhost:7145/api/areas/" + id);
            setArea(response.data);
            setDescripcion(area.nombre);
        }
        if (id) fetchData();
    }, [id])

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };

    function EditArea() {
        if (Descripcion === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar la descripcion del area.',
                icon: 'error',

            })
        }
        putEditArea(Descripcion).then((response) => {
            Swal.fire({
                title: "Area editada con exito!",
                icon: 'success',
                willClose: () => {
                    setTimeout(() => {
                        // history.push(rootPath + '/Empleados');
                    }, 1500);
                }
            })
            console.log(response);
        }).catch((error) => {
            Swal.fire({
                title: error.response.data.message,
                icon: 'error',

            })
        });
    }

    return(
        <>
        edit area
        </>
    )

}

export default EditArea;