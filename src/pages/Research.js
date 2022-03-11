import { React, useEffect, useState } from 'react'
import { motion } from 'framer-motion';
// material
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, TextField, Grid, Button } from '@mui/material';
//
import { varFadeInUp, varFadeInRight } from '../components/animate';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Card from '../components/Card'
// Contract
import { useNFTContract } from '../hooks/useContract'
// import { useWeb3React } from "@web3-react/core";
import { formatBigNumber } from 'utils/formatNumber';

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

export default function Research() {
  // const { account } = useWeb3React();
  const NFTContract = useNFTContract(process.env.REACT_APP_NFT_CONTRACT_ADDRESS)
  console.log("NFT COntract=>", NFTContract)

  // const [totalSupply, setTotalSupply] = useState(0)
  const [NFTs, setNFTs] = useState(null)

  useEffect(() => {
    const init = async () => {
      const totalSupply = await NFTContract.totalSupply()
      // setTotalSupply(formatBigNumber(totalSupply))
      console.log("totlaSupply=>", formatBigNumber(totalSupply))

      const data = []
      for (var i = 1; i <= formatBigNumber(totalSupply); i++) {
        const tokenURI = await NFTContract.getNFT(i)
        data.push(tokenURI)
      }
      setNFTs(data)
      console.log("NFTs state=>", NFTs)
    }

    init()
  }, [])

  return (
    <RootStyle id="move_top" initial="initial" animate="animate" variants={varFadeInUp}>
      <HeroOverlayStyle alt="overlay" src="/static/overlay.svg" variants={varFadeInUp} />

      <Container maxWidth="lg">
        <ContentStyle>
          <motion.div variants={varFadeInRight}>
            <Grid
              container
              justifyContent={{ xs: 'center', md: 'space-between' }}
              sx={{ textAlign: { xs: 'center', md: 'left' } }}
              spacing={3}
            >
              <Grid item xs={12} md={3} sx={{ border: 'solid 1px #7414F5' }} p={2}>
                <Stack direction={'row'} spacing={2} alignItems="center" mb={3} sx={{ borderBottom: "solid 3px #7414f5" }}>
                  <FilterListIcon sx={{ fontSize: '40px' }} />
                  <Typography variant="h4" sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}>Filter</Typography>
                </Stack>

                {/* Price */}
                <Stack spacing={2} sx={{ borderBottom: "solid 3px #7414f5" }} pb={1} mb={3}>
                  <Stack direction="row" alignItems={'center'} spacing={5} justifyContent="space-between">
                    <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>Price</Typography>
                    <ArrowDropDownIcon sx={{ fontSize: '40px' }} />
                  </Stack>
                  <Stack direction="row" alignItems={'center'} spacing={2} justifyContent="space-between">
                    <TextField id="min_price" label="Min" variant="outlined" />
                    <Typography variant="h6" sx={{ fontFamily: "Montserrat" }}>to</Typography>
                    <TextField id="max_price" label="Max" variant="outlined" />
                  </Stack>
                </Stack>

                {/* P.I. */}
                <Stack spacing={2} sx={{ borderBottom: "solid 3px #7414f5" }} pb={1} mb={3}>
                  <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>P.I.</Typography>
                  <Stack direction="row" alignItems={'center'} spacing={2} justifyContent="space-between">
                    <TextField id="min_price" label="Min" variant="outlined" />
                    <Typography variant="h6" sx={{ fontFamily: "Montserrat" }}>to</Typography>
                    <TextField id="max_price" label="Max" variant="outlined" />
                  </Stack>
                </Stack>

                {/* Status P.I. */}
                <Stack spacing={2} sx={{ borderBottom: "solid 3px #7414f5" }} pb={1} mb={3}>
                  <Button variant="contained" sx={{ background: "white", color: 'black' }}>New</Button>
                  <Button variant="contained" sx={{ background: "white", color: 'black' }}>Discounted</Button>
                  <Button variant="contained" sx={{ background: "white", color: 'black' }}>Reselled</Button>
                  <Button variant="contained" sx={{ background: "white", color: 'black' }}>Most viewed</Button>
                </Stack>

                {/* Apply */}
                <Stack spacing={2} mb={2}>
                  <Button variant="contained" sx={{ border: '1px solid black' }}>Apply</Button>
                </Stack>
              </Grid>

              <Grid item xs={12} md={9}>
                <Stack direction={'row'} flexWrap={'wrap'} alignItems="center" justifyContent={'center'}>
                  {
                    NFTs && NFTs.map((uri, i) => (
                      <motion.div variants={varFadeInUp} key={i}>
                        <Card uri={uri} />
                      </motion.div>
                    ))
                  }
                </Stack >
              </Grid>
            </Grid>
          </motion.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
