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
import { updateProduct } from '../utils/api'
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
    const classes = useStyles();
    const [productInfo, setProductInfo] = useState({})
    const [productName, setProductName] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productQty, setProductQty] = useState("")
    const [productSupply, setProductSupply] = useState("")
    const { productId } = useParams()
    const [ saved, setSaved ] = useState(false)
    const [loading, setLoading] = React.useState(true)


    const onSubmit = data => {
        updateProduct(productId, data)
        .then((data) => {
            setSaved(true)
            console.log(data)
        })
    };

    useEffect(() => {
        fetchProduct(productId)
        .then((data) => {
            setProductInfo(data.body)
            setProductName(data.body.productName)
            setProductDescription(data.body.productDesc)
            setProductPrice(data.body.productPrice)
            setProductQty(data.body.productQty)
            setProductSupply(data.body.productSupply)
            setLoading(false)
        })
    }, [])

  
    return (
        <div className={classes.root}>
            <Typography className={classes.margin} align="center" variant="h5">Editar producto</Typography>
            {loading &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" alignItems="center">
                            <Loader />
                        </Grid>
                    </Grid>
                </Grid>
            }
            {!loading && <Grid container spacing={1}>
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
                        <form onSubmit={handleSubmit(onSubmit)} className={classes.margin}>
                            <TextField name="productName" fullWidth required id="standard-required" label="Nombre de producto" inputRef={register({ required: true })} InputLabelProps={{ shrink: true }} value = {productName} onChange={e => {
                                setProductName(e.target.value)
                            }}/>
                            <TextField name="productDesc"fullWidth required multiline id="standard-multiline" label="Descripción del producto" rows={8} inputRef={register({ required: true })}  InputLabelProps={{ shrink: true }} value = {productDescription} onChange={e => {
                                setProductDescription(e.target.value)
                            }}/>
                            <TextField name="productPrice" fullWidth required id="standard-required" label="Precio $" inputRef={register({ required: true })} InputLabelProps={{ shrink: true }} value = {productPrice} onChange={e => {
                                setProductPrice(e.target.value)
                            }}/>
                            
                            <TextField name="productQty" fullWidth required id="standard-required" label="Presentación ML" inputRef={register({ required: true })} InputLabelProps={{ shrink: true }} value = {productQty} onChange={e => {
                                setProductQty(e.target.value)
                            }}/>

                            <TextField name="productSupply" fullWidth required id="standard-required" label="Cantidad en inventario" inputRef={register({ required: true })} InputLabelProps={{ shrink: true }} value = {productSupply} onChange={e => {
                                setProductSupply(e.target.value)
                            }}/>

                            <Button type="submit" variant="contained" size="large" color="primary" className={classes.margin}>
                                Guardar
                            </Button>
                        </form>
                        {saved && <h2>La información del producto se ha guardado</h2>}
                    </Paper>
                </Grid>
            </Grid>}
        </div>
      );
}