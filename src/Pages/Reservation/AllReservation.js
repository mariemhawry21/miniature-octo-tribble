import React from 'react'
import Drawer from '../../Components/Drawer';

import { Box } from '@mui/material';



import Reservation from './Reservation';


export default function AllReservation() {
    return (
        <div>
            <Drawer />
            <Box height={0} sx={{ direction: "rtl" }} />
            <Box sx={{ width: "80%" }}>

                <Reservation/>
            </Box>
        </div>
    )
}
