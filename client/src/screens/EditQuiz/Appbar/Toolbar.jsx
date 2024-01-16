import "./Navbar.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function Toolbar(){
    
    return (
        <div className="flex flex-row justify-end p-2 Navbar w-full  ">
            <div className="flex flex-row justify-center items-center"
            style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'gray', marginLeft: '10px' }}>
                <AccountCircleIcon />
            </div>
        </div>
    );
}