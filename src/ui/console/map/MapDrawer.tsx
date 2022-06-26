import React from 'react';
import {
    Box,
    Drawer,
    Typography,
    Divider,
    ListItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Feature } from '@global-volcanic-lightning/types';
import DrawerItem from './DrawerItem';
import { getRegions } from '../../../api/getRegions';

const RegionList = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(8)
}))

interface Props {
    features: Feature[];
    close: () => void;
    openDrawer: boolean;
    regions: string[];
    setRegion: (region: string, val: boolean) => void;
    setLocation: (coordinates: [number, number]) => void;
}

const MapRegionDrawer = ({ features, openDrawer, setLocation, close, regions, setRegion }: Props): JSX.Element => {
    const allRegions = getRegions(features);
    const list = () => (
        <Box>
            <RegionList>
                <ListItem>
                    <Typography variant="h6">
                        Volcano Regions
                    </Typography>
                </ListItem>
                <Divider/>
                {allRegions.map((region) =>
                    <DrawerItem
                        enabled={!!regions.find((r) => r === region)}
                        setRegion={setRegion}
                        key={`regional-drawer-item-${region}`}
                        features={features}
                        region={region}
                        setLocation={setLocation}
                    />
                )}
            </RegionList>
        </Box>
    );

    return (
        <>
            <Drawer
                anchor='right'
                open={openDrawer}
                onClose={close}
                sx={{ marginTop: '120px' }}
            >
                
                {list()}
            </Drawer>
        </>
    )
};

export default MapRegionDrawer;
