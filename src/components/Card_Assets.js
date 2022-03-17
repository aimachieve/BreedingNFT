import { React, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Stack, Divider } from '@mui/material';
// Contract
import { useNFTContract, useTokenContract } from '../hooks/useContract'
import { MetamaskErrorMessage } from "utils/MetamaskErrorMessage";
import { useSnackbar } from "notistack";

export default function MultiActionAreaCard({ NFT }) {
  console.log("NFT =>", NFT)
  const [data, setData] = useState(null)
  const NFTContract = useNFTContract(process.env.REACT_APP_NFT_CONTRACT_ADDRESS)
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log(typeof(NFT[0]))
    fetch(NFT[1])
      .then(res => res.json())
      .then(resJson => {
        console.log("resJson =>", resJson)
        setData(resJson)
      })
      .catch(err => {
        console.log("err =>", err)
      })
  }, [])

  const resellNFT = async (tokenId) => {
    try {
      await NFTContract.resellNFT(tokenId)

      enqueueSnackbar("Resell is available, confirm it in research page!", {
        variant: "success",
      });
    } catch(error) {
      enqueueSnackbar(MetamaskErrorMessage(error), {
        variant: "error"
      })
    }
  }

  return (
    <Card sx={{
      maxWidth: 260,
      margin: '20px'
    }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data && data.image}
          alt="NFT Image"
        />
        <Divider />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Title : {data && data.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            P.I : {data && data.pi}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data && data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
        <Stack direction="row" spacing={10} justifyContent={'space-around'} alignItems={'center'}>
          <Typography gutterBottom variant="h6" component="div">
            {NFT[2]} BUSD
          </Typography>
          <Button variant="contained" disabled={NFT[0]} sx={{ border: '1px solid black' }} onClick={() => {resellNFT(NFT[3])}} >Resell</Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
