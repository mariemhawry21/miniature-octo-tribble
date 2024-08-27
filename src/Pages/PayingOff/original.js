import React, { useState } from 'react';
import Drawer from '../../Components/Drawer';
import { Box, FormControl, OutlinedInput, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, Paper, Button, IconButton, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import QRCode from 'react-qr-code';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { InputAdornment } from '@mui/material';

const ticketCategories = {
    'مصري': [
        { name: 'تذاكر اطفال', price: 50 },
        { name: 'تذاكر كبار', price: 100 },
        { name: 'تذاكر عائلية', price: 200 }
    ],
    'سعودي': [
        { name: 'تذاكر اطفال', price: 20 },
        { name: 'تذاكر كبار', price: 50 },
        { name: 'تذاكر عائلية', price: 150 }
    ],
    'انجليزي': [
        { name: 'تذاكر اطفال', price: 5 },
        { name: 'تذاكر كبار', price: 10 },
        { name: 'تذاكر عائلية', price: 25 }
    ],
    'امريكي': [
        { name: 'تذاكر اطفال', price: 10 },
        { name: 'تذاكر كبار', price: 20 },
        { name: 'تذاكر عائلية', price: 50 }
    ]
};

const testGuideOptions = ['Guide 1', 'Guide 2', 'Guide 3'];
const testBoatOptions = ['Boat 1', 'Boat 2', 'Boat 3'];

export default function PayingOff() {
    const [selectedNationality, setSelectedNationality] = useState("مصري");
    const [selectedGuideName, setSelectedGuideName] = useState("");
    const [selectedBoatName, setSelectedBoatName] = useState("");
    const [selectedTicketCategories, setSelectedTicketCategories] = useState({});
    const [tickets, setTickets] = useState([]);
    const [showQRCodes, setShowQRCodes] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [addGuideDialog, setAddGuideDialog] = useState(false);
    const [addBoatDialog, setAddBoatDialog] = useState(false);
    const [guideData, setGuideData] = useState({
        name: '',
        email: '',
        status: '',
        phoneNumber: '',
        profitPercentage: ''
    });
    const [boatData, setBoatData] = useState({
        name: '',
        status: ''
    });

    const handleAddTicket = (category) => {
        const newTicket = {
            nationality: selectedNationality,
            guideName: selectedGuideName,
            ticketType: category.name,
            ticketPrice: category.price,
            boatName: selectedBoatName,
            ticketCount: 1
        };

        setSelectedTicketCategories({ ...selectedTicketCategories, [category.name]: true });
        setTickets([...tickets, newTicket]);
    };

    const handleDeleteTicket = (index, ticketType) => {
        const updatedTickets = tickets.filter((ticket, i) => i !== index);
        setSelectedTicketCategories({ ...selectedTicketCategories, [ticketType]: false });
        setTickets(updatedTickets);
    };

    const handleIncreaseTicketCount = (index) => {
        const updatedTickets = [...tickets];
        updatedTickets[index].ticketCount++;
        setTickets(updatedTickets);
    };

    const handleDecreaseTicketCount = (index) => {
        const updatedTickets = [...tickets];
        if (updatedTickets[index].ticketCount > 1) {
            updatedTickets[index].ticketCount--;
            setTickets(updatedTickets);
        }
    };

    const handlePayment = () => {
        setShowQRCodes(true);
    };

    const handleCloseDialog = () => {
        setShowQRCodes(false);
        setTickets([]);
        setSelectedNationality("مصري");
        setSelectedGuideName("");
        setSelectedBoatName("");
        setSelectedTicketCategories({});
    };

    const handlePrint = () => {
        window.print();
    };

    const total = tickets.reduce((acc, curr) => acc + curr.ticketPrice * curr.ticketCount, 0);

    return (
        <div>
            <Drawer />
            <Box height={0} sx={{ direction: "rtl" }} />
            <Box sx={{ width: "80%", marginTop: "-30px" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'></div>
                        <div className='col-md-6'></div>
                    </div>
                </div>
                <div className='card table-style ' style={{ direction: "rtl" }}>
                    <div className="card-header table-head-style d-flex">
                        <h3>حجز تذكرة</h3>
                    </div>
                    <div className="card-body">
                        <div className="container">
                            <div className="row">
                                <div className='col-md-4 mt-1'>
                                    <label htmlFor="nationality" className="d-flex">الجنسية</label>
                                    <Select id="nationality" value={selectedNationality} onChange={(e) => setSelectedNationality(e.target.value)} className="form-control">
                                        {Object.keys(ticketCategories).map((nationality, index) => (
                                            <MenuItem key={index} value={nationality}>{nationality}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className='col-md-4 '>
                                    <label htmlFor="guideName" className="d-flex">
                                        اسم المرشد
                                        <IconButton onClick={() => setAddGuideDialog(true)}>
                                            <AddIcon className='addIcon' />
                                        </IconButton>
                                    </label>
                                    <Select id="guideName" value={selectedGuideName} onChange={(e) => setSelectedGuideName(e.target.value)} className="form-control">
                                        {testGuideOptions.map((option, index) => (
                                            <MenuItem key={index} value={option}>{option}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className='col-md-4 mt-1'>
                                    <label htmlFor="boatName" className="d-flex">
                                        اسم المركب
                                        <IconButton onClick={() => setAddBoatDialog(true)}>
                                            <AddIcon className='addIcon' />
                                        </IconButton>
                                    </label>
                                    <Select id="boatName" value={selectedBoatName} onChange={(e) => setSelectedBoatName(e.target.value)} className="form-control">
                                        {testBoatOptions.map((option, index) => (
                                            <MenuItem key={index} value={option}>{option}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="row" style={{ display: "flex", justifyContent: "center" }}>
                                {ticketCategories[selectedNationality].map((category, index) => (
                                    <div key={index} className='col-md-3 mt-4'>
                                        <div className="d-flex flex-column align-items-center ticket">
                                            <IconButton disabled={selectedTicketCategories[category.name]} onClick={() => handleAddTicket(category)}>
                                                <PersonIcon sx={{ color: "#000", fontSize: "55px" }} />
                                            </IconButton>
                                            <span>{category.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <TableContainer className='table-style table table-hover' sx={{ direction: "rtl" }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead className='table-head-style'>
                                <TableRow>
                                    <TableCell style={{ color: "#fff" }} align="right">الجنسية</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">اسم المرشد</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">اسم المركب</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">نوع التذكرة</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">عدد التذاكر</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">السعر</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">حذف</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tickets.map((ticket, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="right">{ticket.nationality}</TableCell>
                                        <TableCell align="right">{ticket.guideName}</TableCell>
                                        <TableCell align="right">{ticket.boatName}</TableCell>
                                        <TableCell align="right">{ticket.ticketType}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleDecreaseTicketCount(index)}>
                                                <RemoveIcon sx={{ backgroundColor: "#c72c2c", borderRadius: "3px", padding: " 0px", marginLeft: "5px", color: "#fff" }} />
                                            </IconButton>
                                            {ticket.ticketCount}
                                            <IconButton onClick={() => handleIncreaseTicketCount(index)}>
                                                <AddIcon sx={{ backgroundColor: "#199119", borderRadius: "3px", padding: " 0px", marginRight: "5px", color: "#fff" }} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">{ticket.ticketPrice * ticket.ticketCount}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleDeleteTicket(index, ticket.ticketType)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell sx={{ fontSize: "20px" }} align="right" colSpan={5}>المجموع الكلي</TableCell>
                                    <TableCell sx={{ fontSize: "20px" }} align="right">{total}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
                <div className='container' style={{ width: "87%" }}>
                    <div className="mt-4 mb-5">
                        <Button variant="contained" style={{ backgroundColor: "#000" }} onClick={handlePayment}><PaymentIcon sx={{ marginRight: "4px", fontSize: "19px" }} /> دفع</Button>
                    </div>
                </div>
                <Dialog maxWidth open={showQRCodes} onClose={handleCloseDialog}>
                    <DialogTitle>رموز الاستجابة السريعة</DialogTitle>
                    <DialogContent>
                        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                            {tickets.map((ticket, index) => (
                                <div
                                    style={{
                                        border: "1px #000 solid",
                                        padding: "17px"
                                    }}
                                    key={index} className="mt-4 ml-2 text-center">
                                    <Typography variant="h6" gutterBottom>رمز الاستجابة السريعة QR للتذكرة {index + 1}</Typography>
                                    <QRCode value={`تذكرة ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handlePrint}>طباعة</Button>
                        <Button onClick={handleCloseDialog}>إلغاء</Button>
                    </DialogActions>
                </Dialog>
                <Dialog minWidth open={addGuideDialog} onClose={() => setAddGuideDialog(false)}>
                    <DialogTitle>
                        <h3 style={{ display: "flex", justifyContent: "end" }}>

                        إضافة مرشد جديد
                        </h3>

                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <div className='container'>
                                <div className='row ' style={{direction:"rtl"}}>
                                    <div className='col-md-6 mt-3'>
                                        <FormControl fullWidth>
                                            <OutlinedInput
                                                size='small'
                                                placeholder="الاسم"
                                                value={guideData.name}
                                                onChange={(e) => setGuideData({ ...guideData, name: e.target.value })}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className='col-md-6  mt-3'>
                                        <FormControl fullWidth>
                                            <OutlinedInput
                                                size='small'
                                                placeholder="الايميل"
                                                value={guideData.email}
                                                onChange={(e) => setGuideData({ ...guideData, email: e.target.value })}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className='col-md-6  mt-3'>
                                        <FormControl fullWidth>
                                            <Select
                                            size='small'
                                                value={guideData.status}
                                                onChange={(e) => setGuideData({ ...guideData, status: e.target.value })}
                                                displayEmpty
                                            >
                                                <MenuItem value="" disabled>
                                                    حالة المرشد
                                                </MenuItem>
                                                <MenuItem value="active">نشط</MenuItem>
                                                <MenuItem value="inactive">غير نشط</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>  
                                    <div className='col-md-6  mt-3'>
                                        <FormControl fullWidth>
                                            <OutlinedInput
                                                size='small'
                                                placeholder="رقم الهاتف"
                                                value={guideData.phoneNumber}
                                                onChange={(e) => setGuideData({ ...guideData, phoneNumber: e.target.value })}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className='col-md-6  mt-3'>
                                        <FormControl fullWidth>
                                            <OutlinedInput
                                                size='small'
                                                placeholder="نسبة الربح"
                                                value={guideData.profitPercentage}
                                                onChange={(e) => setGuideData({ ...guideData, profitPercentage: e.target.value })}
                                                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setAddGuideDialog(false)}>إلغاء</Button>
                        <Button onClick={() => setAddGuideDialog(false)} autoFocus>حفظ</Button>
                    </DialogActions>
                </Dialog>
                <Dialog maxWidth open={addBoatDialog} onClose={() => setAddBoatDialog(false)}>
                    <DialogTitle>
                        <h3 style={{ display: "flex", justifyContent: "end" }}>
                            إضافة مركب جديد
                        </h3>
                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <div className='container'>
                                <div className='row'>

                                    <div className='col-md-6'>
                                        <FormControl fullWidth>
                                            <Select
                                                value={boatData.status}
                                                onChange={(e) => setBoatData({ ...boatData, status: e.target.value })}
                                                displayEmpty
                                                size='small'
                                            >
                                                <MenuItem value="" disabled>
                                                    حالة المركب
                                                </MenuItem>
                                                <MenuItem value="active">نشط</MenuItem>
                                                <MenuItem value="inactive">غير نشط</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>


                                    <div className='col-md-6'>
                                        <FormControl fullWidth>
                                            <OutlinedInput
                                                size='small'
                                                placeholder="الاسم"
                                                value={boatData.name}
                                                onChange={(e) => setBoatData({ ...boatData, name: e.target.value })}
                                            />
                                        </FormControl>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setAddBoatDialog(false)}>إلغاء</Button>
                        <Button onClick={() => setAddBoatDialog(false)} autoFocus>حفظ</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}






