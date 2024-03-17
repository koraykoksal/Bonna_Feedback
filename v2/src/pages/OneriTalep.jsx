import React from 'react'
import useFeedbackCall from '../hooks/useFeedbackCall'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import OneriTalep_Table from '../components/tables/OneriTalep_Table'
import { Typography } from '@mui/material'


const OneriTalep = () => {

  const { getFireData } = useFeedbackCall()
  const { feedbackData } = useSelector((state) => state.feedback)
  const [oneritalep, setoneritalep] = useState([])

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
    getFireData('oneri-talep')
  }, [])


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


  return (
    <div>

      <Typography py={5} align='center' letterSpacing={3} fontWeight={700}>Öneri ve Talep</Typography>

      <OneriTalep_Table handleClose_oneritalep={handleClose_oneritalep} handleOpen_oneritalep={handleOpen_oneritalep} oneritalep={oneritalep} open_action={open_action} handleClose_action={handleClose_action} handleOpen_action={handleOpen_action} open_delete={open_delete} handleClose_delete={handleClose_delete} handleOpen_delete={handleOpen_delete} />

    </div>
  )
}

export default OneriTalep