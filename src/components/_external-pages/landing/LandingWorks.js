import { motion } from 'framer-motion';
// material
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, Divider } from '@mui/material';
//
import { varWrapEnter, varFadeInRight, varFadeInUp } from '../../animate';

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
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'center'
  },
}));

// ----------------------------------------------------------------------

export default function LandingWorks() {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        {/* <HeroOverlayStyle alt="overlay" src="/static/overlay.svg" variants={varFadeIn} /> */}

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Stack justifyContent="space-between" spacing={5} alignItems="center">
                <Typography sx={{ color: 'common.white', fontSize: '25px', fontFamily: 'MontserratItalic' }}>
                  How Breeding NFT works?
                </Typography>
                <img src='/img/home/video.png' alt="vieo" style={{ width: '1000px' }} />
              </Stack>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Stack direction="row" spacing={3} alignItems="flex-start">
                {/* Reasearch */}
                <Stack justifyContent={'center'} spacing={1}>
                  <img src='/img/home/research.png' alt='research' style={{width: '60px', margin: 'auto'}} />
                  <Typography sx={{ color: 'common.white', fontFamily: 'Montserrat', fontSize: "20px", fontWeight: "bold" }}>
                    1. Research
                  </Typography>
                  <br />
                  <Typography sx={{ color: 'common.white', fontFamily: 'Montserrat', textAlign: "left" }}>
                    Search among the numerous NFTs and choose basing on the <b style={{color: "#7414F5"}}>price</b> and the <b style={{color: "#7414F5"}}>P.I.</b> (Price Increase)
                  </Typography>
                  <br />
                  <Typography sx={{ color: 'common.white', fontFamily: 'Montserrat', textAlign: "left" }}>
                    P.I. is the pepercentage of price increase
                  </Typography>
                </Stack>

                {/* Buy */}
                <Stack justifyContent={'center'} spacing={1}>
                  <img src='/img/home/buy.png' alt='buy' style={{width: '60px', margin: 'auto'}} />
                  <Typography sx={{ color: 'common.white', fontFamily: 'Montserrat', fontSize: "20px", fontWeight: "bold" }}>
                    2. Buy
                  </Typography>
                  <br />
                  <Typography sx={{ color: 'common.white', fontFamily: 'Montserrat', textAlign: "left" }}>
                    Connect you wallet and buy the NFT you have chosen.
                  </Typography>
                  <br />
                  <Typography sx={{ color: 'common.white', fontFamily: 'Montserrat', textAlign: "left" }}>
                    You may find NFT breeders interested in another P.I. for their <b style={{color: "#7414f5"}}>next sale.</b>
                  </Typography>
                </Stack>

                {/* Resell */}
                <Stack justifyContent={'center'} spacing={1}>
                  <img src='/img/home/resell.png' alt='resell' style={{width: '60px', margin: 'auto'}} />
                  <Typography sx={{ color: 'common.white', fontFamily: 'Montserrat', fontSize: "20px", fontWeight: "bold" }}>
                    3. Resell
                  </Typography>
                  <br />
                  <Typography sx={{ color: 'common.white', fontFamily: 'Montserrat', textAlign: "left" }}>
                    By participating in the <b style={{color: "#7414f5"}}>ecosystem</b> and reselling through BreedingNFT. You can constantly repelnish your cryptocurrency wallet.
                  </Typography>
                  <br />
                  <Typography sx={{ color: 'common.white', fontFamily: 'Montserrat', textAlign: "left" }}>
                    This is breeding of <b style={{color: "#7414f5"}}>NFTs!</b>
                  </Typography>
                </Stack>
              </Stack>
            </motion.div>

            <motion.div variants={varFadeInUp}>
              <Stack justifyContent="space-between" spacing={5} alignItems="center">
                <Typography sx={{ color: 'common.white', fontSize: '20px', fontFamily: 'Montserrat', fontWeight: 500 }}>
                  Waht are you waiting for ? Breed NFTs now with Our Community!
                </Typography>
              </Stack>
            </motion.div>
          </ContentStyle>
          <Divider sx={{ borderColor: "#7414F5" }} />
        </Container>
      </RootStyle>
      {/* <Box sx={{ height: { md: '100vh' } }} /> */}
    </>
  );
}