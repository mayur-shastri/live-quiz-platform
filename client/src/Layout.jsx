import { Outlet } from "react-router-dom";
import SideNavBar from "./components/SideNavbar/SideNavbar";

export default function Layout() {
    return (
        <div>
            <SideNavBar />
            <Outlet />
        </div>
    );
}