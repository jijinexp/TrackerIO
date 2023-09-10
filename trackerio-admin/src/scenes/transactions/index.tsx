import {Box, Typography, useTheme} from "@mui/material";
import {DataGrid, GridColDef, GridCellParams} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import Header from "../../components/Header";
import {Transaction} from "./Transaction";
import {useEffect, useState} from "react";
import axios from "axios";

const Transactions = () => {
    const apiUrl = 'http://localhost:5251/api/transactions';
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [headers, setHeaders] = useState<string[]>([]);
    const [items, setItems] = useState<Transaction[]>([]);

    const currentDate = new Date();
    const startOfMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1);
    const defaultFromDate = startOfMonthDate.toISOString().substring(0, 10);
    const defaultToDate = currentDate.toISOString().substring(0, 10);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                await axios.get(apiUrl, {
                    params: {
                        startDate: defaultFromDate,
                        endDate: defaultToDate
                    }
                }).then(response => {
                    const {rawTransactions} = response.data;
                    setItems(rawTransactions);
                    if (rawTransactions && rawTransactions.length > 0) {
                        // Filter out specific header names you don't need
                        const excludedHeaders = ['id', 'csvId'];
                        const transactionHeaders = Object.keys(rawTransactions[0])
                            .filter(header => !excludedHeaders.includes(header));
                        setHeaders(transactionHeaders);
                    }
                });
            } catch (error) {
                console.error('Error fetching items:', error)
            }
        };
        fetchItems().then();
    }, [defaultFromDate, defaultToDate]);

    const gridColumns: GridColDef[] = headers.map(header => ((header === "amount" ?
            {
                field: header,
                headerName: header.charAt(0).toUpperCase() + header.slice(1),
                flex: 1,
                renderCell: (params: GridCellParams) => (
                    <Typography color={(params.row.amount < 0 ? colours.RedAccent.CT500 : colours.GreenAccent.CT500)}>
                        ${params.row.amount}
                    </Typography>
                ),
            } :
            {
                field: header,
                headerName: header.charAt(0).toUpperCase() + header.slice(1),
                flex: 1,
                editable: true,
            }
    )));

    return (
        <Box m="20px">
            <Header title="TRANSACTIONS" subtitle="List of Statement transactions"/>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colours.GreenAccent.CT300,
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colours.BlueAccent.CT700,
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colours.Primary.CT400,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colours.BlueAccent.CT700,
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colours.GreenAccent.CT200} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection rows={items} columns={gridColumns}/>
            </Box>
        </Box>
    );
};


export default Transactions;