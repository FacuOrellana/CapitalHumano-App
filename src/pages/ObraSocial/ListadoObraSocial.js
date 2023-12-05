import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { getAllObras } from '../../api/ObraSocial/ObraSocialApiCalls';
import { DataGrid } from '@mui/x-data-grid';


const ListadoAreas = () => {
    const navigate = useNavigate();
    const [ObraSocial, setObraSocial] = useState();
    const [ObrasSociales, setObrasSociales] = useState([]);
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
            field: 'aporte',
            headerName: 'Aporte',
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
                    goToEditObra(id);
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
        getAllObras().then((response) => {
            const parsedData = response.map((ObraSocial) => {
                return {
                    id: ObraSocial.idObraSocial,
                    descripcion: ObraSocial.descripcion,
                    aporte: ObraSocial.aporte
                };
            });
            setObrasSociales(parsedData);
            setLoadingData(false)
        }).catch((error) => {
            setError(error, 'Error al listar obras sociales');
        });

    }, [])
    const goToNewObraSocial = () => {
        navigate('/obrasociales/newobrasocial');
    };

    const goToEditObra = (id) => {
        navigate('/obrasocial/' + id);
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
                    <Typography color="text.primary">Listado de Obras Sociales</Typography>
                </Breadcrumbs>
                <Button color="primary" onClick={goToNewObraSocial} variant="contained" size='small'>Nueva Obra Social</Button>
                {loadingData === true ?
                    (<><Box sx={{ display: 'flex', justifyContent: "center", marginTop: "10rem" }}>
                        <CircularProgress size={"10rem"} />
                    </Box></>)
                    :
                    <Box sx={{ height: 1000, width: '100%' }}>
                        <DataGrid
                            rows={ObrasSociales}
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