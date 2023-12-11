import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllAreas } from "../../api/Areas/AreaApiCalls";
import { Autocomplete, Box, Button, FormControl, Grid, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { postNewDepartamento } from "../../api/Departamentos/DepartamentosApiCalls";


const NewDepartamento = () => {
    const navigate = useNavigate();
    const [Descripcion, setDescripcion] = useState();
    const [selectedArea, setSelectedArea] = useState();
    const [Areas, setAreas] = useState([])

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };

    const setError = (error, header) => {
        console.log(error);
    };
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
    }, []);

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
        postNewDepartamento(Descripcion, selectedArea).then((response) => {
            Swal.fire({
                title: "Departamento registrado con exito!",
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
                Nuevo departamento
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
                <Button variant="contained" color='success' onClick={AddDepartamento}>
                    Registrar Departamento
                </Button>
            </Stack>
        </Box>
    )
}

export default NewDepartamento;