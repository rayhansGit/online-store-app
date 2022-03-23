/** @format */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actionCreators/productsActions';
import Product from './Product';
import ProductAdder from './ProductAdder';

const Products = () => {
     const dispatch = useDispatch();
     //const products = dispatch(getProducts());
    
    return (<></>);
};

export default Products;
