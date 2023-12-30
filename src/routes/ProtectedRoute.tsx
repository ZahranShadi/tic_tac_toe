import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthApi } from "../hooks/useAuthApi";

type RouteProps = {
    authenticatedView: boolean;
    element: React.ReactNode;
};

const ProtectedRoute: React.FC<RouteProps> = ({ authenticatedView, element }) => {
    const authed = useAuthApi().isUserLoggedIn();

    if (authenticatedView) {
        return authed ? element : <Navigate to="/" replace />;
    } else {
        return authed ? <Navigate to="/dashboard" replace /> : element;
    }
};

export default ProtectedRoute;