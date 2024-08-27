import React, { useEffect } from 'react'
import Drawer from '../../Components/Drawer';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import PlacesList from './PlacesList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllPlaces() {
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
                    <h2 className='table-head' >الاماكن</h2>
                    <Link to='/AddPlaces'>
                        <button className='btn btn-primary add-button'>اضافه مكان</button>
                    </Link>
                </div>
                <PlacesList/>
            </Box>
        </div>
    )
}
