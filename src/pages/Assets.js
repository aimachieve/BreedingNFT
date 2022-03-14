import { React, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion';
// material
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, TextField, Grid, Button } from '@mui/material';
//
import { varFadeInUp } from '../components/animate';
import Card from '../components/Card_Assets'
// Contract
import { useNFTContract } from '../hooks/useContract'
import { formatBigNumber } from 'utils/formatNumber';
import { useWeb3React } from "@web3-react/core";

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: "#494949",
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    // position: 'fixed',
    alignItems: 'center'
  }
}));

const ContentStyle = styled((props) => <Stack spacing={5} justifyContent="space-between" {...props} />)(({ theme }) => ({
  zIndex: 10,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'center'
  },
}));

const HeroOverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});
// ----------------------------------------------------------------------

export default function Assets() {
  const { account } = useWeb3React();
  const NFTContract = useNFTContract(process.env.REACT_APP_NFT_CONTRACT_ADDRESS)
  console.log("NFT COntract=>", NFTContract)
  console.log("account=>", account)

  const [NFTs, setNFTs] = useState(null)
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("useState")
    const init = async () => {
      const tokenIds = await NFTContract.tokensOfOwner(account)
      console.log("tokenIds=>", tokenIds)

      const data = []
      for (var i = 0; i < tokenIds.length; i++) {
        console.log("tokenId=>", formatBigNumber(tokenIds[i]))
        const NFT = await NFTContract.getNFT(formatBigNumber(tokenIds[i]))
        console.log("NFT=>", NFT)
        data.push([...NFT, formatBigNumber(tokenIds[i])])
      }
      if (data.length)
        setNFTs(data)
    }

    init()
  }, [account, pathname])

  return (
    <RootStyle id="move_top" initial="initial" animate="animate" variants={varFadeInUp}>
      <HeroOverlayStyle alt="overlay" src="/static/overlay.svg" variants={varFadeInUp} />

      <Container maxWidth="lg">
        <ContentStyle>
          <Typography variant="h1">
            My Assets
          </Typography>
          <Stack direction={'row'} flexWrap={'wrap'} alignItems="center" justifyContent={'center'}>
            {
              NFTs ?
                
              map((NFT, i) => (
                  <motion.div variants={varFadeInUp} key={i}>
                    <Card NFT={NFT} />
                  </motion.div>
                )) :
                <Typography variants="h4">
                  There is no NFT in your account!
                </Typography>
            }
          </Stack >
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
