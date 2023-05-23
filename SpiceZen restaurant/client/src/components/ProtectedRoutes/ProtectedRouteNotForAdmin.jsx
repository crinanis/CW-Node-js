import React from "react";
import {Navigate} from "react-router-dom";
import {useUserAuth} from "../../context/UserAuthContext";

export const ProtectedRouteNotForAdmin = ({children}) => {
    const {user} = useUserAuth();

    if (user) {
        if (user.email === "kusssyd@gmail.com") {
            return <Navigate to="/home"/>;
        }
    }

    return children;
};

