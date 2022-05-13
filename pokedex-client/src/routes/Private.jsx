import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import StoreContext from "../store/context";

const ProtectedRoute = () => {
    const { token } = useContext(StoreContext);
    if (!token) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
