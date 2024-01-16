import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import OptionsButton from './OptionsButton';

export default function QuizInfoCard({imageUrl, title, lastAccessed}) {

  return (
    <Card sx={{height:270, width: 400, margin: '2rem', boxShadow: 1, borderRadius: '0.5rem'}}>
      <CardHeader
      sx={{height: 60}}
        action={
          <OptionsButton/>
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