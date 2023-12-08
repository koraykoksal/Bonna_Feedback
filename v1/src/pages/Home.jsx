import { Box, Button, Container } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'

import { homeBgPattern } from '../styles/theme';
import Tesekkur from '../components/Tesekkur';
import OneriTalep from '../components/OneriTalep';
import Sikayet from '../components/Sikayet';


export const Home = () => {


  const [value, setvalue] = useState(0)
  const [info, setInfo] = useState({

  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setInfo({


    })
  }


console.log(value)

  return (

    <div >

      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', py: 5, gap: 5 }}>


        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', p: 5, gap: 5 }}>


          <Button variant='outlined' color='primary' sx={{ width: '350px', height: '100px', textTransform: 'none', fontSize: '26px' }} onClick={()=>setvalue(1)}>Teşekkür</Button>

          <Button variant='outlined' color='secondary' sx={{ width: '350px', height: '100px', textTransform: 'none', fontSize: '26px' }} onClick={()=>setvalue(2)}>Öneri & Talep</Button>

          <Button variant='outlined' color='warning' sx={{ width: '350px', height: '100px', textTransform: 'none', fontSize: '26px' }} onClick={()=>setvalue(3)}>Şikayet</Button>

        </Box>


      </Box>

        {value === 1 && (<Tesekkur/>)}
        {value === 2 && (<OneriTalep/>)}
        {value === 3 && (<Sikayet/>)}


    </div>

  )
}
