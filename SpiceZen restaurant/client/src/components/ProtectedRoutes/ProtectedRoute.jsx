import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
export const ProtectedRoute = ({ children }) => {
    const { user } = useUserAuth();

    console.log("Check user in Private: ", user);
    if (!user) {
        return <Navigate to="/login" />;
    } else if(user.email==="kusssyd@gmail.com") {
        return <Navigate to="/home" />;
    }
    return children;
};

