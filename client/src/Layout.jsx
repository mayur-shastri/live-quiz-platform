import { Outlet } from "react-router-dom";
import SideNavBar from "./components/SideNavbar/SideNavbar";
import Navbar from "./components/Appbar/Navbar";
import ProtectedRoutes from "./Utilities/ProtectedRoutes";
import { CssBaseline } from "@mui/material";
import FlashCard from "./components/FlashCard/FlashCard";
import { useContext } from "react";
import FlashContext from "./context providers/Flash/FlashContext";

export default function Layout() {

    const {isVisible} = useContext(FlashContext);

    return (
        <CssBaseline>
            <ProtectedRoutes>
                    <div className="h-screen w-full p-0 m-0">
                        <div className="flex flex-grow w-full p-0 m-0">
                            <SideNavBar />
                            <div className="flex-grow w-full p-0 m-0">
                                <Navbar />
                                <div className="flex flex-row w-full justify-end items-center">
                                {
                                    isVisible ? <FlashCard/> : null
                                }
                                </div>
                                <Outlet />
                            </div>
                        </div>
                    </div>
            </ProtectedRoutes>
        </CssBaseline>
    );
}