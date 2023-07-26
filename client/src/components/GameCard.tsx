import {CardMedia, Card, CardContent, Typography} from '@mui/material';

const GameCard = ({name, cover, summary}) => {
  return (
    <Card sx={{maxWidth: 345}}>
      <CardMedia
        sx={{height: 140}}
        image={cover}
        title='green iguana'
        component='img'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {summary}
        </Typography>
      </CardContent>
    </Card>
  )
};

export default GameCard;
