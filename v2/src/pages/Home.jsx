import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { homeBgPattern } from '../styles/theme';
import { useNavigate } from "react-router-dom"
import thanks from "../assets/img/thanks.png"
import feedback from "../assets/img/feedback.png"
import complaint from "../assets/img/complaint.png"
import safety from "../assets/img/safety.png"
import { homePageStyle } from '../styles/globalStlye';



const urlData = [

  {
    title: "Teşekkür",
    url: "/tesekkur",
    icon: thanks,
  },
  {
    title: "Öneri & Talep",
    url: "/oneritalep",
    icon: feedback,
  },
  {
    title: "Şikayet",
    url: "/sikayet",
    icon: complaint,
  },
  {
    title: "Ramak Kala",
    url: "/ramakkala",
    icon: safety,
  }
 
]

export const Home = () => {


  const navigate = useNavigate()



  return (

    <div style={homePageStyle}>

      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', py: 10, gap: 10 }}>


        {
          urlData.map((item, index) => (

            <Card sx={{ maxWidth: '350px', boxShadow: 'none', backgroundColor: 'transparent' }} key={index} >
              <CardMedia
                component='img'
                image={item.icon}
                height='185'
                sx={{ objectFit: 'cover', width: '75%', margin: 'auto',cursor:'pointer' }}
                onClick={() => navigate(`${item.url}`)}
              />
              <CardContent>
                <Button fullWidth variant='outlined' color='warning' sx={{ textTransform: 'none', fontSize: '26px' }} onClick={() => navigate(`${item.url}`)}>{item.title}</Button>
              </CardContent>
            </Card>

          ))
        }


      </Box>



    </div>

  )
}
