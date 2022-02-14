import { motion } from 'framer-motion';
// material
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, TextField, Grid, Button, Divider } from '@mui/material';
//
import { varFadeInUp, varFadeInRight } from '../components/animate';

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

const ContentStyle = styled((props) => <Stack spacing={15} justifyContent="space-between" {...props} />)(({ theme }) => ({
  zIndex: 10,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'center'
  },
}));

// ----------------------------------------------------------------------

export default function Dashboard() {
  return (
    <RootStyle id="move_top" initial="initial" animate="animate" variants={varFadeInUp}>
      {/* <HeroOverlayStyle alt="overlay" src="/static/overlay.svg" variants={varFadeIn} /> */}

      <Container maxWidth="lg">
        <ContentStyle>
          <motion.div variants={varFadeInRight}>
            <img src='/img/dashboard/chart.png' alt='chart' />
          </motion.div>

          {/* NFTs sold */}
          <motion.div variants={varFadeInRight}>
            <Grid
              container
              justifyContent={{ xs: 'center', md: 'space-between' }}
              sx={{ textAlign: { xs: 'center', md: 'left' } }}
              spacing={3}
            >
              <Grid item xs md spacing={15} p={2}>
                <Stack alignItems="center" justifyContent={'center'}>
                  <Stack sx={{ border: '2px solid #7414f5', borderRadius: '10px', width: '300px', mb: 5 }}>
                    <Typography sx={{ p: 1, color: 'common.white', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '15px', borderBottom: "1px solid #7414f5" }}>
                      NEW NFTs SOLD
                    </Typography>
                    <Typography sx={{ p: 1, color: '#7414f5', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '15px' }}>
                      103
                    </Typography>
                  </Stack>
                  <Stack sx={{ border: '2px solid #7414f5', borderRadius: '10px', width: '300px', mb: 5 }}>
                    <Typography sx={{ p: 1, color: 'common.white', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '15px', borderBottom: "1px solid #7414f5" }}>
                      EARNING FROM NEW NFTs SOLD
                    </Typography>
                    <Typography sx={{ p: 1, color: '#7414f5', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '15px' }}>
                      2184 BUSD
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>

              <Divider orientation="vertical" flexItem sx={{ borderColor: "#7414F5" }} />

              <Grid item xs md spacing={15} p={2}>
                <Stack alignItems="center" justifyContent={'center'}>
                  <Stack sx={{ border: '2px solid #7414f5', borderRadius: '10px', width: '300px', mb: 5 }}>
                    <Typography sx={{ p: 1, color: 'common.white', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '15px', borderBottom: "1px solid #7414f5" }}>
                      RESELLED NFTs
                    </Typography>
                    <Typography sx={{ p: 1, color: '#7414f5', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '15px' }}>
                      915
                    </Typography>
                  </Stack>
                  <Stack sx={{ border: '2px solid #7414f5', borderRadius: '10px', width: '300px', mb: 5 }}>
                    <Typography sx={{ p: 1, color: 'common.white', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '15px', borderBottom: "1px solid #7414f5" }}>
                      EARNING FROM ROYALTIES
                    </Typography>
                    <Typography sx={{ p: 1, color: '#7414f5', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '15px' }}>
                      1178 BUSD
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </motion.div>

          {/* Search */}
          <motion.div variants={varFadeInRight}>
            <Grid
              container
              direction="row"
              justifyContent={{ xs: 'center', md: 'space-between' }}
              alignItems="center"
              sx={{ textAlign: { xs: 'center', md: 'left' }, border: "2px solid #7414f5", borderRadius: '10px' }}
              spacing={3}
            >
              <Grid item xs={12} md={6} sx={{ borderRight: "1px solid #7414f5" }}>
                <Typography sx={{ color: 'common.white', fontFamily: 'Montserrat', textAlign: 'center', fontWeight: 'bold' }}>
                  LINK FOR VIDEO TUTORIAL
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ fontFamily: 'MontserratItalic', textAlign: 'center', color: "#7414f5", mt: 0 }}
                  label="Paste here..."
                  type="search"
                  fullWidth
                  variant="standard"
                />
              </Grid>
            </Grid>
          </motion.div>

          {/* BUTTON */}
          <motion.div variants={varFadeInRight}>
            <Button href="/dashboard/minting" variant="contained" sx={{ border: '1px solid black' }}>GOT TO MINTING/PUBLISH SECTION</Button>
          </motion.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
