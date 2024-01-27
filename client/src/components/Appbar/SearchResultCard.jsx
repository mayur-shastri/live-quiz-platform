import React from 'react'
import { useNavigate } from 'react-router-dom';

function SearchResultCard({user_id,quizName,quiz_id}) {
    const navigate = useNavigate();
    
    return (
        <div className='flex flex-row justify-between items-center w-64 p-2 hover:bg-gray-200 cursor-pointer'
            onClick={()=>{
                navigate(`/quiz/${user_id}/${quiz_id}/edit`);
            }}
            >
                <Typography variant="body1" 
                color="initial"
                sx={{ml: 2}}
                >{quizName}</Typography>
            </div>
    );
}

export default SearchResultCard;
