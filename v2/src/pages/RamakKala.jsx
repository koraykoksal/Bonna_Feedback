import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import useFeedbackCall from '../hooks/useFeedbackCall';
import { location } from '../helper/data';
import { department } from "../helper/data"
import Checkbox from '@mui/material/Checkbox';

const RamakKala = () => {

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

    const [bonnaUser, setBonnaUser] = useState(false)

    const [info, setInfo] = useState({
        name: "",
        surname: "",
        gorev: "",
        birim: "",
        location: "",
        ramakkaladetay: "",
        oneri: "",
        actionType: "",
        actionResult: "",
        datetime: formattedDate
    })

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    const handleIsCheck = (e) => {
        const { checked } = e.target
        checked ? setBonnaUser(true) : setBonnaUser(false)
    }

    const handleSubmit = (e) => {

        e.preventDefault()

        postFireData('ramakkala', info)

        setInfo({
            name: "",
            surname: "",
            gorev: "",
            birim: "",
            location: "",
            ramakkaladetay: "",
            oneri: "",
            actionType: "",
            actionResult: "",
            datetime: formattedDate
        })

    }


    return (
        <div>

            <Typography align='center' color='#FFB534' p={3} fontWeight={700} fontSize={22}>Ramak Kala</Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 5, p: 2 }}>

                <form onSubmit={handleSubmit}>

                    <Box sx={{ flexDirection: 'column', display: 'flex', gap: 3, p: 3 }}>

                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3 }}>
                            <TextField
                                fullWidth
                                required
                                label='İsim'
                                name='name'
                                id='name'
                                type='text'
                                value={info.name}
                                inputProps={{
                                    maxLength: 50
                                }}
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
                                inputProps={{
                                    maxLength: 50
                                }}
                                onChange={handleChange}
                            />
                        </Box>


                        <Box>
                            <FormControlLabel
                                control={
                                    <Checkbox onChange={handleIsCheck} name="gilad" />
                                }
                                label="Bonna Çalışanı mısın ?"
                            />
                        </Box>

                        {/* bonna çalışanı ise burayı göster */}
                        {
                            bonnaUser &&
                            (
                                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3,backgroundColor:'#bbeebb84' }}>
                                    <TextField
                                        fullWidth
                                        label='Görev'
                                        name='gorev'
                                        id='gorev'
                                        type='text'
                                        value={info.gorev}
                                        inputProps={{
                                            maxLength: 35
                                        }}
                                        onChange={handleChange}
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel id="birim">Departman</InputLabel>
                                        <Select
                                            required
                                            labelId='birim'
                                            name='birim'
                                            id='birim'
                                            label='birim'
                                            value={info.birim}
                                            onChange={handleChange}
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: 300,
                                                        overflow: 'auto'
                                                    }
                                                }
                                            }}
                                        >
                                            {
                                                department.map((item, index) => (
                                                    <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
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
                            )
                        }

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                            <TextField
                                fullWidth
                                required
                                multiline
                                rows={4}
                                label='Tehlikeli Durum / Ramak Kala Olayı'
                                name='ramakkaladetay'
                                id='ramakkaladetay'
                                type='text'
                                value={info.detail}
                                inputProps={{
                                    maxLength: 250
                                }}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label='Öneri'
                                name='oneri'
                                id='oneri'
                                type='text'
                                value={info.detail}
                                inputProps={{
                                    maxLength: 250
                                }}
                                onChange={handleChange}
                            />
                        </Box>



                        <Button variant='contained' type='submit' sx={{ letterSpacing: 3, textTransform: 'none' }}>
                            Gönder
                        </Button>

                    </Box>

                </form>

            </Box>

        </div>
    )
}

export default RamakKala