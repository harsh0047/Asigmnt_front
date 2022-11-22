import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../components/Home/Home";
import Auth from "../screens/Auth/Auth";
import Admin from '../components/Admin/Admin';

const ScreenRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="*" element={<Navigate to="/404" />} /> */}
                <Route path="/" element={<Auth />} />
                <Route path="/home" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    )
}

export default ScreenRouter  
