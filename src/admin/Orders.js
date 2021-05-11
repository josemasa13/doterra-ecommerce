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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useHistory } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import { fetchProducts,deleteProducts,fetchPedidos } from '../utils/api';
import { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'


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
  const [checked, setChecked] = React.useState([]);
  const [data, setOrdersInfo] = React.useState([]);
  const [loading, setLoading] = React.useState(true)
  let datos_eliminados = []

  const handleChange = (event) => {

    let index = -1;
    for (var i = 0; i<datos_eliminados.length;i++) {
      if (datos_eliminados[i] == event.target.value){
        index = i
      }
    }
    if(index != -1){
      datos_eliminados.splice(index,1)
      console.log("Eliminado "+event.target.value)
      console.log(datos_eliminados)
    }
    else{
      datos_eliminados.push(event.target.value)
      console.log("Agregado "+event.target.value)
    }
  };

  function handleSection(sectionName) {
    history.push(`/${sectionName}`)
  }
  function handleSectionEdit(productid) {
    history.push(`/productos/${productid}`)
  }

  function cargarPedidos(){
    fetchPedidos()
    .then((data) => {
        console.log("Pedidos Inicio")
        console.log(data)
        console.log("Pedidos Final")
        setOrdersInfo(data)
        setLoading(false);
    })
  }

  function cargarProdutos(){
    fetchProducts()
    .then((data) => {
        //setProductInfo(data.body.Items)
        setLoading(false);
    })
  }
  function borrarProductos() {
    
    if (datos_eliminados.length>0){
    
      let arregloID = {"Products":datos_eliminados} 
      deleteProducts(arregloID)
        .then((data) => {
          cargarProdutos()
          datos_eliminados = []
        })
        
    }
  }
  
  useEffect(() => {
    fetchPedidos()
    .then((data) => {
        console.log("Pedidos Inicio")
        console.log(data)
        console.log("Pedidos Final")
        setOrdersInfo(data)
        setLoading(false);
    })
}, [])

let datos = [
    {id:1,num:3,pedidos:[{nombre:"ALOE VERA", cantidad:5},{nombre:"ALOE", cantidad:2}], fecha:"21/02/2021",contacto:"eduardo.andremtz@hotmail.com"},
    {id:2,num:2,pedidos:[{nombre:"Manzanilla", cantidad:10},{nombre:"MELISSA", cantidad:2}], fecha:"21/02/2021",contacto:"eduardo.andremtz@hotmail.com"},
    {id:5,num:1,pedidos:[{nombre:"ALOE VERA", cantidad:5},{nombre:"ALOE", cantidad:2},{nombre:"Manzanilla", cantidad:10}], fecha:"24/02/2021",contacto:"eduardo.andremtz@hotmail.com"}
]
  

  return (
    <div className={classes.root}>
      {loading && <Loader />}

      {!loading && <TableContainer component={Paper}>
        <Table className={classes.table} size="medium" aria-label="a dense table">
        <TableHead>
        <TableRow>
          <TableCell> 
              <Button variant="contained" color="primary"  onClick={borrarProductos} >
              <DeleteForeverIcon className={classes.icon} />
              </Button>
          </TableCell>
          
        </TableRow>
            </TableHead>  
            <TableRow>
            <TableCell align="left">Seleccionar</TableCell>
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
                <TableCell align="left"><Checkbox value={orders.id} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }}/></TableCell>
                <TableCell align="center">{orders.idproducto}</TableCell>
                <TableCell align="center">{orders.nombreproducto}</TableCell>
                <TableCell align="center">{orders.cantidad}</TableCell>
                <TableCell align="center">{orders.email}</TableCell>
                <TableCell align="center">{orders.nombre}</TableCell>
                <TableCell> 
              <Button variant="contained" color="primary"  onClick={() => handleSectionEdit(orders.productId)} >
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