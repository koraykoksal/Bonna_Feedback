import { Box, Typography } from '@mui/material'
import React from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import Sikayet_View from '../modals/Sikayet_View';


const Sikayet_Table = ({ sikayetData, handleClose_sikayet, handleOpen_sikayet, open_sikayet }) => {


    const [sikayet, setSikayet] = useState([])

    const [info, setInfo] = useState({
        name: "",
        surname: "",
        phone: "",
        email: "",
        topic: "",
        detail: "",
        datetime: ""

    })

    const dataGrid_Columns = [
        // {
        //   field: "id",
        //   headerName: "ID",
        //   minWidth: 150,
        //   headerAlign: "center",
        //   align: "center",
        //   flex: 1,
        // },
        {
            field: "actions",
            headerName: "#",
            minWidth: 120,
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({
                id,
                row: {
                    name,
                    surname,
                    phone,
                    email,
                    topic,
                    detail,
                    datetime

                }
            }) => {
                return [

                    <GridActionsCellItem
                        key={'show'}
                        label='Show'
                        icon={<FaEye size={23} style={{ cursor: 'pointer', color: 'darkblue' }} />}
                        onClick={() => {
                            handleOpen_sikayet()
                            setInfo({
                                id,
                                name,
                                surname,
                                phone,
                                email,
                                topic,
                                detail,
                                datetime
                            })

                        }}
                    />


                ]
            },
        },
        {
            field: "name",
            headerName: "İsim",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },

        {
            field: "surname",
            headerName: "Soyisim",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Telefon",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "topic",
            headerName: "Konu",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "detail",
            headerName: "Detay",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "datetime",
            headerName: "Tarih",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },


    ];




    useEffect(() => {

        const dizi = Object.keys(sikayetData).map(key => { return { id: key, ...sikayetData[key] } })
        setSikayet(dizi)

    }, [sikayetData])




    return (




        <Box p={3}>


            <DataGrid
                columns={dataGrid_Columns}
                rows={sikayet}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 25,
                        },
                    },
                }}
                pageSizeOptions={[10, 25, 50, 75, 100]}
                slots={{ toolbar: GridToolbar }}
                disableRowSelectionOnClick
                sx={{
                    boxShadow: 4,
                }}
            />

            <Sikayet_View info={info} handleClose_sikayet={handleClose_sikayet} open_sikayet={open_sikayet}/>


        </Box>


    )
}

export default Sikayet_Table