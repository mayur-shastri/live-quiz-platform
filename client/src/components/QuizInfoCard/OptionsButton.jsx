import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { instance as configuredAxios } from '../../axiosConfig';
import { useContext } from 'react';
import FlashContext from '../../context providers/Flash/FlashContext';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function OptionsButton({ quiz_id, user_id, setUserData }) {

  const { setIsVisible, setFlashMessage, setFlashType } = useContext(FlashContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleExpandClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onEdit = () => {
    setAnchorEl(null);
    navigate(`/${user_id}/${quiz_id}/edit`);
  }

  const onShare = () => {
    setAnchorEl(null);
  }

  const onDuplicate = async () => {
    setAnchorEl(null);
    try {
      const res = await configuredAxios.post(`/${user_id}/${quiz_id}`);
      if (res.status === 200) {
        const userData = await configuredAxios.get(`/userdata`);
        console.log(userData);
        setUserData(userData.data.user);
      }
      setIsVisible(true);
      setFlashMessage(res.data.message);
      setFlashType(res.data.flashType);
    } catch (err) {
      setFlashMessage(err.response.data.message);
      setFlashType(err.response.data.flashType);
      setIsVisible(true);
    }

  }

  const onDelete = async () => {
    setAnchorEl(null);
    try {
      const res = await configuredAxios.delete(`/${user_id}/${quiz_id}`);
      if (res.status === 200) {
        const userData = await configuredAxios.get(`/userdata`);
        setUserData(userData.data.user);
      }
      setIsVisible(true);
      setFlashMessage(res.data.message);
      setFlashType(res.data.flashType);
    } catch(err){
      setFlashMessage(err.response.data.message);
      setFlashType(err.message.data.flashType);
      setIsVisible(true);
    }
  }

  return (
    <div>
      <IconButton aria-label="settings" onClick={handleExpandClick}>
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={onEdit} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={onDuplicate} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={onShare} disableRipple>
          <ShareIcon />
          Share
        </MenuItem>
        <MenuItem onClick={onDelete} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
}