import { Box, Typography } from '@mui/material'
import React from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect,useState } from 'react';



const Winners = ({ info,katilimciSayisi,setdata }) => {

    const [result, setResult] = useState([])

    const dataGrid_Columns = [
        {
            field: "id",
            headerName: "id",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "rowNumber",
            headerName: "Numara",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Ad",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },

        {
            field: "surname",
            headerName: "Soyad",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "department",
            headerName: "Departman",
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
            field: "status",
            headerName: "Durum",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "activityName",
            headerName: "Aktivite",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },


    ];

    useEffect(() => {
      
        const result = info.map((row,index)=>({
            ...row,
            rowNumber:index+1,
            status:index+1 > katilimciSayisi ? "Yedek" : "Asil"
        }))

        setdata(result)
        setResult(result)

    }, [info])
    


    return (




        <Box p={3} mb={5}>
            <DataGrid
                columns={dataGrid_Columns}
                rows={result}
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
                    color:'#ffffff'
                }}
            />
        </Box>


    )
}

export default Winners