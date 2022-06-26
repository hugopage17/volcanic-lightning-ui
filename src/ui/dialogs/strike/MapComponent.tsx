import React from 'react';
import { Feature } from '@global-volcanic-lightning/types';
import { Typography, Divider } from '@mui/material';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { palette } from '../../../colorPalette';
import AppContext from '../../../AppContext';


interface Props {
    loadedMap: boolean
    strike: Feature
}

const StrikeDialog = ({ strike, loadedMap }: Props): JSX.Element => {
    const { theme } = React.useContext(AppContext);

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
        <>
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
        </>
    );
}

export default StrikeDialog;
