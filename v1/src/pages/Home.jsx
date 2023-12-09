import { Box, Button, Container } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { homeBgPattern } from '../styles/theme';
import { useNavigate } from "react-router-dom"

export const Home = () => {


  const navigate = useNavigate()

  return (

    <div >

      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', py: 5, gap: 5 }}>


        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', p: 5, gap: 5 }}>


          <Box sx={{ display: 'flex', flexWrap: 'wrap', p: 5, gap: 5,alignItems:'center' }}>

            <Button variant='outlined' color='primary' sx={{ width: '350px', height: '100px', textTransform: 'none', fontSize: '26px' }} onClick={() => navigate('/tesekkur')}>Teşekkür</Button>

            <Button variant='outlined' color='secondary' sx={{ width: '350px', height: '100px', textTransform: 'none', fontSize: '26px' }} onClick={() => navigate('/oneritalep')}>Öneri & Talep</Button>

            <Button variant='outlined' color='warning' sx={{ width: '350px', height: '100px', textTransform: 'none', fontSize: '26px' }} onClick={() => navigate('/sikayet')}>Şikayet</Button>
          </Box>

        </Box>


      </Box>



    </div>

  )
}
