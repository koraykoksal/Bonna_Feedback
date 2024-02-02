import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Grid } from "@mui/material"
import bonnaLogo from "../../assets/img/logobonna_b.png"
import { IoMdCloseCircle } from "react-icons/io";

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


const Tesekkur_View = ({ handleClose_tesekkur, open_tesekkur, info }) => {

  

    return (
        <div>
            <Modal
                open={open_tesekkur}
                onClose={handleClose_tesekkur}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>

                <IoMdCloseCircle size={25} cursor={'pointer'} color='red' onClick={handleClose_tesekkur}/>

                    <img src={bonnaLogo} style={{ width: '125px', margin: 'auto' }} />


                    <Box display={'flex'} justifyContent={'center'} gap={5} py={5}>

                        <Typography align='center' fontWeight={700}>Konu : Teşekkür</Typography>

                        <Typography align='center' fontWeight={700}>Tarih : {info?.datetime}</Typography>


                    </Box>



                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} py={3}>

                        <Typography align='center' fontWeight={700}>Ad Soyad : {info?.name} {info?.surname}</Typography>
                        <Typography align='center' fontWeight={700}>Telefon : {info?.phone}</Typography>
                        <Typography align='center' fontWeight={700}>Email : {info?.email}</Typography>
                        <Typography align='center' fontWeight={700}>Konu : {info?.topic}</Typography>
                        <Typography align='center' fontWeight={700}>Detay : {info?.detail}</Typography>
                    </Box>

                </Box>



            </Modal>

        </div>
    )
}

export default Tesekkur_View