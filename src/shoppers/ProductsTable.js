import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { useEffect, useState } from 'react';
import { fetchProducts, filterProducts, fetchCategories, searchProducts } from '../utils/api';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { FormControl, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import { Loader } from '../common/Loader'
import SearchBar from 'material-ui-search-bar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '4em'
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

  image: {
    maxWidth: "100%"
  },

  searchBar: {
    margin: '0.5em'
  }
  
}));

const img = 'https://www.doterra.com/medias/625x325-15ml-60200190-breathe-us-english-web.jpg?context=bWFzdGVyfGltYWdlc3w0ODA1MnxpbWFnZS9qcGVnfGltYWdlcy9oOWEvaDU0LzE0NTU2MzE3ODc2MjU0LmpwZ3w4ZjdlZmM5YjdjZjQyMDFmOTBmY2EwOGZhOTU1OTg3ODdmZWQ1OWY5MmRiOGI4ZGNhNGEzYzc5ODM5ZGVhZDBl'

export default function ImageGridList() {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState({});
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [search, setSearch] = useState(null);
    const history = useHistory();
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        fetchProducts()
        .then((data) => {
            setProducts(data.body.Items)
            console.log(data.body.Items)
        })

        fetchCategories()
        .then((res) => {
          const newArr = Array.from(res, x => [x.categoryType, false])
          const newObj = Object.fromEntries(newArr)
          console.log(newObj)
          setCategories(newObj);
          setLoading(false);
        })
        
    }, [])

    const handleChange = (event) => {
      setCategories({ ...categories, [event.target.name]: event.target.checked });
    };

    const onMinChange = e => {
      const { value } = e.target;
      setMinPrice(value);
    };

    const onMaxChange = e => {
      const { value } = e.target;    
      setMaxPrice(value);
    };

    const onSearchChange = e => {
      const { value } = e.target;    
      setSearch(value);
    };

    function searchProds(){
      setLoading(true)
      var objToSearch = {
        value: search
      }

      searchProducts(objToSearch)
      .then((res) => {
        setProducts(res)
        setLoading(false)
      })
    }



    function filter(){
      setLoading(true)
      const categoriesArray = Object.entries(categories);
      const checked = categoriesArray.filter(([key, value]) => value === true);
      const categoriesFilterObject = Object.fromEntries(checked);
      for (const key of Object.keys(categoriesFilterObject)){
        categoriesFilterObject[key] = key
      }

      const finalObj = {
        ...categoriesFilterObject,
        minPrice: minPrice ? parseInt(minPrice) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice) : undefined
      }


      filterProducts(finalObj)
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
    }

    function clear(){
      setLoading(true)
      fetchProducts()
        .then((data) => {
            setProducts(data.body.Items)
            setLoading(false)
            setSearch("")
            setMinPrice("")
            setMaxPrice("")
            fetchCategories()
            .then((res) => {
              const newArr = Array.from(res, x => [x.categoryType, false])
              const newObj = Object.fromEntries(newArr)
              console.log(newObj)
              setCategories(newObj);
              setLoading(false);
            })
        })
    }

    

    return (
      <div className={classes.root}>
            {loading &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" alignItems="center">
                            <Loader />
                        </Grid>
                    </Grid>
                </Grid>
            }
            {!loading && <Grid container spacing={1}>
                <Grid item xs={12} className={classes.searchBar}>
                  <Grid container justify="center" alignItems="center">
                    <TextField
                      className={classes.margin}
                      id="input-with-icon-textfield"
                      label="Buscador"
                      value={search}
                      onChange={onSearchChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button variant="contained" color="primary" onClick={searchProds}>
                      Buscar
                    </Button>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Grid container justify="center">
                    <Typography variant="h5">Categorías</Typography>
                  </Grid>
                </Grid>


                <Grid item xs={12} sm={6}>
                  <Grid container justify="center">
                    <Typography variant="h5">Rango de precios</Typography>
                  </Grid>
                </Grid>

                

                <Grid item xs={12} sm={6}>
                  <Grid container justify="center">
                    {Object.keys(categories).map((category, i) => (
                        <FormControlLabel
                        control={
                          <Checkbox
                            checked={categories[category]}
                            onChange={handleChange}
                            name={category}
                            color="primary"
                          />
                        }
                        label={category}
                      />
                    ))}
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Grid container justify="center">
                    <TextField type="number" id="outlined-basic" label="Precio Mínimo" variant="outlined" onChange={onMinChange} value={minPrice}/>
                    <TextField type="number" id="outlined-basic" label="Precio Máximo" variant="outlined" onChange={onMaxChange} value={maxPrice}/>
                  </Grid>
                </Grid>
                
                <Grid item xs={12}>
                  <Grid container justify="center">
                    <Button variant="contained" color="primary" onClick={filter}>
                      Filtrar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={clear}>
                      Limpiar
                    </Button>
                  </Grid>
                </Grid>
              
                <Grid item xs={12}>
                  <Grid container justify="center">
                    <h1>Catálogo de productos</h1>
                  </Grid>
                </Grid>
                
                {products.map((product) => (
                  <Grid item xs={12} sm={4}>
                    <Link component={RouterLink} to={`/shop/${product.productId}`}>
                      <Paper elevation={4} className={classes.paper} textAlign="center">
                          <img src={product.productImages ? product.productImages : img} alt={product.productName} className={classes.image}/>
                          <Typography>{product.productName}</Typography>
                          <Typography>${product.productPrice} MXN</Typography>
                          <Typography>{product.productSupply} piezas en inventario</Typography>
                          <Typography>Presentación: {product.productQty} Ml</Typography>
                      </Paper>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            }
                
                
      </div>
        
        
    );
}