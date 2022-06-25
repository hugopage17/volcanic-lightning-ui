import React from 'react';
import {
    ListItem,
    Checkbox,
    List,
    Collapse,
    ListItemText,
    ListItemButton,
    IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Feature } from '@global-volcanic-lightning/types';
import { getRegionsVolcanoes } from '../../../api/getRegions';

interface Props {
    features: Feature[];
    region: string;
    setRegion: (region: string, val: boolean) => void;
    enabled: boolean;
    setLocation: (coordinates: [number, number]) => void;
}

const NestedItem = styled(ListItem)(({ theme }) => ({
    color: theme.palette.text.secondary
}))

const DrawerItem = ({ features, region, setRegion, enabled, setLocation }: Props) => {

    const [open, toggle] = React.useState<boolean>(false)

    return (
        <>
            <ListItem>
                <Checkbox
                    color="primary"
                    checked={enabled}
                    onChange={(e) => setRegion(region, e.target.checked)}
                />
                <ListItemText primary={region} />
                {open ?
                    <IconButton onClick={() => toggle(!open)}>
                        <ExpandLess />
                    </IconButton> :
                    <IconButton onClick={() => toggle(!open)}>
                        <ExpandMore />
                    </IconButton>
                }
            </ListItem>   
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div">
                    {getRegionsVolcanoes(features, region).map((feature) => (
                        <NestedItem key={`nested-item-${feature.properties.name}`}>
                            <ListItemButton onClick={() => setLocation(feature.geometry.coordinates)}>
                                <ListItemText
                                    inset
                                    primary={feature.properties.name}
                                    sx={{ fontSize: '10px' }}
                                />
                            </ListItemButton>
                        </NestedItem>
                    ))}
                </List>
            </Collapse>
        </>
    )
};

export default DrawerItem;
