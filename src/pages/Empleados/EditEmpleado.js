import { Autocomplete, Box, Breadcrumbs, Button, Chip, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';
import { rootPath } from '../../App'
import { getAllPuestosTrabajo } from '../../api/PuestosTrabajo/PuestosTrabajoApiCalls';
import { getAllEquiposTrabajo } from '../../api/EquiposTrabajo/EquiposTrabajoApiCalls';
import { getAllSindicatos } from '../../api/Sindicatos/SindicatosApiCalls';
import { getAllObras } from '../../api/ObraSocial/ObraSocialApiCalls';


const EditEmpleado = () => {

    const history = useHistory()
    const [Nombre, setNombre] = useState();
    const [Apellido, setApellido] = useState();
    const [Email, setEmail] = useState();
    const [Domicilio, setDomicilio] = useState();
    const [fechaNacimiento, setfechaNacimiento] = useState('');
    const [DNI, setDNI] = useState();
    const [Celular, setCelular] = useState();
    const [telFijo, settelFijo] = useState();
    const [Edad, setEdad] = useState();
    const [Image, setImage] = useState();
    const [PuestosTrabajo, setPuestosTrabajo] = useState([]);
    const [PuestoTrabajoValue, setPuestoTrabajoValue] = React.useState([]);
    const [EquiposTrabajo, setEquiposTrabajo] = useState([]);
    const [EquiposTrabajoValue, setEquiposTrabajoValue] = React.useState([]);
    const [Sindicatos, setSindicatos] = useState([])
    const [ObraSocial, setObraSocial] = useState([])
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
        setNombre(event.target.PuestoTrabajoValue);
    };
    const handleChangeDescripcion = (event) => {
        setApellido(event.target.PuestoTrabajoValue);
    };
    const handleChangeDomicilio = (event) => {
        setDomicilio(event.target.PuestoTrabajoValue);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.PuestoTrabajoValue);
    };

    const handleChangeDNI = (event) => {
        setDNI(event.target.PuestoTrabajoValue);
    };
    const handleChangeCelular = (event) => {
        setCelular(event.target.PuestoTrabajoValue);
    };

    const handleChangeTelFijo = (event) => {
        settelFijo(event.target.PuestoTrabajoValue);
    };

    const handleChangeEdad = (event) => {
        setEdad(event.target.PuestoTrabajoValue);
    };

    const handleImage = (event) => {
        console.log(event.target.files);
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    };

    function AddSocio() {
        if (Nombre === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar nombre del socio.',
                icon: 'error',

            })
        }
        if (Apellido === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar apellido del socio.',
                icon: 'error',

            })
        }
        if (Domicilio === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar domicilio del socio.',
                icon: 'error',

            })
        }
        if (Edad === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar edad del socio.',
                icon: 'error',

            })
        }

        if (fechaNacimiento === '') {
            return Swal.fire({
                title: 'Por favor ingresar fecha de nacimiento del socio.',
                icon: 'error',

            })
        }
        if (DNI === undefined) {
            return Swal.fire({
                title: 'Por favor ingresar DNI del socio.',
                icon: 'error',

            })
        }
    }

    function goToBack() {
        history.push(rootPath + '/Empleados')
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
                        }} helperText="Ingrese el nombre" PuestoTrabajoValue={Nombre} onChange={handleChangeNombre} />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField id="descripcion" label="Apellido" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese apellido" variant="filled" PuestoTrabajoValue={Apellido} onChange={handleChangeDescripcion} />
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
                        }} helperText="Ingrese el e-mail" PuestoTrabajoValue={Email} onChange={handleChangeEmail} />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField id="domicilio" label="Domicilio" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese domicilio" variant="filled" PuestoTrabajoValue={Domicilio} onChange={handleChangeDomicilio} />
                    </FormControl>
                </Grid>

            </Grid>
            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
                        {/* <MobileDatePicker
                                label="Fecha de Nacimiento"
                                openTo='year'
                                views={['year','month','day']}
                                PuestoTrabajoValue={fechaNacimiento}
                                onChange={(newValue) => {
                                    setfechaNacimiento(newValue);
                                }}
                                inputFormat='DD/MM/YYYY'
                                renderInput={(params) => <TextField {...params}  helperText='Ingrese fecha de nacimiento'/>}
                            /> */}
                        {/* </LocalizationProvider> */}
                    </FormControl>
                </Grid>
                <Grid md={3} xs={10}  >
                    <FormControl >
                        <TextField id="dni" label="DNI" type={'number'} sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese DNI" variant="filled" PuestoTrabajoValue={DNI} onChange={handleChangeDNI} />
                    </FormControl>
                </Grid>
                <FormControl >
                    <TextField id="edad" type={'number'} label="Edad" sx={{
                        ".css-1wc848c-MuiFormHelperText-root": {
                            fontSize: "1rem",
                        },
                    }} helperText="Ingrese Edad" variant="filled" PuestoTrabajoValue={Edad} onChange={handleChangeEdad} />
                </FormControl>
            </Grid>

            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <TextField id="celular" label="Celular" variant="filled" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese Nro. Celular" PuestoTrabajoValue={Celular} onChange={handleChangeCelular} />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField id="telFijo" label="Tel. Fijo" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese Tel. Fijo" variant="filled" PuestoTrabajoValue={telFijo} onChange={handleChangeTelFijo} />
                    </FormControl>
                </Grid>

            </Grid>

            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={6} style={{ marginBottom: 10 }} >
                    <Autocomplete
                        multiple
                        id="fixed-tags-demo"
                        PuestoTrabajoValue={PuestoTrabajoValue}
                        onChange={(event, newValue) => {
                            setPuestoTrabajoValue(newValue);
                        }}

                        options={PuestosTrabajo}
                        getOptionLabel={(option) => option.nombrePuesto}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                                <Chip
                                    label={option.nombrePuesto}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        style={{ width: 500 }}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="Puestos" />
                        )}
                    />
                </Grid>
                <Grid xs={12} md={6} style={{ marginBottom: 10 }} >
                    <Autocomplete
                        multiple
                        id="fixed-tags-demo"
                        EquiposTrabajoValue={EquiposTrabajoValue}
                        onChange={(event, newValue) => {
                            setEquiposTrabajoValue(newValue);
                        }}

                        options={EquiposTrabajo}
                        getOptionLabel={(option) => option.descripcionEquipoTrabajo}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                                <Chip
                                    label={option.descripcionEquipoTrabajo}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        style={{ width: 500 }}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="Equipos" />
                        )}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={6} style={{ marginBottom: 10 }} >
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={Sindicatos}
                        getOptionLabel={(option) => typeof option === 'object' ? option.descripcion || '' : option}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Sindicatos" />}
                    />

                </Grid>
                <Grid xs={12} md={6} style={{ marginBottom: 10 }} >
                <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={ObraSocial}
                        getOptionLabel={(option) => typeof option === 'object' ? option.descripcion || '' : option}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Obras Sociales" />}
                    />
                </Grid>
            </Grid>




            <Stack spacing={2} sx={{ width: '100%' }}>
                <Button variant="contained" color='success' onClick={AddSocio}>
                    Editar Empleado
                </Button>

            </Stack>
        </Box>
    );
}