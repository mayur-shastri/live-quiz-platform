import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import OptionsButton from './OptionsButton';

export default function QuizInfoCard({imageUrl, title, lastAccessed, quiz_id, user_id, setUserData}) {
// image url should be the url for image of the first slide of the quiz
  return (
    <Card sx={{height:270, width: 400, marginLeft: '1rem', marginBottom: '1rem', boxShadow: 1, borderRadius: '0.5rem'}}>
      <CardHeader
      sx={{height: 60}}
        action={
          <OptionsButton user_id={user_id} quiz_id={quiz_id} setUserData={setUserData}/>
        }
        title={title}
        // subheader={`Last Accessed: ${lastAccessed}`}
        // subheader={`Last Accessed: ${new Date(lastAccessed).toLocaleDateString()}`}
        subheader={`Last Edited: ${new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(lastAccessed))}`}
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