import React from "react";
import { useForm } from "react-hook-form";
import { FormControl, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { fetchProduct } from '../utils/api'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';






const productData = {
    nombre: "Aceite Esencial",
    descripcion: "Este aceite logra curar todos los males",
    precio: 400,
    imagen: "https://cdn.shopify.com/s/files/1/1355/3237/products/doTERRA-Whisper-Essential-Oil-Blend-for-Women-0_1024x1024.jpg?v=1579880250"   
}

const useStyles = makeStyles((theme) => ({


  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  margin: {
    margin: theme.spacing(2),
  },

  media: {
    height: 0,
    paddingTop: '90%', // 16:9
  },

  margin: {
    margin: theme.spacing(1),
  },
}));




export default function Product(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const classes = useStyles();
    const [productInfo, setProductInfo] = useState({})
    const { productId } = useParams()

    useEffect(() => {
        fetchProduct(productId)
        .then((data) => {
            setProductInfo(data)
            console.log(productInfo)
        })
    }, [])

  
    return (
        <div className={classes.root}>
            <Typography className={classes.margin} align="center" variant="h5">Editar producto</Typography>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={3} />
                            <Grid alignContents="center" item xs={6}>
                                <CardMedia
                                    className={classes.media}
                                    image={productData.imagen}
                                    title="Paella dish"
                                />
                            </Grid>
                            <Grid item xs={3} />
                        </Grid>
                    </Paper>
                </Grid>

                <Grid height="100%" item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        <form className={classes.margin}>
                            <TextField fullWidth required id="standard-required" label="Nombre de producto" value={productInfo.name} InputLabelProps={{ shrink: true }} />
                            <TextField fullWidth required multiline id="standard-multiline" label="Descripción del producto" rows={8} value={productInfo.desc} InputLabelProps={{ shrink: true }}/>
                            <TextField fullWidth required id="standard-required" label="Precio $" InputLabelProps={{ shrink: true }} value={productInfo.price}/>                    
                            <Button variant="contained" size="large" color="primary" className={classes.margin}>Guardar</Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
      );
}