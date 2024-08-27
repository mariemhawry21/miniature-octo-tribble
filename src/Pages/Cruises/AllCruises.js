import React, { useEffect } from 'react'
import Drawer from '../../Components/Drawer';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CruisesList from './CruisesList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllCruises() {
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
                    <h2 className='table-head' >المراكب </h2>
                    <Link to='/AddCruises'>
                        <button className='btn btn-primary add-button'>اضافه مركب</button>
                    </Link>
                </div>
                <CruisesList />
            </Box>
        </div>
    )
}
