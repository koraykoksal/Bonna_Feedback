import React from 'react'
import Sikayet_Table from '../components/tables/Sikayet_Table'
import useFeedbackCall from '../hooks/useFeedbackCall'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { FormControlLabel, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';


const Sikayet = () => {

  const { getFireData } = useFeedbackCall()
  const { feedbackData } = useSelector((state) => state.feedback)
  const [sikayet, setSikayet] = useState([])

  const [open_sikayet, setOpen_sikayet] = useState(false)
  const handleOpen_sikayet = () => setOpen_sikayet(true);
  const handleClose_sikayet = () => { setOpen_sikayet(false) }

  const [open_action, setOpen_action] = useState(false)
  const handleOpen_action = () => setOpen_action(true);
  const handleClose_action = () => { setOpen_action(false) }

  const [open_delete, setOpen_delete] = useState(false)
  const handleOpen_delete = () => setOpen_delete(true);
  const handleClose_delete = () => { setOpen_delete(false) }

  // sikayet datasını çek
  useEffect(() => {
    getFireData('sikayet')
  }, [])


  // sikayet datasını son kayıt bilgisine göre sırala
  useEffect(() => {

    const dizi = Object.keys(feedbackData).map(key => { return { id: key, ...feedbackData[key] } })
    const sortData = dizi.sort((a, b) => {
      const [dayA, monthA, yearA, timeA] = a.datetime.split(/-| /);
      const [hoursA, minutesA] = timeA.split(':');

      const [dayB, monthB, yearB, timeB] = b.datetime.split(/-| /);
      const [hoursB, minutesB] = timeB.split(':');

      const dateA = new Date(yearA, monthA - 1, dayA, hoursA, minutesA);
      const dateB = new Date(yearB, monthB - 1, dayB, hoursB, minutesB);

      return dateB - dateA;
    })

    setSikayet(sortData)

  }, [feedbackData])


  // aksiyonları göster
  const handleIsCheck = (e) => {
    const { checked } = e.target
    // feedbackData'yı map ederek ve actionType'a göre filtreleyerek setSikayet'e gönderiyoruz
    const filterData = checked
      ? Object.keys(feedbackData)
        .map(key => ({ id: key, ...feedbackData[key] }))
        .filter((item) => item.actionType === "")
      : Object.keys(feedbackData).map(key => ({ id: key, ...feedbackData[key] }));

    setSikayet(filterData);
  }


  return (
    <div>
      <Typography py={5} align='center' letterSpacing={3} fontWeight={700}>Şikayet</Typography>

      <Box sx={{ flexDirection: 'column', display: 'flex', gap: 3, p: 3 }}>

        <Box>
          <FormControlLabel
            control={
              <Checkbox onChange={handleIsCheck} name="gilad" />
            }
            label="Aksiyon alınmamış olanları göster"
          />
        </Box>

        <Sikayet_Table handleClose_sikayet={handleClose_sikayet} handleOpen_sikayet={handleOpen_sikayet} open_sikayet={open_sikayet} sikayet={sikayet} open_action={open_action} handleClose_action={handleClose_action} handleOpen_action={handleOpen_action} open_delete={open_delete} handleClose_delete={handleClose_delete} handleOpen_delete={handleOpen_delete} />

      </Box>
    </div>
  )
}

export default Sikayet