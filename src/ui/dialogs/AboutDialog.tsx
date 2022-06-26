import React from 'react';
import { Divider, Dialog, DialogActions, Button, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import 'leaflet/dist/leaflet.css';


interface Props {
    open: boolean
    handleClose: () => void
}


const AboutDialog = ({ open, handleClose }: Props): JSX.Element => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="about-dialog"
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle id="about-dialog-title">
                Volcano Lightning
            </DialogTitle>
            <Divider />
            <DialogContent>
                <DialogContentText>
                    The Volcano Lightning app scans and collects data around the most recent
                    lightning strikes across a large set of volcanoes world wide and reports on how many
                    lightning strikes occured within 20km and 100km of each volcano.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AboutDialog;
