import React from 'react'
import Modal from '@mui/material/Modal';
import { Typography, Grid, TextField, Button } from "@mui/material"
import { Box, Container } from "@mui/material"
import { FaWindowClose } from "react-icons/fa";
import useFeedbackCall from '../../hooks/useFeedbackCall';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 525,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};

const Delete_Modal = ({ handleOpen_delete, handleClose_delete, open_delete, info, setInfo }) => {

    const { getFireData_Sikayet, removeFirebaseData } = useFeedbackCall()

    const handleSubmit = (e) => {

        e.preventDefault()

        if (info.type == "sikayet") {

            if (info.id) {
                removeFirebaseData('sikayet', info.id)
                getFireData_Sikayet('sikayet')
            }
        }
        else if (info.type == "oneriTalep") {

            if (info.id) {
                removeFirebaseData('oneri-talep', info.id)
                getFireData_Sikayet('oneri-talep')
            }
        }
        else if (info.type == "tesekkur") {

            if (info.id) {
                removeFirebaseData('tesekkur', info.id)
                getFireData_Sikayet('tesekkur')
            }
        }



        handleClose_delete()
    }

    return (
        <div>

            <Modal
                open={open_delete}
                onClose={handleClose_delete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>

                    <FaWindowClose size={25} color='red' cursor={'pointer'} onClick={handleClose_delete} />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

                        <Typography align='center' variant='h5'>Kayıt Silinecek Emin Misiniz ?</Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: 3 }}>

                            <Button variant='contained' color='success' onClick={handleSubmit}>Evet</Button>

                            <Button variant='outlined' color='error' onClick={handleClose_delete}>Hayır</Button>
                        </Box>
                    </Box>

                </Box>


            </Modal>


        </div>
    )
}

export default Delete_Modal