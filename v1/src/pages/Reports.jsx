import React from 'react'
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import LockIcon from "@mui/icons-material/Lock"
import { Link, Outlet, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Tab, Tabs } from '@mui/material'
import { useState,useEffect } from 'react'
import useFeedbackCall from '../hooks/useFeedbackCall'
import Tesekkur_Table from '../components/tables/Tesekkur_Table'
import { useSelector } from 'react-redux'
import OneriTalep_Table from '../components/tables/OneriTalep_Table'
import Sikayet_Table from '../components/tables/Sikayet_Table'
import Tesekkur_View from '../components/modals/Tesekkur_View'


const Reports = () => {

  const [value, setValue] = React.useState('1');

  const {getFireData_Tesekkur,getFireData_OneriTalep,getFireData_Sikayet} = useFeedbackCall()
  const {tesekkurData,oneriTalepData,sikayetData} = useSelector((state)=>state.feedback)

   // viewer modal handle state bilgisi
   const [open_tesekkur, setOpen_tesekkur] = useState(false)
   const handleOpen_tesekkur = () => setOpen_tesekkur(true);
   const handleClose_tesekkur = () => {
    setOpen_tesekkur(false)
 
   }

   // viewer modal handle state bilgisi
   const [open_sikayet, setOpen_sikayet] = useState(false)
   const handleOpen_sikayet = () => setOpen_sikayet(true);
   const handleClose_sikayet = () => {
    setOpen_sikayet(false)
 
   }

   // viewer modal handle state bilgisi
   const [open_oneritalep, setOpen_oneritalep] = useState(false)
   const handleOpen_oneritalep = () => setOpen_oneritalep(true);
   const handleClose_oneritalep = () => {
    setOpen_oneritalep(false)
 
   }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style={
    textTransform:'none',
    fontSize:'18px'
  }

  useEffect(() => {
    getFireData_Tesekkur('tesekkur')
    getFireData_OneriTalep('oneri-talep')
    getFireData_Sikayet('sikayet')
  }, [])
  


  return (
    <div>


      <Box sx={{display:'flex',justifyContent:'center',gap:3,p:2}}>

        <Tabs
        
        variant='scrollable'
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
         
        >
          <Tab value='1' label="Teşekkür" style={style}/>
          <Tab value="2" label="Öneri & Talep" style={style}/>
          <Tab value="3" label="Şikayet" style={style}/>

          

        </Tabs>


      </Box>

      {value == 1 && (<Tesekkur_Table handleOpen_tesekkur={handleOpen_tesekkur} handleClose_tesekkur={handleClose_tesekkur} open_tesekkur={open_tesekkur} tesekkurData={tesekkurData}/>)}

      {value == 2 && (<OneriTalep_Table handleClose_oneritalep={handleClose_oneritalep} handleOpen_oneritalep={handleOpen_oneritalep} open_oneritalep={open_oneritalep} oneriTalepData={oneriTalepData}/>)}
      {
      value == 3 && (<Sikayet_Table handleClose_sikayet={handleClose_sikayet} handleOpen_sikayet={handleOpen_sikayet} open_sikayet={open_sikayet} sikayetData={sikayetData}/>)}



    </div>
  )
}

export default Reports