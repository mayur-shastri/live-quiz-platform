import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

export default function Search() {
    return(
            <Input
                type="text"
                placeholder="Search quizzes..."
                className="border border-gray-400 rounded-md px-2 py-1"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
    );
}