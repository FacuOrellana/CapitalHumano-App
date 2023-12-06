import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import { getAllPuestosTrabajo } from '../../api/PuestosTrabajo/PuestosTrabajoApiCalls';
import { useNavigate } from 'react-router-dom';

const ListadoPuestoTrabajo = () => {
    const navigate = useNavigate();
    const [puestoTrabajo, setPuestoTrabajo] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);


    const columns = [
        { field: 'id', headerName: 'ID', width: 50, headerAlign: 'center', hidden: true },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 250,
        },
        {
            field: 'descripcion',
            headerName: 'Descripcion',
            width: 550,
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onEdit = (e) => {
                    const currentRow = params.row;
                    navigate('/puestotrabajo/' + currentRow.id)
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
        getAllPuestosTrabajo().then((response) => {
            const parsedData = response.map((PuestoTrabajo) => {
                return {
                    id: PuestoTrabajo.idPuestoTrabajo,
                    nombre: PuestoTrabajo.nombre,
                    descripcion: PuestoTrabajo.descripcion
                };
            });
            setPuestoTrabajo(parsedData);
            setLoadingData(false)
        }).catch((error) => {
            setError(error, 'Error al listar Puestos de Trabajo.');
        });

    }, [])


    const goToNewPuestoTrabajo = () => {
        navigate('/puestotrabajo/newpuestotrabajo')
    };

    const goToInicio = () => {
        navigate('/');
    };
    return (
        <Box>
        <Button sx={{margin: 1}} color="primary" onClick={goToInicio} variant='outlined' size='small'>Volver a Inicio</Button>
        <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                {/* <Link underline="hover" color="inherit" onClick={() => history.push(rootPath + "/Inicio")}>
                    Inicio
                </Link> */}
                <Typography color="text.primary">Listado de Puestos de Trabajos</Typography>
            </Breadcrumbs>
            <Button color="primary" onClick={goToNewPuestoTrabajo} variant="contained" size='small'>Nuevo Puesto de Trabajo</Button>
            {loadingData === true ?
                (<><Box sx={{ display: 'flex', justifyContent: "center", marginTop: "10rem" }}>
                    <CircularProgress size={"10rem"} />
                </Box></>)
                :
                <Box sx={{ height: 1000, width: '100%' }}>
                    <DataGrid
                        rows={puestoTrabajo}
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

export default ListadoPuestoTrabajo;
