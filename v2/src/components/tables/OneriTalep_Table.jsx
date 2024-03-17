import React from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import OneriTalep_View from '../modals/OneriTalep_View';
import ActionType_Modal from '../modals/ActionType_Modal';
import Delete_Modal from '../modals/Delete_Modal';


const OneriTalep_Table = ({ oneritalep, handleClose_oneritalep, handleOpen_oneritalep, open_oneritalep, handleOpen_action, handleOpen_delete, handleClose_action, handleClose_delete, open_action, open_delete }) => {


  const [info, setInfo] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    topic: "",
    katkiKonusu: "",
    detail: "",
    datetime: "",
    actionType: "",
    actionResult: "",
    location:""

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
      field: "location",
      headerName: "Lokasyon",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "actionType",
      headerName: "Aksiyon Tipi",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "actionResult",
      headerName: "Aksiyon Açıklaması",
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
    {
      field: "actions",
      headerName: "Aksiyon",
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
          datetime,
          actionType,
          actionResult,
          location,

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
                datetime,
                actionType,
                actionResult,
                location
              })

            }}
          />,
          <GridActionsCellItem
            key={'edit'}
            label='Edit'
            icon={<MdEdit size={23} style={{ cursor: 'pointer', color: '#E8C872' }} onClick={() => {
              handleOpen_action()
              setInfo({
                id,
                name,
                surname,
                phone,
                email,
                topic,
                katkiKonusu,
                detail,
                datetime,
                actionType,
                actionResult,
                location,
                type: "oneriTalep"
              })
            }} />}

          />,
          <GridActionsCellItem
            key={'delete'}
            label='Delete'
            icon={<MdDeleteForever size={23} style={{ cursor: 'pointer', color: 'red' }} onClick={() => {
              handleOpen_delete()
              setInfo({
                id,
                name,
                surname,
                phone,
                email,
                topic,
                katkiKonusu,
                detail,
                datetime,
                actionType,
                actionResult,
                location,
                type: "oneriTalep"
              })
            }} />}

          />


        ]
      },
    },

  ];





  return (
    <Box p={3}>

      <DataGrid
        columns={dataGrid_Columns}
        rows={oneritalep}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
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

      <ActionType_Modal handleClose_action={handleClose_action} open_action={open_action} info={info} setInfo={setInfo} />
      <Delete_Modal info={info} setInfo={setInfo} open_delete={open_delete} handleClose_delete={handleClose_delete} handleOpen_delete={handleOpen_delete} />

    </Box>
  )
}

export default OneriTalep_Table