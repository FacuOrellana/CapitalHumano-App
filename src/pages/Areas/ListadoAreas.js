import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { resolvePath, useNavigate } from 'react-router-dom';
import { deleteArea, getAllAreas } from '../../api/Areas/AreaApiCalls';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';


const ListadoAreas = () => {
    const navigate = useNavigate();    
    const [refresh,setRefresh] = useState(false);
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
            width: 300,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onEdit = (e) => {
                    const currentRow = params.row;
                    let id = currentRow.id;
                    goToEditArea(id);
                };
                const onDelete = (e) => {
                    const currentRow = params.row;
                    let id = currentRow.id;                    
                    Swal.fire({
                        title: "Estas seguro que quieres eliminar el area?",
                        text: "Una vez eliminado el area no se podra revertir.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Si, eliminar!"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: "Eliminado!",
                            text: "El area ha sido eliminada con exito.",
                            icon: "success",
                            willClose: () => {
                                deleteArea(id);
                                setRefresh(!refresh);       
                            }
                          });
                        }
                      });                 
                };
                return (<>

                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<EditIcon></EditIcon>} color="warning" size="small" onClick={onEdit}>Editar</Button>
                        <Button variant="contained" startIcon={<EditIcon></EditIcon>} color='error' size="small" onClick={onDelete}>Borrar</Button>
                    </Stack>
                </>
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

    }, [refresh])
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
                    <Typography color="text.primary">Listado de Areas</Typography>
                </Breadcrumbs>
                <Button sx={{ margin: 1 }} color="primary" onClick={goToNewArea} variant="contained" size='small'>Nueva Area</Button>
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