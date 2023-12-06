import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import { getAllHabilidades } from '../../api/Habilidades/PuestosHabilidades';
import { useNavigate } from 'react-router-dom';

const ListadoHabilidad = () => {
    const navigate = useNavigate();
    const [habilidad, setHabilidad] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);

    console.log('hodflghfdlh')

    const columns = [
        { field: 'id', headerName: 'ID', width: 50, headerAlign: 'center', hidden: true },
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
                    navigate('/habilidad/' + currentRow.id)
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
        getAllHabilidades().then((response) => {
            const parsedData = response.map((Habilidad) => {
                return {
                    id: Habilidad.idHabilidad,
                    descripcion: Habilidad.descripcion,
                };
            });
            setHabilidad(parsedData);
            setLoadingData(false)
        }).catch((error) => {
            setError(error, 'Error al listar las Habilidades.');
        });

    }, [])


    const goToNewHabilidad = () => {
        navigate('/habilidad/newhabilidad')
    };

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
                <Typography color="text.primary">Listado de Habilidades</Typography>
            </Breadcrumbs>
            <Button color="primary" onClick={goToNewHabilidad} variant="contained" size='small'>Nueva habilidad</Button>
            {loadingData === true ?
                (<><Box sx={{ display: 'flex', justifyContent: "center", marginTop: "10rem" }}>
                    <CircularProgress size={"10rem"} />
                </Box></>)
                :
                <Box sx={{ height: 1000, width: '100%' }}>
                    <DataGrid
                        rows={habilidad}
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

export default ListadoHabilidad;
