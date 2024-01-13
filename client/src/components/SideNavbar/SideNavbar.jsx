import { Link } from "react-router-dom";

export default function SideNavBar(){
    return (
        <div>
            <h1>SideNavBar</h1>
            <Link to='/home'>Home</Link>
            <Link to='/quizzes'>My Quizzes</Link>
            <Link to='/help'>Help</Link>
            <Link to='/feedback'>Feedback</Link>
            <Link to='/trash'>Trash</Link>
        </div>
    );
}