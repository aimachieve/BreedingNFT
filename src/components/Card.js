import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Stack } from '@mui/material';

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 220, margin: '20px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="NFT Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Title
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            P.I.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Stack direction="row" spacing={10} justifyContent={'space-around'} alignItems={'center'}>
          <Typography gutterBottom variant="h6" component="div">
            Price
          </Typography>
          <Button variant="contained" sx={{ border: '1px solid black' }}>BUY</Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
