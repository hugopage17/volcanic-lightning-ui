import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Paper } from '@mui/material';
import { Feature } from '@global-volcanic-lightning/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    lightning: Feature[];
}

const DoughnutGraph: React.FC<Props> = ({ lightning }) => {

    const getSeverityFreq = (level: string): number => lightning.filter((strikes) => strikes.properties.severity === level).length

    const data = {
        labels: ['Medium', 'High'],
        datasets: [
            {
            label: 'Strikes by Severity',
            data: [getSeverityFreq('warning'), getSeverityFreq('error')],
            backgroundColor: [
                'rgba(242, 181, 48, 0.2)',
                'rgba(237, 50, 17, 0.2)',
            ],
            borderColor: [
                'rgba(242, 181, 48, 1)',
                'rgba(237, 50, 17, 1)',
            ],
            borderWidth: 1,
            },
        ],
    };

    return (
        <Paper elevation={3} sx={{ padding: '4px' }}>
            <Doughnut
                data={data}
                height={380}
                options={{
                    responsive:true,
                    maintainAspectRatio:false,
                }}
            />
        </Paper>
    ) 
}

export default DoughnutGraph;
