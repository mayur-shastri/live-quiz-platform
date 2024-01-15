import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function QuizInfoCard({imageUrl, title, lastAccessed}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    // ...
  };
  return (
    <Card sx={{height:280, width: 345, marginTop: '1em', marginLeft: '2em', boxShadow: 1, borderRadius: '1em'}}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleExpandClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        // subheader={`Last Accessed: ${lastAccessed}`}
        // subheader={`Last Accessed: ${new Date(lastAccessed).toLocaleDateString()}`}
        subheader={`Last Accessed: ${new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(lastAccessed))}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt="Paella dish"
      />
    </Card>
  );
}