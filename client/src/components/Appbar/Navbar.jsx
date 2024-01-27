import Search from "./Search";
import "./Navbar.css";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
export default function Navbar(){
    return (
        <div className="flex flex-row justify-end p-2 Navbar">
            <Search className="ml-auto"/>
            <ProfileIcon/>
        </div>
    );
}