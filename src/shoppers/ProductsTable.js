import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { useEffect, useState } from 'react';
import { fetchProducts,deleteProduct } from '../utils/api';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { FormControl, Typography } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '8em'
  },
  gridList: {
    width: 950,
    height: '100%',
    paddingTop: '10px'
  },

  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  
}));

const img = 'https://www.doterra.com/medias/625x325-15ml-60200190-breathe-us-english-web.jpg?context=bWFzdGVyfGltYWdlc3w0ODA1MnxpbWFnZS9qcGVnfGltYWdlcy9oOWEvaDU0LzE0NTU2MzE3ODc2MjU0LmpwZ3w4ZjdlZmM5YjdjZjQyMDFmOTBmY2EwOGZhOTU1OTg3ODdmZWQ1OWY5MmRiOGI4ZGNhNGEzYzc5ODM5ZGVhZDBl'

export default function ImageGridList() {
    const classes = useStyles();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts()
        .then((data) => {
            setProducts(data.body.Items)
            console.log(products)
        })
    }, [])

    

    return (
      <div className={classes.root}>
            <h1>Catálogo de productos</h1>
            <Grid container spacing={1}>
            
            
              {products.map((product) => (
                <Grid item xs={12} sm={4}>
                  <Paper elevation={4} className={classes.paper} textAlign="center">
                      <img src={img} alt={product.productName} />
                      <Typography>{product.productName}</Typography>
                      <Typography>${product.productPrice} MXN</Typography>
                      <Typography>{product.productSupply} piezas en inventario</Typography>
                      <Typography>Presentación: {product.productQty} Ml</Typography>
                         
                      
                  </Paper>
                </Grid>
              ))}

            </Grid>
                
                
      </div>
        
        
    );
}