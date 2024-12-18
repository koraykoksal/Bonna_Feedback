import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import useFeedbackCall from '../../hooks/useFeedbackCall';
import { location, sikayetKonusu } from '../../helper/data';
import { FormControl, FormLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';



const Sikayet_View = () => {


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
        topic: "",
        topicDetail: "",
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

        postFireData('sikayet', info)

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


    console.log(info)

    return (
        <div>

            <Typography align='center' color='#FFB534' p={3} fontWeight={700} fontSize={22}>Şikayet</Typography>

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
                                required
                                fullWidth
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

                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3 }}>

                            <FormControl fullWidth>
                                <InputLabel id="Şikayet Konusu">Şikayet Konusu</InputLabel>
                                <Select
                                    required
                                    labelId='Şikayet Konusu'
                                    name='topic'
                                    id='topic'
                                    label='Şikayet Konusu'
                                    value={info.topic}
                                    onChange={handleChange}
                                >
                                    {
                                        sikayetKonusu.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>

                            {
                                info.topic === "Diğer" &&
                                <TextField
                                    fullWidth
                                    label='Şikayet Detayı'
                                    name='topicDetail'
                                    id='topicDetail'
                                    type='text'
                                    value={info.topicDetail}
                                    // inputProps={{
                                    //     maxLength: 35
                                    // }}
                                    sx={{backgroundColor:'#e9ecef'}}
                                    onChange={handleChange}
                                />
                            }

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

                        <Button variant='contained' type='submit'>
                            Gönder
                        </Button>

                    </Box>

                </form>

            </Box>

        </div>
    )
}

export default Sikayet_View