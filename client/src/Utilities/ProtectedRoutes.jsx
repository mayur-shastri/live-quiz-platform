import { useState, useEffect } from "react";
import { isAuthenticated } from "./isAuthenticated";
import { useNavigate } from "react-router-dom";
import Loading from "../screens/Splash/Loading";

export default function ProtectedRoutes({ children }) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [authState, setAuthState] = useState(false);

    useEffect(()=>{
        const checkAuthentication = async ()=>{
            const isAuth = await isAuthenticated();
            setAuthState(isAuth);
            setLoading(false);
        }
        checkAuthentication();
    },[]);

    if(loading){
        return (
            <Loading/>
        );
    } else if(authState){
        return children;
    } else{
        navigate('/login');
    }
}