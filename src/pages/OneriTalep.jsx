import React from 'react'
import useFeedbackCall from '../hooks/useFeedbackCall'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import OneriTalep_Table from '../components/tables/OneriTalep_Table'
import { Box, Typography, FormControlLabel, TextField } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { SlRefresh } from "react-icons/sl";
import { HiOutlineSearch } from "react-icons/hi";

const OneriTalep = () => {

  const { getFireData } = useFeedbackCall()
  const { feedbackData } = useSelector((state) => state.feedback)
  const [oneritalep, setoneritalep] = useState([])

  const [info, setInfo] = useState({
    dateFrom: "",
    dateTo: ""
  })

  const [open_oneritalep, setOpen_oneritalep] = useState(false)
  const handleOpen_oneritalep = () => setOpen_oneritalep(true);
  const handleClose_oneritalep = () => {
    setOpen_oneritalep(false)

  }

  const [open_action, setOpen_action] = useState(false)
  const handleOpen_action = () => setOpen_action(true);
  const handleClose_action = () => {
    setOpen_action(false)

  }

  const [open_delete, setOpen_delete] = useState(false)
  const handleOpen_delete = () => setOpen_delete(true);
  const handleClose_delete = () => {
    setOpen_delete(false)

  }

  useEffect(() => {
    getFireData('oneri-talep', info.dateFrom, info.dateTo)
  }, [])


  //date bilgisini al
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

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

    setoneritalep(sortData)

  }, [feedbackData])



  // aksiyonları göster
  const handleIsCheck = (e) => {
    const { checked } = e.target
    const filterData = checked ? oneritalep.filter((item) => item.actionType === "") :
      getFireData('oneri-talep', info.dateFrom, info.dateTo)
    setoneritalep(filterData);
  }


  //filtreyi temizle
  const handleRefresh = () => {
    setInfo({
      dateFrom: "",
      dateTo: ""
    })
    getFireData('oneri-talep', "", "")
  }

  return (
    <div>

      <Typography mt={12} align='center' letterSpacing={3} fontWeight={700}>Öneri ve Talep</Typography>

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
          <HiOutlineSearch size={25} color='black' cursor={'pointer'} style={{ marginLeft: 15 }}
            onClick={() => getFireData('oneri-talep', info.dateFrom, info.dateTo)} />
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

        <OneriTalep_Table handleClose_oneritalep={handleClose_oneritalep} handleOpen_oneritalep={handleOpen_oneritalep} oneritalep={oneritalep} open_action={open_action} handleClose_action={handleClose_action} handleOpen_action={handleOpen_action} open_delete={open_delete} handleClose_delete={handleClose_delete} handleOpen_delete={handleOpen_delete} />

      </Box>

    </div>
  )
}

export default OneriTalep