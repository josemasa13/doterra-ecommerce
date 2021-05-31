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
import { createPedido } from '../utils/api'
import { Loader } from '../common/Loader'

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

  main:{
      height:'100vh',
  },

  loader:{
      height: '100%'
  }

}));




export default function ProductDetails(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const classes = useStyles();
    const [productName, setProductName] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productQty, setProductQty] = useState("")
    const [productSupply, setProductSupply] = useState("")

    const [clientName, setClientName] = useState("")
    const [clientEmail, setClientEmail] = useState("")
    const [clientQuantity, setClientQuantity] = useState("")
    const [clientObservations, setClientObservations] = useState("")

    const { productId } = useParams()
    const [loading, setLoading] = React.useState(true)
    const [sendLoading, setSendLoading] = React.useState(false)

    useEffect(() => {
        fetchProduct(productId)
        .then((data) => {
            console.log(data)
            setProductName(data.body.productName)
            setProductDescription(data.body.productDesc)
            setProductPrice(data.body.productPrice)
            setProductQty(data.body.productQty)
            setProductSupply(data.body.productSupply)
            setLoading(false)
        })
    }, [])

    const onSubmit = data => {
        setSendLoading(true)
        data.idproducto = productId
        data.nombreproducto = productName
        data.estatus = "activo"
        createPedido(data)
        .then((data) => {
            console.log(data)
            setSendLoading(false)
        })
    };

  
    return (
        

        <div className={classes.main}>
            <Typography className={classes.margin} align="center" variant="h5">{productName}</Typography>
            {loading &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" alignItems="center">
                            <Loader />
                        </Grid>
                    </Grid>
                </Grid>
            }

            {!loading && 
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
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

                
                    <Grid height="100%" item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <Typography variant='h5'>Descripción del producto:</Typography>
                            <Typography>{productDescription}</Typography>

                            <Typography variant='h5'>Precio:</Typography>
                            <Typography>${productPrice}</Typography>

                            <Typography variant='h5'>Presentación del producto:</Typography>
                            <Typography>{productQty} ML</Typography>

                            <Typography variant='h5'>Cantidad disponible en inventario:</Typography>
                            <Typography>{productSupply} piezas</Typography>

                        </ Paper>
                        <Paper className={classes.paper}>
                            <Typography variant='h6'>¿Te interesa este producto? Compártenos tu información y nos pondremos en contacto contigo</Typography>
                            <form onSubmit={handleSubmit(onSubmit)} className={classes.margin}>
                                <TextField name="nombre" fullWidth required id="standard-required" label="Tu nombre" inputRef={register({ required: true })} InputLabelProps={{ shrink: true }} />
                                <TextField name="email"fullWidth required multiline id="standard-multiline" label="Tu correo electrónico" inputRef={register({ required: true })}  InputLabelProps={{ shrink: true }} />
                                <TextField name="cantidad" fullWidth required id="standard-required" label="Cantidad requerida" inputRef={register({ required: true })} InputLabelProps={{ shrink: true }} />
                                <TextField name="observaciones" fullWidth required multiline id="standard-multiline" label="Observaciones" rows={8} inputRef={register({ required: true })}  />
                                {!setSendLoading && (<Button type="submit" variant="contained" size="large" color="primary" className={classes.margin}>
                                    Enviar
                                </Button>)}
                                {setSendLoading && <Loader />}
                            </form>
                        </Paper>
                    </Grid>
                </Grid>}
        </div>
      );
}