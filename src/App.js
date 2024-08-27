import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AllTickets from "./Pages/AddTicket/AllTickets";
import AddTicket from "./Pages/AddTicket/AddTicket";
import AddCategory from "./Pages/Ticket Categories/AddCategory";
import AllCategories from "./Pages/Ticket Categories/AllCategories";
import AddTourGuides from "./Pages/TourGuides/AddTourGuides";
import AllTourGuides from "./Pages/TourGuides/AllTourGuides";
import AllCruises from "./Pages/Cruises/AllCruises";
import AddCruises from "./Pages/Cruises/AddCruises";
import AddPlaces from "./Pages/Places/AddPlaces";
import AllPlaces from "./Pages/Places/AllPlaces";
import AllProducts from "./Pages/Products/AllProducts";
import AddProducts from "./Pages/Products/AddProducts";
import AllReservation from "./Pages/Reservation/AllReservation";
import PayingOff from "./Pages/PayingOff/PayingOff";
import Login from "./Pages/Login";
import EditTicket from "./Pages/AddTicket/EditTicket";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" exact element={<Login />}></Route>
          <Route path="/Home" exact element={<Home />}></Route>
          <Route path="/AllTickets" exact element={<AllTickets />}></Route>
          <Route path="/AddTicket" exact element={<AddTicket />}></Route>
          <Route path="/EditTicket" exact element={<EditTicket />}></Route>
          <Route path="/AddCategory" exact element={<AddCategory />}></Route>
          <Route
            path="/AllCategories"
            exact
            element={<AllCategories />}
          ></Route>
          <Route
            path="/AddTourGuides"
            exact
            element={<AddTourGuides />}
          ></Route>
          <Route
            path="/AllTourGuides"
            exact
            element={<AllTourGuides />}
          ></Route>
          <Route path="/AllCruises" exact element={<AllCruises />}></Route>
          <Route path="/AddCruises" exact element={<AddCruises />}></Route>
          <Route path="/AddPlaces" exact element={<AddPlaces />}></Route>
          <Route path="/AllPlaces" exact element={<AllPlaces />}></Route>
          <Route path="/AllProducts" exact element={<AllProducts />}></Route>
          <Route path="/AddProducts" exact element={<AddProducts />}></Route>
          {/* <Route path="/ProductsList" exact element={<ProductsList/>}></Route> */}
          <Route path="/AddProducts" exact element={<AddProducts />}></Route>
          {/* <Route path="/Reservation" exact element={<Reservation/>}></Route>   */}
          <Route
            path="/AllReservation"
            exact
            element={<AllReservation />}
          ></Route>
          <Route path="/PayingOff" exact element={<PayingOff />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
