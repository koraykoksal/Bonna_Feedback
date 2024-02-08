import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Grid } from "@mui/material"
import bonnaLogo from "../../assets/img/logobonna_b.png"
import { IoMdCloseCircle } from "react-icons/io";
import { modalStyles } from '../../styles/globalStlye';



const Sikayet_View = ({ handleClose_sikayet, open_sikayet, info }) => {


    return (
        <div>
            <Modal
                open={open_sikayet}
                onClose={handleClose_sikayet}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={modalStyles}>

                <IoMdCloseCircle size={30} cursor={'pointer'} color='red' onClick={handleClose_sikayet}/>

                    <img src={bonnaLogo} style={{ width: '125px', margin: 'auto' }} />


                    <Box display={'flex'} justifyContent={'center'} gap={5} py={5}>

                        <Typography align='center' fontWeight={700}>Konu : Şikayet</Typography>

                        <Typography align='center' fontWeight={700}>Tarih : {info?.datetime}</Typography>


                    </Box>



                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={5} py={3}>

                        <Typography align='center' fontWeight={700}>Ad Soyad : {info?.name} {info?.surname}</Typography>
                        <Typography align='center' fontWeight={700}>Telefon : {info?.phone}</Typography>
                        <Typography align='center' fontWeight={700}>Email : {info?.email}</Typography>
                        <Typography align='center' fontWeight={700}>Konu : {info?.topic}</Typography>
                        <Typography align='center' fontWeight={700}>Detay : {info?.detail}</Typography>
                    </Box>

                  
                    <Typography align='center' fontWeight={700}>Aksiyon : {info?.actionType}</Typography>

                </Box>



            </Modal>

        </div>
    )
}

export default Sikayet_View