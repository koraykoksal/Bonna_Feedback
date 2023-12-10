import React from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect,useState } from 'react';
import { Box } from '@mui/material';

const OneriTalep_Table = ({oneriTalepData}) => {

    const [oneriTalep, setOneriTalep] = useState([])


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

    

    console.log(oneriTalep)

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

        </Box>
    )
}

export default OneriTalep_Table