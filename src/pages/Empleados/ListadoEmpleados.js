import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import { deleteEmpleado, getAllEmpleados } from '../../api/Empleados/EmpleadosApiCalls';
import { rootPath } from '../../App';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ListadoEmplados = () => {

    const navigate = useNavigate();
    const [Empleados, setEmpleados] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);

    
    useEffect(() => {
        setLoadingData(true)
        getAllEmpleados().then((response) => {
            const parsedData = response.map((Empleado) => {
                return {
                    id: Empleado.idEmpleado,
                    nombre: Empleado.nombre,
                    apellido: Empleado.apellido,
                    dni: Empleado.dni,
                    legajo:Empleado.legajo,
                    celular: Empleado.celular,
                    idObrasocial: Empleado.obraSocial.descripcion,
                    idSindicato: Empleado.sindicato.descripcion,
                    idPuestoTrabajo: Empleado.puestoTrabajo.descripcion,
                    idEquipoTrabajo: Empleado.equipoTrabajo.descripcion
                };
            });
            setEmpleados(parsedData);
            setLoadingData(false)
        }).catch((error) => {
            setError(error, 'Error al listar Emplados.');
        });

    }, [refresh])

    const columns = [
        { field: 'id', headerName: 'ID', width: 100, headerAlign: 'center', hidden: true },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 125,
        },
        {
            field: 'apellido',
            headerName: 'Apellido',
            width: 150,
        },
        {
            field: 'dni',
            headerName: 'DNI',
            width: 150,
        },
        {
            field: 'legajo',
            headerName: 'Legajo',
            width: 150,
        }
        ,
        {
            field: 'celular',
            headerName: 'Celular',
            width: 150,
        },
        {
            field: 'idObrasocial',
            headerName: 'Obra Social',
            width: 150,
        },
        {
            field: 'idSindicato',
            headerName: 'Sindicato',
            width: 250,
        },
        {
            field: 'idPuestoTrabajo',
            headerName: 'Puesto de Trabajo',
            width: 380,
        },
        {
            field: 'idEquipoTrabajo',
            headerName: 'Equipo de Trabajo',
            width: 200,
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 250,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onEdit = (e) => {
                    const currentRow = params.row;
                    let id = currentRow.id;
                    goToEditEmpleado(id);
                };
                const onDelete = (e) => {
                    const currentRow = params.row;
                    let id = currentRow.id;
                    Swal.fire({
                        title: "Estas seguro que quieres eliminar el empleado?",
                        text: "Una vez eliminado el empleado no se podra revertir.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Si, eliminar!"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: "Eliminado!",
                            text: "El empleado ha sido eliminado con exito.",
                            icon: "success",
                            willClose: () => {
                                deleteEmpleado(id);
                                setRefresh(!refresh)
                            }
                          });
                        }
                      });
               
                };
                return (
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<EditIcon></EditIcon>} color="warning" size="small" onClick={onEdit}>Editar</Button>
                        <Button variant="contained" startIcon={<EditIcon></EditIcon>} color="error" size="small" onClick={onDelete}>Eliminar</Button>
                    </Stack>
                    
                );
            },
        }
    ];

    const setError = (error, header) => {
        console.log(error);
    };


    const goToNewEmpleado = () => {
        navigate('/empleados/newempleado');
    };

    const goToInicio = () => {
        navigate('/inicio');
    };

    const goToEditEmpleado = ( id ) => {
        navigate('/empleados/'+id);
    };
    return (
        <Box>
            <Button sx={{margin: 1}} color="primary" onClick={goToInicio} variant='outlined' size='small'>Volver a inicio</Button>
            <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                {/* <Link underline="hover" color="inherit" onClick={() => history.push(rootPath + "/Inicio")}>
                    Inicio
                </Link> */}
                <Typography color="text.primary">Listado de Empleados</Typography>
            </Breadcrumbs>
            <Button sx={{margin: 1}} color="primary" onClick={goToNewEmpleado} variant="contained" size='small'>Nuevo Empleado</Button>
            {loadingData === true ?
                (<><Box sx={{ display: 'flex', justifyContent: "center", marginTop: "10rem" }}>
                    <CircularProgress size={"10rem"} />
                </Box></>)
                :
                <Box sx={{ height: 1000, width: '100%' }}>
                    <DataGrid
                        rows={Empleados}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        onSelectionModelChange={(newSelectionModel) => {
                            setSelectionModel(newSelectionModel);
                        }}
                    />
                </Box>
            }
        </Box>
    );
}

export default ListadoEmplados;
