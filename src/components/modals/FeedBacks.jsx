import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik, Form } from 'formik';
import { Container, IconButton, TextField, TextareaAutosize } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Textarea from '@mui/joy/Textarea';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { modalStyles } from '../../styles/globalStlye';
import Tesekkur_View from './Tesekkur_View';
import { useState,useEffect } from 'react';
import OneriTalep_View from './OneriTalep_View';
import Sikayet_View from './Sikayet_View';
import RamakKala_View from './RamakKala_View';
import Etiklik from './Etiklik';
import useFeedbackCall from '../../hooks/useFeedbackCall';
import { useSelector } from 'react-redux';

const FeedBacks = ({ open, handleClose, info }) => {

    const [durum, setDurum] = useState(0)
    const {loading} = useSelector((state)=>state.feedback)

    useEffect(() => {
      if(info === 'Teşekkür'){
        setDurum(1)
      }
      else if(info === 'Öneri & Talep'){
        setDurum(2)
      }
      else if(info === 'Şikayet'){
        setDurum(3)
      }
      else if(info === 'Ramak Kala'){
        setDurum(4)
      }
      else if(info === 'Etiklik'){
        setDurum(5)
      }
    }, [info])
    

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
                <Box sx={modalStyles}>

                    <IconButton onClick={() => handleClose()} >
                        <HighlightOffIcon sx={{ color: '#C70039', fontSize: '28px' }} />
                    </IconButton>

                    {
                        info == 'Teşekkür' && <Tesekkur_View loading={loading}/>
                    }
                    {
                        info == 'Öneri & Talep' && <OneriTalep_View loading={loading}/>
                    }
                    {
                        info == 'Şikayet' && <Sikayet_View loading={loading}/>
                    }
                    {
                        info == 'Ramak Kala' && <RamakKala_View loading={loading}/>
                    }
                    {
                        info == 'Etiklik' && <Etiklik loading={loading}/>
                    }

                </Box>
            </Modal>

        </div>
    )
}

export default FeedBacks