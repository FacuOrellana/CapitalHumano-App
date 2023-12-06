import { Box, Breadcrumbs, Button, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
// import axios from "axios";
// import { Add } from '@mui/icons-material';
import { postNewHabilidad } from '../../api/Habilidades/PuestosHabilidades';


const EditHabilidad = () => {
    const navigate = useNavigate();
    const [habilidad, setHabilidad] = useState({});
    const [descripcion, setDescripcion] = useState({});
    
    const setError = (error, header) => {
        console.log(error);
    };

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            // const response = await axios.get("https://localhost:7145/api/habilidad/"+id);
            // setSindicato(response.data);            
            // setDescripcion(response.descripcion)
            // setAporte(response.aporte)
        }

        if (id) fetchData();
    }, [id])
    console.log(habilidad);

 
    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };

    function AddHabilidad() {
        if (descripcion === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar la descripcion de la Habilidad.',
                icon: 'error',

            })
        }
  
        postNewHabilidad(descripcion).then((response) => {
            Swal.fire({
                title: "Habilidad registrada con exito!",
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
        navigate('/habilidad');
    }

    // if (empleado !== null) return <h1>CARGANDO</h1>;

    return (
        <Box>
            <Button sx={{margin: 1}} color="primary" onClick={goToBack} variant='outlined' size='small'>Volver a Habilidades</Button>


            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField id="descripcion" label="Habilidad" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese el Sindicato" value={habilidad.descripcion} onChange={handleChangeDescripcion} />

                    </FormControl>
                </Grid>

            </Grid>


            <Stack spacing={2} sx={{ width: '10%', margin: 'auto' }}>
                <Button variant="contained" color='success' onClick={AddHabilidad}>
                    Editar Puesto de Trabajo
                </Button>
            </Stack>
        </Box>
    );
}

export default EditHabilidad;
