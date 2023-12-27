import React from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { FaEye } from "react-icons/fa";
import OneriTalep_View from '../modals/OneriTalep_View';

const OneriTalep_Table = ({ oneriTalepData, handleClose_oneritalep, handleOpen_oneritalep, open_oneritalep }) => {

  const [oneriTalep, setOneriTalep] = useState([])


  const [info, setInfo] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    topic: "",
    katkiKonusu: "",
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
          katkiKonusu,
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
              handleOpen_oneritalep()
              setInfo({
                id,
                name,
                surname,
                phone,
                email,
                topic,
                katkiKonusu,
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
      field: "katkiKonusu",
      headerName: "Fayda",
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

    const dizi = Object.keys(oneriTalepData).map(key => { return { id: key, ...oneriTalepData[key] } })
    setOneriTalep(dizi)

  }, [oneriTalepData])



  return (
    <Box p={3}>

      <DataGrid
        columns={dataGrid_Columns}
        rows={oneriTalep}
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

        <OneriTalep_View info={info} handleClose_oneritalep={handleClose_oneritalep} open_oneritalep={open_oneritalep}/>

    </Box>
  )
}

export default OneriTalep_Table