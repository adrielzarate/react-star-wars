import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from "react-router-dom";

export const Auth = () => {
    const { error } = useAuth0();
    return (error) ? <span>{error.message}</span> : <Navigate to="/characters/" replace />;
};
