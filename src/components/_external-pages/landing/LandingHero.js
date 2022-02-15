import { motion } from 'framer-motion';
// material
import { styled } from '@mui/material/styles';
import { Button, Container, Typography, Stack, Divider } from '@mui/material';
//
import { varWrapEnter, varFadeInUp, varFadeIn } from '../../animate';

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

const ContentStyle = styled((props) => <Stack direction="row" spacing={5} justifyContent="space-around" {...props} />)(({ theme }) => ({
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

// const HeroImgStyle = styled(motion.img)(({ theme }) => ({
//   top: 0,
//   right: 0,
//   bottom: 0,
//   zIndex: 8,
//   width: '100%',
//   margin: 'auto',
//   position: 'absolute',
//   [theme.breakpoints.up('lg')]: {
//     right: '8%',
//     width: 'auto',
//     height: '48vh'
//   }
// }));

// ----------------------------------------------------------------------

export default function LandingHero() {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <HeroOverlayStyle alt="overlay" src="/static/overlay.svg" variants={varFadeIn} />

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInUp}>
              <Stack justifyContent="center" spacing={5} mt={5}>
                <Typography sx={{ color: 'common.white', fontFamily: 'MontserratItalic' }}>
                  Become a NFT Breeder
                </Typography>
                <Typography sx={{ color: 'common.white', fontSize: '20px', fontFamily: 'Montserrat', fontWeight: 'bold' }}>
                  Buy and resell on BredingNFT only, <br />
                  making a profit through P.I.
                </Typography>
                <Typography sx={{ color: 'common.white', fontSize: '20px', fontFamily: 'MontserratItalic' }}>
                  An exclusive NFT marketplace that allows anyone <br />
                  to earn
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="space-around">
                  <Button href="/research" variant='contained' sx={{ background: 'white', border: '2px solid black', color: '#7414F5', fontSize: '20px', fontFamily: 'Montserrat' }}>
                    Explore
                  </Button>
                  <Button href="/resell" variant='contained' sx={{ border: '2px solid white', fontSize: '20px', fontFamily: 'Montserrat' }}>
                    Resell
                  </Button>
                </Stack>
              </Stack>
            </motion.div>

            <motion.div variants={varFadeInUp}>
              <img src='/img/home/3d_card.png' alt='3d-card' />
              <Typography sx={{ color: 'common.white', fontFamily: 'MontserratItalic' }}>
                Join with Our Community
              </Typography>
              <Stack direction="row" justifyContent={'center'} spacing={1} alignItems={'center'}>
                <img src='/img/home/facebook.png' style={{ width: '60px', height: '60px' }} alt='facebook' />
                <img src='/img/home/twitter.png' style={{ width: '60px', height: '40px' }} alt='twitter' />
                <img src='/img/home/instagram.png' style={{ width: '45px', height: '45px' }} alt='instagram' />
                <img src='/img/home/discord.png' style={{ width: '43px', height: '43px' }} alt='discord' />
              </Stack>
            </motion.div>

          </ContentStyle>
          <Divider sx={{borderColor: "#7414F5"}}/>
        </Container>
      </RootStyle>
    </>
  );
}
