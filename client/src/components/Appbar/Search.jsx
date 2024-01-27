import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu'
import { useEffect, useState } from 'react';
import {instance as configuredAxios} from '../../axiosConfig';
import SearchResultCard from './SearchResultCard';

export default function Search() {

    const [userId, setUserId] = useState('');

    useEffect(()=>{
        const getUserId = async ()=>{
            const res = await configuredAxios.get('/userdata');
            if(res.status === 200){
                setUserId(res.data.user._id);
            }
        }
        getUserId();
    }, []);

    const [anchorE1, setAnchorE1] = useState(null);
    const [value, setValue] = useState('');
    const [quizzes, setQuizzes] = useState([]);

    const handleSearchbarClick = (e)=>{
        setAnchorE1(e.currentTarget);
    }

    const handleChange = async (e)=>{
        setValue(e.target.value);
        const res = await configuredAxios.get(`/${userId}/quizzes/search`, {query: e.target.value});
        if(res.status === 200){
            setQuizzes(res.data.foundQuizzes);
        }
    }

    const handleClose = (e)=>{
        setAnchorE1(null);
    }

    return (
        <>
            <Input
                type="text"
                placeholder="Search quizzes..."
                className="border border-gray-400 rounded-md px-2 py-1"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
                onClick={handleSearchbarClick}
                onChange={handleChange}
                value={value}
            />
            <Menu id="" anchorEl={anchorE1}
             keepMounted 
             open={Boolean(anchorE1)} 
             onClose={handleClose}
             >
               {
                quizzes.length === 0 ? <p className="text-center">No results</p> 
                : quizzes.map((quiz)=>{
                    <SearchResultCard user_id={userId} quiz_id={quiz._id} quizName={quiz.title}/>
                })
               }
            </Menu>
        </>
    );
}