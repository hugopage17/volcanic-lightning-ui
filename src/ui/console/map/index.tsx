import React from 'react';
import { Typography, Divider } from '@mui/material';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import * as L from 'leaflet';
import { Feature } from '@global-volcanic-lightning/types';
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { palette } from '../../../colorPalette';
import AppContext from '../../../AppContext';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Props {
    features: Feature[]
    center?: [number, number]
}

const Map = ({ features, center }: Props): JSX.Element => {
    const { loading, theme } = React.useContext(AppContext);
    const [loadedMap, setMap] = React.useState<boolean>(true)

    React.useEffect(() => {
        setMap(false)
        setTimeout(() => setMap(true), 100)
    }, [theme])

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
        //@ts-ignore
        <>
            {loadedMap &&
                <MapContainer id="map-component" center={center ?? [42.505, 55.09]} zoom={3} scrollWheelZoom={false}>
                    <TileLayer
                        url={theme === 'dark' ? "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png" : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    {!loading && features && features.map((strike, index) =>
                        <CircleMarker
                            center={strike.geometry.coordinates}
                            key={`${strike.geometry.coordinates[0]}-${strike.geometry.coordinates[1]}`}
                            radius={8}
                            color={theme === 'dark' ? palette.secondary : palette.accent}
                            fillColor={theme === 'dark' ? palette.secondary : palette.accent}
                        >
                            {popup(strike.properties)}
                        </CircleMarker>
                    )} 
                </MapContainer>}
        </> 
    )
}

export default Map;
