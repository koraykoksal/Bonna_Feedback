import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { FaEye } from "react-icons/fa";
import Tesekkur_View from '../modals/Tesekkur_View';
import { MdEdit } from "react-icons/md";
import ActionType_Modal from '../modals/ActionType_Modal';
import { MdDeleteForever } from "react-icons/md";
import Delete_Modal from '../modals/Delete_Modal';
import { Box, Button, Typography, CircularProgress, Tooltip, IconButton } from '@mui/material'
import { MdDownload } from "react-icons/md";


const Etiklik_Table = ({ etiklik, handleOpen_etiklik, handleClose_etiklik, open_etiklik, handleOpen_action, handleClose_action, open_action, handleOpen_delete, handleClose_delete, open_delete, handleDocumentDownload, downloadLoading }) => {


  const [info, setInfo] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    topic: "",
    title: "",
    subTitle: "",
    document: "",
    location: "",
    gorev: "",
    birim: "",
    actionType: "",
    actionResult: "",
    bonnaUser: "",
    datetime: ""
  })

  const dataGrid_Columns = [
    {
      field: "id",
      headerName: "ID",
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
      renderCell: (params) => {
        const {
          id,
          row: {
            name,
            surname,
            phone,
            email,
            topic,
            title,
            subTitle,
            document,
            location,
            gorev,
            birim,
            actionType,
            actionResult,
            bonnaUser,
            datetime,
            imgUrl
          }
        } = params;

        return [
          <GridActionsCellItem
            key="download"
            label="Download"
            disabled={!imgUrl}
            icon={
              downloadLoading ?
                <CircularProgress size={20} color="inherit" />
                :
                <Tooltip title="Dosya" placement="top" arrow interactive>
                  <FaEye
                    size={23}
                    style={{ cursor: 'pointer' }}
                    // onClick={() => handleDocumentDownload(imgUrl)}
                    onClick={() => window.open(imgUrl,'_blank')}
                  />
                </Tooltip>
            }
          />,
          <GridActionsCellItem
            key="edit"
            label="Edit"
            icon={
              <MdEdit
                size={23}
                style={{ cursor: 'pointer', color: '#E8C872' }}
                onClick={() => {
                  handleOpen_action();
                  setInfo({
                    id,
                    name,
                    surname,
                    phone,
                    email,
                    topic,
                    title,
                    subTitle,
                    document,
                    location,
                    gorev,
                    birim,
                    actionType,
                    actionResult,
                    bonnaUser,
                    datetime,
                    type: 'etiklik'
                  });
                }}
              />
            }
          />
        ];
      }
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
      field: "location",
      headerName: "Lokasyon",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Başlık",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Typography
            style={{
              whiteSpace: 'normal',       // Typography içinde de geçişe izin ver
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}
            variant='body2'
            align='center'
          >
            {params?.row?.title}
          </Typography>
        </div>
      )
    },
    {
      field: "subTitle",
      headerName: "Başlık",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Typography
            style={{
              whiteSpace: 'normal',       // Typography içinde de geçişe izin ver
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}
            variant='body2'
            align='center'
          >
            {params?.row?.subTitle}
          </Typography>
        </div>
      )
    },
    {
      field: "detail",
      headerName: "Detay",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Typography
            style={{
              whiteSpace: 'normal',       // Typography içinde de geçişe izin ver
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}
            variant='body2'
            align='center'
          >
            {params?.row?.detail}
          </Typography>
        </div>
      )
    },
    {
      field: "imgUrl",
      headerName: "Belge",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          {
            params?.row?.imgUrl ?
              <Typography align='center'>✅</Typography>
              :
              <Typography align='center'>❌</Typography>
          }
        </div>
      )
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



  ];


  return (
    <div>

      <Box>

        <DataGrid
          columns={dataGrid_Columns}
          rows={etiklik}
          rowHeight={100}
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

        <ActionType_Modal
          handleClose_action={handleClose_action}
          open_action={open_action}
          info={info}
          setInfo={setInfo}
        />

        <Delete_Modal
          info={info}
          setInfo={setInfo}
          open_delete={open_delete}
          handleClose_delete={handleClose_delete}
          handleOpen_delete={handleOpen_delete}
        />

      </Box>


    </div>
  )
}

export default Etiklik_Table