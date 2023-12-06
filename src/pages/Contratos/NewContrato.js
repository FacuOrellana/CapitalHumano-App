import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEmpleados } from "../../api/Empleados/EmpleadosApiCalls";
import Swal from "sweetalert2";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";



const NewContrato = () => {
    const navigate = useNavigate();
    const [Contrato, setContrato] = useState();
    const [FechaInicio, setFechaInicio] = useState();
    const [FechaFin, setFechaFin] = useState();
    const [Sueldo, setSueldo] = useState();
    const [Seniority, setSeniority] = useState();
    const [Empleados, setEmpleados] = useState([]);
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);

    const setError = (error, header) => {
        console.log(error);
    };

    useEffect(() => {
        getAllEmpleados().then((response) => {
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
            setSelectedEmpleado(newValue.idEmpleado);
        } else {
            setSelectedEmpleado(null);
        }
    }

    function AddEmpleado() {
        if (FechaInicio === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar la fecha de inicio.',
                icon: 'error',
            })
        }
        if (Sueldo === undefined) {
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
        // postNewEmpleado(FechaInicio, FechaFin, Sueldo, Seniority, selectedEmpleado).then((response) => {
        //     Swal.fire({
        //         title: "Contrato registrado con exito!",
        //         icon: 'success',
        //         willClose: () => {
        //             setTimeout(() => {
        //                 goToContratos();
        //             }, 250);
        //         }
        //     })
        // }).catch((error) => {
        //     Swal.fire({
        //         title: error.response.data.message,
        //         icon: 'error',
        //     })
        // });
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
            </Grid>
        </Box>
    );
}

export default NewContrato;