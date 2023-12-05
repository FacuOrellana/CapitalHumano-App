import { Autocomplete, Box, Breadcrumbs, Button, Chip, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';
import { rootPath } from '../../App'
import { postNewEmpleado } from '../../api/Emplados/EmpleadosApiCalls';
import { getAllPuestosTrabajo } from '../../api/PuestosTrabajo/PuestosTrabajoApiCalls';
import { getAllEquiposTrabajo } from '../../api/EquiposTrabajo/EquiposTrabajoApiCalls';
import { getAllSindicatos } from '../../api/Sindicatos/SindicatosApiCalls';
import { getAllObras } from '../../api/ObraSocial/ObraSocialApiCalls';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers';

const NewEmpleado = () => {

    // const history = useHistory()
    const [Nombre, setNombre] = useState();
    const [Apellido, setApellido] = useState();
    const [Email, setEmail] = useState();
    const [Direccion, setDireccion] = useState();
    const [Ciudad, setCiudad] = useState();
    const [fechaNacimiento, setfechaNacimiento] = useState('');
    const [DNI, setDNI] = useState();
    const [Legajo, setLegajo] = useState();
    const [Celular, setCelular] = useState();
    const [PuestosTrabajo, setPuestosTrabajo] = useState([]);
    const [EquiposTrabajo, setEquiposTrabajo] = useState([]);
    const [Sindicatos, setSindicatos] = useState([])
    const [ObraSocial, setObraSocial] = useState([])
    const [selectedPuestoTrabajo, setSelectedPuestoTrabajo] = useState(null);
    const [selectedEquipoTrabajo, setSelectedEquipoTrabajo] = useState(null);
    const [selectedSindicato, setSelectedSindicato] = useState(null);
    const [selectedObraSocial, setSelectedObraSocial] = useState(null);

    const setError = (error, header) => {
        console.log(error);
    };



    useEffect(() => {
        getAllPuestosTrabajo().then((response) => {
            const parsedData = response.map((Puesto) => {
                return {
                    idPuestoTrabajo: Puesto.idPuestoTrabajo,
                    nombrePuesto: Puesto.nombre,
                    descripcionPuesto: Puesto.descripcion
                };
            });
            setPuestosTrabajo(parsedData);
        }).catch((error) => {
            setError(error, 'Error al listar Puestos.');
        });
        getAllEquiposTrabajo().then((response) => {
            const parsedData = response.map((Equipo) => {
                return {
                    idEquipoTrabajo: Equipo.idEquipoTrabajo,
                    descripcionEquipoTrabajo: Equipo.descripcion
                };
            });
            setEquiposTrabajo(parsedData);
        }).catch((error) => {
            setError(error, 'Error al listar Equipos.');
        });
        getAllSindicatos().then((response) => {
            const parsedData = response.map((Sindicato) => {
                return {
                    idSindicato: Sindicato.idSindicato,
                    descripcion: Sindicato.descripcion
                };
            });
            setSindicatos(parsedData);
        }).catch((error) => {
            setError(error, 'Error al listar Sindicatos.');
        });
        getAllObras().then((response) => {
            const parsedData = response.map((Obra) => {
                return {
                    idObraSocial: Obra.idObraSocial,
                    descripcion: Obra.descripcion
                };
            });
            setObraSocial(parsedData);
        }).catch((error) => {
            setError(error, 'Error al listar Obras Sociales.');
        });

    }, []);
    const handleChangeNombre = (event) => {
        setNombre(event.target.value);
    };
    const handleChangeDescripcion = (event) => {
        setApellido(event.target.value);
    };
    const handleChangeDireccion = (event) => {
        setDireccion(event.target.value);
    };
    const handleChangeCiudad = (event) => {
        setCiudad(event.target.value);
    };
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangeDNI = (event) => {
        setDNI(event.target.value);
    };
    const handleChangeLegajo = (event) => {
        setLegajo(event.target.value);
    };
    const handleChangeCelular = (event) => {
        setCelular(event.target.value);
    };

    function handlePuestoTrabajoChange(event, newValue) {
        if (newValue) {
            setSelectedPuestoTrabajo(newValue.idPuestoTrabajo);
        } else {
            setSelectedPuestoTrabajo(null);
        }
    }

    function handleEquipoTrabajoChange(event, newValue) {
        if (newValue) {
            setSelectedEquipoTrabajo(newValue.idEquipoTrabajo);
        } else {
            setSelectedEquipoTrabajo(null);
        }
    }

    function handleSindicatoChange(event, newValue) {
        if (newValue) {
            setSelectedSindicato(newValue.idSindicato);
        } else {
            setSelectedSindicato(null);
        }
    }

    function handleObraSocialChange(event, newValue) {
        if (newValue) {
            setSelectedObraSocial(newValue.idObraSocial);
        } else {
            setSelectedObraSocial(null);
        }
    }

    function AddEmpleado() {
        if (Nombre === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar nombre del empleado.',
                icon: 'error',
                
            })
        }
        if (Apellido === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar apellido del empleado.',
                icon: 'error',
                
            })
        }
        if (Email === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar email del empleado.',
                icon: 'error',
                
            })
        }
        if (DNI === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar DNI del empleado.',
                icon: 'error',
                
            })
        }
        if (Legajo === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar Legajo del empleado.',
                icon: 'error',
                
            })
        }
        if (Celular === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar Celular del empleado.',
                icon: 'error',
                
            })
        }
        if (fechaNacimiento === '') {
            return Swal.fire({
                title: 'Por favor ingresar fecha de nacimiento del empleado.',
                icon: 'error',

            })
        }
        if (Direccion === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar Direccion del empleado.',
                icon: 'error',

            })
        }
        if (Ciudad === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar Ciudad del empleado.',
                icon: 'error',

            })
        }
        if (selectedPuestoTrabajo === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar al menos un puesto de trabajo del empleado.',
                icon: 'error',

            })
        }
        if (selectedEquipoTrabajo=== undefined) {
            return Swal.fire({
                title: 'Por favor ingresar al menos un equipo de trabajo del empleado.',
                icon: 'error',

            })
        }
        if (selectedSindicato === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar sindicato de trabajo del empleado.',
                icon: 'error',

            })
        }
        if (selectedObraSocial === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar obra social de trabajo del empleado.',
                icon: 'error',

            })
        }

        postNewEmpleado(Nombre, Apellido, Email,DNI,Legajo,Celular, fechaNacimiento, Direccion, Ciudad, selectedPuestoTrabajo,selectedEquipoTrabajo,selectedSindicato,selectedObraSocial).then((response) => {
            Swal.fire({
                title: "Empleado registrado con exito!",
                icon: 'success',
                willClose: () => {
                    setTimeout(() => {
                        // history.push(rootPath + '/Empleados');
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
        // history.push(rootPath + '/Empleados')
    }

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                <Link underline="hover" color="inherit" onClick={goToBack}>
                    Listado de Empleados
                </Link>
                <Typography color="text.primary">Nuevo Empleado</Typography>
            </Breadcrumbs>

            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <TextField id="nombre" label="Nombre" variant="filled" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese el nombre" value={Nombre} onChange={handleChangeNombre} />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField id="descripcion" label="Apellido" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese apellido" variant="filled" value={Apellido} onChange={handleChangeDescripcion} />
                    </FormControl>
                </Grid>

            </Grid>
            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <TextField id="hotmail" label="E-mail" variant="filled" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese el e-mail" value={Email} onChange={handleChangeEmail} />
                    </FormControl>
                </Grid>
                <Grid md={3} xs={10}  >
                    <FormControl sx={{ width: '20rem' }} fullWidth>
                        <TextField id="Ciudad" label="Ciudad" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese Ciudad" variant="filled" value={Ciudad} onChange={handleChangeCiudad} />
                    </FormControl>
                </Grid>
                <Grid md={3} xs={10}  >
                    <FormControl fullWidth>
                        <TextField id="Direccion" label="Direccion" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese Direccion" variant="filled" value={Direccion} onChange={handleChangeDireccion} />
                    </FormControl>
                </Grid>

            </Grid>
            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                label="Fecha de Nacimiento"
                                openTo='year'
                                views={['year', 'month', 'day']}
                                value={fechaNacimiento}
                                onChange={(newValue) => {
                                    setfechaNacimiento(newValue);
                                }}
                                inputFormat='DD/MM/YYYY'
                                renderInput={(params) => <TextField {...params} helperText='Ingrese fecha de nacimiento' />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
                <Grid md={3} xs={10}  >
                    <FormControl >
                        <TextField id="dni" label="DNI" type={'number'} sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese DNI" variant="filled" value={DNI} onChange={handleChangeDNI} />
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <TextField id="celular" label="Celular" variant="filled" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese Nro. Celular" value={Celular} onChange={handleChangeCelular} />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                <FormControl >
                        <TextField id="legajo" label="Legajo" type={'number'} sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese Legajo" variant="filled" value={Legajo} onChange={handleChangeLegajo} />
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={6} style={{ marginBottom: 10 }} >
                <Autocomplete
                        disablePortal
                        id="puesto-trabajo-autocomplete"
                        options={PuestosTrabajo}
                        getOptionLabel={(option) => typeof option === 'object' ? option.nombrePuesto || '' : option}
                        sx={{ width: 300 }}
                        onChange={handlePuestoTrabajoChange}
                        renderInput={(params) => <TextField {...params} label="Puestos de Trabajo" />}
                    />
                </Grid>
                <Grid xs={12} md={6} style={{ marginBottom: 10 }} >
                <Autocomplete
                        disablePortal
                        id="equipo-trabajo-autocomplete"
                        options={EquiposTrabajo}
                        getOptionLabel={(option) => typeof option === 'object' ? option.descripcionEquipoTrabajo || '' : option}
                        sx={{ width: 300 }}
                        onChange={handleEquipoTrabajoChange}
                        renderInput={(params) => <TextField {...params} label="Equipos de Trabajo" />}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={6} style={{ marginBottom: 10 }} >
                <Autocomplete
                        disablePortal
                        id="sindicato-autocomplete"
                        options={Sindicatos}
                        getOptionLabel={(option) => typeof option === 'object' ? option.descripcion || '' : option}
                        sx={{ width: 300 }}
                        onChange={handleSindicatoChange}
                        renderInput={(params) => <TextField {...params} label="Sindicatos" />}
                    />

                </Grid>
                <Grid xs={12} md={6} style={{ marginBottom: 10 }} >
                <Autocomplete
                        disablePortal
                        id="obra-social-autocomplete"
                        options={ObraSocial}
                        getOptionLabel={(option) => typeof option === 'object' ? option.descripcion || '' : option}
                        sx={{ width: 300 }}
                        onChange={handleObraSocialChange}
                        renderInput={(params) => <TextField {...params} label="Obras Sociales" />}
                    />
                </Grid>
            </Grid>
            <Stack spacing={2} sx={{ width: '10%', margin: 'auto' }}>
                <Button variant="contained" color='success' onClick={AddEmpleado}>
                    Registrar Empleado
                </Button>
            </Stack>
        </Box>
    );
}

export default NewEmpleado;
