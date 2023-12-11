import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import { deleteContrato, getAllContratos } from '../../api/Contratos/ContratosApiCalls';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

const ListadoEmplados = () => {
    const navigate = useNavigate();
    const [Contratos, setContratos] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const setError = (error, header) => {
        console.log(error);
    };

    useEffect(() => {
        setLoadingData(true)
        getAllContratos().then((response) => {
            const parsedData = response.map((Contrato) => {
                return {
                    id: Contrato.idContrato,
                    fechaInicio: dayjs(Contrato.fechaInicio).format('YYYY-MM-DD'),
                    fechaFin: Contrato.fechaFin != null ? dayjs(Contrato.fechaFin).format('YYYY-MM-DD') : "Contrato permanente",
                    seniority: Contrato.seniority,
                    sueldo: Contrato.sueldo + " " + "USD",
                    empleado: Contrato.empleado.nombre + " " + Contrato.empleado.apellido
                };
            });
            setContratos(parsedData);
            setLoadingData(false)
        }).catch((error) => {
            setError(error, 'Error al listar contratos');
        });

    }, [refresh])

    const columns = [
        { field: 'id', headerName: 'ID', width: 50, headerAlign: 'center', hidden: true },
        {
            field: 'fechaInicio',
            headerName: 'Fecha Inicio',
            width: 150,
        },
        {
            field: 'fechaFin',
            headerName: 'Fecha Fin',
            width: 250,
        },
        {
            field: 'sueldo',
            headerName: 'Sueldo',
            width: 150,
        }
        ,
        {
            field: 'seniority',
            headerName: 'Seniority',
            width: 150,
        },
        {
            field: 'empleado',
            headerName: 'Empleado',
            width: 250,
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
                    goToEditContrato(id);
                };
                const onDelete = (e) => {
                    const currentRow = params.row;
                    let id = currentRow.id;
                    Swal.fire({
                        title: "Estas seguro que quieres eliminar el contrato?",
                        text: "Una vez eliminado el contrato no se podra revertir.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Si, eliminar!"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: "Eliminado!",
                            text: "El contrato ha sido eliminado con exito.",
                            icon: "success",
                            willClose: () => {
                                deleteContrato(id);
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
    
    const goToInicio = () => {
        navigate('/');
    };

    const goToEditContrato = ( id ) => {
        navigate('/contratos/'+id);
    };

    const goToNewContrato = () => {
        navigate('/contratos/newcontrato');
    };
    return (
        <Box>
            <Button sx={{margin: 1}} color="primary" onClick={goToInicio} variant='outlined' size='small'>Volver a inicio</Button>
            <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                <Typography color="text.primary">Listado de Contratos</Typography>
            </Breadcrumbs>
            <Button sx={{margin: 1}} color="primary" onClick={goToNewContrato} variant="contained" size='small'>Nuevo Contrato</Button>
            {loadingData === true ?
                (<><Box sx={{ display: 'flex', justifyContent: "center", marginTop: "10rem" }}>
                    <CircularProgress size={"10rem"} />
                </Box></>)
                :
                <Box sx={{ height: 1000, width: '100%' }}>
                    <DataGrid
                        rows={Contratos}
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