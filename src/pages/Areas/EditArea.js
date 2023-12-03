import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { putEditArea } from "../../api/Areas/AreaApiCalls";
import { Box, Button, FormControl, Grid, Stack, TextField, Typography } from "@mui/material";


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
            console.log(response.data);
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

    function editArea() {
        if (Descripcion === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar la descripcion del area.',
                icon: 'error',
            })
        }
    }

    return (
        <>
            <Box>
                <Typography align="center" variant="h5" component="h2">
                    Editar area
                </Typography>
                <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                    <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                        <FormControl sx={{ width: '20rem' }} >
                            <TextField id="nombre" label="Nombre" variant="filled" sx={{
                                ".css-1wc848c-MuiFormHelperText-root": {
                                    fontSize: "1rem",
                                },
                            }} helperText="Ingrese el nombre" value={area.descripcion} onChange={handleChangeDescripcion} />
                        </FormControl>
                    </Grid>
                </Grid>
                <Stack spacing={2} sx={{ width: '10%', margin: 'auto' }}>
                    <Button variant="contained" color='success' onClick={editArea}>
                        Editar Area
                    </Button>
                </Stack>
            </Box>
        </>
    )

}

export default EditArea;