import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { useEffect, useState } from 'react';
import { fetchProducts,deleteProduct } from '../utils/api';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { FormControl, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import { Loader } from '../common/Loader'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '4em'
  },
  banner: {
    width: 950,
    height: '90vh',
    backgroundImage: `url('https://media.allure.com/photos/5f13724c3f61cc00098d16f7/16:9/w_1600,c_limit/essential-oil-diffuser-social.jpg')`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  
}));

export default function LandingDetails() {
    const classes = useStyles();

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.banner}>
          <Grid container justify="center">
            <Typography variant="h3">Descubre la magia de los aceites esenciales</Typography>
            
          </Grid>
          <Grid container justify="center">
          <Link {...{
            component: RouterLink,
            to: "/shop/productos",
            color: "inherit",
            style: { textDecoration: "none" },
          }}>
              <Button variant="contained" color="secondary">
                Ver catálogo de productos
              </Button>
            </Link>
          </Grid>

        </Grid>

        <Grid item xs={12}>
          <Grid container justify="center">
            <Typography variant="h2">¿Qué son los aceites esenciales?</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={8}>
              <Grid container justify="center">
                <Typography variant="body">Los aceites esenciales son compuestos aromáticos volátiles naturales que se encuentran en las semillas, la corteza, los tallos, las raíces, las flores y otras partes de las plantas, se encargan de protegerlas y juegan un importante papel en la polinización.
    Si alguna vez has disfrutado del aroma de una rosa, entonces has experimentado las cualidades aromáticas de los aceites esenciales que además de proporcionar deliciosas fragancias tienen beneficios intrínsecos que han sido usados por mucho tiempo en la preparación de alimentos, tratamientos de belleza y prácticas alternativas para el bienestar.</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify="center">
            <Typography variant="h2">¿Qué es exactamente un compuesto aromático volátil?</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={8}>
              <Grid container justify="center">
                <Typography variant="body">Estos compuestos son pequeñas moléculas orgánicas que se denominan volátiles porque cambian de estado rápidamente pasando del estado sólido o líquido al estado gaseoso al estar a temperatura ambiente.

Las propiedades físicas y químicas de los compuestos aromáticos volátiles que componen los aceites esenciales, les permiten desplazarse rápidamente a través del aire e interactuar directamente con los sensores olfativos de la nariz. Estas propiedades hacen que los aceites esenciales sean ideales para la aromaterapia —usando estos compuestos naturales para ayudar a mantener una mente y cuerpo en bienestar— El tipo de compuestos aromáticos volátiles presentes en un aceite esencial determina tanto su aroma como sus beneficios. Así que cuando abras por primera vez una botella de aceite esencial, podrás percibir instantáneamente su potente fragancia, que puede sentirse aún a cierta distancia y recibir sus beneficios.

Hasta la fecha se han identificado más de 3,000 variedades de compuestos aromáticos volátiles. La naturaleza de un aceite esencial varía de planta a planta, dentro de familias botánicas y de especie a especie. La delicada proporción de constituyentes aromáticos que se encuentran en cualquier aceite esencial es lo que les da su singularidad y beneficios específicos.

Aún en los aceites esenciales puros su composición puede variar según la hora del día, la estación, la ubicación geográfica, el método y duración de la destilación, el año de cultivo y el clima, por lo que cada paso del proceso de producción es un determinante crítico de la calidad general del aceite esencial producido.

Los aceites esenciales pueden usarse en una amplia variedad de aplicaciones para el bienestar emocional y físico. Pueden usarse individualmente o en complejas mezclas, esto dependerá de la experiencia de cada usuario. Tú también puedes descubrir y aprender nuevas formas de usar los aceites esenciales doTERRA. Consulta los usos de los aceites esenciales y la información de cada uno en sus Fichas Técnicas (PIP), solo tienes que dar click aquí y seleccionar la ficha de tu interés. </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/OEnKOk4ad0U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

          </Grid>
        </Grid>
      </Grid>

      
    );
}