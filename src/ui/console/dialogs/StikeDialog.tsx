import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Feature } from '@global-volcanic-lightning/types';
import { Typography, Divider, Chip } from '@mui/material';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { palette } from '../../../colorPalette';
import AppContext from '../../../AppContext';


interface Props {
    open: boolean
    handleClose: () => void
    strike: Feature
}

const Text1 = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    marginRight: theme.spacing(0.5)
}));

const Text2 = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(0.5)
}));

const StrikeDialog = ({ open, handleClose, strike }: Props): JSX.Element => {
    const { theme } = React.useContext(AppContext);
    const [loadedMap, setMap] = React.useState<boolean>(true)

    React.useEffect(() => {
        setMap(false)
        setTimeout(() => setMap(true), 100)
    }, [theme])

    if (!strike) {
        return (
            <div>

            </div>
        )
    }

    const popup = (properties: Feature['properties']) => {
        return (
            <Popup>
                <Typography variant="body1">
                    <b>{properties.name}</b> - {properties.area}
                </Typography>
                <Divider/>
                <div>
                    <Typography variant="body2">
                        20km Strikes: {properties.twentyKmStrikes}
                    </Typography>
                    <Typography variant="body2">
                        100km Strikes: {properties.hundredKmStrikes}
                    </Typography>
                </div>
            </Popup>
        )
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="strike-dialog"
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle id="strike-dialog-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Text1 variant="h6">
                        {strike?.properties?.name}
                    </Text1>
                    <Text2 variant="body1">
                        {strike?.properties?.area}
                    </Text2>
                </div>
                <Chip
                    color={strike?.properties?.severity as any}
                    label={strike?.properties?.severity === 'error' ? 'High' : 'Medium'}
                /> 
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ overflow: 'hidden' }}>
                {loadedMap && <MapContainer
                    style={{ position: 'inherit', height: '50vh' }}
                    center={strike?.geometry?.coordinates ?? [42.505, 55.09]}
                    zoom={6} scrollWheelZoom={false}
                >
                    <TileLayer
                        url={theme === 'dark' ? "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png" : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <CircleMarker
                        center={strike?.geometry?.coordinates ?? [42.505, 55.09]}
                        key={`${strike.geometry.coordinates[0]}-${strike.geometry.coordinates[1]}`}
                        radius={16}
                        color={theme === 'dark' ? palette.secondary : palette.accent}
                        fillColor={theme === 'dark' ? palette.secondary : palette.accent}
                    >
                        {popup(strike?.properties)}
                    </CircleMarker>
                </MapContainer>}
            </DialogContent>
        </Dialog>
    );
}

export default StrikeDialog;
