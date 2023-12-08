import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, IconButton, TextField, TextareaAutosize } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Textarea from '@mui/joy/Textarea';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { bonnaDepartments } from "../../helper/bonna_departments"
import useRaffleCall from '../../hooks/useRaffleCall';
import { useNavigate } from "react-router-dom"


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};



const Application_Modal = ({ open, handleClose, info, setInfo, state }) => {

  const navigate = useNavigate()
  const { postFireData, getFireData } = useRaffleCall()

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    // postFireData(`bonna-activity/${info.activityName}`, info)
    postFireData(`bonna-activity`, info)

    handleClose()

  }


  return (
    <div>

      <Modal
        keepMounted
        open={open}
        onClose={() => {
          handleClose()
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 1 }}>
              <Typography variant="subtitle2" component="h2" color="#000000">
                Aktivite : {state.name}
              </Typography>
              <Typography variant="subtitle2" component="h2" color="#000000">
                Tarih : {state.date}
              </Typography>
            </Box>

            <IconButton onClick={() => handleClose()}>
              <HighlightOffIcon sx={{ color: '#C70039', fontSize: '28px' }} />
            </IconButton>
          </Box>


          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'scroll', maxHeight: '600px' }} component='form' onSubmit={handleSubmit}>


            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>


              <TextField
                required
                fullWidth
                label="TC No"
                name="tcNo"
                id="tcNo"
                type="text"
                variant="outlined"
                inputProps={{ maxLength: 11 }}
                value={info.tcNo}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>


              <TextField
                required
                fullWidth
                label="İsim"
                name="name"
                id="name"
                type="text"
                variant="outlined"
                inputProps={{ maxLength: 30 }}
                value={info.name}
                onChange={handleChange}
              />


              <TextField
                required
                fullWidth
                label="Soyisim"
                name="surname"
                id="surname"
                type="text"
                variant="outlined"
                inputProps={{ maxLength: 30 }}
                value={info.surname}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>


              <TextField
                required
                fullWidth
                label="Telefon"
                name="phone"
                id="phone"
                type="text"
                variant="outlined"
                inputProps={{ maxLength: 12 }}
                value={info.phone}
                onChange={handleChange}
              />


              <FormControl fullWidth>
                <InputLabel id="department">Departman</InputLabel>
                <Select
                  required
                  labelId="reddepartmentkabul"
                  id="department"
                  name='department'
                  label="Departman"
                  value={info.department}
                  onChange={handleChange}
                >
                  {
                    bonnaDepartments.map((item, index) => (
                      <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                    ))
                  }

                </Select>
              </FormControl>
            </Box>


            <Button
              sx={{ mt: 3, textTransform: 'none', letterSpacing: 5 }}
              variant='contained'
              fullWidth
              type='submit'
              color='success'
            >
              Bitir
            </Button>


          </Box>


        </Box>
      </Modal>

     

    </div>
  )
}

export default Application_Modal