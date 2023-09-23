import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column', // To make sure Paper expands vertically
        alignItems: 'center', // Center the content horizontally
        width: '100%',
    },
    paperContainer: {
        width: '100%', // Set the width to 100% for full-width inheritance
        marginBottom: theme.spacing(3), // Add spacing between Paper and grid
    },
    paper: {
        padding: theme.spacing(3),
        width: '100%', // Adjust the width as needed
        overflowX: 'auto', // Enable horizontal scrolling if needed
        position: 'relative',
    },
    browseButton: {
        margin: theme.spacing(2, 0), // Add margin for spacing
    },
    fileNameText: {
        marginLeft: theme.spacing(1), // Add spacing between button and file name
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    rightButtons: {
        marginLeft: 'auto', // Push the buttons to the right
    },
    showContentsButton: {
        width: '100%', // Set the button width to match Paper's width
    },
}));