import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';

interface CsvToTableProps {
    csvData: Array<Record<string, any>>;
    isCollapsed: boolean;
}

const RawCsvToTable: React.FC<CsvToTableProps> = ({ csvData, isCollapsed }) => {
    const columns = csvData.length > 0 ? Object.keys(csvData[0]) : [];

    return (
        <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
            {!isCollapsed && csvData.length > 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column}>{column}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {csvData.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {columns.map((column) => (
                                        <TableCell key={column}>{row[column]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default RawCsvToTable;
