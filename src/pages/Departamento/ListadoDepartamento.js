import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { deleteDepartamento, getAllDepartamentos } from '../../api/Departamentos/DepartamentosApiCalls';


const ListadoDepartamentos = () => {
    const navigate = useNavigate();    
    const [refresh,setRefresh] = useState(false);
    const [Departamentos, setDepartamentos] = useState([]);
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
            field: 'area',
            headerName: 'Area',
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
                    goToEditDepartamento(id);
                };
                const onDelete = (e) => {
                    const currentRow = params.row;
                    let id = currentRow.id;
                    deleteDepartamento(id);
                    setRefresh(!refresh);                    
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
        getAllDepartamentos().then((response) => {
            const parsedData = response.map((Departamento) => {
                return {
                    id: Departamento.idDepartamento,
                    descripcion: Departamento.descripcion,
                    area: Departamento.area.descripcion
                };
            });
            setDepartamentos(parsedData);
            setLoadingData(false)
        }).catch((error) => {
            setError(error, 'Error al listar departamentos');
        });

    }, [refresh])
    const goToNewDepartamento = () => {
        navigate('/departamentos/newdepartamento');
    };

    const goToEditDepartamento = (id) => {
        navigate('/departamentos/' + id);
    };

    const goToInicio = () => {
        navigate('/inicio');
    };

    return (
        <>
            <Box>
                <Button sx={{ margin: 1 }} color="primary" onClick={goToInicio} variant='outlined' size='small'>Volver a inicio</Button>
                <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                    <Typography color="text.primary">Listado de departamentos</Typography>
                </Breadcrumbs>
                <Button sx={{ margin: 1 }} color="primary" onClick={goToNewDepartamento} variant="contained" size='small'>Nueva Departamento</Button>
                {loadingData === true ?
                    (<><Box sx={{ display: 'flex', justifyContent: "center", marginTop: "10rem" }}>
                        <CircularProgress size={"10rem"} />
                    </Box></>)
                    :
                    <Box sx={{ height: 1000, width: '100%' }}>
                        <DataGrid
                            rows={Departamentos}
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

export default ListadoDepartamentos;