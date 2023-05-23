import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
export const ProtectedRouteAdmin = ({ children }) => {
    const { user } = useUserAuth();

    if (user.email!=="kusssyd@gmail.com") {
        alert(user.email)
        return <Navigate to="/home" />;
    } else if (!user){
        return <Navigate to="/login" />;
    }
    return children;
};

