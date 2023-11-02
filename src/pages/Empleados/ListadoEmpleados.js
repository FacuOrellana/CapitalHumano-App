import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import { getAllEmpleados } from '../../api/Emplados/EmpleadosApiCalls';
import { rootPath } from '../../App';

const ListadoEmplados = () => {

    const history = useHistory();
    const [Empleados, setEmpleados] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);
 

    const columns = [
        { field: 'id', headerName: 'ID Empleado', width: 100, headerAlign: 'center', hidden: true },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 150,
        },
        {
            field: 'apellido',
            headerName: 'Apellido',
            width: 150,
        },
        {
            field: 'dni',
            headerName: 'DNI',
            width: 150,
        }
        ,
        {
            field: 'celular',
            headerName: 'Celular',
            width: 200,
        }, 
         {
            field: 'domicilio',
            headerName: 'Domicilio',
            width: 500,
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onEdit = (e) => {
                    const currentRow = params.row;
                    history.push(rootPath + '/Empleados/EditEmpleado/' + currentRow.id)
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
        getAllEmpleados().then((response) => {
            const parsedData = response.map((Empleado) => {
                return {
                    id: Empleado.idEmpleado,
                    nombre: Empleado.nombre,
                    apellido: Empleado.apellido,
                    dni: Empleado.dni,
                    celular: Empleado.celular,
                    domicilio:Empleado.direccion
                };
            });
            setEmpleados(parsedData);
            setLoadingData(false)
        }).catch((error) => {
            setError(error, 'Error al listar Emplados.');
        });

    }, [])


    const goToNewEmpleado = () => {
        history.push(rootPath + '/Empleados/NewEmpleado')
    };

    



    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                {/* <Link underline="hover" color="inherit" onClick={() => history.push(rootPath + "/Inicio")}>
                    Inicio
                </Link> */}
                <Typography color="text.primary">Listado de Empleados</Typography>
            </Breadcrumbs>
            <Button color="primary" onClick={goToNewEmpleado} variant="contained" size='small'>Nuevo Empleado</Button>
            {loadingData === true ?
                (<><Box sx={{ display: 'flex', justifyContent: "center", marginTop: "10rem" }}>
                    <CircularProgress size={"10rem"} />
                </Box></>)
                :
                <Box sx={{ height: 1000, width: '100%' }}>
                    <DataGrid
                        rows={Empleados}
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
