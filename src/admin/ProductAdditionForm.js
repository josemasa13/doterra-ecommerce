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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { createProduct } from '../utils/api'
import { useEffect, useState } from 'react';
import { Loader } from '../common/Loader'
import { BrowserRouter as Router, Route, Redirect, Link, Switch, useHistory } from 'react-router-dom'





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

function Saved(props){
    return(
        <h2>Tu producto se ha guardado  </h2>
    )

}

export default function ProductAdditionForm(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const [ saved, setSaved ] = useState(false)
    const [loading, setLoading] = React.useState(false)
    const history = useHistory();


    const onSubmit = data => {
        setLoading(true)
        //var newdata = {"name":data.name,"desc":data.desc, "qty":data.qty, "price":data.price}
        //console.log(newdata)
        createProduct(data)
        .then((data) => {
            setSaved(true);
            setLoading(false);
            history.push('/productos')
        })
    };

    const classes = useStyles();
  
    return (
        <div className={classes.root}>
            <Typography className={classes.margin} align="center" variant="h5">Agregar Producto</Typography>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={3} />
                            <Grid alignContents="center" item xs={6}>
                                <IconButton aria-label="Add image">
                                    <AddCircleIcon fontSize="large"/>
                                </IconButton>
                                <br/>
                                Agregar imagen
                            </Grid>
                            <Grid item xs={3} />
                        </Grid>
                    </Paper>
                </Grid>

                <Grid height="100%" item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        <form onSubmit={handleSubmit(onSubmit)} className={classes.margin}>
                            <TextField name="productName" fullWidth required id="standard-required" label="Nombre de producto" inputRef={register({ required: true })} />
                            <TextField name="productDesc"fullWidth required multiline id="standard-multiline" label="Descripción del producto" rows={8} inputRef={register({ required: true })}  />
                            <TextField name="productPrice" fullWidth required id="standard-required" label="Precio $" inputRef={register({ required: true })}/>
                            <TextField name="productQty" fullWidth required id="standard-required" label="Presentación ML" inputRef={register({ required: true })}/>
                            <TextField name="productSupply" fullWidth required id="standard-required" label="Cantidad en inventario" inputRef={register({ required: true })}/>
                            <Button type="submit" variant="contained" size="large" color="primary" className={classes.margin}>
                                Guardar
                            </Button>
                        </form>
                        {loading && <Loader/>}
                        {saved && <h2>El producto se ha agregado</h2>}
                    </Paper>
                </Grid>
            </Grid>
        </div>
      );
}