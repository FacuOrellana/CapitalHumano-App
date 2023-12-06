import { useState } from "react";
import Swal from "sweetalert2";
import { postNewObraSocial } from "../../api/ObraSocial/ObraSocialApiCalls";
import { Box, Button, FormControl, Grid, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const NewObraSocial = () => {
    const navigate = useNavigate();
    const [Descripcion, setDescripcion] = useState();    
    const [Aporte, setAporte] = useState();

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };

    const handleChangeAporte = (event) => {
        setAporte(event.target.value);
    };

    const setError = (error, header) => {
        console.log(error);
    };

    function AddObraSocial() {
        if (Descripcion === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar la descripcion de la obra social.',
                icon: 'error',

            })
        }
        if (Aporte === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar el aporte de la obra social.',
                icon: 'error',

            })
        }
        postNewObraSocial(Descripcion,Aporte).then((response) => {
            Swal.fire({
                title: "Obra Social con exito!",
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
    const goToObraSocialList = () => {
        navigate('/obrasociales');
    };

    return (
        <Box sx={{ margin: '20px', marginTop: '25px' }}>
            <Button sx={{margin: 1}} color="primary" onClick={goToObraSocialList} variant='outlined' size='small'>Volver a obras sociales</Button>
            <Typography align="center" variant="h5" gutterBottom>
                Nueva Obra Social
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="descripcion"
                            label="Descripcion"
                            helperText="Ingrese descripcion"
                            variant="filled"
                            value={Descripcion}
                            onChange={handleChangeDescripcion}
                            sx={{ width: '20%' }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="aporte"
                            label="Aporte"
                            helperText="Ingrese aporte"
                            variant="filled"
                            value={Aporte}
                            onChange={handleChangeAporte}
                            sx={{ width: '20%' }}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Stack spacing={2} sx={{ width: '10%', margin: 'auto' }}>
                <Button variant="contained" color='success' onClick={AddObraSocial}>
                    Registrar Obra Social
                </Button>
            </Stack>
        </Box>
    )
}

export default NewObraSocial;