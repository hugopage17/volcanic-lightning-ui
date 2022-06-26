import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Feature } from '@global-volcanic-lightning/types';
import MapIcon from '@mui/icons-material/Map';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { Typography, Divider, Tooltip, Tab, Tabs } from '@mui/material';
import WarningIcon from '@mui/icons-material/ReportGmailerrorred';
import 'leaflet/dist/leaflet.css';
import AppContext from '../../../AppContext';
import MapComponent from './MapComponent';
import BarGraphComponent from './BarGraphComponent';

interface Props {
    open: boolean
    handleClose: () => void
    strike: Feature
}

const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
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
    const [loadedMap, setMap] = React.useState<boolean>(true);

    const [tabValue, setTabValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => setTabValue(newValue);

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
                    <Tooltip
                        sx={{ marginLeft: '4px' }}
                        title={`${strike?.properties?.name} at ${strike?.properties?.severity === 'error' ? 'high' : 'medium'} alert for lightning strikes`}
                    >
                        <WarningIcon
                            color={strike?.properties?.severity as any}
                        />
                    </Tooltip>
                </div>
                <Tabs value={tabValue} onChange={handleChange} aria-label="strike dialog tabs">
                    <Tab icon={<MapIcon />} aria-label="map-icon" {...a11yProps(0)} />
                    <Tab icon={<InsertChartIcon />} aria-label="bar-icon" {...a11yProps(1)} />
                </Tabs>
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ overflow: 'hidden' }}>
                {tabValue === 0 && <MapComponent
                    loadedMap={loadedMap}
                    strike={strike}
                />}
                {tabValue === 1 &&
                    <BarGraphComponent
                        strike={strike}
                    />}
            </DialogContent>
        </Dialog>
    );
}

export default StrikeDialog;
