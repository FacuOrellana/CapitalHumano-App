import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import { getAllTiposExperiencias } from '../../api/TiposExperiencias/TiposExperienciasApiCalls';
import { useNavigate } from 'react-router-dom';

const ListadoTipoExperiencia = () => {
    const navigate = useNavigate();
    const [tipoExperiencia, setTipoExperiencia] = useState([]);
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
            field: 'acciones',
            headerName: 'Acciones',
            width: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onEdit = (e) => {
                    const currentRow = params.row;
                    navigate('/tipoexperiencia/' + currentRow.id)
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
        getAllTiposExperiencias().then((response) => {
            console.log(response);
            const parsedData = response.map((TipoExperiencia) => {
                return {
                    id: TipoExperiencia.idTipoExperiencia,
                    descripcion: TipoExperiencia.descripcion
                };
            });
            setTipoExperiencia(parsedData);
            setLoadingData(false)
        }).catch((error) => {
            setError(error, 'Error al listar los tipos de Expiriencia.');
        });

    }, [])


    const goToNewTipoExperiencia = () => {
        navigate('/tipoexperiencia/newtipoexperiencia')
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
                <Typography color="text.primary">Listado de Tipos de Experiencias</Typography>
            </Breadcrumbs>
            <Button color="primary" onClick={goToNewTipoExperiencia} variant="contained" size='small'>Nuevo Tipo de Experiencia</Button>
            {loadingData === true ?
                (<><Box sx={{ display: 'flex', justifyContent: "center", marginTop: "10rem" }}>
                    <CircularProgress size={"10rem"} />
                </Box></>)
                :
                <Box sx={{ height: 1000, width: '100%' }}>
                    <DataGrid
                        rows={tipoExperiencia}
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

export default ListadoTipoExperiencia;
