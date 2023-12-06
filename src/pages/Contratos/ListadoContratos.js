import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import { getAllContratos } from '../../api/Contratos/ContratosApiCalls';
import { rootPath } from '../../App';
import { useNavigate } from 'react-router-dom';

const ListadoEmplados = () => {
    const navigate = useNavigate();
    const [Contratos, setContratos] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);
    const setError = (error, header) => {
        console.log(error);
    };

    useEffect(() => {
        setLoadingData(true)
        getAllContratos().then((response) => {
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
            setContratos(parsedData);
            setLoadingData(false)
        }).catch((error) => {
            setError(error, 'Error al listar contratos');
        });

    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 50, headerAlign: 'center', hidden: true },
        {
            field: 'fechaInicio',
            headerName: 'Fecha Inicio',
            width: 125,
        },
        {
            field: 'fechaFin',
            headerName: 'Fecha Fin',
            width: 150,
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
            field: 'idEmpleado',
            headerName: 'Empleado',
            width: 150,
        }/*
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onEdit = (e) => {
                    const currentRow = params.row;
                    let id = currentRow.id;
                    goToEditEmpleado(id);
                };
                return (
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<EditIcon></EditIcon>} color="warning" size="small" onClick={onEdit}>Editar</Button>
                    </Stack>
                );
            },
        }*/
    ];
    const goToInicio = () => {
        navigate('/');
    };

    return (
        <Box>
            <Button sx={{margin: 1}} color="primary" onClick={goToInicio} variant='outlined' size='small'>Volver a inicio</Button>
            <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                {/* <Link underline="hover" color="inherit" onClick={() => history.push(rootPath + "/Inicio")}>
                    Inicio
                </Link> */}
                <Typography color="text.primary">Listado de Contratos</Typography>
            </Breadcrumbs>
            <Button color="primary" /*onClick={goToNewEmpleado}*/ variant="contained" size='small'>Nuevo Contrato</Button>
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