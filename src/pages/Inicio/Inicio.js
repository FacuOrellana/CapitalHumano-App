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
      description: 'Gestion de la informacion relacionada a los empleados.',
      image: '/imagenes/employee.jpg',
      but: "Ir a empleados",
      link: "/empleados"
    },
    {
      name: 'areas',
      title: 'Areas',
      description: 'Gestion de areas.',
      image: '/imagenes/area.jpg',
      but: "Ir a areas",
      link: "/areas"
    },
    {
      name: 'departamentos',
      title: 'Departamentos',
      description: 'Gestion de departamentos.',
      image: '/imagenes/area.jpg',
      but: "Ir a departamentos",
      link: "/departamentos"
    },
    {
      name: 'contratos',
      title: 'Contratos',
      description: 'Gestion de los contratos que estan asociados a los empleados.',
      image: "/imagenes/contrato.jpg",
      but: "Ir a contratos",
      link: "/contratos"
    },
    {
      name: 'obrasociales',
      title: 'Obras Sociales',
      description: 'Gestion de obras sociales.',
      image: '/imagenes/obrasocial.jpg',
      but: "Ir a obra social",
      link: "/obrasociales"
    },
    {
      name: 'sindicatos',
      title: 'Sindicatos',
      description: 'Gestion de sindicatos.',
      image: '/imagenes/sindicato.jpg',
      but: "Ir a Sindicatos",
      link: "/sindicatos"
    },
    {
      name: 'puestotrabajo',
      title: 'Puesto de trabajo',
      description: 'Gestion de puestos de trabajo.',
      image: '/imagenes/puestotrabajo.jpg',
      but: "Ir a puestos de trabajo",
      link: "/puestotrabajo"
    },
    {
      name: 'habilidad',
      title: 'Habilidades',
      description: 'Explora la información sobre las Habilidades.',
      image: '/imagenes/employee.jpg',
      but: "Ir a habilidades",
      link: "/habilidad"
    },
    {
      name: 'tipoexperiencia',
      title: 'Tipos de Experiencias',
      description: 'Explora la información sobre los Tipos de Experiencias.',
      image: '/imagenes/employee.jpg',
      but: "Ir a tipos Experiencias",
      link: "/tipoexperiencia"
    },
    {
      name: 'experiencia',
      title: 'Experiencias',
      description: 'Explora la información sobre las Experiencias.',
      image: '/imagenes/employee.jpg',
      but: "Ir a Experiencias",
      link: "/experiencia"
    },
    {
      name: 'equipostrabajo',
      title: 'Equipos de trabajo',
      description: 'Gestion de equipos de trabajo.',
      image: '/imagenes/sindicato.jpg',
      but: "Ir a equipos de trabajo",
      link: "/equipostrabajo"
    },
  ];

  return (
    <Grid container spacing={2} sx={{marginTop: '1rem', marginBottom: '1rem'}} >
      {pages.map((page, index) => (
        <>
        <Grid item key={index} spacing={10} gap={1} sx={{margin: '1rem'}}  >
          <Card sx={{ width: 300, height: 400 }}>
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

