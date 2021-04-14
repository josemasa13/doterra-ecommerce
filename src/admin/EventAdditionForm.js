import React from "react";
import { useForm } from "react-hook-form";
import { FormControl, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import { Loader } from '../common/Loader'
import { BrowserRouter as Router, Route, Redirect, Link, Switch, useHistory } from 'react-router-dom'



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

export default function EventAdditionForm(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const [ saved, setSaved ] = useState(false)
    const [loading, setLoading] = React.useState(false)
    const history = useHistory();


    const onSubmit = data => {
        setLoading(true)
        /*createProduct(data)
        .then((data) => {
            setSaved(true);
            setLoading(false);
            
        })*/
        history.push('/eventos')
    };

    const classes = useStyles();
  
    return (
        <div className={classes.root}>
            <Typography className={classes.margin} align="center" variant="h5">Agregar Evento</Typography>
                <Grid >
                    <Paper className={classes.paper}>
                        <form onSubmit={handleSubmit(onSubmit)} className={classes.margin}>
                            <TextField name="code" fullWidth required id="standard-required" label="Id del Zoom" inputRef={register({ required: true })} />
                            <TextField name="desc"fullWidth required multiline id="standard-multiline" label="Descripción del evento" rows={8} inputRef={register({ required: true })}  />
                            <TextField name="hora" fullWidth required id="standard-required" label="Hora" inputRef={register({ required: true })}/>
                            <Button type="submit" variant="contained" size="large" color="primary" className={classes.margin}>
                                Guardar Evento
                            </Button>
                        </form>
                        {loading && <Loader/>}
                        {saved && <h2>El producto se ha agregado</h2>}
                    </Paper>
                </Grid>
        </div>
      );
}