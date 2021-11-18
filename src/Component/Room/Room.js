import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useHistory } from 'react-router';
import { Button } from '@mui/material';
import { AttachMoney, Favorite, LocalHotel, Wc } from '@mui/icons-material';

export default function Room(props) {
  const {title, bed, bedType, imgUrl, capacity, avatar, price, description} = props.room;
  const history = useHistory()
      const handleBook = (bedType) => {
          history.push(`/book/${bedType}`);
      }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {avatar}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image={imgUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="add to favorites">
           <LocalHotel />: {bed} 
         </IconButton>
        <IconButton aria-label="share">
           <Wc />: {capacity} 
         </IconButton>
        <IconButton aria-label="price">
          <AttachMoney/>: {price} 
         </IconButton>
        <Button onClick={() => handleBook(bedType)} variant="contained" color="primary">
            Book
        </Button>
      </CardActions>
    </Card>
  );
}
