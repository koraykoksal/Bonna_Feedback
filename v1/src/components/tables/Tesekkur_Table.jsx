import { Box, Button } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';


const Tesekkur_Table = ({tesekkurData }) => {

  const [tesekkur, settesekkur] = useState([])


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
    // {
    //   field: "topic",
    //   headerName: "Konu",
    //   minWidth: 150,
    //   headerAlign: "center",
    //   align: "center",
    //   flex: 1,
    // },
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
    
    const dizi = Object.keys(tesekkurData).map(key => { return { id: key, ...tesekkurData[key] } })
    settesekkur(dizi)

  }, [tesekkurData])
  



  return (
    <Box p={3}>

      <DataGrid
        columns={dataGrid_Columns}
        rows={tesekkur}
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

    </Box>
  )
}

export default Tesekkur_Table