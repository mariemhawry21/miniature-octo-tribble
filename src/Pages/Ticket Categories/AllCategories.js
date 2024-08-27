import React, { useEffect } from 'react';
import Drawer from '../../Components/Drawer';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CategoryList from './CategoryList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllCategories() {
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
                <h2 className='table-head'>فئات التذاكر</h2>
                <div>
                    <Link to='/AddCategory'>
                        <button className='btn btn-primary add-button'>أضافه فئة التذكرة</button>
                    </Link>
                </div>
                <CategoryList />
            </Box>
        </div>
    );
}
