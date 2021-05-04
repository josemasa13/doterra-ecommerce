import React from 'react';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import { fetchEvents,deleteEvents } from '../utils/api';
import { useEffect, useState } from 'react';


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

  let data = [{id:123787,desc:"ESTA ES EL EVENTO 1",hora:"12:00 pm"},
              {id:1234898,desc:"ESTA ES EL EVENTO 2",hora:"11:00 am"},
              {id:123456,desc:"ESTA ES EL EVENTO 3",hora:"10:00 am"},
              {id:125678,desc:"ESTA ES EL EVENTO 4",hora:"09:00 am"}
            ];
  
 
  

export default function EventsList(props) {

    let datos_eliminados = []
    const [data, setEventInfo] = React.useState([]);
    const history = useHistory();

    const classes = useStyles();
    function handleSection(sectionName) {
        history.push(`/${sectionName}`)
    }


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

      function cargarEventos(){
        fetchEvents()
        .then((data) => {
            setEventInfo(data)
        })
      }

      function borrarEventos() {
        if (datos_eliminados.length>0){
          let arregloID = {"Events":datos_eliminados} 
          deleteEvents(arregloID)
            .then((data) => {
                cargarEventos()
              datos_eliminados = []
            })
        }
      }

      function handleSectionEdit(productid) {
        history.push(`/eventos/${productid}`)
      }

      useEffect(() => {
        fetchEvents()
        .then((data) => {
            setEventInfo(data)
        })
    }, [])
      
    return (
        <div className={classes.root}>
        <Table  size="medium" aria-label="a dense table">
        <TableHead>
        <TableRow>
    
          <TableCell> 
              <Button variant="contained" color="primary" onClick={() => handleSection('eventos/agregar')} >
              <AddCircleIcon className="fa fa-plus-circle" />  Crear Evento
              </Button>
          </TableCell>
          <TableCell> 
          <Button variant="contained" color="primary" onClick={borrarEventos}  >
              <DeleteForeverIcon /> Borrar Evento
              </Button>
          </TableCell>
          
        </TableRow>
            </TableHead>

            <TableRow>
            <TableCell align="left">Seleccionar</TableCell>
            <TableCell align="left">Id del zoom</TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Descripcion</TableCell>
            <TableCell align="left">Numero_Participantes</TableCell>
            <TableCell align="left">Descripcion</TableCell>
            </TableRow>

            <TableBody>
            
            {data.map((event) => (
              <TableRow key={event.eventId} >
                <TableCell align="left"><Checkbox value={event.eventId} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }}/></TableCell>

                <TableCell align="left">{event.eventId}</TableCell>
                <TableCell align="left">{event.eventName}</TableCell>
                <TableCell align="left">{event.link}</TableCell>
                <TableCell align="left">{event.numParticipants}</TableCell>
                <TableCell align="left">{event.eventDescription}</TableCell>
                <TableCell> 
                <Button variant="contained" color="primary"  onClick={() => handleSectionEdit(event.eventId)} >
                <EditIcon className={classes.icon} />
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>  
            </Table>
        </div>
    )
}