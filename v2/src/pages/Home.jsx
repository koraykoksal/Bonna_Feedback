import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { homeBgPattern } from '../styles/theme';
import { useNavigate } from "react-router-dom"
import thanks from "../assets/img/thanks.png"
import feedback from "../assets/img/feedback.png"
import complaint from "../assets/img/complaint.png"

export const Home = () => {


  const navigate = useNavigate()

  return (

    <div>

      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', py:10, gap: 10}}>


        <Card sx={{maxWidth:'350px',boxShadow:'none'}}>
          <CardMedia
          component='img'
          image={thanks}
          height='185'
          sx={{objectFit:'cover',width:'75%',margin:'auto'}}
          />
          <CardContent>
          <Button fullWidth variant='outlined' color='primary' sx={{ textTransform: 'none', fontSize: '26px' }} onClick={() => navigate('/tesekkur')}>Teşekkür</Button>
          </CardContent>
        </Card>

        <Card sx={{maxWidth:'350px',boxShadow:'none'}}>
          <CardMedia
          component='img'
          image={feedback}
          height='185'
          sx={{objectFit:'cover',width:'75%',margin:'auto'}}
          />
          <CardContent>
          <Button fullWidth variant='outlined' color='secondary' sx={{ textTransform: 'none', fontSize: '26px' }} onClick={() => navigate('/oneritalep')}>Öneri & Talep</Button>
          </CardContent>
        </Card>

        <Card sx={{maxWidth:'350px',boxShadow:'none'}}>
          <CardMedia
          component='img'
          image={complaint}
          height='185'
          sx={{objectFit:'cover',width:'75%',margin:'auto'}}
          />
          <CardContent>
          <Button fullWidth variant='outlined' color='warning' sx={{textTransform: 'none', fontSize: '26px' }} onClick={() => navigate('/sikayet')}>Şikayet</Button>
          </CardContent>
        </Card>


      </Box>



    </div>

  )
}
