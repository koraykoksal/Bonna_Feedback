import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Grid, FormControl, InputLabel, Select, Container, MenuItem, Button, TextField } from "@mui/material"
import bonnaLogo from "../../assets/img/logobonna_b.png"
import { IoMdCloseCircle } from "react-icons/io";
import { actionTypes } from '../../helper/data';
import { modalStyles } from '../../styles/globalStlye';
import useFeedbackCall from '../../hooks/useFeedbackCall';



const ActionType_Modal = ({ handleClose_action, open_action, info, setInfo }) => {

    const { putFireData_Sikayet, getFireData_Sikayet } = useFeedbackCall()

    const handleChange = (e) => {

        const { name, value } = e.target

        // name değeri undifiend gelirse boş string değeri ile doldur
        if (name == undefined) {
            setInfo({ ...info, [name]: ""})
        }
        else {
            setInfo(prevData => ({
                ...prevData,
                [name]: value
            }))
        }



    }


    const handleSubmit = (e) => {

        e.preventDefault()

        if (info.type == "sikayet") {

            putFireData_Sikayet('sikayet', info)
            getFireData_Sikayet('sikayet')
        }
        else if (info.type == "oneriTalep") {

            putFireData_Sikayet('oneri-talep', info)
            getFireData_Sikayet('oneri-talep')
        }

        handleClose_action()
    }


    console.log(info)

    return (
        <div>

            <Modal
                open={open_action}
                onClose={handleClose_action}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={modalStyles}>

                    <IoMdCloseCircle size={30} cursor={'pointer'} color='red' onClick={handleClose_action} />

                    <img src={bonnaLogo} style={{ width: '125px', margin: 'auto' }} />

                    <Box display={'flex'} flexDirection={'column'} gap={3}>

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

                        <Container sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', mt: 10 }} component={'form'} onSubmit={handleSubmit}>

                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                                <FormControl sx={{ width: '300px' }}>
                                    <InputLabel id="actionType">Aksiyon Tipi</InputLabel>
                                    <Select
                                        name='actionType'
                                        id='actionType'
                                        label='actionType'
                                        labelId='actionType'
                                        onChange={handleChange}
                                        value={info.actionType}
                                    >
                                        {
                                            actionTypes.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>

                                <TextField
                                    sx={{ width: '300px' }}
                                    name='actionResult'
                                    id='actionResult'
                                    label='Akçıklama'
                                    onChange={handleChange}
                                    value={info.actionResult}
                                >

                                </TextField>
                            </Box>

                            <Button variant='contained' type='submit'>Kaydet</Button>
                        </Container>

                    </Box>




                </Box>

            </Modal>

        </div>
    )
}

export default ActionType_Modal