import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = ({ monthlySales = [] }) => {

  // Map real API data to chart format
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const labels = monthlySales.map(item => {
    const [year, month] = item._id.split('-');
    return monthNames[parseInt(month) - 1];
  });

  const revenueData = monthlySales.map(item => item.totalSales);

  const data = {
    labels: labels.length > 0 ? labels : monthNames,
    datasets: [
      {
        label: 'Revenue (USD)',
        data: revenueData.length > 0 ? revenueData : [],
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Revenue' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-lg">
      <div className='hidden md:block'>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;