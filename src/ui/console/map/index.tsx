import React from 'react';
import { IconButton } from '@mui/material';
import { MapContainer, TileLayer } from 'react-leaflet';
import { styled } from '@mui/material/styles';
import * as L from 'leaflet';
import { Feature } from '@global-volcanic-lightning/types';
import MenuIcon from '@mui/icons-material/Menu';
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import AppContext from '../../../AppContext';
import MapRegionDrawer from './MapDrawer';
import { getRegions } from '../../../api/getRegions';
import StrikeMarker from './StrikeMarker';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Props {
    features: Feature[]
    center?: [number, number]
}

const MapButton = styled(IconButton)(({ theme }) => ({
    position: 'fixed',
    right: '0%',
    zIndex: 100,
    margin: theme.spacing(2)
}));

const Map = ({ features, center }: Props): JSX.Element => {
    const { loading, theme } = React.useContext(AppContext);
    const [loadedMap, setMap] = React.useState<boolean>(true);
    const mapRef = React.useRef<any>();

    const [openDrawer, toggleDrawer] = React.useState<boolean>(false);
    const [regions, toggleRegion] = React.useState<string[]>(getRegions(features));

    const setRegion = (region: string, value: boolean) => {
        if (!value) {
            toggleRegion([...regions.filter((val) => val !== region)])
        } else {
            toggleRegion([...regions, region])
        }
    }

    const setLocation = (coordinates: [number, number]) => {
        mapRef.current.flyTo(coordinates, 8, {
            duration: 2
        });
    }

    React.useEffect(() => {
        setMap(false)
        setTimeout(() => setMap(true), 100)
    }, [theme])

    const isActiveRegion = (region: string) => !!regions.find((r) => r === region);

    return (
        //@ts-ignore
        <>
            {loadedMap &&
                <>
                    <MapButton onClick={() => toggleDrawer(true)}>
                        <MenuIcon />
                    </MapButton>
                    <MapContainer
                        ref={mapRef}
                        id="map-component" center={center ?? [42.505, 55.09]}
                        zoom={3}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            url={theme === 'dark' ? "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png" : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        {!loading && features && features.map((strike) =>
                            <StrikeMarker
                                key={`${strike.geometry.coordinates[0]}-${strike.geometry.coordinates[1]}`}
                                theme={theme}
                                strike={strike}
                                active={isActiveRegion(strike.properties.area)}
                            />
                        )}
                    </MapContainer>
                    <MapRegionDrawer
                        openDrawer={openDrawer}
                        close={() => toggleDrawer(false)}
                        features={features}
                        regions={regions}
                        setRegion={setRegion}
                        setLocation={setLocation}
                    />
                </>}
        </> 
    )
}

export default Map;
