import { Outlet } from "react-router-dom";
import SideNavBar from "./components/SideNavbar/SideNavbar";
import Navbar from "./components/Appbar/Navbar";
import ProtectedRoutes from "./Utilities/ProtectedRoutes";
import { CssBaseline } from "@mui/material";

export default function Layout() {
    return (
        <CssBaseline>
            <ProtectedRoutes>
            <div className="h-screen w-full p-0 m-0">
                <div className="flex flex-grow w-full p-0 m-0">
                    <SideNavBar />
                    <div className="flex-grow w-full p-0 m-0">
                        <Navbar />
                        <Outlet />
                    </div>
                </div>
            </div>
        </ProtectedRoutes>
        </CssBaseline>
    );
}