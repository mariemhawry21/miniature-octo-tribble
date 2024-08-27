import React, { useEffect } from 'react'
import Drawer from '../../Components/Drawer';
import TicketsList from './TicketsList';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function All() {
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
            <div style={{ widows: "100%" }}>
                <Box sx={{ width: "80%" }}>
                    <div>
                        <h2 className='table-head' >قائمه التذاكر</h2>
                        <Link to='/AddTicket'>
                            <button className='btn btn-primary add-button '>اضافه تذكره</button>
                        </Link>
                    </div>
                    <TicketsList />
                </Box>
            </div>
        </div>
    )
}
