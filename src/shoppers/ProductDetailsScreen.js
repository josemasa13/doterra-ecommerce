import React from "react";
import { useForm } from "react-hook-form";
import { FormControl, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { createProduct } from '../utils/api'
import { useEffect, useState } from 'react';
import { Loader } from '../common/Loader'
import Header from './Header'
import ProductDetails from './ProductDetails'
import { BrowserRouter as Router, Route, Redirect, Link, Switch, useHistory } from 'react-router-dom'


export default function ProductDetailsScreen(props) {
   return (
    <div>
        <Header />
        <ProductDetails />
    </div>
   );
}