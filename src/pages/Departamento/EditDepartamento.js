import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllAreas } from "../../api/Areas/AreaApiCalls";
import { Autocomplete, Box, Button, FormControl, Grid, Stack, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getDepartamentoByID, putEditDepartamento } from "../../api/Departamentos/DepartamentosApiCalls";
import axios from "axios";


const EditDepartamento = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [Descripcion, setDescripcion] = useState();
    const [selectedArea, setSelectedArea] = useState();
    const [Areas, setAreas] = useState([])    
    const [Area, setArea] = useState([])

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };

    const setError = (error, header) => {
        console.log(error);
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("https://localhost:7145/api/departamento/" + id);
            setArea(response.data.area);
            setDescripcion(response.data.descripcion);
        }
        if (id) fetchData();
    }, [id])

    useEffect(() => {
        getAllAreas().then((response) => {
            const parsedData = response.map((Area) => {
                return {
                    idArea: Area.idArea,
                    descripcion: Area.descripcion
                };
            });
            setAreas(parsedData)
        }).catch((error) => {
            setError(error, 'Error al listar Areas.');
        });
        getDepartamentoByID(id).then((response) => {
            console.log(response);
            setDescripcion(response.data.descripcion);
            setSelectedArea(response.data.area.descripcion);
        }).catch((error) => {
            setError(error, 'Error al mostrar datos del departamento.');
        });   
    }, [])

    function handleAreaChange(event, newValue) {
        if (newValue) {
            setSelectedArea(newValue.idArea);
        } else {
            setSelectedArea(null);
        }
    }

    function AddDepartamento() {
        if (Descripcion === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar la descripcion del departamento.',
                icon: 'error',

            })
        }
        if (selectedArea === undefined) {
            return Swal.fire({
                title: 'Por favor seleccionar un area.',
                icon: 'error',

            })
        }
        putEditDepartamento(Descripcion, selectedArea,id).then((response) => {
            Swal.fire({
                title: "Departamento editado con exito!",
                icon: 'success',
                willClose: () => {
                    setTimeout(() => {
                        goToDepartamentoList();
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
    const goToDepartamentoList = () => {
        navigate('/departamentos');
    };

    return (
        <Box sx={{ margin: '20px', marginTop: '25px' }}>
            <Button sx={{ margin: 1 }} color="primary" onClick={goToDepartamentoList} variant='outlined' size='small'>Volver a departamentos</Button>
            <Typography align="center" variant="h5" gutterBottom>
                Editar departamento
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
                <Grid item xs={12} >
                    <Autocomplete
                        disablePortal
                        id="area-autocomplete"
                        value={Area}
                        options={Areas}
                        getOptionLabel={(option) => typeof option === 'object' ? option.descripcion || '' : option}
                        sx={{ width: 300 }}
                        onChange={handleAreaChange}
                        renderInput={(params) => <TextField {...params} label="Areas" />}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
            </Grid>
            <Stack spacing={2} sx={{ width: '10%', margin: 'auto' }}>
                <Button variant="contained" color='warning' onClick={AddDepartamento}>
                    Editar Departamento
                </Button>
            </Stack>
        </Box>
    )
}

export default EditDepartamento;