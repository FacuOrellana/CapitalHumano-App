import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { putEditArea } from "../../api/Areas/AreaApiCalls";
import { Box, Button, FormControl, Grid, Stack, TextField, Typography } from "@mui/material";


const EditArea = () => {
    const navigate = useNavigate();
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
            setDescripcion(response.data.descripcion);
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
        putEditArea(id,Descripcion).then((response) => {
            Swal.fire({
                title: "Area editada con exito!",
                icon: 'success',
                willClose: () => {
                    setTimeout(() => {
                        goToAreaList();
                    }, 250);
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
    const goToAreaList = () => {
        navigate('/areas');
    };

    return (
        <>
            <Box>
                <Button sx={{ margin: 1 }} color="primary" onClick={goToAreaList} variant='outlined' size='small'>Volver a inicio</Button>
                <Typography align="center" variant="h5" component="h2">
                    Editar area
                </Typography>
                <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                    <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                        <FormControl sx={{ width: '20rem' }} >
                            <TextField id="descripcion" label="Descripcion" variant="filled" sx={{
                                ".css-1wc848c-MuiFormHelperText-root": {
                                    fontSize: "1rem",
                                },
                            }} helperText="Ingrese la descripcion" value={Descripcion} onChange={handleChangeDescripcion} />
                        </FormControl>
                    </Grid>
                </Grid>
                <Stack spacing={2} sx={{ width: '10%', margin: 'auto' }}>
                    <Button variant="contained" color='warning' onClick={EditArea}>
                        Editar Area
                    </Button>
                </Stack>
            </Box>
        </>
    )

}

export default EditArea;