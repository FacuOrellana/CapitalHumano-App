import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { getAllAreas } from '../../api/Areas/AreaApiCalls';
import { DataGrid } from '@mui/x-data-grid';


const ListadoAreas = () => {
    const navigate = useNavigate();
    const [Area, setArea] = useState();
    const [Areas, setAreas] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const setError = (error, header) => {
        console.log(error);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 50, headerAlign: 'center', hidden: true },
        {
            field: 'descripcion',
            headerName: 'Descripcion',
            width: 200,
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onEdit = (e) => {
                    const currentRow = params.row;
                    let id = currentRow.id;
                    goToEditArea(id);
                };
                return (
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<EditIcon></EditIcon>} color="warning" size="small" onClick={onEdit}>Editar</Button>
                    </Stack>
                );
            },
        }];

    useEffect(() => {
        setLoadingData(true)
        getAllAreas().then((response) => {
            const parsedData = response.map((Area) => {
                return {
                    id: Area.idArea,
                    descripcion: Area.descripcion
                };
            });
            setAreas(parsedData);
            setLoadingData(false)
        }).catch((error) => {
            setError(error, 'Error al listar Areas');
        });

    }, [])
    const goToNewArea = () => {
        navigate('/areas/newarea');
    };

    const goToEditArea = (id) => {
        navigate('/areas/' + id);
    };

    const goToInicio = () => {
        navigate('/inicio');
    };

    return (
        <>
            <Box>
                <Button sx={{ margin: 1 }} color="primary" onClick={goToInicio} variant='outlined' size='small'>Volver a inicio</Button>
                <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                    {/* <Link underline="hover" color="inherit" onClick={() => history.push(rootPath + "/Inicio")}>
                    Inicio
                </Link> */}
                    <Typography color="text.primary">Listado de Areas</Typography>
                </Breadcrumbs>
                <Button color="primary" onClick={goToNewArea} variant="contained" size='small'>Nueva Area</Button>
                {loadingData === true ?
                    (<><Box sx={{ display: 'flex', justifyContent: "center", marginTop: "10rem" }}>
                        <CircularProgress size={"10rem"} />
                    </Box></>)
                    :
                    <Box sx={{ height: 1000, width: '100%' }}>
                        <DataGrid
                            rows={Areas}
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
        </>
    )

}

export default ListadoAreas;