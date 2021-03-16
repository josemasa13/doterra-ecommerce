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


const data = [
  {id:0,nombre:'Frozen yoghurt', img:'logo192.png',descripcion:"hlfdhlfhkjf",precio:34,cantidad:343},
  {id:1,nombre:'Frozen yoghurt', img:'logo192.png',descripcion:"hlfdhlfhkjf",precio:34,cantidad:343},
  {id:2,nombre:'Frozen yoghurt', img:'logo192.png',descripcion:"hlfdhlfhkjf",precio:34,cantidad:343},
  {id:3,nombre:'Frozen yoghurt', img:'logo192.png',descripcion:"hlfdhlfhkjf",precio:34,cantidad:343}
];

export default function ProductsList() {
  const classes = useStyles();
  const history = useHistory();
  const [checked, setChecked] = React.useState([]);

  const handleChange = (event) => {
    console.log(event.target.value)
    //setChecked(event.target.checked = true);
  };
  function handleSection(sectionName) {
    history.push(`/${sectionName}`)
  }
  function handleSectionEdit(productid) {
    history.push(`/productos/${productid}`)
  }

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
            <Button variant="contained" color="primary"  onClick={() => handleSection('eliminar')} >
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
              <TableCell align="left"><Checkbox value={product.id} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }}/></TableCell>
              <TableCell align="left"><img src={product.img} alt="Logo" height="100" width="100" /></TableCell>
              <TableCell align="left">{product.nombre}</TableCell>
              <TableCell align="left">{product.descripcion}</TableCell>
              <TableCell align="left">{product.cantidad}</TableCell>
              <TableCell align="left">{product.precio}</TableCell>
              <TableCell> 
            <Button variant="contained" color="primary"  onClick={() => handleSectionEdit(product.id)} >
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