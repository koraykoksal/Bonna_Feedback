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
import FeedBacks from '../components/modals/FeedBacks';



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

  const [info, setInfo] = useState("")
  const navigate = useNavigate()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (

    <div style={homePageStyle}>

      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', py: 15, gap: 10 }}>


        {
          urlData.map((item, index) => (

            <Card sx={{ maxWidth: '350px', boxShadow: 'none', backgroundColor: 'transparent' }} key={index} >
              <CardMedia
                component='img'
                image={item.icon}
                height='185'
                sx={{ objectFit: 'cover', width: '75%', margin: 'auto', cursor: 'pointer' }}
                // onClick={() => navigate(`${item.url}`)}
                onClick={() => {
                  setInfo(item.title)
                  handleOpen()
                }}
              />
              <CardContent>
                <Button fullWidth variant='outlined' color='warning' sx={{ textTransform: 'none', fontSize: '26px' }}
                  onClick={() => {
                    setInfo(item.title)
                    handleOpen()
                  }}>{item.title}</Button>
              </CardContent>
            </Card>

          ))
        }


      </Box>

      <FeedBacks open={open} handleClose={handleClose} info={info} />

    </div>

  )
}
