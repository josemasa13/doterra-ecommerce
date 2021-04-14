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
  
 
  

export default function EventsList(props) {
    const history = useHistory();
    const classes = useStyles();
    function handleSection(sectionName) {
        history.push(`/${sectionName}`)
      }
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
          <Button variant="contained" color="primary"   >
              <DeleteForeverIcon /> Borrar Evento
              </Button>
          </TableCell>
          
        </TableRow>
            </TableHead>  
            </Table>
        </div>
    )
}