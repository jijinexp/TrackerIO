import {Box, useTheme} from "@mui/material";
import FileUpload from "../../components/FileUpload";
import {tokens} from "../../theme";

const UploadInformation = () => {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    return (
        <Box m="20px"
        >
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                <Box gridColumn="span 4"
                     sx={{backgroundColor: colours.Primary.CT400}}
                     display="flex"
                     alignItems="center"
                     justifyContent="center">
                    <FileUpload/>
                </Box>
            </Box>
        </Box>
    )
}

export default UploadInformation;