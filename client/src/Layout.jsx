import { Outlet } from "react-router-dom";
import SideNavBar from "./components/SideNavbar/SideNavbar";
import Navbar from "./components/Appbar/Navbar";
import ProtectedRoutes from "./Utilities/ProtectedRoutes";

export default function Layout() {
    return (
        <ProtectedRoutes>
            <div className="flex flex-col h-screen">
                <div className="flex flex-grow">
                    <SideNavBar />
                    <div className="flex-grow">
                        <Navbar />
                        <Outlet />
                    </div>
                </div>
            </div>
        </ProtectedRoutes>
    );
}