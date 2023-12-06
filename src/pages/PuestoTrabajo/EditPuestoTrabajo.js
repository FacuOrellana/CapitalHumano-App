import { Autocomplete, Box, Breadcrumbs, Button, Chip, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { postNewPuestoTrabajo } from '../../api/PuestosTrabajo/PuestosTrabajoApiCalls';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Add } from '@mui/icons-material';


const EditSindicato = () => {
    const navigate = useNavigate();
    const [puestoTrabajo, setPuestoTrabajo] = useState({});
    const [descripcion, setDescripcion] = useState({});
    const [nombre, setNombre] = useState({});
    
    const setError = (error, header) => {
        console.log(error);
    };

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            // const response = await axios.get("https://localhost:7145/api/puestoTrabajo/"+id);
            // setSindicato(response.data);            
            // setDescripcion(response.descripcion)
            // setAporte(response.aporte)
        }

        if (id) fetchData();
    }, [id])
    console.log(puestoTrabajo);

 
    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };
 
    const handleChangeNombre = (event) => {
        setNombre(event.target.value);
    };


    function AddPuestoTrabajo() {
        if (nombre === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar el Puesto de Trabajo.',
                icon: 'error',

            })
        }
        if (descripcion === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar la descripcion del Puesto de Trabajo.',
                icon: 'error',

            })
        }
  
        postNewPuestoTrabajo(descripcion,nombre).then((response) => {
            Swal.fire({
                title: "Puesto de Trabajo registrado con exito!",
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
    function goToBack() {
        navigate('/puestotrabajo');
    }

    // if (empleado !== null) return <h1>CARGANDO</h1>;

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
                        }} helperText="Ingrese el Puesto de Trabajo" value={puestoTrabajo.nombre} onChange={handleChangeNombre} />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField id="descripcion" label="Descripcion" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese el Sindicato" value={puestoTrabajo.descripcion} onChange={handleChangeDescripcion} />

                    </FormControl>
                </Grid>

            </Grid>


            <Stack spacing={2} sx={{ width: '10%', margin: 'auto' }}>
                <Button variant="contained" color='success' onClick={AddPuestoTrabajo}>
                    Editar Puesto de Trabajo
                </Button>
            </Stack>
        </Box>
    );
}

export default EditSindicato;
