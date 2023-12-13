import { Autocomplete, Box, Button, FormControl, Grid, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEmpleados } from "../../api/Empleados/EmpleadosApiCalls";
import Swal from "sweetalert2";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { postNewContrato } from "../../api/Contratos/ContratosApiCalls";
import dayjs from "dayjs";



const NewContrato = () => {
    const navigate = useNavigate();
    const [Contrato, setContrato] = useState();
    const [FechaInicio, setFechaInicio] = useState();
    const [FechaFin, setFechaFin] = useState();
    const [Sueldo, setSueldo] = useState();
    const [Seniority, setSeniority] = useState();
    const [Empleados, setEmpleados] = useState([]);
    const [selectedEmpleado, setSelectedEmpleado] = useState({});

    const setError = (error, header) => {
        console.log(error);
    };

    useEffect(() => {
        getAllEmpleados().then((response) => {
            console.log(response);
            const parsedData = response.map((Empleado) => {
                return {
                    id: Empleado.idEmpleado,
                    nombre: Empleado.nombre,
                    apellido: Empleado.apellido,
                    dni: Empleado.dni,
                    celular: Empleado.celular,
                    idObrasocial: Empleado.obraSocial.descripcion,
                    idSindicato: Empleado.sindicato.descripcion,
                    idPuestoTrabajo: Empleado.puestoTrabajo.descripcion,
                    idEquipoTrabajo: Empleado.equipoTrabajo.descripcion
                };
            });
            setEmpleados(parsedData);
        }).catch((error) => {
            setError(error, 'Error al traer empleados.');
        });

    }, [])

    const goToContratos = () => {
        navigate('/contratos');
    };

    const handleChangeFechaInicio = (event) => {
        setFechaInicio(event.target.value);
    };
    const handleChangeFechaFin = (event) => {
        setFechaFin(event.target.value);
    };
    const handleChangeSueldo = (event) => {
        setSueldo(event.target.value);
    };
    const handleChangeSeniority = (event) => {
        setSeniority(event.target.value);
    };
    function handleEmpleado(event, newValue) {
        if (newValue) {
            setSelectedEmpleado(newValue.id);
        } else {
            setSelectedEmpleado(null);
        }
    }

    function AddContrato() {
        if (FechaInicio === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar la fecha de inicio.',
                icon: 'error',
            })
        }

        if(FechaFin != undefined && !dayjs(FechaInicio).isBefore(dayjs(FechaFin))){
            return Swal.fire({
                title: 'La fecha de inicio no puede ser posterior a la fecha de fin de contrato.',
                icon: 'error',
            })
        }

        if (Sueldo === undefined || Sueldo <= 0) {
            if(Sueldo <= 0){
                return Swal.fire({
                    title: 'El sueldo debe ser mayor a 0.',
                    icon: 'error',
                })    
            } 
            return Swal.fire({
                title: 'Por favor ingresar el sueldo.',
                icon: 'error',
            })
        }
        if (Seniority === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar el seniority.',
                icon: 'error',
            })
        }
        if (selectedEmpleado === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar el empleado.',
                icon: 'error',
            })
        }
        postNewContrato(FechaInicio, FechaFin, Sueldo, Seniority, selectedEmpleado).then((response) => {
            Swal.fire({
                title: "Contrato registrado con exito!",
                icon: 'success',
                willClose: () => {
                    setTimeout(() => {
                       goToContratos();
                    }, 250);
                }
            })
        }).catch((error) => {
            Swal.fire({
                title: error.response.data.message,
                icon: 'error',
            })
        });
    }
    return (
        <Box>
            <Button sx={{ margin: 1 }} color="primary" onClick={goToContratos} variant='outlined' size='small'>Volver a contratos</Button>
            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                label="Fecha de Inicio del contrato"
                                openTo='year'
                                views={['year', 'month', 'day']}
                                value={FechaInicio}
                                onChange={(newValue) => {
                                    setFechaInicio(newValue);
                                }}
                                inputFormat='DD/MM/YYYY'
                                renderInput={(params) => <TextField {...params} helperText='Ingrese fecha de inicio' />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Grid><Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                label="Fecha de fin del contrato"
                                openTo='year'
                                views={['year', 'month', 'day']}
                                value={FechaFin}
                                onChange={(newValue) => {
                                    setFechaFin(newValue);
                                }}
                                inputFormat='DD/MM/YYYY'
                                renderInput={(params) => <TextField {...params} helperText='Ingrese fecha de fin del contrato' />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
                <Grid md={3} xs={10}  >
                    <FormControl >
                        <TextField id="sueldo" label="Sueldo" type={'number'} sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese el sueldo" variant="filled" value={Sueldo} onChange={handleChangeSueldo} />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid md={3} xs={10}  >
                    <FormControl fullWidth>
                        <TextField id="seniority" label="Seniority" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese seniority" variant="filled" value={Seniority} onChange={handleChangeSeniority} />
                    </FormControl>
                </Grid>

                <Grid xs={12} md={6} style={{ margin: 10 }} >
                    <Autocomplete
                        disablePortal
                        id="empleado-autocomplete"
                        options={Empleados}
                        getOptionLabel={(option) => typeof option === 'object' ? option.nombre + " " + option.apellido || '' : option}
                        sx={{ width: 300 }}
                        onChange={handleEmpleado}
                        renderInput={(params) => <TextField {...params} label="Empleados" />}
                    />
                </Grid>
            </Grid>
            <Stack spacing={2} sx={{ width: '10%', margin: 'auto' }}>
                <Button variant="contained" color='success' onClick={AddContrato}>
                    Registrar Contrato
                </Button>
            </Stack>
        </Box>
    );
}

export default NewContrato;