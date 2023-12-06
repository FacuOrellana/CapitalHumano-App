import { useState } from "react";
import Swal from "sweetalert2";
import { postNewArea } from "../../api/Areas/AreaApiCalls";
import { Box, Button, FormControl, Grid, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const NewArea = () => {
    const navigate = useNavigate();
    const [Descripcion, setDescripcion] = useState();

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };

    const setError = (error, header) => {
        console.log(error);
    };

    function AddArea() {
        if (Descripcion === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar la descripcion del area.',
                icon: 'error',

            })
        }
        postNewArea(Descripcion).then((response) => {
            Swal.fire({
                title: "Area registrada con exito!",
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
        <Box sx={{ margin: '20px', marginTop: '25px' }}>
            <Button sx={{margin: 1}} color="primary" onClick={goToAreaList} variant='outlined' size='small'>Volver a area</Button>
            <Typography align="center" variant="h5" gutterBottom>
                Nueva área
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
            </Grid>
            <Stack spacing={2} sx={{ width: '10%', margin: 'auto' }}>
                <Button variant="contained" color='success' onClick={AddArea}>
                    Registrar Area
                </Button>
            </Stack>
        </Box>
    )
}

export default NewArea;