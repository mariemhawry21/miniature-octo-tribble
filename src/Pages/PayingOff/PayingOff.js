/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputAdornment, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import QRCode from 'react-qr-code';
import Drawer from '../../Components/Drawer';
import PersonIcon from '@mui/icons-material/Person';
import { baseURL, CRUISES, CRUISES_CREATE, NATIONALITY, TICKETS, TOURGUIDE, TOURGUIDE_CREATE } from "../../Components/Api";
import Swal from 'sweetalert2';
import utf8 from 'utf8';

function PayingOff() {
    const [nationalities, setNationalities] = useState([]);
    const [guides, setGuides] = useState([]);
    const [boats, setBoats] = useState([]);
    const [ticketCategories, setTicketCategories] = useState([]);
    const [selectedNationality, setSelectedNationality] = useState('');
    const [selectedGuideName, setSelectedGuideName] = useState('');
    const [selectedBoatName, setSelectedBoatName] = useState('');
    const [selectedTicketCategories, setSelectedTicketCategories] = useState({});
    const [tickets, setTickets] = useState([]);
    const [total, setTotal] = useState(0);
    const [showQRCodes, setShowQRCodes] = useState(false);

    useEffect(() => {
        axios.get(`${baseURL}/${NATIONALITY}`).then(response => setNationalities(response.data));
        axios.get(`${baseURL}/${TOURGUIDE}`).then(response => setGuides(response.data));
        axios.get(`${baseURL}/${CRUISES}`).then(response => setBoats(response.data));
        axios.get(`${baseURL}/${TICKETS}`).then(response => setTicketCategories(response.data));
        fetchGuides();
        fetchBoats();
    }, []);

    const handleAddTicket = (ticket) => {
        setTickets([...tickets, {
            ticketType: ticket.name,
            ticketcurrency: ticket.currency,
            ticketCount: 1,
            ticketPrice: ticket.price,
            nationality: selectedNationality,
            guideName: selectedGuideName,
            boatName: selectedBoatName,
        }]);
        setSelectedTicketCategories({ ...selectedTicketCategories, [ticket.name]: true });
    };

    const handleIncreaseTicketCount = (index) => {
        const newTickets = [...tickets];
        newTickets[index].ticketCount += 1;
        setTickets(newTickets);
    };

    const handleDecreaseTicketCount = (index) => {
        const newTickets = [...tickets];
        if (newTickets[index].ticketCount > 1) {
            newTickets[index].ticketCount -= 1;
            setTickets(newTickets);
        }
    };

    const handleDeleteTicket = (index, ticketType) => {
        const newTickets = tickets.filter((_, i) => i !== index);
        setTickets(newTickets);
        const newSelectedTicketCategories = { ...selectedTicketCategories };
        delete newSelectedTicketCategories[ticketType];
        setSelectedTicketCategories(newSelectedTicketCategories);
    };

    useEffect(() => {
        const totalAmount = tickets.reduce((acc, ticket) => acc + (ticket.ticketPrice * ticket.ticketCount), 0);
        setTotal(totalAmount);
    }, [tickets]);

    const handleCloseDialog = () => {
        setShowQRCodes(false);
    };

    const handlePayment = () => {
        setShowQRCodes(true);
    };

    const handlePrint = () => {
        window.print();
    };

    const fetchGuides = async () => {
        try {
            const response = await axios.get(`${baseURL}/${TOURGUIDE}`);
            setGuides(response.data);
        } catch (error) {
            console.error("There was an error fetching the guides!", error);
        }
    };

    const fetchBoats = async () => {
        try {
            const response = await axios.get(`${baseURL}/${CRUISES}`);
            setBoats(response.data);
        } catch (error) {
            console.error("There was an error fetching the boats!", error);
        }
    };

    // add cruises 
    const [addBoat, setAddBoat] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        status: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitBoat = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.name) newErrors.name = "من فضلك ادخل الاسم";
        if (!formData.status) newErrors.status = " من فضلك اختر الحالة";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const payload = {
                name: formData.name,
                status: formData.status === "Active" ? 1 : 2,
            };

            const response = await axios.post(
                `${baseURL}/${CRUISES_CREATE}`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            fetchBoats();
            setAddBoat(false);
            Swal.fire("تم إضافة المركب بنجاح");
        } catch (error) {
            console.log("Error adding cruise:", error, error.message);
        }
    };

    // add guide 
    const [addGuide, setAddGuide] = useState(false);
    const [formDataguide, setFormDataguide] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        profitRate: "",
        status: ''
    });
    const [guideErrors, setGuideErrors] = useState({});

    const handleChangeGuide = (e) => {
        const { name, value } = e.target;
        setFormDataguide({ ...formDataguide, [name]: value });
    };

    const handleSubmitguide = async (e) => {
        e.preventDefault();
        const newErrors = {};
        const phoneNumberPattern = /^(012|010|011|015)\d{8}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formDataguide.name) newErrors.name = "من فضلك ادخل الاسم";

        if (!formDataguide.email) {
            newErrors.email = "من فضلك ادخل البريد الإلكتروني";
        } else if (!emailRegex.test(formDataguide.email)) {
            newErrors.email = "من فضلك ادخل بريد إلكتروني صحيح";

        } if (!formDataguide.status) newErrors.status = "من فضلك اختر الحالة ";
        if (!formDataguide.phoneNumber) {
            newErrors.phoneNumber = "من فضلك ادخل رقم الهاتف";
        } else if (!phoneNumberPattern.test(formDataguide.phoneNumber)) {
            newErrors.phoneNumber = "رقم الهاتف يجب أن يبدأ بـ 012 أو 010 أو 011 أو 015 ويكون 11 رقم";
        }
        const profitRate = parseFloat(formDataguide.profitRate);
        if (!formDataguide.profitRate) {
            newErrors.profitRate = "من فضلك ادخل نسبة الربح";
        }
        if (profitRate > 100) {
            newErrors.profitRate = "يجب أن تكون رقمًا أقل من أو تساوي 100";
        }
        if (profitRate <= 0) {
            newErrors.profitRate = "يجب أن تكون رقمًا أكبر من صفر";
        }
        if (isNaN(profitRate)) {
            newErrors.profitRate = "يجب أن تكون رقمًا";
        }

        if (Object.keys(newErrors).length > 0) {
            setGuideErrors(newErrors);
            return;
        }

        try {
            const payload = {
                name: formDataguide.name,
                email: formDataguide.email,
                phoneNumber: formDataguide.phoneNumber,
                profitRate: formDataguide.profitRate,
                status: formDataguide.status === "Active" ? 1 : 2,
            };

            await axios.post(`${baseURL}/tour-guides/create`, payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            fetchGuides();
            setAddGuide(false);
            Swal.fire("تم إضافة المرشد بنجاح");
        }
        catch (error) {
            console.error("There was an error adding the tour guide!", error);
        }
    };

    const nationalityTranslations = {
        "Egyptian": "مصري",
        "Saudi": "سعودي",
        "Kuwaiti": "كويتي",
        "Emirati": "إماراتي",
        "Qatari": "قطري",
        "Bahraini": "بحريني",
        "Omani": "عماني",
        "Jordanian": "أردني",
        "Lebanese": "لبناني",
        "Syrian": "سوري",
        "British": "بريطاني",
        "American": "أمريكي",
        "Canadian": "كندي",
        "Australian": "أسترالي"
    };

    const currencyNames = {
        0: "دولار أمريكي",
        1: "يورو",
        2: "جنيه مصري",
        3: "جنيه إسترليني",
        4: "ريال سعودي",
        5: "درهم إماراتي",
        6: "دينار كويتي"
    };

    return (
        <div>
            <Drawer />
            <Box height={0} sx={{ direction: "rtl" }} />
            <Box sx={{ width: "100%", marginTop: "-30px" }}>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-10">
                            <div className='card table-style ' style={{ direction: "rtl" }}>
                                <div className="card-header table-head-style d-flex">
                                    <h4>دفع التذاكر</h4>
                                </div>
                                <div className="card-body">
                                    <div className="container">
                                        <div className='row'>
                                            <div className='col-md-4 mt-2'>
                                                <label htmlFor="nationality" className="d-flex font-weight-bold">الجنسية</label>
                                                <Select id="nationality" value={selectedNationality} onChange={(e) => setSelectedNationality(e.target.value)} className="form-control">
                                                    {nationalities.map((nationality) => (
                                                        <MenuItem key={nationality.id} value={nationality.name}>{nationalityTranslations[nationality.name]}</MenuItem>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className='col-md-4'>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <label htmlFor="guideName" className="d-flex font-weight-bold">اسم المرشد</label>
                                                    <IconButton onClick={() => setAddGuide(true)}>
                                                        <AddIcon className='addIcon' />
                                                    </IconButton>
                                                </div>
                                                <Select id="guideName" value={selectedGuideName} onChange={(e) => setSelectedGuideName(e.target.value)} className="form-control">
                                                    {guides.map((guide) => (
                                                        <MenuItem key={guide.id} value={guide.name}>{guide.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className='col-md-4'>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <label htmlFor="boatName" className="d-flex font-weight-bold">اسم المركب</label>
                                                    <IconButton onClick={() => setAddBoat(true)}>
                                                        <AddIcon className='addIcon' />
                                                    </IconButton>
                                                </div>
                                                <Select id="boatName" value={selectedBoatName} onChange={(e) => setSelectedBoatName(e.target.value)} className="form-control">
                                                    {boats.map((boat) => (
                                                        <MenuItem key={boat.id} value={boat.name}>{boat.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            {Array.isArray(ticketCategories) && ticketCategories.map((ticket) => (
                                                <div className='my-1' key={ticket.id}>
                                                    <div className="d-flex flex-column align-items-center ticket px-3">
                                                        <IconButton variant="outlined" disabled={selectedTicketCategories[ticket.name]} onClick={() => handleAddTicket(ticket)}>
                                                            <PersonIcon sx={{ color: "#000", fontSize: "55px" }} />
                                                        </IconButton>
                                                        <span>{ticket.name}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="row mt-4">
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead className='table-head-style text-white'>
                                                        <TableRow className=' text-white'>
                                                            <TableCell style={{ color: "#fff", fontSize: "17px" }}>نوع التذكرة</TableCell>
                                                            <TableCell style={{ color: "#fff", fontSize: "17px" }}>السعر</TableCell>
                                                            <TableCell style={{ color: "#fff", fontSize: "17px" }}>العملة</TableCell>
                                                            <TableCell style={{ color: "#fff", fontSize: "17px" }}>الجنسية</TableCell>
                                                            <TableCell style={{ color: "#fff", fontSize: "17px" }}>اسم المرشد</TableCell>
                                                            <TableCell style={{ color: "#fff", fontSize: "17px" }}>اسم المركب</TableCell>
                                                            <TableCell style={{ color: "#fff", fontSize: "17px" }}>عدد التذاكر</TableCell>
                                                            <TableCell style={{ color: "#fff", fontSize: "17px" }}>الإجراءات</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {tickets.map((ticket, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>{ticket.ticketType}</TableCell>
                                                                <TableCell>{ticket.ticketPrice * ticket.ticketCount}</TableCell>
                                                                <TableCell>{currencyNames[ticket.ticketcurrency]}</TableCell>
                                                                <TableCell>{nationalityTranslations[ticket.nationality]}</TableCell>
                                                                <TableCell>{ticket.guideName}</TableCell>
                                                                <TableCell>{ticket.boatName}</TableCell>
                                                                <TableCell>
                                                                    <IconButton onClick={() => handleIncreaseTicketCount(index)}>
                                                                        <AddIcon sx={{ backgroundColor: "#199119", borderRadius: "3px", padding: "0px", marginRight: "5px", color: "#fff" }} />
                                                                    </IconButton>
                                                                    {ticket.ticketCount}
                                                                    <IconButton onClick={() => handleDecreaseTicketCount(index)}>
                                                                        <RemoveIcon sx={{ backgroundColor: "#c72c2c", borderRadius: "3px", padding: "0px", marginLeft: "5px", color: "#fff" }} />                                                                    </IconButton>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <IconButton onClick={() => handleDeleteTicket(index, ticket.ticketType)}>
                                                                        <DeleteIcon sx={{ color: "red" }} />
                                                                        {/* <span style={{fontSize:"18px", color:"red"}}>حذف</span>  */}
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                    <TableFooter>
                                                        <TableRow>
                                                            <TableCell sx={{ fontSize: "20px" }} align="right" colSpan={5}>المجموع الكلي</TableCell>
                                                            <TableCell sx={{ fontSize: "20px" }} align="right">{total}</TableCell>
                                                            <TableCell>
                                                                <Button variant="contained" style={{ backgroundColor: "" }}
                                                                    sx={{ marginRight: "4px", fontSize: "19px" }}
                                                                    startIcon={<PaymentIcon className='ml-2' />}
                                                                    onClick={handlePayment}
                                                                >

                                                                    دفع
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableFooter>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box >

            {/* add boats dialog  */}
            <Dialog open={addBoat} onClose={() => setAddBoat(false)} fullWidth style={{ direction: "rtl" }}>
                <DialogTitle>
                    <Typography style={{ display: "flex", justifyContent: "start", fontSize: "20px" }}>
                        إضافة مركب جديد
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <div className='container'>
                        <div className='row'>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name" className="d-flex">
                                        الاسم
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        aria-describedby="nameHelp"
                                    />
                                    {errors.name && (
                                        <h6 className="error-log">{errors.name}</h6>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="status" className="d-flex">
                                    الحالة
                                </label>
                                <TextField
                                    id="status"
                                    name="status"
                                    select
                                    value={formData.status}
                                    onChange={handleChange}
                                    size="small"
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="">اختر الحالة</option>
                                    <option value="Active">نشط</option>
                                    <option value="InActive">غير نشط</option>
                                </TextField>
                                {errors.status && (
                                    <h6 className="error-log">{errors.status}</h6>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddBoat(false)}>إلغاء</Button>
                    <Button onClick={handleSubmitBoat} variant="contained" disableElevation>
                        إضافة
                    </Button>
                </DialogActions>
            </Dialog>


            {/* add guides dialog  */}
            < Dialog open={addGuide} onClose={() => setAddGuide(false)} fullWidth style={{ direction: "rtl" }}>
                <DialogTitle>
                    <Typography style={{ display: "flex", justifyContent: "start", fontSize: "20px" }}>
                        إضافة مرشد جديد
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <div className='container'>
                        <div className='row'>

                            <div className='col-md-6 mt-2'>
                                <FormControl fullWidth error={!!guideErrors.name}>
                                    <OutlinedInput
                                        size='small'
                                        autoFocus
                                        margin="dense"
                                        id="guideNameInput"
                                        name="name"
                                        placeholder="اسم المرشد"
                                        value={formDataguide.name}
                                        onChange={handleChangeGuide}
                                    />
                                    <div className='error-log'>{guideErrors.name}</div>
                                </FormControl>
                            </div>

                            <div className='col-md-6 mt-2'>
                                <FormControl fullWidth error={!!guideErrors.status}>
                                    <Select
                                        size='small'
                                        labelId="guideStatusLabel"
                                        id="guideStatusSelect"
                                        name="status"
                                        value={formDataguide.status}
                                        onChange={handleChangeGuide}
                                        displayEmpty
                                        fullWidth
                                    >
                                        <MenuItem value="">
                                            اختر حالة المرشد
                                        </MenuItem>
                                        <MenuItem value="Active">نشط</MenuItem>
                                        <MenuItem value="InActive">غير نشط</MenuItem>
                                    </Select>
                                </FormControl>
                                <div className='error-log'>
                                    {guideErrors.status}
                                </div>
                            </div>

                            <div className='col-md-6 mt-2'>
                                <FormControl fullWidth error={!!guideErrors.profitRate}>
                                    <OutlinedInput
                                        size='small'
                                        margin="dense"
                                        id="guideProfitRateInput"
                                        name="profitRate"
                                        placeholder="نسبة الربح"
                                        value={formDataguide.profitRate}
                                        onChange={handleChangeGuide}
                                        endAdornment={
                                            <InputAdornment position="end">%</InputAdornment>
                                        }
                                    />
                                    <div className='error-log'>
                                        {guideErrors.profitRate}
                                    </div>
                                </FormControl>
                            </div>

                            <div className='col-md-6 mt-2'>
                                <FormControl fullWidth error={!!guideErrors.email}>
                                    <OutlinedInput
                                        size='small'
                                        margin="dense"
                                        id="guideEmailInput"
                                        name="email"
                                        placeholder="البريد الالكتروني"
                                        value={formDataguide.email}
                                        onChange={handleChangeGuide}
                                    />
                                    <div className='error-log'>
                                        {guideErrors.email}
                                    </div>
                                </FormControl>
                            </div>

                            <div className='col-md-6 mt-2'>
                                <FormControl fullWidth error={!!guideErrors.phoneNumber}>
                                    <OutlinedInput
                                        size='small'
                                        margin="dense"
                                        id="guidePhoneNumberInput"
                                        name="phoneNumber"
                                        placeholder="الهاتف"
                                        value={formDataguide.phoneNumber}
                                        onChange={handleChangeGuide}
                                    />
                                    <div className='error-log'>
                                        {guideErrors.phoneNumber}
                                    </div>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddGuide(false)}>إلغاء</Button>
                    <Button onClick={handleSubmitguide} variant="contained" disableElevation>
                        إضافة
                    </Button>
                </DialogActions>
            </Dialog >

            {/* QRCode dialog  */}
            < Dialog open={showQRCodes} onClose={handleCloseDialog} fullWidth style={{ direction: "rtl" }}>
                <DialogTitle>الـQR Code</DialogTitle>
                <DialogContent>
                    {tickets.map((ticket, index) => {
                        const qrValue = `نوع التذكرة: ${ticket.ticketType} 
                            عدد التذاكر: ${ticket.ticketCount} 
                            اسم المركب: ${ticket.boatName}
                            اسم المرشد: ${ticket.guideName} 
                            الجنسية: ${nationalityTranslations[ticket.nationality]} 
                            السعر: ${ticket.ticketPrice * ticket.ticketCount} ${currencyNames[ticket.ticketcurrency]}
                            المجموع الكلي : ${total}
                            `;
                        const encodedQRValue = utf8.encode(qrValue);

                        return (
                            <div key={index} style={{ textAlign: "center", margin: "10px 0" }}>
                                <QRCode value={encodedQRValue} />
                                <Typography variant="subtitle1">نوع التذكرة: {ticket.ticketType}</Typography>
                                <Typography variant="subtitle1">عدد التذاكر: {ticket.ticketCount}</Typography>
                                <Typography variant="subtitle1">اسم المركب: {ticket.boatName}</Typography>
                                <Typography variant="subtitle1">اسم المرشد: {ticket.guideName}</Typography>
                                <Typography variant="subtitle1">الجنسية: {nationalityTranslations[ticket.nationality]}</Typography>
                                <Typography variant="subtitle1">السعر: {ticket.ticketPrice * ticket.ticketCount}  {currencyNames[ticket.ticketcurrency]}</Typography>
                                <Typography variant="subtitle1">المجموع الكلي : {total}</Typography>
                            </div>
                        );
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePrint}>طباعة</Button>
                    <Button onClick={handleCloseDialog}>إغلاق</Button>
                </DialogActions>
            </Dialog >
        </div >
    );
}

export default PayingOff;
