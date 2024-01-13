import { Link } from 'react-router-dom';

export default function SideNavbarTile({title,to}){
    return (
        <div>
            <Link to={to}>{title}</Link>
        </div>
    );
}