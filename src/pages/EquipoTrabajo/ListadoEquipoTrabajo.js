import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { getAllEquiposTrabajo } from '../../api/EquiposTrabajo/EquiposTrabajoApiCalls';
import { getAllDepartamentos, getDepartamentoByID } from '../../api/Departamentos/DepartamentosApiCalls';

const ListadoEquipoTrabajo = () => {
    const navigate = useNavigate();
    const [equiposTrabajo, setEquipoTrabajo] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 50, headerAlign: 'center', hidden: true },
        {
            field: 'descripcion',
            headerName: 'Descripcion',
            width: 550,
        },
        {
            field: 'departamento',
            headerName: 'Departamento',
            width: 250,
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onEdit = (e) => {
                    const currentRow = params.row;
                    navigate('/equipostrabajo/' + currentRow.id)
                };
                return (
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<EditIcon></EditIcon>} color="warning" size="small" onClick={onEdit}>Editar</Button>
                    </Stack>
                );
            },
        }
    ];

    const setError = (error, header) => {
        console.log(error);
    };

    useEffect(() => {
        setLoadingData(true)
        getAllEquiposTrabajo().then((response) => {
            const parsedData = response.map((EquipoTrabajo) => {
                return {
                    id: EquipoTrabajo.idEquipoTrabajo,
                    departamento: EquipoTrabajo.idDepartamento,
                    descripcion: EquipoTrabajo.descripcion
                };
            });
            setEquipoTrabajo(parsedData);
            setLoadingData(false)
        }).catch((error) => {
            setError(error, 'Error al listar equipos de trabajo.');
        });

    }, [])

    const goToInicio = () => {
        navigate('/inicio');
    };

    const goToNewEquipoTrabajo = () => {
        navigate('/equipostrabajo/newequipotrabajo')
    };
    return (
        <Box>
            <Button sx={{ margin: 1 }} color="primary" onClick={goToInicio} variant='outlined' size='small'>Volver a Inicio</Button>
            <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                {/* <Link underline="hover" color="inherit" onClick={() => history.push(rootPath + "/Inicio")}>
                    Inicio
                </Link> */}
                <Typography color="text.primary">Listado de equipos de trabajo</Typography>
            </Breadcrumbs>
            <Button sx={{ margin: 1 }} color="primary" onClick={goToNewEquipoTrabajo} variant="contained" size='small'>Nuevo Equipo de Trabajo</Button>
            {loadingData === true ?
                (<><Box sx={{ display: 'flex', justifyContent: "center", marginTop: "10rem" }}>
                    <CircularProgress size={"10rem"} />
                </Box></>)
                :
                <Box sx={{ height: 1000, width: '100%' }}>
                    <DataGrid
                        rows={equiposTrabajo}
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

export default ListadoEquipoTrabajo;
