import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { homeBgPattern } from '../styles/theme';
import { useNavigate } from "react-router-dom"
import thanks_img from "../assets/img/thanks_img.png"
import feedback_img from "../assets/img/feedback_img.png"
import complaint_img from "../assets/img/complaint_img.png"

export const Home = () => {


  const navigate = useNavigate()

  return (

    <div >

      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', py: 5, gap: 5 }}>


        <Card sx={{maxWidth:'350px',boxShadow:'none'}}>
          <CardMedia
          component='img'
          image={thanks_img}
          height='194'
          sx={{objectFit:'cover',width:'100%'}}
          />
          <CardContent>
          <Button fullWidth variant='outlined' color='primary' sx={{ textTransform: 'none', fontSize: '26px' }} onClick={() => navigate('/tesekkur')}>Teşekkür</Button>
          </CardContent>
        </Card>

        <Card sx={{maxWidth:'350px',boxShadow:'none'}}>
          <CardMedia
          component='img'
          image={feedback_img}
          height='194'
          sx={{objectFit:'cover',width:'100%'}}
          />
          <CardContent>
          <Button fullWidth variant='outlined' color='secondary' sx={{ textTransform: 'none', fontSize: '26px' }} onClick={() => navigate('/oneritalep')}>Öneri & Talep</Button>
          </CardContent>
        </Card>

        <Card sx={{maxWidth:'350px',boxShadow:'none'}}>
          <CardMedia
          component='img'
          image={complaint_img}
          height='194'
          sx={{objectFit:'cover',width:'1005'}}
          />
          <CardContent>
          <Button fullWidth variant='outlined' color='warning' sx={{textTransform: 'none', fontSize: '26px' }} onClick={() => navigate('/sikayet')}>Şikayet</Button>
          </CardContent>
        </Card>


      </Box>



    </div>

  )
}
