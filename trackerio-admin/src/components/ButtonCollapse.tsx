import {
    Button,
    Collapse,
    Grid,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import React from "react";

const ButtonCollapse = () => {
    return(
        <Grid item xs={12}>
            <Button
                variant="contained"
                startIcon={<ExpandMoreIcon />}
            >
                <Typography variant="h3">
                   Show File Contents
                </Typography>
            </Button>
            <Collapse>
                <Paper>
                    <TableContainer></TableContainer>
                </Paper>
            </Collapse>
        </Grid>
    )
}