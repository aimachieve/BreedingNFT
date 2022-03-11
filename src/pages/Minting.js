import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion';
// material
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, TextField, Grid, Button, InputAdornment } from '@mui/material';
//
import { varFadeInUp, varFadeInRight } from '../components/animate';
import { create } from 'ipfs-http-client'
import { useNFTContract, useTokenContract } from '../hooks/useContract'
import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";

import { ethers } from "ethers";
// const key = process.env.REACT_APP_PINATA_KEY;
// const secret = process.env.REACT_APP_PINATA_SECRET;
const axios = require('axios');
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
  paddingTop: theme.spacing(20),
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

export default function Minting() {
  const [status, setStatus] = useState('Uploading Image To Pinata')
  const [metadataButton, setMetadataButton] = useState('Uploading Metadata To Pinata')
  const [mintButton, setMintButton] = useState('Minting / Publish')
  const [imageUrl, setImageUrl] = useState('')
  const [metadataUrl, setMetadataUrl] = useState('')
  const [metaData, setMetaData] = useState({
    'name': '',
    'pi': 0,
    'price': 0,
    'description': '',
    'image': ''
  })
  const [disable, setDisable] = useState(true)
  const [mintingApproved, setMintingApproved] = useState(false)

  const { enqueueSnackbar } = useSnackbar();
  const client = create('https://ipfs.infura.io:5001/api/v0')
  const NFTContract = useNFTContract(process.env.REACT_APP_NFT_CONTRACT_ADDRESS)
  const BUSDContract = useTokenContract(process.env.REACT_APP_BUSD_CONTRACT_ADDRESS)
  console.log("NFTcontract =>", NFTContract)
  console.log("BUSDcontract =>", BUSDContract)

  const uploadImgRef = useRef(null);
  const uploadMetadataRef = useRef(null);

  const UPLOAD_TYPE = {
    IMAGE: "image",
    METADATA: "metadata"
  }
  const { account } = useWeb3React();

  const init = () => {
    setDisable(true)
    setMetaData({
      'name': '',
      'pi': 0,
      'price': 0,
      'description': '',
      'image': ''
    })
    setImageUrl('')
    setStatus('Uploading Image To Pinata')
    setMetadataButton('Uploading Metadata To Pinata')
    setMintButton('Minting / Publish')
  }
  const onClickUpload = (type) => {
    if (type === UPLOAD_TYPE.IMAGE) {
      uploadImgRef.current.click();
    } else if (type === UPLOAD_TYPE.METADATA) {
      uploadMetadataRef.current.click();
    }
  }

  const onMetaDataChange = (e) => {
    setMetaData({ ...metaData, [e.target.name]: e.target.value });
  }

  async function onUpload(e, type) {
    const file = e.target.files[0];
    // pinFileToIPFS(file);
    try {
      setStatus('uploading file...');
      const added = await client.add(file)
      console.log(added);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      setImageUrl(url);
      setMetaData({ ...metaData, 'image': url });
      setStatus('uploaded at:' + url);
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function uploadMetadata(JSONBody) {
    console.log(JSONBody)
    if (metaData.name === "" || metaData.description === "" || metaData.price === 0 || metaData.pi === 0 || imageUrl === "") {
      alert("Please fill all the fileds!")
    } else {
      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
      //making axios POST request to Pinata ⬇️
      axios.post(url, JSONBody, {
        headers: {
          pinata_api_key: process.env.REACT_APP_PINATA_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET
        }
      })
        .then(function (response) {
          setMetadataUrl("https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash);
          setMetadataButton("Uploaded at : https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash);
          setDisable(false);
        })
        .catch(function (error) {
          setMetadataButton("metadata upload fail ⬇️, try again later!", error.message);
        });
    }
  }

  const handleMintingApprove = async () => {
    try {
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
      enqueueSnackbar(MetamaskErrorMessage(error), {
        variant: "error",
      });
      setMintingApproved(false);
    }
  };

  const minting = async () => {
    console.log("metadata url=>", metadataUrl)
    console.log("current account=>", account)
    console.log("metadata.price, pi=>", metaData.price, metaData.pi)
    console.log("metadata=>", metaData)
    console.log("number price=>", Number(metaData.price))

    setMintButton("NFT is minting now...")
    const result = await NFTContract.mintNFT(
      account,
      metadataUrl,
      Number(metaData.price),
      Number(metaData.pi)
    )
    enqueueSnackbar("WOW, One NFT was sucessufully minted!", {
      variant: "success",
    })
    console.log("mint result=>", result)

    init()
  }

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
  }, [account])

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
              spacing={2}
            >
              <Grid item xs={12} md={6}>
                <Stack alignItems="center" spacing={1}>
                  <img src={imageUrl || '/img/dashboard/upload.png'} width="100%" height="auto" alt={imageUrl} />
                  <>
                    <input type="file" ref={uploadImgRef} onChange={(e) => onUpload(e, "image")} hidden />
                    <Button variant="contained" disabled={!disable} onClick={() => onClickUpload(UPLOAD_TYPE.IMAGE)} sx={{ border: '1px solid black' }}>{status}</Button>
                  </>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6} mt={3}>
                {/* Price */}
                <Stack sx={{ border: '2px solid #7414f5', borderRadius: '10px', width: '300px', mb: 5 }}>
                  <Typography sx={{ p: 1, color: 'common.white', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '20px', borderBottom: "1px solid #7414f5" }}>
                    INITIAL PRICE
                  </Typography>
                  <TextField
                    name="price"
                    sx={{ fontFamily: 'MontserratItalic', textAlign: 'center', color: "#7414f5", mt: 0 }}
                    label="Insert here.."
                    type="number"
                    variant="standard"
                    value={metaData.price}
                    onChange={onMetaDataChange}
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
                      name="pi"
                      sx={{ fontFamily: 'MontserratItalic', color: "#7414f5", mt: 0 }}
                      label="Insert here.."
                      type="number"
                      variant="standard"
                      value={metaData.pi}
                      onChange={onMetaDataChange}
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
                    name="name"
                    sx={{ fontFamily: 'MontserratItalic', color: "#7414f5", mt: 0 }}
                    label="Insert here.."
                    type="search"
                    variant="standard"
                    value={metaData.name}
                    onChange={onMetaDataChange}
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
                name="description"
                sx={{ fontFamily: 'MontserratItalic', textAlign: 'center', color: "#7414f5", mt: 0 }}
                label="Insert here"
                type="search"
                variant="standard"
                multiline
                rows={4}
                value={metaData.description}
                onChange={onMetaDataChange}
              />
            </Stack>
          </motion.div>

          {/* Button */}
          <motion.div variants={varFadeInRight}>
            <Stack spacing={3} direction="row" justifyContent={'center'}>
              <Button variant="contained" sx={{ border: '1px solid black' }} disabled={!disable} onClick={() => uploadMetadata(metaData)}>{metadataButton}</Button>
              {mintingApproved ? (
                <Button variant="contained" sx={{ border: '1px solid black' }} disabled={disable} onClick={() => minting()}>{mintButton}</Button>
              ) : (
                <Button variant="contained" sx={{ border: '1px solid black' }} disabled={disable} onClick={() => handleMintingApprove()}>Approve</Button>
              )}
            </Stack>
          </motion.div>
        </ContentStyle>
      </Container>
    </RootStyle >
  );
}
