import React from 'react'
import Box from '@mui/material/Box';
import { Typography, Grid, Container } from "@mui/material"
import Button from '@mui/material/Button';
import { useState } from 'react';
import { FormControl, FormLabel, InputLabel, MenuItem, Select, TextField,CircularProgress } from '@mui/material';
import { location } from '../../helper/data';
import useFeedbackCall from '../../hooks/useFeedbackCall';


const Tesekkur_View = ({loading}) => {


    const { postFireData } = useFeedbackCall()

    const now = new Date()

    // Gün, Ay ve Yıl için değerleri al
    const day = String(now.getDate()).padStart(2, '0'); // Günü 2 basamaklı yap
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Ayı 2 basamaklı yap (0'dan başladığı için +1 ekliyoruz)
    const year = now.getFullYear();

    // Saat, Dakika ve Saniye için değerleri al
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // Düzenlenmiş tarih ve saati birleştir
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;



    const [info, setInfo] = useState({
        name: "",
        surname: "",
        phone: "",
        email: "",
        topic: "Teşekkür",
        detail: "",
        actionType: "",
        actionResult: "",
        location: "",
        datetime: formattedDate

    })

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {

        e.preventDefault()

        postFireData('tesekkur', info)

        setInfo({
            name: "",
            surname: "",
            phone: "",
            email: "",
            topic: "",
            detail: "",
            actionType: "",
            actionResult: "",
            location: "",
            datetime: formattedDate
        })

    }


    return (
        <div>

            <Typography align='center' color='#FFB534' p={3} fontWeight={700} fontSize={22}>Teşekkür</Typography>

            <Typography variant='subtitle2' align='center' color={'error'}>
                Geri bildirimlerinizin takibi ve durumunu öğrenmek için telefon numarası doğruluğu önemlidir !
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 5, p: 2 }}>


                <form onSubmit={handleSubmit}>

                    <Box sx={{ flexDirection: 'column', display: 'flex', gap: 3, p: 3 }}>

                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3 }}>
                            <TextField
                                required
                                fullWidth
                                label='İsim'
                                name='name'
                                id='name'
                                type='text'
                                value={info.name}
                                // inputProps={{
                                //     maxLength: 50
                                // }}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                required
                                label='Soyisim'
                                name='surname'
                                id='surname'
                                type='text'
                                value={info.surname}
                                // inputProps={{
                                //     maxLength: 50
                                // }}
                                onChange={handleChange}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3 }}>
                            <TextField
                                required
                                fullWidth
                                label='Telefon (0xxx-xxx-xxxx)'
                                name='phone'
                                id='phone'
                                type='text'
                                // inputProps={{
                                //     maxLength: 11
                                // }}
                                value={info.phone}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label='Eposta'
                                name='email'
                                id='email'
                                type='text'
                                value={info.email}
                                // inputProps={{
                                //     maxLength: 35
                                // }}
                                onChange={handleChange}
                            />
                        </Box>

                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="location">Lokasyon</InputLabel>
                                <Select
                                    required
                                    labelId='location'
                                    name='location'
                                    id='location'
                                    label='location'
                                    value={info.location}
                                    onChange={handleChange}
                                >
                                    {
                                        location.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>


                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                            <TextField
                                fullWidth
                                required
                                multiline
                                rows={4}
                                label='Açıklama'
                                name='detail'
                                id='detail'
                                type='text'
                                value={info.detail}
                                // inputProps={{
                                //     maxLength: 250
                                // }}
                                onChange={handleChange}
                            />
                        </Box>

                        {
                            loading ?
                                <CircularProgress size={20} color="inherit" />
                                :
                                <Button disabled={loading} variant='contained' type='submit' sx={{ letterSpacing: 3, textTransform: 'none' }}>
                                    Kayıt
                                </Button>

                        }

                    </Box>

                </form>

            </Box>


        </div>
    )
}

export default Tesekkur_View