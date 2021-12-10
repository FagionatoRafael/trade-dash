import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

interface ChartLineProps {
  timeUSDGBP: string[]
  valueUSDGBP: number[]
  valueGBPUSD: number[]
}

export const ChartLine = (props: ChartLineProps) => {
   
  return (
    <Line 
      datasetIdKey={'Chart-1'} 
      data={{
        labels: props.timeUSDGBP,
        datasets: [{
          label: 'USD to GBP',
          data: props.valueUSDGBP,
          backgroundColor: 'rgba(255, 0, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,  
        },
        {
          label: 'GBP to USD',
          data: props.valueGBPUSD,
          backgroundColor: 'rgba(0, 0, 132, 0.2)',
          borderColor: 'rgba(0, 99, 132, 1)',
          borderWidth: 1,
        }]
      }}
      options={{
        responsive: true,
        animation: {
          duration: 0
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Floating Bar Chart'
          }          
        }
      }}
    />
  )
}

