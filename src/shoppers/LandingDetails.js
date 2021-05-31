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
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import { Loader } from '../common/Loader'


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
  
}));

export default function LandingDetails() {
    return (
        <h1>Hola</h1>
    );
}