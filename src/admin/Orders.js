import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useHistory } from "react-router-dom";
import { fetchProducts,deleteProducts,fetchPedidos } from '../utils/api';
import { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  table: {
    minWidth: 650
  },
  cover: {
    width: 150,
  },
  icon: {
    fontSize: 32,
  }
}));

function Loader(){
  return (
    <CircularProgress />
  )
}


export default function ProductsList() {
  const classes = useStyles();
  const history = useHistory();
  var [data, setOrdersInfo] = React.useState([]);
  var [loading, setLoading] = React.useState(true)
  const [filtro, setfiltro] = React.useState({
    estatus:"Activo",
    activo: true
  });
  let datos_eliminados = []

  

  function handleSection(sectionName) {
    history.push(`/${sectionName}`)
  }
  function handleSectionEdit(productid) {
    history.push(`/pedido/${productid}`)
  }

  function cargarPedidos(estatus_pedidos){
    var datos_aceptados = []
    fetchPedidos()
    .then((datos) => {
      for (let value of datos) {
        if (value["estatus"] == estatus_pedidos){
          datos_aceptados.push(value)
        }
      }
      setOrdersInfo(datos_aceptados)
    })
  }

  function cargarProdutos(){
    fetchProducts()
    .then((data) => {
        //setProductInfo(data.body.Items)
        setLoading(false);
    })
  }


  const handleChange = (event) => {

    if (filtro.activo == true){
      cargarPedidos(false)
      setfiltro({ ...filtro, ["activo"]: false,["estatus"]: "Inactivos" });
    }
    else{
      cargarPedidos(true)
      setfiltro({ ...filtro, ["activo"]: true,["estatus"]: "Activos" });
    }
    
    
  };
  
  useEffect(() => {
    var datos_aceptados = []
    fetchPedidos()
    .then((datos) => {
        console.log("Pedidos Inicio")
        for (let value of datos) {
          if (value["estatus"] == true){
            datos_aceptados.push(value)
          }
        }
        console.log("Pedidos Final")
        console.log(datos)
        setOrdersInfo(datos_aceptados)
        setLoading(false);
    })
}, [])

  

  return (
    <div className={classes.root}>
      {loading && <Loader />}

      {!loading && <TableContainer component={Paper}>
        <Table className={classes.table} size="medium" aria-label="a dense table">
        <TableHead>
        <TableRow>
          <TableCell> 
              Pedidos {filtro.estatus} <Switch checked={filtro.activo} onChange={handleChange} color="primary" />
          </TableCell>
        </TableRow>
            </TableHead>  
            <TableRow>
              <TableCell align="center">idProducto</TableCell>
              <TableCell align="left">Nombre de Producto</TableCell>
              <TableCell align="left">Cantidad</TableCell>
              <TableCell align="left">email</TableCell>
              <TableCell align="left">Nombre del cliente</TableCell>
              <TableCell align="left">Ver detalles</TableCell>
            </TableRow>
          <TableBody>
            {data.map((orders) => (
              <TableRow key={orders.id} >
                <TableCell align="center">{orders.idproducto}</TableCell>
                <TableCell align="center">{orders.nombreproducto}</TableCell>
                <TableCell align="center">{orders.cantidad}</TableCell>
                <TableCell align="center">{orders.email}</TableCell>
                <TableCell align="center">{orders.nombre}</TableCell>
                <TableCell> 
              <Button variant="contained" color="primary"  onClick={() => handleSectionEdit(orders.pedidoId)} >
              <VisibilityIcon className={classes.icon} />
              </Button>
          </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </div>
  );
}