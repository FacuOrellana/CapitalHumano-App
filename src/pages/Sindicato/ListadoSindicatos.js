import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import { getAllSindicatos } from '../../api/Sindicatos/SindicatosApiCalls';
import { useNavigate } from 'react-router-dom';

const ListadoSindicatos = () => {
    const navigate = useNavigate();
    const [Sindicatos, setSindicatos] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);


    const columns = [
        { field: 'id', headerName: 'ID', width: 50, headerAlign: 'center', hidden: true },
        {
            field: 'descripcion',
            headerName: 'Descripcion',
            width: 125,
        },
        {
            field: 'aporte',
            headerName: 'Aporte',
            width: 150,
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onEdit = (e) => {
                    const currentRow = params.row;
                    navigate('/sindicatos/' + currentRow.id)
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
        getAllSindicatos().then((response) => {
            const parsedData = response.map((Sindicato) => {
                return {
                    id: Sindicato.idSindicato,
                    descripcion: Sindicato.descripcion,
                    aporte: Sindicato.aporte
                };
            });
            setSindicatos(parsedData);
            setLoadingData(false)
        }).catch((error) => {
            setError(error, 'Error al listar Sindicatos.');
        });

    }, [])

    const goToInicio = () => {
        navigate('/inicio');
    };

    const goToNewSindicato = () => {
        navigate('/sindicatos/newsindicato')
    };
    return (
        <Box>
            <Button sx={{margin: 1}} color="primary" onClick={goToInicio} variant='outlined' size='small'>Volver a inicio</Button>
            <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                {/* <Link underline="hover" color="inherit" onClick={() => history.push(rootPath + "/Inicio")}>
                    Inicio
                </Link> */}
                <Typography color="text.primary">Listado de Sindicatos</Typography>
            </Breadcrumbs>
            <Button color="primary" onClick={goToNewSindicato} variant="contained" size='small'>Nuevo Sindicato</Button>
            {loadingData === true ?
                (<><Box sx={{ display: 'flex', justifyContent: "center", marginTop: "10rem" }}>
                    <CircularProgress size={"10rem"} />
                </Box></>)
                :
                <Box sx={{ height: 1000, width: '100%' }}>
                    <DataGrid
                        rows={Sindicatos}
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

export default ListadoSindicatos;
