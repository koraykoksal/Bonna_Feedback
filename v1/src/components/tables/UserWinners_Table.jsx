import React from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';


const UserWinners_Table = ({winnersData}) => {

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


    return (
        <div>

            <DataGrid
                columns={dataGrid_Columns}
                rows={winnersData}
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

        </div>
    )
}

export default UserWinners_Table