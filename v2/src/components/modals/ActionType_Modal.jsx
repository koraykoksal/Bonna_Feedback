import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Grid, FormControl, InputLabel, Select } from "@mui/material"
import bonnaLogo from "../../assets/img/logobonna_b.png"
import { IoMdCloseCircle } from "react-icons/io";
import { actionTypes } from '../../helper/data';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
  
  };


const ActionType_Modal = ({handleClose_action,open_action, info}) => {


    console.log(info)

    return (
        <div>

            <Modal
                open={open_action}
                onClose={handleClose_action}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>

                    <Box display={'flex'} justifyContent={'space-between'}>
                    <IoMdCloseCircle size={25} cursor={'pointer'} color='red' onClick={handleClose_action} />
                    <Typography align={'center'} variant='subtitle1'>{info.datetime}</Typography>
                    </Box>
                    

                    <img src={bonnaLogo} style={{ width: '125px', margin: 'auto' }} />

                    
                    <Box sx={{display:'flex',flexDirection:'column',gap:5,mt:10}}>
                        <Typography align={'center'} variant='h7'>Ad Soyad : {info.name} {info.surname}</Typography>
                        <Typography align={'center'} variant='h7'>Telefon : {info.phone}</Typography>
                        <Typography align={'center'} variant='h7'>Email : {info.email}</Typography>
                        <Typography align={'center'} variant='h7'>Konu : {info.topic}</Typography>
                        <Typography align={'center'} variant='h7'>Detay : {info.detail}</Typography>
                    </Box>

                    <Box>
                        <FormControl>
                            <InputLabel id="actionType">Aksiyon Tipi</InputLabel>
                            <Select
                            
                            >

                            </Select>
                        </FormControl>
                    </Box>
                   

                </Box>



            </Modal>

        </div>
    )
}

export default ActionType_Modal