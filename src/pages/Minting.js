import { motion } from 'framer-motion';
// material
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, TextField, Grid, Button, InputAdornment } from '@mui/material';
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

export default function Minting() {
  return (
    <RootStyle id="move_top" initial="initial" animate="animate" variants={varFadeInUp}>
      {/* <HeroOverlayStyle alt="overlay" src="/static/overlay.svg" variants={varFadeIn} /> */}

      <Container maxWidth="lg">
        <ContentStyle>
          <motion.div variants={varFadeInRight}>
            <Grid
              container
              justifyContent={{ xs: 'center', md: 'space-between' }}
              sx={{ textAlign: { xs: 'center', md: 'left' } }}
              spacing={3}
            >
              <Grid item xs={12} md={6} spacing={15} p={2}>
                <img src="/img/dashboard/upload.png" alt="NFt" />
              </Grid>

              <Grid item xs={12} md={6} mt={3}>
                {/* Price */}
                <Stack sx={{ border: '2px solid #7414f5', borderRadius: '10px', width: '300px', mb: 5 }}>
                  <Typography sx={{ p: 1, color: 'common.white', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '20px', borderBottom: "1px solid #7414f5" }}>
                    INITIAL PRICE
                  </Typography>
                  <TextField
                    sx={{ fontFamily: 'MontserratItalic', textAlign: 'center', color: "#7414f5", mt: 0 }}
                    label="Insert here.."
                    type="search"
                    variant="standard"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">
                        <Typography sx={{ p: 1, color: '#7414f5', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '20px' }}>BUSD</Typography>
                      </InputAdornment>,
                    }}
                  />
                </Stack>
                {/* P.I. */}
                <Stack direction="row" spacing={3} sx={{ border: '2px solid #7414f5', borderRadius: '10px', width: '300px', mb: 5 }} alignItems="center">
                  <Typography sx={{ color: 'common.white', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '20px', p: '10px', borderRight: "1px solid #7414f5", width: "150px" }}>
                    P.I.
                  </Typography>
                  <Typography sx={{ color: '#7414f5', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '20px' }}>
                    <TextField
                      sx={{ fontFamily: 'MontserratItalic', color: "#7414f5", mt: 0 }}
                      label="Insert here.."
                      type="search"
                      variant="standard"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      }}
                    />
                  </Typography>
                </Stack>
                {/* Title */}
                <Stack direction="row" spacing={3} sx={{ border: '2px solid #7414f5', borderRadius: '10px', width: '350px', mb: 5 }} alignItems="center">
                  <Typography sx={{ color: 'common.white', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '20px', p: '10px', borderRight: "1px solid #7414f5", width: "150px" }}>
                    Title
                  </Typography>
                  <TextField
                    sx={{ fontFamily: 'MontserratItalic', color: "#7414f5", mt: 0 }}
                    label="Insert here.."
                    type="search"
                    variant="standard"
                  />
                </Stack>
              </Grid>
            </Grid>
          </motion.div>

          <motion.div variants={varFadeInRight}>
            <Stack sx={{ border: '2px solid #7414f5', borderRadius: '25px' }}>
              <Typography sx={{ p: 1, color: 'common.white', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '20px', borderBottom: "1px solid #7414f5" }}>
                DESCRIPTION
              </Typography>
              <TextField
                sx={{ fontFamily: 'MontserratItalic', textAlign: 'center', color: "#7414f5", mt: 0 }}
                label="Insert here"
                type="search"
                variant="standard"
                multiline
                rows={4}
              />
            </Stack>
          </motion.div>

          {/* Button */}
          <motion.div variants={varFadeInRight}>
            <Button variant="contained" sx={{ border: '1px solid black' }}>MINTING / PUBLISH</Button>
          </motion.div>
        </ContentStyle>
      </Container>
    </RootStyle >
  );
}
