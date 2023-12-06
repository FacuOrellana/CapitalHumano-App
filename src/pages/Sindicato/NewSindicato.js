import { Autocomplete, Box, Breadcrumbs, Button, Chip, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { postNewSindicato } from '../../api/Sindicatos/SindicatosApiCalls';
import { Link, useNavigate } from 'react-router-dom';


const NewSindicato = () => {

    const [Descripcion, setDescripcion] = useState();
    const [Aporte, setAporte] = useState();
    const navigate = useNavigate();


    // const setError = (error, header) => {
    //     console.log(error);
    // };

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };
    const handleChangeAporte = (event) => {
        setAporte(event.target.value);
    };

    function AddSindicato() {
        if (Descripcion === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar Descripcion.',
                icon: 'error',

            })
        }
        if (Aporte === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar Aporte.',
                icon: 'error',

            })
        }
 
        postNewSindicato(Descripcion, Aporte).then((response) => {
            Swal.fire({
                title: "Sindicato registrado con exito!",
                icon: 'success',
                willClose: () => {
                    setTimeout(() => {
                        navigate('/Sindicatos');
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
        navigate('/Sindicatos')
    }

    
    return (
        <Box>
            <Button sx={{margin: 1}} color="primary" onClick={goToBack} variant='outlined' size='small'>Volver a Sindicatos</Button>

            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <TextField id="descripcion" label="descripcion" variant="filled" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese el sindicato" value={Descripcion} onChange={handleChangeDescripcion} />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField id="aporte" label="aporte" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese el Aporte" variant="filled" value={Aporte} onChange={handleChangeAporte} />
                    </FormControl>
                </Grid>

            </Grid>
 
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Button variant="contained" color='success' onClick={AddSindicato}>
                    Registrar Sindicato
                </Button>

            </Stack>
        </Box>
    );
}

export default NewSindicato;
