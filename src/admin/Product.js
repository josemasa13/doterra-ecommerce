import React from "react";
import { useForm } from "react-hook-form";
import { FormControl, Typography, Select, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Container, MenuItem } from '@material-ui/core';
import { fetchProduct } from '../utils/api'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { updateProduct, linkExistentProductToImage, addProductImage, deleteProductImage } from '../utils/api'
import { Loader } from '../common/Loader'
import { Controller } from "react-hook-form";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

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
    paddingTop: '100%', // 16:9
  },

  margin: {
    margin: theme.spacing(1),
  },

  input: {
    display: "none"
  }
}));




export default function Product(props) {
    const { register, handleSubmit, watch, errors, control } = useForm();
    const classes = useStyles();
    const [productInfo, setProductInfo] = useState({})
    const [productName, setProductName] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productQty, setProductQty] = useState("")
    const [productSupply, setProductSupply] = useState("")
    const [productCategory, setProductCategory] = useState("")
    const [productImages, setProductImages] = useState([])
    const { productId } = useParams()
    const [ saved, setSaved ] = useState(false)
    const [loading, setLoading] = React.useState(true)
    const [selectedImage, setSelectedImage] = React.useState(null)


    const onSubmit = data => {
        data.productPrice = parseInt(data.productPrice)
        if (selectedImage){
            setLoading(true)
            const formData = new FormData()
            formData.append(
              'image',
              selectedImage,
              selectedImage.name
            )
            addProductImage(formData)
            .then((res) => {
                setProductImages([res.imageUrl])
            let linkData = {
                productImage: res.imageUrl,
                productId
            }

            linkExistentProductToImage(linkData)
            .then((res) => {
                console.log(res)
            })

            setSelectedImage(null)

            updateProduct(productId, data)
            .then((data) => {
                setSaved(true)
                console.log(data)
                setLoading(false)
            })
        })
        } else{
            updateProduct(productId, data)
            .then((data) => {
                setSaved(true)
                console.log(data)
            })
        }
    };

    const fileChangedHandler = (event) => {
      setSelectedImage(event.target.files[0])
      console.log(event.target.files[0])
    }

    const deleteImage = () => {
        deleteProductImage({productImage: productImages[0]})
        .then((res) => {
            console.log(res)
            setProductImages([])
        })
    }

    useEffect(() => {
        fetchProduct(productId)
        .then((data) => {
            console.log(data.body)
            setProductInfo(data.body)
            setProductName(data.body.productName)
            setProductDescription(data.body.productDesc)
            setProductPrice(data.body.productPrice)
            setProductQty(data.body.productQty)
            setProductSupply(data.body.productSupply)
            setProductCategory(data.body.productCategory)
            setProductImages(data.body.productImages)
            setLoading(false)
            console.log(productCategory)
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
            {!loading && <Grid container spacing={2}>
                {productImages.length > 0 && 
                    <Grid item xs={12} sm={6}>
                        <Grid container justify="center">
                            <img src={productImages[0]}/>
                        </Grid>

                        <Grid container justify="center">
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                                onClick={deleteImage}
                            >
                                Eliminar Imagen
                            </Button>
                        </Grid>
                    </Grid>
                }

                {productImages.length === 0 && <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={3} />
                            <Grid alignContents="center" item xs={6}>
                              <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={fileChangedHandler}/>
                              <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                  <AddCircleIcon fontSize="large"/>
                                </IconButton>
                              </label>
                                
                                <br/>
                                {selectedImage ? selectedImage.name : "Agregar imagen"}
                            </Grid>
                            <Grid item xs={3} />
                        </Grid>
                    </Paper>
                </Grid>}

                
                <Grid item xs={12} sm={6}>
                    <Grid container justify="flex-end">
                    <Paper className={classes.paper}>
                        <form onSubmit={handleSubmit(onSubmit)} className={classes.margin}>
                            <TextField name="productName" fullWidth required id="standard-required" label="Nombre de producto" inputRef={register({ required: true })} InputLabelProps={{ shrink: true }} value = {productName} onChange={e => {
                                setProductName(e.target.value)
                            }}/>
                            <TextField name="productDesc"fullWidth required multiline id="standard-multiline" label="Descripción del producto" rows={8} inputRef={register({ required: true })}  InputLabelProps={{ shrink: true }} value = {productDescription} onChange={e => {
                                setProductDescription(e.target.value)
                            }}/>
                            <TextField name="productPrice" fullWidth required id="standard-required" type="number" label="Precio $" inputRef={register({ required: true })} InputLabelProps={{ shrink: true }} value = {productPrice} onChange={e => {
                                setProductPrice(e.target.value)
                            }}/>
                            
                            <TextField name="productQty" fullWidth required id="standard-required" type="number" label="Presentación ML" inputRef={register({ required: true })} InputLabelProps={{ shrink: true }} value = {productQty} onChange={e => {
                                setProductQty(e.target.value)
                            }}/>

                            <TextField name="productSupply" fullWidth required id="standard-required" type="number" label="Cantidad en inventario" inputRef={register({ required: true })} InputLabelProps={{ shrink: true }} value = {productSupply} onChange={e => {
                                setProductSupply(e.target.value)
                            }}/>

                            <FormControl fullWidth >
                              
                              <Controller
                              control={control}
                              fullWidth
                              name="productCategory"
                              defaultValue={productCategory}
                              as={
                                <Select id="trinity-select">
                                  <MenuItem value="">Elige una categoría</MenuItem>
                                  <MenuItem value="Oil">Oil</MenuItem>
                                  <MenuItem value="SkinCare">Skin Care</MenuItem>
                                  <MenuItem value="HairCare">Hair Care</MenuItem>
                                  <MenuItem value="Difusor">Difusor</MenuItem>
                                </Select>
                              }
                              />
                            </FormControl>

                            <Button type="submit" variant="contained" size="large" color="primary" className={classes.margin}>
                                Guardar
                            </Button>
                        </form>
                        {saved && <h2>La información del producto se ha guardado</h2>}
                    </Paper>
                    </Grid>
                </Grid>
            </Grid>}
        </div>
      );
}