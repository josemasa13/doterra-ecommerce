import React from "react";
import { useForm } from "react-hook-form";
import { FormControl, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const productData = {
    nombre: "Aceite Esencial",
    descripcion: "Este aceite logra curar todos los males",
    precio: 400,
    imagen: "https://cdn.shopify.com/s/files/1/1355/3237/products/doTERRA-Whisper-Essential-Oil-Blend-for-Women-0_1024x1024.jpg?v=1579880250"
    
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  form: {
    margin: theme.spacing(2),
  }
}));




export default function Product(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const classes = useStyles();
    var screenType = props.mode === "agregar" ? "Agregar Producto" : "Editar Producto";
  
    return (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography>{screenType}</Typography>
                    
                    
                </Paper>

                <Paper className={classes.paper}>
                    <form className={classes.form}>
                        <TextField fullWidth required id="standard-required" label="Nombre de producto"/>
                        <TextField fullWidth required multiline id="standard-multiline" label="Descripción del producto" rows={8} />
                        <TextField required id="standard-required" label="Precio $"/>
                    </form>
                </Paper>


                
                   
            </Grid>
          </Grid>
        </div>
      );
}