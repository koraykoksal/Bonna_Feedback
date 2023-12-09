import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import tesekkurImg from "../assets/img/tesekkurImg.png"
import { TextField } from '@mui/material';

const Tesekkur = () => {


  const [info, setinfo] = useState({})

  // const handleChange = (e) => {
  //   setInfo({ ...info, [e.target.name]: e.target.value })
  // }

  // const handleSubmit = (e) => {

  //   e.preventDefault()

  //   handleClose()

  // }


  return (
    <div>


      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 5, p: 5 }}>

        {/* <Box>
          <img src={tesekkurImg} style={{ width: '600px',objectFit:'cover'}} />
        </Box> */}

        <Box sx={{ display: 'flex', flexDirection: 'column',gap:3,width:'600px',p:3 }}>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5}}>
            <TextField
              fullWidth
              label='İsim'
              name='ad'
              id='ad'
              type='text'

            />
            <TextField
              fullWidth
              label='Soyisim'
              name='soyad'
              id='soyad'
              type='text'

            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5}}>
            <TextField
              fullWidth
              label='Telefon'
              name='phone'
              id='phone'
              type='text'

            />
            <TextField
              fullWidth
              label='Eposta'
              name='email'
              id='email'
              type='text'

            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <TextField
              fullWidth
              label='Konu'
              name='konu'
              id='konu'
              type='text'

            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              multiline
              rows={4}
              fullWidth
              label='Açıklama'
              name='aciklama'
              id='aciklama'
              type='text'

            />
          </Box>

          <Button variant='contained'>
            Gönder
          </Button>

        </Box>

      </Box>



    </div>
  )
}

export default Tesekkur