import React, { useEffect, useState } from 'react'
import useFeedbackCall from '../hooks/useFeedbackCall'
import { useSelector } from 'react-redux'
import { Box, TextField, Typography, FormControlLabel } from '@mui/material'
import { SlRefresh } from "react-icons/sl";
import { HiOutlineSearch } from "react-icons/hi";
import Checkbox from '@mui/material/Checkbox';
import Etiklik_Table from '../components/tables/Etiklik_Table';
import { toastErrorNotify } from '../helper/ToastNotify';


const Etiklik = () => {

    const { getFireData } = useFeedbackCall()
    const { feedbackData } = useSelector((state) => state.feedback)

    const [etiklik, setEtiklik] = useState([])

    const [info, setInfo] = useState({
        dateFrom: "",
        dateTo: ""
    })

    const [downloadLoading, setDownloadLoading] = useState(false)

    const [open_etiklik, setOpen_etiklik] = useState(false)
    const handleOpen_etiklik = () => setOpen_etiklik(true);
    const handleClose_etiklik = () => { setOpen_etiklik(false) }

    const [open_action, setOpen_action] = useState(false)
    const handleOpen_action = () => setOpen_action(true);
    const handleClose_action = () => { setOpen_action(false) }

    const [open_delete, setOpen_delete] = useState(false)
    const handleOpen_delete = () => setOpen_delete(true);
    const handleClose_delete = () => { setOpen_delete(false) }



    //etiklik hook çalıştır
    useEffect(() => {
        getFireData('etiklik', info.dateFrom, info.dateTo)
    }, [])


    //date bilgisini al
    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }


    useEffect(() => {

        const dizi = Object.keys(feedbackData).map(key => { return { id: key, ...feedbackData[key] } })
        const sortData = dizi.sort((a, b) => {
            const [dayA, monthA, yearA, timeA] = a.datetime.split(/-| /);
            const [hoursA, minutesA] = timeA.split(':');

            const [dayB, monthB, yearB, timeB] = b.datetime.split(/-| /);
            const [hoursB, minutesB] = timeB.split(':');

            const dateA = new Date(yearA, monthA - 1, dayA, hoursA, minutesA);
            const dateB = new Date(yearB, monthB - 1, dayB, hoursB, minutesB);

            return dateB - dateA;
        })

        setEtiklik(sortData)

    }, [feedbackData])


    // aksiyonları göster
    const handleIsCheck = (e) => {
        const { checked } = e.target

        const filterData = checked ? etiklik.filter((item) => item.actionType === "") : getFireData('etiklik', info.dateFrom, info.dateTo)
        setEtiklik(filterData)
    }


    //filtreyi temizle
    const handleRefresh = () => {
        setInfo({
            dateFrom: "",
            dateTo: ""
        })
        getFireData('etiklik', "", "")
    }


    const handleDocumentDownload = async (url) => {

        try {
            setDownloadLoading(true)
            const response = await fetch(url);

            if (!response.ok) {
                toastErrorNotify("Dosya indirilemedi");
                return;
            }

            const blob = await response.blob();

            // 1. Content-Disposition'dan dosya adı alma
            let fileName = "dosya";

            const contentDisposition = response.headers.get("Content-Disposition");
            if (contentDisposition && contentDisposition.includes("filename=")) {
                const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                if (fileNameMatch?.[1]) {
                    fileName = fileNameMatch[1];
                }
            } else {
                // 2. Content-Type'dan MIME tipi alarak uzantı tahmini
                const contentType = response.headers.get("Content-Type");
                const extensionMap = {
                    "application/pdf": "pdf",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
                    "image/jpeg": "jpg",
                    "image/png": "png",
                    "application/zip": "zip",
                    "text/plain": "txt",
                    // Gerekirse buraya diğer MIME türlerini de ekleyebilirsin
                };

                const extension = extensionMap[contentType] || "bin";
                fileName = `indirilen_dosya.${extension}`;
            }

            const urlBlob = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = urlBlob;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(urlBlob);
        }
        catch (error) {
            console.error("İndirme hatası:", error);
            toastErrorNotify("Beklenmeyen bir sorun oluştu !");
        }
        finally {
            setDownloadLoading(false)
        }
    }

    return (
        <div>

            <Typography mt={12} align='center' letterSpacing={3} fontWeight={700}>Etik</Typography>

            <Box display={'flex'} justifyContent={'space-between'} gap={2} alignItems={'center'} p={2}>
                <SlRefresh size={22} color='green' cursor={'pointer'} onClick={handleRefresh} />


                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1, alignItems: 'center', p: 2 }}>
                    <Typography>From</Typography>
                    <TextField
                        required
                        size='small'
                        id='dateFrom'
                        name='dateFrom'
                        type='date'
                        value={info.dateFrom}
                        onChange={handleChange}
                    />

                    <Typography>To</Typography>
                    <TextField
                        required
                        size='small'
                        id='dateTo'
                        name='dateTo'
                        type='date'
                        value={info.dateTo}
                        onChange={handleChange}
                    />
                    <HiOutlineSearch size={25} color='black' cursor={'pointer'} style={{ marginLeft: 15 }}
                        onClick={() => getFireData('etiklik', info.dateFrom, info.dateTo)} />
                </Box>
            </Box>

            <Box sx={{ flexDirection: 'column', display: 'flex', gap: 3, p: 3 }}>
                <Box>
                    <FormControlLabel
                        control={
                            <Checkbox onChange={handleIsCheck} name="gilad" />
                        }
                        label="Aksiyon alınmamış olanları göster"
                    />
                </Box>

                <Etiklik_Table
                    handleOpen_etiklik={handleOpen_etiklik}
                    handleClose_etiklik={handleClose_etiklik}
                    open_etiklik={open_etiklik}
                    etiklik={etiklik}
                    open_action={open_action}
                    handleClose_action={handleClose_action}
                    handleOpen_action={handleOpen_action}
                    open_delete={open_delete}
                    handleClose_delete={handleClose_delete}
                    handleOpen_delete={handleOpen_delete}
                    handleDocumentDownload={handleDocumentDownload}
                />

            </Box>

        </div>
    )
}

export default Etiklik