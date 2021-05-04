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
import { fetchEvent,updateEvent } from '../utils/api'
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




export default function Event(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const classes = useStyles();
    const [productInfo, setProductInfo] = useState({})
    const [eventId, setEventId] = useState("")
    const [eventName, setEventName] = useState("")
    const [eventLink, setEventLink] = useState("")
    const [eventQty, setEventQty] = useState("")
    const [eventDesc, setEventDesc] = useState("")
    const { eventIdparam } = useParams()
    const [ saved, setSaved ] = useState(false)
    const [loading, setLoading] = React.useState(true)


    const onSubmit = data => {

        console.log("Submit")
        updateEvent(eventIdparam, data)
        .then((data) => {
            console.log("Guardado")
            setSaved(true)
        })
    };

    useEffect(() => {
        fetchEvent(eventIdparam)
        .then((data) => {
            //setProductInfo(data)
            setEventId(data.eventId)
            setEventName(data.eventName)
            setEventLink(data.link)
            setEventQty(data.numParticipants)
            setEventDesc(data.eventDescription)
            setLoading(false)
        })
    }, [])

  
    return (
        <div className={classes.root}>
            <Typography className={classes.margin} align="center" variant="h5">Editar evento</Typography>
            {loading &&  <Loader />}
            {!loading && <Grid container spacing={1}>
                    <Paper className={classes.paper}>
                        <form onSubmit={handleSubmit(onSubmit)} className={classes.margin}>
                            <TextField name="eventId" fullWidth required id="standard-required" label="Id del Zoom" inputRef={register({ required: true })} InputLabelProps={{ shrink: true }} value = {eventId} onChange={e => {
                                setEventId(e.target.value)
                            }}/>
                            <TextField name="eventName"fullWidth required multiline id="standard-multiline" label="Nombre" rows={1} inputRef={register({ required: true })}  InputLabelProps={{ shrink: true }} value = {eventName} onChange={e => {
                                setEventName(e.target.value)
                            }}/>
                            <TextField name="link" fullWidth required id="standard-required" label="Link" inputRef={register({ required: true })} InputLabelProps={{ shrink: true }} value = {eventLink} onChange={e => {
                                setEventLink(e.target.value)
                            }}/>
                            <TextField name="numParticipants" fullWidth required id="standard-required" label="Numero" inputRef={register({ required: true })} InputLabelProps={{ shrink: true }} value = {eventQty} onChange={e => {
                                setEventQty(e.target.value)
                            }}/>
                            <TextField name="eventDescription" fullWidth required multiline id="standard-required"  label="Descripcion"   rows={8} inputRef={register({ required: true })} InputLabelProps={{ shrink: true }} value = {eventDesc} onChange={e => {
                                setEventDesc(e.target.value)
                            }}/>
                            <Button type="submit" variant="contained" size="large" color="primary" className={classes.margin}>
                                Guardar
                            </Button>
                        </form>
                        {saved && <h2>La información del producto se ha guardado</h2>}
                    </Paper>
            </Grid>}
        </div>
      );
}