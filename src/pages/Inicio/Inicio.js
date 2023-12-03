import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, CardActions, CardMedia } from '@mui/material';

const Inicio = () => {
  const pages = [
    {
      name: 'empleados',
      title: 'Empleados',
      description: 'Explora la información sobre los empleados de la empresa.',
      image: '/imagenes/employees.jpg',
      but: "Ir a empleados",
    },
    {
      name: 'asistencias',
      title: 'Asistencias',
      description: 'Consulta el registro de asistencias de los empleados.',
      image: '/imagenes/asistencia.jpg',
      but: "Ir a asistencias",
    },
    {
      name: 'areas',
      title: 'Areas',
      description: 'Consulta el registro de asistencias de los empleados.',
      image: '/imagenes/area.jpg',
      but: "Ir a areas",
    }, 
    {
      name: 'contratos',
      title: 'Contratos',
      description: 'Consulta el registro de asistencias de los empleados.',
      image: '/static/images/asistencias.jpg',
      but: "Ir a contratos",
    },       
    {
      name: 'entrada',
      title: 'Entrada',
      description: 'Consulta el registro de asistencias de los empleados.',
      image: '/static/images/asistencias.jpg',
      but: "Ir a entrada",
    },
  ];

  const handleCardClick = (page) => {
    // Aquí puedes manejar la redirección a la página correspondiente
    console.log(`Redirigiendo a la página: ${page.name}`);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {pages.map((page, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
          <Card sx={{ maxWidth: 345, margin: 5,  }}>
          <CardMedia sx={{ height: 140, objectFit: 'cover' }} image={page.image} title={page.title} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {page.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {page.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button size="small" onClick={() => handleCardClick(page)}>
                {page.but}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Inicio;

