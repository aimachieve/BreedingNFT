import {React, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Stack } from '@mui/material';

export default function MultiActionAreaCard({uri}) {
  console.log("uri=>", uri)
  const [data, setData] = useState(null)

  useEffect(() => {
    console.log("useEffect")
    fetch(uri)
      .then(res => res.json())
      .then(resJson => {
        console.log("resJson =>", resJson)
        setData(resJson)
      })
      .catch(err => {
        console.log("err =>", err)
      })
  }, [uri])

  console.log("data=>", data)

  return (
    <Card sx={{ maxWidth: 220, margin: '20px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data.image}
          alt="NFT Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {data.pi}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Stack direction="row" spacing={10} justifyContent={'space-around'} alignItems={'center'}>
          <Typography gutterBottom variant="h6" component="div">
            {data.price}
          </Typography>
          <Button variant="contained" sx={{ border: '1px solid black' }}>BUY</Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
