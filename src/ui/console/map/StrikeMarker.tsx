import React from 'react';
import { CircleMarker, Popup } from 'react-leaflet';
import { Typography, Divider } from '@mui/material';
import { Feature } from '@global-volcanic-lightning/types';
import { palette } from '../../../colorPalette';

interface Props {
    strike: Feature;
    active: boolean;
    theme: string | undefined;
    index: number;
}

const StrikeMarker = ({ strike, active, theme, index }: Props) => {

    if(!active) {
        return null
    }

    const popup = (properties: Feature['properties']) => {
        return (
            <Popup>
                <Typography
                    variant="body1" 
                    aria-label={`map-popup-dialog-${index}`}
                >
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
        <CircleMarker
            center={strike.geometry.coordinates}
            key={`${strike.geometry.coordinates[0]}-${strike.geometry.coordinates[1]}`}
            radius={8}
            color={theme === 'dark' ? palette.secondary : palette.accent}
            fillColor={theme === 'dark' ? palette.secondary : palette.accent}
        >
            {popup(strike.properties)}
        </CircleMarker>
    )
};

export default StrikeMarker;
