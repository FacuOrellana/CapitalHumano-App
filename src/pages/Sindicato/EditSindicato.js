import { Autocomplete, Box, Breadcrumbs, Button, Chip, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { postNewSindicato } from '../../api/Sindicatos/SindicatosApiCalls';
import { useParams } from 'react-router-dom';
import axios from "axios";


const EditSindicato = () => {
    const navigate = useNavigate();
    const [sindicato, setSindicato] = useState({});
    const [descripcion, setDescripcion] = useState({});
    const [aporte, setAporte] = useState({});
    
    const setError = (error, header) => {
        console.log(error);
    };

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            // const response = await axios.get("https://localhost:7145/api/sindicatos/"+id);
            // setSindicato(response.data);            
            // setDescripcion(response.descripcion)
            // setAporte(response.aporte)
        }

        if (id) fetchData();
    }, [id])
    console.log(sindicato);

 
    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };
 
    const handleChangeAporte = (event) => {
        setAporte(event.target.value);
    };


    function AddSindicato() {
        if (descripcion === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar el sindicato.',
                icon: 'error',

            })
        }
        if (aporte === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar el aportre del sindicato.',
                icon: 'error',

            })
        }
  
        postNewSindicato(descripcion,aporte).then((response) => {
            Swal.fire({
                title: "Sindicato registrado con exito!",
                icon: 'success',
                willClose: () => {
                    setTimeout(() => {
                        // history.push(rootPath + '/sindicatos');
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
    function goToSindicatos() {
        navigate('/sindicatos');
    }

    return (
        <Box>
            <Button sx={{margin: 1}} color="primary" onClick={goToSindicatos} variant='outlined' size='small'>Volver a sindicatos</Button>
            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <TextField id="descripcion" label="Descripcion" variant="filled" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese el Sindicato" value={sindicato.descripcion} onChange={handleChangeDescripcion} />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField id="aporte" label="Aporte" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese el aporte" variant="filled" value={sindicato.aporte} onChange={handleChangeAporte} />
                    </FormControl>
                </Grid>

            </Grid>


            <Stack spacing={2} sx={{ width: '10%', margin: 'auto' }}>
                <Button variant="contained" color='success' onClick={AddSindicato}>
                    Editar Sindicato
                </Button>
            </Stack>
        </Box>
    );
}

export default EditSindicato;
