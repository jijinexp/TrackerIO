import {Typography, Box, useTheme} from "@mui/material";
import {tokens} from "../theme";
import React from "react";

interface ItemProps {
    title: string,
    subtitle: string
}

const Header: React.FC<ItemProps> = ({title, subtitle}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box mb="30px">
            <Typography
                variant="h2"
                color={colors.Grey.CT100}
                fontWeight="bold"
                sx={{m: "0 0 5px 0"}}
            >
                {title}
            </Typography>
            <Typography variant="h5" color={colors.GreenAccent.CT400}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;