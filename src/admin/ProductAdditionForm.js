import React from "react";
import { useForm } from "react-hook-form";
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { createProduct, addProductImage } from '../utils/api'
import { useEffect, useState } from 'react';
import { Loader } from '../common/Loader'
import { BrowserRouter as Router, Route, Redirect, Link, Switch, useHistory } from 'react-router-dom'
import InputLabel from "@material-ui/core/InputLabel";
import { Controller } from "react-hook-form";
import { FormControl, TextField, MenuItem, Select } from "@material-ui/core";

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

  input: {
    display: "none"
  }
}));

function Saved(props){
    return(
        <h2>Tu producto se ha guardado  </h2>
    )

}

export default function ProductAdditionForm(props) {
    const { register, handleSubmit, watch, errors, control } = useForm();
    const [ saved, setSaved ] = useState(false)
    const [loading, setLoading] = React.useState(false)
    const [selectedImage, setSelectedImage] = React.useState(null)
    const history = useHistory();

    const fileChangedHandler = (event) => {
      setSelectedImage(event.target.files[0])
      console.log(event.target.files[0])
    }


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
            data.productImages = [res.imageUrl]
            createProduct(data)
            .then((res) => {
                setSaved(true);
                setLoading(false);
                history.push('/productos')
            })
          })
        } else{
          setLoading(true)
          createProduct(data)
          .then((data) => {
              setSaved(true);
              setLoading(false);
              history.push('/productos')
          })
        }

        
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
                </Grid>

                <Grid height="100%" item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        <form onSubmit={handleSubmit(onSubmit)} className={classes.margin}>
                            <TextField name="productName" fullWidth required id="standard-required" label="Nombre de producto" inputRef={register({ required: true })} />
                            <TextField name="productDesc"fullWidth required multiline id="standard-multiline" label="Descripción del producto" rows={8} inputRef={register({ required: true })}  />
                            <TextField name="productPrice" fullWidth required type="number" id="standard-required" label="Precio $" inputRef={register({ required: true })}/>
                            <TextField name="productQty" fullWidth required  type="number" id="standard-required" label="Presentación ML" inputRef={register({ required: true })}/>
                            <TextField name="productSupply" fullWidth required type="number" id="standard-required" label="Cantidad en inventario" inputRef={register({ required: true })}/>
                            <FormControl fullWidth >
                              <InputLabel htmlFor="productCategory">
                                  Elige una categoría de producto
                              </InputLabel>
                              <Controller
                              control={control}
                              fullWidth
                              name="productCategory"
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
                            <Button type="submit" variant="contained" fullWidth color="primary" className={classes.margin}>
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