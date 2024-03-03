import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import OptionsButton from './OptionsButton';
import SlideView from '../../screens/Presentation/Creator/PresentModeScreens/SlideView';
import { styled } from '@mui/system';

export default function QuizInfoCard({ slide, title, lastAccessed, quiz_id, user_id, setUserData }) {

  const ScaledSlideView = styled(SlideView)({
    transform: 'scale(0.5)',
  });

  return (

    <Card sx={{ height: 270, width: 400, marginLeft: '1rem', marginBottom: '1rem', boxShadow: 1, borderRadius: '0.5rem' }}>
      <CardHeader
        sx={{ height: 60 }}
        action={
          <OptionsButton user_id={user_id} quiz_id={quiz_id} setUserData={setUserData} />
        }
        title={title}
        subheader={`Last Edited: ${new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(lastAccessed))}`}
      />
      <div className='flex flex-col h-screen'>
        <SlideView slide={slide} scaleX={0.5} scaleY={0.5} infoCardPreview={true} />
      </div>
    </Card>
  );

}