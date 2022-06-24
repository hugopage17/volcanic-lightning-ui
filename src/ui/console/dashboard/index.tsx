import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Feature } from '@global-volcanic-lightning/types';
import DoughnutGraph from './graph/DoughnutGraph';
import TableFreqComponent from './FreqTable';
import TableHighAlertComponent from './HighAlertTable';
import BarGraph from './graph/BarGraph';

interface Props {
    lightning: Feature[];
}

const TopWrapper = styled('div')(({ theme }) => ({
    display: 'grid',
    gridGap: theme.spacing(1),
    gridTemplateColumns: '0.5fr 1.5fr',
    padding: theme.spacing(2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const MidWrapper = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1.25fr 0.75fr',
    gridGap: theme.spacing(2),
    height: '50vh',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const DashboardComponent: React.FC<Props> = ({ lightning }) => {
    return (
        <div style={{ paddingBottom: '12px' }} id="dashboard">
            <TopWrapper>
                <div>
                    <Typography variant="subtitle1">Strikes By Severity</Typography>
                    <DoughnutGraph lightning={lightning}/>
                </div>
                <div>
                    <Typography variant="subtitle1">Global Lightning Strikes Breakdown</Typography>
                    <BarGraph lightning={lightning}/>
                </div> 
            </TopWrapper>
            <MidWrapper>
                <div>
                    <Typography variant="subtitle1">Volcanoes with the highest strikes</Typography>
                    <TableFreqComponent lightning={lightning}/>
                </div>
                <div>
                    <Typography variant="subtitle1">High alert volcanoes</Typography>
                    <TableHighAlertComponent lightning={lightning}/>
                </div>
            </MidWrapper>
            
        </div>
    );
};

export default DashboardComponent;
