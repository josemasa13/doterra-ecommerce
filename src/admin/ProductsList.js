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
import { fetchProducts,deleteProduct } from '../utils/api';
import { useEffect, useState } from 'react';



const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  cover: {
    width: 150,
  },
  icon: {
    fontSize: 32,
  }
});
export default function ProductsList() {
  const classes = useStyles();
  const history = useHistory();
  const [checked, setChecked] = React.useState([]);
  const [data, setProductInfo] = React.useState([]);
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

  function cargarProdutos(){
    fetchProducts()
    .then((datos) => {
        setProductInfo([])
        //setProductInfo(datos)
        //console.log("ENTRO0",datos)
    })
  }

  function deleteproducts(productid) {
    deleteProduct(productid)
      .then((data) => {
        console.log(data)
      }) 
  }
  function borrarProductos() {
    for (var i = 0; i<datos_eliminados.length;i++) {
      deleteproducts(datos_eliminados[i])
    }
    datos_eliminados = []
    cargarProdutos()
  }

  useEffect(() => {
    fetchProducts()
    .then((data) => {
        setProductInfo(data)
        console.log(data)
    })
}, [])
  

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="medium" aria-label="a dense table">
      <TableHead>
      <TableRow>
        <TableCell> 
            <Button variant="contained" color="primary" onClick={() => handleSection('productos/agregar')} >
            <AddCircleIcon className="fa fa-plus-circle" />
            </Button>
        </TableCell>
        <TableCell> 
            <Button variant="contained" color="primary"  onClick={borrarProductos} >
            <DeleteForeverIcon className={classes.icon} />
            </Button>
        </TableCell>
        
      </TableRow>
          </TableHead>  
          <TableRow>
          <TableCell align="left">Seleccionar</TableCell>
            <TableCell align="left">Imagen</TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Descripcion</TableCell>
            <TableCell align="left">Cantidad</TableCell>
            <TableCell align="left">Precio</TableCell>
            <TableCell align="left">Editar</TableCell>
          </TableRow>
        <TableBody>
          {data.map((product) => (
            <TableRow key={product.id} >
              <TableCell align="left"><Checkbox value={product.productId} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }}/></TableCell>
              <TableCell align="left"><img src="https://cdn.shopify.com/s/files/1/1355/3237/products/doTERRA-Whisper-Essential-Oil-Blend-for-Women-0_1024x1024.jpg?v=1579880250" alt="Logo" height="100" width="100" /></TableCell>
              <TableCell align="left">{product.name}</TableCell>
              <TableCell align="left">{product.desc}</TableCell>
              <TableCell align="left">{product.qty}</TableCell>
              <TableCell align="left">{product.price}</TableCell>
              <TableCell> 
            <Button variant="contained" color="primary"  onClick={() => handleSectionEdit(product.productId)} >
            <EditIcon className={classes.icon} />
            </Button>
        </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}