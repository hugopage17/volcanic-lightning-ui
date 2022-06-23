import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Paper } from '@mui/material';
import { Feature } from '@global-volcanic-lightning/types';
import { palette } from '../../../../colorPalette';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
    responsive: true,
    maintainAspectRatio:false,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

interface Props {
    lightning: Feature[];
}

const BarGraph: React.FC<Props> = ({ lightning }) => {

    const labels = lightning.map((strike) => strike.properties.name)

    const data = {
        labels,
        datasets: [
            {
                label: '100km Strikes',
                data: lightning.map((strike: any) => strike.properties.hundredKmStrikes),
                backgroundColor: 'rgba(242, 181, 48, 0.2)',
                borderColor: palette.warning,
                borderWidth: 1
            },
            {
                label: '20km Strikes',
                data: lightning.map((strike: any) => strike.properties.twentyKmStrikes),
                backgroundColor: 'rgba(237, 50, 17, 0.2)',
                borderColor: palette.error,
                borderWidth: 1
            }
        ],
    };

    return (
        <Paper elevation={3} sx={{ width: 'auto' }}>
            <Bar height={380} options={options} data={data} />
        </Paper>
        
    );
};

export default BarGraph;

