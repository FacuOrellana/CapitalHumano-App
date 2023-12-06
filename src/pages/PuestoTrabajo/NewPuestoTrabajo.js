import { Autocomplete, Box, Breadcrumbs, Button, Chip, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { postNewPuestoTrabajo } from '../../api/PuestosTrabajo/PuestosTrabajoApiCalls';
import { Link, useNavigate } from 'react-router-dom';


const NewPuestoTrabajo = () => {

    const [Nombre, setNombre] = useState();
    const [Descripcion, setDescripcion] = useState();
    const navigate = useNavigate();


    // const setError = (error, header) => {
    //     console.log(error);
    // };

    const handleChangeNombre = (event) => {
        setNombre(event.target.value);
    };
    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };

    function AddPuestoTrabajo() {
        if (Nombre === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar el Puesto de Trabajo.',
                icon: 'error',

            })
        }
        if (Descripcion === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar Descripcion.',
                icon: 'error',

            })
        }
 
        postNewPuestoTrabajo(Descripcion, Nombre).then((response) => {
            Swal.fire({
                title: "Puesto de Trabajo registrado con exito!",
                icon: 'success',
                willClose: () => {
                    setTimeout(() => {
                        navigate('/puestotrabajo');
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
        navigate('/puestotrabajo')
    }

    return (
        <Box>
        <Button sx={{margin: 1}} color="primary" onClick={goToBack} variant='outlined' size='small'>Volver a Puestos de Trabajos</Button>

            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <TextField id="nombre" label="Puesto de Trabajo" variant="filled" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese el Puesto de Trabajo" value={Nombre} onChange={handleChangeNombre} />
                    </FormControl>
                </Grid>
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
                    Registrar Puesto Trabajo
                </Button>

            </Stack>
        </Box>
    );
}

export default NewPuestoTrabajo;
