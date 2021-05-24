import React from "react";
import { FormControl, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { fetchEvent,updateEvent,fetchPedido } from '../utils/api'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


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




export default function Pedido(props) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true)
    const { pedidoId } = useParams()
    const history = useHistory();
    const [dataPedido, setInfo] = React.useState();

    function handleSection() {
        history.push(`/Pedidos`)
      }

    

    useEffect(() => {
        fetchPedido(pedidoId)
        .then((data) => {
            setInfo(data)
            setLoading(false)
        })
    }, [])

  
    return (
        <div className={classes.root}>
            <Typography className={classes.margin} align="center" variant="h5">Pedido</Typography>
            
                
            {!loading && <Paper className={classes.paper}>
                        
                        <Typography className={classes.title} color="textPrimary" >
                            Nombre del cliente: {dataPedido.nombre}
                        </Typography>
                        <br/>
                        <Typography className={classes.title} color="textPrimary" >
                            idDelProducto: {dataPedido.idproducto}
                        </Typography>
                        <br/>
                        <Typography className={classes.title} color="textPrimary" >
                            Nombre del producto: {dataPedido.nombreproducto}
                        </Typography>
                        <br/>
                        <Typography className={classes.title} color="textPrimary" >
                            Cantidad : {dataPedido.cantidad}
                        </Typography>
                        <br/>
                        <Typography className={classes.title} color="textPrimary" >
                            Observaciones : {dataPedido.observaciones}
                        </Typography>
                        <br/>
                        <Typography className={classes.title} color="textPrimary" >
                            email del cliente: {dataPedido.email}
                        </Typography>
                            
                            
                            <Button type="submit" variant="contained" size="large" color="primary" className={classes.margin} onClick={() => handleSection()}>
                                Volver a los pedidos
                            </Button>
                    </Paper>}
           
        </div>
      );
}