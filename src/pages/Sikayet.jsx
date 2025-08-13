import React from 'react'
import Sikayet_Table from '../components/tables/Sikayet_Table'
import useFeedbackCall from '../hooks/useFeedbackCall'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { FormControlLabel, TextField, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { SlRefresh } from "react-icons/sl";
import { HiOutlineSearch } from "react-icons/hi";

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


  const [info, setInfo] = useState({
    dateFrom: "",
    dateTo: ""
  })

  //date bilgisini al
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  // sikayet datasını çek
  useEffect(() => {
    getFireData('sikayet', info.dateFrom,info.dateTo)
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

    const filterData = checked ? sikayet.filter((item) => item.actionType === "") : 
    getFireData('sikayet', info.dateFrom,info.dateTo)

    setSikayet(filterData);
  }


  //filtreyi temizle
  const handleRefresh = () => {
    setInfo({
      dateFrom: "",
      dateTo: ""
    })
    getFireData('sikayet', "","")
  }


  return (
    <div>
      <Typography mt={12} align='center' letterSpacing={3} fontWeight={700}>Şikayet</Typography>

      <Box display={'flex'} justifyContent={'space-between'} gap={2} alignItems={'center'} p={2}>

        <SlRefresh size={22} color='green' cursor={'pointer'} onClick={handleRefresh} />


        <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1, alignItems: 'center', p: 2 }}>
          <Typography>From</Typography>
          <TextField
            required
            size='small'
            id='dateFrom'
            name='dateFrom'
            type='date'
            value={info.dateFrom}
            onChange={handleChange}
          />

          <Typography>To</Typography>
          <TextField
            required
            size='small'
            id='dateTo'
            name='dateTo'
            type='date'
            value={info.dateTo}
            onChange={handleChange}
          />
          <HiOutlineSearch size={25} color='black' cursor={'pointer'} style={{ marginLeft: 15 }} onClick={() => getFireData("sikayet", info.dateFrom,info.dateTo)} />
        </Box>

      </Box>

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