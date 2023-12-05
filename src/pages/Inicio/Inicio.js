import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, CardActions, CardMedia, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const Inicio = () => {
  const navigate = useNavigate();
  const pages = [
    {
      name: 'empleados',
      title: 'Empleados',
      description: 'Explora la información sobre los empleados de la empresa.',
      image: '/imagenes/employee.jpg',
      but: "Ir a empleados",
      link: "/empleados"
    },
    {
      name: 'areas',
      title: 'Areas',
      description: 'Consulta el registro de asistencias de los empleados.',
      image: '/imagenes/area.jpg',
      but: "Ir a areas",
      link: "/areas"
    },
    {
      name: 'contratos',
      title: 'Contratos',
      description: 'Consulta el registro de asistencias de los empleados.',
      image: "/imagenes/contrato.jpg",
      but: "Ir a contratos",
      link: "/contratos"
    },
    {
      name: 'obrasociales',
      title: 'Obras Sociales',
      description: 'Consulta el registro de asistencias de los empleados.',
      image: '/imagenes/obrasocial.jpg',
      but: "Ir a obra social",
      link: "/obrasociales"
    },
    {
      name: 'sindicatos',
      title: 'Sindicatos',
      description: 'Consulta el registro de asistencias de los empleados.',
      image: '/imagenes/sindicato.jpg',
      but: "Ir a Sindicatos",
      link: "/sindicatos"
    },
    {
      name: 'puestotrabajo',
      title: 'Puesto de trabajo',
      description: 'Consulta el registro de asistencias de los empleados.',
      image: '/imagenes/puestotrabajo.jpg',
      but: "Ir a puestos de trabajo",
      link: "/puestotrabajo"
    },
  ];

  return (
    <Grid container spacing={2} sx={{marginTop: '1rem', marginBottom: '1rem'}} >
      {pages.map((page, index) => (
        <>
        <Grid item key={index} spacing={10} gap={1} sx={{margin: '1rem'}}  >
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia sx={{ height: 250, objectFit: 'cover' }} image={page.image} title={page.title} />
            <CardContent>
              <Typography align='center' gutterBottom variant="h5" component="div">
                {page.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {page.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button size="small" onClick={() => navigate(page.link)}>
                {page.but}
              </Button>
            </CardActions>
          </Card>
        </Grid>
        </>
      ))}
    </Grid>
  );
};

export default Inicio;

