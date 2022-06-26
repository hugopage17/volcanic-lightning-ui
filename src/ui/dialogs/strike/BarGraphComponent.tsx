import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { PolarArea } from 'react-chartjs-2';
import { Paper } from '@mui/material';
import { Feature } from '@global-volcanic-lightning/types';
import { palette } from '../../../colorPalette';

ChartJS.register(
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
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
    strike: Feature;
}

const BarGraph: React.FC<Props> = ({ strike }) => {
    
    const data = {
        labels: ['20km Strikes', '100km Strikes'],
        datasets: [
            {
              label: strike.properties.name,
              data: [strike.properties.twentyKmStrikes, strike.properties.hundredKmStrikes],
              backgroundColor: [
                'rgba(237, 50, 17, 0.2)',
                'rgba(242, 181, 48, 0.2)',
              ],
              borderColor: [
                palette.error,
                palette.warning,
               
              ],
              borderWidth: 1,
            },
          ],
    };

    return (
        <Paper elevation={3} sx={{ width: 'auto' }}>
            <PolarArea
                height={380}
                options={options}
                data={data}
            />
        </Paper>
        
    );
};

export default BarGraph;

