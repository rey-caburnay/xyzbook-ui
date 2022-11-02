import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Book(book) {
    const info = book.book;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={`data:image/png;base64,${info.cover}`}
        alt={info.title}
      />
      <CardContent>
        
        <Typography gutterBottom variant="h5" component="div">
          {info.title}  <span className='badge'></span>
          <Typography variant="overline">
          {info.edition}
          
        </Typography>
   
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {info.authors}
          
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {info.publisher} 
          <Typography variant="subtitle2" color="text.secondary">
            {info.publication} 
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            ${info.price} 
          </Typography>
      
        </Typography>
      </CardContent>
      <CardActions>
        <a size="small" href={`/book/${info.isbn13}`}>Learn More</a>
      </CardActions>
    </Card>
  );
}
