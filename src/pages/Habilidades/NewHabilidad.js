import { Autocomplete, Box, Breadcrumbs, Button, Chip, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { postNewHabilidad } from '../../api/Habilidades/PuestosHabilidades';
import { Link, useNavigate } from 'react-router-dom';


const NewPuestoTrabajo = () => {

    const [Descripcion, setDescripcion] = useState();
    const navigate = useNavigate();


    // const setError = (error, header) => {
    //     console.log(error);
    // };


    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };

    function AddPuestoTrabajo() {
        if (Descripcion === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar Descripcion.',
                icon: 'error',

            })
        }
 
        postNewHabilidad(Descripcion).then((response) => {
            Swal.fire({
                title: "Habilidad registrado con exito!",
                icon: 'success',
                willClose: () => {
                    setTimeout(() => {
                        navigate('/habilidad');
                    }, 1500);
                }
            })

            console.log(response);
        })

            .catch((error) => {
                Swal.fire({
                    title: error.response.data.message,
                    icon: 'error',

                })
            });

    }
    function goToBack() {
        navigate('/habilidad')
    }

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                <Link underline="hover" color="inherit" onClick={goToBack}>
                    Listado de Habilidades
                </Link>
                <Typography color="text.primary">Nueva Habilidad</Typography>
            </Breadcrumbs>

            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField id="descripcion" label="Descripcion" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese la Descripcion" variant="filled" value={Descripcion} onChange={handleChangeDescripcion} />
                    </FormControl>
                </Grid>

            </Grid>
 
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Button variant="contained" color='success' onClick={AddPuestoTrabajo}>
                    Registrar Habilidad
                </Button>

            </Stack>
        </Box>
    );
}

export default NewPuestoTrabajo;
