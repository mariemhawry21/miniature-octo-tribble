import React, { useEffect } from 'react'
import Drawer from '../../Components/Drawer';

import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import ProductsList from './ProductsList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllProducts() {
    useEffect(() => {
        const alertMessage = localStorage.getItem('alertMessage');
        if (alertMessage) {
            toast.success(alertMessage);
            setTimeout(() => {
                localStorage.removeItem('alertMessage');
            }, 2000);
        }
    }, []);
    return (
        <div>
            <Drawer />
            <ToastContainer />
            <Box sx={{ width: "80%" }}>
                <div>
                    <h2 className='table-head' >المنتجات</h2>
                    <Link to='/AddProducts'>
                        <button className='btn btn-primary add-button'>اضافه منتج</button>
                    </Link>
                </div>

                <ProductsList/>
            </Box>
        </div>
    )
}
