import { Outlet } from "react-router-dom";
import SideNavBar from "./components/SideNavbar/SideNavbar";
import Navbar from "./components/Appbar/Navbar";

export default function Layout() {
    return (
        <div className="flex flex-col h-screen">
            {/* <Navbar/> */}
            <div className="flex flex-grow">
                    <SideNavBar/>
                <div className="flex-grow">
                <Navbar/>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}