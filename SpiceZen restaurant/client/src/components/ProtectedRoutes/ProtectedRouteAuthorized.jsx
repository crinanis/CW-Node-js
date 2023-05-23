import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
export const ProtectedRouteAuthorized = ({ children }) => {
    const { user } = useUserAuth();

    if (user) {
        return <Navigate to="/home" />;
    }
    return children;
};

