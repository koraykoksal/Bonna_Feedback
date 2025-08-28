import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { homeBgPattern } from '../styles/theme';
import { useNavigate } from "react-router-dom"
import thanks from "../assets/img/like.svg"
import feedback from "../assets/img/comment.svg"
import complaint from "../assets/img/unlike.svg"
import safety from "../assets/img/safety.svg"
import justice from "../assets/img/justice.svg"
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
    title: "Etik",
    url: "/etiklik",
    icon: justice,
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



    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', py: 15, gap: 5 }}>


      {
        urlData?.map((item, index) => (

          <Card sx={{ 
            maxWidth: '300px', 
            boxShadow: 'none', 
            backgroundColor: 'transparent',
            p:3, 
            '&:hover':{boxShadow:'0px 2px 4px #A69B95'}
            }} key={index} >
            <CardMedia
              component='img'
              image={item.icon}
              height='175'
              sx={{ objectFit: 'cover', width: '50%', margin: 'auto', cursor: 'pointer' }}
              // onClick={() => navigate(`${item.url}`)}
              onClick={() => {
                setInfo(item.title)
                handleOpen()
              }}
            />
            <CardContent>
              <Button fullWidth variant='outlined' color='warning' sx={{ textTransform: 'none', fontSize: '20px' }}
                onClick={() => {
                  setInfo(item.title)
                  handleOpen()
                }}>{item.title}</Button>
            </CardContent>

            <FeedBacks open={open} handleClose={handleClose} info={info} />

          </Card>

        ))
      }


    </Box>




  )
}
