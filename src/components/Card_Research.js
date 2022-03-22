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
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { formatBigNumber } from '../utils/formatNumber';

export default function Card_Research({ NFT }) {
  console.log("NFT =>", NFT)
  const [data, setData] = useState(null)
  const [mintingApproved, setMintingApproved] = useState(false)
  const { account } = useWeb3React();

  const NFTContract = useNFTContract(process.env.REACT_APP_NFT_CONTRACT_ADDRESS)
  const BUSDContract = useTokenContract(process.env.REACT_APP_BUSD_CONTRACT_ADDRESS)
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log(typeof (NFT[0]))
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

  useEffect(() => {
    const checkMintingAllowance = async () => {
      try {
        const result = await BUSDContract.allowance(
          account,
          process.env.REACT_APP_NFT_CONTRACT_ADDRESS
        );
        const allowedBalance = ethers.utils.formatUnits(result);

        console.log("allowedBalance =>", allowedBalance)
        if (allowedBalance > 0) {
          setMintingApproved(true);
        } else {
          setMintingApproved(false);
        }
      } catch (error) {
        console.log("Error:", error);
        setMintingApproved(false);
      }
    };

    checkMintingAllowance()
  }, [])

  const handleMintingApprove = async (tokenId) => {
    try {
      // const NFTApprovedResult = await NFTContract.approve(
      //   account,
      //   tokenId
      // )
      // console.log("NFTApprovedResult=>", NFTApprovedResult)
      const mintingApprovedResult = await BUSDContract.approve(
        process.env.REACT_APP_NFT_CONTRACT_ADDRESS,
        ethers.constants.MaxUint256
      );
      console.log("mintingApprovedResult =>", mintingApprovedResult);
      enqueueSnackbar("Approved successfully!", {
        variant: "success",
      });
      setMintingApproved(true);
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar(error, {
        variant: "error",
      });
      setMintingApproved(false);
    }
  };

  const buyNFT = async (tokenId, price) => {
    console.log("tokeId, Price", tokenId, price)
    try {
      await NFTContract.buyNFT(tokenId, price)

      enqueueSnackbar("NFT is yours!", {
        variant: "success",
      });
    } catch (error) {
      console.log("error:", error)
      enqueueSnackbar(MetamaskErrorMessage(error), {
        variant: "error"
      })
    }
  }

  return (
    <Card sx={{
      maxWidth: 250,
      margin: '20px',
      ...(!NFT[0] && { display: 'none' })
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
            {formatBigNumber(NFT[2]).toFixed(2)} BUSD
          </Typography>

          {mintingApproved ? (
            <Button variant="contained" disabled={!account} sx={{ border: '1px solid black' }} onClick={() => { buyNFT(NFT[3], formatBigNumber(NFT[2])) }}>
              {account ? 'Buy' : 'Connect wallet ⬆️'}
            </Button>) : (
            <Button variant="contained" disabled={!account} sx={{ border: '1px solid black' }} onClick={() => handleMintingApprove(NFT[3])}>
              {account ? 'Approve' : 'Connect wallet ⬆️'}
            </Button>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}
